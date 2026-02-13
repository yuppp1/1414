import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ValentineHeader() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12 relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex items-center justify-center mb-4"
      >
        <motion.div
          animate={
            isHovering
              ? {
                  rotate: [0, 360],
                }
              : {}
          }
          transition={{ duration: 1 }}
        >
          <Heart
            className="w-12 h-12 fill-current mr-2"
            style={{ color: '#391214' }}
          />
        </motion.div>
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="w-8 h-8" style={{ color: '#391214' }} />
        </motion.div>
      </motion.div>

      <motion.h1
        className="mb-4 relative inline-block"
        style={{
          color: '#391214',
          fontSize: '3.5rem',
          fontWeight: '700',
          letterSpacing: '0.05em',
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {Array.from('Our Love Story').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{
              y: -10,
              color: '#C0BAB3',
              transition: { duration: 0.2 },
            }}
            style={{ display: 'inline-block', cursor: 'default' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mx-auto max-w-2xl"
        style={{
          color: '#391214',
          fontSize: '1.25rem',
          opacity: 0.8,
        }}
      >
        A collection of our most cherished moments together
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        className="mt-6 inline-block px-8 py-3 rounded-full cursor-pointer"
        style={{
          backgroundColor: '#391214',
          color: '#C0BAB3',
          fontSize: '1.5rem',
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(57, 18, 20, 0.3)',
        }}
      >
        February 14, 2026
      </motion.div>

      {/* Sparkle particles following cursor */}
      {isHovering && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              initial={false}
              animate={{
                x: mousePosition.x - window.innerWidth / 2 + Math.random() * 40 - 20,
                y: mousePosition.y - 100 + Math.random() * 40 - 20,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
              }}
              style={{
                left: '50%',
                top: 0,
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: '#391214' }} />
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );
}