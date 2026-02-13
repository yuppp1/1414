import { motion, AnimatePresence } from 'motion/react';
import { Heart, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export function InteractiveMessage() {
  const [isHovered, setIsHovered] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const messages = [
    "Every moment with you is special ♥",
    "You make my heart smile 💕",
    "Forever and always 💖",
    "You're my favorite person 💗",
    "Love you to the moon and back 🌙",
    "Together is my favorite place to be 💑",
    "You're my happy thought 🌟",
    "My heart beats for you 💓",
  ];

  const handleClick = () => {
    setClicks((prev) => (prev + 1) % messages.length);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="mt-16 mb-12"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        animate={isShaking ? { rotate: [0, -5, 5, -5, 5, 0] } : {}}
        transition={isShaking ? { duration: 0.5, ease: 'easeInOut' } : {}}
        className="relative mx-auto max-w-2xl p-8 rounded-2xl cursor-pointer shadow-2xl overflow-hidden"
        style={{
          backgroundColor: '#C0BAB3',
          border: '3px solid #391214',
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, #391214 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, #391214 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, #391214 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, #391214 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, #391214 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          animate={{
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10"
        >
          <Heart
            className="w-12 h-12 fill-current drop-shadow-lg"
            style={{ color: '#391214' }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={clicks}
            initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            transition={{ duration: 0.5 }}
            className="text-center relative z-10"
            style={{
              color: '#391214',
              fontSize: '1.5rem',
              fontWeight: '500',
              paddingTop: '1rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {messages[clicks]}
          </motion.p>
        </AnimatePresence>

        <motion.div
          className="text-center mt-4 flex items-center justify-center gap-2 relative z-10"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <RefreshCw className="w-4 h-4" style={{ color: '#391214' }} />
          <p
            style={{
              color: '#391214',
              fontSize: '0.875rem',
              opacity: 0.8,
            }}
          >
            Click for more love notes!
          </p>
        </motion.div>

        {/* Heart burst animation on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: Math.cos((i * 2 * Math.PI) / 12) * 120,
                    y: Math.sin((i * 2 * Math.PI) / 12) * 120,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{ transformOrigin: 'center' }}
                >
                  <Heart
                    className="w-5 h-5 fill-current"
                    style={{ color: '#391214', opacity: 0.6 }}
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Pulsing rings */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  border: '2px solid #391214',
                  width: 0,
                  height: 0,
                }}
                animate={{
                  width: [0, 400],
                  height: [0, 400],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}