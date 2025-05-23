"use client"
import { useEffect, useState, useRef } from 'react';
import styles from './AnimatedDollar.module.css';

const AnimatedDollar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const ticking = useRef(false);
  
  useEffect(() => {
    // Initialize heights
    const updateHeights = () => {
      // Get total page height to calculate percentages
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      setPageHeight(documentHeight);
      setWindowHeight(window.innerHeight);
    };

    const handleScroll = () => {
      if (!ticking.current) {
        // Use requestAnimationFrame to throttle the scroll event
        window.requestAnimationFrame(() => {
          setScrollPosition(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateHeights);
    
    // Initialize
    updateHeights();
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeights);
    };
  }, []);

  // Calculate dollar sign position based on scroll
  const maxScroll = pageHeight - windowHeight;
  // Adjust to keep in visible area (25% to 80% of viewport to account for navbar)
  const scrollRatio = maxScroll > 0 ? scrollPosition / maxScroll : 0;
  const adjustedPosition = 25 + (scrollRatio * 55);

  return (
    <>
      {/* Full-height line container */}
      <div className={styles.lineContainer}>
        <div className={styles.fullLine}></div>
        <div className={styles.animatedLineOverlay}></div>
        
        {/* Dollar sign positioned directly on the line */}
        <div 
          className={styles.dollarSign}
          style={{ 
            top: `${adjustedPosition}vh`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          $
        </div>
        
        {/* Financial icons that follow the dollar sign */}
        <div 
          className={styles.iconsContainer}
          style={{ 
            top: `${adjustedPosition}vh`,
          }}
        >
          <div className={`${styles.financeIcon} ${styles.firstIcon}`}>💰</div>
          <div className={`${styles.financeIcon} ${styles.secondIcon}`}>📈</div>
          <div className={`${styles.financeIcon} ${styles.thirdIcon}`}>💎</div>
        </div>
      </div>
    </>
  );
};

export default AnimatedDollar; 