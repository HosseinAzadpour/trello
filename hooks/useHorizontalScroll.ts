import { useEffect, useRef } from "react";

export function useHorizontalScroll() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // اگر عنصری که موس روش هست scrollable عمودی داره، اجازه بده بهش
      const target = e.target as HTMLElement;
      if (target.closest(".scrollable-vertical")) {
        return; // روی کارت‌ها scroll عمودی کار کنه
      }

      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return elRef;
}
