import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Crown,
  Gift,
  Heart,
  Award,
  Sparkles,
  Users,
  Flower,
  Play,
  X,
  Camera,
  Video,
  Filter,
} from "lucide-react";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const filters = [
    { id: "all", name: "All Events", icon: <Camera className="w-4 h-4" /> },
    { id: "weddings", name: "Weddings", icon: <Crown className="w-4 h-4" /> },
    { id: "birthdays", name: "Birthdays", icon: <Gift className="w-4 h-4" /> },
    { id: "corporate", name: "Corporate", icon: <Users className="w-4 h-4" /> },
    {
      id: "baby-showers",
      name: "Baby Showers",
      icon: <Heart className="w-4 h-4" />,
    },
    { id: "bouquets", name: "Bouquets", icon: <Flower className="w-4 h-4" /> },
    { id: "videos", name: "Videos", icon: <Video className="w-4 h-4" /> },
  ];

  const galleryItems = [
    // Weddings
    {
      id: 1,
      type: "image",
      category: "weddings",
      title: "Elegant Garden Wedding",
      description:
        "Beautiful outdoor ceremony with African-inspired decorations",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/18/Kenya_traditional_wedding.jpg",
      tags: ["outdoor", "elegant", "african", "cultural"],
    },
    {
      id: 2,
      type: "image",
      category: "weddings",
      title: "Kenyan Wedding Ceremony",
      description: "Beautiful Kenyan wedding ceremony setup and decoration",
      image:
        "https://i.ibb.co/ynwv0cbD/Whats-App-Image-2025-07-23-at-12-44-30-c99c753c.jpg",
      tags: ["kenyan", "ceremony", "traditional"],
    },
    {
      id: 3,
      type: "image",
      category: "weddings",
      title: "Luxury Reception Setup",
      description: "Premium wedding reception with crystal chandeliers",
      image: "/images/pexels-motioncoloursphotography-7856735.jpg",
      tags: ["luxury", "reception", "crystal"],
    },

    // Birthdays
    {
      id: 4,
      type: "image",
      category: "birthdays",
      title: "Princess Birthday Party",
      description: "Magical princess-themed birthday celebration",
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
      tags: ["princess", "kids", "magical"],
    },
    {
      id: 5,
      type: "image",
      category: "birthdays",
      title: "Birthday Party Setup Timelapse",
      description: "Watch how we transform a space for a birthday party",
      image:
        "/images/pexels-jonathanborba-32370594.jpg",
      tags: ["setup", "timelapse", "transformation"],
    },
    {
      id: 6,
      type: "image",
      category: "birthdays",
      title: "Adult Birthday Celebration",
      description: "Sophisticated birthday party for adults",
      image:
        "/images/PIXNIO-2597059-5632x3755.jpeg",
      tags: ["adult", "sophisticated", "elegant"],
    },

    // Corporate
    {
      id: 7,
      type: "image",
      category: "corporate",
      title: "Corporate Gala Dinner",
      description: "Professional corporate event setup",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      tags: ["corporate", "professional", "gala"],
    },
    {
      id: 8,
      type: "image",
      category: "corporate",
      title: "Company Launch Event",
      description: "Modern corporate product launch decoration",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
      tags: ["launch", "modern", "corporate"],
    },

    // Baby Showers
    {
      id: 9,
      type: "image",
      category: "baby-showers",
      title: "Pink Baby Shower",
      description: "Sweet pink-themed baby shower decoration",
      image:
        "/images/social-pink-sweetness-table-party-baby-shower-1603324-pxhere.com.jpg",
      tags: ["pink", "sweet", "baby"],
    },
    {
      id: 10,
      type: "image",
      category: "baby-showers",
      title: "Baby Shower Setup Process",
      description: "Behind the scenes of baby shower decoration",
      image:
        "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop",
      tags: ["setup", "behind-scenes", "process"],
    },
    {
      id: 11,
      type: "image",
      category: "baby-showers",
      title: "Gender Neutral Baby Shower",
      description: "Beautiful yellow and green themed baby shower",
      image:
        "/images/pexels-thgusstavo-30484893.jpg",
      tags: ["neutral", "yellow", "green"],
    },

    // Bouquets
    {
      id: 12,
      type: "image",
      category: "bouquets",
      title: "Bridal Bouquet Collection",
      description: "Stunning fresh flower bridal bouquets",
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
      tags: ["bridal", "fresh", "flowers"],
    },
    {
      id: 13,
      type: "image",
      category: "bouquets",
      title: "Money Bouquet Design",
      description: "Creative money bouquet arrangements",
      image:
        "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=600&fit=crop",
      tags: ["money", "creative", "unique"],
    },
    {
      id: 14,
      type: "image",
      category: "bouquets",
      title: "Bouquet Making Process",
      description: "Watch our florists create beautiful bouquets",
      image:
        "/images/Screenshot from 2025-07-24 13-31-31.png",
      tags: ["making", "process", "florist"],
    },

    // More Wedding Content
    {
      id: 15,
      type: "image",
      category: "weddings",
      title: "Beach Wedding Setup",
      description: "Romantic beach wedding with ocean views",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
      tags: ["beach", "romantic", "ocean"],
    },
    {
      id: 16,
      type: "image",
      category: "weddings",
      title: "Traditional Kenyan Wedding",
      description: "Beautiful traditional Kenyan wedding ceremony",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/18/Kenya_traditional_wedding.jpg",
      tags: ["traditional", "kenyan", "cultural"],
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter(
          (item) =>
            item.category === activeFilter ||
            (activeFilter === "videos" && item.type === "video"),
        );

  const openLightbox = (item: any) => {
    setSelectedMedia(item);
    setLightboxOpen(true);
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
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
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
              <Camera className="w-10 h-10 text-dusty-rose-300" />
            </div>
          </motion.div>

          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-dusty-rose-300">Gallery</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
            Discover the magic we create. Browse through our collection of
            beautiful events, stunning decorations, and unforgettable moments.
          </p>
        </motion.div>
      </section>

      {/* Filter Navigation */}
      <section className="bg-white py-8 sticky top-28 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-dusty-rose-100 hover:text-dusty-rose-700"
                }`}
              >
                {filter.icon}
                <span>{filter.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeFilter}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${activeFilter}`}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Image/Video Thumbnail */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.type === "video" ? item.thumbnail : item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Video Play Button */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play className="w-8 h-8 text-dusty-rose-600 ml-1" />
                        </motion.div>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-deep-emerald-800 backdrop-blur-sm">
                        {item.type === "video" ? (
                          <Video className="w-3 h-3 mr-1" />
                        ) : (
                          <Camera className="w-3 h-3 mr-1" />
                        )}
                        {filters.find((f) => f.id === item.category)?.name ||
                          item.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-playfair text-lg font-semibold text-deep-emerald-800 mb-2 group-hover:text-dusty-rose-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-dusty-rose-100 text-dusty-rose-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-gray-700 mb-4">
                No items found
              </h3>
              <p className="text-gray-500 mb-8">
                Try selecting a different category to see more content.
              </p>
              <Button
                onClick={() => setActiveFilter("all")}
                className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
              >
                Show All Items
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-black/95 border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedMedia?.title || "Gallery Item"}</DialogTitle>
          </DialogHeader>
          {selectedMedia && (
            <div className="relative w-full h-full">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="p-8">
                {selectedMedia.type === "video" ? (
                  <div className="aspect-video w-full">
                    <iframe
                      src={selectedMedia.videoUrl}
                      title={selectedMedia.title}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img
                    src={selectedMedia.image}
                    alt={selectedMedia.title}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  />
                )}

                <div className="mt-6 text-white">
                  <h2 className="font-playfair text-2xl font-bold mb-2">
                    {selectedMedia.title}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {selectedMedia.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMedia.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-white/10 text-white border-white/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
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
              Love What You See?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Let's create something beautiful together. Book a consultation to
              discuss your dream event.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
              >
                <a href="/book">Book Your Event</a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-deep-emerald-800"
              >
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
