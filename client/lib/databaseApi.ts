// Database API client to replace localStorage operations

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

interface BookingStats {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

// Booking API
export const bookingApi = {
  async getAllBookings(): Promise<Booking[]> {
    const response = await fetch("/api/bookings");
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    return response.json();
  },

  async createBooking(bookingData: {
    name: string;
    email: string;
    phone?: string;
    eventType: string;
    packageType?: string;
    eventDate: string;
    location: string;
    guestCount?: number;
    budget: string;
    services: string[];
    selectedAddOns?: string[];
    specialRequests?: string;
  }): Promise<Booking> {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }
    return response.json();
  },

  async updateBookingStatus(
    id: string,
    status: string,
    notes?: string,
  ): Promise<Booking> {
    const response = await fetch(`/api/bookings/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, notes }),
    });

    if (!response.ok) {
      throw new Error("Failed to update booking status");
    }
    return response.json();
  },

  async deleteBooking(id: string): Promise<void> {
    const response = await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete booking");
    }
  },

  async getBookingStats(): Promise<BookingStats> {
    const response = await fetch("/api/bookings/stats");
    if (!response.ok) {
      throw new Error("Failed to fetch booking stats");
    }
    return response.json();
  },

  // Helper function to format data for frontend compatibility
  formatBookingForFrontend(booking: Booking) {
    return {
      id: booking.id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      eventType: booking.event_type,
      packageType: booking.package_type,
      eventDate: booking.event_date,
      location: booking.location,
      guestCount: booking.guest_count,
      budget: booking.budget,
      services: booking.services,
      selectedAddOns: booking.selected_add_ons,
      specialRequests: booking.special_requests,
      status: booking.status,
      statusNotes: booking.status_notes,
      timestamp: booking.created_at,
      updatedAt: booking.updated_at,
    };
  },

  async exportBookings(): Promise<string> {
    const bookings = await this.getAllBookings();
    return JSON.stringify(bookings, null, 2);
  },
};

// Contact API
export const contactApi = {
  async getAllContacts(): Promise<Contact[]> {
    const response = await fetch("/api/contacts");
    if (!response.ok) {
      throw new Error("Failed to fetch contacts");
    }
    return response.json();
  },

  async createContact(contactData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<Contact> {
    const response = await fetch("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error("Failed to create contact");
    }
    return response.json();
  },

  async updateContactStatus(
    id: string,
    status: "unread" | "read" | "replied",
  ): Promise<Contact> {
    const response = await fetch(`/api/contacts/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update contact status");
    }
    return response.json();
  },

  async getUnreadCount(): Promise<number> {
    const response = await fetch("/api/contacts/unread-count");
    if (!response.ok) {
      throw new Error("Failed to fetch unread count");
    }
    const data = await response.json();
    return data.count;
  },

  // Helper function to format data for frontend compatibility
  formatContactForFrontend(contact: Contact) {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject,
      message: contact.message,
      status: contact.status,
      timestamp: contact.created_at,
    };
  },
};

// Subscription API
export const subscriptionApi = {
  async subscribeEmail(email: string, name?: string): Promise<any> {
    const response = await fetch("/api/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    });

    if (!response.ok) {
      throw new Error("Failed to subscribe email");
    }
    return response.json();
  },

  async getSubscriptionsCount(): Promise<number> {
    const response = await fetch("/api/subscriptions/count");
    if (!response.ok) {
      throw new Error("Failed to fetch subscriptions count");
    }
    const data = await response.json();
    return data.count;
  },

  async getAllSubscriptions(): Promise<any[]> {
    const response = await fetch("/api/subscriptions");
    if (!response.ok) {
      throw new Error("Failed to fetch subscriptions");
    }
    return response.json();
  },
};
