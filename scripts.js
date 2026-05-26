/* ============================================================
   Cielo Estrellado Solis — Scripts
   Autor: Ing. Jaime Torres
   ============================================================ */

/* COSMOS */
const cv=document.getElementById('cosmos'),cx=cv.getContext('2d');
let W,H,stars=[],nebs=[],shoots=[],t=0;
function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight;}
resize();addEventListener('resize',resize);
const sc=['#fff','#C084FC','#818CF8','#22D3EE','#F472B6','#A78BFA'];
function mkS(){return{x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.2,sp:Math.random()*.5+.04,ph:Math.random()*Math.PI*2,col:sc[Math.floor(Math.random()*sc.length)]};}
function mkN(){return{x:Math.random()*W,y:Math.random()*H,r:Math.random()*200+80,col:Math.random()>.5?[124,58,237]:[192,38,211],ph:Math.random()*Math.PI*2,sp:Math.random()*.003+.001};}
function mkSh(){return{x:Math.random()*W*.8,y:Math.random()*H*.4,dx:2+Math.random()*4,dy:1+Math.random()*2.5,len:0,max:140+Math.random()*140,done:false};}
for(let i=0;i<350;i++)stars.push(mkS());
for(let i=0;i<6;i++)nebs.push(mkN());
function draw(){
  cx.clearRect(0,0,W,H);t+=.012;
  nebs.forEach(n=>{const p=.04+.03*Math.sin(t*n.sp*60+n.ph);const g=cx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);g.addColorStop(0,`rgba(${n.col[0]},${n.col[1]},${n.col[2]},${p})`);g.addColorStop(1,'rgba(0,0,0,0)');cx.beginPath();cx.arc(n.x,n.y,n.r,0,Math.PI*2);cx.fillStyle=g;cx.globalAlpha=1;cx.fill();});
  stars.forEach(s=>{const f=.25+.75*Math.abs(Math.sin(t*s.sp+s.ph));cx.beginPath();cx.arc(s.x,s.y,s.r,0,Math.PI*2);cx.fillStyle=s.col;cx.globalAlpha=f;cx.fill();});
  if(Math.random()<.006&&shoots.length<4)shoots.push(mkSh());
  shoots=shoots.filter(s=>!s.done);
  shoots.forEach(s=>{s.len+=13;if(s.len>=s.max){s.done=true;return;}const op=1-s.len/s.max;const ex=s.x+s.dx*(s.len/13),ey=s.y+s.dy*(s.len/13);cx.beginPath();cx.moveTo(s.x,s.y);cx.lineTo(ex,ey);const g=cx.createLinearGradient(s.x,s.y,ex,ey);g.addColorStop(0,'rgba(167,139,250,0)');g.addColorStop(.5,`rgba(255,255,255,${op*.8})`);g.addColorStop(1,`rgba(255,255,255,${op})`);cx.strokeStyle=g;cx.lineWidth=1.6;cx.globalAlpha=op;cx.stroke();});
  cx.globalAlpha=1;requestAnimationFrame(draw);
}
draw();

/* PARTICLES */
(function(){const w=document.getElementById('ptcls');const c=['var(--neon-purple)','var(--neon-blue)','var(--violet)','#fff','var(--gold)'];for(let i=0;i<55;i++){const p=document.createElement('div');p.className='particle';const sz=Math.random()*4+1,col=c[Math.floor(Math.random()*c.length)];p.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;background:${col};box-shadow:0 0 ${sz*3}px ${col};--pd:${14+Math.random()*20}s;--pdl:${Math.random()*14}s;--dx:${(Math.random()-.5)*80}px;z-index:0;`;w.appendChild(p);}})();

/* VIDEO */
/* línea 32 */
function toggleVid(btn){
  const vw=btn.closest('.vid-wrap'),vid=vw.querySelector('.vid-player'),ov=vw.querySelector('.vid-ov'),ic=btn.querySelector('i');
  if(vid.paused){
    document.querySelectorAll('.vid-player').forEach(v=>{
      if(v!==vid){
        v.pause();
        const b=v.closest('.vid-wrap').querySelector('.play-btn');
        const o=v.closest('.vid-wrap').querySelector('.vid-ov');
        if(b){b.classList.remove('playing');b.querySelector('i').className='fa-solid fa-play';}
        if(o){o.classList.remove('hidden');}
      }
    });
    vid.play();btn.classList.add('playing');ov.classList.add('hidden');ic.className='fa-solid fa-pause';
  }else{
    vid.pause();btn.classList.remove('playing');ov.classList.remove('hidden');ic.className='fa-solid fa-play';
  }
}
/* línea 33 */
const vObs=new IntersectionObserver(e=>{e.forEach(x=>{if(!x.isIntersecting){const v=x.target;v.pause();const b=v.closest('.vid-wrap')?.querySelector('.play-btn');const o=v.closest('.vid-wrap')?.querySelector('.vid-ov');if(b){b.classList.remove('playing');b.querySelector('i').className='fa-solid fa-play';}if(o){o.classList.remove('hidden');}}});},{threshold:.2});
document.querySelectorAll('.vid-player').forEach(v=>vObs.observe(v));

/* REVEAL */
const ro=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('show');});},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
