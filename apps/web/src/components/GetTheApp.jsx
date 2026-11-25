import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLanguage } from '@/components/LanguageContext';
import { APP_STORE_URL, PLAY_STORE_URL, openStore } from '@/lib/app-stores';

const LOGO_URL = '/images/logo-tw.png';

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true"><path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.17-1.53 2.65-.39 6.58 1.1 8.73.73 1.05 1.6 2.23 2.73 2.19 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.48zM14.2 6.13c.6-.73 1-1.74.9-2.75-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.07 1.96-.49 2.56-1.22z"/></svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path fill="#34A853" d="M3.6 2.3 13.4 12l-9.8 9.7c-.35-.2-.6-.6-.6-1.1V3.4c0-.5.25-.9.6-1.1z"/><path fill="#FBBC04" d="m16.7 15.3-3.3-3.3 3.3-3.3 3.7 2.1c.9.5.9 1.8 0 2.3z"/><path fill="#EA4335" d="M13.4 12 3.6 21.7c.3.2.8.2 1.2 0l11.9-6.4z"/><path fill="#4285F4" d="M13.4 12 16.7 8.7 4.8 2.3c-.4-.2-.9-.2-1.2 0z"/></svg>
);

export function StoreButtons({ className = '' }) {
  const { lang } = useLanguage();
  const pre = lang === 'en' ? ['Download on the', 'Get it on'] : ['Télécharger dans', 'Disponible sur'];
  const base = 'flex min-h-12 flex-1 items-center gap-3 rounded-xl bg-black px-4 py-2 text-white border border-white/25 hover:bg-[#171717]';
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={base}>
        <AppleIcon />
        <span className="leading-tight text-left"><span className="block text-[10px]">{pre[0]}</span><span className="block text-base font-semibold">App Store</span></span>
      </a>
      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={base}>
        <PlayIcon />
        <span className="leading-tight text-left"><span className="block text-[10px] uppercase">{pre[1]}</span><span className="block text-base font-semibold">Google Play</span></span>
      </a>
    </div>
  );
}

/** "Get the app": opens the right store on phones/tablets, both store buttons on desktop. */
export function useGetTheApp() {
  const [open, setOpen] = useState(false);
  const trigger = () => { if (!openStore()) setOpen(true); };
  return { open, setOpen, trigger };
}

export function StoresDialog({ open, setOpen }) {
  const { lang } = useLanguage();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md tw-dark border border-white/15 text-white rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{lang === 'en' ? 'Get the Ekklo app' : 'Télécharger l’app Ekklo'}</DialogTitle>
          <DialogDescription className="text-gray-300">
            {lang === 'en' ? 'Your programme, sessions and tracking, on iPhone and Android.' : 'Votre programme, vos séances et votre suivi, sur iPhone et Android.'}
          </DialogDescription>
        </DialogHeader>
        <StoreButtons className="mt-2" />
      </DialogContent>
    </Dialog>
  );
}

const GetTheApp = () => {
  const { t } = useLanguage();
  const app = useGetTheApp();
  return (
    <>
      <button
        type="button"
        onClick={app.trigger}
        className="fixed bottom-5 left-4 sm:left-[164px] z-40 flex h-12 items-center gap-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 pl-2 pr-4 text-white shadow-lg transition-colors duration-300 hover:bg-black/80"
      >
        <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl tw-dark border border-white/30">
          <img src={LOGO_URL} alt="" className="h-7 w-7 object-contain" />
        </span>
        <span className="text-sm font-semibold whitespace-nowrap">{t.getTheApp.button}</span>
      </button>
      <StoresDialog open={app.open} setOpen={app.setOpen} />
    </>
  );
};

export default GetTheApp;
