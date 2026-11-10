import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Revenir en haut de la page"
      className={`fixed bottom-5 right-[80px] sm:right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#8FBE3C] tw-lime-grad text-black shadow-lg transition-all duration-300 hover:bg-[#8FBE3C]/90 hover:shadow-xl active:scale-95 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTopButton;
