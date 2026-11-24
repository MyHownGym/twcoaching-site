import React from 'react';
import { Check, Smartphone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/components/LanguageContext';

const COPY = {
  fr: {
    eyebrow: 'Programme · coaching online',
    heading: 'Un programme ',
    highlight: '100 % personnalisé',
    subtitle: 'Un programme créé après un questionnaire préalable, livré via l’application Ekklo et adapté à votre emploi du temps, votre équipement et vos objectifs.',
    imageAlt: 'Téléphone tenu en main affichant le programme d’entraînement personnalisé dans Ekklo',
    principle: 'Le principe',
    title: 'Votre plan, dans votre poche.',
    body: 'Le questionnaire pose le cadre. Ekklo livre ensuite chaque séance : photos, vidéos, repos et charges. Vous vous entraînez à la maison ou en salle, et j’ajuste à partir de ce que vous avez réellement fait.',
    from: 'À partir de',
    unit: 'CHF / mois',
    note: '1 jour d’entraînement inclus, +CHF 10 par jour supplémentaire',
    includesTitle: 'Inclus dans le programme',
    includes: [
      'Photos et vidéos de chaque exercice',
      'Temps de repos et charges détaillés',
      'Suivi des exercices effectués directement dans l’app',
      'Données transmises au coach pour ajustements',
      'Compatible iOS et Android',
      'Adaptable à la maison ou en salle',
    ],
    book: 'Réserver',
    contact: 'WhatsApp',
  },
  en: {
    eyebrow: 'Programme · online coaching',
    heading: 'A ',
    highlight: '100% personalised programme',
    subtitle: 'A programme created after a preliminary questionnaire, delivered via the Ekklo app and adapted to your schedule, equipment and goals.',
    imageAlt: 'Hand holding a phone showing the personalised workout programme in Ekklo',
    principle: 'The idea',
    title: 'Your plan, in your pocket.',
    body: 'The questionnaire sets the frame. Ekklo then delivers each session: photos, videos, rest and loads. You train at home or in a gym, and I adjust from what you actually completed.',
    from: 'From',
    unit: 'CHF / month',
    note: '1 training day included, +CHF 10 per extra day',
    includesTitle: 'Included in the programme',
    includes: [
      'Photos and videos of each exercise',
      'Detailed rest times and loads',
      'Track completed exercises directly in the app',
      'Data sent to the coach for adjustments',
      'iOS and Android compatible',
      'Adaptable at home or in a gym',
    ],
    book: 'Book',
    contact: 'WhatsApp',
  },
};

const Programme = () => {
  const { lang } = useLanguage();
  const c = COPY[lang] ?? COPY.fr;

  return (
    <section id="programme" className="tw-dark py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="max-w-2xl lg:max-w-4xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8FBE3C]">{c.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {c.heading}<span className="text-[#8FBE3C]">{c.highlight}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">{c.subtitle}</p>
        </Reveal>

        <Reveal direction="up">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr_1.1fr] items-stretch">
            <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/50">
              <img loading="lazy" src="/images/app-ekklo.webp" alt={c.imageAlt} className="h-full max-h-[520px] w-full object-cover lg:max-h-none" />
            </div>

            <div className="flex flex-col justify-center rounded-3xl border border-gray-800 bg-gray-900/50 p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8FBE3C]/15 text-[#8FBE3C]">
                <Smartphone className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#8FBE3C]">{c.principle}</p>
              <h3 className="mt-2 text-2xl font-bold text-white">{c.title}</h3>
              <p className="mt-4 leading-relaxed text-gray-400">{c.body}</p>
            </div>

            <div className="flex flex-col rounded-3xl bg-white p-8 text-[#101812]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4A6D17]">{c.from}</p>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight">49.90</span>
                <span className="text-base font-semibold text-gray-600">{c.unit}</span>
              </p>
              <p className="mt-2 text-sm text-gray-600">{c.note}</p>
              <p className="mt-6 text-sm font-bold">{c.includesTitle}</p>
              <ul className="mt-3 space-y-2.5">
                {c.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-800">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#8FBE3C]/20">
                      <Check className="h-3.5 w-3.5 text-[#1a1a1a]" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <a href="https://calendly.com/tw_coaching" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#8FBE3C] tw-lime-grad px-6 font-bold text-[#101812]">
                  {c.book}
                </a>
                <a href="https://wa.me/41764580827" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-[#101812] px-6 font-bold text-[#101812] hover:bg-[#101812] hover:text-white">
                  {c.contact}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Programme;
