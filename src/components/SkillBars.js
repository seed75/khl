// SkillBars.js
import React from 'react';
import { motion } from 'framer-motion';
import './SkillBars.css';

// Default skills (edit freely or pass a prop)
const DEFAULT_SKILLS = [
  { label: 'React', value: 80 },
  { label: 'JavaScript', value: 85 },
  { label: 'HTML/CSS', value: 90 },
  { label: 'Tailwind', value: 70 },
  { label: 'Framer Motion', value: 75 },
  { label: 'Accessibility', value: 65 },
];

export default function SkillBars({ skills = DEFAULT_SKILLS }) {
  return (
    <div className="skills-bars" role="list">
      {skills.map((s) => (
        <div className="skill-row" key={s.label} role="listitem">
          <div className="skill-label">{s.label}</div>

          {/* Accessible progress bar */}
          <div
            className="skill-track"
            role="progressbar"
            aria-label={`${s.label} ${s.value}%`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={s.value}
          >
            <motion.div
              className="skill-fill"
              initial={{ width: 0 }}
              whileInView={{ width: `${s.value}%` }} // animate when visible
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="skill-value">{s.value}%</div>
        </div>
      ))}
    </div>
  );
}
