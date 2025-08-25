import { RequestHandler } from "express";
import {
  statements,
  parseJsonField,
  stringifyJsonField,
  generateId,
} from "../database";

// Types matching the frontend
interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  event_type: string;
  package_type?: string;
  event_date: string;
  location: string;
  guest_count?: number;
  budget: string;
  services: string[];
  selected_add_ons?: string[];
  special_requests?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  status_notes?: string;
  created_at: string;
  updated_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  created_at: string;
  updated_at: string;
}

// Helper function to format booking from database
function formatBooking(row: any): Booking {
  return {
    ...row,
    services: parseJsonField(row.services),
    selected_add_ons: parseJsonField(row.selected_add_ons),
  };
}

// Bookings endpoints
export const getAllBookings: RequestHandler = async (req, res) => {
  try {
    const rows = statements.getAllBookings.all();
    const bookings = rows.map(formatBooking);
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

export const createBooking: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      eventType,
      packageType,
      eventDate,
      location,
      guestCount,
      budget,
      services,
      selectedAddOns,
      specialRequests,
    } = req.body;

    const id = generateId();
    statements.insertBooking.run(
      id,
      name,
      email,
      phone || null,
      eventType,
      packageType || null,
      eventDate,
      location,
      guestCount || null,
      budget,
      stringifyJsonField(services),
      stringifyJsonField(selectedAddOns),
      specialRequests || null,
    );

    // Get the created booking
    const booking = statements.getBookingById.get(id);
    if (!booking) {
      throw new Error("Failed to retrieve created booking");
    }

    res.status(201).json(formatBooking(booking));
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

export const updateBookingStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const result = statements.updateBookingStatus.run(
      status,
      notes || null,
      id,
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Get the updated booking
    const booking = statements.getBookingById.get(id);
    res.json(formatBooking(booking));
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Failed to update booking status" });
  }
};

export const deleteBooking: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const result = statements.deleteBooking.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};

export const getBookingStats: RequestHandler = async (req, res) => {
  try {
    const rows = statements.getBookingStats.all();

    const stats = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
    };

    rows.forEach((row: any) => {
      stats[row.status as keyof typeof stats] = row.count;
    });

    res.json(stats);
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    res.status(500).json({ error: "Failed to fetch booking stats" });
  }
};

// Contacts endpoints
export const getAllContacts: RequestHandler = async (req, res) => {
  try {
    const contacts = statements.getAllContacts.all();
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

export const createContact: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const id = generateId();
    statements.insertContact.run(
      id,
      name,
      email,
      phone || null,
      subject,
      message,
    );

    // Get the created contact
    const contact = statements.getContactById.get(id);
    if (!contact) {
      throw new Error("Failed to retrieve created contact");
    }

    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

export const updateContactStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = statements.updateContactStatus.run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Get the updated contact
    const contact = statements.getContactById.get(id);
    res.json(contact);
  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({ error: "Failed to update contact status" });
  }
};

export const getUnreadContactsCount: RequestHandler = async (req, res) => {
  try {
    const result = statements.getUnreadContactsCount.get();
    res.json({ count: result?.count || 0 });
  } catch (error) {
    console.error("Error fetching unread contacts count:", error);
    res.status(500).json({ error: "Failed to fetch unread contacts count" });
  }
};

// Email subscription endpoints
export const subscribeEmail: RequestHandler = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if email already exists
    const existing = statements.getSubscriptionByEmail.get(email);

    if (existing) {
      if (existing.status === "active") {
        return res.status(409).json({ error: "Email already subscribed" });
      } else {
        // Reactivate subscription
        statements.updateSubscriptionStatus.run("active", email);
        const updated = statements.getSubscriptionByEmail.get(email);
        return res.json(updated);
      }
    }

    // Create new subscription
    const id = generateId();
    statements.insertSubscription.run(id, email, name || null, "footer");

    // Get the created subscription
    const subscription = statements.getSubscriptionByEmail.get(email);
    res.status(201).json(subscription);
  } catch (error) {
    console.error("Error subscribing email:", error);
    res.status(500).json({ error: "Failed to subscribe email" });
  }
};

export const getSubscriptionsCount: RequestHandler = async (req, res) => {
  try {
    const result = statements.getActiveSubscriptionsCount.get();
    res.json({ count: result?.count || 0 });
  } catch (error) {
    console.error("Error fetching subscriptions count:", error);
    res.status(500).json({ error: "Failed to fetch subscriptions count" });
  }
};

export const getAllSubscriptions: RequestHandler = async (req, res) => {
  try {
    const subscriptions = statements.getAllSubscriptions.all();
    res.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
};
