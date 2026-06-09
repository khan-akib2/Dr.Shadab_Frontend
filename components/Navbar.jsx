"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const buttonRef = useRef(null);

  // Monitor scroll for glassmorphic navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic Button Effect using GSAP
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Animate the button towards cursor slightly
      gsap.to(button, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Return to base position
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Animate Mobile Menu Open/Close
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { clipPath: "circle(0% at 100% 0%)", opacity: 0 },
        {
          clipPath: "circle(150% at 100% 0%)",
          opacity: 1,
          duration: 0.6,
          ease: "power3.inOut",
        }
      );
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Health Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 glass-premium shadow-sm border-b border-medical-100"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Branding */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl font-semibold tracking-tight text-gradient-navy group-hover:opacity-80 transition-opacity">
              Dr. Shadab
            </span>
            <span className="text-[10px] uppercase tracking-widest text-teal-accent font-medium -mt-1">
              MBBS Graduate • Consultant
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? "text-medical-700"
                      : "text-navy-muted hover:text-medical-600"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-accent rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA (Magnetic Button) */}
          <div className="hidden md:block">
            <Link
              href="/booking"
              ref={buttonRef}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-medical-700 hover:bg-medical-800 text-white rounded-full text-sm font-semibold shadow-md transition-colors duration-200"
            >
              <span>Book Consultation</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-navy-dark hover:text-medical-700 focus:outline-none z-50"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-ivory flex flex-col justify-center px-8 md:hidden"
        >
          <div className="flex flex-col gap-6 text-left">
            <div className="border-b border-medical-100 pb-4 mb-4">
              <span className="font-serif text-3xl font-bold text-gradient-navy">
                Dr. Shadab
              </span>
              <p className="text-xs uppercase tracking-widest text-teal-accent mt-1">
                MBBS, Prasad Institute of Medical Sciences
              </p>
            </div>
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-serif text-3xl transition-all hover:pl-2 ${
                    isActive
                      ? "text-medical-700 font-medium"
                      : "text-navy-muted"
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-8 pt-6 border-t border-medical-100">
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-4 bg-medical-700 text-white rounded-xl text-base font-semibold shadow-md hover:bg-medical-800 transition-colors"
              >
                <span>Book Consultation</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
