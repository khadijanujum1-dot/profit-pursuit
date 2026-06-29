import { useEffect, useState } from "react";

/**
 * ScrollProgress — a gold progress bar fixed at the top of the viewport
 * that fills as the user scrolls down the page.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, rgba(212,175,55,0.4), #d4af37, rgba(245,200,80,0.9))",
          boxShadow: "0 0 10px rgba(212,175,55,0.6), 0 0 20px rgba(212,175,55,0.3)",
        }}
      />
    </div>
  );
}