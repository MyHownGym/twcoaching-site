import React, { useState, useEffect, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ExternalLink } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/components/LanguageContext';
const trainers = [{
  name: 'Gym Room',
  specialty: 'Versoix',
  imageAlt: 'Salle Gym Room à Versoix',
  imageUrl: 'https://horizons-cdn.hostinger.com/2da5f73c-729e-495b-a66c-e874b8773a9a/img_5486-zudv3.jpeg',
  website: 'https://www.gym-room.ch/'
}, {
  name: 'Fitness Campus',
  specialty: 'Lancy',
  imageAlt: 'Salle Fitness Campus à Lancy',
  imageUrl: 'https://horizons-cdn.hostinger.com/2da5f73c-729e-495b-a66c-e874b8773a9a/fitness-campus-A2gdX.webp',
  website: 'https://fitnesscampus.com/',
  comingSoon: true
}, {
  name: 'Coach Room',
  specialty: 'Genève',
  imageAlt: 'Salle Coach Room à Genève',
  imageUrl: 'https://horizons-cdn.hostinger.com/2da5f73c-729e-495b-a66c-e874b8773a9a/coachroom-o6Lnr.jpg',
  website: 'https://coachroom.ch/'
}, {
  name: 'À domicile',
  specialty: 'Chez vous',
  imageAlt: 'Home gym privé avec rack, banc et haltères pour le coaching à domicile',
  imageUrl: '/images/coaching-domicile.webp',
  website: null
}];
const Trainers = () => {
  const { t } = useLanguage();
  const [api, setApi] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const autoplay = useCallback(() => {
    if (!api) return;
    if (api.canScrollNext()) {
      api.scrollNext();
    } else {
      api.scrollTo(0);
    }
  }, [api]);

  useEffect(() => {
    if (!api || !isMobile) return;
    const id = setInterval(autoplay, 3500);
    return () => clearInterval(id);
  }, [api, isMobile, autoplay]);

  return <section id="salles" className="tw-dark py-20 sm:py-32">
      <div className="mx-auto w-full px-3 sm:px-5">
        <Reveal direction="up" className="max-w-2xl lg:max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.trainers.heading}<span className="text-[#8FBE3C]">{t.trainers.highlight}</span></h2>
          <p className="mt-4 text-lg text-gray-400">
            {t.trainers.subtitle}
          </p>
        </Reveal>

        <Reveal direction="right">
          <Carousel opts={{
          align: 'start',
          loop: true
        }} setApi={setApi} className="w-full">
            <CarouselContent>
              {trainers.map((trainer, index) => {
              const cardInner = <div className="group relative flex flex-col h-full bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden p-6 transition-all">
                    <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[4/5]">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={trainer.imageAlt} src={trainer.imageUrl} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      {trainer.comingSoon && <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase text-center px-4">Coming Soon</span>
                        </div>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                        <p className="text-[#8FBE3C] font-semibold">{trainer.specialty}</p>
                      </div>
                      {trainer.website && <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-[#8FBE3C] transition-colors" />}
                    </div>
                  </div>;
              return <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                    <div className="p-1 h-full">
                      {trainer.website ? <a href={trainer.website} target="_blank" rel="noopener noreferrer" className="block h-full">
                          {cardInner}
                        </a> : cardInner}
                    </div>
                  </CarouselItem>;
            })}
            </CarouselContent>
            <CarouselPrevious className="text-white bg-gray-800 hover:bg-[#8FBE3C] hover:text-black border-gray-700 md:hidden" />
            <CarouselNext className="text-white bg-gray-800 hover:bg-[#8FBE3C] hover:text-black border-gray-700 md:hidden" />
          </Carousel>
        </Reveal>
      </div>
    </section>;
};
export default Trainers;
