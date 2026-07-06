export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-light text-white/30">404</h1>
        <h2 className="text-2xl font-medium text-white">Page Not Found</h2>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-2 border border-gold/40 text-gold text-sm hover:bg-gold/10 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
