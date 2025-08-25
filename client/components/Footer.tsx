import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    setError("");

    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => setIsSubscribed(false), 3000);
      } else {
        const data = await response.json();
        setError(data.error || "Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    { name: "Wedding Planning", path: "/services?service=wedding" },
    { name: "Birthday Parties", path: "/services?service=birthday" },
    { name: "Event Decoration", path: "/services?service=decoration" },
    { name: "Fresh Bouquets", path: "/bouquets?type=fresh" },
    { name: "Artificial Bouquets", path: "/bouquets?type=artificial" },
    { name: "Venue Styling", path: "/services?service=venue" },
  ];

  return (
    <footer className="bg-deep-emerald-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-dusty-rose-400 to-champagne-gold-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-playfair font-bold text-lg">
                    M
                  </span>
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-xl">
                    Mirie Decors
                  </h3>
                  <p className="text-sm text-dusty-rose-200">
                    Creating Magical Moments
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                We turn dreams into reality — one celebration at a time.
                Specializing in elegant event planning and stunning decorations
                across Kenya.
              </p>
            </div>

            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="outline"
                className="border-dusty-rose-400 text-dusty-rose-200 hover:bg-dusty-rose-400 hover:text-white"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-dusty-rose-400 text-dusty-rose-200 hover:bg-dusty-rose-400 hover:text-white"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-dusty-rose-300 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-gray-300 hover:text-dusty-rose-300 transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="font-playfair font-semibold text-lg mb-6">
                Get in Touch
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-dusty-rose-400" />
                  <span className="text-gray-300 text-sm">
                    +254 XXX XXX XXX
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-dusty-rose-400" />
                  <span className="text-gray-300 text-sm">
                    info@miriedecors.co.ke
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-dusty-rose-400" />
                  <span className="text-gray-300 text-sm">
                    Nairobi & Meru, Kenya
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Newsletter</h5>
              <p className="text-gray-300 text-sm mb-3">
                Stay updated with our latest designs and offers
              </p>

              {isSubscribed ? (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Successfully subscribed!</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      onKeyPress={(e) => e.key === "Enter" && handleSubscribe()}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      disabled={isSubscribing}
                    />
                    <Button
                      size="sm"
                      onClick={handleSubscribe}
                      disabled={isSubscribing}
                      className="bg-dusty-rose-500 hover:bg-dusty-rose-600 disabled:opacity-50"
                    >
                      {isSubscribing ? "..." : "Subscribe"}
                    </Button>
                  </div>
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 text-dusty-rose-400 mx-1" />{" "}
              by Mirie Decors Team
            </p>
            <p className="text-gray-300 text-sm mt-2 md:mt-0">
              © 2024 Mirie Decors. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
