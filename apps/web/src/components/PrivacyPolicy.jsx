import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const PrivacyPolicy = ({ onBack }) => {
  const { t } = useLanguage();
  const m = t.legal;
  const p = m.privacy;
  useEffect(() => {
    document.title = `${m.privacyTitle} - TW Coaching`;
    return () => { document.title = 'TW Coaching — Coaching premium à Genève'; };
  }, [m.privacyTitle]);
  return (
    <>
      <div className="min-h-screen tw-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-[#8FBE3C] font-semibold mb-10 hover:underline"
          >
            <ArrowLeft size={18} /> {m.back}
          </button>

          <h1 className="text-4xl font-extrabold tracking-tight">{m.privacyTitle}</h1>
          <p className="mt-2 text-sm text-gray-400">{m.updated}</p>

          <div className="mt-10 space-y-8 text-gray-300 leading-relaxed">
            <section>
              <p>{p.intro}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">{p.s1Title}</h2>
              <p className="mt-3">{p.s1Body}</p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                {p.s1List.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">{p.s2Title}</h2>
              <p className="mt-3">{p.s2Body}</p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                {p.s2List.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">{p.s3Title}</h2>
              <p className="mt-3">{p.s3Body}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">{p.s4Title}</h2>
              <p className="mt-3">{p.s4Body}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">{p.s5Title}</h2>
              <p className="mt-3">{p.s5Body}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">{p.s6Title}</h2>
              <p className="mt-3">{p.s6Body}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">{p.s7Title}</h2>
              <p className="mt-3">{p.s7Body}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">{p.s8Title}</h2>
              <p className="mt-3">{p.s8Body}</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
