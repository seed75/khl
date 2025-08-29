import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";

export default function Contact({ isActive = false }) {
  const [play, setPlay] = useState(false);              // Animista replay
  const [status, setStatus] = useState("idle");         // idle | sending | sent | error
  const [messageLen, setMessageLen] = useState(0);
  const formRef = useRef(null);
  const MAX = 1000;

  useEffect(() => {
    if (!isActive) { setPlay(false); return; }
    const id = requestAnimationFrame(() => setPlay(true));
    return () => cancelAnimationFrame(id);
  }, [isActive]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    const fd = new FormData(formRef.current);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const msg = (fd.get("message") || "").toString().trim();
    if (!name || !email || !msg) return;

    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xldwejep", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        formRef.current.reset();
        setMessageLen(0);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact-section">
      {/* Outer: fade only (no transform to avoid conflicts) */}
      <motion.div
        className="postcard"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.8 }}
        transition={{ duration: 0.4 }}
      >
        {/* Inner: Animista scale-in */}
        <div className={`form-shell ${play ? "scale-in-center" : ""}`}>
          <h2 className="contact-title">Let’s work together</h2>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Formspree helpers */}
            <input type="hidden" name="_subject" value="New message from your portfolio" />
            <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" style={{display:"none"}} aria-hidden="true" />

            <label className="field">
              <span>Name*</span>
              <input name="name" type="text" required placeholder="Your name" autoComplete="name" />
            </label>

            <label className="field">
              <span>Email*</span>
              <input name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
            </label>

            <label className="field">
              <span>Message*</span>
              <textarea
                name="message"
                required
                rows={5}
                maxLength={MAX}
                placeholder="Say hi…"
                onChange={(e) => setMessageLen(e.target.value.length)}
              />
              <div className="char-count" aria-live="polite">{messageLen}/{MAX}</div>
            </label>

            <button
              type="submit"
              className={`send-btn ${status === "sending" ? "is-sending" : ""}`}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>

            {status === "sent" && <p className="status success" role="status">Thanks! Your message has been sent.</p>}
            {status === "error" && <p className="status error" role="alert">Oops — something went wrong. Try again or email me at <a href="mailto:you@example.com">you@example.com</a>.</p>}
          </form>
        </div>
      </motion.div>
    </section>
  );
}
