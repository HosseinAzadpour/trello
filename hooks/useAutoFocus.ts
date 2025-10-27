import { useEffect, useRef, RefObject } from "react";

export function useAutoFocusScroll<T extends HTMLElement>(
  newListTitle: string = ""
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (newListTitle.length > 0) return;

    const node = ref.current;
    if (!node) return;

    // در requestAnimationFrame تا render کامل شده باشه
    const frame = requestAnimationFrame(() => {
      node.focus?.();
      if ("setSelectionRange" in node) {
        const input = node as unknown as HTMLInputElement | HTMLTextAreaElement;
        input.setSelectionRange(input.value.length, input.value.length);
      }
      node.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [newListTitle]);

  return ref;
}
