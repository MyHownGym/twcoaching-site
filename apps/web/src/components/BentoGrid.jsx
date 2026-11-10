import React from 'react';
import { cn } from '@/lib/utils';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/components/LanguageContext';
const BentoGrid = () => {
  const { t } = useLanguage();
  const Card = ({
    className,
    children
  }) => <div className={cn('relative group rounded-3xl p-6 flex flex-col justify-between', className)}>
      {children}
    </div>;
  return <section className="bg-white py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-[600px]">
          <Reveal direction="left" className="md:col-span-2 md:row-span-2 h-full">
            <Card className="h-full bg-gray-100 overflow-hidden border border-gray-200">
              <div className="flex flex-col h-full">
                <p className="text-sm font-semibold text-gray-500">{t.bento.label}</p>
                <h3 className="text-3xl font-bold text-black mt-2">{t.bento.title}</h3>
                <div className="flex-grow mt-4 relative overflow-hidden rounded-2xl">
                  <img className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105" alt="Groupe de personnes en séance de coaching" src="https://horizons-cdn.hostinger.com/2da5f73c-729e-495b-a66c-e874b8773a9a/img_7199-w7SJh.JPG" />
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal direction="right" className="h-full">
            <a href="#abonnements" className="relative group rounded-3xl p-6 flex flex-col justify-between bg-gray-100 text-black border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md h-full">
              <img className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-10 transition-opacity duration-300" alt="Texture abstraite" src="https://horizons-cdn.hostinger.com/2da5f73c-729e-495b-a66c-e874b8773a9a/a7405667-VJB8T.jpeg" />
              <div className="relative">
                <p className="text-sm font-semibold text-gray-500">{t.bento.brandLabel}</p>
                <h3 className="text-3xl font-bold mt-4 text-black">{t.bento.plansTitle}</h3>
              </div>
            </a>
          </Reveal>

          <div className="grid grid-cols-2 gap-6">
            <Reveal direction="left" className="h-full">
              <a href="#about" className="relative group rounded-3xl p-6 flex flex-col justify-between bg-[#673DE6] text-white transition-all duration-300 hover:opacity-90 h-full"><p className="text-xs font-bold uppercase tracking-widest opacity-70">{t.bento.discoverLabel}</p><h3 className="mt-auto text-2xl font-bold">{t.bento.aboutTitle}</h3></a>
            </Reveal>
            <Reveal direction="right" className="h-full">
              <a href="#contact" className="relative group rounded-3xl p-6 flex flex-col justify-between bg-[#8FBE3C] text-black transition-all duration-300 hover:opacity-90 h-full">
                <p className="text-xs font-bold uppercase tracking-widest">{t.bento.questionsLabel}</p>
                <h3 className="mt-auto text-2xl font-bold">{t.bento.contactTitle}</h3>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>;
};
export default BentoGrid;
