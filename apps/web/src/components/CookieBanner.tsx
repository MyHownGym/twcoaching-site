import { useCookieBanner } from '@/hooks/use-cookie-banner';
import { useLanguage } from '@/components/LanguageContext';

type CookieCopy = {
  necessary: string;
  necessaryDesc: string;
  learnMore: string;
  title: string;
  body: string;
  accept: string;
  reject: string;
  customize: string;
  save: string;
  analytics: string;
  analyticsDesc: string;
  marketing: string;
  marketingDesc: string;
  platform: string;
  platformDesc: string;
};

export function CookieBanner() {
  const banner = useCookieBanner();
  const { t } = useLanguage() as { t: { cookies: CookieCopy } };

  if (!banner.isOpen) return null;

  const categories = [
    { key: 'analytics' as const, title: t.cookies.analytics, desc: t.cookies.analyticsDesc },
  ];

  return (
    <section
      role="dialog"
      aria-label={t.cookies.title}
      className="fixed inset-x-3 bottom-24 z-[70] mx-auto max-w-lg rounded-[1.4rem] border border-[#d5e3c4] bg-white p-4 text-[#101812] shadow-[0_16px_40px_rgba(16,24,18,0.22)]"
    >
      <p className="text-sm font-bold">{t.cookies.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-[#101812]/75">
        {t.cookies.body}{' '}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('tw:open-legal', { detail: 'privacy' }))}
          className="font-semibold text-[#4A6D17] underline underline-offset-2"
        >
          {t.cookies.learnMore}
        </button>
      </p>

      {banner.isCustomizing ? (
        <fieldset className="mt-3 space-y-2 border-0 p-0">
          <legend className="sr-only">{t.cookies.customize}</legend>
          <label className="flex items-start gap-3 rounded-xl bg-[#f4f7f1] px-3 py-2">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-[#8FBE3C]" checked disabled />
            <span>
              <span className="block text-sm font-semibold">{t.cookies.necessary}</span>
              <span className="block text-xs leading-relaxed text-[#101812]/70">{t.cookies.necessaryDesc}</span>
            </span>
          </label>
          {categories.map((category) => (
            <label key={category.key} className="flex items-start gap-3 rounded-xl bg-[#f4f7f1] px-3 py-2">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#8FBE3C]"
                checked={banner.choices[category.key]}
                onChange={(event) => banner.setChoice(category.key, event.target.checked)}
              />
              <span>
                <span className="block text-sm font-semibold">{category.title}</span>
                <span className="block text-xs leading-relaxed text-[#101812]/70">{category.desc}</span>
              </span>
            </label>
          ))}
        </fieldset>
      ) : null}

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={banner.rejectOptional}
          className="min-h-11 rounded-full border border-[#101812] px-3 text-sm font-semibold text-[#101812] transition-colors hover:bg-[#101812] hover:text-white"
        >
          {t.cookies.reject}
        </button>
        {banner.isCustomizing ? (
          <button
            type="button"
            onClick={banner.saveChoices}
            className="min-h-11 rounded-full border border-[#101812]/15 bg-[#f4f7f1] px-3 text-sm font-semibold text-[#101812]"
          >
            {t.cookies.save}
          </button>
        ) : (
          <button
            type="button"
            onClick={banner.customize}
            className="min-h-11 rounded-full border border-[#101812]/15 bg-[#f4f7f1] px-3 text-sm font-semibold text-[#101812]"
          >
            {t.cookies.customize}
          </button>
        )}
        <button
          type="button"
          onClick={banner.acceptAll}
          className="col-span-2 min-h-11 rounded-full bg-[#8FBE3C] tw-lime-grad px-3 text-sm font-semibold text-[#101812] transition-colors hover:bg-[#7eae32] sm:col-span-1"
        >
          {t.cookies.accept}
        </button>
      </div>
    </section>
  );
}
