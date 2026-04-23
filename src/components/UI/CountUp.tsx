import { useEffect, useState } from "react";

interface Props {
  to: number;
  suffix?: string;
  v: boolean;
  delay?: number;
}

export function CountUp({ to, suffix = "", v, delay = 0 }: Props) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!v) return;
    let frame = 0;
    const steps = 60;
    const id = setTimeout(() => {
      const tick = () => {
        frame++;
        const prog = frame / steps;
        const eased = 1 - Math.pow(1 - Math.min(prog, 1), 3);
        setN(Math.round(eased * to));
        if (frame < steps) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(id);
  }, [v, to, delay]);
  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}
