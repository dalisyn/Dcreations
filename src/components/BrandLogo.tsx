import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  markOnly?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  markOnly = false,
  className = '',
}) => {
  const isDarkBg = variant === 'dark';

  const markSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const creationsTextSizes = {
    sm: 'text-[10px] tracking-[0.22em]',
    md: 'text-[11px] sm:text-xs tracking-[0.26em]',
    lg: 'text-xs sm:text-[13px] tracking-[0.28em]',
  };

  const dividerHeights = {
    sm: 'h-3.5',
    md: 'h-4',
    lg: 'h-5',
  };

  const primaryStroke = isDarkBg ? '#FAFAF8' : '#141413';
  const goldAccent = isDarkBg ? '#D4B075' : '#A98346';
  const subtleFrame = isDarkBg ? 'rgba(255,255,255,0.22)' : 'rgba(20,20,19,0.18)';
  const cobaltAccent = isDarkBg ? '#6BA3D6' : '#0F4C81';

  return (
    <span
      dir="ltr"
      className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none group ${className}`}
    >
      {/* Bespoke Architectural & Sculptural Monogram Mark */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${markSizes[size]} shrink-0 transition-transform duration-300 ease-out group-hover:scale-[1.03]`}
        aria-hidden="true"
      >
        {/* Architectural Outer Atelier Frame */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          stroke={subtleFrame}
          strokeWidth="1"
        />

        {/* Delicate Corner Register Marks (Luxury Atelier Precision) */}
        <path
          d="M2 8V2H8M40 2H46V8M46 40V46H40M8 46H2V40"
          stroke={goldAccent}
          strokeWidth="1.2"
        />

        {/* Sculpted Architectural "D" Pillar & Sweeping Bow */}
        <path
          d="M14 11V37"
          stroke={primaryStroke}
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        <path
          d="M14 11H23.5C31.5 11 36.5 16.5 36.5 24C36.5 31.5 31.5 37 23.5 37H14"
          stroke={primaryStroke}
          strokeWidth="2.1"
          strokeLinejoin="round"
        />

        {/* Inner Creative Organic Ribbon / Sculptural Curve */}
        <path
          d="M18.5 15.5C24.5 15.5 29.5 18.8 29.5 24C29.5 29.2 24.5 32.5 18.5 32.5"
          stroke={cobaltAccent}
          strokeWidth="1.15"
          strokeOpacity="0.85"
        />

        {/* Handcrafted Four-Point Zellige Diamond Star Inlay */}
        <path
          d="M23.5 19.2L25.1 22.4L28.3 24L25.1 25.6L23.5 28.8L21.9 25.6L18.7 24L21.9 22.4L23.5 19.2Z"
          fill={goldAccent}
          className="transition-opacity duration-300 group-hover:opacity-90"
        />

        {/* Fine Architectural Axis Tick */}
        <circle cx="14" cy="24" r="1.4" fill={goldAccent} />
      </svg>

      {/* Luxury Editorial Wordmark (Single D monogram followed by CREATIONS) */}
      {!markOnly && (
        <span className="inline-flex items-center gap-2.5 leading-none">
          <span
            className={`w-px ${dividerHeights[size]}`}
            style={{ backgroundColor: goldAccent }}
            aria-hidden="true"
          />
          <span
            className={`font-sans font-medium uppercase ${creationsTextSizes[size]} ${
              isDarkBg ? 'text-stone-100' : 'text-[#141413]'
            }`}
          >
            Creations
          </span>
        </span>
      )}
    </span>
  );
};
