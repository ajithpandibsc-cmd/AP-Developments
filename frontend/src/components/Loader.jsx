export default function Loader({ fullscreen = false, text = 'Loading...' }) {
  const wrapper = fullscreen
    ? 'fixed inset-0 flex items-center justify-center bg-[var(--bg)] z-50'
    : 'flex items-center justify-center py-24'

  return (
    <div className={wrapper} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        {/* Spinning hexagon */}
        <div className="relative w-14 h-14">
          <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="animate-spin" style={{ animationDuration: '1.5s' }}>
            <path
              d="M28 3 L51 16 L51 40 L28 53 L5 40 L5 16 Z"
              stroke="url(#spin-grad)"
              strokeWidth="2"
              strokeDasharray="140"
              strokeDashoffset="40"
              fill="none"
            />
            <defs>
              <linearGradient id="spin-grad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
          </div>
        </div>
        <span className="text-[var(--muted)] text-sm font-medium">{text}</span>
      </div>
    </div>
  )
}
