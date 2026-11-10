import React from 'react';
import { useLanguage } from '@/components/LanguageContext';

const OPTIONS = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
];

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label={lang === 'fr' ? 'Choisir la langue' : 'Choose language'}
      className="flex h-9 items-center rounded-full border border-[#101812]/10 bg-[#f3f6ef] p-0.5 sm:h-10"
    >
      {OPTIONS.map((option) => {
        const active = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            aria-label={option.label}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FBE3C] sm:h-9 sm:w-9 sm:text-xs ${
              active
                ? 'bg-[#8FBE3C] tw-lime-grad text-[#101812]'
                : 'text-[#101812]/45 hover:text-[#101812]'
            }`}
          >
            {option.code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
