export function GlobalStyles() {
  return (
    <style>{`
      *{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:#060912;color:#E8F2FF}
      ::-webkit-scrollbar{display:none}
      a{color:inherit}
      @keyframes nb1{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.1) translate(25px,-18px)}}
      @keyframes nb2{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.08) translate(-18px,22px)}}
      @keyframes nb3{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.12) translate(12px,28px)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
      @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(9px)}}
      @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes glitch{
        0%{transform:translate(0);filter:none}
        20%{transform:translate(-4px,2px);filter:hue-rotate(90deg) brightness(1.3)}
        40%{transform:translate(4px,-2px);filter:hue-rotate(200deg)}
        60%{transform:translate(-3px,1px);filter:hue-rotate(270deg)}
        80%{transform:translate(3px,-1px);filter:brightness(1.4)}
        100%{transform:translate(0);filter:none}
      }
      @keyframes sonar{0%{transform:translate(-50%,0) scale(1);opacity:.65}100%{transform:translate(-50%,0) scale(4);opacity:0}}
      @keyframes scanOnce{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
      @keyframes fadeRouteIn{from{opacity:0}to{opacity:1}}
    `}</style>
  );
}
