import React from 'react';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/components/LanguageContext';
const CallToAction = () => {
  const { t } = useLanguage();
  return <section id="contact" className="tw-dark py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <Reveal direction="left" className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {t.cta.title}<span className="text-[#8FBE3C]">{t.cta.highlight}</span>
              </h2>
              <p className="mt-4 text-lg text-gray-300">{t.cta.subtitle}</p>
              <div className="mt-8">
                <a href="https://calendly.com/tw_coaching" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 text-lg font-semibold rounded-full bg-[#8FBE3C] tw-lime-grad text-black hover:bg-[#8FBE3C]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  {t.cta.button}
                </a>
              </div>
            </Reveal>

            <Reveal direction="right" className="relative mt-8 lg:mt-0 lg:w-1/2 flex justify-center items-center py-0 lg:py-0">
              <div className="w-full max-w-lg h-80 rounded-xl overflow-hidden shadow-2xl group">
                <img className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" alt="Man lifting weights" src="https://horizons-cdn.hostinger.com/2da5f73c-729e-495b-a66c-e874b8773a9a/img_7197-sNRU0.JPG" />
              </div>
            </Reveal>
          </div>

          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#8FBE3C] tw-lime-grad rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1E04FB] rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>;
};
export default CallToAction;
