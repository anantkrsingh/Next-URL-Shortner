"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

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
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-black/20">
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
                <div className="w-48 backdrop-blur-md bg-black/90 border border-white/20 rounded-lg shadow-xl overflow-hidden">
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
            <a
              href="https://github.com/anantkrsingh/Next-URL-Shortner"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg overflow-hidden group shadow-sm"
            >
              <span 
                className="absolute inset-0 bg-blue-600 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                style={{
                  backgroundImage: "url(/grain.png)",
                  backgroundSize: "200px 200px",
                  backgroundRepeat: "repeat",
                  backgroundBlendMode: "overlay"
                }}
              ></span>
              <svg className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Fork on GitHub</span>
            </a>
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
      <div className={`fixed inset-0 bg-black z-40 transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
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
          <a
            href="https://github.com/anantkrsingh/Next-URL-Shortner"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-white text-gray-900 text-2xl font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Fork on GitHub
          </a>
        </div>
      </div>
    </>
  );
}
