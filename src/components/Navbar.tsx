"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import AuthNav from "@/components/AuthNav";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileResourcesOpen(false);
  };

  const toggleMobileResources = () => {
    setIsMobileResourcesOpen(!isMobileResourcesOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="glass-nav fixed top-0 right-0 left-0 z-50 px-6 py-3 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="text-white font-bold text-2xl hover:opacity-80 transition-opacity" onClick={closeMenu}>
            TinyUR
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/api-docs"
              className="relative text-white font-semibold transition-colors overflow-hidden group px-3 py-2"
            >
              <span className="relative z-10">API Docs</span>
              <span className="absolute inset-0 bg-white/20 rounded-none transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
            
            {/* Resources Dropdown */}
            <div 
              className="relative" 
              ref={dropdownRef}
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button
                className="relative text-white font-semibold transition-colors overflow-hidden group px-3 py-2 flex items-center gap-1"
              >
                <span className="relative z-10">Resources</span>
                <svg 
                  className={`w-4 h-4 relative z-10 transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute inset-0 bg-white/20 rounded-none transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </button>
              
              {/* Dropdown Menu */}
              <div 
                className={`absolute top-full right-0 pt-2 transition-all duration-300 ${
                  isResourcesOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
              >
                <div className="glass-panel relative z-10 w-48 overflow-hidden rounded-xl">
                  {/* Arrow pointing upwards */}
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-black/90 border-l border-t border-white/20 transform rotate-45"></div>
                  
                  <Link
                    href="/blogs"
                    className="block px-4 py-3 text-white hover:bg-white/10 transition-colors border-b border-white/10 relative z-10"
                  >
                    Blogs
                  </Link>
                  <Link
                    href="/about-us"
                    className="block px-4 py-3 text-white hover:bg-white/10 transition-colors relative z-10"
                  >
                    About Us
                  </Link>
                </div>
              </div>
            </div>
            
            <Link
              href="/unshorten"
              className="relative text-white font-semibold transition-colors overflow-hidden group px-3 py-2"
            >
              <span className="relative z-10">Unshorten</span>
              <span className="absolute inset-0 bg-white/20 rounded-none transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
            <Link
              href="/click-counter"
              className="relative text-white font-semibold transition-colors overflow-hidden group px-3 py-2"
            >
              <span className="relative z-10">Click Counter</span>
              <span className="absolute inset-0 bg-white/20 rounded-none transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="relative text-white font-semibold transition-colors overflow-hidden group px-3 py-2"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 bg-white/20 rounded-none transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
            <AuthNav />
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white p-2 focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-[#060814]/70 backdrop-blur-2xl transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`flex flex-col items-center justify-center h-full gap-8 transition-all duration-700 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link
            href="/api-docs"
            onClick={closeMenu}
            className="text-white text-4xl font-semibold hover:text-blue-400 transition-colors"
          >
            API Docs
          </Link>
          
          {/* Mobile Resources Dropdown */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={toggleMobileResources}
              className="text-white text-4xl font-semibold hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              Resources
              <svg 
                className={`w-8 h-8 transition-transform duration-300 ${isMobileResourcesOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`flex flex-col items-center gap-4 overflow-hidden transition-all duration-300 ${isMobileResourcesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <Link
                href="/blogs"
                onClick={closeMenu}
                className="text-white text-3xl font-semibold hover:text-blue-400 transition-colors"
              >
                Blogs
              </Link>
              <Link
                href="/about-us"
                onClick={closeMenu}
                className="text-white text-3xl font-semibold hover:text-blue-400 transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
          
          <Link
            href="/unshorten"
            onClick={closeMenu}
            className="text-white text-4xl font-semibold hover:text-blue-400 transition-colors"
          >
            Unshorten
          </Link>
          <Link
            href="/click-counter"
            onClick={closeMenu}
            className="text-white text-4xl font-semibold hover:text-blue-400 transition-colors"
          >
            Click Counter
          </Link>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="text-white text-4xl font-semibold hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
          <AuthNav variant="mobile" onNavigate={closeMenu} />
        </div>
      </div>
    </>
  );
}
