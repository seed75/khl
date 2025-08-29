import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import './HeroSlide.css';

const LOOP_MS = 5000; // ⏱️ how often to restart the animation

const HeroSlide = ({ isActive, scrollTarget }) => {
  const [cycle, setCycle] = useState(0);

  // Restart the title animation every LOOP_MS
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), LOOP_MS);
    return () => clearInterval(id);
  }, []);

  const text = "HI, I'M KANGHYEOK LEE";

  return (
    <div className={`hero-slide `}>
      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.h1
            key={cycle} // 👈 remount each cycle so it re-animates
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.05, duration: 0.6 },
              },
              exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
            }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {text.split('').map((char, index) => (
              <motion.span
                key={`${cycle}-${index}`} // 👈 new keys each cycle to retrigger child staggers
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                }}
                whileHover={{ y: -5, rotate: -5 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'inline-block',
                  fontSize: '4rem',
                  color: 'white',
                  fontFamily: 'Archivo Black, sans-serif',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
        </AnimatePresence>

        <motion.p
          key={`sub-${cycle}`} // optional: also re-run the subtext each cycle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Junior Frontend Developer &amp; Designer - Recent IT Graduate
        </motion.p>

        <motion.button
          className="learn-more-btn"
          onClick={() => {
            scrollTarget?.current?.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          LEARN MORE
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSlide;
