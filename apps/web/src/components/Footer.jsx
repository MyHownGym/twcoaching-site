import React from 'react';
import { Instagram, MessageCircle, Mail } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { openCookiePreferences } from '@/lib/cookie-consent';

const Footer = ({ onLegal }) => {
  const { t } = useLanguage();
  return (
    <footer className="tw-dark border-t border-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-white">
          <img
            src="/images/logo-tw.png"
            alt="Logo TW Coaching"
            className="h-9 w-9 object-contain"
          />
          <span className="text-lg font-bold">TW Coaching</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <button onClick={() => onLegal('mentions')} className="hover:text-[#8FBE3C] transition-colors">
            {t.footer.legal}
          </button>
          <button onClick={() => onLegal('privacy')} className="hover:text-[#8FBE3C] transition-colors">
            {t.footer.privacy}
          </button>
          <button type="button" onClick={() => openCookiePreferences()} className="hover:text-[#8FBE3C] transition-colors">
            {t.footer.cookies}
          </button>
          <a
            href="https://wa.me/41764580827"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex items-center justify-center hover:text-[#8FBE3C] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <a
            href="mailto:info@twcoaching.ch"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="inline-flex items-center justify-center hover:text-[#8FBE3C] transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/tw.coaching_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center justify-center hover:text-[#8FBE3C] transition-colors"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>

        <p className="text-xs text-gray-500">© {new Date().getFullYear()} TW Coaching</p>
      </div>
    </footer>
  );
};

export default Footer;
