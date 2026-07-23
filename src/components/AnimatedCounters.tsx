import React, { useEffect, useRef, useState } from 'react';

interface StatItemProps {
  target: number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ target, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let cur = 0;
          const step = Math.max(1, Math.round(target / 40));
          const interval = setInterval(() => {
            cur += step;
            if (cur >= target) {
              cur = target;
              clearInterval(interval);
            }
            setCount(cur);
          }, 24);
          observer.unobserve(el);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat">
      <div className="num">{count}</div>
      <div className="label">{label}</div>
    </div>
  );
};

export const AnimatedCounters: React.FC<{ inline?: boolean }> = ({ inline = false }) => {
  return (
    <div className={inline ? "stat-grid-inline" : "stat-grid reveal in"}>
      <StatItem target={6} label="Products shipped" />
      <StatItem target={1} label="App Store release" />
      <StatItem target={3} label="In development" />
      <StatItem target={2025} label="Founded" />
    </div>
  );
};
