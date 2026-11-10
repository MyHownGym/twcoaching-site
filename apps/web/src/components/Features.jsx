import React from 'react';
import { CheckCircle, TrendingUp } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/components/LanguageContext';

const SwissCross = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <rect x="8.5" y="2" width="7" height="20" fill="currentColor" />
    <rect x="2" y="8.5" width="20" height="7" fill="currentColor" />
  </svg>
);

const renderIcon = (index) => {
  if (index === 0) return <CheckCircle className="h-8 w-8 text-[#8FBE3C]" />;
  if (index === 2) return <SwissCross className="h-8 w-8 text-[#8FBE3C]" />;
  return <TrendingUp className="h-8 w-8 text-[#8FBE3C]" />;
};

const directions = ['left', 'up', 'right'];

const Features = () => {
  const { t } = useLanguage();
  return <section id="about" className="bg-[#0C0C0C] py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="max-w-2xl lg:max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.features.heading}<span className="text-[#8FBE3C]">{t.features.highlight}</span>{t.features.headingSuffix}</h2>
          <p className="mt-4 text-lg text-gray-400">{t.features.subtitle}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {t.features.items.map((feature, index) => {
            const Tag = index === 1 ? 'a' : 'div';
            return (
              <Reveal key={index} direction={directions[index]} delay={index * 0.1} className="h-full">
                <Tag href={index === 1 ? '#salles' : undefined} className="relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 flex flex-col items-start text-left h-full transition-all duration-300 hover:border-[#8FBE3C]/50 hover:bg-gray-900/80">
                  <div className="absolute top-0 left-0 -mt-4 -ml-4 h-16 w-16 flex items-center justify-center rounded-full bg-[#8FBE3C] text-black text-2xl font-bold shadow-md">
                    {feature.number}
                  </div>
                  <div className="mt-8">
                    {renderIcon(index)}
                    <h3 className="text-xl font-bold text-white mt-3">{feature.title}</h3>
                    <p className="mt-2 text-gray-300">{feature.description}</p>
                  </div>
                </Tag>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>;
};
export default Features;
