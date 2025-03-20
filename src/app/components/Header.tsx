'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube 
} from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";

const socialLinks = [
  { icon: FaInstagram, link: "https://instagram.com", name: "Instagram", hoverColor: "group-hover:text-pink-500" },
  { icon: FaFacebookF, link: "https://facebook.com", name: "Facebook", hoverColor: "group-hover:text-blue-600" },
  { icon: FaTwitter, link: "https://twitter.com", name: "Twitter", hoverColor: "group-hover:text-sky-500" },
  { icon: FaLinkedinIn, link: "https://linkedin.com", name: "LinkedIn", hoverColor: "group-hover:text-blue-700" },
  { icon: FaYoutube, link: "https://youtube.com", name: "YouTube", hoverColor: "group-hover:text-red-500" }
];

const SocialIcon = ({ Icon, link, name, hoverColor }: { Icon: any, link: string, name: string, hoverColor: string }) => (
  <Link
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white p-2 rounded-full shadow-md text-[#0B3D61] group hover:scale-110 transition-transform"
    aria-label={`Visit our ${name} page`}
  >
    <Icon size={18} className={`transition-colors ${hoverColor}`} aria-hidden="true" />
  </Link>
);

export default function Header() {
  return (
    <header className="bg-[#0B3D61] shadow-lg text-white w-full">
      {/* Preload Image for Faster LCP */}
      <link rel="preload" as="image" href="/images/Logoa.jpg" type="image/webp" />

      {/* Top Navigation Bar */}
      <div className="flex bg-opacity-90 justify-between backdrop-blur-md items-center px-8 py-2">
        
        {/* Social Media Icons */}
        <div className="gap-4 hidden md:flex">
          {useMemo(() => socialLinks.map(({ icon, link, name, hoverColor }, index) => (
            <SocialIcon key={index} Icon={icon} link={link} name={name} hoverColor={hoverColor} />
          )), [])}
        </div>

        {/* Optimized Logo for LCP Improvement */}
        <motion.div
  whileHover={{ scale: 1.05 }} // Lighter effect than rotation
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="p-1 rounded-full shadow-md will-change-transform"
        >
          <Image
            src="/images/Logoa.jpg" // WebP format for better compression
            alt="Company Logo"
            width={50}
            height={20}
            priority // Loads early
            decoding="async"
            fetchPriority="high"
            className="rounded-full object-cover transition-transform"
          />
        </motion.div>
      </div>
    </header>
  );
}
