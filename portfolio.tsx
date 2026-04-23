import { useState, useEffect, useRef } from "react";

const C={bg:"#060912",sf:"#0d1220",card:"#0f1826",brd:"#1e2d45",cyan:"#00E5FF",vio:"#7B61FF",tx:"#E8F2FF",mu:"#6B84B0",gr:"#22d3a5"};

function useW(){const[w,setW]=useState(typeof window!=="undefined"?window.innerWidth:1200);useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);return w;}
function useInView(th=0.1){const ref=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect();}},{threshold:th});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);return[ref,v];}
function useScrollY(){const[sy,setSy]=useState(0);useEffect(()=>{const h=()=>setSy(window.scrollY);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);return sy;}

function StarCanvas(){
  const r=useRef(null);
  useEffect(()=>{
    const c=r.current,ctx=c.getContext("2d");
    let af,frame=0,stars=[],shoots=[];
    const init=()=>{c.width=window.innerWidth;c.height=window.innerHeight;const n=Math.min(220,Math.floor(c.width*c.height/5500));stars=Array.from({length:n},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.8+0.15,spd:Math.random()*.007+.001,ph:Math.random()*Math.PI*2,col:Math.random()>.93?"#00E5FF":Math.random()>.87?"#7B61FF":Math.random()>.5?"#E8F2FF":"#a0b8d8"}));};
    const shoot=()=>{shoots.push({x:Math.random()*c.width*.7,y:Math.random()*c.height*.35,vx:6+Math.random()*5,vy:3+Math.random()*2.5,a:1,len:90+Math.random()*70});};
    const draw=()=>{ctx.clearRect(0,0,c.width,c.height);frame++;if(frame%160===0&&Math.random()>.35)shoot();stars.forEach(s=>{const a=(Math.sin(frame*s.spd+s.ph)+1)/2*.8+0.15;ctx.globalAlpha=a;ctx.fillStyle=s.col;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();if(s.r>1.3){const g=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*3.5);g.addColorStop(0,s.col+"55");g.addColorStop(1,"transparent");ctx.fillStyle=g;ctx.globalAlpha=a*.35;ctx.beginPath();ctx.arc(s.x,s.y,s.r*3.5,0,Math.PI*2);ctx.fill();}});shoots=shoots.filter(s=>s.a>0);shoots.forEach(s=>{ctx.globalAlpha=s.a;const g=ctx.createLinearGradient(s.x,s.y,s.x-s.vx*(s.len/5),s.y-s.vy*(s.len/5));g.addColorStop(0,"rgba(255,255,255,.95)");g.addColorStop(.4,"rgba(180,230,255,.4)");g.addColorStop(1,"transparent");ctx.strokeStyle=g;ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.vx*(s.len/5),s.y-s.vy*(s.len/5));ctx.stroke();s.x+=s.vx;s.y+=s.vy;s.a-=0.016;});ctx.globalAlpha=1;af=requestAnimationFrame(draw);};
    init();window.addEventListener("resize",init);draw();return()=>{cancelAnimationFrame(af);window.removeEventListener("resize",init);};
  },[]);
  return <canvas ref={r} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:0,pointerEvents:"none"}}/>;
}

function Nebula(){
  return(
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"5%",left:"8%",width:550,height:550,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,229,255,.075) 0%,transparent 65%)",filter:"blur(70px)",animation:"nb1 9s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"40%",right:"3%",width:620,height:620,borderRadius:"50%",background:"radial-gradient(circle,rgba(123,97,255,.07) 0%,transparent 65%)",filter:"blur(80px)",animation:"nb2 14s ease-in-out infinite"}}/>
      <div style={{position:"absolute",bottom:"15%",left:"38%",width:450,height:450,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,100,200,.06) 0%,transparent 65%)",filter:"blur(60px)",animation:"nb3 11s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"65%",left:"2%",width:360,height:360,borderRadius:"50%",background:"radial-gradient(circle,rgba(100,50,200,.055) 0%,transparent 65%)",filter:"blur(55px)",animation:"nb1 16s ease-in-out infinite reverse"}}/>
    </div>
  );
}

