export const Sparkles = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {[...Array(20)].map((_, i) => (
      <span
        key={i}
        className="absolute animate-ping text-yellow-300/60"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 10 + 6}px`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        }}
      >
        ✨
      </span>
    ))}
  </div>
)
