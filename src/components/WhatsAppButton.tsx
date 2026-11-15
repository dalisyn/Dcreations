import React from 'react';
import { Language } from '../data/translations';

interface WhatsAppButtonProps {
  lang: Language;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ lang }) => {
  const prefilledMessage =
    lang === 'ar'
      ? 'مرحباً ورشة D | Creations، أودّ الاستفسار عن طلب طاولة حسب الطلب.'
      : 'Bonjour D | Creations, je souhaite me renseigner pour commander une table sur mesure.';

  const whatsappUrl = `https://wa.me/21623559559?text=${encodeURIComponent(prefilledMessage)}`;
  const label = lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Atelier';
  const ariaLabel =
    lang === 'ar'
      ? 'تواصل معنا مباشرة عبر واتساب على الرقم 21623559559+'
      : 'Contacter l’atelier D Creations sur WhatsApp au +216 23 559 559';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      title="+216 23 559 559"
      className={`fixed bottom-4 sm:bottom-6 z-40 group flex items-center gap-2.5 bg-[#141413] hover:bg-[#128C7E] text-white border border-stone-700 hover:border-[#128C7E] shadow-xl transition-all duration-200 p-2.5 sm:px-4 sm:py-3 ${
        lang === 'ar' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
      }`}
    >
      {/* Official WhatsApp Mark */}
      <span className="w-6 h-6 bg-[#25D366] text-white flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-current"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.81 14.08c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.14.11-1.84-.11-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.18 1.03-2.48.27-.3.59-.38.79-.38.2 0 .39.01.56.01.18 0 .42-.07.66.5.24.59.83 2.03.9 2.18.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.31.31-.13.61.18.3.8 1.31 1.71 2.12 1.18 1.05 2.17 1.37 2.47 1.52.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.08.12.08.73-.16 1.41z" />
        </svg>
      </span>

      <div className="hidden sm:flex flex-col leading-tight">
        <span className="text-[11px] font-medium tracking-wide whitespace-nowrap">
          {label}
        </span>
        <span dir="ltr" className="text-[10px] font-mono text-stone-300 group-hover:text-white/90 tabular-nums">
          +216 23 559 559
        </span>
      </div>
    </a>
  );
};
