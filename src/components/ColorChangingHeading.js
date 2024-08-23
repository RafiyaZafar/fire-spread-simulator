import React, { useState, useEffect } from 'react';

const headingText = 'Fire Spread Simulator';

function ColorChangingHeading() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % headingText.length);
    }, 1000); // Change color every second

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="color-changing-heading">
      {headingText.split('').map((letter, index) => (
        <span
          key={index}
          className={index === colorIndex ? 'highlight' : ''}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
}

export default ColorChangingHeading;
