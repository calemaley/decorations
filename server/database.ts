import Database from "better-sqlite3";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync, mkdirSync } from "fs";
import { v4 as uuidv4 } from "uuid";

// Get the directory of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize SQLite database in the project root's data directory
const dataDir = join(__dirname, "..", "data");
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = join(dataDir, "app.db");
export const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");

// Create tables if they don't exist
function initializeDatabase() {
  // Bookings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      event_type TEXT NOT NULL,
      package_type TEXT,
      event_date TEXT NOT NULL,
      location TEXT NOT NULL,
      guest_count INTEGER,
      budget TEXT NOT NULL,
      services TEXT NOT NULL DEFAULT '[]',
      selected_add_ons TEXT DEFAULT '[]',
      special_requests TEXT,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
      status_notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Contacts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Email subscriptions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS email_subscriptions (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
      source TEXT DEFAULT 'footer',
      subscribed_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
    CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
    CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
    CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
    CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON email_subscriptions(email);
  `);

  console.log("Database initialized successfully");
}

// Initialize database first
initializeDatabase();

// Prepare common statements for better performance (after tables are created)
export const statements = {
  // Bookings
  getAllBookings: db.prepare("SELECT * FROM bookings ORDER BY created_at DESC"),
  getBookingById: db.prepare("SELECT * FROM bookings WHERE id = ?"),
  insertBooking: db.prepare(`
    INSERT INTO bookings (
      id, name, email, phone, event_type, package_type, event_date,
      location, guest_count, budget, services, selected_add_ons, special_requests
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),
  updateBookingStatus: db.prepare(`
    UPDATE bookings
    SET status = ?, status_notes = ?, updated_at = datetime('now')
    WHERE id = ?
  `),
  deleteBooking: db.prepare("DELETE FROM bookings WHERE id = ?"),
  getBookingStats: db.prepare(`
    SELECT status, COUNT(*) as count
    FROM bookings
    GROUP BY status
  `),

  // Contacts
  getAllContacts: db.prepare("SELECT * FROM contacts ORDER BY created_at DESC"),
  getContactById: db.prepare("SELECT * FROM contacts WHERE id = ?"),
  insertContact: db.prepare(`
    INSERT INTO contacts (id, name, email, phone, subject, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `),
  updateContactStatus: db.prepare(`
    UPDATE contacts
    SET status = ?, updated_at = datetime('now')
    WHERE id = ?
  `),
  getUnreadContactsCount: db.prepare(`
    SELECT COUNT(*) as count
    FROM contacts
    WHERE status = 'unread'
  `),

  // Email subscriptions
  getAllSubscriptions: db.prepare(
    "SELECT * FROM email_subscriptions ORDER BY subscribed_at DESC",
  ),
  getSubscriptionByEmail: db.prepare(
    "SELECT * FROM email_subscriptions WHERE email = ?",
  ),
  insertSubscription: db.prepare(`
    INSERT INTO email_subscriptions (id, email, name, source)
    VALUES (?, ?, ?, ?)
  `),
  updateSubscriptionStatus: db.prepare(`
    UPDATE email_subscriptions
    SET status = ?, subscribed_at = datetime('now')
    WHERE email = ?
  `),
  getActiveSubscriptionsCount: db.prepare(`
    SELECT COUNT(*) as count
    FROM email_subscriptions
    WHERE status = 'active'
  `),
};

// Helper functions
export function generateId(): string {
  return uuidv4();
}

export function parseJsonField(value: string): any[] {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export function stringifyJsonField(value: any[]): string {
  return JSON.stringify(value || []);
}

// Graceful shutdown
process.on("exit", () => db.close());
process.on("SIGINT", () => {
  db.close();
  process.exit(0);
});
