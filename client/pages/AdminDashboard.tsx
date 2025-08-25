import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { bookingApi, contactApi, subscriptionApi } from "@/lib/databaseApi";
import {
  Calendar,
  Users,
  UserPlus,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Trash2,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Search,
  BarChart3,
  TrendingUp,
  Star,
  Crown,
  Loader2,
} from "lucide-react";

// Types for compatibility with existing code
interface Booking {
  id: string;
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
  status: "pending" | "confirmed" | "completed" | "cancelled";
  statusNotes?: string;
  timestamp: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  timestamp: string;
}

interface BookingStats {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<BookingStats>({
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [unreadContacts, setUnreadContacts] = useState(0);
  const [subscriptionsCount, setSubscriptionsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "contacts"
  >("overview");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(
    null,
  );
  const [statusUpdate, setStatusUpdate] = useState({ status: "", notes: "" });
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const isAdmin = localStorage.getItem("mirie_admin_logged_in");
    if (isAdmin !== "true") {
      navigate("/deco");
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [
        bookingsData,
        contactsData,
        statsData,
        unreadCount,
        subscriptions,
      ] = await Promise.all([
        bookingApi.getAllBookings(),
        contactApi.getAllContacts(),
        bookingApi.getBookingStats(),
        contactApi.getUnreadCount(),
        subscriptionApi.getSubscriptionsCount(),
      ]);

      // Format data for frontend compatibility
      const formattedBookings = bookingsData.map(
        bookingApi.formatBookingForFrontend,
      );
      const formattedContacts = contactsData.map(
        contactApi.formatContactForFrontend,
      );

      setBookings(formattedBookings);
      setContacts(formattedContacts);
      setStats(statsData);
      setUnreadContacts(unreadCount);
      setSubscriptionsCount(subscriptions);
    } catch (error) {
      console.error("Error loading data:", error);
      // You might want to show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId: string) => {
    if (!statusUpdate.status) return;

    try {
      setUpdatingStatus(true);
      await bookingApi.updateBookingStatus(
        bookingId,
        statusUpdate.status,
        statusUpdate.notes,
      );
      await loadData(); // Reload all data
      setSelectedBooking(null);
      setStatusUpdate({ status: "", notes: "" });
    } catch (error) {
      console.error("Error updating booking status:", error);
      // You might want to show a toast notification here
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      await bookingApi.deleteBooking(bookingId);
      await loadData(); // Reload all data
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error deleting booking:", error);
      // You might want to show a toast notification here
    }
  };

  const handleContactStatusUpdate = async (
    contactId: string,
    status: ContactMessage["status"],
  ) => {
    try {
      await contactApi.updateContactStatus(contactId, status);
      await loadData(); // Reload all data
    } catch (error) {
      console.error("Error updating contact status:", error);
      // You might want to show a toast notification here
    }
  };

  const exportBookings = async () => {
    try {
      const data = await bookingApi.exportBookings();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mirie-decors-bookings-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting bookings:", error);
      // You might want to show a toast notification here
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "unread":
        return "bg-red-100 text-red-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="font-playfair text-2xl font-bold text-deep-emerald-800">
                Mirie Decors Admin
              </h1>
              <p className="text-sm text-gray-600">
                Manage bookings and contacts (Database Connected)
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={exportBookings}
                variant="outline"
                size="sm"
                className="border-dusty-rose-500 text-dusty-rose-600 hover:bg-dusty-rose-500 hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>

              <Button
                onClick={() => {
                  localStorage.removeItem("mirie_admin_logged_in");
                  navigate("/");
                }}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              {
                id: "overview",
                name: "Overview",
                icon: <BarChart3 className="w-4 h-4" />,
              },
              {
                id: "bookings",
                name: `Bookings (${bookings.length})`,
                icon: <Calendar className="w-4 h-4" />,
              },
              {
                id: "contacts",
                name: `Contacts (${unreadContacts})`,
                icon: <MessageCircle className="w-4 h-4" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-dusty-rose-500 text-dusty-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div variants={itemVariants}>
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveTab("bookings")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Pending Bookings
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.pending}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveTab("bookings")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Confirmed Bookings
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.confirmed}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveTab("bookings")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Completed Events
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.completed}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveTab("contacts")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-dusty-rose-100 rounded-full flex items-center justify-center">
                        <UserPlus className="w-6 h-6 text-dusty-rose-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Email Subscribers
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {subscriptionsCount}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-dusty-rose-600" />
                      Recent Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookings.slice(0, 5).map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {booking.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {booking.eventType} •{" "}
                              {new Date(booking.eventDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2 text-dusty-rose-600" />
                      Recent Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contacts.slice(0, 5).map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {contact.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {contact.subject}
                            </p>
                          </div>
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Filters */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search bookings..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dusty-rose-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bookings List */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Event Bookings ({filteredBookings.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {booking.name}
                              </h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(
                                  booking.eventDate,
                                ).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <Crown className="w-4 h-4 mr-1" />
                                {booking.eventType}
                                {booking.packageType && (
                                  <Badge
                                    variant="secondary"
                                    className="ml-2 text-xs"
                                  >
                                    {booking.packageType}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {booking.location}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {booking.guestCount || "N/A"} guests
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedBooking(booking)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Booking Details</DialogTitle>
                                </DialogHeader>
                                {selectedBooking && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="font-semibold">
                                          Name
                                        </Label>
                                        <p>{selectedBooking.name}</p>
                                      </div>
                                      <div>
                                        <Label className="font-semibold">
                                          Email
                                        </Label>
                                        <p>{selectedBooking.email}</p>
                                      </div>
                                      <div>
                                        <Label className="font-semibold">
                                          Phone
                                        </Label>
                                        <p>{selectedBooking.phone}</p>
                                      </div>
                                      <div>
                                        <Label className="font-semibold">
                                          Event Type
                                        </Label>
                                        <p>{selectedBooking.eventType}</p>
                                      </div>
                                      <div>
                                        <Label className="font-semibold">
                                          Package Type
                                        </Label>
                                        <p>
                                          {selectedBooking.packageType ||
                                            "Not specified"}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="font-semibold">
                                          Event Date
                                        </Label>
                                        <p>
                                          {new Date(
                                            selectedBooking.eventDate,
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="font-semibold">
                                          Location
                                        </Label>
                                        <p>{selectedBooking.location}</p>
                                      </div>
                                      <div>
                                        <Label className="font-semibold">
                                          Guests
                                        </Label>
                                        <p>
                                          {selectedBooking.guestCount ||
                                            "Not specified"}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="font-semibold">
                                          Budget
                                        </Label>
                                        <p>{selectedBooking.budget}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="font-semibold">
                                        Services Required
                                      </Label>
                                      <div className="flex flex-wrap gap-2 mt-1">
                                        {selectedBooking.services.map(
                                          (service) => (
                                            <Badge
                                              key={service}
                                              variant="secondary"
                                            >
                                              {service}
                                            </Badge>
                                          ),
                                        )}
                                      </div>
                                    </div>

                                    {selectedBooking.selectedAddOns &&
                                      selectedBooking.selectedAddOns.length >
                                        0 && (
                                        <div>
                                          <Label className="font-semibold">
                                            Selected Add-ons
                                          </Label>
                                          <div className="flex flex-wrap gap-2 mt-1">
                                            {selectedBooking.selectedAddOns.map(
                                              (addon, index) => (
                                                <Badge
                                                  key={index}
                                                  variant="outline"
                                                  className="bg-dusty-rose-50 text-dusty-rose-700 border-dusty-rose-200"
                                                >
                                                  {addon}
                                                </Badge>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      )}

                                    {selectedBooking.specialRequests && (
                                      <div>
                                        <Label className="font-semibold">
                                          Special Requests
                                        </Label>
                                        <p className="text-sm text-gray-600 mt-1">
                                          {selectedBooking.specialRequests}
                                        </p>
                                      </div>
                                    )}

                                    <div className="flex items-center space-x-4 pt-4 border-t">
                                      <div className="flex-1">
                                        <Select
                                          value={statusUpdate.status}
                                          onValueChange={(value) =>
                                            setStatusUpdate((prev) => ({
                                              ...prev,
                                              status: value,
                                            }))
                                          }
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Update status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="pending">
                                              Pending
                                            </SelectItem>
                                            <SelectItem value="confirmed">
                                              Confirmed
                                            </SelectItem>
                                            <SelectItem value="completed">
                                              Completed
                                            </SelectItem>
                                            <SelectItem value="cancelled">
                                              Cancelled
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <Button
                                        onClick={() =>
                                          handleStatusUpdate(selectedBooking.id)
                                        }
                                        disabled={
                                          !statusUpdate.status || updatingStatus
                                        }
                                        className="bg-dusty-rose-500 hover:bg-dusty-rose-600"
                                      >
                                        {updatingStatus ? (
                                          <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                          "Update"
                                        )}
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleDeleteBooking(
                                            selectedBooking.id,
                                          )
                                        }
                                        variant="destructive"
                                        size="sm"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredBookings.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No bookings found matching your criteria.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages ({contacts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {contact.name}
                              </h3>
                              <Badge className={getStatusColor(contact.status)}>
                                {contact.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 mb-2">
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" />
                                {contact.email}
                              </div>
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {contact.phone || "N/A"}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(
                                  contact.timestamp,
                                ).toLocaleDateString()}
                              </div>
                            </div>

                            <p className="font-medium text-gray-800 mb-1">
                              {contact.subject}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {contact.message}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedContact(contact)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Contact Message</DialogTitle>
                                </DialogHeader>
                                {selectedContact && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label className="font-semibold">
                                        From
                                      </Label>
                                      <p>
                                        {selectedContact.name} (
                                        {selectedContact.email})
                                      </p>
                                    </div>
                                    <div>
                                      <Label className="font-semibold">
                                        Subject
                                      </Label>
                                      <p>{selectedContact.subject}</p>
                                    </div>
                                    <div>
                                      <Label className="font-semibold">
                                        Message
                                      </Label>
                                      <p className="text-sm bg-gray-50 p-3 rounded">
                                        {selectedContact.message}
                                      </p>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        onClick={() =>
                                          handleContactStatusUpdate(
                                            selectedContact.id,
                                            "read",
                                          )
                                        }
                                        size="sm"
                                        variant="outline"
                                      >
                                        Mark as Read
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handleContactStatusUpdate(
                                            selectedContact.id,
                                            "replied",
                                          )
                                        }
                                        size="sm"
                                        className="bg-dusty-rose-500 hover:bg-dusty-rose-600"
                                      >
                                        Mark as Replied
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    ))}

                    {contacts.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No contact messages yet.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
