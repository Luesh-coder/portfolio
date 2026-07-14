import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, the "reveal" class is added,
 * triggering the CSS transition defined in index.css.
 *
 * @param {number} threshold  - 0–1, how much of the element must be visible (default 0.15)
 * @param {string} rootMargin - CSS margin around the root (default "0px")
 */
export const useScrollReveal = (threshold = 0.15, rootMargin = "0px") => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal");
          observer.unobserve(el); // animate once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
};