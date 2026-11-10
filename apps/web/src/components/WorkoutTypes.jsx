import React, { useState } from 'react';
import { Dumbbell, Check } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/components/LanguageContext';

const FeatureItem = ({ label, featured }) => {
  return (
    <div className="flex items-start gap-3 text-left min-h-[1.75rem]">
      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${featured ? 'bg-white/25' : 'bg-[#8FBE3C]/20'}`}>
        <Check className={`h-3.5 w-3.5 ${featured ? 'text-white' : 'text-[#1a1a1a]'}`} strokeWidth={3} />
      </span>
      <span className={`text-sm font-medium leading-snug ${featured ? 'text-white/90' : 'text-gray-800'}`}>{label}</span>
    </div>
  );
};

const DurationSwitch = ({ durations, active, onChange, featured }) => (
  <div
    className={`mt-3 inline-flex items-center rounded-full border overflow-hidden text-[11px] font-bold ${
      featured ? 'border-white/30 bg-white/10' : 'border-gray-200 bg-gray-100'
    }`}
    role="group"
  >
    {durations.map((d) => {
      const on = d.id === active;
      return (
        <button
          key={d.id}
          type="button"
          onClick={() => onChange(d.id)}
          className={`px-2.5 py-1.5 transition-colors ${
            on
              ? 'bg-[#8FBE3C] tw-lime-grad text-black'
              : featured
                ? 'text-white/80 hover:text-white'
                : 'text-gray-600 hover:text-black'
          }`}
        >
          {d.label}
        </button>
      );
    })}
  </div>
);

const directions = ['left', 'up', 'right'];
const DURATION_INDEX = { 1: 0, 3: 1, 6: 2 };

const chf = (n) => `CHF ${n}.–`;

// Same CHF reductions for coaching (CHF 150) and duo (CHF 180).
// Monthly discount = sessions × reference − monthly price.
const SUB_RULES = [
  { sessions: 4, monthlyOff: [80, 100, 120] },
  { sessions: 8, monthlyOff: [240, 280, 320] },
  { sessions: 12, monthlyOff: [480, 540, 600] },
];
const PACK_RULES = [
  { sessions: 5, perSessionOff: 10, valid: 2 },
  { sessions: 10, perSessionOff: 20, valid: 4 },
  { sessions: 20, perSessionOff: 30, valid: 6 },
];

const offerValue = (offer) => (offer === 'duo' ? 180 : 150);

const SubsCard = ({ category, index, copy, lang, sessionValue }) => {
  const [duration, setDuration] = useState('1');
  const durationIndex = DURATION_INDEX[duration];
  const months = Number(duration);

  const featured = index === 1;
  const price = category.prices[durationIndex];
  const base = category.prices[0];
  const saved = Math.round((1 - price / base) * 100);

  const totalSessions = category.sessions * months;
  const subFeatures = () => {
    const discount = totalSessions * sessionValue - price * months;
    const valuePhrase = copy.sessionValue.replace('150', String(sessionValue));
    const valueLine = lang === 'fr'
      ? `${totalSessions} ${valuePhrase} (${copy.discount} ${discount}.–)`
      : `${totalSessions} ${valuePhrase} (${copy.discount} ${discount}.– ${copy.discountSuffix})`;
    const validLabel = months === 1
      ? `${copy.features.valid} 1 ${copy.month}`
      : `${copy.features.valid} ${months} ${copy.months}`;
    return [
      valueLine,
      copy.features.app,
      category.whatsapp,
      copy.features.program,
      copy.features.adjust,
      validLabel,
    ];
  };

  return (
    <Reveal direction={directions[index]} delay={index * 0.1} className={`h-full ${featured ? 'order-first md:order-none' : ''}`}>
      <div className={`relative p-8 rounded-2xl border flex flex-col h-full transition-all duration-300 hover:shadow-md ${featured ? 'bg-[#52751D] tw-olive-grad border-[#52751D] shadow-lg ring-1 ring-[#8FBE3C]/50' : 'bg-white border-gray-200 shadow-sm'}`}>
        {featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[#8FBE3C] tw-lime-grad text-[#1a1a1a] text-sm font-bold uppercase tracking-wide whitespace-nowrap shadow-md ring-2 ring-white">
            {copy.bestSeller}
          </div>
        )}
        <div className="flex flex-col items-start text-left">
          <div className="mb-4 flex items-center justify-center gap-1">
            {Array.from({ length: index + 1 }).map((_, i) => (
              <Dumbbell key={i} className="h-8 w-8 text-[#8FBE3C]" />
            ))}
          </div>
          <h3 className={`text-xl font-bold ${featured ? 'text-white' : 'text-black'}`}>{category.title}</h3>
          <DurationSwitch
            durations={copy.durations}
            active={duration}
            onChange={setDuration}
            featured={featured}
          />
          <div className={`mt-4 text-3xl font-extrabold leading-none ${featured ? 'text-white' : 'text-[#8FBE3C]'}`}>
            {chf(price)}
            <span className={`ml-1 text-base font-semibold ${featured ? 'text-white/70' : 'text-gray-500'}`}>{copy.perMonth}</span>
          </div>
          <p className={`mt-2 text-sm ${featured ? 'text-white/70' : 'text-gray-500'}`}>
            {copy.commit} {months} {months === 1 ? copy.month : copy.months}
          </p>
          {saved > 0 && (
            <p className={`mt-1 text-sm font-semibold ${featured ? 'text-[#8FBE3C]' : 'text-[#52751D]'}`}>
              {copy.save} {saved} %
            </p>
          )}
          <p className={`mt-2 text-sm font-semibold ${featured ? 'text-white/90' : 'text-black'}`}>
            {copy.total}: {chf(price * months)} · {copy.payOnce}
          </p>
          <p className={`mt-3 min-h-[3rem] ${featured ? 'text-white/80' : 'text-gray-600'}`}>{category.description}</p>
        </div>

        <div className="w-full mt-6 mb-2 space-y-3">
          {subFeatures().map((item) => (
            <FeatureItem key={item} label={item} featured={featured} />
          ))}
        </div>

        <div className="mt-auto w-full pt-4">
          <a
            href="https://calendly.com/tw_coaching"
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center py-3 text-base font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${featured ? 'bg-white text-[#52751D] hover:bg-[#52751D] hover:text-white' : 'bg-[#8FBE3C] tw-lime-grad text-black hover:bg-black hover:text-[#8FBE3C]'}`}
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </Reveal>
  );
};

