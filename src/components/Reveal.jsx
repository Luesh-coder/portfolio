"use client";

import { motion } from "framer-motion";

// Matches the design's reveal easing/curve: fade + rise as the block scrolls in.
const EASE = [0.2, 0.7, 0.2, 1];

/**
 * Wraps a block so it fades and rises into view once, when scrolled into the
 * viewport. `delay` staggers siblings; `as` renders the underlying element
 * (e.g. "section", "h2", "li"). Extra props (className, style, id…) pass through.
 */
export const Reveal = ({ as = "div", delay = 0, y = 22, children, ...rest }) => {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};
