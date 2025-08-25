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
import { Link } from "react-router-dom";
import {
  Heart,
  Award,
  Users,
  Lightbulb,
  Star,
  Flower,
  Sparkles,
  Crown,
  Camera,
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle,
} from "lucide-react";

export default function AboutUs() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

 const team = [
  {
    name: "Miriam Decors",
    role: "Founder & Creative Director",
    image:
      "/images/WhatsApp Image 2025-07-24 at 12.39.12_cb42f4c1.jpg",
    bio: "With 6 years of experience in event planning, Miriam founded Mirie Decors with a vision to make every celebration unforgettable.",
      specialties: [
        "Wedding Planning",
        "Luxury Events",
        "Floral Design",
        "Venue Decoration",
      ],
      fullBio:
        "Miriam Decors is the visionary founder and creative director of Mirie Decors. With 6 years of experience in the event planning industry, she has transformed the way celebrations are conceptualized and executed across Kenya. Her passion for creating magical moments began with her strong foundation in theology, which taught her the importance of meaningful celebrations and bringing people together. After completing her Bachelor of Arts in Theology from University of Eastern Africa Baraton, Miriam discovered her calling in event planning and has since dedicated herself to making every celebration a memorable and meaningful experience for families and communities.",
      experience: "6+ Years",
      education:
        "Bachelor of Arts in Theology - University of Eastern Africa Baraton",
      achievements: [
        "Successfully planned 300+ events across Kenya",
        "Built Mirie Decors from startup to nationwide service",
        "Maintains 98% client satisfaction rate",
        "Pioneered affordable luxury event planning in Kenya",
        "Expert in religious and cultural ceremony planning",
      ],
      contact: {
        email: "mwendemiriam85@gmail.com",
        phone: "0769476192",
      },
    },
    {
      name: "Lewis Decors",
      role: "Senior Event Coordinator",
      image:
        "/images/WhatsApp Image 2025-07-24 at 12.37.43_fc617373.jpg",
      bio: "Lewis brings exceptional organizational skills and creative flair to every event, ensuring seamless execution from planning to completion.",
      specialties: [
        "Corporate Events",
        "Birthday Parties",
        "Venue Styling",
        "Event Logistics",
      ],
      fullBio:
        "Lewis Decors serves as our Senior Event Coordinator and has become an invaluable part of the Mirie Decors family. His exceptional organizational skills, creative problem-solving abilities, and attention to detail have made him a trusted partner in bringing clients' visions to life. Lewis has a natural talent for understanding clients' needs and translating them into perfectly executed events. His dedication to excellence and ability to handle multiple projects simultaneously while maintaining the highest quality standards has earned him recognition as one of Kenya's emerging event coordination talents.",
      experience: "4+ Years",
      education: "Professional Event Management Certification",
      achievements: [
        "Coordinated 200+ successful events",
        "Specialized in complex multi-day celebrations",
        "Developed efficient event timeline management systems",
        "Maintained 100% on-time delivery record",
        "Expert in vendor coordination and budget management",
      ],
      contact: {
        email: "lewis@miriedecors.co.ke",
        phone: "+254798326733",
      },
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion for Perfection",
      description:
        "Every detail matters to us. We pour our hearts into creating moments that exceed your expectations.",
      color: "dusty-rose",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Creative Innovation",
      description:
        "We bring fresh ideas and unique concepts to make your event stand out and create lasting memories.",
      color: "champagne-gold",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Client-Centered Approach",
      description:
        "Your vision is our mission. We listen, understand, and bring your dreams to life with personalized service.",
      color: "deep-emerald",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence in Delivery",
      description:
        "We pride ourselves on flawless execution, ensuring your event runs smoothly from start to finish.",
      color: "dusty-rose",
    },
  ];

  const milestones = [
    {
      year: "2019",
      event: "Mirie Decors Founded",
      description: "Started with a dream to create magical moments",
    },
    {
      year: "2020",
      event: "First 50 Events",
      description:
        "Successfully planned and executed 50+ beautiful celebrations",
    },
    {
      year: "2021",
      event: "Team Expansion",
      description: "Grew our team to include specialized event coordinators",
    },
    {
      year: "2022",
      event: "100+ Events Milestone",
      description:
        "Celebrated our 100th event with overwhelming client satisfaction",
    },
    {
      year: "2023",
      event: "Premium Service Launch",
      description: "Introduced luxury planning services and expanded to Meru",
    },
    {
      year: "2024",
      event: "200+ Events & Beyond",
      description: "Continuing to create magical moments across Kenya",
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
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-pastel-pink via-dusty-rose-100 to-champagne-gold-100">
        <div className="absolute inset-0 bg-white/20"></div>
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
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
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <Sparkles className="w-12 h-12 text-dusty-rose-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-champagne-gold-400 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-deep-emerald-800 mb-6">
            About <span className="text-gradient">Mirie Decors</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Creating magical moments, one detail at a time. We are Kenya's
            premier event planning and decoration specialists.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
            >
              <Link to="/services">Our Services</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-deep-emerald-600 text-deep-emerald-600 hover:bg-deep-emerald-600 hover:text-white"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-dusty-rose-100 text-dusty-rose-700">
                Our Story
              </Badge>
              <h2 className="font-playfair text-4xl font-bold text-deep-emerald-800 mb-6">
                Where Dreams Meet Reality
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2019 by Sarah Mirie, Mirie Decors began as a
                  passionate dream to transform ordinary moments into
                  extraordinary memories. What started as a small venture has
                  grown into Kenya's most trusted event planning and decoration
                  company.
                </p>
                <p>
                  Our journey began when Sarah noticed a gap in the market for
                  personalized, high-quality event planning services that truly
                  understood the unique cultural nuances of Kenyan celebrations.
                  From intimate family gatherings to grand corporate events,
                  we've had the privilege of being part of over 200 beautiful
                  stories.
                </p>
                <p>
                  Today, we're proud to serve clients across Nairobi, Meru, and
                  beyond, bringing the same level of passion, creativity, and
                  attention to detail to every single event we touch.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-dusty-rose-600">
                    200+
                  </div>
                  <div className="text-sm text-gray-600">Events Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-dusty-rose-600">
                    5+
                  </div>
                  <div className="text-sm text-gray-600">
                    Years of Excellence
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop"
                  alt="Beautiful wedding setup by Mirie Decors"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-semibold">
                    Creating unforgettable moments
                  </p>
                  <p className="text-sm opacity-90">
                    Every detail tells a story
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-champagne-gold-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Flower className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-dusty-rose-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gradient-to-br from-dusty-rose-50 to-champagne-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-deep-emerald-100 text-deep-emerald-700">
              Our Values
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-emerald-800 mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values shape every decision we make and every event we
              create
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br from-${value.color}-100 to-${value.color}-200 flex items-center justify-center mb-6 mx-auto`}
                    >
                      <div className={`text-${value.color}-600`}>
                        {value.icon}
                      </div>
                    </div>

                    <h3 className="font-playfair text-xl font-semibold text-deep-emerald-800 mb-4">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-champagne-gold-100 text-champagne-gold-700">
              Our Journey
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-emerald-800 mb-4">
              Milestones & Memories
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-dusty-rose-400 to-deep-emerald-600"></div>

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="relative flex items-start mb-12"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute left-6 w-4 h-4 bg-dusty-rose-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-16">
                  <Badge className="mb-2 bg-deep-emerald-100 text-deep-emerald-700">
                    {milestone.year}
                  </Badge>
                  <h3 className="font-playfair text-xl font-semibold text-deep-emerald-800 mb-2">
                    {milestone.event}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-deep-emerald-50 to-dusty-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-dusty-rose-100 text-dusty-rose-700">
              Meet Our Team
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-deep-emerald-800 mb-4">
              The Creative Minds Behind Your Magic
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our passionate team brings together years of experience,
              creativity, and dedication to make your events extraordinary
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedMember(member);
                  setModalOpen(true);
                }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:ring-2 hover:ring-dusty-rose-400">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-playfair text-xl font-semibold">
                        {member.name}
                      </h3>
                      <p className="text-sm opacity-90">{member.role}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="secondary"
                          className="text-xs bg-dusty-rose-100 text-dusty-rose-700"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMember(member);
                        setModalOpen(true);
                      }}
                    >
                      View Details
                    </Button>
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
              Ready to Create Your Story?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Let's work together to bring your vision to life and create
              moments that will be cherished forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
              >
                <Link to="/book">Start Planning</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-deep-emerald-800"
              >
                <Link to="/gallery">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Member Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedMember?.name} - {selectedMember?.role}
            </DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side - Image and Basic Info */}
              <div>
                <div className="relative rounded-xl overflow-hidden shadow-lg mb-6">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-playfair text-2xl font-bold">
                      {selectedMember.name}
                    </h3>
                    <p className="text-lg opacity-90">{selectedMember.role}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-deep-emerald-800 mb-3 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-dusty-rose-500" />
                        <span>{selectedMember.contact.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-dusty-rose-500" />
                        <span>{selectedMember.contact.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side - Detailed Information */}
              <div className="space-y-6">
                {/* Full Bio */}
                <div>
                  <h4 className="font-playfair text-xl font-semibold text-deep-emerald-800 mb-3">
                    About {selectedMember.name.split(" ")[0]}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {selectedMember.fullBio}
                  </p>
                </div>

                {/* Experience & Education */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-deep-emerald-800 mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Experience
                    </h5>
                    <p className="text-dusty-rose-600 font-medium">
                      {selectedMember.experience}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-deep-emerald-800 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Education
                    </h5>
                    <p className="text-gray-600 text-sm">
                      {selectedMember.education}
                    </p>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h5 className="font-semibold text-deep-emerald-800 mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Specialties
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.specialties.map((specialty: string) => (
                      <Badge
                        key={specialty}
                        className="bg-dusty-rose-100 text-dusty-rose-700"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h5 className="font-semibold text-deep-emerald-800 mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Key Achievements
                  </h5>
                  <ul className="space-y-2">
                    {selectedMember.achievements.map(
                      (achievement: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start text-sm text-gray-700"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
                  >
                    <Link to="/contact">Get in Touch</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-deep-emerald-600 text-deep-emerald-600 hover:bg-deep-emerald-600 hover:text-white"
                  >
                    <Link to="/book">Book Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
