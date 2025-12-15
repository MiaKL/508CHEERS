import React, { useState, useEffect, useRef, useMemo } from 'react';
import './PartnerCarousel.css';

export default function PartnerCarousel() {
  const partnerImages = [
    '/images/Partners/partner1.png',
    '/images/Partners/partner2.png',
    '/images/Partners/partner3.png',
    '/images/Partners/partner4.png',
    '/images/Partners/partner5.png',
    '/images/Partners/partner6.png',
    '/images/Partners/partner7.png'
  ];

  const total = partnerImages.length;
  const extended = useMemo(() => [...partnerImages, ...partnerImages, ...partnerImages], [partnerImages]);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const intervalRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(() => (typeof window !== 'undefined' && window.innerWidth >= 1200) ? 5 : (typeof window !== 'undefined' && window.innerWidth >= 900) ? 4 : 2);
  const [index, setIndex] = useState(total); // start in middle block
  const [itemWidth, setItemWidth] = useState(0); // px
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // measure viewport and set item width
  useEffect(() => {
    function updateSizes() {
      const w = window.innerWidth;
      const vis = w >= 1200 ? 5 : w >= 900 ? 4 : 2;
      setVisibleCount(vis);
      const vw = viewportRef.current ? viewportRef.current.clientWidth : window.innerWidth;
      const calculated = Math.floor(vw / vis) || 100;
      setItemWidth(calculated);
      // keep index inside middle block after resize
      setIndex(total);
    }
    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [total]);

  // autoplay: increment index
  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setIndex((i) => i + 1), 3000);
    return () => clearInterval(intervalRef.current);
  }, [visibleCount]);

  function next() { setIndex((i) => i + 1); }
  function prev() { setIndex((i) => i - 1); }

  // handle seamless wrap by snapping index back into middle block when we cross clones
  useEffect(() => {
    if (!transitionEnabled) return;
    const rightBoundary = total * 2;
    if (index >= rightBoundary) {
      const t = setTimeout(() => {
        setTransitionEnabled(false);
        setIndex((i) => i - total);
        setTimeout(() => setTransitionEnabled(true), 30);
      }, 520);
      return () => clearTimeout(t);
    }

    if (index < total) {
      const t = setTimeout(() => {
        setTransitionEnabled(false);
        setIndex((i) => i + total);
        setTimeout(() => setTransitionEnabled(true), 30);
      }, 520);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [index, total, transitionEnabled]);

  const trackWidth = itemWidth ? itemWidth * extended.length : 0;
  const translateX = itemWidth ? -(index * itemWidth) : 0;

  return (
    <div className="pc-partners-inner">
      <button className="pc-control prev" onClick={prev} aria-label="Previous">‹</button>
      <div className="pc-viewport" ref={viewportRef}>
        <div
          className="pc-track"
          ref={trackRef}
          style={{ transition: transitionEnabled ? 'transform .52s ease' : 'none', transform: `translateX(${translateX}px)`, width: trackWidth ? `${trackWidth}px` : '100%' }}
        >
          {extended.map((src, i) => (
            <div className="pc-item" key={i} style={{ width: itemWidth ? `${itemWidth}px` : `${100 / visibleCount}%` }}>
              <img src={src} alt={`partner-${i % total}`} />
            </div>
          ))}
        </div>
      </div>
      <button className="pc-control next" onClick={next} aria-label="Next">›</button>
    </div>
  );
}
