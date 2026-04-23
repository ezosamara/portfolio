import { COLORS as C } from "@/data/constants";

interface Props {
  txt: string;
  v: boolean;
  rtl?: boolean;
  size?: number;
  mob?: boolean;
  hf?: string;
}

export function SplitTitle({
  txt,
  v,
  rtl = false,
  size = 34,
  mob = false,
  hf = "'Syne',sans-serif",
}: Props) {
  const words = txt.split(" ");
  let ci = 0;

  return (
    <div style={{ marginBottom: mob ? 26 : 44 }}>
      <div
        style={{ display: "inline-block", position: "relative", paddingBottom: 12 }}
      >
        <h2
          style={{
            fontFamily: hf,
            color: C.tx,
            fontSize: mob ? 24 : size,
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {words.map((w, wi) => {
            const sc = ci;
            ci += w.length;
            return (
              <span
                key={wi}
                style={{
                  display: "inline-block",
                  marginRight: rtl ? 0 : "0.28em",
                  marginLeft: rtl ? "0.28em" : 0,
                  overflow: "hidden",
                  verticalAlign: "bottom",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    transform: v ? "none" : "translateY(110%)",
                    opacity: v ? 1 : 0,
                    transition: `transform .55s cubic-bezier(.23,1,.32,1) ${
                      sc * 18
                    }ms,opacity .4s ease ${sc * 18}ms`,
                  }}
                >
                  {w}
                </span>
              </span>
            );
          })}
        </h2>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            [rtl ? "right" : "left"]: 0,
            height: 3,
            background: `linear-gradient(${rtl ? "270deg" : "90deg"},${C.cyan},${
              C.vio
            })`,
            borderRadius: 2,
            width: v ? "44px" : "0px",
            transition: "width .9s cubic-bezier(.23,1,.32,1) .4s",
          }}
        />
      </div>
    </div>
  );
}