function ScrollProgress(){
  const[p,setP]=useState(0);
  useEffect(()=>{const h=()=>{const d=document.documentElement;setP(d.scrollHeight-d.clientHeight>0?d.scrollTop/(d.scrollHeight-d.clientHeight)*100:0);};window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);
  return <div style={{position:"fixed",top:0,left:0,height:2,width:`${p}%`,background:`linear-gradient(90deg,${C.cyan},${C.vio})`,zIndex:300,boxShadow:`0 0 10px ${C.cyan},0 0 20px rgba(0,229,255,.4)`,transition:"width .05s linear"}}/>;
}

function FloatingParticles({sy}){
  const pts=[{t:12,l:18,s:4,sp:.018,col:C.cyan,fl:3.2},{t:28,l:78,s:3,sp:-.014,col:C.vio,fl:2.8},{t:52,r:8,s:5,sp:.016,col:C.cyan,fl:4},{t:68,l:42,s:3,sp:-.011,col:C.vio,fl:3.5},{t:82,r:25,s:4,sp:.012,col:"#a0b0ff",fl:2.5},{t:38,l:4,s:3,sp:-.009,col:C.cyan,fl:3.8},{t:60,r:45,s:4,sp:.014,col:C.vio,fl:2.2}];
  return(
    <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
      {pts.map((p,i)=>(<div key={i} style={{position:"absolute",top:`calc(${p.t}% + ${sy*p.sp}px)`,[p.l!=null?"left":"right"]:`${p.l??p.r}%`,width:p.s,height:p.s,borderRadius:"50%",background:p.col,boxShadow:`0 0 ${p.s*3}px ${p.col}`,opacity:.55,animation:`floatY ${p.fl}s ease-in-out ${i*400}ms infinite`}}/>))}
    </div>
  );
}

// ── Scroll-driven line that draws itself down the timeline ──
function TimelineLineDraw({containerRef,rtl}){
  const[pct,setPct]=useState(0);
  useEffect(()=>{
    const upd=()=>{
      if(!containerRef.current)return;
      const rect=containerRef.current.getBoundingClientRect();
      const progress=Math.max(0,Math.min(1,(window.innerHeight*.52-rect.top)/rect.height));
      setPct(progress*100);
    };
    window.addEventListener("scroll",upd,{passive:true});
    upd();
    return()=>window.removeEventListener("scroll",upd);
  },[]);
  return(
    <div style={{position:"absolute",[rtl?"right":"left"]:130,top:0,bottom:0,width:1,background:C.brd}}>
      <div style={{position:"absolute",top:0,left:0,width:"100%",height:`${pct}%`,background:`linear-gradient(to bottom,${C.cyan},${C.vio})`,boxShadow:`0 0 8px ${C.cyan}88`,transition:"height .12s linear"}}/>
      {/* glowing orb at the drawing tip */}
      <div style={{position:"absolute",top:`${pct}%`,left:"50%",transform:"translate(-50%,-50%)",width:8,height:8,borderRadius:"50%",background:C.cyan,boxShadow:`0 0 12px ${C.cyan},0 0 24px ${C.cyan}88`,transition:"top .12s linear",opacity:pct>1&&pct<99?1:0}}/>
    </div>
  );
}

// ── Individual timeline item with rich per-item scroll animations ──
function TLItem({item,i,rtl,hf,wk,ed,mob}){
  const ref=useRef(null);
  const[v,setV]=useState(false);
  const[scanned,setScanned]=useState(false);
  const[counted,setCounted]=useState(false);

  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        setV(true);
        setTimeout(()=>setScanned(true),450);
        setTimeout(()=>setCounted(true),200);
        o.disconnect();
      }
    },{threshold:0.25});
    if(ref.current)o.observe(ref.current);
    return()=>o.disconnect();
  },[]);

  const isWork=item.type==="work";
  const ac=isWork?C.cyan:C.vio;
  const flipX=(rtl?1:-1)*(i%2===0?-1:1);

  if(mob) return(
    <div ref={ref} style={{position:"relative",opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:"opacity .6s ease,transform .6s ease"}}>
      <div style={{background:"rgba(15,24,38,.9)",backdropFilter:"blur(14px)",border:`1px solid ${v?C.brd:"transparent"}`,borderRadius:12,padding:"14px 14px 14px 22px",position:"relative",overflow:"hidden",transition:"border-color .5s .2s,box-shadow .3s"}}
           onMouseOver={e=>{e.currentTarget.style.borderColor=ac;e.currentTarget.style.boxShadow=`0 0 28px ${ac}22`;}}
           onMouseOut={e=>{e.currentTarget.style.borderColor=C.brd;e.currentTarget.style.boxShadow="none";}}>
        {/* animated left bar */}
        <div style={{position:"absolute",[rtl?"right":"left"]:0,top:0,bottom:0,width:3,background:`linear-gradient(to bottom,${ac},${C.vio})`,borderRadius:"12px 0 0 12px",transform:v?"scaleY(1)":"scaleY(0)",transition:"transform .55s cubic-bezier(.23,1,.32,1) .25s",transformOrigin:"top"}}/>
        {/* shimmer scan */}
        {scanned&&<div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,transparent 0%,${ac}15 50%,transparent 100%)`,transform:"translateX(-100%)",animation:"scanOnce .7s ease forwards",pointerEvents:"none"}}/>}
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,gap:6,flexWrap:"wrap"}}>
          <span style={{color:ac,fontSize:11,fontWeight:700,opacity:v?1:0,transition:"opacity .4s .35s"}}>{item.year}</span>
          <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:10,background:`${ac}18`,color:ac,opacity:v?1:0,transition:"opacity .4s .45s"}}>{isWork?`💼 ${wk}`:`🎓 ${ed}`}</span>
        </div>
        <h3 style={{color:C.tx,fontFamily:hf,fontWeight:700,fontSize:14,margin:"0 0 3px",opacity:v?1:0,transform:v?"none":"translateY(8px)",transition:"all .5s .5s"}}>{item.title}</h3>
        <p style={{color:ac,fontSize:12,margin:"0 0 4px",fontWeight:600,opacity:v?1:0,transition:"opacity .4s .6s"}}>{item.org} · {item.loc}</p>
        <p style={{color:C.mu,fontSize:12,lineHeight:1.65,margin:0,opacity:v?1:0,transition:"opacity .4s .7s"}}>{item.desc}</p>
      </div>
    </div>
  );

  return(
    <div ref={ref} style={{display:"flex",flexDirection:rtl?"row-reverse":"row",marginBottom:22,alignItems:"flex-start"}}>

      {/* Year label — slides in from side */}
      <div style={{width:130,flexShrink:0,paddingTop:16,textAlign:rtl?"left":"right",[rtl?"paddingLeft":"paddingRight"]:24,
        opacity:v?1:0,transform:v?"none":`translateX(${(rtl?1:-1)*24}px)`,transition:"opacity .6s ease .1s,transform .6s ease .1s"}}>
        <span style={{color:ac,fontSize:11,fontWeight:700,display:"block",lineHeight:1.4,letterSpacing:.5,
          textShadow:v?`0 0 12px ${ac}99`:"none",transition:"text-shadow .5s .5s"}}>{item.year}</span>
      </div>

      {/* Dot with sonar burst rings */}
      <div style={{width:20,flexShrink:0,display:"flex",justifyContent:"center",paddingTop:18,position:"relative",zIndex:2}}>
        {v&&[0,1,2].map(ri=>(
          <div key={ri} style={{position:"absolute",top:"50%",left:"50%",width:22,height:22,marginTop:-11,marginLeft:-11,
            borderRadius:"50%",border:`1.5px solid ${ac}`,opacity:0,
            animation:`sonar 2.2s cubic-bezier(.2,.8,.3,1) ${ri*380}ms 1`}}/>
        ))}
        {/* dot */}
        <div style={{width:13,height:13,borderRadius:"50%",background:ac,border:`2px solid ${C.bg}`,position:"relative",zIndex:1,
          transform:v?"scale(1)":"scale(0)",transition:"transform .45s cubic-bezier(.34,1.56,.64,1) .2s",
          boxShadow:v?`0 0 14px ${ac},0 0 30px ${ac}55`:"none"}}/>
      </div>

      {/* Card — 3D perspective flip in */}
      <div style={{flex:1,[rtl?"marginRight":"marginLeft"]:20,
        opacity:v?1:0,
        transform:v?"none":`perspective(800px) rotateY(${flipX*16}deg) translateX(${flipX*-18}px)`,
        transition:"opacity .7s ease .05s,transform .8s cubic-bezier(.23,1,.32,1) .05s"}}>
        <div style={{background:"rgba(15,24,38,.9)",backdropFilter:"blur(14px)",border:`1px solid ${C.brd}`,borderRadius:12,
          padding:"14px 18px",position:"relative",overflow:"hidden",
          transition:"border-color .3s,box-shadow .3s,transform .22s",cursor:"default"}}
             onMouseOver={e=>{e.currentTarget.style.borderColor=ac;e.currentTarget.style.boxShadow=`0 0 32px ${ac}25,inset 0 0 24px ${ac}07`;e.currentTarget.style.transform=rtl?"translateX(-5px)":"translateX(5px)";}}
             onMouseOut={e=>{e.currentTarget.style.borderColor=C.brd;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>

          {/* top bar draws in */}
          <div style={{position:"absolute",top:0,[rtl?"right":"left"]:0,height:2,
            background:`linear-gradient(${rtl?"270deg":"90deg"},${ac},${C.vio})`,
            width:v?"100%":"0%",transition:"width .95s cubic-bezier(.23,1,.32,1) .38s"}}/>

          {/* shimmer scan sweep */}
          {scanned&&<div style={{position:"absolute",inset:0,
            background:`linear-gradient(90deg,transparent 0%,${ac}13 50%,transparent 100%)`,
            transform:"translateX(-100%)",animation:"scanOnce .85s ease forwards",pointerEvents:"none"}}/>}

          {/* staggered text content */}
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,gap:8,flexWrap:"wrap"}}>
            <h3 style={{color:C.tx,fontFamily:hf,fontWeight:700,fontSize:14,margin:0,
              opacity:v?1:0,transform:v?"none":"translateY(7px)",transition:"all .5s .48s"}}>{item.title}</h3>
            <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:10,background:`${ac}18`,color:ac,
              opacity:v?1:0,transition:"opacity .4s .55s"}}>{isWork?`💼 ${wk}`:`🎓 ${ed}`}</span>
          </div>
          <p style={{color:ac,fontSize:12,margin:"0 0 4px",fontWeight:600,
            opacity:v?1:0,transition:"opacity .4s .65s"}}>{item.org} · {item.loc}</p>
          <p style={{color:C.mu,fontSize:12,lineHeight:1.65,margin:0,
            opacity:v?1:0,transition:"opacity .4s .78s"}}>{item.desc}</p>
        </div>
      </div>
    </div>
  );
}

function SplitTitle({txt,v,rtl=false,size=34,mob=false,hf="'Syne',sans-serif"}){
  const words=txt.split(" ");let ci=0;
  return(
    <div style={{marginBottom:mob?26:44}}>
      <div style={{display:"inline-block",position:"relative",paddingBottom:12}}>
        <h2 style={{fontFamily:hf,color:C.tx,fontSize:mob?24:size,fontWeight:800,margin:0,lineHeight:1.2}}>
          {words.map((w,wi)=>{
            const sc=ci;ci+=w.length;
            return(
              <span key={wi} style={{display:"inline-block",marginRight:rtl?0:"0.28em",marginLeft:rtl?"0.28em":0,overflow:"hidden",verticalAlign:"bottom"}}>
                <span style={{display:"inline-block",transform:v?"none":"translateY(110%)",opacity:v?1:0,transition:`transform .55s cubic-bezier(.23,1,.32,1) ${sc*18}ms,opacity .4s ease ${sc*18}ms`}}>{w}</span>
              </span>
            );
          })}
        </h2>
        <div style={{position:"absolute",bottom:0,[rtl?"right":"left"]:0,height:3,background:`linear-gradient(${rtl?"270deg":"90deg"},${C.cyan},${C.vio})`,borderRadius:2,width:v?"44px":"0px",transition:"width .9s cubic-bezier(.23,1,.32,1) .4s"}}/>
      </div>
    </div>
  );
}

function CountUp({to,suffix="",v,delay=0}){
  const[n,setN]=useState(0);
  useEffect(()=>{if(!v)return;let frame=0;const steps=60;const id=setTimeout(()=>{const tick=()=>{frame++;const eased=1-Math.pow(1-Math.min(frame/steps,1),3);setN(Math.round(eased*to));if(frame<steps)requestAnimationFrame(tick);};requestAnimationFrame(tick);},delay);return()=>clearTimeout(id);},[v,to,delay]);
  return <span>{n}{suffix}</span>;
}

const PROJECTS=[
  {title:"KHEIT CPA Platform",cat:"Web Dev",tags:["React","Webflow","CMS"],desc:"Full-stack CPA management system with admin, employee & client portals.",url:"https://kheit.com"},
  {title:"Tira Meat Boutique",cat:"Branding",tags:["Logo","Brand Guide","Print"],desc:"Premium brand identity — logo, palette, typography & social media kit."},
  {title:"Revibes",cat:"Branding",tags:["Logo","Identity"],desc:"Modern lifestyle brand with cohesive visual system."},
  {title:"SWANX",cat:"Branding",tags:["Logo","Brand"],desc:"Bold, minimal brand identity design."},
  {title:"Orthodont Clinic",cat:"Branding",tags:["Medical","Logo"],desc:"Clean, trustworthy brand for a dental clinic."},
  {title:"Spotless Cleaning Co.",cat:"Branding",tags:["Logo","Social"],desc:"Fresh, minimal identity for a cleaning company."},
  {title:"VentureXP",cat:"Web Dev",tags:["Webflow","Business"],desc:"Business-focused landing page.",url:"https://venturexp.ca"},
  {title:"Raghda Portfolio",cat:"Web Dev",tags:["Webflow","Portfolio"],desc:"Personal portfolio on Webflow.",url:"https://raghda.webflow.io"},
  {title:"Spotless Site",cat:"Web Dev",tags:["Webflow","Service"],desc:"Full service website for a cleaning company.",url:"https://sptclean.webflow.io"},
  {title:"RMF PGM",cat:"Web Dev",tags:["Webflow"],desc:"Professional web presence for a medical practice.",url:"https://rmf-pgm.webflow.io"},
  {title:"Meretz Campaigns",cat:"PR & Comms",tags:["Politics","Strategy","Media"],desc:"PR & Knesset campaign management (2014–2023)."},
  {title:"Tira Municipality",cat:"AI & Automation",tags:["Gov-Tech","Automation","Data"],desc:"Digital transformation across 5 municipal departments."},
  {title:"EZO Client Campaigns",cat:"Digital Marketing",tags:["Meta","Google","Content"],desc:"Multi-client campaigns across retail, services & public sectors."},
];
const TL=[
  {year:"2020–Present",title:"Founder & Director",org:"EZO Agency",loc:"Tira, IL",type:"work",desc:"Full-service agency: digital marketing, PR, branding, video, Webflow & AI."},
  {year:"2022–2024",title:"Digitalization Manager",org:"Tira Municipality",loc:"Tira, IL",type:"work",desc:"Led digital transformation across HR, planning, welfare & vendor portal depts."},
  {year:"2014–2023",title:"PR Specialist",org:"Meretz Party",loc:"Tel Aviv",type:"work",desc:"Knesset campaign strategy, media management & Arabic community outreach."},
  {year:"2018–2019",title:"Research Assistant",org:"Maoz",loc:"Lod, IL",type:"work",desc:"Policy research for government ministries; surveys, interviews, benchmarks."},
  {year:"2025–2026",title:"Data Science Diploma",org:"Cornerstone Community College",loc:"BC, Canada",type:"edu",desc:"Applied data science, Python, machine learning & analytics."},
  {year:"2025–2026",title:"Webflow Certification",org:"Webflow University",loc:"Online",type:"edu",desc:"Professional web design & development."},
  {year:"2020",title:"Strategic Business Dev",org:"LAHAV – Tel Aviv University",loc:"Tel Aviv",type:"edu",desc:"Executive-level business strategy."},
  {year:"2019",title:"Digital Campaign Mgmt",org:"Digitalent College",loc:"Israel",type:"edu",desc:"Certified digital campaign management."},
  {year:"2018",title:"MA Political Communication",org:"Tel Aviv University",loc:"Tel Aviv",type:"edu",desc:"Executive program in political communication."},
  {year:"2015",title:"BA Communications",org:"Kinneret College",loc:"Israel",type:"edu",desc:"Bachelor of Communications."},
];
const CATS=["All","Branding","Web Dev","Digital Marketing","AI & Automation","PR & Comms","Video"];
const CL={en:{"All":"All","Branding":"Branding","Web Dev":"Web Dev","Digital Marketing":"Digital Marketing","AI & Automation":"AI & Auto","PR & Comms":"PR & Comms","Video":"Video"},he:{"All":"הכל","Branding":"מיתוג","Web Dev":"פיתוח אתרים","Digital Marketing":"שיווק דיגיטלי","AI & Automation":"AI ואוטומציה","PR & Comms":"יחסי ציבור","Video":"וידאו"},ar:{"All":"الكل","Branding":"هوية بصرية","Web Dev":"تطوير مواقع","Digital Marketing":"تسويق رقمي","AI & Automation":"AI وأتمتة","PR & Comms":"علاقات عامة","Video":"فيديو"}};
const SV={en:[{i:"📣",t:"Digital Marketing",d:"Campaign management, content strategy, analytics"},{i:"🎙️",t:"PR & Communications",d:"Media relations, political consulting, crisis management"},{i:"🎨",t:"Branding & Identity",d:"Logo, brand guide, visual identity system"},{i:"🎬",t:"Video Production",d:"Concept, scripting, editing, motion graphics"},{i:"💻",t:"Web Development",d:"Webflow certified — sites, landing pages, CMS"},{i:"🤖",t:"AI & Automation",d:"Workflow automation, AI tools, digital transformation"}],he:[{i:"📣",t:"שיווק דיגיטלי",d:"ניהול קמפיינים, אסטרטגיית תוכן, ניתוח נתונים"},{i:"🎙️",t:"יחסי ציבור",d:"קשרי תקשורת, ייעוץ פוליטי, ניהול משברים"},{i:"🎨",t:"מיתוג וזהות",d:"לוגו, מדריך מותגי, זהות ויזואלית"},{i:"🎬",t:"הפקת וידאו",d:"קונספט, תסריט, עריכה, אנימציה"},{i:"💻",t:"פיתוח אתרים",d:"מוסמך Webflow — אתרים, דפי נחיתה"},{i:"🤖",t:"AI ואוטומציה",d:"אוטומציה, כלי AI, טרנספורמציה דיגיטלית"}],ar:[{i:"📣",t:"التسويق الرقمي",d:"إدارة الحملات، استراتيجية المحتوى"},{i:"🎙️",t:"العلاقات العامة",d:"علاقات إعلامية، استشارات سياسية"},{i:"🎨",t:"الهوية التجارية",d:"شعار، دليل هوية بصرية"},{i:"🎬",t:"إنتاج الفيديو",d:"مفهوم، سيناريو، تحرير"},{i:"💻",t:"تطوير المواقع",d:"معتمد Webflow — مواقع وصفحات هبوط"},{i:"🤖",t:"الذكاء الاصطناعي",d:"أتمتة، أدوات AI، تحول رقمي"}]};
const TX={
  en:{dir:"ltr",ff:"'Inter',sans-serif",hf:"'Syne',sans-serif",nav:["About","Services","Work","Timeline","GitHub","Contact"],roles:["Digital Strategist","Brand Builder","Web Developer","AI Implementer","PR Specialist","Data Scientist"],hi:"Hi, I'm",nm:"Moataz Samara",sub:"Founder of EZO · Trilingual · Vancouver & Tira",c1:"View My Work",c2:"Contact Me",aT:"About Me",aB:"Digital strategist, brand builder, and full-service agency founder with 5+ years building EZO. I blend storytelling with technical execution — from campaign management and video production to Webflow development and AI implementation. Trilingual in Arabic, Hebrew, and English.",sT:"Services",wT:"Selected Work",tT:"Experience & Education",gT:"GitHub",gL:"Loading…",gE:"Could not load repos. Update GitHub username in the source.",gS:"stars",gV:"View All on GitHub",cT:"Get In Touch",cS:"Open to opportunities, collaborations & interesting challenges.",nP:"Your name",eP:"Your email",mP:"Your message",sb:"Send Message",wk:"Work",ed:"Education",stats:[{n:5,s:"+",l:"Years Exp."},{n:13,s:"+",l:"Projects"},{n:3,s:"",l:"Languages"},{n:4,s:"",l:"Countries"}]},
  he:{dir:"rtl",ff:"'Frank Ruhl Libre',sans-serif",hf:"'Rubik',sans-serif",nav:["אודות","שירותים","עבודות","ניסיון","GitHub","צור קשר"],roles:["אסטרטג דיגיטלי","בונה מותגים","מפתח אתרים","מומחה AI","איש יחסי ציבור","מדען נתונים"],hi:"שלום, אני",nm:"מועתז סמארה",sub:"מייסד EZO · תלת-לשוני · ונקובר וטירה",c1:"ראה עבודות",c2:"צור קשר",aT:"אודותי",aB:"אסטרטג דיגיטלי, בונה מותגים ומייסד EZO — משרד שיווק ותקשורת מלא שירות עם ניסיון של מעל 5 שנים.",sT:"שירותים",wT:"עבודות נבחרות",tT:"ניסיון והשכלה",gT:"GitHub",gL:"טוען…",gE:"שגיאה בטעינה.",gS:"כוכבים",gV:"כל הפרויקטים",cT:"צור קשר",cS:"פתוח להזדמנויות ואתגרים.",nP:"שמך",eP:"האימייל שלך",mP:"הודעתך",sb:"שלח",wk:"עבודה",ed:"השכלה",stats:[{n:5,s:"+",l:"שנות ניסיון"},{n:13,s:"+",l:"פרויקטים"},{n:3,s:"",l:"שפות"},{n:4,s:"",l:"מדינות"}]},
  ar:{dir:"rtl",ff:"'Cairo',sans-serif",hf:"'Changa',sans-serif",nav:["عني","الخدمات","الأعمال","المسيرة","GitHub","تواصل"],roles:["استراتيجي رقمي","بناء علامات تجارية","مطور مواقع","خبير AI","متخصص علاقات عامة","عالم بيانات"],hi:"مرحباً، أنا",nm:"معتز سمارة",sub:"مؤسس EZO · ثلاثي اللغات · فانكوفر وطيرة",c1:"شاهد أعمالي",c2:"تواصل معي",aT:"عني",aB:"استراتيجي رقمي وبناء علامات تجارية ومؤسس وكالة EZO للخدمات المتكاملة بخبرة تزيد عن 5 سنوات.",sT:"الخدمات",wT:"أعمال مختارة",tT:"الخبرة والتعليم",gT:"GitHub",gL:"جاري التحميل…",gE:"تعذّر التحميل.",gS:"نجوم",gV:"كل المشاريع في GitHub",cT:"تواصل معي",cS:"منفتح على الفرص الجديدة.",nP:"اسمك",eP:"بريدك الإلكتروني",mP:"رسالتك",sb:"إرسال",wk:"عمل",ed:"تعليم",stats:[{n:5,s:"+",l:"سنوات خبرة"},{n:13,s:"+",l:"مشروع"},{n:3,s:"",l:"لغات"},{n:4,s:"",l:"دول"}]},
};
const SKILLS=["Digital Strategy","Brand Identity","Webflow","React","Data Science","AI/ML Tools","Meta & Google Ads","Video Editing","Political PR","SEO","Campaign Analytics","Gov Tech"];
const GH="moataz-ezo";

export default function Portfolio(){
  const w=useW(),mob=w<768,sm=w<480;
  const sy=useScrollY();
  const[lang,setLang]=useState("en");
  const[cat,setCat]=useState("All");
  const[typed,setTyped]=useState("");
  const[rIdx,setRIdx]=useState(0);
  const[isTyping,setIsTyping]=useState(true);
  const[repos,setRepos]=useState([]);
  const[ghs,setGhs]=useState("loading");
  const[form,setForm]=useState({n:"",e:"",m:""});
  const[sent,setSent]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);
  const[nameGlitch,setNameGlitch]=useState(false);

  const[aboutRef,aboutV]=useInView();
  const[servRef,servV]=useInView();
  const[workRef,workV]=useInView();
  const[tlRef,tlV]=useInView();
  const[ghRef,ghV]=useInView();
  const[contactRef,contactV]=useInView();
  const tlContainerRef=useRef(null);

  const t=TX[lang],rtl=t.dir==="rtl",hf=t.hf;
  const navIds=["about","services","work","timeline","github","contact"];
  const sp=mob?44:88,px=mob?16:24;

  useEffect(()=>{setTyped("");setRIdx(0);setIsTyping(true);},[lang]);
  useEffect(()=>{
    const role=t.roles[rIdx];
    if(isTyping){if(typed.length<role.length){const id=setTimeout(()=>setTyped(role.slice(0,typed.length+1)),58);return()=>clearTimeout(id);}else{const id=setTimeout(()=>setIsTyping(false),1800);return()=>clearTimeout(id);}}
    else{if(typed.length>0){const id=setTimeout(()=>setTyped(s=>s.slice(0,-1)),32);return()=>clearTimeout(id);}else{setRIdx(i=>(i+1)%t.roles.length);setIsTyping(true);}}
  },[typed,isTyping,rIdx,lang]);

  useEffect(()=>{if(menuOpen)setMenuOpen(false);},[lang]);
  useEffect(()=>{
    fetch(`https://api.github.com/users/${GH}/repos?sort=updated&per_page=6`)
      .then(r=>r.ok?r.json():Promise.reject())
      .then(d=>{setRepos(Array.isArray(d)?d.slice(0,6):[]);setGhs(Array.isArray(d)&&d.length>0?"ok":"empty");})
      .catch(()=>setGhs("error"));
  },[]);
  useEffect(()=>{if(!document.getElementById("pf-fonts")){const l=document.createElement("link");l.id="pf-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500;600&family=Frank+Ruhl+Libre:wght@300;400;500;700&family=Cairo:wght@300;400;500;700&family=Rubik:wght@400;500;700;800&family=Changa:wght@400;500;700;800&display=swap";document.head.appendChild(l);}},[]);

  const filtered=cat==="All"?PROJECTS:PROJECTS.filter(p=>p.cat===cat);
  const up=(v,d=0)=>({opacity:v?1:0,transform:v?"none":"translateY(28px)",transition:`opacity .7s ease ${d}ms,transform .7s ease ${d}ms`});
  const side=(v,d=0,dir=1)=>({opacity:v?1:0,transform:v?"none":`translateX(${dir*30}px)`,transition:`opacity .65s cubic-bezier(.23,1,.32,1) ${d}ms,transform .65s cubic-bezier(.23,1,.32,1) ${d}ms`});
  const scale=(v,d=0)=>({opacity:v?1:0,transform:v?"scale(1)":"scale(.88)",transition:`opacity .55s ease ${d}ms,transform .55s cubic-bezier(.34,1.56,.64,1) ${d}ms`});
  const wipeUp=(v,d=0)=>({clipPath:v?"inset(0 0 0% 0)":"inset(0 0 100% 0)",transition:`clip-path .85s cubic-bezier(.23,1,.32,1) ${d}ms`});
  const tilt=(e)=>{if(mob)return;const el=e.currentTarget,r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(700px) rotateX(${-y*9}deg) rotateY(${x*9}deg) translateZ(10px) scale(1.01)`;el.style.boxShadow=`${x*-20}px ${y*-20}px 40px rgba(0,229,255,.1),0 0 0 1px rgba(0,229,255,.15)`;};
  const untilt=(e)=>{if(mob)return;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";};

  const Tag=({label,color=C.cyan})=>(<span style={{background:`${color}18`,color,fontSize:11,fontWeight:700,padding:"2px 9px",borderRadius:20,letterSpacing:.4}}>{label}</span>);
  const Glass=({children,style={},onMouseMove,onMouseLeave,onMouseOver,onMouseOut})=>(
    <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver} onMouseOut={onMouseOut}
      style={{background:"rgba(15,24,38,0.82)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",border:`1px solid ${C.brd}`,borderRadius:14,padding:mob?"16px":"22px",display:"flex",flexDirection:"column",gap:10,transition:"border-color .3s,box-shadow .3s,transform .3s",...style}}>
      {children}
    </div>
  );
  const inner={maxWidth:1100,margin:"0 auto",padding:`0 ${px}px`,fontFamily:t.ff,direction:t.dir};
  const glassSec=(bg="rgba(6,9,18,.82)")=>({background:bg,padding:`${sp}px 0`,position:"relative",zIndex:1});

  return(
    <div style={{background:C.bg,color:C.tx,minHeight:"100vh",fontFamily:t.ff,direction:t.dir}}>
      <StarCanvas/><Nebula/><ScrollProgress/><FloatingParticles sy={sy}/>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:"rgba(6,9,18,.9)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:`1px solid rgba(0,229,255,.07)`}}>
        <div style={{height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:`0 ${px}px`}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,background:`linear-gradient(135deg,${C.cyan},${C.vio})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:1}}>MO.</span>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {["en","he","ar"].map(l=>(<button key={l} onClick={()=>setLang(l)} style={{background:lang===l?C.cyan:"transparent",color:lang===l?C.bg:C.mu,border:`1px solid ${lang===l?C.cyan:"rgba(107,132,176,.3)"}`,borderRadius:6,padding:"2px 8px",fontSize:11,cursor:"pointer",fontWeight:700,transition:"all .2s"}}>{l==="en"?"EN":l==="he"?"עב":"ع"}</button>))}
            {mob?<button onClick={()=>setMenuOpen(o=>!o)} style={{background:"transparent",border:`1px solid rgba(107,132,176,.3)`,borderRadius:6,padding:"5px 9px",cursor:"pointer",color:C.tx,fontSize:16,marginLeft:4}}>{menuOpen?"✕":"☰"}</button>
              :<div style={{display:"flex",gap:18,marginLeft:16}}>{t.nav.map((n,i)=>(<a key={i} href={`#${navIds[i]}`} style={{color:C.mu,fontSize:12,textDecoration:"none",fontWeight:600,transition:"color .2s"}} onMouseOver={e=>e.target.style.color=C.cyan} onMouseOut={e=>e.target.style.color=C.mu}>{n}</a>))}</div>}
          </div>
        </div>
        {mob&&menuOpen&&(<div style={{borderTop:`1px solid rgba(0,229,255,.07)`,padding:"10px 16px",background:"rgba(6,9,18,.97)"}}>{t.nav.map((n,i)=>(<a key={i} href={`#${navIds[i]}`} onClick={()=>setMenuOpen(false)} style={{color:C.mu,fontSize:14,textDecoration:"none",fontWeight:600,padding:"11px 4px",borderBottom:`1px solid rgba(30,45,69,.5)`,display:"block",textAlign:rtl?"right":"left",fontFamily:t.ff}}>{n}</a>))}</div>)}
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100svh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",position:"relative",zIndex:1,paddingTop:56,paddingBottom:24}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 55% 45%,rgba(0,100,180,.1) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{fontFamily:t.ff,padding:`0 ${px}px`,width:"100%",maxWidth:660,position:"relative",direction:t.dir}}>
          <div style={{marginBottom:14,animation:"fadeUp .8s ease .1s both"}}><span style={{color:C.cyan,fontSize:sm?11:13,fontWeight:700,letterSpacing:4,textTransform:"uppercase",borderBottom:`1px solid rgba(0,229,255,.3)`,paddingBottom:4}}>{t.hi}</span></div>
          <h1 onMouseEnter={()=>{setNameGlitch(true);setTimeout(()=>setNameGlitch(false),500);}}
            style={{fontFamily:hf,fontSize:sm?36:mob?50:72,fontWeight:800,margin:"0 0 12px",lineHeight:1.08,background:`linear-gradient(135deg,#E8F2FF 0%,${C.cyan} 50%,${C.vio} 100%)`,backgroundSize:"200% 200%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:`gradShift 6s ease infinite, fadeUp .9s ease .2s both${nameGlitch?", glitch .5s steps(1) both":""}`,cursor:"default"}}>{t.nm}</h1>
          <div style={{height:mob?40:54,marginBottom:18,display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeUp .9s ease .4s both"}}>
            <p style={{color:C.cyan,fontSize:mob?17:26,fontWeight:700,fontFamily:hf,margin:0}}>{typed}<span style={{animation:"blink 1s step-end infinite",color:C.cyan}}>|</span></p>
          </div>
          <p style={{color:C.mu,fontSize:mob?13:15,marginBottom:38,lineHeight:1.65,animation:"fadeUp .9s ease .5s both"}}>{t.sub}</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",animation:"fadeUp .9s ease .6s both"}}>
            <a href="#work" style={{background:`linear-gradient(135deg,${C.cyan},${C.vio})`,color:C.bg,padding:mob?"12px 22px":"13px 30px",borderRadius:8,fontWeight:700,textDecoration:"none",fontSize:mob?13:14,fontFamily:t.ff,boxShadow:`0 4px 24px rgba(0,229,255,.25)`,transition:"transform .25s,box-shadow .25s"}} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.02)";e.currentTarget.style.boxShadow=`0 10px 36px rgba(0,229,255,.45)`;}} onMouseOut={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 4px 24px rgba(0,229,255,.25)`;}}>{t.c1}</a>
            <a href="#contact" style={{border:`1px solid rgba(0,229,255,.35)`,color:C.tx,padding:mob?"12px 22px":"13px 30px",borderRadius:8,fontWeight:600,textDecoration:"none",fontSize:mob?13:14,fontFamily:t.ff,backdropFilter:"blur(10px)",transition:"all .25s"}} onMouseOver={e=>{e.currentTarget.style.borderColor=C.cyan;e.currentTarget.style.background="rgba(0,229,255,.07)";e.currentTarget.style.transform="translateY(-3px)";}} onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(0,229,255,.35)";e.currentTarget.style.background="transparent";e.currentTarget.style.transform="none";}}>{t.c2}</a>
          </div>
          <div style={{marginTop:mob?52:76,color:C.mu,fontSize:22,animation:"bounce 2.5s ease-in-out infinite"}}>↓</div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={glassSec("rgba(13,18,32,.88)")}>
        <div style={inner} ref={aboutRef}>
          <SplitTitle txt={t.aT} v={aboutV} rtl={rtl} mob={mob} hf={hf}/>
          <div style={{display:"grid",gridTemplateColumns:`repeat(${mob?2:4},1fr)`,gap:mob?10:16,marginBottom:mob?28:40,...up(aboutV,50)}}>
            {t.stats.map((s,i)=>(<div key={i} style={{background:"rgba(15,24,38,.85)",backdropFilter:"blur(12px)",border:`1px solid rgba(0,229,255,.15)`,borderRadius:12,padding:mob?"14px 10px":"18px",textAlign:"center"}}>
              <div style={{fontFamily:hf,fontSize:mob?28:36,fontWeight:800,background:`linear-gradient(135deg,${C.cyan},${C.vio})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",lineHeight:1}}><CountUp to={s.n} suffix={s.s} v={aboutV} delay={i*150}/></div>
              <div style={{color:C.mu,fontSize:mob?11:12,marginTop:4,fontWeight:600}}>{s.l}</div>
            </div>))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"3fr 2fr",gap:mob?24:52,alignItems:"start"}}>
            <div style={wipeUp(aboutV,200)}>
              <p style={{color:C.mu,lineHeight:1.88,fontSize:mob?14:15,marginBottom:22}}>{t.aB}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:22}}>{SKILLS.map((s,i)=>(<span key={s} style={{background:"rgba(123,97,255,.12)",color:C.vio,fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:20,...scale(aboutV,320+i*35)}}>{s}</span>))}</div>
              <div style={{display:"flex",flexDirection:"column",gap:9}}>
                <span style={{color:C.mu,fontSize:13}}>📍 Vancouver, BC & Tira, Israel</span>
                <a href="mailto:ezoprmk@gmail.com" style={{color:C.cyan,fontSize:13,textDecoration:"none"}}>✉️ ezoprmk@gmail.com</a>
                <a href="https://linkedin.com/in/moataz-samara-ab21651b6/" target="_blank" style={{color:C.cyan,fontSize:13,textDecoration:"none"}}>🔗 LinkedIn</a>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:mob?"row":"column",flexWrap:mob?"wrap":"nowrap",gap:8,...side(aboutV,300,rtl?-1:1)}}>
              {[["Arabic / عربي","Native",C.cyan],["Hebrew / עברית","Fluent",C.cyan],["English","Fluent",C.cyan],["Albanian","Basic",C.mu]].map(([l,r,col],i)=>(<div key={l} style={{background:"rgba(15,24,38,.9)",backdropFilter:"blur(12px)",border:`1px solid ${C.brd}`,borderRadius:10,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flex:mob?"1 1 calc(50% - 4px)":"auto",minWidth:0,...scale(aboutV,380+i*60)}}><span style={{color:C.tx,fontWeight:600,fontSize:12}}>{l}</span><span style={{color:col,fontSize:11,fontWeight:700,marginLeft:4,flexShrink:0}}>{r}</span></div>))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={glassSec()}>
        <div style={inner} ref={servRef}>
          <SplitTitle txt={t.sT} v={servV} rtl={rtl} mob={mob} hf={hf}/>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(3,1fr)",gap:mob?12:16}}>
            {SV[lang].map((s,i)=>(<div key={i} style={scale(servV,i*90)}><Glass onMouseMove={tilt} onMouseLeave={untilt} onMouseOver={e=>e.currentTarget.style.borderColor=C.cyan} onMouseOut={e=>e.currentTarget.style.borderColor=C.brd}><div style={{fontSize:mob?24:30}}>{s.i}</div><h3 style={{color:C.tx,fontFamily:hf,fontWeight:700,fontSize:mob?13:16,margin:0,lineHeight:1.3}}>{s.t}</h3><p style={{color:C.mu,fontSize:mob?11:13,lineHeight:1.65,margin:0}}>{s.d}</p></Glass></div>))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={glassSec("rgba(13,18,32,.88)")}>
        <div style={inner} ref={workRef}>
          <SplitTitle txt={t.wT} v={workV} rtl={rtl} mob={mob} hf={hf}/>
          <div style={{display:"flex",gap:8,marginBottom:28,overflowX:"auto",paddingBottom:4,WebkitOverflowScrolling:"touch",scrollbarWidth:"none",...up(workV,80)}}>
            {CATS.map((c,i)=>(<button key={c} onClick={()=>setCat(c)} style={{background:cat===c?`linear-gradient(135deg,${C.cyan},${C.vio})`:"transparent",color:cat===c?C.bg:C.mu,border:`1px solid ${cat===c?C.cyan:C.brd}`,borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",fontWeight:700,whiteSpace:"nowrap",fontFamily:t.ff,flexShrink:0,transition:"all .25s",...scale(workV,i*50)}}>{CL[lang][c]}</button>))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:mob?12:16}}>
            {filtered.map((p,i)=>(<div key={i} style={mob?up(workV,i*55):side(workV,i*50,i%2===0?-1:1)}><Glass onMouseMove={tilt} onMouseLeave={untilt} style={{height:"100%"}} onMouseOver={e=>e.currentTarget.style.borderColor=C.cyan} onMouseOut={e=>e.currentTarget.style.borderColor=C.brd}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><Tag label={CL[lang][p.cat]||p.cat}/>{p.url&&<a href={p.url} target="_blank" style={{color:C.mu,fontSize:17,textDecoration:"none",transition:"color .2s"}} onMouseOver={e=>e.target.style.color=C.cyan} onMouseOut={e=>e.target.style.color=C.mu}>↗</a>}</div><h3 style={{color:C.tx,fontFamily:hf,fontWeight:700,fontSize:mob?14:15,margin:0}}>{p.title}</h3><p style={{color:C.mu,fontSize:mob?12:13,lineHeight:1.6,flex:1,margin:0}}>{p.desc}</p><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{p.tags.map(tg=><Tag key={tg} label={tg} color={C.vio}/>)}</div></Glass></div>))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" style={glassSec()}>
        <div style={inner} ref={tlRef}>
          <SplitTitle txt={t.tT} v={tlV} rtl={rtl} mob={mob} hf={hf}/>
          {mob?(
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {TL.map((item,i)=><TLItem key={i} item={item} i={i} rtl={rtl} hf={hf} wk={t.wk} ed={t.ed} mob={true}/>)}
            </div>
          ):(
            <div ref={tlContainerRef} style={{position:"relative"}}>
              <TimelineLineDraw containerRef={tlContainerRef} rtl={rtl}/>
              {TL.map((item,i)=><TLItem key={i} item={item} i={i} rtl={rtl} hf={hf} wk={t.wk} ed={t.ed} mob={false}/>)}
            </div>
          )}
        </div>
      </section>

      {/* GITHUB */}
      <section id="github" style={glassSec("rgba(13,18,32,.88)")}>
        <div style={inner} ref={ghRef}>
          <SplitTitle txt={t.gT} v={ghV} rtl={rtl} mob={mob} hf={hf}/>
          {ghs==="loading"?<p style={{color:C.mu}}>{t.gL}</p>:ghs==="ok"?(
            <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:mob?12:16,marginBottom:28}}>
              {repos.map((r,i)=>(<div key={i} style={scale(ghV,i*70)}><a href={r.html_url} target="_blank" style={{textDecoration:"none",display:"block"}}><Glass onMouseMove={tilt} onMouseLeave={untilt} onMouseOver={e=>e.currentTarget.style.borderColor=C.cyan} onMouseOut={e=>e.currentTarget.style.borderColor=C.brd}><div style={{display:"flex",justifyContent:"space-between"}}><h3 style={{color:C.tx,fontFamily:hf,fontWeight:700,fontSize:13,margin:0,wordBreak:"break-word"}}>{r.name}</h3><span style={{color:C.mu,fontSize:15,flexShrink:0}}>↗</span></div><p style={{color:C.mu,fontSize:12,lineHeight:1.55,flex:1,margin:0}}>{r.description||"—"}</p><div style={{display:"flex",gap:12}}>{r.language&&<span style={{color:C.cyan,fontSize:11,fontWeight:600}}>● {r.language}</span>}<span style={{color:C.mu,fontSize:11}}>⭐ {r.stargazers_count}</span></div></Glass></a></div>))}
            </div>
          ):(
            <div style={{background:"rgba(15,24,38,.85)",border:`1px solid ${C.brd}`,borderRadius:12,padding:"28px",textAlign:"center",marginBottom:28}}><p style={{color:C.mu,fontSize:14,marginBottom:6}}>{t.gE}</p><code style={{color:C.cyan,fontSize:12}}>{GH}</code></div>
          )}
          <div style={{textAlign:"center",...up(ghV,400)}}><a href={`https://github.com/${GH}`} target="_blank" style={{border:`1px solid rgba(0,229,255,.3)`,color:C.tx,padding:mob?"10px 20px":"11px 26px",borderRadius:8,textDecoration:"none",fontSize:13,fontWeight:600,fontFamily:t.ff,display:"inline-block",backdropFilter:"blur(10px)",transition:"all .25s"}} onMouseOver={e=>{e.currentTarget.style.borderColor=C.cyan;e.currentTarget.style.background="rgba(0,229,255,.07)";e.currentTarget.style.transform="translateY(-2px)";}} onMouseOut={e=>{e.currentTarget.style.borderColor="rgba(0,229,255,.3)";e.currentTarget.style.background="transparent";e.currentTarget.style.transform="none";}}>{t.gV}</a></div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={glassSec()}>
        <div style={inner} ref={contactRef}>
          <div style={{maxWidth:540,margin:"0 auto",textAlign:"center"}}>
            <SplitTitle txt={t.cT} v={contactV} rtl={rtl} mob={mob} hf={hf}/>
            <p style={{color:C.mu,marginBottom:26,lineHeight:1.8,fontSize:mob?14:15,...up(contactV,150)}}>{t.cS}</p>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:22,textAlign:rtl?"right":"left"}}>
              {[{ph:t.nP,k:"n",type:"text"},{ph:t.eP,k:"e",type:"email"}].map((f,i)=>(<div key={f.k} style={side(contactV,200+i*80,i%2===0?-1:1)}><input type={f.type} placeholder={f.ph} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} style={{background:"rgba(15,24,38,.9)",backdropFilter:"blur(12px)",border:`1px solid ${C.brd}`,borderRadius:8,padding:"13px 14px",color:C.tx,fontSize:14,fontFamily:t.ff,outline:"none",direction:t.dir,width:"100%",boxSizing:"border-box",transition:"border-color .2s,box-shadow .2s"}} onFocus={e=>{e.target.style.borderColor=C.cyan;e.target.style.boxShadow=`0 0 0 3px rgba(0,229,255,.08)`;}} onBlur={e=>{e.target.style.borderColor=C.brd;e.target.style.boxShadow="none";}}/></div>))}
              <div style={wipeUp(contactV,360)}><textarea placeholder={t.mP} rows={4} value={form.m} onChange={e=>setForm({...form,m:e.target.value})} style={{background:"rgba(15,24,38,.9)",backdropFilter:"blur(12px)",border:`1px solid ${C.brd}`,borderRadius:8,padding:"13px 14px",color:C.tx,fontSize:14,fontFamily:t.ff,resize:"vertical",outline:"none",direction:t.dir,width:"100%",boxSizing:"border-box",transition:"border-color .2s,box-shadow .2s"}} onFocus={e=>{e.target.style.borderColor=C.cyan;e.target.style.boxShadow=`0 0 0 3px rgba(0,229,255,.08)`;}} onBlur={e=>{e.target.style.borderColor=C.brd;e.target.style.boxShadow="none";}}/></div>
              <div style={up(contactV,440)}><button onClick={()=>setSent(true)} style={{background:`linear-gradient(135deg,${C.cyan},${C.vio})`,color:C.bg,padding:"14px",borderRadius:8,border:"none",fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:t.ff,boxShadow:"0 4px 20px rgba(0,229,255,.2)",transition:"transform .25s,box-shadow .25s",width:"100%"}} onMouseOver={e=>{e.target.style.transform="translateY(-2px)";e.target.style.boxShadow="0 10px 30px rgba(0,229,255,.4)";}} onMouseOut={e=>{e.target.style.transform="none";e.target.style.boxShadow="0 4px 20px rgba(0,229,255,.2)";}}>{sent?"✓":t.sb}</button></div>
              {sent&&<p style={{color:C.gr,fontSize:12,textAlign:"center",animation:"fadeUp .5s ease both"}}>Message received! Connect to Formspree or EmailJS to go live.</p>}
            </div>
            <div style={{display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap",...up(contactV,500)}}>
              {[["✉️","Email","mailto:ezoprmk@gmail.com"],["🔗","LinkedIn","https://linkedin.com/in/moataz-samara-ab21651b6/"],["📞","Call","tel:+972507845633"]].map(([icon,label,href])=>(<a key={label} href={href} target={href.startsWith("http")?"_blank":"_self"} style={{color:C.cyan,textDecoration:"none",fontSize:14,fontWeight:600,transition:"transform .2s,text-shadow .2s"}} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.textShadow=`0 0 12px ${C.cyan}`;}} onMouseOut={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.textShadow="none";}}>{icon} {label}</a>))}
            </div>
          </div>
        </div>
      </section>

      <footer style={{background:"rgba(6,9,18,.95)",borderTop:`1px solid rgba(0,229,255,.07)`,padding:"24px",textAlign:"center",fontFamily:t.ff,position:"relative",zIndex:1}}>
        <p style={{color:C.mu,fontSize:12,margin:0}}>© 2026 Moataz Samara · EZO Agency</p>
      </footer>

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::-webkit-scrollbar{display:none}
        @keyframes nb1{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.1) translate(25px,-18px)}}
        @keyframes nb2{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.08) translate(-18px,22px)}}
        @keyframes nb3{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.12) translate(12px,28px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(9px)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes glitch{0%{transform:translate(0);filter:none}20%{transform:translate(-4px,2px);filter:hue-rotate(90deg) brightness(1.3)}40%{transform:translate(4px,-2px);filter:hue-rotate(200deg)}60%{transform:translate(-3px,1px);filter:hue-rotate(270deg)}80%{transform:translate(3px,-1px);filter:brightness(1.4)}100%{transform:translate(0);filter:none}}
        @keyframes sonar{0%{transform:translate(-50%,0) scale(1);opacity:.65}100%{transform:translate(-50%,0) scale(4);opacity:0}}
        @keyframes scanOnce{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
      `}</style>
    </div>
  );
}
