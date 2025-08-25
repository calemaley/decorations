import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Star,
  Quote,
  Play,
  Heart,
  Calendar,
  MapPin,
  User,
  Video,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah & John Kamau",
      event: "Wedding Ceremony",
      date: "December 2023",
      location: "Nairobi",
      rating: 5,
      image:
        "/images/Screenshot from 2025-07-24 14-40-12.png",
      text: "Mirie Decors made our wedding day absolutely magical! From the initial consultation to the final cleanup, everything was perfect. The attention to detail was incredible, and our guests are still talking about how beautiful everything looked.",
      type: "text",
      category: "wedding",
    },
    {
      id: 2,
      name: "Grace Wanjiku",
      event: "50th Birthday Celebration",
      date: "November 2023",
      location: "Meru",
      rating: 5,
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace&backgroundColor=b6e3f4&clothesColor=3c4043",
      text: "Mirie Decors made my 50th birthday celebration absolutely unforgettable! The decorations were elegant and age-appropriate, creating the perfect atmosphere for my milestone celebration. The team was professional and handled everything with such care.",
      type: "text",
      category: "birthday",
    },
    {
      id: 3,
      name: "Peter Mwangi",
      event: "Corporate Annual Dinner",
      date: "October 2023",
      location: "Nairobi",
      rating: 5,
      image:
        "/images/Screenshot from 2025-07-24 14-40-12.png",
      text: "Professional, reliable, and creative! Mirie Decors transformed our corporate event into something spectacular. The team was incredibly organized and delivered beyond our expectations.",
      type: "text",
      category: "corporate",
    },
    {
      id: 4,
      name: "Mary & James Njoroge",
      event: "Baby Shower",
      date: "January 2024",
      location: "Nairobi",
      rating: 5,
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=MaryJames&backgroundColor=ffd93d&clothesColor=3c4043",
      text: "Our baby shower was absolutely perfect thanks to Mirie Decors! They created such a sweet and welcoming atmosphere with beautiful decorations. All our guests were impressed, and we have wonderful memories to cherish forever.",
      type: "text",
      category: "baby-shower",
    },
    {
      id: 5,
      name: "Lucy Muthoni",
      event: "Graduation Party",
      date: "September 2023",
      location: "Nairobi",
      rating: 5,
      image:
        "/images/Screenshot from 2025-07-24 14-40-12.png",
      text: "Thank you Mirie Decors for making my graduation party so special! The decorations were stunning and perfectly captured the celebratory mood. Highly recommended!",
      type: "text",
      category: "graduation",
    },
    {
      id: 6,
      name: "David Kipkoech",
      event: "Traditional Wedding",
      date: "August 2023",
      location: "Meru",
      rating: 5,
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=74b9ff&clothesColor=3c4043",
      text: "Mirie Decors perfectly captured the essence of our traditional Kenyan wedding. They understood our cultural requirements and created decorations that honored our heritage while being absolutely beautiful. Highly recommended for traditional ceremonies!",
      type: "text",
      category: "wedding",
    },
    {
      id: 7,
      name: "Catherine Wambui",
      event: "Bridal Shower",
      date: "July 2023",
      location: "Nairobi",
      rating: 5,
      image:
        "/images/Screenshot from 2025-07-24 14-40-12.png",
      text: "The bridal shower was beyond my dreams! Every detail was perfect, from the elegant decorations to the beautiful photo setups. Mirie Decors truly understands how to create magical moments.",
      type: "text",
      category: "bridal-shower",
    },
    {
      id: 8,
      name: "Michael Ochieng",
      event: "Corporate Product Launch",
      date: "June 2023",
      location: "Nairobi",
      rating: 5,
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=a29bfe&clothesColor=3c4043",
      text: "Our product launch was a huge success thanks to Mirie Decors! They created a professional and impressive setup that perfectly represented our brand. The attention to detail and understanding of corporate requirements was exceptional.",
      type: "text",
      category: "corporate",
    },
  ];

  const stats = [
    {
      number: "200+",
      label: "Happy Clients",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      number: "95%",
      label: "5-Star Reviews",
      icon: <Star className="w-6 h-6" />,
    },
    {
      number: "100%",
      label: "Would Recommend",
      icon: <ThumbsUp className="w-6 h-6" />,
    },
    {
      number: "5+",
      label: "Years of Excellence",
      icon: <Calendar className="w-6 h-6" />,
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

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-32 h-32 bg-white/5 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ top: "10%", left: "10%" }}
          />
          <motion.div
            className="absolute w-24 h-24 bg-dusty-rose-300/10 rounded-full"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ top: "60%", right: "15%" }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              <MessageCircle className="w-10 h-10 text-dusty-rose-300" />
            </div>
          </motion.div>

          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Client <span className="text-dusty-rose-300">Testimonials</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200">
            Hear from our amazing clients about their unforgettable experiences
            with Mirie Decors
          </p>

          {/* Star Rating Display */}
          <motion.div
            className="flex justify-center items-center space-x-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                >
                  <Star className="w-8 h-8 fill-current text-yellow-400" />
                </motion.div>
              ))}
            </div>
            <span className="text-xl font-semibold ml-3">
              4.9/5 Average Rating
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-dusty-rose-500 to-deep-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-deep-emerald-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-emerald-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real clients who trusted us with their special
              moments
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  <CardContent className="p-6">
                    {/* Client Info */}
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-deep-emerald-800">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-dusty-rose-600 font-medium">
                          {testimonial.event}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {testimonial.date}
                          </span>
                          <MapPin className="w-3 h-3 text-gray-400 ml-2" />
                          <span className="text-xs text-gray-500">
                            {testimonial.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-current text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <Quote className="w-8 h-8 text-dusty-rose-300 absolute -top-2 -left-2" />
                      <p className="text-gray-700 leading-relaxed pl-6 italic">
                        {testimonial.text}
                      </p>
                    </div>

                    {/* Category Badge */}
                    <div className="mt-4">
                      <Badge
                        variant="secondary"
                        className="bg-dusty-rose-100 text-dusty-rose-700 text-xs"
                      >
                        {testimonial.category.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-deep-emerald-800 text-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-64 h-64 bg-dusty-rose-500/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ top: "-20%", right: "-10%" }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              Ready to Create Your Own Success Story?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Join our happy clients and let us make your event unforgettable.
              Every celebration deserves the Mirie Decors touch.
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
                <a href="/contact">Get a Quote</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
