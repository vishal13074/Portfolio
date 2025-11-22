'use client';

import { useEffect, useState } from 'react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = ['home', 'about', 'projects'];
      const currentPosition = window.scrollY + window.innerHeight / 2; // Better detection point
      
      let newActiveSection = 'home';
      
      // Check if we're at the bottom of the page (contact section)
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        newActiveSection = 'contact';
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
              newActiveSection = section;
            }
          }
        }
      }
      
      setActiveSection(newActiveSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = () => {
    setShowProfileModal(true);
    setIsModalClosing(false);
  };

  const closeModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setShowProfileModal(false);
      setIsModalClosing(false);
    }, 500);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' }
  ];

  return (
    <>
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-8 bg-black/30 backdrop-blur-xl px-10 py-3 rounded-full border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 glow-nav">
          {/* Left - Profile */}
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={openModal}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-cyan-500/30 transition-all group-hover:scale-110 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/50">
              <img
                src="/profile.jpg"
                alt="Vishal"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm" style={{display: 'none'}}>
                V
              </div>
            </div>
            <span className="text-white text-sm font-medium group-hover:text-cyan-300 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">Vishal</span>
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px h-5 bg-cyan-500/20 shadow-[0_0_4px_rgba(6,182,212,0.3)]"></div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 relative group px-3 py-2 text-sm whitespace-nowrap ${
                  activeSection === item.id 
                    ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,1)]' 
                    : 'text-gray-300 hover:text-cyan-300 hover:drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-700 transition-all duration-300 ${
                  activeSection === item.id ? 'w-full shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'w-0 group-hover:w-full group-hover:shadow-[0_0_6px_rgba(6,182,212,0.6)]'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px h-5 bg-cyan-500/20 shadow-[0_0_4px_rgba(6,182,212,0.3)]"></div>

          {/* Right - Connect Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className={`px-6 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap pulse-animation ${
              activeSection === 'contact' 
                ? 'bg-gradient-to-r from-cyan-700 to-blue-800 shadow-lg shadow-cyan-500/60 drop-shadow-[0_0_12px_rgba(6,182,212,1)]' 
                : 'bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
            }`}
          >
            Let's Connect
          </button>
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-500 ${
              isModalClosing ? 'opacity-0 backdrop-blur-none' : 'opacity-100'
            }`}
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className={`relative z-10 bg-black/20 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 max-w-sm mx-4 shadow-2xl shadow-cyan-500/20 transition-all duration-500 ease-in-out glow-border ${
            isModalClosing 
              ? 'scale-0 opacity-0 -translate-y-20 blur-sm' 
              : 'scale-100 opacity-100 translate-y-0 blur-none'
          }`}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className={`absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-200 z-20 ${
                isModalClosing ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Profile Image */}
            <div className="flex flex-col items-center text-center">
              <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500/50 mb-6 shadow-lg shadow-cyan-500/30 transition-all duration-600 ease-in-out ${
                isModalClosing 
                  ? 'scale-0 rotate-180 opacity-0' 
                  : 'scale-100 rotate-0 opacity-100 animate-coin-spin'
              }`}>
                <img
                  src="/profile.jpg"
                  alt="Vishal N"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-bold text-4xl" style={{display: 'none'}}>
                  V
                </div>
              </div>

              {/* Name and Info */}
              <div className={`transition-all duration-400 ${
                isModalClosing 
                  ? 'opacity-0 translate-y-8 scale-90' 
                  : 'opacity-100 translate-y-0 scale-100 delay-300'
              }`}>
                <h2 className="text-2xl font-bold text-white mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Vishal N
                  </span>
                </h2>
                <p className="text-gray-300 text-sm mb-4">Full Stack Developer</p>
                <p className="text-gray-400 text-xs">
                  Final Year Student at Easwari Engineering College
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for coin spin animation and glowing effects */}
      <style jsx>{`
        @keyframes coin-spin {
          0% { 
            transform: rotateY(0deg) scale(0.2); 
            opacity: 0.3; 
          }
          25% { 
            transform: rotateY(90deg) scale(0.6); 
            opacity: 0.7; 
          }
          50% { 
            transform: rotateY(180deg) scale(0.9); 
            opacity: 0.9; 
          }
          75% { 
            transform: rotateY(270deg) scale(1); 
            opacity: 1; 
          }
          100% { 
            transform: rotateY(360deg) scale(1); 
            opacity: 1; 
          }
        }
        
        .animate-coin-spin {
          animation: coin-spin 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .glow-nav {
          box-shadow: 
            0 0 20px rgba(6, 182, 212, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .glow-nav:hover {
          box-shadow: 
            0 0 30px rgba(6, 182, 212, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        @keyframes wiggle {
          0%, 100% { 
            transform: rotate(0deg); 
          }
          25% { 
            transform: rotate(1deg); 
          }
          75% { 
            transform: rotate(-1deg); 
          }
        }

        .wiggle-animation {
          animation: wiggle 3s ease-in-out infinite;
        }

        .wiggle-animation:hover {
          animation-duration: 1s;
        }

        .glow-border {
          position: relative;
          overflow: hidden;
        }

        .glow-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: linear-gradient(45deg, transparent, cyan, transparent, cyan, transparent);
          background-size: 200% 200%;
          border-radius: 24px;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          animation: glow-border-rotate 3s linear infinite;
        }

        @keyframes glow-border-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
          }
          50% { 
            transform: scale(1.02);
            box-shadow: 0 0 25px rgba(6, 182, 212, 0.5);
          }
        }

        .pulse-animation {
          animation: pulse 2.5s ease-in-out infinite;
        }

        .pulse-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
