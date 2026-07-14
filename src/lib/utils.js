import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

// Variadic so `cn("base", cond && "extra", ["more"])` all work — clsx flattens
// the collected args (including nested arrays) and tailwind-merge dedupes them.
export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
};