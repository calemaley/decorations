export interface Booking {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  packageType: string;
  selectedAddOns: string[];
  eventDate: string;
  location: string;
  guestCount: string;
  budget: string;
  services: string[];
  bouquetType: string;
  specialRequests: string;
  preferredContact: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string;
}

const BOOKINGS_KEY = "mirie_decors_bookings";

export const bookingStorage = {
  // Get all bookings
  getAllBookings(): Booking[] {
    try {
      const bookings = localStorage.getItem(BOOKINGS_KEY);
      return bookings ? JSON.parse(bookings) : [];
    } catch (error) {
      console.error("Error getting bookings:", error);
      return [];
    }
  },

  // Add a new booking
  addBooking(
    bookingData: Omit<Booking, "id" | "timestamp" | "status" | "notes">,
  ): Booking {
    try {
      const bookings = this.getAllBookings();
      const newBooking: Booking = {
        ...bookingData,
        id: this.generateId(),
        timestamp: new Date().toISOString(),
        status: "pending",
        notes: "",
      };

      bookings.unshift(newBooking); // Add to beginning for latest first
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
      return newBooking;
    } catch (error) {
      console.error("Error adding booking:", error);
      throw new Error("Failed to save booking");
    }
  },

  // Update booking status
  updateBookingStatus(
    id: string,
    status: Booking["status"],
    notes?: string,
  ): boolean {
    try {
      const bookings = this.getAllBookings();
      const bookingIndex = bookings.findIndex((booking) => booking.id === id);

      if (bookingIndex === -1) return false;

      bookings[bookingIndex].status = status;
      if (notes !== undefined) {
        bookings[bookingIndex].notes = notes;
      }

      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
      return true;
    } catch (error) {
      console.error("Error updating booking:", error);
      return false;
    }
  },

  // Delete a booking
  deleteBooking(id: string): boolean {
    try {
      const bookings = this.getAllBookings();
      const filteredBookings = bookings.filter((booking) => booking.id !== id);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filteredBookings));
      return true;
    } catch (error) {
      console.error("Error deleting booking:", error);
      return false;
    }
  },

  // Get booking by ID
  getBookingById(id: string): Booking | null {
    try {
      const bookings = this.getAllBookings();
      return bookings.find((booking) => booking.id === id) || null;
    } catch (error) {
      console.error("Error getting booking by ID:", error);
      return null;
    }
  },

  // Get bookings by status
  getBookingsByStatus(status: Booking["status"]): Booking[] {
    try {
      const bookings = this.getAllBookings();
      return bookings.filter((booking) => booking.status === status);
    } catch (error) {
      console.error("Error getting bookings by status:", error);
      return [];
    }
  },

  // Get bookings count by status
  getBookingsCountByStatus(): Record<Booking["status"], number> {
    try {
      const bookings = this.getAllBookings();
      return {
        pending: bookings.filter((b) => b.status === "pending").length,
        confirmed: bookings.filter((b) => b.status === "confirmed").length,
        completed: bookings.filter((b) => b.status === "completed").length,
        cancelled: bookings.filter((b) => b.status === "cancelled").length,
      };
    } catch (error) {
      console.error("Error getting bookings count:", error);
      return { pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    }
  },

  // Export bookings as JSON
  exportBookings(): string {
    try {
      const bookings = this.getAllBookings();
      return JSON.stringify(bookings, null, 2);
    } catch (error) {
      console.error("Error exporting bookings:", error);
      return "[]";
    }
  },

  // Generate unique ID
  generateId(): string {
    return (
      "booking_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  },

  // Clear all bookings (admin function)
  clearAllBookings(): boolean {
    try {
      localStorage.removeItem(BOOKINGS_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing bookings:", error);
      return false;
    }
  },
};

// Contact form storage
export interface ContactMessage {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
}

const CONTACTS_KEY = "mirie_decors_contacts";

export const contactStorage = {
  // Get all contact messages
  getAllContacts(): ContactMessage[] {
    try {
      const contacts = localStorage.getItem(CONTACTS_KEY);
      return contacts ? JSON.parse(contacts) : [];
    } catch (error) {
      console.error("Error getting contacts:", error);
      return [];
    }
  },

  // Add a new contact message
  addContact(
    contactData: Omit<ContactMessage, "id" | "timestamp" | "status">,
  ): ContactMessage {
    try {
      const contacts = this.getAllContacts();
      const newContact: ContactMessage = {
        ...contactData,
        id:
          "contact_" +
          Date.now() +
          "_" +
          Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        status: "unread",
      };

      contacts.unshift(newContact);
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
      return newContact;
    } catch (error) {
      console.error("Error adding contact:", error);
      throw new Error("Failed to save contact message");
    }
  },

  // Update contact status
  updateContactStatus(id: string, status: ContactMessage["status"]): boolean {
    try {
      const contacts = this.getAllContacts();
      const contactIndex = contacts.findIndex((contact) => contact.id === id);

      if (contactIndex === -1) return false;

      contacts[contactIndex].status = status;
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
      return true;
    } catch (error) {
      console.error("Error updating contact:", error);
      return false;
    }
  },

  // Get unread count
  getUnreadCount(): number {
    try {
      const contacts = this.getAllContacts();
      return contacts.filter((contact) => contact.status === "unread").length;
    } catch (error) {
      console.error("Error getting unread count:", error);
      return 0;
    }
  },
};
