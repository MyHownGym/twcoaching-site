import React, { useState } from 'react';
import { Smartphone, Share, Plus, Chrome, MoreVertical, PlusSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useLanguage } from '@/components/LanguageContext';

const LOGO_URL = 'https://horizons-cdn.hostinger.com/2da5f73c-729e-495b-a66c-e874b8773a9a/08a0d64b63123ec4714bc84f67a7a078.png';

const GetTheApp = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating app-style button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Obtenir l'application"
        className="fixed bottom-5 left-4 z-40 flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 pl-2 pr-4 py-2 text-white shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-[1.03] active:scale-[0.98] sm:hidden"
      >
        <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl tw-dark border border-white/30">
          <img
            src={LOGO_URL}
            alt="TW Coaching"
            className="h-7 w-7 object-contain"
          />
        </span>
        <span className="text-sm font-semibold whitespace-nowrap">{t.getTheApp.button}</span>
      </button>

      {/* Explanation dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto tw-dark border border-white/15 text-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-[#8FBE3C]" />
              {t.getTheApp.dialogTitle}
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-sm">
              {t.getTheApp.dialogDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-5">
            {/* iPhone instructions */}
            <div>
              <h4 className="text-sm font-semibold text-[#8FBE3C] mb-2">{t.getTheApp.iphoneTitle}</h4>
              <ol className="space-y-2 text-sm text-gray-200">
                {t.getTheApp.iphoneSteps.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-bold text-gray-400 shrink-0">{i + 1}.</span>
                    <span>
                      {i === 1 ? <>{step} <Share className="h-4 w-4 inline-block align-text-bottom text-[#8FBE3C]" /></> : null}
                      {i === 2 ? <>{step} <Plus className="h-4 w-4 inline-block align-text-bottom text-[#8FBE3C]" /></> : null}
                      {i !== 1 && i !== 2 ? step : null}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Android instructions */}
            <div>
              <h4 className="text-sm font-semibold text-[#8FBE3C] mb-2">{t.getTheApp.androidTitle}</h4>
              <ol className="space-y-2 text-sm text-gray-200">
                {t.getTheApp.androidSteps.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-bold text-gray-400 shrink-0">{i + 1}.</span>
                    <span>
                      {i === 1 ? <>{step} <MoreVertical className="h-4 w-4 inline-block align-text-bottom text-[#8FBE3C]" /></> : null}
                      {i === 2 ? <>{step} <PlusSquare className="h-4 w-4 inline-block align-text-bottom text-[#8FBE3C]" /></> : null}
                      {i !== 1 && i !== 2 ? step : null}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-[#8FBE3C]/10 border border-[#8FBE3C]/30 p-3 text-xs text-gray-300">
              <Chrome className="h-4 w-4 text-[#8FBE3C] flex-shrink-0" />
              <span>{t.getTheApp.note}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GetTheApp;
