import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import {
  Flower,
  Heart,
  DollarSign,
  Sparkles,
  Crown,
  Gift,
  Star,
  Calendar,
  Truck,
  Shield,
  Palette,
  Camera,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Bouquets() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBouquet, setSelectedBouquet] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    { id: "all", name: "All Bouquets", icon: <Flower className="w-4 h-4" /> },
    {
      id: "fresh",
      name: "Fresh Flowers",
      icon: <Flower className="w-4 h-4" />,
    },
    {
      id: "money",
      name: "Money Bouquets",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      id: "artificial",
      name: "Artificial Flowers",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: "mixed",
      name: "Mixed Arrangements",
      icon: <Heart className="w-4 h-4" />,
    },
  ];

  const bouquets = [
    // Fresh Flower Bouquets
    {
      id: 1,
      name: "Classic Rose Bouquet",
      category: "fresh",
      price: "Kshs 2,500",
      originalPrice: "Kshs 3,000",
      description: "Elegant red roses with baby's breath and eucalyptus",
      image:
        "/images/Screenshot from 2025-07-24 13-58-22.png",
      features: [
        "12 Premium Red Roses",
        "Baby's Breath",
        "Eucalyptus Leaves",
        "Elegant Wrapping",
        "Fresh for 5-7 days",
      ],
      popular: true,
      occasion: ["Wedding", "Anniversary", "Romantic"],
      delivery: "Same day delivery available",
      care: "Keep in cool water, trim stems daily",
    },
    {
      id: 2,
      name: "Pastel Dream Bouquet",
      category: "fresh",
      price: "Kshs 3,200",
      description: "Soft pink and white flowers with delicate greenery",
      image:
        "/images/Screenshot from 2025-07-24 14-11-59.png",
      features: [
        "Pink Roses",
        "White Lilies",
        "Hydrangeas",
        "Soft Pink Wrapping",
        "Satin Ribbon",
      ],
      popular: false,
      occasion: ["Baby Shower", "Bridal Shower", "Mother's Day"],
      delivery: "24-hour advance notice required",
      care: "Mist daily, change water every 2 days",
    },
    {
      id: 3,
      name: "Tropical Paradise",
      category: "fresh",
      price: "Kshs 4,000",
      description: "Exotic tropical flowers in vibrant colors",
      image:
        "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop",
      features: [
        "Bird of Paradise",
        "Anthurium",
        "Tropical Leaves",
        "Vibrant Orange Wrap",
        "Exotic Greenery",
      ],
      popular: false,
      occasion: ["Corporate Events", "Congratulations", "Unique Gifts"],
      delivery: "Pre-order 48 hours in advance",
      care: "Keep in warm location, high humidity preferred",
    },

    // Money Bouquets
    {
      id: 4,
      name: "Money Rose Bouquet",
      category: "money",
      price: "Kshs 5,000",
      description: "Beautiful roses made from currency notes",
      image:
        "/images/Screenshot from 2025-07-24 14-15-28.png",
      features: [
        "12 Money Roses",
        "Real Currency Notes",
        "Elegant Presentation",
        "Custom Denominations",
        "Reusable Base",
      ],
      popular: true,
      occasion: ["Graduation", "Business Opening", "Achievement"],
      delivery: "Custom orders take 3-5 days",
      care: "Handle gently, keep away from moisture",
    },
    {
      id: 5,
      name: "Luxury Money Garden",
      category: "money",
      price: "Kshs 8,000",
      description: "Elaborate money arrangement with multiple flower types",
      image:
        "/images/Screenshot from 2025-07-24 14-22-38.png",
      features: [
        "Mixed Money Flowers",
        "Premium Currency",
        "Decorative Base",
        "LED Accents",
        "Gift Box Included",
      ],
      popular: false,
      occasion: [
        "Major Achievements",
        "Business Success",
        "Special Milestones",
      ],
      delivery: "Custom orders require 5-7 days",
      care: "Display in secure location, avoid direct sunlight",
    },

    // Artificial Bouquets
    {
      id: 6,
      name: "Eternal Roses",
      category: "artificial",
      price: "Kshs 1,800",
      description: "High-quality silk roses that last forever",
      image:
        "/images/Screenshot from 2025-07-24 14-26-56.png",
      features: [
        "Premium Silk Roses",
        "Realistic Appearance",
        "Fade Resistant",
        "No Maintenance",
        "Elegant Vase Included",
      ],
      popular: true,
      occasion: ["Long-term Display", "Office Decor", "Allergy-Friendly"],
      delivery: "Ready for immediate pickup",
      care: "Dust occasionally, avoid direct moisture",
    },
    {
      id: 7,
      name: "Spring Garden Mix",
      category: "artificial",
      price: "Kshs 2,200",
      description: "Colorful mix of artificial spring flowers",
      image:
        "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=600&h=600&fit=crop",
      features: [
        "Mixed Spring Flowers",
        "Vibrant Colors",
        "Natural Texture",
        "Weather Resistant",
        "Custom Arrangement",
      ],
      popular: false,
      occasion: ["Home Decor", "Events", "Permanent Display"],
      delivery: "Same day pickup available",
      care: "Clean with soft brush, store properly",
    },

    // Mixed Arrangements
    {
      id: 8,
      name: "Fresh & Silk Harmony",
      category: "mixed",
      price: "Kshs 3,500",
      description: "Beautiful combination of fresh and artificial flowers",
      image:
        "/images/Screenshot from 2025-07-24 14-34-53.png",
      features: [
        "Fresh Focal Flowers",
        "Silk Accent Flowers",
        "Extended Lifespan",
        "Best of Both Worlds",
        "Unique Design",
      ],
      popular: false,
      occasion: ["Special Events", "Custom Requests", "Unique Gifts"],
      delivery: "Custom orders take 2-3 days",
      care: "Care for fresh elements, silk requires minimal care",
    },
  ];

  const services = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Delivery",
      description:
        "Free delivery within Nairobi CBD for orders above Kshs 3,000",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Custom Colors",
      description: "Match your event theme with custom color arrangements",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Advance Booking",
      description: "Secure your preferred date with advance booking options",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Freshness Guarantee",
      description: "100% satisfaction guarantee on all fresh flower bouquets",
    },
  ];

  const filteredBouquets =
    activeCategory === "all"
      ? bouquets
      : bouquets.filter((bouquet) => bouquet.category === activeCategory);

  const openModal = (bouquet: any) => {
    setSelectedBouquet(bouquet);
    setModalOpen(true);
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

        {/* Floating flower elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-16 h-16 text-dusty-rose-300/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "20%", left: "10%" }}
          >
            <Flower className="w-full h-full" />
          </motion.div>
          <motion.div
            className="absolute w-12 h-12 text-white/10"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "60%", right: "15%" }}
          >
            <Heart className="w-full h-full" />
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <Flower className="w-10 h-10 text-dusty-rose-300" />
            </div>
          </motion.div>

          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Beautiful <span className="text-dusty-rose-300">Bouquets</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
            Express your emotions with our stunning collection of fresh,
            artificial, and money bouquets
          </p>

          <motion.div
            className="flex justify-center space-x-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm opacity-90">Designs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Daily</div>
              <div className="text-sm opacity-90">Fresh Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-90">Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-8 sticky top-28 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {categories.map((category) => (
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

      {/* Bouquets Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeCategory}
          >
            {filteredBouquets.map((bouquet, index) => (
              <motion.div
                key={`${bouquet.id}-${activeCategory}`}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
                onClick={() => openModal(bouquet)}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  {bouquet.popular && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900">
                        <Crown className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}

                  {bouquet.originalPrice && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-red-500 text-white">
                        Save{" "}
                        {Math.round(
                          ((parseInt(
                            bouquet.originalPrice.replace(/[^\d]/g, ""),
                          ) -
                            parseInt(bouquet.price.replace(/[^\d]/g, ""))) /
                            parseInt(
                              bouquet.originalPrice.replace(/[^\d]/g, ""),
                            )) *
                            100,
                        )}
                        %
                      </Badge>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={bouquet.image}
                      alt={bouquet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-dusty-rose-100 text-dusty-rose-700 text-xs"
                      >
                        {
                          categories.find((c) => c.id === bouquet.category)
                            ?.name
                        }
                      </Badge>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-current text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="font-playfair text-lg font-semibold text-deep-emerald-800 mb-2 group-hover:text-dusty-rose-600 transition-colors">
                      {bouquet.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {bouquet.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-deep-emerald-800">
                          {bouquet.price}
                        </span>
                        {bouquet.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {bouquet.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {bouquet.occasion.slice(0, 2).map((occ) => (
                          <Badge
                            key={occ}
                            variant="outline"
                            className="text-xs border-dusty-rose-300 text-dusty-rose-600"
                          >
                            {occ}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white group-hover:shadow-lg transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(bouquet);
                      }}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
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
              Our Bouquet Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make it easy to order and receive your perfect bouquet
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-dusty-rose-100 to-dusty-rose-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-dusty-rose-600">{service.icon}</div>
                </div>
                <h3 className="font-semibold text-deep-emerald-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bouquet Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {selectedBouquet?.name || "Bouquet Details"}
            </DialogTitle>
          </DialogHeader>
          {selectedBouquet && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={selectedBouquet.image}
                  alt={selectedBouquet.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              <div>
                <div className="mb-4">
                  <Badge className="bg-dusty-rose-100 text-dusty-rose-700 mb-2">
                    {
                      categories.find((c) => c.id === selectedBouquet.category)
                        ?.name
                    }
                  </Badge>
                  {selectedBouquet.popular && (
                    <Badge className="bg-yellow-100 text-yellow-800 ml-2">
                      <Crown className="w-3 h-3 mr-1" />
                      Popular Choice
                    </Badge>
                  )}
                </div>

                <h2 className="font-playfair text-3xl font-bold text-deep-emerald-800 mb-4">
                  {selectedBouquet.name}
                </h2>

                <div className="flex items-center mb-4">
                  <span className="text-3xl font-bold text-dusty-rose-600">
                    {selectedBouquet.price}
                  </span>
                  {selectedBouquet.originalPrice && (
                    <span className="text-lg text-gray-500 line-through ml-3">
                      {selectedBouquet.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 mb-6">
                  {selectedBouquet.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-deep-emerald-800 mb-3">
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {selectedBouquet.features.map(
                      (feature: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-deep-emerald-800 mb-3">
                    Perfect For:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBouquet.occasion.map((occ: string) => (
                      <Badge
                        key={occ}
                        variant="outline"
                        className="border-dusty-rose-300 text-dusty-rose-600"
                      >
                        {occ}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Truck className="w-5 h-5 text-dusty-rose-600 mt-1" />
                    <div>
                      <h5 className="font-medium text-sm">Delivery</h5>
                      <p className="text-xs text-gray-600">
                        {selectedBouquet.delivery}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-dusty-rose-600 mt-1" />
                    <div>
                      <h5 className="font-medium text-sm">Care Instructions</h5>
                      <p className="text-xs text-gray-600">
                        {selectedBouquet.care}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
                  >
                    <Link to="/book">Order Now</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-dusty-rose-500 text-dusty-rose-600 hover:bg-dusty-rose-500 hover:text-white"
                    onClick={() => setModalOpen(false)}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
              Order Your Perfect Bouquet Today
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Let us create a beautiful bouquet that perfectly expresses your
              feelings and suits your occasion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
              >
                <Link to="/book">Order Custom Bouquet</Link>
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
