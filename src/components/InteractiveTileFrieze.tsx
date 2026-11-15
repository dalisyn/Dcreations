import React, { useState } from 'react';
import { Language } from '../data/translations';
import { TILE_TEXTURE_URL } from './InteractiveTileBackground';

interface InteractiveTileFriezeProps {
  lang: Language;
}

export const InteractiveTileFrieze: React.FC<InteractiveTileFriezeProps> = ({ lang }) => {
  const [shinePos, setShinePos] = useState<number>(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    setShinePos(percent);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full py-6 overflow-hidden select-none bg-[#FAFAF8] border-y border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 uppercase tracking-wider">
          <span>
            {lang === 'ar'
              ? 'مادة الإيبوكسي والخَزَف التونسي'
              : 'MATÉRIALITÉ · FAÏENCE ÉMAILLÉE & JOINT ÉPOXY'}
          </span>
          <span className="hidden sm:inline">
            {lang === 'ar' ? 'نابل — تونس' : 'NABEUL · TUNIS'}
          </span>
        </div>

        {/* Architectural Ceramic Frieze Strip */}
        <div
          className="w-full h-14 sm:h-16 opacity-90 transition-all duration-300 relative border border-stone-200"
          style={{
            backgroundImage: `url("${TILE_TEXTURE_URL}")`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'center center',
            filter: 'saturate(1.1) contrast(1.04)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-150"
            style={{
              background: `radial-gradient(ellipse 260px 100% at ${shinePos}% 50%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.12) 50%, transparent 80%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
