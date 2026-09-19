export default function Logo({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`logo-svg ${className}`}
      aria-label="AP Developments Logo"
      role="img"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#7C3AED" />
          <stop offset="50%"  stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#A3E635" />
        </linearGradient>
        <filter id="logo-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Hexagonal background */}
      <path
        d="M40 4 L72 22 L72 58 L40 76 L8 58 L8 22 Z"
        fill="rgba(124,58,237,0.12)"
        stroke="url(#logo-grad)"
        strokeWidth="1.5"
      />
      {/* A letterform */}
      <path
        d="M22 56 L32 24 L40 38 L48 24 L58 56"
        stroke="url(#logo-grad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#logo-glow)"
      />
      {/* A crossbar */}
      <line x1="26" y1="44" x2="36" y2="44" stroke="url(#logo-grad)" strokeWidth="3" strokeLinecap="round" />
      {/* P letterform */}
      <path
        d="M40 56 L40 24 L52 24 Q60 24 60 34 Q60 44 52 44 L40 44"
        stroke="url(#logo-grad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#logo-glow)"
      />
      {/* Corner accent dots */}
      <circle cx="40" cy="4"  r="2" fill="#7C3AED" opacity="0.7" />
      <circle cx="72" cy="22" r="2" fill="#06B6D4" opacity="0.7" />
      <circle cx="8"  cy="58" r="2" fill="#A3E635" opacity="0.7" />
    </svg>
  )
}
