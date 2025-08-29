// src/components/SlideFour.js
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SlideFour.css';
import voting_ballot from '../assets/voting_ballot.png';
import voting_dashboard from '../assets/voting_dashboard.png';
import aiagent1 from '../assets/aiagent1.png';

import own from '../assets/own.png';
import profile from '../assets/profile.png';
import KHL from '../assets/KHL.jpg';


const SlideFour = ({ isActive }) => {
  // ✅ Add case-study fields to each project
  const projects = useMemo(() => [
    {
      title: 'Portfolio Site',
      desc: 'Built with React & Framer Motion. Component-driven, animations, and accessibility.',
      images: [
        KHL,
      ],
      stack: ['React', 'Framer Motion', 'CSS', 'JavaScript', 'Git', 'Vercel', 'ChatGPT'],
      role: 'Solo developer & designer',
      problem: 'Create a fast, accessible, job-ready portfolio that highlights real skills and decision-making.',
      goals: [
        'Load fast (Lighthouse ≥ 90)',
        'Keyboard accessible modals and nav',
        'Mobile-first, responsive layout',
      ],
      decisions: [
        'Framer Motion for micro-interactions with prefers-reduced-motion support',
        'Scroll-container with active slide detection',
        'CSS keyframes + Framer separation to avoid transform conflicts',
      ],
      challenges: [
        'Conflicts between CSS keyframes and Framer transforms',
        'Animating inside a scroll container (not window)',
      ],
      outcome: 'Polished single-page experience with smooth animations, documented decisions, and a working contact form.',
      repoUrl: 'https://github.com/you/portfolio',         
      checklist: [
        'Resize window (mobile → desktop) — layout stays crisp',
        'Press Tab — focus rings are visible and logical',
        'Open a project — Esc closes, arrows switch images',
      ],
    },
    {
      title: 'Uni Project - Online Campus Voting System',
      desc: 'Campus election app focused on clear UX, validation, and basic auditability.',
      images: [
        voting_ballot,
        voting_dashboard
        ,
      ],
      stack: ['PHP', 'MySQL', 'XAMPP', 'HTML/CSS', 'JavaScript', 'Bootstrap', 'Git'],
      role: 'Full-stack student developer',
      problem: 'Enable secure campus voting with clear flows and simple admin review.',
      goals: ['Clear steps for voters', 'Basic audit logs', 'Simple admin dashboard'],
      decisions: ['Server-rendered pages', 'Form validation on server and client', 'Bootstrap for speed'],
      challenges: ['Preventing duplicate votes', 'Handling time windows for voting'],
      outcome: 'Fully working demo with seed data and CSV export.',
      demoUrl: '',
      liveUrl: '',
      repoUrl: '',
      checklist: ['Try a full vote flow', 'Check admin list', 'Export results'],
    },
    {
      title: 'Uni Project - Android App',
      mediaFit: 'cover',
      desc: 'Login → Dashboard → Detail with MVVM, Hilt DI, and Retrofit/Moshi. Dark-themed UI with logout on multiple screens.',
      images: [
        profile,
        own,
      ],
      stack: ['Kotlin',
    'MVVM',
    'Hilt (Dagger)',
    'Retrofit',
    'Moshi',
    'AndroidX AppCompat',
    'Activity KTX',
    'Lifecycle ViewModel',
    'XML layouts',
    'RecyclerView'],
      role: 'Android developer',
      problem: 'Deliver a clean, testable Android app for Mobile App Development unit: authenticate with student name + ID to obtain a keypass, fetch personalized dashboard data, and show details.',
      goals: ['Authenticate with first-name + student ID → keypass',
    'Fetch dashboard list using keypass',
    'Details page for selected entity',
    'Logout on Dashboard & Details',
    'Dark theme with blue accents',
    'Unit tests for ViewModel & Retrofit module'],
      decisions: ['MVVM with ViewModel for lifecycle-safe state',
    'Hilt for dependency injection (Retrofit, services)',
    'Retrofit + Moshi for API + JSON',
    'Separate Auth/Dashboard services and DTOs',
    'RecyclerView + Adapter for dashboard list',],
      challenges: ['Deriving API base/params from keypass (per-student data)',
    'Error handling and empty states for network calls',
    'Keeping code testable with DI and clean module boundaries',],
      outcome: 'Stable, dark-themed app with clear structure (MVVM + DI), dynamic API integration via keypass, and unit tests for critical pieces.',
      demoUrl: '',
      liveUrl: '',
      repoUrl: 'https://github.com/seed75/Android_App',
      checklist: [ 'Login with first name + student ID → keypass returned',
    'Dashboard loads personalized list',
    'Open an item → Detail page shows fields for that keypass',
    'Use menu → Logout works on Dashboard & Details',
    'Toggle system dark mode → UI stays readable',
    'Rotate device → state persists',],
      
    },
    {
      title: 'AI Agent',
      desc: 'A minimal ChatGPT like chat UI that sends user messages to the OpenAI Chat Completions API and renders responses.',
      images: [
        aiagent1,
      ],
      stack: ['Javarscript', 'CSS', 'React', 'OpenAI API'],
      role: 'Frontend Developer',
      problem: 'Build a simple, clean chat interface where users can type a prompt and see the AI reply. no extra complexity.',
      goals: ['Lightweight UI with message bubbles',
      'Basic chat history (in memory)',
      'Loading/typing indicator',
      'Copy response button',],
      decisions: ['Chat Completions API for simplicity',
      'Small fetch helper; optional serverless proxy to keep API key safe',
      'Local state for history (no database)',],
      challenges: ['Handling async states and loading indicators',
      'Avoiding API key exposure in the browser (use proxy for production)'],
      outcome: 'A clean, simple chat that feels like ChatGPT at a small scale—great as a learning and demo project.',
      demoUrl: '',
      liveUrl: '',
      repoUrl: 'https://github.com/seed75/ChatKangTP_myfirstagent',
      checklist: ['Type a message and press Enter → see reply',
      'Try the copy button on a response',
      'Send multiple messages → history stays visible'],
      
    },
  ], []);

  const [openIndex, setOpenIndex] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const closeDetail = useCallback(() => {
    setOpenIndex(null);
    setImageIndex(0);
  }, []);

  // ESC/Arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') return closeDetail();
      if (openIndex != null && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        const imgs = projects[openIndex]?.images || [];
        const n = imgs.length;
        if (n) setImageIndex((i) => (e.key === 'ArrowRight' ? (i + 1) % n : (i - 1 + n) % n));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex, closeDetail, projects]);

  // Small helper: responsive video (Loom/YouTube)
  const Demo = ({ url }) => {
    if (!url) return null;
    
    const src = url; // keep raw; both YT/Loom work with plain share links
    return (
      <div className="cs-video">
        <iframe
          src={src}
          title="Project demo"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  return (
    <div className="slide-four">
      <div className="slide-four-content">
        <motion.h2
          className="gradient-text"
          initial={{ opacity: 0, y: 40 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          PROJECTS
        </motion.h2>

        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.button
              key={project.title}
              type="button"
              className="project-card"
              onClick={() => setOpenIndex(index)}
              initial={{ opacity: 0, y: 40 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 40 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                key={`${isActive ? 'pop' : 'idle'}-${index}`}
                className={`card-inner ${isActive ? 'slide-fwd-center' : ''}`}
                style={{
                  animationDelay: isActive ? `${index * 0.12}s` : undefined,
                  transformPerspective: 800,
                }}
                whileHover={{
                  y: -6, z: 70, rotateX: -2, rotateY: 2,
                  boxShadow: '0 14px 40px rgba(0,0,0,0.35)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Case Study overlay */}
      <AnimatePresence mode="wait">
        {openIndex != null && (
          <>
            <motion.div
              className="detail-backdrop"
              onClick={closeDetail}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Project case study"
              className="detail-layer"
              onClick={(e) => {
                // close only if you clicked the empty area of the layer
                if (e.target === e.currentTarget) closeDetail();
              }}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.25 }}
            >
              {(() => {
                const p = projects[openIndex];
                const imgs = p?.images || [];
                const hasImgs = imgs.length > 0;
                const currentSrc = hasImgs ? imgs[imageIndex] : null;

                return (
                  <div
                    onClick={(e) => e.stopPropagation()}  // prevent inside-clicks from bubbling to layer
                    className="detail-card cs-grid">
                    {/* Left: gallery / demo */}
                    <div className="detail-media">
                      {currentSrc ? (
                        <img src={currentSrc} alt={`${p.title} screenshot ${imageIndex + 1}`} />
                      ) : (
                        <div className="detail-placeholder">No image</div>
                      )}
                      {hasImgs && (
                        <div className="thumbs">
                          {imgs.map((src, i) => (
                            <button
                              key={`${p.title}-thumb-${i}`}
                              type="button"
                              className={`thumb ${i === imageIndex ? 'active' : ''}`}
                              onClick={() => setImageIndex(i)}
                              aria-label={`Show image ${i + 1}`}
                            >
                              <img src={src} alt="" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Demo video (Loom/YouTube) */}
                      <Demo url={p.demoUrl} />
                    </div>

                    {/* Right: case study sections */}
                    <div className="detail-body">
                      <h3 className="gradient-text">{p.title}</h3>
                      <p className="detail-desc">{p.desc}</p>

                      <div className="cs-section">
                        <h4>Problem</h4>
                        <p>{p.problem}</p>
                      </div>

                      <div className="cs-section two-col">
                        <div>
                          <h4>Role</h4>
                          <p>{p.role}</p>
                        </div>
                        <div>
                          <h4>Stack</h4>
                          <ul className="badges">
                            {p.stack?.map((t) => <li key={`${p.title}-${t}`}>{t}</li>)}
                          </ul>
                        </div>
                      </div>

                      {p.goals?.length ? (
                        <div className="cs-section">
                          <h4>Goals</h4>
                          <ul className="dots">{p.goals.map((g, i) => <li key={i}>{g}</li>)}</ul>
                        </div>
                      ) : null}

                      {p.decisions?.length ? (
                        <div className="cs-section">
                          <h4>Key Decisions</h4>
                          <ul className="dots">{p.decisions.map((d, i) => <li key={i}>{d}</li>)}</ul>
                        </div>
                      ) : null}

                      {p.challenges?.length ? (
                        <div className="cs-section">
                          <h4>Challenges</h4>
                          <ul className="dots">{p.challenges.map((c, i) => <li key={i}>{c}</li>)}</ul>
                        </div>
                      ) : null}

                      <div className="cs-section">
                        <h4>Outcome</h4>
                        <p>{p.outcome}</p>
                      </div>

                      {p.checklist?.length ? (
                        <div className="cs-section">
                          <h4>Try this</h4>
                          <ul className="checks">
                            {p.checklist.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                      ) : null}

                      <div className="detail-actions">
                        {p.liveUrl ? <a className="cta" href={p.liveUrl} target="_blank" rel="noreferrer">Live</a> : null}
                        {p.repoUrl ? <a className="cta" href={p.repoUrl} target="_blank" rel="noreferrer">Repo</a> : null}
                        <button type="button" className="ghost" onClick={closeDetail}>Close</button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlideFour;
