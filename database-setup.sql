-- Mirie Decors Database Schema
-- Run this SQL in your PostgreSQL database to create the required tables

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_type TEXT NOT NULL,
  package_type TEXT,
  event_date TEXT NOT NULL,
  location TEXT NOT NULL,
  guest_count INTEGER,
  budget TEXT NOT NULL,
  services JSONB DEFAULT '[]'::jsonb,
  selected_add_ons JSONB DEFAULT '[]'::jsonb,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  status_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Email subscriptions table
CREATE TABLE email_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT DEFAULT 'footer',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'pending')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
CREATE INDEX idx_email_subscriptions_status ON email_subscriptions(status);
CREATE INDEX idx_email_subscriptions_email ON email_subscriptions(email);

-- Insert some sample data (optional)
INSERT INTO bookings (name, email, event_type, event_date, location, budget, services)
VALUES 
  ('John Doe', 'john@example.com', 'Wedding', '2024-06-15', 'Downtown Hotel', '5000-10000', '["Photography", "Catering"]'),
  ('Jane Smith', 'jane@example.com', 'Corporate Event', '2024-07-20', 'Conference Center', '2000-5000', '["Photography", "Decorations"]');

INSERT INTO contacts (name, email, subject, message)
VALUES 
  ('Mike Johnson', 'mike@example.com', 'Wedding Inquiry', 'Hi, I would like to know more about your wedding packages for next summer.');
