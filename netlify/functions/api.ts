import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import { Pool } from "pg";

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/ping", (req, res) => {
  res.json({ message: "Hello from Express server v2!" });
});

// Bookings endpoints
app.get("/api/bookings", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const {
      name, email, phone, eventType, packageType, eventDate, location,
      guestCount, budget, services, selectedAddOns, specialRequests,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO bookings (
        name, email, phone, event_type, package_type, event_date, 
        location, guest_count, budget, services, selected_add_ons, special_requests
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [name, email, phone, eventType, packageType, eventDate, location, guestCount, budget, services || [], selectedAddOns || [], specialRequests]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

app.put("/api/bookings/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const result = await pool.query(
      "UPDATE bookings SET status = $1, status_notes = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
      [status, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Failed to update booking status" });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM bookings WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

app.get("/api/bookings/stats", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM bookings 
      GROUP BY status
    `);

    const stats = { pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    result.rows.forEach((row) => {
      stats[row.status as keyof typeof stats] = parseInt(row.count);
    });

    res.json(stats);
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    res.status(500).json({ error: "Failed to fetch booking stats" });
  }
});

// Contacts endpoints
app.get("/api/contacts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

app.post("/api/contacts", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, phone, subject, message]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
});

app.put("/api/contacts/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      "UPDATE contacts SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({ error: "Failed to update contact status" });
  }
});

app.get("/api/contacts/unread-count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) as count FROM contacts WHERE status = 'unread'");
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (error) {
    console.error("Error fetching unread contacts count:", error);
    res.status(500).json({ error: "Failed to fetch unread contacts count" });
  }
});

// Email subscription endpoints
app.post("/api/subscriptions", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if email already exists
    const existingResult = await pool.query("SELECT id, status FROM email_subscriptions WHERE email = $1", [email]);

    if (existingResult.rows.length > 0) {
      const existing = existingResult.rows[0];
      if (existing.status === "active") {
        return res.status(409).json({ error: "Email already subscribed" });
      } else {
        // Reactivate subscription
        const result = await pool.query(
          "UPDATE email_subscriptions SET status = $1, subscribed_at = CURRENT_TIMESTAMP WHERE email = $2 RETURNING *",
          ["active", email]
        );
        return res.json(result.rows[0]);
      }
    }

    // Create new subscription
    const result = await pool.query(
      "INSERT INTO email_subscriptions (email, name, source) VALUES ($1, $2, $3) RETURNING *",
      [email, name || null, "footer"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error subscribing email:", error);
    res.status(500).json({ error: "Failed to subscribe email" });
  }
});

app.get("/api/subscriptions/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) as count FROM email_subscriptions WHERE status = 'active'");
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (error) {
    console.error("Error fetching subscriptions count:", error);
    res.status(500).json({ error: "Failed to fetch subscriptions count" });
  }
});

app.get("/api/subscriptions", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM email_subscriptions ORDER BY subscribed_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
});

// Export the serverless handler
export const handler = serverless(app);
