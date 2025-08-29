import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './SlideThree.css'; // Import styles
import SkillBars from './SkillBars'; // Import SkillBars component

const SlideThree = ({ isActive, onSeeProjects = () => {} }) => {
  const [animate, setAnimate] = useState(false);
  // replay CSS animation whenever this slide becomes active
  
  useEffect(() => {
    if (!isActive) {
      setAnimate(false);
      return;
    }

    // force reflow so the class re-triggers cleanly
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [isActive]);
  
  return (
    <div className={`slide-three `}>
      <motion.div
        className="slide-three-content"
        initial={{ opacity: 0, y: 50 }}
        // Use isActive so it works with your scroll-container
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2
          key={animate ? 'on' : 'off'}                // force re-mount to restart keyframes
          className={`skill-title ${animate ? 'focus-in-expand' : ''}`}
        >
          ONGOING JOURNEY
        </h2>

        <SkillBars
          skills={[
            { label: 'React', value: 30 },
            { label: 'HTML/CSS', value: 60 },
            { label: 'JS (ES202x)', value: 50 },
            { label: 'C#', value: 40 },
            { label: 'Tailwind', value: 30 },
            { label: 'Python', value: 40 },
            { label: 'AI', value: 70 },
            { label: 'Resources', value: 80 },
          ]}
        />

        <motion.button
          className="projects-btn"
          onClick={onSeeProjects}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          PROJECTS
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SlideThree;
