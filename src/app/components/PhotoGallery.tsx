import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';
import { useState } from 'react';

interface Photo {
  id: number;
  url: string;
  caption: string;
}

const photos: Photo[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1663428710477-c7c838be76b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMGxvdmV8ZW58MXx8fHwxNzcwOTcyNzk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Our Love',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1506014299253-3725319c0f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHN8ZW58MXx8fHwxNzcwOTAxMTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Hand in Hand',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1726251903562-4af66fc61634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzdW5zZXQlMjBiZWFjaHxlbnwxfHx8fDE3NzA5MzM0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Sunset Dreams',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1514846528774-8de9d4a07023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBlbWJyYWNpbmclMjBsb3ZlfGVufDF8fHx8MTc3MDkwNTEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Forever Yours',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1650737779186-4073102e1380?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzcwOTE4ODc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Together Always',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1615500025837-cf3a8716c83d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRhdGUlMjBkaW5uZXJ8ZW58MXx8fHwxNzcwOTYyNzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Date Night',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1549385718-b7fde845f44c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBhZHZlbnR1cmUlMjB0cmF2ZWx8ZW58MXx8fHwxNzcwODg0MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Adventures',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1619208110262-90c0438c174d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBsYXVnaGluZyUyMGhhcHB5fGVufDF8fHx8MTc3MDk3MzUzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Happy Moments',
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1763713512972-58f361318408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBkYW5jaW5nJTIwcm9tYW50aWN8ZW58MXx8fHwxNzcwOTA1ODg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Dance With Me',
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1514846528774-8de9d4a07023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBraXNzaW5nJTIwcm9tYW5jZXxlbnwxfHx8fDE3NzA5NzM1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Sweet Kiss',
  },
];

export function PhotoGallery() {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set([1, 4, 7, 10]));

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPhotos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="text-center mb-8"
        style={{
          color: '#391214',
          fontSize: '2.5rem',
          fontWeight: '600',
        }}
      >
        Our Memory Gallery
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8, rotateZ: Math.random() * 20 - 10 }}
            animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
            className="relative group"
            onMouseEnter={() => setHoveredPhoto(photo.id)}
            onMouseLeave={() => setHoveredPhoto(null)}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                rotateZ: hoveredPhoto === photo.id ? (index % 2 === 0 ? 2 : -2) : 0,
                y: -8,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="p-5 rounded-2xl shadow-xl cursor-pointer relative overflow-hidden"
              style={{
                backgroundColor: '#C0BAB3',
                boxShadow: '0 8px 25px rgba(57, 18, 20, 0.15)',
              }}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              {/* Photo frame */}
              <div className="aspect-square overflow-hidden rounded-lg mb-4 relative bg-white shadow-inner">
                <motion.img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Subtle gradient overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredPhoto === photo.id ? 0.3 : 0 }}
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(57, 18, 20, 0.4) 100%)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Caption */}
              <div className="flex flex-col items-center gap-2">
                <motion.p
                  className="text-center"
                  style={{
                    color: '#391214',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    letterSpacing: '0.02em',
                  }}
                  animate={{
                    y: hoveredPhoto === photo.id ? -2 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {photo.caption}
                </motion.p>

                {/* Decorative line */}
                <motion.div
                  style={{ backgroundColor: '#391214', height: '2px' }}
                  animate={{
                    width: hoveredPhoto === photo.id ? '60%' : '40%',
                    opacity: hoveredPhoto === photo.id ? 0.6 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Like button */}
              <motion.button
                onClick={(e) => toggleLike(photo.id, e)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full"
                style={{
                  backgroundColor: likedPhotos.has(photo.id)
                    ? 'rgba(57, 18, 20, 0.9)'
                    : 'rgba(255, 255, 255, 0.7)',
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Heart
                  className={`w-5 h-5 ${likedPhotos.has(photo.id) ? 'fill-current' : ''}`}
                  style={{ color: likedPhotos.has(photo.id) ? '#C0BAB3' : '#391214' }}
                />
              </motion.button>

              {/* Decorative corner accent */}
              <div
                className="absolute top-0 left-0 w-8 h-8 rounded-br-full opacity-20"
                style={{ backgroundColor: '#391214' }}
              />
              <div
                className="absolute bottom-0 right-0 w-8 h-8 rounded-tl-full opacity-20"
                style={{ backgroundColor: '#391214' }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(57, 18, 20, 0.95)' }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image container with frame */}
              <div
                className="p-8 rounded-3xl shadow-2xl"
                style={{ backgroundColor: '#C0BAB3' }}
              >
                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <img
                    src={photos.find((p) => p.id === selectedPhoto)?.url}
                    alt="Selected"
                    className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
                  />
                </div>

                {/* Caption below image */}
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p
                    style={{
                      color: '#391214',
                      fontSize: '1.75rem',
                      fontWeight: '600',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {photos.find((p) => p.id === selectedPhoto)?.caption}
                  </p>
                  <div
                    className="mx-auto mt-3"
                    style={{
                      width: '100px',
                      height: '3px',
                      backgroundColor: '#391214',
                      opacity: 0.5,
                    }}
                  />
                </motion.div>
              </div>

              {/* Close button */}
              <motion.button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-4 -right-4 p-3 rounded-full shadow-xl"
                style={{ backgroundColor: '#391214' }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-7 h-7 text-white" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="mt-12 text-center p-6 rounded-2xl"
        style={{
          backgroundColor: 'rgba(57, 18, 20, 0.25)',
        }}
      >
        <motion.p
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            color: '#391214',
            fontSize: '1.25rem',
            fontWeight: '600',
          }}
        >
          💕 {likedPhotos.size} favorite {likedPhotos.size === 1 ? 'moment' : 'moments'} 💕
        </motion.p>
      </motion.div>
    </div>
  );
}
