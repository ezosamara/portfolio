import type { ReactNode, CSSProperties, MouseEvent } from "react";
import { COLORS as C } from "@/data/constants";

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  mob?: boolean;
  onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseOut?: (e: MouseEvent<HTMLDivElement>) => void;
}

export function Glass({
  children,
  style = {},
  mob = false,
  onMouseMove,
  onMouseLeave,
  onMouseOver,
  onMouseOut,
}: Props) {
  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{
        background: "rgba(15,24,38,0.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: `1px solid ${C.brd}`,
        borderRadius: 14,
        padding: mob ? "16px" : "22px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "border-color .3s,box-shadow .3s,transform .3s",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Shared tilt handlers, scoped to desktop only.
export const tilt =
  (mob: boolean) => (e: MouseEvent<HTMLDivElement>) => {
    if (mob) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${-y * 9}deg) rotateY(${
      x * 9
    }deg) translateZ(10px) scale(1.01)`;
    el.style.boxShadow = `${x * -20}px ${y * -20}px 40px rgba(0,229,255,.1),0 0 0 1px rgba(0,229,255,.15)`;
  };

export const untilt =
  (mob: boolean) => (e: MouseEvent<HTMLDivElement>) => {
    if (mob) return;
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.boxShadow = "none";
  };
