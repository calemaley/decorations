import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Calendar,
  User,
  Star,
  Navigation,
  Building,
  Heart,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Numbers",
      details: [
        { label: "Main Line", value: "0769476192" },
        { label: "WhatsApp", value: "0769476192" },
        { label: "Emergency", value: "0769476192" },
      ],
      color: "dusty-rose",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Addresses",
      details: [
        { label: "General Inquiries", value: "mwendemiriam85@gmail.com" },
        { label: "Bookings", value: "mwendemiriam85@gmail.com" },
        { label: "Support", value: "mwendemiriam85@gmail.com" },
      ],
      color: "deep-emerald",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Locations",
      details: [
        { label: "Service Area", value: "All over Kenya" },
        { label: "Coverage", value: "Nationwide Service" },
        { label: "Consultation", value: "At Your Location" },
      ],
      color: "champagne-gold",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        { label: "Monday - Friday", value: "24 Hours" },
        { label: "Saturday & Sunday", value: "Closed" },
        { label: "Note", value: "Open for deliveries/appointments" },
      ],
      color: "dusty-rose",
    },
  ];

  const serviceAreas = [
    {
      name: "Nationwide Service",
      address: "All over Kenya",
      phone: "0769476192",
      email: "mwendemiriam85@gmail.com",
      coordinates: { lat: -0.0236, lng: 37.9062 }, // Center of Kenya
      services: [
        "Event Planning & Coordination",
        "Venue Decoration",
        "Bouquet Design & Delivery",
        "On-site Consultations",
        "Emergency Services",
      ],
      hours: "Mon-Fri: 24 Hours, Weekends: Deliveries/Appointments Only",
      description:
        "We bring our services directly to your location anywhere in Kenya",
    },
  ];

  const subjects = [
    "General Inquiry",
    "Event Booking",
    "Bouquet Order",
    "Pricing Information",
    "Venue Partnership",
    "Complaint/Feedback",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Import database API to save contact
      import("@/lib/databaseApi").then(async ({ contactApi }) => {
        try {
          // Save contact message to database
          const contactData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          };

          const savedContact = await contactApi.createContact(contactData);
          console.log("Contact message saved:", savedContact);
          setSubmitted(true);

          // Reset form after 3 seconds
          setTimeout(() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            });
          }, 3000);
        } catch (error) {
          console.error("Error saving contact:", error);
          // You might want to show an error message to the user here
        }
      });
    } catch (error) {
      console.error("Error saving contact message:", error);
      // Still show success message even if storage fails
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }
  };

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-deep-emerald-800 to-dusty-rose-800">
        <div className="absolute inset-0 bg-black/20"></div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <MessageCircle className="w-10 h-10 text-dusty-rose-300" />
            </div>
          </motion.div>

          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Get in <span className="text-dusty-rose-300">Touch</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
            Ready to plan your dream event? We're here to help make it magical.
            Contact us today!
          </p>

          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Free</div>
              <div className="text-sm opacity-90">Consultation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Same Day</div>
              <div className="text-sm opacity-90">Response</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br from-${info.color}-100 to-${info.color}-200 flex items-center justify-center mx-auto mb-4`}
                    >
                      <div className={`text-${info.color}-600`}>
                        {info.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-deep-emerald-800">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {info.details.map((detail, idx) => (
                        <div key={idx}>
                          <div className="text-xs font-medium text-gray-500">
                            {detail.label}
                          </div>
                          <div className="text-sm text-gray-700 font-medium">
                            {detail.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Large Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl font-bold text-deep-emerald-800 mb-4">
              Find Us on the Map
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We serve all over Kenya. Schedule a consultation at your preferred
              location
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Areas */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {serviceAreas.map((area, index) => (
                <Card
                  key={area.name}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-dusty-rose-500 to-deep-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-playfair text-lg font-semibold text-deep-emerald-800 mb-2">
                          {area.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {area.description}
                        </p>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-dusty-rose-500" />
                            {area.address}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-dusty-rose-500" />
                            {area.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-dusty-rose-500" />
                            {area.email}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-dusty-rose-500" />
                            {area.hours}
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-medium text-deep-emerald-800 mb-2">
                            Services Available:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {area.services.map((service) => (
                              <span
                                key={service}
                                className="text-xs bg-dusty-rose-100 text-dusty-rose-700 px-2 py-1 rounded-full"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Button
                          className="w-full mt-4 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
                          onClick={() => {
                            window.open(
                              "https://wa.me/254769476192?text=Hi! I'd like to inquire about your services in my area.",
                              "_blank",
                            );
                          }}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contact Us
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Large Map */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-0 shadow-xl overflow-hidden h-full">
                <div className="h-96 lg:h-full min-h-[400px] bg-gray-200 relative">
                  {/* Google Maps Embed - Full Kenya */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4076518.4167707274!2d34.79639785!3d-0.16628084999999986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182780d08350900f%3A0x403b0eb0a1976dd9!2sKenya!5e0!3m2!1sen!2s!4v1678889234567!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mirie Decors Service Area - All Kenya"
                    className="absolute inset-0"
                  />

                  {/* Map Overlay with Service Info */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <h4 className="font-semibold text-deep-emerald-800 mb-2">
                      Service Coverage
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        All 47 Counties
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-dusty-rose-500 rounded-full mr-2"></div>
                        On-site Services
                      </div>
                    </div>
                  </div>

                  {/* Service Area Indicator */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center text-sm font-medium text-deep-emerald-800">
                      <Heart className="w-4 h-4 mr-2 text-dusty-rose-500" />
                      Serving All Kenya
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl font-bold text-deep-emerald-800 mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question or ready to start planning? Fill out the form
              below and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                {submitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-deep-emerald-800 mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting us. We'll get back to you within
                      24 hours.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-dusty-rose-600">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-medium">
                        We appreciate your interest!
                      </span>
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Enter your full name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="Enter your email"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="+254 XXX XXX XXX"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Subject *</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, subject: value }))
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        placeholder="Tell us about your event, questions, or how we can help you..."
                        rows={6}
                        className="mt-1"
                      />
                    </div>

                    <div className="text-center">
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white px-12"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                      <p className="text-sm text-gray-500 mt-4">
                        We typically respond within 24 hours during business
                        days.
                      </p>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gradient-to-br from-dusty-rose-50 to-champagne-gold-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-3xl font-bold text-deep-emerald-800 mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-lg text-gray-600">
              Choose the fastest way to get in touch with us
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-deep-emerald-800 mb-2">
                  WhatsApp Chat
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get instant responses via WhatsApp
                </p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    window.open("https://wa.me/254769476192", "_blank")
                  }
                >
                  Chat Now
                </Button>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-deep-emerald-800 mb-2">
                  Call Us Now
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Speak directly with our team
                </p>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open("tel:+254769476192", "_blank")}
                >
                  Call Now
                </Button>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="w-16 h-16 bg-dusty-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8 text-dusty-rose-600" />
                </div>
                <h3 className="font-semibold text-deep-emerald-800 mb-2">
                  Book Consultation
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Schedule a free consultation
                </p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
                >
                  <a href="/book">Book Now</a>
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
