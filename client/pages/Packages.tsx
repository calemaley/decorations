import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  X,
  Star,
  Diamond,
  Zap,
} from "lucide-react";

export default function Packages() {
  const [activeCategory, setActiveCategory] = useState("wedding");

  const packageCategories = [
    {
      id: "wedding",
      name: "Wedding Packages",
      icon: <Crown className="w-5 h-5" />,
    },
    {
      id: "birthday",
      name: "Birthday Packages",
      icon: <Gift className="w-5 h-5" />,
    },
    {
      id: "corporate",
      name: "Corporate Packages",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "special",
      name: "Special Events",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  const packages = {
    wedding: [
      {
        name: "Silver Wedding",
        subtitle: "Essential Elegance",
        price: "20% of wedding budget",
        minBudget: "Minimum Kshs 200,000",
        popular: false,
        icon: <Award className="w-8 h-8" />,
        color: "gray",
        features: [
          "Basic venue decoration",
          "Ceremony setup",
          "Table centerpieces",
          "Basic lighting",
          "Coordination on wedding day",
          "Setup and breakdown",
        ],
        notIncluded: ["Live flowers", "Advanced lighting", "Photography setup"],
      },
      {
        name: "Gold Wedding",
        subtitle: "Premium Experience",
        price: "20% of wedding budget",
        minBudget: "Minimum Kshs 300,000",
        popular: true,
        icon: <Crown className="w-8 h-8" />,
        color: "yellow",
        features: [
          "Complete venue transformation",
          "Ceremony & reception setup",
          "Premium table arrangements",
          "Advanced lighting design",
          "Live flower options",
          "Photography setup areas",
          "Full day coordination",
          "Guest management assistance",
          "Backup coordination team",
        ],
        notIncluded: ["Catering coordination", "Entertainment booking"],
      },
      {
        name: "Platinum Wedding",
        subtitle: "Luxury Perfection",
        price: "20% of wedding budget",
        minBudget: "Minimum Kshs 500,000",
        popular: false,
        icon: <Diamond className="w-8 h-8" />,
        color: "blue",
        features: [
          "Luxury venue transformation",
          "Multiple setup areas",
          "Premium live flowers",
          "Designer lighting systems",
          "Professional photography setups",
          "VIP guest management",
          "Complete timeline coordination",
          "Backup plans and contingencies",
          "Post-wedding cleanup",
          "Vendor coordination",
          "Bridal suite preparation",
        ],
        notIncluded: [],
      },
    ],
    birthday: [
      {
        name: "Basic Birthday",
        subtitle: "Fun & Festive",
        price: "Kshs 15,000 - 25,000",
        minBudget: "Perfect for small gatherings",
        popular: false,
        icon: <Gift className="w-8 h-8" />,
        color: "pink",
        features: [
          "Themed decorations",
          "Balloon arrangements",
          "Table setup for 20 guests",
          "Birthday backdrop",
          "Basic setup and cleanup",
        ],
        notIncluded: ["Entertainment", "Catering", "Photography"],
      },
      {
        name: "Premium Birthday",
        subtitle: "Memorable Celebration",
        price: "Kshs 25,000 - 45,000",
        minBudget: "Great for medium parties",
        popular: true,
        icon: <Sparkles className="w-8 h-8" />,
        color: "purple",
        features: [
          "Custom theme design",
          "Professional balloon arch",
          "Table setup for 50 guests",
          "Photo booth area",
          "Cake table styling",
          "Gift station setup",
          "Coordination during event",
          "Complete cleanup",
        ],
        notIncluded: ["Live entertainment", "Catering services"],
      },
      {
        name: "Luxury Birthday",
        subtitle: "Unforgettable Experience",
        price: "Kshs 45,000+",
        minBudget: "For grand celebrations",
        popular: false,
        icon: <Crown className="w-8 h-8" />,
        color: "gold",
        features: [
          "Designer custom themes",
          "Professional lighting",
          "Multiple photo opportunities",
          "VIP seating arrangements",
          "Interactive entertainment areas",
          "Professional coordination team",
          "Live flower arrangements",
          "Complete event management",
        ],
        notIncluded: [],
      },
    ],
    corporate: [
      {
        name: "Professional",
        subtitle: "Corporate Standard",
        price: "Kshs 50,000 - 100,000",
        minBudget: "For standard corporate events",
        popular: false,
        icon: <Users className="w-8 h-8" />,
        color: "blue",
        features: [
          "Professional setup",
          "Corporate branding integration",
          "Registration area",
          "Basic AV coordination",
          "Professional seating",
          "Setup and breakdown",
        ],
        notIncluded: [
          "AV equipment rental",
          "Catering coordination",
          "Entertainment",
        ],
      },
      {
        name: "Executive",
        subtitle: "Enhanced Corporate",
        price: "Kshs 100,000 - 200,000",
        minBudget: "For important corporate events",
        popular: true,
        icon: <Award className="w-8 h-8" />,
        color: "green",
        features: [
          "Premium venue styling",
          "Advanced brand integration",
          "VIP registration areas",
          "Professional lighting",
          "Executive seating arrangements",
          "Networking space design",
          "Professional coordination",
          "Complete event management",
        ],
        notIncluded: ["Catering services", "Security coordination"],
      },
      {
        name: "Premium Corporate",
        subtitle: "Luxury Business Events",
        price: "Kshs 200,000+",
        minBudget: "For high-profile events",
        popular: false,
        icon: <Diamond className="w-8 h-8" />,
        color: "purple",
        features: [
          "Luxury venue transformation",
          "Custom brand experiences",
          "Multiple functional areas",
          "Professional AV coordination",
          "VIP guest management",
          "Complete vendor coordination",
          "Professional event team",
          "Post-event reporting",
        ],
        notIncluded: [],
      },
    ],
    special: [
      {
        name: "Baby Shower Bliss",
        subtitle: "Sweet Celebrations",
        price: "Kshs 20,000 - 35,000",
        minBudget: "Perfect for expectant parents",
        popular: true,
        icon: <Heart className="w-8 h-8" />,
        color: "pink",
        features: [
          "Gender-neutral themes",
          "Baby-themed decorations",
          "Gift station setup",
          "Photo opportunities",
          "Table arrangements",
          "Setup and cleanup",
        ],
        notIncluded: ["Catering", "Entertainment", "Photography"],
      },
      {
        name: "Graduation Glory",
        subtitle: "Achievement Celebration",
        price: "Kshs 18,000 - 30,000",
        minBudget: "Honor academic success",
        popular: false,
        icon: <Award className="w-8 h-8" />,
        color: "blue",
        features: [
          "Academic themed decor",
          "School color coordination",
          "Achievement displays",
          "Photo booth setup",
          "Family seating areas",
          "Complete coordination",
        ],
        notIncluded: ["Catering services", "Photography services"],
      },
      {
        name: "Bridal Shower Romance",
        subtitle: "Pre-Wedding Magic",
        price: "Kshs 25,000 - 40,000",
        minBudget: "Celebrate the bride-to-be",
        popular: true,
        icon: <Sparkles className="w-8 h-8" />,
        color: "rose",
        features: [
          "Romantic themed styling",
          "Instagram-worthy setups",
          "Bridal chair decoration",
          "Activity station design",
          "Elegant table arrangements",
          "Professional coordination",
        ],
        notIncluded: ["Entertainment booking", "Catering coordination"],
      },
    ],
  };

  const addOns = [
    {
      name: "Live Flowers",
      price: "Kshs 60,000",
      description: "Premium fresh flower arrangements with delivery",
    },
    {
      name: "Photography Setup",
      price: "Kshs 5,000",
      description: "Professional photo opportunity areas",
    },
    {
      name: "Advanced Lighting",
      price: "Kshs 15,000",
      description: "Professional lighting design and setup",
    },
    {
      name: "Backup Coordination",
      price: "Kshs 8,000",
      description: "Additional coordination team member",
    },
    {
      name: "Same-Day Changes",
      price: "30% extra",
      description: "Last-minute modifications to setup",
    },
    {
      name: "Extended Hours",
      price: "Kshs 5,000/hour",
      description: "Additional setup or coordination time",
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
              <Diamond className="w-10 h-10 text-dusty-rose-300" />
            </div>
          </motion.div>

          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Packages & <span className="text-dusty-rose-300">Pricing</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
            Choose the perfect package for your event. Transparent pricing with
            no hidden costs.
          </p>
        </motion.div>
      </section>

      {/* Package Categories */}
      <section className="bg-white py-8 sticky top-28 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {packageCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-dusty-rose-100 hover:text-dusty-rose-700"
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeCategory}
          >
            {packages[activeCategory as keyof typeof packages].map(
              (pkg, index) => (
                <motion.div
                  key={pkg.name}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <Card
                    className={`h-full border-2 transition-all duration-300 ${
                      pkg.popular
                        ? "border-dusty-rose-400 shadow-xl"
                        : "border-gray-200 hover:border-dusty-rose-300 hover:shadow-lg"
                    }`}
                  >
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br from-${pkg.color}-100 to-${pkg.color}-200 flex items-center justify-center mx-auto mb-4`}
                      >
                        <div className={`text-${pkg.color}-600`}>
                          {pkg.icon}
                        </div>
                      </div>

                      <CardTitle className="font-playfair text-2xl text-deep-emerald-800 mb-2">
                        {pkg.name}
                      </CardTitle>

                      <p className="text-dusty-rose-600 font-medium mb-4">
                        {pkg.subtitle}
                      </p>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-deep-emerald-800 mb-1">
                          {pkg.price}
                        </div>
                        <p className="text-sm text-gray-600">{pkg.minBudget}</p>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-deep-emerald-800 mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            What's Included
                          </h4>
                          <ul className="space-y-2">
                            {pkg.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-sm text-gray-600"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {pkg.notIncluded.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                              <X className="w-4 h-4 text-gray-400 mr-2" />
                              Not Included
                            </h4>
                            <ul className="space-y-2">
                              {pkg.notIncluded.map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start text-sm text-gray-500"
                                >
                                  <X className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="pt-4">
                          <Button
                            asChild
                            className={`w-full ${
                              pkg.popular
                                ? "bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
                                : "bg-white border-2 border-dusty-rose-500 text-dusty-rose-600 hover:bg-dusty-rose-500 hover:text-white"
                            }`}
                          >
                            <Link
                              to={`/book?eventType=${activeCategory}&packageType=${encodeURIComponent(pkg.name)}`}
                            >
                              Choose Package
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ),
            )}
          </motion.div>
        </div>
      </section>

      {/* Add-ons Section */}
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
              Enhance Your Package
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Add these optional services to make your event even more special
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer"
              >
                <Link
                  to={`/book?addOn=${encodeURIComponent(addon.name)}`}
                  className="block"
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-xl hover:border-dusty-rose-300 border-2 border-transparent transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-dusty-rose-100 to-dusty-rose-200 group-hover:from-dusty-rose-200 group-hover:to-dusty-rose-300 flex items-center justify-center mb-4 mx-auto transition-all duration-300">
                        <Zap className="w-6 h-6 text-dusty-rose-600 group-hover:text-dusty-rose-700 transition-colors duration-300" />
                      </div>

                      <h3 className="font-semibold text-deep-emerald-800 group-hover:text-deep-emerald-900 mb-2 transition-colors duration-300">
                        {addon.name}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 mb-4 transition-colors duration-300">
                        {addon.description}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-champagne-gold-100 group-hover:bg-champagne-gold-200 text-champagne-gold-700 group-hover:text-champagne-gold-800 font-semibold transition-all duration-300"
                      >
                        {addon.price}
                      </Badge>

                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white text-xs"
                        >
                          Add to Booking
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Book a consultation to discuss your event needs and get a
              customized quote.
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
                <Link to="/contact">Ask Questions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