const WorkoutTypes = () => {
  const { t, lang } = useLanguage();
  const copy = t.workoutTypes;
  const [offer, setOffer] = useState('coaching');
  const [mode, setMode] = useState('subs');
  const sessionValue = offerValue(offer);
  const catalog = offer === 'duo' ? copy.duo : copy;

  const tiers = catalog.tiers.map((tier, index) => ({
    ...tier,
    sessions: SUB_RULES[index].sessions,
    prices: SUB_RULES[index].monthlyOff.map((off) => SUB_RULES[index].sessions * sessionValue - off),
  }));

  const packs = catalog.packs.map((pack, index) => {
    const rule = PACK_RULES[index];
    return {
      ...pack,
      sessions: rule.sessions,
      valid: rule.valid,
      perSession: sessionValue - rule.perSessionOff,
    };
  });

  const packFeatures = (pack) => {
    const discount = (sessionValue - pack.perSession) * pack.sessions;
    const valuePhrase = copy.sessionValue.replace('150', String(sessionValue));
    const valueLine = lang === 'fr'
      ? `${pack.sessions} ${valuePhrase} (${copy.discount} ${discount}.–)`
      : `${pack.sessions} ${valuePhrase} (${copy.discount} ${discount}.– ${copy.discountSuffix})`;
    const validUnit = pack.valid === 1 ? copy.month : copy.months;
    return [
      valueLine,
      copy.features.app,
      copy.features.program,
      copy.features.adjust,
      `${copy.features.valid} ${pack.valid} ${validUnit}`,
    ];
  };

  return (
    <section id="abonnements" className="bg-white py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="max-w-2xl lg:max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            {copy.heading}<span className="text-[#8FBE3C]">{copy.highlight}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {copy.subtitle}
          </p>
        </Reveal>

        <div className="flex flex-col items-center gap-3 mb-12">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 p-1 shadow-sm" role="group" aria-label={copy.modeCoaching}>
            {[
              { id: 'coaching', label: copy.modeCoaching },
              { id: 'duo', label: copy.modeDuo },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setOffer(item.id)}
                className={`px-5 py-2 text-sm font-bold rounded-full transition-colors ${
                  offer === item.id ? 'bg-[#52751D] tw-olive-grad text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 p-1 shadow-sm" role="group" aria-label={copy.modeSubs}>
            {[
              { id: 'subs', label: copy.modeSubs },
              { id: 'packs', label: copy.modePacks },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={`px-5 py-2 text-sm font-bold rounded-full transition-colors ${
                  mode === item.id ? 'bg-[#8FBE3C] tw-lime-grad text-black' : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
          {mode === 'subs' && tiers.map((category, index) => (
            <SubsCard key={`${offer}-${category.title}`} category={category} index={index} copy={copy} lang={lang} sessionValue={sessionValue} />
          ))}

          {mode === 'packs' && packs.map((pack, index) => {
            const featured = index === 1;
            const saved = Math.round((1 - pack.perSession / sessionValue) * 100);
            const mobileOrder = featured ? 'order-first md:order-none' : '';
            return (
              <Reveal key={`${offer}-${pack.title}`} direction={directions[index]} delay={index * 0.1} className={`h-full ${mobileOrder}`}>
                <div className={`relative p-8 rounded-2xl border flex flex-col h-full transition-all duration-300 hover:shadow-md ${featured ? 'bg-[#52751D] tw-olive-grad border-[#52751D] shadow-lg ring-1 ring-[#8FBE3C]/50' : 'bg-white border-gray-200 shadow-sm'}`}>
                  {featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[#8FBE3C] tw-lime-grad text-[#1a1a1a] text-sm font-bold uppercase tracking-wide whitespace-nowrap shadow-md ring-2 ring-white">
                      {copy.bestSeller}
                    </div>
                  )}
                  <div className="flex flex-col items-start text-left">
                    <div className="mb-4 flex items-center justify-center gap-1">
                      {Array.from({ length: index + 1 }).map((_, i) => (
                        <Dumbbell key={i} className="h-8 w-8 text-[#8FBE3C]" />
                      ))}
                    </div>
                    <h3 className={`text-xl font-bold ${featured ? 'text-white' : 'text-black'}`}>{pack.title}</h3>
                    <div className={`mt-4 text-3xl font-extrabold leading-none ${featured ? 'text-white' : 'text-[#8FBE3C]'}`}>
                      {chf(pack.perSession)}
                      <span className={`ml-1 text-base font-semibold ${featured ? 'text-white/70' : 'text-gray-500'}`}>{copy.perSession}</span>
                    </div>
                    <p className={`mt-2 text-sm font-semibold ${featured ? 'text-[#8FBE3C]' : 'text-[#52751D]'}`}>
                      {copy.save} {saved} %
                    </p>
                    <p className={`mt-2 text-sm font-semibold ${featured ? 'text-white/90' : 'text-black'}`}>
                      {copy.total}: {chf(pack.perSession * pack.sessions)} · {copy.payOnce}
                    </p>
                    <p className={`mt-3 min-h-[3rem] ${featured ? 'text-white/80' : 'text-gray-600'}`}>{pack.description}</p>
                  </div>

                  <div className="w-full mt-6 mb-2 space-y-3">
                    {packFeatures(pack).map((item) => (
                      <FeatureItem key={item} label={item} featured={featured} />
                    ))}
                  </div>

                  <div className="mt-auto w-full pt-4">
                    <a
                      href="https://calendly.com/tw_coaching"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center py-3 text-base font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${featured ? 'bg-white text-[#52751D] hover:bg-[#52751D] hover:text-white' : 'bg-[#8FBE3C] tw-lime-grad text-black hover:bg-black hover:text-[#8FBE3C]'}`}
                    >
                      {copy.cta}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkoutTypes;
