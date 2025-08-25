import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Calendar,
  Gift,
  Flower,
  Users,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  MessageCircle,
  Sparkles,
  Crown,
  Camera,
} from "lucide-react";

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counters, setCounters] = useState({
    events: 0,
    satisfaction: 0,
    experience: 0,
    categories: 0,
  });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const statsControls = useAnimation();

  const heroSlides = [
    {
      title: "We turn dreams into reality",
      subtitle: "one celebration at a time.",
      background: "hero-gradient",
    },
    {
      title: "Creating Magical Moments",
      subtitle: "One Detail at a Time",
      background: "bg-gradient-to-br from-dusty-rose-100 to-champagne-gold-100",
    },
    {
      title: "Elegant Event Planning",
      subtitle: "& Stunning Decorations",
      background: "bg-gradient-to-br from-pastel-pink to-deep-emerald-100",
    },
  ];

  const services = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Weddings",
      description:
        "Complete wedding planning and elegant décor with live flowers",
      features: [
        "Full coordination",
        "Custom styling",
        "Guest management",
        "Live flowers available",
      ],
      pricing: "20% of wedding budget",
      color: "dusty-rose",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Birthdays",
      description: "Memorable birthday celebrations with personalized touches",
      features: [
        "Custom themes",
        "Age-appropriate décor",
        "Party coordination",
        "Photo setup",
      ],
      pricing: "5% of event budget",
      color: "champagne-gold",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Baby Showers",
      description: "Sweet celebrations for new arrivals",
      features: [
        "Gender-neutral options",
        "Custom backdrops",
        "Table arrangements",
        "Gift station setup",
      ],
      pricing: "From Kshs 15,000",
      color: "pastel-pink",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Graduations",
      description: "Celebrate academic achievements in style",
      features: [
        "Academic themes",
        "Photo opportunities",
        "Family-friendly setup",
        "Achievement displays",
      ],
      pricing: "From Kshs 12,000",
      color: "deep-emerald",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Bridal Showers",
      description: "Elegant pre-wedding celebrations",
      features: [
        "Romantic themes",
        "Instagram-worthy setup",
        "Activity stations",
        "Keepsake arrangements",
      ],
      pricing: "From Kshs 18,000",
      color: "dusty-rose",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Corporate Events",
      description: "Professional events with sophisticated styling",
      features: [
        "Brand integration",
        "Professional setup",
        "AV coordination",
        "Networking spaces",
      ],
      pricing: "Custom quotes",
      color: "deep-emerald",
    },
    {
      icon: <Flower className="w-8 h-8" />,
      title: "Bouquets",
      description: "Fresh & artificial bouquets for any occasion",
      features: [
        "Fresh flowers",
        "Money bouquets",
        "Artificial options",
        "Custom designs",
      ],
      pricing: "From Kshs 1,000",
      color: "champagne-gold",
    },
  ];

  const stats = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      label: "Events Done",
      value: 100,
      suffix: "+",
      color: "text-dusty-rose-600",
    },
    {
      icon: <Star className="w-8 h-8" />,
      label: "Client Satisfaction",
      value: 95,
      suffix: "%",
      color: "text-champagne-gold-600",
    },
    {
      icon: <Award className="w-8 h-8" />,
      label: "Years Experience",
      value: 5,
      suffix: "+",
      color: "text-deep-emerald-600",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      label: "Event Categories",
      value: 7,
      suffix: "",
      color: "text-dusty-rose-600",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");

      const animateCounters = () => {
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        stats.forEach((stat, index) => {
          let currentValue = 0;
          const increment = stat.value / steps;

          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= stat.value) {
              currentValue = stat.value;
              clearInterval(timer);
            }

            setCounters((prev) => ({
              ...prev,
              [index === 0
                ? "events"
                : index === 1
                  ? "satisfaction"
                  : index === 2
                    ? "experience"
                    : "categories"]: Math.floor(currentValue),
            }));
          }, stepDuration);
        });
      };

      animateCounters();
    }
  }, [statsInView, statsControls]);

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

  const serviceVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div
          className={`absolute inset-0 transition-all duration-1000 ${heroSlides[currentSlide].background}`}
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-deep-emerald-800 font-playfair font-bold text-3xl">
                M
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            className="font-playfair text-5xl md:text-7xl font-bold text-deep-emerald-800 mb-6 leading-tight"
            key={`title-${currentSlide}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroSlides[currentSlide].title}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-deep-emerald-700 mb-8 font-medium"
            key={`subtitle-${currentSlide}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {heroSlides[currentSlide].subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white text-lg px-8 py-4"
              >
                <Link to="/packages">View Packages</Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-deep-emerald-600 text-deep-emerald-600 hover:bg-deep-emerald-600 hover:text-white text-lg px-8 py-4"
              >
                <Link to="/book">Book an Event</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-deep-emerald-600" : "bg-white/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
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
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-emerald-800 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, we bring your
              vision to life with elegance and attention to detail
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={serviceVariants}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                      className={`absolute w-2 h-2 bg-${service.color}-300 rounded-full opacity-0 group-hover:opacity-60`}
                      animate={{
                        x: [0, 20, -10, 15],
                        y: [0, -15, 10, -5],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ top: "20%", left: "80%" }}
                    />
                    <motion.div
                      className={`absolute w-1.5 h-1.5 bg-${service.color}-400 rounded-full opacity-0 group-hover:opacity-40`}
                      animate={{
                        x: [-5, 25, -15, 10],
                        y: [5, -20, 15, -10],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      style={{ top: "70%", left: "10%" }}
                    />
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br from-${service.color}-100 to-${service.color}-200 flex items-center justify-center mb-4 mx-auto relative`}
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, -5, 0],
                        transition: { duration: 0.6 },
                      }}
                    >
                      {/* Icon glow effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-${service.color}-200 opacity-0 group-hover:opacity-30`}
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div
                        className={`text-${service.color}-600 relative z-10`}
                      >
                        {service.icon}
                      </div>
                    </motion.div>

                    <motion.h3
                      className="font-playfair text-xl font-semibold text-deep-emerald-800 mb-3 text-center group-hover:text-deep-emerald-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {service.title}
                    </motion.h3>

                    <p className="text-gray-600 text-sm mb-4 text-center group-hover:text-gray-700 transition-colors">
                      {service.description}
                    </p>

                    <ul className="space-y-1 mb-4">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center text-xs text-gray-500 group-hover:text-gray-600 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle className="w-3 h-3 text-dusty-rose-400 mr-2 flex-shrink-0" />
                          </motion.div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-dusty-rose-100 text-dusty-rose-700 group-hover:bg-dusty-rose-200 transition-colors"
                        >
                          {service.pricing}
                        </Badge>
                      </motion.div>
                    </div>

                    {/* Hover action button */}
                    <motion.div
                      className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
                        onClick={() => (window.location.href = "/services")}
                      >
                        Learn More
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={statsRef}
        className="py-20 bg-gradient-to-br from-pastel-pink to-dusty-rose-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-emerald-800 mb-4">
              Why Choose Mirie Decors?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our commitment to excellence and attention to detail has made us
              Kenya's trusted event planning partner
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={statsControls}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={stat.color}>{stat.icon}</div>
                </motion.div>
                <motion.div
                  className="font-playfair text-4xl font-bold text-deep-emerald-800 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {index === 0
                    ? counters.events
                    : index === 1
                      ? counters.satisfaction
                      : index === 2
                        ? counters.experience
                        : counters.categories}
                  {stat.suffix}
                </motion.div>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-deep-emerald-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Ready to Create Your Magic?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Let's bring your vision to life. Contact us today for a
              personalized consultation and quote.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white text-lg px-8 py-4"
                >
                  <Link to="/book" className="flex items-center">
                    Book Your Event
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-deep-emerald-800 text-lg px-8 py-4"
                >
                  <Link to="/gallery" className="flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    View Gallery
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-2xl"
          onClick={() => {
            window.open(
              "https://wa.me/254XXXXXXXXX?text=Hi! I need help planning an event.",
              "_blank",
            );
          }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <MessageCircle className="w-8 h-8" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}
