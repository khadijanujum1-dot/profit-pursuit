import { useEffect, useRef, useState } from "react";

/**
<<<<<<< HEAD
 * ScrollReveal — fades and slides children into view on scroll.
 * Props:
 *  - direction: "up" | "down" | "left" | "right" | "scale" | "blur" (default "up")
 *  - delay: animation delay in ms (default 0)
 *  - y: initial offset in px (default 40)
 *  - duration: transition duration in ms (default 800)
 *  - className: wrapper class
 */
const VARIANTS = {
  up:    (y) => ({ hidden: `translateY(${y}px)`,  shown: "translateY(0)" }),
  down:  (y) => ({ hidden: `translateY(-${y}px)`, shown: "translateY(0)" }),
  left:  (y) => ({ hidden: `translateX(-${y}px)`, shown: "translateX(0)" }),
  right: (y) => ({ hidden: `translateX(${y}px)`,  shown: "translateX(0)" }),
  scale: ()  => ({ hidden: "scale(0.85)",          shown: "scale(1)" }),
  blur:  ()  => ({ hidden: "scale(0.95)",          shown: "scale(1)" }),
};

export default function ScrollReveal({ children, direction = "up", delay = 0, y = 40, duration = 800, className = "" }) {
=======
 * ScrollReveal — fades and slides children into view when scrolled into the viewport.
 * Props:
 *  - delay: animation delay in ms (default 0)
 *  - y: initial translateY offset in px (default 40)
 *  - className: wrapper class
 */
export default function ScrollReveal({ children, delay = 0, y = 40, className = "" }) {
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
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
<<<<<<< HEAD
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
=======
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

<<<<<<< HEAD
  const variant = VARIANTS[direction] || VARIANTS.up;
  const transforms = variant(y);

=======
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
<<<<<<< HEAD
        transform: visible ? transforms.shown : transforms.hidden,
        filter: direction === "blur" ? (visible ? "blur(0)" : "blur(10px)") : "none",
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter ${duration}ms ease ${delay}ms`,
=======
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
      }}
    >
      {children}
    </div>
  );
}