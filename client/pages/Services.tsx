import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Crown,
  Gift,
  Heart,
  Award,
  Sparkles,
  Users,
  Flower,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Palette,
  Camera,
} from "lucide-react";

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 0,
      icon: <Crown className="w-12 h-12" />,
      title: "Wedding Planning & Decoration",
      subtitle: "Your Perfect Day, Perfectly Planned",
      description:
        "Complete wedding planning and elegant décor services that make your special day absolutely magical. We handle every detail from concept to execution.",
      features: [
        "Full wedding coordination from start to finish",
        "Custom theme development and styling",
        "Venue selection and transformation",
        "Live flower arrangements and bouquets",
        "Guest management and seating coordination",
        "Vendor coordination and timeline management",
        "Day-of wedding coordination",
        "Photo opportunity setups",
      ],
      pricing: "20% of wedding budget",
      additionalInfo:
        "Live flowers: Kshs 60,000 (includes transportation & styling)",
      color: "dusty-rose",
      bgImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      packages: ["Silver Package", "Gold Package", "Platinum Package"],
    },
    {
      id: 1,
      icon: <Gift className="w-12 h-12" />,
      title: "Birthday Celebrations",
      subtitle: "Making Every Year Count",
      description:
        "Memorable birthday celebrations with personalized touches that reflect the birthday person's personality and style.",
      features: [
        "Age-appropriate themed decorations",
        "Custom birthday setups and backdrops",
        "Party coordination and timeline",
        "Interactive entertainment areas",
        "Photo booth setups",
        "Cake table styling",
        "Gift station arrangements",
        "Clean-up services",
      ],
      pricing: "5% of event budget",
      additionalInfo: "Minimum budget: Kshs 25,000",
      color: "champagne-gold",
      bgImage:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
      packages: ["Basic Birthday", "Premium Birthday", "Luxury Birthday"],
    },
    {
      id: 2,
      icon: <Heart className="w-12 h-12" />,
      title: "Baby Showers & Gender Reveals",
      subtitle: "Celebrating New Beginnings",
      description:
        "Sweet celebrations for expectant parents with beautiful, Instagram-worthy setups that create lasting memories.",
      features: [
        "Gender-neutral and themed options",
        "Custom balloon arrangements",
        "Baby-themed backdrops",
        "Table setups with centerpieces",
        "Gift station styling",
        "Photo opportunity areas",
        "Expecting parent seating area",
        "Keepsake arrangement ideas",
      ],
      pricing: "From Kshs 15,000",
      additionalInfo: "Gender reveal packages available from Kshs 25,000",
      color: "pastel-pink",
      bgImage:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop",
      packages: ["Essential Shower", "Deluxe Shower", "Premium Reveal"],
    },
    {
      id: 3,
      icon: <Award className="w-12 h-12" />,
      title: "Graduations & Achievements",
      subtitle: "Honoring Success",
      description:
        "Celebrate academic achievements and life milestones with sophisticated styling that honors the graduate's accomplishments.",
      features: [
        "Academic-themed decorations",
        "School color coordination",
        "Achievement display areas",
        "Photo opportunity setups",
        "Family-friendly arrangements",
        "Diploma display styling",
        "Memory wall setups",
        "Celebration dinner coordination",
      ],
      pricing: "From Kshs 12,000",
      additionalInfo: "University graduation packages available",
      color: "deep-emerald",
      bgImage:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
      packages: ["Graduate Basic", "Honor Roll", "Magna Cum Laude"],
    },
    {
      id: 4,
      icon: <Sparkles className="w-12 h-12" />,
      title: "Bridal Showers & Bachelorettes",
      subtitle: "Pre-Wedding Celebrations",
      description:
        "Elegant pre-wedding celebrations that honor the bride-to-be with romantic themes and unforgettable experiences.",
      features: [
        "Romantic themed decorations",
        "Instagram-worthy photo setups",
        "Bridal chair styling",
        "Activity station arrangements",
        "Elegant table setups",
        "Keepsake display areas",
        "Champagne toast setups",
        "Memory book stations",
      ],
      pricing: "From Kshs 18,000",
      additionalInfo: "Bachelorette party coordination available",
      color: "dusty-rose",
      bgImage:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
      packages: ["Romantic Bridal", "Glamorous Goddess", "Luxury Celebration"],
    },
    {
      id: 5,
      icon: <Users className="w-12 h-12" />,
      title: "Corporate Events",
      subtitle: "Professional Excellence",
      description:
        "Professional corporate events with sophisticated styling that reflects your brand and creates lasting impressions.",
      features: [
        "Brand integration and color schemes",
        "Professional staging and setup",
        "AV equipment coordination",
        "Networking space arrangements",
        "Corporate branding displays",
        "Professional lighting setups",
        "Registration area styling",
        "Executive seating arrangements",
      ],
      pricing: "Custom quotes based on requirements",
      additionalInfo:
        "Volume discounts available for regular corporate clients",
      color: "deep-emerald",
      bgImage:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      packages: ["Professional", "Executive", "Premium Corporate"],
    },
    {
      id: 6,
      icon: <Flower className="w-12 h-12" />,
      title: "Floral Arrangements & Installations",
      subtitle: "Nature's Beauty Enhanced",
      description:
        "Beautiful floral arrangements and installations that bring natural beauty and elegance to any event or space.",
      features: [
        "Fresh flower bouquets and centerpieces",
        "Artificial flower arrangements",
        "Large-scale floral installations",
        "Seasonal flower selections",
        "Custom color combinations",
        "Venue-specific designs",
        "Delivery and setup included",
        "Maintenance instructions provided",
      ],
      pricing: "Fresh: Kshs 1,500-5,000 | Artificial: From Kshs 1,000",
      additionalInfo: "Installation services: From Kshs 10,000",
      color: "champagne-gold",
      bgImage:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
      packages: ["Bloom Basic", "Garden Paradise", "Floral Luxury"],
    },
  ];

  const additionalServices = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Styling",
      description:
        "Personalized design consultations and custom styling solutions",
      price: "From Kshs 5,000",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photo Setup",
      description: "Professional photo opportunity areas and backdrop designs",
      price: "From Kshs 3,000",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Same-Day Setup",
      description: "Express setup services for last-minute events",
      price: "Additional 30%",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Event Insurance",
      description: "Optional event insurance for peace of mind",
      price: "From Kshs 2,500",
    },
  ];

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
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-deep-emerald-800 via-deep-emerald-700 to-dusty-rose-800">
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
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <Sparkles className="w-12 h-12 text-dusty-rose-300" />
            </div>
          </motion.div>

          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-dusty-rose-300">Services</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
            Comprehensive event planning and decoration services designed to
            make your celebrations extraordinary
          </p>

          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
          >
            <Link to="/packages">View Packages</Link>
          </Button>
        </motion.div>
      </section>

      {/* Services Navigation */}
      <section className="bg-white py-8 sticky top-28 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeService === index
                    ? "bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-dusty-rose-100 hover:text-dusty-rose-700"
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Service Detail */}
      <section id="featured-service" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeService}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <motion.div
                className={`w-20 h-20 rounded-full bg-gradient-to-br from-${services[activeService].color}-100 to-${services[activeService].color}-200 flex items-center justify-center mb-6`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`text-${services[activeService].color}-600`}>
                  {services[activeService].icon}
                </div>
              </motion.div>

              <Badge
                className={`mb-4 bg-${services[activeService].color}-100 text-${services[activeService].color}-700`}
              >
                Featured Service
              </Badge>

              <h2 className="font-playfair text-4xl font-bold text-deep-emerald-800 mb-4">
                {services[activeService].title}
              </h2>

              <p className="text-xl text-dusty-rose-600 mb-6 font-medium">
                {services[activeService].subtitle}
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {services[activeService].description}
              </p>

              <div className="space-y-3 mb-8">
                {services[activeService].features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-dusty-rose-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-deep-emerald-800 mb-2">
                  Pricing
                </h4>
                <p className="text-dusty-rose-600 font-medium text-lg mb-2">
                  {services[activeService].pricing}
                </p>
                <p className="text-gray-600 text-sm">
                  {services[activeService].additionalInfo}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {services[activeService].packages.map((pkg) => (
                  <Badge
                    key={pkg}
                    variant="secondary"
                    className="bg-dusty-rose-100 text-dusty-rose-700"
                  >
                    {pkg}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
                >
                  <Link to="/book">Book This Service</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-deep-emerald-600 text-deep-emerald-600 hover:bg-deep-emerald-600 hover:text-white"
                >
                  <Link to="/packages">View Packages</Link>
                </Button>
              </div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={services[activeService].bgImage}
                  alt={services[activeService].title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-semibold">
                    {services[activeService].subtitle}
                  </p>
                  <p className="text-sm opacity-90">
                    Professional styling and coordination
                  </p>
                </div>
              </div>

              {/* Rating display */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 text-center mt-1">5.0</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-20 bg-gradient-to-br from-dusty-rose-50 to-champagne-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-emerald-800 mb-4">
              Complete Service Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, we offer
              comprehensive services for every occasion
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setActiveService(index);
                  // Scroll to featured service section
                  document.getElementById("featured-service")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="cursor-pointer"
              >
                <Card
                  className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    activeService === index ? "ring-2 ring-dusty-rose-400" : ""
                  }`}
                >
                  <div className="relative h-48">
                    <img
                      src={service.bgImage}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center`}
                      >
                        <div className="text-white text-xl">{service.icon}</div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-playfair text-lg font-semibold mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm opacity-90">{service.subtitle}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge
                          variant="secondary"
                          className={`bg-${service.color}-100 text-${service.color}-700`}
                        >
                          {service.pricing}
                        </Badge>
                        <ArrowRight className="w-5 h-5 text-dusty-rose-500" />
                      </div>

                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link to="/book">Book This Service</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl font-bold text-deep-emerald-800 mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your event with our specialized add-on services and
              customization options
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="text-center p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-dusty-rose-100 to-dusty-rose-200 flex items-center justify-center mb-4 mx-auto">
                      <div className="text-dusty-rose-600">{service.icon}</div>
                    </div>

                    <h3 className="font-semibold text-deep-emerald-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {service.description}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-champagne-gold-100 text-champagne-gold-700"
                    >
                      {service.price}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-deep-emerald-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Planning?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Let's discuss your event needs and create a customized service
              package that fits your vision and budget.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
              >
                <Link to="/book">Book Consultation</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-deep-emerald-800"
              >
                <Link to="/contact">Get Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
