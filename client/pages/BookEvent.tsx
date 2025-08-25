import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  DollarSign,
  Heart,
  CheckCircle,
  Star,
  Clock,
  Phone,
  Mail,
  Gift,
  Crown,
  Flower,
  Sparkles,
  Award,
} from "lucide-react";

export default function BookEvent() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    packageType: "",
    selectedAddOns: [] as string[],
    eventDate: null as Date | null,
    location: "",
    guestCount: "",
    budget: "",
    services: [] as string[],
    bouquetType: "",
    specialRequests: "",
    preferredContact: "phone",
  });

  const [showThankYou, setShowThankYou] = useState(false);

  // Pre-fill form data from URL parameters
  useEffect(() => {
    const eventType = searchParams.get("eventType");
    const packageType = searchParams.get("packageType");
    const addOn = searchParams.get("addOn");

    if (eventType) {
      // Map package category to event type
      let mappedEventType = eventType;
      if (eventType === "special") {
        // For special events, try to determine from package name
        if (packageType?.toLowerCase().includes("baby")) {
          mappedEventType = "baby-shower";
        } else if (packageType?.toLowerCase().includes("graduation")) {
          mappedEventType = "graduation";
        } else if (packageType?.toLowerCase().includes("bridal")) {
          mappedEventType = "bridal-shower";
        }
      }

      setFormData((prev) => ({
        ...prev,
        eventType: mappedEventType,
        packageType: packageType || "",
        selectedAddOns: addOn ? [addOn] : prev.selectedAddOns,
      }));
    } else if (addOn) {
      // If only add-on is selected
      setFormData((prev) => ({
        ...prev,
        selectedAddOns: [...prev.selectedAddOns, addOn],
      }));
    }
  }, [searchParams]);

  const eventTypes = [
    { value: "wedding", label: "Wedding", icon: <Crown className="w-4 h-4" /> },
    {
      value: "birthday",
      label: "Birthday Party",
      icon: <Gift className="w-4 h-4" />,
    },
    {
      value: "baby-shower",
      label: "Baby Shower",
      icon: <Heart className="w-4 h-4" />,
    },
    {
      value: "graduation",
      label: "Graduation",
      icon: <Award className="w-4 h-4" />,
    },
    {
      value: "bridal-shower",
      label: "Bridal Shower",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      value: "corporate",
      label: "Corporate Event",
      icon: <Users className="w-4 h-4" />,
    },
    { value: "other", label: "Other", icon: <Star className="w-4 h-4" /> },
  ];

  const packageTypes = {
    wedding: [
      { value: "Silver Wedding", label: "Silver Wedding - Essential Elegance" },
      { value: "Gold Wedding", label: "Gold Wedding - Premium Experience" },
      {
        value: "Platinum Wedding",
        label: "Platinum Wedding - Luxury Perfection",
      },
    ],
    birthday: [
      { value: "Basic Birthday", label: "Basic Birthday - Fun & Festive" },
      {
        value: "Premium Birthday",
        label: "Premium Birthday - Memorable Celebration",
      },
      {
        value: "Luxury Birthday",
        label: "Luxury Birthday - Unforgettable Experience",
      },
    ],
    corporate: [
      { value: "Professional", label: "Professional - Corporate Standard" },
      { value: "Executive", label: "Executive - Enhanced Corporate" },
      {
        value: "Premium Corporate",
        label: "Premium Corporate - Luxury Business Events",
      },
    ],
    "baby-shower": [
      {
        value: "Baby Shower Bliss",
        label: "Baby Shower Bliss - Sweet Celebrations",
      },
    ],
    graduation: [
      {
        value: "Graduation Glory",
        label: "Graduation Glory - Achievement Celebration",
      },
    ],
    "bridal-shower": [
      {
        value: "Bridal Shower Romance",
        label: "Bridal Shower Romance - Pre-Wedding Magic",
      },
    ],
    other: [],
  };

  const addOnOptions = [
    { id: "live-flowers", label: "Live Flowers", price: "Kshs 60,000" },
    {
      id: "photography-setup",
      label: "Photography Setup",
      price: "Kshs 5,000",
    },
    {
      id: "advanced-lighting",
      label: "Advanced Lighting",
      price: "Kshs 15,000",
    },
    {
      id: "backup-coordination",
      label: "Backup Coordination",
      price: "Kshs 8,000",
    },
    { id: "same-day-changes", label: "Same-Day Changes", price: "30% extra" },
    { id: "extended-hours", label: "Extended Hours", price: "Kshs 5,000/hour" },
  ];

  const services = [
    { id: "planning", label: "Event Planning & Coordination", price: "Varies" },
    {
      id: "decoration",
      label: "Event Decoration & Styling",
      price: "From Kshs 10,000",
    },
    { id: "bouquet", label: "Bouquet Services", price: "From Kshs 1,000" },
    { id: "venue", label: "Venue Styling & Setup", price: "From Kshs 15,000" },
    { id: "flowers", label: "Floral Installations", price: "From Kshs 5,000" },
    { id: "photography", label: "Photo Setup Areas", price: "From Kshs 3,000" },
  ];

  const bouquetTypes = [
    { value: "fresh", label: "Fresh Flowers", price: "Kshs 1,500 - 5,000" },
    { value: "money", label: "Money Bouquets", price: "From Kshs 3,000" },
    {
      value: "artificial",
      label: "Artificial Flowers",
      price: "From Kshs 1,000",
    },
    { value: "mixed", label: "Mixed Arrangement", price: "Custom Quote" },
  ];

  const budgetRanges = [
    "Under Kshs 25,000",
    "Kshs 25,000 - 50,000",
    "Kshs 50,000 - 100,000",
    "Kshs 100,000 - 200,000",
    "Kshs 200,000 - 500,000",
    "Over Kshs 500,000",
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, serviceId]
        : prev.services.filter((s) => s !== serviceId),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Import database API to save booking
      import("@/lib/databaseApi").then(async ({ bookingApi }) => {
        try {
          // Save booking to database
          const bookingData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            eventType: formData.eventType,
            packageType: formData.packageType,
            selectedAddOns: formData.selectedAddOns,
            eventDate: formData.eventDate
              ? formData.eventDate.toISOString().split("T")[0]
              : "",
            location: formData.location,
            guestCount: formData.guestCount,
            budget: formData.budget,
            services: formData.services,
            specialRequests: formData.specialRequests,
          };

          const savedBooking = await bookingApi.createBooking(bookingData);
          console.log("Booking saved:", savedBooking);
          setShowThankYou(true);
        } catch (error) {
          console.error("Error saving booking:", error);
          // Still show thank you message even if save fails
          setShowThankYou(true);
        }
      });
    } catch (error) {
      console.error("Error saving booking:", error);
      // Still show thank you message even if storage fails
      setShowThankYou(true);
    }
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastel-pink to-dusty-rose-100">
        <motion.div
          className="text-center px-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-dusty-rose-500 to-deep-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-deep-emerald-800 mb-6">
            Thank You!
          </h1>

          <p className="text-xl text-gray-700 mb-4">
            We've received your event request and are excited to help create
            your magical moment!
          </p>

          <p className="text-gray-600 mb-8">
            A member of our team will call you within 24 hours to discuss your
            event details and provide a personalized quote.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowThankYou(false)}
              className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
            >
              Book Another Event
            </Button>
            <Button
              variant="outline"
              className="border-deep-emerald-600 text-deep-emerald-600 hover:bg-deep-emerald-600 hover:text-white"
            >
              View Our Gallery
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

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
              <CalendarIcon className="w-10 h-10 text-dusty-rose-300" />
            </div>
          </motion.div>

          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Book Your <span className="text-dusty-rose-300">Dream Event</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
            Let's bring your vision to life. Fill out our comprehensive form and
            we'll create a customized quote for your special celebration.
          </p>
        </motion.div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-dusty-rose-600" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <Label>Preferred Contact Method</Label>
                    <div className="flex space-x-4 mt-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="contact"
                          value="phone"
                          checked={formData.preferredContact === "phone"}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              preferredContact: e.target.value,
                            }))
                          }
                          className="text-dusty-rose-600"
                        />
                        <Phone className="w-4 h-4" />
                        <span>Phone</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="contact"
                          value="email"
                          checked={formData.preferredContact === "email"}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              preferredContact: e.target.value,
                            }))
                          }
                          className="text-dusty-rose-600"
                        />
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-dusty-rose-600" />
                  <span>Event Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Event Type *</Label>
                    <Select
                      value={formData.eventType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          eventType: value,
                          packageType: "",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center space-x-2">
                              {type.icon}
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Package Type *</Label>
                    <Select
                      value={formData.packageType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, packageType: value }))
                      }
                      disabled={!formData.eventType}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            formData.eventType
                              ? "Select package type"
                              : "Select event type first"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.eventType &&
                          packageTypes[
                            formData.eventType as keyof typeof packageTypes
                          ]?.map((pkg) => (
                            <SelectItem key={pkg.value} value={pkg.value}>
                              {pkg.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Event Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.eventDate
                            ? format(formData.eventDate, "PPP")
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.eventDate}
                          onSelect={(date) =>
                            setFormData((prev) => ({
                              ...prev,
                              eventDate: date,
                            }))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">Event Location *</Label>
                    <Input
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      placeholder="City, venue, or address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Expected Guest Count</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={formData.guestCount}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          guestCount: e.target.value,
                        }))
                      }
                      placeholder="Number of guests"
                    />
                  </div>
                </div>
                <div>
                  <Label>Estimated Budget *</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, budget: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Services Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-dusty-rose-600" />
                  <span>Services Required</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={service.id}
                        checked={formData.services.includes(service.id)}
                        onCheckedChange={(checked) =>
                          handleServiceChange(service.id, checked as boolean)
                        }
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={service.id}
                          className="font-medium cursor-pointer"
                        >
                          {service.label}
                        </Label>
                        <p className="text-sm text-gray-600">{service.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Package Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-dusty-rose-600" />
                  <span>Enhance Your Package</span>
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Add these optional services to make your event even more
                  special
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addOnOptions.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={addon.id}
                        checked={formData.selectedAddOns.includes(addon.label)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData((prev) => ({
                              ...prev,
                              selectedAddOns: [
                                ...prev.selectedAddOns,
                                addon.label,
                              ],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              selectedAddOns: prev.selectedAddOns.filter(
                                (item) => item !== addon.label,
                              ),
                            }));
                          }
                        }}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={addon.id}
                          className="font-medium cursor-pointer"
                        >
                          {addon.label}
                        </Label>
                        <p className="text-sm text-gray-600">{addon.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bouquet Selection */}
            {formData.services.includes("bouquet") && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Flower className="w-5 h-5 text-dusty-rose-600" />
                    <span>Bouquet Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bouquetTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          formData.bouquetType === type.value
                            ? "border-dusty-rose-400 bg-dusty-rose-50"
                            : "border-gray-200"
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            bouquetType: type.value,
                          }))
                        }
                      >
                        <h4 className="font-medium mb-1">{type.label}</h4>
                        <p className="text-sm text-gray-600">{type.price}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Special Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-dusty-rose-600" />
                  <span>Special Requests & Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specialRequests: e.target.value,
                    }))
                  }
                  placeholder="Tell us about your vision, special requirements, themes, colors, or any other details that would help us create your perfect event..."
                  rows={5}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                disabled={
                  !formData.name ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.eventType ||
                  !formData.packageType ||
                  !formData.eventDate ||
                  !formData.location ||
                  !formData.guestCount ||
                  !formData.budget
                }
                className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white px-12 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Event Request
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                We'll contact you within 24 hours to discuss your event and
                provide a detailed quote.
              </p>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gradient-to-br from-dusty-rose-50 to-champagne-gold-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl font-bold text-deep-emerald-800 mb-4">
              What Happens Next?
            </h2>
            <p className="text-lg text-gray-600">
              Our simple 4-step process to bring your event to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Consultation Call",
                description:
                  "We'll call you within 24 hours to discuss your vision and requirements",
                icon: <Phone className="w-8 h-8" />,
              },
              {
                step: 2,
                title: "Custom Proposal",
                description:
                  "Receive a detailed proposal with pricing and design concepts",
                icon: <Star className="w-8 h-8" />,
              },
              {
                step: 3,
                title: "Planning & Preparation",
                description:
                  "We handle all the planning, coordination, and preparation",
                icon: <CheckCircle className="w-8 h-8" />,
              },
              {
                step: 4,
                title: "Perfect Execution",
                description: "Sit back and enjoy your perfectly executed event",
                icon: <Heart className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-dusty-rose-500 to-deep-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-dusty-rose-600 mb-2">
                  STEP {item.step}
                </div>
                <h3 className="font-playfair text-xl font-semibold text-deep-emerald-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
