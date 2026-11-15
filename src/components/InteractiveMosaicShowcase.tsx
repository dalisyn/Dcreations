import React, { useState, useRef } from 'react';
import { Sparkles, RotateCw, Shuffle, Eye, Layers } from 'lucide-react';
import { Language } from '../data/translations';
import { TILE_TEXTURE_URL } from './InteractiveTileBackground';

interface InteractiveMosaicShowcaseProps {
  lang: Language;
}

interface TileData {
  id: number;
  nameFr: string;
  nameAr: string;
  originFr: string;
  originAr: string;
  // Position coordinates in the 3x2 image grid: (col: 0, 1, 2; row: 0, 1)
  bgX: number; // percentage
  bgY: number; // percentage
  rotation: number;
}

const INITIAL_TILES: TileData[] = [
  {
    id: 1,
    nameFr: 'Arabesque Fleur d’Oranger',
    nameAr: 'زخرفة زهر البرتقال الأندلسية',
    originFr: 'Motif classique de Nabeul au cobalt profond',
    originAr: 'نقش نابل الكلاسيكي بلون أزرق كوبالت ناصع',
    bgX: 0,
    bgY: 0,
    rotation: 0,
  },
  {
    id: 2,
    nameFr: 'Étoile Bleue & Ocre Doré',
    nameAr: 'نجمة زرقاء وذهبية مورقة',
    originFr: 'Émaux minéraux cuits au four traditionnel',
    originAr: 'مطلية بأكاسيد معدنية مفخورة في أفران تقليدية',
    bgX: 50,
    bgY: 0,
    rotation: 0,
  },
  {
    id: 3,
    nameFr: 'Rosace Royale Méditerranéenne',
    nameAr: 'وردة ملكية متوسطية',
    originFr: 'Faïence inspirée des palais de La Marsa',
    originAr: 'خزف مستوحى من قصور ضواحي تونس العاصمة',
    bgX: 100,
    bgY: 0,
    rotation: 0,
  },
  {
    id: 4,
    nameFr: 'Damier Arabesque Sidi Bou Saïd',
    nameAr: 'دمقس سيدي بوسعيد الأزرق',
    originFr: 'Motif géométrique des portes cloutées',
    originAr: 'شكل هندسي مستوحى من الأبواب العتيقة الزرقاء',
    bgX: 0,
    bgY: 100,
    rotation: 0,
  },
  {
    id: 5,
    nameFr: 'Trèfle en Faïence Émaillée',
    nameAr: 'بتلات الخزف الرباعية',
    originFr: 'Harmonie de blanc laiteux et bleu azur',
    originAr: 'تناسق فريد بين الأبيض الحليبي والأزرق اللازوردي',
    bgX: 50,
    bgY: 100,
    rotation: 0,
  },
  {
    id: 6,
    nameFr: 'Moucharabieh Étoilé',
    nameAr: 'مشربية نجمية زرقاء',
    originFr: 'Dentelle céramique aux reflets brillants',
    originAr: 'نقوش دقيقة تشبه المشربيات التونسية',
    bgX: 100,
    bgY: 100,
    rotation: 0,
  },
];

