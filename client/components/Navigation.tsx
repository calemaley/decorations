import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/services" },
    { name: "Packages & Pricing", path: "/packages" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Bouquets", path: "/bouquets" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Main navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/96 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-white/92 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Compact Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-dusty-rose-500 to-deep-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-playfair font-bold text-lg">
                    M
                  </span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-champagne-gold-400 rounded-full"></div>
              </div>
              <div>
                <h1 className="font-playfair font-bold text-xl text-deep-emerald-800 group-hover:text-dusty-rose-600 transition-colors">
                  Mirie Decors
                </h1>
                <p className="text-xs text-dusty-rose-600 -mt-0.5 leading-none">
                  Creating Magic ✨
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:bg-gray-50 ${
                    location.pathname === item.path
                      ? "text-dusty-rose-600 bg-dusty-rose-50"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-dusty-rose-500 rounded-full"></span>
                  )}
                </Link>
              ))}

              <Button
                asChild
                size="sm"
                className="ml-3 h-8 px-4 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white text-xs shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Link to="/book" className="flex items-center space-x-1.5">
                  <span>Book Event</span>
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2.5 px-3 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "text-dusty-rose-600 bg-dusty-rose-50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-3 mt-3 border-t border-gray-100">
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
                >
                  <Link to="/book" onClick={() => setIsOpen(false)}>
                    Book Your Event
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
