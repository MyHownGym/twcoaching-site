import { useCallback, useEffect, useRef, useState } from 'react';

const HIDDEN = { left: 0, top: 0, width: 0, height: 0, opacity: 0 };

/** Glass pill that slides under the hovered item and settles on the active one. */
export function useSlidingPill(activeKey, remeasure = []) {
  const containerRef = useRef(null);
  const [hoverKey, setHoverKey] = useState(null);
  const [style, setStyle] = useState(HIDDEN);

  const measure = useCallback(() => {
    const root = containerRef.current;
    const key = hoverKey ?? activeKey;
    const target = root && key
      ? Array.from(root.querySelectorAll('[data-pill-key]')).find((el) => el.dataset.pillKey === key)
      : null;
    if (!root || !target) {
      setStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const box = root.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    setStyle({ left: rect.left - box.left, top: rect.top - box.top, width: rect.width, height: rect.height, opacity: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoverKey, activeKey, ...remeasure]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const bind = (key) => ({
    'data-pill-key': key,
    onMouseEnter: () => setHoverKey(key),
    onFocus: () => setHoverKey(key),
    onBlur: () => setHoverKey(null),
  });

  return { containerRef, style, bind, clearHover: () => setHoverKey(null) };
}

export const pillCss = (s) => ({
  transform: `translate(${s.left}px, ${s.top}px)`,
  width: `${s.width}px`,
  height: `${s.height}px`,
  opacity: s.opacity,
});
