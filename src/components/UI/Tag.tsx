import { COLORS as C } from "@/data/constants";

interface Props {
  label: string;
  color?: string;
}

export function Tag({ label, color = C.cyan }: Props) {
  return (
    <span
      style={{
        background: `${color}18`,
        color,
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 9px",
        borderRadius: 20,
        letterSpacing: 0.4,
      }}
    >
      {label}
    </span>
  );
}
