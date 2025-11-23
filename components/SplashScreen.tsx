'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [preloadComplete, setPreloadComplete] = useState(false);

  useEffect(() => {
    // Start preloading resources immediately
    const preloadResources = async () => {
      try {
        // Preload Spline model
        const splinePromise = fetch('https://draft.spline.design/Myvn9n-8rErKmU8d/scene.splinecode', {
          mode: 'no-cors'
        }).catch(() => null);

        // Preload critical images
        const imagePromises = [
          '/ecommerce.jpg',
          '/cool-bicycle-studio.jpg',
          '/portfolio.jpg',
          '/fitness.avif',
          '/parking.avif',
          '/signature.png',
          '/travel.jpg'
        ].map(src => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Continue even if image fails
            img.src = src;
          });
        });

        // Wait for all resources or timeout after 4 seconds
        await Promise.race([
          Promise.all([splinePromise, ...imagePromises]),
          new Promise(resolve => setTimeout(resolve, 4000))
        ]);

        setPreloadComplete(true);
      } catch (error) {
        console.warn('Preloading failed:', error);
        setPreloadComplete(true);
      }
    };

    preloadResources();

    // Extended progress timer to allow for preloading
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100 && preloadComplete) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Shorter delay since preloading is done
          return 100;
        }
        // Slower progress to allow time for preloading
        return prev + 1.2;
      });
    }, 70); // Slightly slower interval

    return () => clearInterval(timer);
  }, [onComplete, preloadComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 1 }}
    >
      {/* Background gradient matching portfolio page */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black"></div>
      
      {/* Large Logo */}
      <motion.div
        className="relative mb-16"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 1.2, 
          delay: 0.3,
          type: "spring",
          stiffness: 100 
        }}
      >
        {/* Glowing background for logo */}
        <motion.div
          className="absolute inset-0 blur-xl opacity-30"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.img
            src="/logosplash.png"
            alt="Logo"
            className="w-32 h-32 lg:w-48 lg:h-48 object-contain filter brightness-150 coin-spin"
            animate={{ rotateY: 360 }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: "easeOut"
            }}
          />
        </motion.div>
        
        {/* Main Logo */}
        <motion.div
          className="relative"
        >
          <motion.img
            src="/logosplash.png"
            alt="Vishal Logo"
            className="w-32 h-32 lg:w-48 lg:h-48 object-contain"
            animate={{ 
              rotateY: [0, 180, 360],
              scale: [0.8, 1, 1]
            }}
            transition={{
              rotateY: {
                duration: 1.5,
                delay: 0.5,
                ease: "easeOut"
              },
              scale: {
                duration: 1.2,
                delay: 0.3,
                ease: "easeOut"
              }
            }}
            onError={(e) => {
              // Fallback to text V if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <motion.div 
            className="text-[8rem] lg:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-500 to-blue-600" 
            style={{ display: 'none' }}
            animate={{ 
              rotateY: [0, 180, 360],
              scale: [0.8, 1, 1]
            }}
            transition={{
              rotateY: {
                duration: 1.5,
                delay: 0.5,
                ease: "easeOut"
              },
              scale: {
                duration: 1.2,
                delay: 0.3,
                ease: "easeOut"
              }
            }}
          >
            V
          </motion.div>
        </motion.div>
      </motion.div>


      {/* Loading bar */}
      <motion.div 
        className="w-60 mb-25"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <div className="h-0.5 bg-gray-800 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-white rounded-full relative"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            {/* Enhanced shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
            {/* Additional preload indicator */}
            {preloadComplete && progress > 90 && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-cyan-400/50 to-cyan-500/50"></div>
            )}
          </motion.div>
        </div>
      </motion.div>


      {/* Loading text with preload status */}
      <motion.div
        className="text-white-500 text-xs tracking-[0.5em] uppercase mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      >
        {progress < 50 ? 'Loading' : progress < 90 ? 'Preparing' : 'Ready'}
      </motion.div>

      {/* Subtle background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Custom CSS for 3D perspective */}
      <style jsx>{`
        .coin-spin {
          transform-style: preserve-3d;
        }
      `}</style>
    </motion.div>
  );
}
