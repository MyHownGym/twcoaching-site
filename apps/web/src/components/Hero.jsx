import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Activity, Expand as Stretch } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -24
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};
const fadeRight = {
  hidden: {
    opacity: 0,
    x: 24
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};
const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};
const Hero = () => {
  const { t } = useLanguage();
  return <section id="top" className="relative w-full min-h-[640px] h-auto flex flex-col items-center justify-center overflow-hidden py-16 md:min-h-[calc(100dvh-2.5rem)] md:h-auto md:py-0 scroll-mt-28">
      <div className="absolute top-6 left-4 sm:top-8 sm:left-6 lg:left-8 z-20 flex flex-col gap-0.5 sm:flex-row sm:items-center sm:space-x-3 text-white">
        <div className="flex items-center space-x-2 sm:space-x-0">
          <img src="https://horizons-cdn.hostinger.com/2da5f73c-729e-495b-a66c-e874b8773a9a/08a0d64b63123ec4714bc84f67a7a078.png" alt="Logo TW Coaching" className="h-12 w-12 sm:h-16 sm:w-16 object-contain rounded-[10px] border border-white/25" />
          <svg viewBox="0 0 32 32" className="h-5 w-5 sm:hidden rounded-[3px] shadow-sm flex-shrink-0" aria-label="Coach suisse" role="img">
            <rect width="32" height="32" rx="3" fill="#DA291C" />
            <rect x="13" y="6" width="6" height="20" fill="#fff" />
            <rect x="6" y="13" width="20" height="6" fill="#fff" />
          </svg>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="text-base sm:text-3xl font-bold whitespace-nowrap leading-none">TW Coaching</span>
          <svg viewBox="0 0 32 32" className="hidden sm:block h-7 w-7 rounded-[3px] shadow-sm flex-shrink-0" aria-label="Coach suisse" role="img">
            <rect width="32" height="32" rx="3" fill="#DA291C" />
            <rect x="13" y="6" width="6" height="20" fill="#fff" />
            <rect x="6" y="13" width="20" height="6" fill="#fff" />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0">
        <img src="https://horizons-cdn.hostinger.com/2da5f73c-729e-495b-a66c-e874b8773a9a/img_7197-X6v4i.JPG" alt="Athlete working out with dumbbells on a rooftop at sunset" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24 md:pt-0" initial="hidden" animate="visible" variants={stagger}>
        <motion.div className="max-w-lg" variants={fadeLeft}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mt-10">{t.hero.title}</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-md">{t.hero.subtitle}</p>
          <div className="mt-8">
            <a href="https://calendly.com/tw_coaching" target="_blank" rel="noopener noreferrer" className="inline-block py-4 px-8 text-lg font-semibold rounded-full bg-[#8FBE3C] tw-lime-grad text-black hover:bg-[#8FBE3C]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              {t.hero.cta}
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <a href="#avis" className="flex -space-x-4 group/avatars" aria-label="Voir les avis clients">
              <img className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover transition-transform duration-300 group-hover/avatars:scale-105" alt="Client satisfait 1" src="https://images.hostinger.com/9d9a5740-054d-4776-b08c-905377222e87.png" />
              <img className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover transition-transform duration-300 group-hover/avatars:scale-105" alt="Cliente satisfaite 2" src="https://images.hostinger.com/b625d7cb-5396-4dc0-9d49-95d6ac3f0212.png" />
              <img className="w-12 h-12 rounded-full border-2 border-purple-400 object-cover transition-transform duration-300 group-hover/avatars:scale-105" alt="Client satisfait 3" src="https://images.hostinger.com/ae986b1d-6ad5-41cf-9a6d-0691632f92d4.png" />
              <img className="w-12 h-12 rounded-full border-2 border-red-400 object-cover transition-transform duration-300 group-hover/avatars:scale-105" alt="Cliente satisfaite 4" src="https://images.hostinger.com/f2270240-3ec0-42b5-a59c-be5f337bce36.png" />
              <img className="w-12 h-12 rounded-full border-2 border-teal-400 object-cover transition-transform duration-300 group-hover/avatars:scale-105" alt="Client satisfait 5" src="https://images.hostinger.com/76193c20-5dd8-485e-b6ef-186526562cef.png" />
            </a>
            <div>
              <p className="font-bold text-white text-lg">{t.hero.clientsCount}</p>
              <p className="text-sm text-gray-300">{t.hero.clientsLabel}</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="flex flex-col gap-4 justify-center mt-8 md:mt-0" variants={fadeRight}>
          <motion.a href="#about" className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center text-left transition-all duration-300 hover:bg-white/20" variants={fadeUp}>
            <Dumbbell size={32} className="text-[#8FBE3C] mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white">{t.hero.aboutTitle}</h3>
              <p className="text-gray-300 text-sm">{t.hero.aboutDesc}</p>
            </div>
          </motion.a>
          <motion.a href="#abonnements" className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center text-left transition-all duration-300 hover:bg-white/20" variants={fadeUp}>
            <Activity size={32} className="text-[#8FBE3C] mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white">{t.hero.plansTitle}</h3>
              <p className="text-gray-300 text-sm">{t.hero.plansDesc}</p>
            </div>
          </motion.a>
          <motion.a href="#salles" className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center text-left transition-all duration-300 hover:bg-white/20" variants={fadeUp}>
            <Stretch size={32} className="text-[#8FBE3C] mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white">{t.hero.roomsTitle}</h3>
              <p className="text-gray-300 text-sm">{t.hero.roomsDesc}</p>
            </div>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>;
};
export default Hero;