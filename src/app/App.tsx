import { useState, useEffect } from 'react';
import { PhotoGallery } from './components/PhotoGallery';
import { FloatingHearts } from './components/FloatingHearts';
import { ValentineHeader } from './components/ValentineHeader';
import { InteractiveMessage } from './components/InteractiveMessage';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursorHeart, setShowCursorHeart] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setShowCursorHeart(true);
      setTimeout(() => setShowCursorHeart(false), 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #C0BAB3 0%, #D5CFC8 50%, #C0BAB3 100%)',
      }}
    >
      <FloatingHearts />

      {/* Cursor heart effect */}
      {showCursorHeart && (
        <motion.div
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 2, y: -50 }}
          transition={{ duration: 1 }}
          className="fixed pointer-events-none z-50"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
          }}
        >
          <Heart className="w-8 h-8 fill-current" style={{ color: '#391214' }} />
        </motion.div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        <ValentineHeader />

        <InteractiveMessage />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <PhotoGallery />
        </motion.div>
      </div>

      {/* Animated corner decorations */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-40 h-40 rounded-br-full"
        style={{ backgroundColor: '#391214' }}
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
        className="fixed bottom-0 right-0 w-40 h-40 rounded-tl-full"
        style={{ backgroundColor: '#391214' }}
      />

      {/* Top right decoration */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="fixed top-10 right-10 opacity-20"
      >
        <Heart className="w-20 h-20 fill-current" style={{ color: '#391214' }} />
      </motion.div>

      {/* Bottom left decoration */}
      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="fixed bottom-10 left-10 opacity-20"
      >
        <Heart className="w-20 h-20 fill-current" style={{ color: '#391214' }} />
      </motion.div>
    </div>
  );
}
