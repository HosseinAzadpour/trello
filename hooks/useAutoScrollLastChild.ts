/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

export function useAutoScrollLastChild<T extends HTMLElement>(
  dependencies: any[] = [] // وابستگی که باعث scroll شود، مثلاً تعداد کارت‌ها
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lastChild = container.lastElementChild as HTMLElement | null;
    if (lastChild) {
      container.scrollTo({
        top: lastChild.offsetTop + lastChild.offsetHeight,
        behavior: "smooth",
      });
    }
  }, dependencies);

  return containerRef;
}
