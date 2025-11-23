'use client';

import { motion } from 'framer-motion';

export function OptimizedHero() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div className="relative w-full h-full ml-auto" style={{ marginLeft: '22%' }}>
        {/* CSS-only 3D robot animation as fallback */}
        <motion.div
          className="w-full h-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-[15rem] text-cyan-500/20"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotateY: { duration: 10, repeat: Infinity },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            🤖
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
