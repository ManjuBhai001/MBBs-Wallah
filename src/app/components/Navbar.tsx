'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Menu, X, ChevronDown, Mail, MessageCircle, Calendar, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

export default function Navbar() {
  const PhoneCall = dynamic(() => import('lucide-react').then((mod) => mod.PhoneCall));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="w-full bg-blue-900 text-white shadow-lg py-4 px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-gray-200">
          B'a'Doc
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-lg font-medium items-center">
          <Dropdown title="Home">
            <DropdownItem href="#" icon={PhoneCall} text="Live Counselling" />
            <DropdownItem href="#" icon={PhoneCall} text="Call Us" />
            <DropdownItem href="#" icon={Mail} text="Email" />
            <DropdownItem href="#" icon={MessageCircle} text="WhatsApp" />
          </Dropdown>

          <Dropdown title="Login">
            <DropdownItem href="#" icon={Calendar} text="Request Callback" />
            <DropdownItem href="#" icon={LogIn} text="Book Appointment" />
          </Dropdown>

          <Link href="/about" className="hover:text-gray-300 transition font-semibold">About</Link>
          <Link href="/courses" className="hover:text-gray-300 transition font-semibold">Courses</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="outline"
            className="bg-blue-950 text-white border-none hover:shadow-lg transition-shadow"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-blue-800 text-white shadow-lg py-4 px-6 mt-2 rounded-lg space-y-4"
        >
          <MobileDropdown title="Home">
            <DropdownItem href="#" icon={PhoneCall} text="Live Counselling" />
            <DropdownItem href="#" icon={PhoneCall} text="Call Us" />
            <DropdownItem href="#" icon={Mail} text="Email" />
            <DropdownItem href="#" icon={MessageCircle} text="WhatsApp" />
          </MobileDropdown>

          <MobileDropdown title="Login">
            <DropdownItem href="#" icon={Calendar} text="Request Callback" />
            <DropdownItem href="#" icon={LogIn} text="Book Appointment" />
          </MobileDropdown>

          <Link href="/about" className="block py-2 hover:text-gray-400 transition font-semibold">About</Link>
          <Link href="/courses" className="block py-2 hover:text-gray-400 transition font-semibold">Courses</Link>
        </motion.div>
      )}
    </nav>
  );
}

/* ✅ Fixed Mobile Dropdown Component */
const MobileDropdown = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const toggleDropdown = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <div className="border-b border-gray-600">
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full py-2 text-white font-semibold"
      >
        {title} <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ✅ Desktop Dropdown Component */
const Dropdown = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setTimeout(() => setShowDropdown(false), 200)}
      className="relative"
    >
      <button className="flex items-center gap-2 text-white hover:text-orange-300 transition font-semibold">
        {title} <ChevronDown size={18} />
      </button>
      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute bg-blue-800 text-white rounded-lg shadow-lg py-2 w-48 mt-2 z-20"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

/* ✅ Dropdown Item */
const DropdownItem = ({ href, icon: Icon, text }: { href: string; icon: React.ElementType; text: string }) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-4 py-2 text-white hover:bg-blue-700 rounded-lg transition"
  >
    <Icon size={18} className="text-orange-300" />
    {text}
  </Link>
);
