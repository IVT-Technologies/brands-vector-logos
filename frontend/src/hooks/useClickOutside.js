import { useEffect } from "react";

export const useClickOutside = (ref, handler, enabled = true, extraRefs = []) => {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event) => {
      const isInsideMainRef = ref.current && ref.current.contains(event.target);
      const isInsideExtraRefs = extraRefs.some(r => r.current && r.current.contains(event.target));

      if (!isInsideMainRef && !isInsideExtraRefs) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled, extraRefs]);
};
