import { motion } from 'motion/react';
import { assetUrl } from '../lib/assets';

const heroImage = assetUrl('/images/hero-medium.jpg');

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[50%]">
        <img
          src={heroImage}
          alt="Nina van Hoorn artwork"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </div>
      
      <div className="max-w-7xl w-full mx-auto px-6 py-20 relative z-10">
        <div className="max-w-3xl">
          {/* Bold artistic typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Name with color block background */}
            <div className="relative inline-block">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute inset-0 bg-[var(--color-accent-red)] -z-10 origin-left"
                style={{ transform: 'rotate(-1deg)', padding: '1rem' }}
              />
              <h1 className="text-[15vw] md:text-[10vw] lg:text-9xl xl:text-[12rem] uppercase tracking-tighter leading-[0.85] font-black px-4 py-2">
                Nina<br />van<br />Hoorn
              </h1>
            </div>

            {/* Description with contrasting block */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-4 ml-0 md:ml-8"
            >
              <div className="bg-white p-6 md:p-8 max-w-lg shadow-xl">
                {/* <p className="text-2xl md:text-3xl uppercase tracking-tight font-bold mb-4">
                  Visual Artist
                </p> */}
                <p className="text-base md:text-lg text-neutral-700">
                  Printmaking / Photography / Painting
                </p>
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-sm md:text-base text-neutral-600">
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Scroll indicator — hidden on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="hidden md:flex absolute bottom-12 md:left-auto md:right-12 text-sm uppercase tracking-wider text-neutral-500"
            >
              <div className="flex items-center gap-2">
                <span>Selected Work</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}