export const InteractiveMosaicShowcase: React.FC<InteractiveMosaicShowcaseProps> = ({ lang }) => {
  const [tiles, setTiles] = useState<TileData[]>(INITIAL_TILES);
  const [activeTileId, setActiveTileId] = useState<number | null>(null);
  const [hoveredTileId, setHoveredTileId] = useState<number | null>(null);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Rotate a single tile on click
  const handleTileClick = (id: number) => {
    setTiles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, rotation: (t.rotation + 90) % 360 } : t))
    );
    setActiveTileId(id);
  };

  // Shuffle tile order for playful layout customization
  const handleShuffle = () => {
    setTiles((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  // Reset tile rotations
  const handleReset = () => {
    setTiles(INITIAL_TILES);
  };

  const handleTileMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
    setHoveredTileId(id);
  };

  const handleTileMouseLeave = () => {
    setHoveredTileId(null);
    setMouseOffset({ x: 0, y: 0 });
  };

  const activeTile = tiles.find((t) => t.id === activeTileId) || tiles[0];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-lg p-5 sm:p-6 transition-all">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-200/70">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F4C81] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تركيب الفسيفساء التفاعلي' : 'Atelier Mosaïque Interactif'}</span>
          </div>
          <h3 className="font-serif text-lg font-semibold text-stone-900 mt-0.5">
            {lang === 'ar' ? 'انقر على مربعات الخزف لتدويرها والتفاعل مع بريقها' : 'Composez et faites tourner vos carreaux de faïence'}
          </h3>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShuffle}
            className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            title={lang === 'ar' ? 'إعادة ترتيب عشوائي' : 'Mélanger les carreaux'}
          >
            <Shuffle className="w-3.5 h-3.5 text-stone-500" />
            <span>{lang === 'ar' ? 'خلط' : 'Mélanger'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            title={lang === 'ar' ? 'إعادة ضبط' : 'Réinitialiser'}
          >
            <RotateCw className="w-3.5 h-3.5 text-stone-500" />
            <span>{lang === 'ar' ? 'إعادة ضبط' : 'Réaligner'}</span>
          </button>
        </div>
      </div>

      {/* 3D Interactive Tiles Grid (3x2 on desktop, 3x2 on mobile) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 p-3 bg-stone-100/70 rounded-xl border border-stone-200/70">
        {tiles.map((tile) => {
          const isHovered = hoveredTileId === tile.id;
          const tiltX = isHovered ? -mouseOffset.y * 22 : 0;
          const tiltY = isHovered ? mouseOffset.x * 22 : 0;
          const scale = isHovered ? 1.05 : 1;

          return (
            <div
              key={tile.id}
              onClick={() => handleTileClick(tile.id)}
              onMouseMove={(e) => handleTileMouseMove(e, tile.id)}
              onMouseLeave={handleTileMouseLeave}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm transition-transform duration-200 ease-out select-none bg-stone-200 ring-1 ring-stone-300/80 hover:shadow-xl hover:ring-2 hover:ring-[#0F4C81]"
              style={{
                perspective: 600,
                transform: `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`,
              }}
            >
              {/* Tile Graphic from Master Mediterranean Sheet */}
              <div
                className="w-full h-full transition-transform duration-500 ease-out"
                style={{
                  backgroundImage: `url("${TILE_TEXTURE_URL}")`,
                  backgroundSize: '300% 200%',
                  backgroundPosition: `${tile.bgX}% ${tile.bgY}%`,
                  transform: `rotate(${tile.rotation}deg)`,
                }}
              />

              {/* Ceramic Glaze Specular Hotspot (Follows Cursor) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  opacity: isHovered ? 0.9 : 0.15,
                  background: isHovered
                    ? `radial-gradient(circle at ${(mouseOffset.x + 0.5) * 100}% ${(mouseOffset.y + 0.5) * 100}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`
                    : 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
                }}
              />

              {/* Click Hint / Rotate Badge */}
              <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/80 text-white rounded-md p-1 shadow-xs">
                <RotateCw className="w-3 h-3" />
              </div>

              {/* Subtle Mortar Edge bevel */}
              <div className="absolute inset-0 border border-white/40 pointer-events-none rounded-xl" />
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail Card for selected tile */}
      <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg shrink-0 shadow-2xs border border-stone-300"
            style={{
              backgroundImage: `url("${TILE_TEXTURE_URL}")`,
              backgroundSize: '300% 200%',
              backgroundPosition: `${activeTile.bgX}% ${activeTile.bgY}%`,
              transform: `rotate(${activeTile.rotation}deg)`,
            }}
          />
          <div>
            <span className="font-semibold text-stone-900 block font-serif text-sm">
              {lang === 'ar' ? activeTile.nameAr : activeTile.nameFr}
            </span>
            <span className="text-stone-500 text-[11px]">
              {lang === 'ar' ? activeTile.originAr : activeTile.originFr}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-[#0F4C81] font-medium sm:text-right shrink-0">
          <span>{lang === 'ar' ? 'انقر لتدوير 90 درجة' : 'Cliquez pour pivoter à 90°'}</span>
          <span className="block text-stone-400 font-mono text-[10px]">
            {activeTile.rotation}°
          </span>
        </div>
      </div>
    </div>
  );
};
