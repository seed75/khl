// src/App.js
import './App.css';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import HeroSlide from './components/HeroSlide';
import SlideTwo from './components/SlideTwo';
import SlideThree from './components/SlideThree';
import SlideFour from './components/SlideFour';
import Contact from "./components/Contact";
import DotNavigation from './components/DotNavigation';
import Navbar from './components/Navbar';

function App() {
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);
  const slide4Ref = useRef(null);
  const slide5Ref = useRef(null);

  const scrollContainerRef = useRef(null);

  // ✅ keep array identity stable so effects can depend on it safely
  const sectionRefs = useMemo(
    () => [slide1Ref, slide2Ref, slide3Ref, slide4Ref, slide5Ref],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { top } = container.getBoundingClientRect();
      const middle = container.clientHeight / 2; // ✅ use container height, not window

      sectionRefs.forEach((ref, index) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const elTop = rect.top - top;
        const elBottom = rect.bottom - top;

        if (elTop <= middle && elBottom >= middle) {
          setActiveIndex(index);
        }
      });
    };

    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // run once on mount
    handleScroll();

    return () => {
      container?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionRefs]); // ✅ stable dependency

  return (
    <div className="App">
      <Navbar sectionRefs={sectionRefs} activeIndex={activeIndex} />
      <div className="scroll-container" ref={scrollContainerRef}>
        <div ref={slide1Ref}>
          <HeroSlide isActive={activeIndex === 0} scrollTarget={slide2Ref} />
        </div>

        <div ref={slide2Ref}>
          <SlideTwo isActive={activeIndex === 1}
            onSeeProjects={() =>
              sectionRefs[2]?.current?.scrollIntoView({ behavior: 'smooth' })
            }
          />
        </div>

        <div ref={slide3Ref}>
          <SlideThree
            isActive={activeIndex === 2}
            onSeeProjects={() =>
              sectionRefs[3]?.current?.scrollIntoView({ behavior: 'smooth' })
            }
          />
        </div>

        <div ref={slide4Ref}>
          <SlideFour isActive={activeIndex === 3} />
        </div>

        <div ref={slide5Ref}>
          <Contact isActive={activeIndex === 4} />
        </div>
      </div>

      <DotNavigation sectionRefs={sectionRefs} activeIndex={activeIndex} />
    </div>
  );
}

export default App;
