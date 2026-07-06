import { useEffect, useRef, useState } from "react";

const VARIANTS = {
  up: (y) => ({ hidden: `translateY(${y}px)`, shown: "translateY(0)" }),
  down: (y) => ({ hidden: `translateY(-${y}px)`, shown: "translateY(0)" }),
  left: (y) => ({ hidden: `translateX(-${y}px)`, shown: "translateX(0)" }),
  right: (y) => ({ hidden: `translateX(${y}px)`, shown: "translateX(0)" }),
  scale: () => ({ hidden: "scale(0.85)", shown: "scale(1)" }),
  blur: () => ({ hidden: "scale(0.95)", shown: "scale(1)" }),
};

export default function ScrollReveal({ children, direction = "up", delay = 0, y = 40, duration = 800, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variant = VARIANTS[direction] || VARIANTS.up;
  const transforms = variant(y);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? transforms.shown : transforms.hidden,
        filter: direction === "blur" ? (visible ? "blur(0)" : "blur(10px)") : "none",
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter ${duration}ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}