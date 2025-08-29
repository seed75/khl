import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import './SlideTwo.css'; // Import the styles

// This is the second slide component
const SlideTwo = ({isActive, onSeeProjects}) => {
  return (
    <div className={`slide-two `}>
      {/* Animated container for content */}
      <motion.div
        className="slide-two-content"
        initial={{ opacity: 0, y: 50 }}       // Start slightly below and invisible
        whileInView={{ opacity: 1, y: 0 }}    // Animate when it scrolls into view
        transition={{ duration: 0.8 }}        // Duration of the animation
      >
      
        <TypeAnimation
          sequence={[
            'JUNIOR FRONTEND DEVELOPER & DESIGNER - RECENT IT GRADUATE', // Text to type
            2000, // Wait for 2 seconds
            '', // Clear text
            1000, // Wait for 1 second
          ]}
          speed={50} // Speed of typing
          style={{ fontSize: '1.5em', display: 'inline-block', marginBottom: '20px', fontFamily: 'Archivo Black, sans-serif' }} // Styling
          repeat={Infinity} // Repeat indefinitely
        />
        <p className = "about-body">
          I’m a recent IT graduate based in Sydney, focused on React and modern JavaScript. 
          I enjoy shipping pixel-perfect, responsive interfaces and turning ideas into products quickly and cleanly.
          
        </p>

        <motion.button
          className="skill-btn"
          onClick={onSeeProjects}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4 }}
  >
        DEVELOPER SKILLS
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SlideTwo;
