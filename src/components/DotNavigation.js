import React from 'react';
import './DotNavigation.css'; // assuming your styles are here

const DotNavigation = ({ sectionRefs, activeIndex }) => {
  const handleClick = (index) => {
    sectionRefs[index].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dot-nav">
      {sectionRefs.map((_, index) => (
        <div
          key={index}
          className={`dot ${activeIndex === index ? 'active' : ''}`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default DotNavigation;
