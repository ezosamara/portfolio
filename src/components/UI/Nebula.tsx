export function Nebula() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "8%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,229,255,.075) 0%,transparent 65%)",
          filter: "blur(70px)",
          animation: "nb1 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "3%",
          width: 620,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(123,97,255,.07) 0%,transparent 65%)",
          filter: "blur(80px)",
          animation: "nb2 14s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "38%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(0,100,200,.06) 0%,transparent 65%)",
          filter: "blur(60px)",
          animation: "nb3 11s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: "2%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(100,50,200,.055) 0%,transparent 65%)",
          filter: "blur(55px)",
          animation: "nb1 16s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}
