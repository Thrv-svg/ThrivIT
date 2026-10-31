import React from 'react';

interface AmbientGlowProps {
  className?: string;
}

export const AmbientGlow: React.FC<AmbientGlowProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center pointer-events-none select-none overflow-hidden ${className}`}>
      {/* Multi-color ambient blurred aura matching reference image */}
      <div className="absolute w-[650px] h-[320px] rounded-full bg-gradient-to-r from-rose-500/35 via-orange-500/30 to-indigo-600/40 blur-[110px] transform -translate-y-6" />
      <div className="absolute w-[450px] h-[260px] rounded-full bg-gradient-to-tr from-cyan-400/25 via-blue-600/30 to-fuchsia-500/35 blur-[95px] transform translate-y-8" />
    </div>
  );
};
