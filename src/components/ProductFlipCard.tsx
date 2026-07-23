import React, { useState, useRef, useEffect } from 'react';
import { AppLogo } from './AppLogo';

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  category: string;
  badge: string;
  badgeColor: string;
  url: string;
  feats: string[];
  tech: string[];
  initial: string;
}

interface ProductFlipCardProps {
  product: ProductItem;
}

export const ProductFlipCard: React.FC<ProductFlipCardProps> = ({ product }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const frontGlowRef = useRef<HTMLDivElement>(null);
  const backGlowRef = useRef<HTMLDivElement>(null);

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    const isTouch = window.matchMedia('(hover: none)').matches;
    const maxTilt = 10;
    let raf: number | null = null;

    const setTransform = (rx: number, ry: number, flippedState: boolean) => {
      const baseY = flippedState ? 180 : 0;
      inner.style.transform = `rotateY(${baseY + ry}deg) rotateX(${rx}deg)`;
    };

    const handleMove = (clientX: number, clientY: number, flippedState: boolean) => {
      const r = card.getBoundingClientRect();
      const x = (clientX - r.left) / r.width;
      const y = (clientY - r.top) / r.height;
      const rx = (0.5 - y) * maxTilt;
      const ry = (x - 0.5) * maxTilt * (flippedState ? -1 : 1);

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setTransform(rx, ry, flippedState);
        if (frontGlowRef.current) {
          frontGlowRef.current.style.setProperty('--mx', `${x * 100}%`);
          frontGlowRef.current.style.setProperty('--my', `${y * 100}%`);
        }
        if (backGlowRef.current) {
          backGlowRef.current.style.setProperty('--mx', `${x * 100}%`);
          backGlowRef.current.style.setProperty('--my', `${y * 100}%`);
        }
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (!isTouch) {
        setIsFlipped(true);
        handleMove(e.clientX, e.clientY, true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isTouch) {
        handleMove(e.clientX, e.clientY, isFlipped);
      }
    };

    const handleMouseLeave = () => {
      if (!isTouch) {
        setIsFlipped(false);
        setTransform(0, 0, false);
      }
    };

    const handleClick = () => {
      if (isTouch) {
        setIsFlipped((prev) => {
          const next = !prev;
          setTransform(0, 0, next);
          return next;
        });
      }
    };

    const handleFocus = () => {
      setIsFlipped(true);
      setTransform(0, 0, true);
    };

    const handleBlur = () => {
      setIsFlipped(false);
      setTransform(0, 0, false);
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('click', handleClick);
    card.addEventListener('focus', handleFocus);
    card.addEventListener('blur', handleBlur);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('click', handleClick);
      card.removeEventListener('focus', handleFocus);
      card.removeEventListener('blur', handleBlur);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isFlipped]);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-label={`${product.name} — flip for details`}
      className={`flip-card reveal in ${isFlipped ? 'flipped' : ''}`}
    >
      <div ref={innerRef} className="flip-card-inner">
        {/* FRONT FACE */}
        <div className="card-face front">
          <div ref={frontGlowRef} className="glow" />
          <div className="top-row">
            <AppLogo id={product.id} name={product.name} size={48} />
            <span className={`badge badge-${product.badgeColor}`}>{product.badge}</span>
          </div>
          <h3>{product.name}</h3>
          <div className="subtitle">{product.subtitle}</div>
          <p className="desc">{product.desc}</p>
          <div className="flip-hint">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-3-6.7" />
              <path d="M21 3v6h-6" />
            </svg>
            <span>Hover to explore</span>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="card-face back">
          <div ref={backGlowRef} className="glow" />
          <div className="back-header">
            <span className="cat">{product.category}</span>
            <AppLogo id={product.id} name={product.name} size={36} />
          </div>
          <div className="feat-list">
            {product.feats.map((f, i) => (
              <div key={i}>
                <span className="tick">&#10003;</span>
                {f}
              </div>
            ))}
          </div>
          <div className="tech-row">
            {product.tech.map((t, i) => (
              <span key={i} className="tech-chip">
                {t}
              </span>
            ))}
          </div>
          {product.url !== '#' ? (
            <a className="card-link" href={product.url} target="_blank" rel="noopener noreferrer">
              Visit platform{' '}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </a>
          ) : (
            <div className="card-link" style={{ color: 'var(--text-dimmer)', cursor: 'default' }}>
              In-house platform
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
