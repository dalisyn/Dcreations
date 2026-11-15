import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Sun, Eye, Waves, Volume2, RefreshCw } from 'lucide-react';
import { Language } from '../data/translations';

interface Ripple {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

interface InteractiveTileBackgroundProps {
  lang: Language;
  opacityLevel?: 'subtle' | 'medium' | 'vivid';
  enableRipples?: boolean;
  enableLightTracker?: boolean;
  className?: string;
}

export const TILE_TEXTURE_URL =
  '/assets/aistudio/pngtree-mediterranean-design-seamless-ceramic-texture-tiles-image_13921229_7515e9a2.png';

export const InteractiveTileBackground: React.FC<InteractiveTileBackgroundProps> = ({
  lang,
  opacityLevel = 'subtle',
  enableRipples = true,
  enableLightTracker = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse & Lighting State
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: -500,
    y: -500,
    active: false,
  });
  const [lightPreset, setLightPreset] = useState<'noon' | 'golden'>('noon');
  const [currentOpacity, setCurrentOpacity] = useState<'subtle' | 'medium' | 'vivid'>(opacityLevel);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  // Auto-ambient sunlight drift when idle
  const [ambientAngle, setAmbientAngle] = useState(0);

  // Handle Mouse Move for Specular Glaze Tracking
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableLightTracker) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y, active: true });
    },
    [enableLightTracker]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, active: false }));
  }, []);

  // Handle Click / Tap for Ceramic Ripple Waves
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableRipples) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple: Ripple = {
        id: ++rippleIdRef.current,
        x,
        y,
        radius: 10,
        maxRadius: Math.max(rect.width, rect.height) * 0.45,
        opacity: 0.8,
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);
    },
    [enableRipples]
  );

  // Canvas animation loop for water/glaze ripples and light diffusion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render ripples
      if (ripples.length > 0) {
        ripples.forEach((r) => {
          ctx.save();
          // Outer caustic ring
          const grad = ctx.createRadialGradient(r.x, r.y, Math.max(0, r.radius - 20), r.x, r.y, r.radius);
          if (lightPreset === 'golden') {
            grad.addColorStop(0, `rgba(251, 191, 36, 0)`);
            grad.addColorStop(0.7, `rgba(245, 158, 11, ${r.opacity * 0.4})`);
            grad.addColorStop(0.9, `rgba(255, 255, 255, ${r.opacity * 0.7})`);
            grad.addColorStop(1, `rgba(217, 119, 6, 0)`);
          } else {
            grad.addColorStop(0, `rgba(15, 76, 129, 0)`);
            grad.addColorStop(0.7, `rgba(56, 189, 248, ${r.opacity * 0.4})`);
            grad.addColorStop(0.9, `rgba(255, 255, 255, ${r.opacity * 0.7})`);
            grad.addColorStop(1, `rgba(14, 165, 233, 0)`);
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.fill();

          // Delicate specular line
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.95, 0, Math.PI * 2);
          ctx.stroke();

          ctx.restore();
        });

        // Update ripples
        setRipples((prev) =>
          prev
            .map((r) => ({
              ...r,
              radius: r.radius + (r.maxRadius - r.radius) * 0.08 + 2.5,
              opacity: r.opacity * 0.93,
            }))
            .filter((r) => r.opacity > 0.02 && r.radius < r.maxRadius)
        );
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [ripples, lightPreset]);

  // Ambient sun rotation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbientAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Calculate ambient sunlight coordinates when mouse is inactive
  const ambientX = 50 + 35 * Math.cos((ambientAngle * Math.PI) / 180);
  const ambientY = 50 + 25 * Math.sin((ambientAngle * Math.PI) / 180);

  // Opacity styles for the ceramic tile layer
  const opacityClass =
    currentOpacity === 'subtle'
      ? 'opacity-20 sm:opacity-25'
      : currentOpacity === 'medium'
      ? 'opacity-40 sm:opacity-45'
      : 'opacity-75 sm:opacity-85';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`absolute inset-0 pointer-events-auto overflow-hidden select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* 1. Base Ceramic Tile Texture Layer (Seamless Pattern) */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${opacityClass}`}
        style={{
          backgroundImage: `url("${TILE_TEXTURE_URL}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '360px auto',
          backgroundPosition: 'center center',
          filter:
            lightPreset === 'golden'
              ? 'saturate(1.25) sepia(0.2) contrast(1.08)'
              : 'saturate(1.15) contrast(1.05)',
        }}
      />

      {/* 2. Mortar Grout Grid Accent & Fine Craquelure Shimmer */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 180px 90px, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          backgroundSize: '360px 180px',
        }}
      />

      {/* 3. Interactive Specular Glaze Light (Cursor Following) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: mousePos.active ? 1 : 0.65,
          background: mousePos.active
            ? `radial-gradient(circle 380px at ${mousePos.x}px ${mousePos.y}px, ${
                lightPreset === 'golden'
                  ? 'rgba(254, 240, 138, 0.35)'
                  : 'rgba(224, 242, 254, 0.45)'
              } 0%, rgba(255,255,255,0.18) 35%, transparent 75%)`
            : `radial-gradient(circle 500px at ${ambientX}% ${ambientY}%, ${
                lightPreset === 'golden'
                  ? 'rgba(253, 224, 71, 0.22)'
                  : 'rgba(186, 230, 253, 0.28)'
              } 0%, transparent 70%)`,
        }}
      />

      {/* 4. Glazed Ceramic Sheen Diagonal Light Sweep (Ambient Mediterranean Sun) */}
      <div
        className="absolute -inset-full pointer-events-none opacity-25 mix-blend-soft-light animate-[pulse_8s_ease-in-out_infinite]"
        style={{
          background:
            lightPreset === 'golden'
              ? 'linear-gradient(135deg, transparent 40%, rgba(251, 191, 36, 0.4) 50%, transparent 60%)'
              : 'linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%)',
          transform: `translateX(${ambientAngle % 100}%)`,
        }}
      />

      {/* 5. Canvas for Interactive Ceramic Glaze Ripples */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      />

      {/* 6. Soft Radial Vignette to preserve text contrast and center focus */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-[#FAF8F5]/40 to-[#FAF8F5]/90" />

      {/* 7. Subtle Interactive Badge & Controls (Bottom Right of Banner) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-3 right-4 z-20 hidden md:flex items-center gap-1.5 p-1 bg-white/85 backdrop-blur-md rounded-xl border border-stone-200/80 shadow-xs text-[11px] text-stone-700"
      >
        <span className="flex items-center gap-1 px-2 py-0.5 text-stone-500 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#0F4C81]" />
          <span>{lang === 'ar' ? 'خزف تفاعلي' : 'Faïence Animée'}</span>
        </span>

        {/* Opacity Selector */}
        <div className="flex items-center gap-0.5 bg-stone-100/90 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setCurrentOpacity('subtle')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              currentOpacity === 'subtle'
                ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
            title={lang === 'ar' ? 'خلفية هادئة' : 'Effet Doux'}
          >
            {lang === 'ar' ? 'خفيف' : 'Doux'}
          </button>
          <button
            type="button"
            onClick={() => setCurrentOpacity('medium')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              currentOpacity === 'medium'
                ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
            title={lang === 'ar' ? 'خلفية متوازنة' : 'Effet Moyen'}
          >
            {lang === 'ar' ? 'متوازن' : 'Moyen'}
          </button>
          <button
            type="button"
            onClick={() => setCurrentOpacity('vivid')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              currentOpacity === 'vivid'
                ? 'bg-[#0F4C81] text-white font-semibold shadow-2xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
            title={lang === 'ar' ? 'خلفية واضحة وحيوية' : 'Effet Éclatant'}
          >
            {lang === 'ar' ? 'حيوي' : 'Vif'}
          </button>
        </div>

        {/* Sunlight Preset Toggle */}
        <button
          type="button"
          onClick={() => setLightPreset((prev) => (prev === 'noon' ? 'golden' : 'noon'))}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors cursor-pointer ${
            lightPreset === 'golden'
              ? 'bg-amber-100/80 text-amber-900 font-medium'
              : 'hover:bg-stone-100 text-stone-600'
          }`}
          title={lang === 'ar' ? 'تغيير إضاءة الشمس' : 'Changer l’éclairage'}
        >
          <Sun className="w-3 h-3 text-amber-600" />
          <span>{lightPreset === 'golden' ? (lang === 'ar' ? 'غروب' : 'Doré') : (lang === 'ar' ? 'ظهيرة' : 'Zénith')}</span>
        </button>
      </div>
    </div>
  );
};
