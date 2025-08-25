import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getAllBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking,
  getBookingStats,
  getAllContacts,
  createContact,
  updateContactStatus,
  getUnreadContactsCount,
  subscribeEmail,
  getSubscriptionsCount,
  getAllSubscriptions,
} from "./routes/database";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Database API routes
  // Bookings
  app.get("/api/bookings", getAllBookings);
  app.post("/api/bookings", createBooking);
  app.put("/api/bookings/:id/status", updateBookingStatus);
  app.delete("/api/bookings/:id", deleteBooking);
  app.get("/api/bookings/stats", getBookingStats);

  // Contacts
  app.get("/api/contacts", getAllContacts);
  app.post("/api/contacts", createContact);
  app.put("/api/contacts/:id/status", updateContactStatus);
  app.get("/api/contacts/unread-count", getUnreadContactsCount);

  // Email Subscriptions
  app.post("/api/subscriptions", subscribeEmail);
  app.get("/api/subscriptions/count", getSubscriptionsCount);
  app.get("/api/subscriptions", getAllSubscriptions);

  return app;
}
