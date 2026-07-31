import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.jpg';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 glass-navbar shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img 
            src={logoImg} 
            alt="Riv Studio Logo" 
            className="h-10 w-auto rounded object-contain transition-transform duration-300 group-hover:scale-[1.05]" 
          />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-sora">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-sm text-brand-mutedText hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-orange hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
