import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Instagram, Mail, Menu, MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useSlidingPill, pillCss } from '@/hooks/useSlidingPill';

const LOGO =
  '/images/logo-tw.png';

// Order matches the page flow (Hero → Reviews → About → Memberships → Gyms →
// Contact) so the active highlight progresses smoothly top-to-bottom instead
// of jumping backwards through the menu.
const LINKS = [
  { id: 'top', key: 'home' },
  { id: 'avis', key: 'reviews' },
  { id: 'about', key: 'about' },
  { id: 'abonnements', key: 'coaching' },
  { id: 'salles', key: 'rooms' },
  { id: 'contact', key: 'contact' },
];

const CONTACTS = [
  {
    href: 'https://wa.me/41764580827',
    label: 'WhatsApp',
    icon: MessageCircle,
  },
  {
    href: 'mailto:info@twcoaching.ch',
    label: 'Email',
    icon: Mail,
  },
  {
    href: 'https://www.instagram.com/tw.coaching_',
    label: 'Instagram',
    icon: Instagram,
  },
];

const SiteNav = () => {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState('top');
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  // While a nav click is smooth-scrolling, keep the clicked link highlighted
  // instead of letting the scroll-spy cycle through every section it passes.
  const scrollingTo = useRef(null);
  const scrollTimer = useRef(null);
  const desktopPill = useSlidingPill(active, [lang]);
  const mobilePill = useSlidingPill(active, [open, lang]);

  const update = useCallback(() => {
    const nodes = LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);
    if (!nodes.length) return;
    // Sections rest at `scroll-margin-top` (6.25rem = 100px) after a nav click,
    // so the activation line must clear that point — otherwise the section you
    // scrolled to reads as "below the line" and the link above it stays active
    // (the "stuck on À propos" bug).
    const navBottom = navRef.current?.getBoundingClientRect().bottom ?? 80;
    const line = Math.max(navBottom + 24, 120);
    // Iterate in real DOM order (top-to-bottom), not LINKS order, so a section
    // physically higher on the page can't overwrite the currently visible one.
    const sorted = [...nodes].sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
    );
    let current = 'top';
    sorted.forEach((node) => {
      if (node.getBoundingClientRect().top <= line) current = node.id;
    });
    // At the very bottom of the page the last section's top may never reach the
    // line (the page runs out of scroll), so force it active there.
    const scrollable = document.documentElement.scrollHeight - window.innerHeight > 4;
    const reachedBottom =
      scrollable &&
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
    if (reachedBottom && sorted.length) {
      current = sorted[sorted.length - 1].id;
    }
    setActive((prev) => (prev === current ? prev : current));
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (scrollingTo.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [update]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (!navRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setActive(id);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const node = document.getElementById(id);
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // Keep the clicked link active for the duration of the smooth scroll, then
    // reconcile once it has settled so the spy reflects the final position.
    scrollingTo.current = id;
    window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => {
      scrollingTo.current = null;
      update();
    }, 800);
  };

  const itemClass = (id, mobile) => {
    const on = active === id;
    if (mobile) {
      return `tw-nav-item relative z-[1] flex min-h-11 items-center rounded-2xl px-4 text-base font-semibold text-[#101812] ${on ? 'is-on' : ''}`;
    }
    return `tw-nav-item relative z-[1] inline-flex items-center rounded-full px-2 py-2 text-[12px] font-semibold text-[#101812] lg:px-2.5 lg:text-[13px] xl:px-3.5 xl:text-sm ${on ? 'is-on' : ''}`;
  };

  return (
    <nav ref={navRef} aria-label="Navigation" className="relative">
      <div className="tw-glass flex items-center gap-2 rounded-full px-2 py-1.5 shadow-[0_12px_32px_rgba(16,24,18,0.18)] sm:gap-3 sm:px-3 sm:py-2">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            go('top');
          }}
          className="flex min-w-0 items-center gap-2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FBE3C]"
        >
          <img
            src={LOGO}
            alt="TW Coaching"
            className="h-9 w-9 shrink-0 rounded-[10px] border border-[#101812]/10 object-contain sm:h-10 sm:w-10"
          />
          <span className="hidden min-w-0 truncate text-sm font-bold tracking-tight text-[#101812] xl:inline xl:text-base">
            TW Coaching
          </span>
        </a>

        <ul ref={desktopPill.containerRef} onMouseLeave={desktopPill.clearHover} className="relative isolate hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex">
          <span aria-hidden="true" className="tw-pill" style={pillCss(desktopPill.style)} />
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                {...desktopPill.bind(link.id)}
                href={link.id === 'top' ? '#top' : `#${link.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  go(link.id);
                }}
                aria-current={active === link.id ? 'page' : undefined}
                className={itemClass(link.id, false)}
              >
                {t.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
          <LanguageSwitcher />
          <div className="flex items-center gap-1 sm:gap-1.5">
            {CONTACTS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d5e3c4] bg-white text-[#8FBE3C] transition-colors hover:border-[#8FBE3C] hover:bg-[#8FBE3C]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FBE3C] active:scale-[0.98] sm:h-10 sm:w-10"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </a>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#101812] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FBE3C] active:scale-[0.98] md:hidden ${
              open ? 'bg-[#101812] text-white' : 'bg-white text-[#101812] hover:bg-[#8FBE3C]'
            }`}
          >
            {open ? <X className="h-5 w-5" strokeWidth={2.4} /> : <Menu className="h-5 w-5" strokeWidth={2.4} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="tw-glass-panel absolute left-0 right-0 top-[calc(100%+0.55rem)] z-50 rounded-[1.6rem] p-2 shadow-[0_18px_44px_rgba(16,24,18,0.2)] md:hidden"
        >
          <ul ref={mobilePill.containerRef} onMouseLeave={mobilePill.clearHover} className="relative isolate flex flex-col gap-1">
            <span aria-hidden="true" className="tw-pill tw-pill-mobile" style={pillCss(mobilePill.style)} />
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  {...mobilePill.bind(link.id)}
                  href={link.id === 'top' ? '#top' : `#${link.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    go(link.id);
                  }}
                  aria-current={active === link.id ? 'page' : undefined}
                  className={itemClass(link.id, true)}
                >
                  {t.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-1 flex items-center justify-between gap-3 border-t border-[#101812]/10 px-3 py-2.5">
            <span className="text-sm font-semibold text-[#101812]">FR / EN</span>
            <LanguageSwitcher />
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default SiteNav;
