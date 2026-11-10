import React from 'react';
import { Star, Quote } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/components/LanguageContext';

const TestimonialCard = ({ name, text }) => (
  <div className="flex-shrink-0 w-[300px] sm:w-[360px] mx-3 sm:mx-4 rounded-2xl bg-gray-100 border border-gray-200 p-6">
    <Quote className="h-7 w-7 text-[#8FBE3C] mb-3" strokeWidth={1.5} />
    <p className="text-gray-900 text-sm sm:text-base leading-relaxed">"{text}"</p>
    <div className="mt-4 flex items-center justify-between">
      <span className="font-semibold text-black">{name}</span>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[#8FBE3C] text-[#8FBE3C]" strokeWidth={1.5} />
        ))}
      </div>
    </div>
  </div>
);

const LogoCloud = () => {
  const { t } = useLanguage();
  // Two identical copies so the CSS marquee (translateX 0 -> -50%) loops seamlessly.
  const loop = [...t.testimonials, ...t.testimonials];

  return (
    <section id="avis" className="py-16 bg-white sm:py-20 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="text-center">
          <h2 className="text-2xl font-bold text-black sm:text-3xl">
            {t.logoCloud.heading}
            <span style={{ color: 'rgb(143, 190, 60)' }}>{t.logoCloud.highlight}</span>
          </h2>

          <div className="mt-6 inline-flex flex-col items-center">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-7 w-7 fill-[#8FBE3C] text-[#8FBE3C]" strokeWidth={1.5} />
              ))}
            </div>
            <p className="mt-3 text-lg font-semibold text-black">
              <span className="text-[#8FBE3C]">5,0</span> / 5 — {t.logoCloud.rating}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 relative overflow-hidden">
        <div className="flex w-max animate-marquee will-change-transform">
          {loop.map((tt, i) => (
            <TestimonialCard key={i} name={tt.name} text={tt.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
