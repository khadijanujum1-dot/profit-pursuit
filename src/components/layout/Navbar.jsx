import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { LOGO_URL } from "@/lib/store";
import { useAdmin } from "@/hooks/useAdmin";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Archive", path: "/archive" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Admin", path: "/admin" },
];

export default function Navbar({ mode = "public" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdmin();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  if (mode === "logo-only") {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 py-5 bg-black">
        <div className="flex justify-center">
          <Link to="/">
            <img src={LOGO_URL} alt="Profit Pursuit" className="h-14 object-contain" />
          </Link>
        </div>
      </nav>
    );
  }

  if (mode === "dashboard") {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gold/10 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Profit Pursuit" className="h-10 object-contain" />
            <span className="font-heading text-white font-bold tracking-[0.15em] uppercase text-sm hidden sm:block">
              Profit Pursuit
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="bg-gold/15 text-gold px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-semibold rounded">
              Admin Panel
            </span>
            <button
              onClick={() => { logout(); navigate("/admin"); }}
              className="flex items-center gap-1.5 text-red-400 text-sm hover:text-red-300 transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Public mode
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/95 backdrop-blur-md shadow-2xl" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1">
          <img src={LOGO_URL} alt="Profit Pursuit" className="h-12 object-contain" />
          <div className="flex flex-col leading-none">
<<<<<<< HEAD
            <span className="font-heading text-white font-bold text-2xl tracking-[0.1em] uppercase">
              Profit Pursuit
            </span>
            <span className="text-gold/50 text-[10px] tracking-[0.3em] uppercase mt-0.5">
=======
            <span className="font-heading text-white font-bold text-xl tracking-[0.1em] uppercase">
              Profit Pursuit
            </span>
            <span className="text-gold/50 text-[9px] tracking-[0.3em] uppercase mt-0.5">
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
              Est. 2023
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <React.Fragment key={link.path}>
                {i > 0 && <span className="text-gold/20 text-xs mx-1">•</span>}
                <Link
                  to={link.path}
<<<<<<< HEAD
                  className={`relative px-4 py-2 text-base tracking-wider transition-colors duration-300 ${isActive ? "text-gold" : "text-white/60 hover:text-gold"}`}
=======
                  className={`relative px-3 py-2 text-sm tracking-wider transition-colors duration-300 ${isActive ? "text-gold" : "text-white/60 hover:text-gold"}`}
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
                >
                  {link.label}
                </Link>
              </React.Fragment>
            );
          })}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gold p-2">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-gold/10 px-6 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
<<<<<<< HEAD
              className={`block py-3.5 text-base tracking-wider border-b border-gold/5 ${location.pathname === link.path ? "text-gold" : "text-white/60"}`}
=======
              className={`block py-3 text-sm tracking-wider border-b border-gold/5 ${location.pathname === link.path ? "text-gold" : "text-white/60"}`}
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}