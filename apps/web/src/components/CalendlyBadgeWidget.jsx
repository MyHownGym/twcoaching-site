import React, { useEffect } from 'react';
import { CalendarDays } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/tw_coaching';

/** Loads Calendly's popup assets and provides a responsive booking button. */
const CalendlyBadgeWidget = () => {
  useEffect(() => {
    if (!document.querySelector('link[href*="assets.calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    if (!document.querySelector('script[src*="assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openBooking = () => {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget({
        url: `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=0b2540&primary_color=c6e000`,
      });
      return;
    }
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={openBooking}
      aria-label="Réserver avec Calendly"
      title="Réserver avec Calendly"
      className="calendly-booking-button"
    >
      <CalendarDays aria-hidden="true" className="calendly-booking-icon" />
      <span className="calendly-booking-label">Réserver</span>
    </button>
  );
};

export default CalendlyBadgeWidget;
