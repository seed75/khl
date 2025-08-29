import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const Navbar = ({ sectionRefs, activeIndex }) => {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);

  const items = [
    { label: "HOME", idx: 0 },
    { label: "ABOUT", idx: 1 },
    { label: "SKILLS", idx: 2 },
    { label: "PROJECTS", idx: 3 },
    { label: "CONTACT", idx: 4 },
  ];

  const scrollTo = (idx) => {
    sectionRefs[idx]?.current?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  // Esc to close + focus first link when opening
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // focus first link for a11y
      setTimeout(() => firstLinkRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      <nav className="navbar">
        <div
          className="brand"
          onClick={() => scrollTo(0)}
          role="button"
          tabIndex={0}
          aria-label="Go to home"
          onKeyDown={(e) => e.key === "Enter" && scrollTo(0)}
        >
          KHL<span className="dot">•</span>
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {items.map((it) => (
            <li key={it.label}>
              <button
                className={`nav-link ${activeIndex === it.idx ? "active" : ""}`}
                onClick={() => scrollTo(it.idx)}
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger button (mobile) */}
        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer + overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              className="mobile-overlay"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              id="mobile-menu"
              className="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 22, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <span>Menu</span>
                <button className="close-x" onClick={() => setOpen(false)} aria-label="Close">
                  ×
                </button>
              </div>
              <ul className="drawer-links">
                {items.map((it, i) => (
                  <li key={it.label}>
                    <button
                      ref={i === 0 ? firstLinkRef : undefined}
                      className={`drawer-link ${activeIndex === it.idx ? "active" : ""}`}
                      onClick={() => scrollTo(it.idx)}
                    >
                      {it.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="drawer-footer">© {new Date().getFullYear()} Kanghyeok Lee</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
