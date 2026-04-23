import type { CSSProperties } from "react";

export const up = (v: boolean, d = 0): CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? "none" : "translateY(28px)",
  transition: `opacity .7s ease ${d}ms,transform .7s ease ${d}ms`,
});

export const side = (v: boolean, d = 0, dir = 1): CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? "none" : `translateX(${dir * 30}px)`,
  transition: `opacity .65s cubic-bezier(.23,1,.32,1) ${d}ms,transform .65s cubic-bezier(.23,1,.32,1) ${d}ms`,
});

export const scale = (v: boolean, d = 0): CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? "scale(1)" : "scale(.88)",
  transition: `opacity .55s ease ${d}ms,transform .55s cubic-bezier(.34,1.56,.64,1) ${d}ms`,
});

export const wipeUp = (v: boolean, d = 0): CSSProperties => ({
  clipPath: v ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
  transition: `clip-path .85s cubic-bezier(.23,1,.32,1) ${d}ms`,
});
