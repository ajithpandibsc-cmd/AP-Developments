import React from 'react'
import logoImage from '../assets/logo.jpg'

export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-lg shadow-primary/20">
        <img src={logoImage} alt="AP Developments Logo" className="w-full h-full object-cover" style={{ mixBlendMode: 'lighten' }} />
      </div>
    </div>
  )
}
