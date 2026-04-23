import type { CSSProperties, ReactNode } from "react";
import type { Direction } from "@/types";

interface Props {
  id?: string;
  children: ReactNode;
  bg?: string;
  mob: boolean;
  dir: Direction;
  ff: string;
  innerRef?: React.RefObject<HTMLDivElement>;
}

export function Section({
  id,
  children,
  bg = "rgba(6,9,18,.82)",
  mob,
  dir,
  ff,
  innerRef,
}: Props) {
  const sp = mob ? 44 : 88;
  const px = mob ? 16 : 24;

  const outer: CSSProperties = {
    background: bg,
    padding: `${sp}px 0`,
    position: "relative",
    zIndex: 1,
  };

  const inner: CSSProperties = {
    maxWidth: 1100,
    margin: "0 auto",
    padding: `0 ${px}px`,
    fontFamily: ff,
    direction: dir,
  };

  return (
    <section id={id} style={outer}>
      <div ref={innerRef} style={inner}>
        {children}
      </div>
    </section>
  );
}
