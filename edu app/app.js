// ═══════════════════════════════════════
//  EduReyting — app.js
//  Yaratuvchi: Abdug'aniyev Asilbek
// ═══════════════════════════════════════

const ADMIN_CODE = "asilbek10";
const CREATOR    = "Abdug'aniyev Asilbek";
const AVATARS    = ["🧑‍🎓","👩‍🎓","🧒","👧","🦸","🧑‍💻","👨‍🔬","👩‍🔬","🧑‍🏫","👩‍🏫","🧑‍🎨","🦊"];

// ── LOCAL STORAGE ──
const LS = {
  get:(k,d=null)=>{try{const v=localStorage.getItem(k);return v!==null?JSON.parse(v):d;}catch{return d;}},
  set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}},
  del:(k)=>{try{localStorage.removeItem(k);}catch{}}
};

// ── STATE ──
let ST = {
  user:null, picks:[], fanIdx:0, scores:[0,0],
  qIdx:0, answered:[], testResult:null,
  timerSec:0, timerInt:null, testStartTime:null,
  chatRoom:"general", ratingTab:"uzbekistan", adminMode:false
};

// ══════════════════════════════════════
//  INIT
// ══════════════════════════════════════
window.addEventListener('DOMContentLoaded',()=>{
  buildRegionSelects();
  buildSubjectGrid();

  const saved = LS.get('edu_user');
  if(saved){ ST.user=saved; afterLogin(); }
  else showLoggedOut();

  setTimeout(()=>{
    const sp=document.getElementById('splash');
    sp.classList.add('out');
    setTimeout(()=>{ sp.style.display='none'; document.getElementById('app').classList.remove('hidden'); },650);
  }, 2600);

  if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
});

// ══════════════════════════════════════
//  NAV
// ══════════════════════════════════════
function switchTab(tab){
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id==='page-'+tab));
  if(tab==='rating') loadRating(ST.ratingTab);
  if(tab==='chat')   initChat();
  if(tab==='home')   refreshHome();
  if(tab==='profile') refreshProfile();
}

// ══════════════════════════════════════
//  AUTH
// ══════════════════════════════════════
function switchAuth(mode){
  document.querySelectorAll('.atab').forEach(t=>t.classList.toggle('active',t.dataset.mode===mode));
  document.getElementById('auth-login').classList.toggle('hidden',mode!=='login');
  document.getElementById('auth-register').classList.toggle('hidden',mode!=='register');
}

function doLogin(){
  const email=v('l-email').trim(), pass=v('l-pass');
  const err=document.getElementById('l-err');
  if(!email||!pass){showErr(err,"Email va parolni kiriting!");return;}
  const users=LS.get('edu_users',[]);
  const u=users.find(x=>x.email===email&&x.pass===pass);
  if(u){ST.user=u;LS.set('edu_user',u);afterLogin();}
  else showErr(err,"❌ Email yoki parol noto'g'ri!");
}

function doForgot(){
  const email=v('l-email').trim();
  if(!email){alert("Emailingizni kiriting!");return;}
  const users=LS.get('edu_users',[]);
  const u=users.find(x=>x.email===email);
  if(!u){alert("Bu email ro'yxatda yo'q!");return;}
  const newPass=prompt("Yangi parolni kiriting (kamida 6 belgi):");
  if(!newPass||newPass.length<6){alert("Parol juda qisqa!");return;}
  u.pass=newPass;
  const idx=users.findIndex(x=>x.email===email);
  users[idx]=u; LS.set('edu_users',users);
  if(ST.user&&ST.user.email===email){ST.user=u;LS.set('edu_user',u);}
  alert("✅ Parol muvaffaqiyatli o'zgartirildi! Endi yangi parol bilan kiring.");
}

function doRegister(){
  const name  = v('r-name').trim();
  const email = v('r-email').trim();
  const pass  = v('r-pass');
  const grade = v('r-grade');
  const cls   = v('r-cls').trim();
  const region  = v('r-region');
  const district= v('r-district');
  const schoolSel = v('r-school-sel');
  const school = schoolSel==="Boshqa (qo'lda kiriting)"
                  ? v('r-school-custom').trim() : schoolSel;
  const err=document.getElementById('r-err');

  if(!name||!email||!pass||!grade||!cls||!region||!district||!school){
    showErr(err,"⚠️ Barcha maydonlarni to'ldiring!"); return;}
  if(pass.length<6){showErr(err,"🔒 Parol kamida 6 ta belgi bo'lishi kerak!"); return;}

  const users=LS.get('edu_users',[]);
  if(users.find(x=>x.email===email)){showErr(err,"📧 Bu email allaqachon ro'yxatdan o'tgan!"); return;}

  const uid='u_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);
  const avatar=AVATARS[Math.floor(Math.random()*AVATARS.length)];
  const u={uid,email,pass,name,grade:+grade,cls,region,district,school,avatar,
    totalScore:0,testCount:0,history:[],createdAt:Date.now()};
  users.push(u);
  LS.set('edu_users',users);
  LS.set('edu_user',u);
  ST.user=u;

  // Maktab reyting
  const schools=LS.get('edu_schools',{});
  const sk=ek(school);
  if(!schools[sk]) schools[sk]={name:school,region,district,totalScore:0,testCount:0,studentCount:0};
  schools[sk].studentCount++;
  LS.set('edu_schools',schools);

  afterLogin();
}

function doLogout(){
  if(!confirm("Hisobdan chiqmoqchimisiz?"))return;
  ST.user=null; LS.del('edu_user');
  showLoggedOut(); switchTab('home');
}

function afterLogin(){
  buildSubjectGrid();
  document.getElementById('auth-panel').classList.add('hidden');
  document.getElementById('logged-panel').classList.remove('hidden');
  refreshHome(); refreshProfile();
}
function showLoggedOut(){
  document.getElementById('auth-panel').classList.remove('hidden');
  document.getElementById('logged-panel').classList.add('hidden');
}

// ══════════════════════════════════════
//  HOME
// ══════════════════════════════════════
function refreshHome(){
  const u=ST.user;
  if(!u){
    set('hh-name',"O'quvchi"); set('hh-greet',"Xush kelibsiz!");
    set('hh-school',"Kirish uchun Profil bo'limiga o'ting");
    set('hh-ava',"👤"); return;
  }
  const h=new Date().getHours();
  set('hh-greet', h<12?"☀️ Xayrli tong,":h<17?"🌤️ Xayrli kun,":"🌙 Xayrli kech,");
  set('hh-name', u.name);
  set('hh-school', `🏫 ${u.school} | ${u.grade}-sinf ${u.cls} | ${u.district}`);
  set('hh-ava', u.avatar||"🧑‍🎓");
  set('st-score', u.totalScore||0);
  set('st-tests', u.testCount||0);

  const users=getAllUsers();
  const rank=users.findIndex(x=>x.uid===u.uid);
  set('st-rank', rank>=0?'#'+(rank+1):'—');
  set('my-rank', rank>=0?'#'+(rank+1):'—');

  const schools=getSchoolsArr();
  const srank=schools.findIndex(s=>s.name===u.school);
  set('st-srank', srank>=0?'#'+(srank+1):'—');

  renderTop3();
}

function renderTop3(){
  const el=document.getElementById('home-top3');
  const users=getAllUsers().slice(0,3);
  const medals=['🥇','🥈','🥉'];
  if(!users.length){el.innerHTML='<p style="color:var(--muted);text-align:center;padding:18px;font-size:.82rem">Hali ishtirokchi yo\'q</p>';return;}
  el.innerHTML=users.map((u,i)=>`
    <div class="t3item">
      <div class="t3rank">${medals[i]}</div>
      <div class="t3info">
        <div class="t3name">${u.avatar||'🧑‍🎓'} ${u.name}</div>
        <div class="t3meta">${u.school||''} · ${u.grade||9}-sinf ${u.cls||''}</div>
      </div>
      <div class="t3score">${u.totalScore||0}</div>
    </div>`).join('');
}

// ══════════════════════════════════════
//  SUBJECT GRID
// ══════════════════════════════════════
function buildSubjectGrid(){
  const grade = ST.user ? ST.user.grade : (parseInt(v('r-grade'))||9);
  const subjects = GRADE_SUBJECTS[grade]||GRADE_SUBJECTS[9];
  const grid=document.getElementById('subj-grid');
  if(!grid)return;
  grid.innerHTML=subjects.map(s=>`
    <div class="scard" data-name="${s}" onclick="toggleSubj(this,'${s.replace(/'/g,"\\'")}')">
      <div class="scard-i">${SUBJECT_ICONS[s]||'📚'}</div>
      <div class="scard-n">${s}</div>
    </div>`).join('');
  ST.picks=[];
  set('pick-cnt','0');
  document.getElementById('btn-begin').disabled=true;
}

function toggleSubj(el,name){
  const idx=ST.picks.indexOf(name);
  if(idx>=0){ST.picks.splice(idx,1);el.classList.remove('sel');}
  else{
    if(ST.picks.length>=2)return;
    ST.picks.push(name); el.classList.add('sel');
  }
  set('pick-cnt',ST.picks.length);
  document.querySelectorAll('.scard:not(.sel)').forEach(c=>c.classList.toggle('locked',ST.picks.length>=2));
  document.getElementById('btn-begin').disabled=ST.picks.length!==2;
}

// ══════════════════════════════════════
//  GEO
// ══════════════════════════════════════
function buildRegionSelects(){
  const rs=document.getElementById('r-region');
  if(!rs)return;
  rs.innerHTML='<option value="">Viloyat / Shahar tanlang...</option>';
  Object.keys(GEO).forEach(r=>rs.innerHTML+=`<option value="${r}">${r}</option>`);
}

function onRegionChange(){
  const region=v('r-region');
  const ds=document.getElementById('r-district');
  const ss=document.getElementById('r-school-sel');
  ds.innerHTML='<option value="">Tuman / Shahar tanlang...</option>';
  ss.innerHTML='<option value="">Avval tumanni tanlang...</option>';
  document.getElementById('r-school-custom-row').classList.add('hidden');
  if(!region)return;
  (GEO[region]?.districts||[]).forEach(d=>ds.innerHTML+=`<option value="${d}">${d}</option>`);
  ds.disabled=false;
}

function onDistrictChange(){
  const region=v('r-region'), district=v('r-district');
  const ss=document.getElementById('r-school-sel');
  ss.innerHTML='<option value="">Maktab tanlang...</option>';
  if(!district)return;
  getSchools(region,district).forEach(s=>ss.innerHTML+=`<option value="${s}">${s}</option>`);
  ss.disabled=false;
}

function onSchoolChange(){
  document.getElementById('r-school-custom-row').classList.toggle('hidden',v('r-school-sel')!=="Boshqa (qo'lda kiriting)");
}

// ══════════════════════════════════════
//  TEST
// ══════════════════════════════════════
function showTV(id){
  ['tv-select','tv-play','tv-mid','tv-result'].forEach(x=>document.getElementById(x).classList.toggle('hidden',x!==id));
}

function beginTest(){
  if(!ST.user){alert("Test topshirish uchun avval ro'yxatdan o'ting!");switchTab('profile');return;}
  if(ST.picks.length!==2)return;
  ST.fanIdx=0; ST.scores=[0,0]; ST.qIdx=0; ST.answered=[];
  ST.timerSec=0; ST.testStartTime=Date.now();
  clearInterval(ST.timerInt);
  ST.timerInt=setInterval(()=>{
    ST.timerSec++;
    const m=Math.floor(ST.timerSec/60),s=ST.timerSec%60;
    set('tb-timer',`⏱ ${m}:${s<10?'0'+s:s}`);
  },1000);
  loadFan(0); showTV('tv-play');
}

function loadFan(fi){
  ST.fanIdx=fi; ST.qIdx=0; ST.answered=[];
  const fan=ST.picks[fi];
  set('tb-fan',`${SUBJECT_ICONS[fan]||'📝'} Fan ${fi+1}/2`);
  set('tb-pts',`${ST.scores[fi]} ball`);
  renderDots(); renderQ();
}

function renderDots(){
  const wrap=document.getElementById('t-dots');
  wrap.innerHTML='';
  for(let i=0;i<10;i++){
    const d=document.createElement('div');
    d.className='td'+(ST.answered[i]===true?' ok':ST.answered[i]===false?' no':i===ST.qIdx?' cur':'');
    d.textContent=i+1; wrap.appendChild(d);
  }
}

function renderQ(){
  const fan=ST.picks[ST.fanIdx];
  const qs=(QUESTIONS[fan]||[]);
  if(!qs[ST.qIdx])return;
  const q=qs[ST.qIdx];
  set('t-label',`Savol ${ST.qIdx+1} / 10`);
  document.getElementById('t-prog').style.width=((ST.qIdx+1)/10*100)+'%';
  set('t-qtext',q.q);
  const fb=document.getElementById('t-fb'); fb.className='qfb hidden'; fb.innerHTML='';
  document.getElementById('btn-next').classList.add('hidden');
  const LT=['A','B','C','D'];
  document.getElementById('t-opts').innerHTML=q.o.map((o,i)=>`
    <div class="qopt" onclick="pickAns(${i},${q.a},this)">
      <div class="ql">${LT[i]}</div><div class="qt">${o}</div>
    </div>`).join('');
  renderDots();
}

function pickAns(chosen,correct,el){
  document.querySelectorAll('.qopt').forEach(o=>o.classList.add('locked'));
  const ok=chosen===correct;
  el.classList.add(ok?'correct':'wrong');
  if(!ok) document.querySelectorAll('.qopt')[correct].classList.add('correct');
  if(ok) ST.scores[ST.fanIdx]++;
  ST.answered[ST.qIdx]=ok;
  const LT=['A','B','C','D'];
  const q=(QUESTIONS[ST.picks[ST.fanIdx]]||[])[ST.qIdx];
  const fb=document.getElementById('t-fb');
  fb.className='qfb '+(ok?'ok':'no');
  fb.innerHTML=ok?'✅ To\'g\'ri javob!':`❌ Noto'g'ri! To'g'ri: <b>${LT[correct]}. ${q.o[correct]}</b>`;
  set('tb-pts',`${ST.scores[ST.fanIdx]} ball`);
  renderDots();
  const btn=document.getElementById('btn-next'); btn.classList.remove('hidden');
  const isLast=ST.qIdx===9;
  btn.textContent=isLast&&ST.fanIdx===0?'Davom etish →':isLast&&ST.fanIdx===1?'Natijani ko\'rish →':'Keyingisi →';
}

function nextQ(){
  ST.qIdx++;
  if(ST.qIdx<10){renderQ();return;}
  if(ST.fanIdx===0){
    set('mid-ttl',`${SUBJECT_ICONS[ST.picks[0]]||'📝'} ${ST.picks[0]}`);
    set('mid-sc',`${ST.scores[0]} / 10`);
    set('mid-msg',ST.scores[0]>=7?'🌟 Ajoyib natija!':'💪 Yaxshi harakat!');
    showTV('tv-mid');
  } else { finishTest(); }
}

function continueTest(){
  loadFan(1); showTV('tv-play');
}

function finishTest(){
  clearInterval(ST.timerInt);
  const total=ST.scores[0]+ST.scores[1], pct=Math.round(total/20*100);
  const elapsed=Math.round((Date.now()-ST.testStartTime)/1000);
  const mm=Math.floor(elapsed/60), ss=elapsed%60;
  ST.testResult={total,pct,elapsed,fans:[...ST.picks],scores:[...ST.scores]};

  set('res-emo',pct>=90?'🏆':pct>=70?'🌟':pct>=50?'👍':'📚');
  set('res-ttl',pct>=90?'Mukammal!':pct>=70?'Ajoyib!':pct>=50?'Yaxshi!':'Davom eting!');
  set('res-sc',`${total}/20`);
  set('res-sub',`${pct}% to'g'ri · ${mm}:${ss<10?'0'+ss:ss} vaqt`);
  set('rg-s1',ST.scores[0]+'/10'); set('rg-l1',ST.picks[0]);
  set('rg-s2',ST.scores[1]+'/10'); set('rg-l2',ST.picks[1]);
  set('rg-pct',pct+'%'); set('rg-time',`${mm}:${ss<10?'0'+ss:ss}`);
  showTV('tv-result');

  if(ST.user){
    const u=ST.user;
    const hist={fans:ST.picks,scores:ST.scores,total,pct,date:new Date().toLocaleDateString('uz-UZ'),ts:Date.now()};
    const newData={totalScore:(u.totalScore||0)+total, testCount:(u.testCount||0)+1,
      history:[hist,...(u.history||[])].slice(0,20)};
    const users=LS.get('edu_users',[]);
    const idx=users.findIndex(x=>x.uid===u.uid);
    if(idx>=0){users[idx]={...users[idx],...newData};LS.set('edu_users',users);}
    ST.user={...u,...newData}; LS.set('edu_user',ST.user);

    // Maktab
    const schools=LS.get('edu_schools',{});
    const sk=ek(u.school);
    if(!schools[sk]) schools[sk]={name:u.school,region:u.region,district:u.district,totalScore:0,testCount:0,studentCount:0};
    schools[sk].totalScore=(schools[sk].totalScore||0)+total;
    schools[sk].testCount=(schools[sk].testCount||0)+1;
    LS.set('edu_schools',schools);

    // Top 3 check
    const rank=getAllUsers().findIndex(x=>x.uid===ST.user.uid);
    document.getElementById('btn-cert').classList.toggle('hidden',rank>=3);
    refreshHome(); refreshProfile();
  }
}

function resetTest(){ buildSubjectGrid(); showTV('tv-select'); }

// ══════════════════════════════════════
//  RATING
// ══════════════════════════════════════
function switchRating(tab){
  ST.ratingTab=tab;
  document.querySelectorAll('.rtab').forEach(t=>t.classList.toggle('active',t.dataset.rt===tab));
  loadRating(tab);
}

function loadRating(tab){
  const el=document.getElementById('rlist');
  el.innerHTML='<div class="ldots"><span></span><span></span><span></span></div>';
  setTimeout(()=>{
    if(tab==='uzbekistan') renderUsersRating(el);
    else if(tab==='school') renderSchoolRating(el);
    else renderSchoolsRating(el);
  },300);
}

function renderUsersRating(el){
  const users=getAllUsers();
  if(!users.length){el.innerHTML=empty("Hali ishtirokchi yo'q");return;}
  const medals=['🥇','🥈','🥉'];
  el.innerHTML=users.slice(0,50).map((u,i)=>{
    const isMe=ST.user&&u.uid===ST.user.uid;
    return `<div class="ritem${i<3?' r'+(i+1):''}${isMe?' me':''}">
      <div class="rrank">${i<3?medals[i]:'#'+(i+1)}</div>
      <div class="rinfo">
        <div class="rname">${u.avatar||'🧑‍🎓'} ${u.name}${isMe?'<span class="mechip">SIZ</span>':''}</div>
        <div class="rmeta">${u.school||'—'} · ${u.grade||9}-sinf ${u.cls||''} · ${u.district||''}</div>
      </div>
      <div class="rscore">${u.totalScore||0}</div>
    </div>`;}).join('');
}

function renderSchoolRating(el){
  if(!ST.user){el.innerHTML=empty("Reyting uchun kirish kerak");return;}
  const users=getAllUsers().filter(u=>u.school===ST.user.school);
  if(!users.length){el.innerHTML=empty("Maktabingizda boshqa o'quvchi yo'q");return;}
  const medals=['🥇','🥈','🥉'];
  el.innerHTML=`<div class="r-shdr">🏫 ${ST.user.school}</div>`+
    users.slice(0,30).map((u,i)=>{
      const isMe=u.uid===ST.user.uid;
      return `<div class="ritem${i<3?' r'+(i+1):''}${isMe?' me':''}">
        <div class="rrank">${i<3?medals[i]:'#'+(i+1)}</div>
        <div class="rinfo">
          <div class="rname">${u.avatar||'🧑‍🎓'} ${u.name}${isMe?'<span class="mechip">SIZ</span>':''}</div>
          <div class="rmeta">${u.grade||9}-sinf ${u.cls||''}</div>
        </div>
        <div class="rscore">${u.totalScore||0}</div>
      </div>`;}).join('');
}

function renderSchoolsRating(el){
  const schools=getSchoolsArr();
  if(!schools.length){el.innerHTML=empty("Hali maktab yo'q");return;}
  const medals=['🥇','🥈','🥉'];
  el.innerHTML=schools.slice(0,30).map((s,i)=>`
    <div class="ritem${i<3?' r'+(i+1):''}">
      <div class="rrank">${i<3?medals[i]:'#'+(i+1)}</div>
      <div class="rinfo">
        <div class="rname">🏫 ${s.name}</div>
        <div class="rmeta">${s.region||''} · ${s.district||''} · ${s.studentCount||0} o'quvchi</div>
      </div>
      <div class="rscore">${s.totalScore||0}</div>
    </div>`).join('');
}

// ══════════════════════════════════════
//  CHAT
// ══════════════════════════════════════
function initChat(){
  if(!ST.user){
    document.getElementById('chat-msgs').innerHTML=empty("Chat uchun avval ro'yxatdan o'ting");
    return;
  }
  switchRoom(ST.chatRoom);
}

function switchRoom(room){
  ST.chatRoom=room;
  document.querySelectorAll('.croom').forEach(r=>r.classList.toggle('active',r.dataset.room===room));
  const key=room==='school'&&ST.user?'school_'+ek(ST.user.school):room;
  const msgs=LS.get('chat_'+key,[]);
  renderChat(msgs);
}

function renderChat(msgs){
  const el=document.getElementById('chat-msgs');
  if(!msgs.length){el.innerHTML=empty("Hali xabar yo'q. Birinchi yozing! 💬");return;}
  el.innerHTML=msgs.map(m=>{
    const isMe=ST.user&&m.uid===ST.user.uid;
    return `<div class="msg${isMe?' me':''}">
      <div class="msg-ava">${m.avatar||'🧑‍🎓'}</div>
      <div class="msg-body">
        <div class="msg-meta">${isMe?'Siz':m.name} · ${m.time||''}</div>
        <div class="msg-bub">${esc(m.text)}</div>
      </div>
    </div>`;}).join('');
  el.scrollTop=el.scrollHeight;
}

function sendMsg(){
  if(!ST.user){alert("Xabar yuborish uchun kirish kerak!");return;}
  const inp=document.getElementById('chat-inp');
  const text=inp.value.trim(); if(!text)return; inp.value='';
  const u=ST.user;
  const now=new Date();
  const time=`${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`;
  const msg={uid:u.uid,name:u.name,avatar:u.avatar||'🧑‍🎓',text,time,ts:Date.now()};
  const key=ST.chatRoom==='school'?'school_'+ek(u.school):ST.chatRoom;
  const msgs=LS.get('chat_'+key,[]);
  msgs.push(msg); if(msgs.length>100)msgs.shift();
  LS.set('chat_'+key,msgs);
  renderChat(msgs);
}

// ══════════════════════════════════════
//  PROFILE
// ══════════════════════════════════════
function refreshProfile(){
  if(!ST.user)return;
  const u=ST.user;
  set('prof-ava',u.avatar||'👤');
  set('prof-nm',u.name);
  set('prof-sch',`${u.school} | ${u.grade}-sinf ${u.cls}`);
  set('ps-score',u.totalScore||0);
  set('ps-tests',u.testCount||0);
  const rank=getAllUsers().findIndex(x=>x.uid===u.uid);
  set('ps-rank',rank>=0?'#'+(rank+1):'—');
  const total=u.totalScore||0;
  set('prof-bdg',total>=500?'🏆 Chempion':total>=200?'🌟 Master':total>=50?'👍 Ishtirokchi':'🌱 Yangi o\'quvchi');
  // History
  const hist=u.history||[];
  const hEl=document.getElementById('prof-hist');
  if(!hist.length){hEl.innerHTML='<p style="color:var(--muted);font-size:.8rem;padding:8px 14px">Hali test topshirilmagan</p>';return;}
  hEl.innerHTML='<div class="ph-ttl">📋 So\'nggi natijalar</div>'+hist.slice(0,8).map(h=>`
    <div class="phitem">
      <div>
        <div class="ph-fans">${h.fans.map(f=>SUBJECT_ICONS[f]||'📚').join(' ')} ${h.fans.join(' + ')}</div>
        <div class="ph-info">${h.date} · ${h.pct||0}%</div>
      </div>
      <div class="ph-sc">${h.total}/20</div>
    </div>`).join('');
}

// ══════════════════════════════════════
//  CERTIFICATE
// ══════════════════════════════════════
function openCert(){document.getElementById('cert-modal').classList.remove('hidden');setTimeout(drawCert,80);}
function closeCert(){document.getElementById('cert-modal').classList.add('hidden');}

function drawCert(){
  const canvas=document.getElementById('cert-canvas');
  const ctx=canvas.getContext('2d');
  const W=720,H=520;
  const u=ST.user, r=ST.testResult;

  // BG
  const bg=ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,'#04091a');bg.addColorStop(.5,'#0d1e50');bg.addColorStop(1,'#04091a');
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

  // Texture
  for(let i=0;i<1600;i++){ctx.fillStyle='rgba(255,255,255,0.015)';ctx.fillRect(Math.random()*W,Math.random()*H,1,1);}

  // Border
  const dg=ctx.createLinearGradient(0,0,W,0);
  dg.addColorStop(0,'rgba(245,197,24,.15)');dg.addColorStop(.5,'rgba(245,197,24,.9)');dg.addColorStop(1,'rgba(245,197,24,.15)');
  ctx.strokeStyle=dg;ctx.lineWidth=5;ctx.strokeRect(18,18,W-36,H-36);
  ctx.strokeStyle='rgba(245,197,24,.18)';ctx.lineWidth=1.5;ctx.strokeRect(30,30,W-60,H-60);

  // Corners
  [[42,42],[W-42,42],[42,H-42],[W-42,H-42]].forEach(([x,y])=>{
    ctx.fillStyle='#f5c518';ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(245,197,24,.4)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,12,0,Math.PI*2);ctx.stroke();
  });

  // Stars
  for(let i=0;i<40;i++){ctx.fillStyle=`rgba(255,255,255,${Math.random()*.15+.03})`;ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H,Math.random()*1.4+.3,0,Math.PI*2);ctx.fill();}

  // Watermark
  ctx.save();ctx.translate(W/2,H/2);ctx.rotate(-.28);
  ctx.fillStyle='rgba(255,255,255,.025)';ctx.font='bold 90px Georgia,serif';ctx.textAlign='center';ctx.fillText('EDUREYTING',0,40);ctx.restore();

  // Medal glow
  const glo=ctx.createRadialGradient(W/2,98,0,W/2,98,68);
  glo.addColorStop(0,'rgba(245,197,24,.3)');glo.addColorStop(1,'transparent');
  ctx.fillStyle=glo;ctx.beginPath();ctx.arc(W/2,98,68,0,Math.PI*2);ctx.fill();

  // Medal
  const mc=ctx.createRadialGradient(W/2-8,86,0,W/2,98,48);
  mc.addColorStop(0,'#fff3b0');mc.addColorStop(.5,'#f5c518');mc.addColorStop(1,'#8a6000');
  ctx.fillStyle=mc;ctx.beginPath();ctx.arc(W/2,98,48,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=2;ctx.stroke();

  // Rank emoji
  const users=getAllUsers();
  const rank=users.findIndex(x=>x.uid===u.uid);
  const rEmoji=rank===0?'🥇':rank===1?'🥈':'🥉';
  const rText=rank===0?"BIRINCHI O'RIN":rank===1?"IKKINCHI O'RIN":"UCHINCHI O'RIN";
  ctx.font='40px serif';ctx.textAlign='center';ctx.fillText(rEmoji,W/2,112);

  // Header text
  ctx.fillStyle='#f5c518';ctx.font='bold 10px "Courier New",monospace';
  ctx.fillText("O'ZBEKISTON MAKTAB OLIMPIADASI • EDUREYTING",W/2,168);
  ctx.font='bold 26px Georgia,serif';ctx.fillText("SERTIFIKAT",W/2,200);

  // Divider
  const lg=ctx.createLinearGradient(80,0,W-80,0);
  lg.addColorStop(0,'transparent');lg.addColorStop(.3,'rgba(245,197,24,.75)');lg.addColorStop(.7,'rgba(245,197,24,.75)');lg.addColorStop(1,'transparent');
  ctx.strokeStyle=lg;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(80,216);ctx.lineTo(W-80,216);ctx.stroke();

  ctx.fillStyle='rgba(160,188,248,.6)';ctx.font='italic 12px Georgia,serif';
  ctx.fillText("ushbu sertifikat beriladi",W/2,238);
  ctx.fillStyle='#fff';ctx.font='bold italic 25px Georgia,serif';
  ctx.fillText(u.name,W/2,272);
  ctx.fillStyle='rgba(160,188,248,.7)';ctx.font='12px Verdana,sans-serif';
  ctx.fillText(`${u.school} · ${u.grade}-sinf ${u.cls}`,W/2,293);
  ctx.fillStyle='#f5c518';ctx.font='bold 17px Georgia,serif';
  ctx.fillText(rEmoji+' '+rText,W/2,322);

  // Score bar
  const bx=160,by=338,bw=400,bh=15;
  ctx.fillStyle='rgba(255,255,255,.08)';rr(ctx,bx,by,bw,bh,7);ctx.fill();
  const bg2=ctx.createLinearGradient(bx,0,bx+bw,0);
  bg2.addColorStop(0,'#2563eb');bg2.addColorStop(1,'#f5c518');
  ctx.fillStyle=bg2;rr(ctx,bx,by,bw*(r.pct/100),bh,7);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.85)';ctx.font='bold 10px Verdana,sans-serif';
  ctx.fillText(`${r.total}/20 ball  (${r.pct}%)`,W/2,350);

  ctx.fillStyle='rgba(160,188,248,.7)';ctx.font='11px Verdana,sans-serif';
  ctx.fillText(`Fanlar: ${r.fans.map(f=>SUBJECT_ICONS[f]||'📚').join(' ')} ${r.fans.join(' va ')}`,W/2,374);
  ctx.fillText(`${u.region} · ${u.district}`,W/2,391);

  ctx.strokeStyle=lg;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(80,408);ctx.lineTo(W-80,408);ctx.stroke();

  ctx.fillStyle='rgba(245,197,24,.55)';ctx.font='bold 9px Verdana,sans-serif';
  ctx.fillText(`EduReyting · O'zbekiston Maktab Olimpiadasi · 2026`,W/2,428);
  ctx.fillStyle='rgba(160,188,248,.45)';ctx.font='9px Verdana,sans-serif';
  ctx.fillText(`Sana: ${new Date().toLocaleDateString('uz-UZ')} · Yaratuvchi: ${CREATOR}`,W/2,444);
  ctx.font='15px serif';ctx.fillStyle='#f5c518';
  ['★','★','★'].forEach((s,i)=>ctx.fillText(s,W/2-18+i*18,470));
}

function rr(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
}

function dlCert(){
  const a=document.createElement('a');
  a.download='sertifikat_'+ST.user.name.replace(/\s+/g,'_')+'.png';
  a.href=document.getElementById('cert-canvas').toDataURL('image/png');a.click();
}

// ══════════════════════════════════════
//  ADMIN
// ══════════════════════════════════════
function checkAdmin(){
  const code=document.getElementById('adm-code').value.trim();
  const err=document.getElementById('adm-err');
  if(code!==ADMIN_CODE){showErr(err,'❌ Noto\'g\'ri kod!');return;}
  ST.adminMode=true;
  document.getElementById('admin-code-panel').classList.add('hidden');
  document.getElementById('admin-panel').classList.remove('hidden');
  loadAdminStats();
}

function loadAdminStats(){
  const users=getAllUsers();
  const schools=getSchoolsArr();
  set('adm-users',users.length);
  set('adm-tests',users.reduce((a,u)=>a+(u.testCount||0),0));
  const avg=users.length?Math.round(users.reduce((a,u)=>a+(u.totalScore||0),0)/users.length):0;
  set('adm-avg',avg);
  set('adm-schools-cnt',schools.length);

  const medals=['🥇','🥈','🥉'];
  document.getElementById('adm-top3').innerHTML=users.slice(0,3).map((u,i)=>`
    <div class="adm-top-row">
      <span>${medals[i]} ${u.avatar||'🧑‍🎓'} <b>${u.name}</b><br>
        <span style="font-size:.68rem;color:var(--muted)">${u.school} · ${u.grade}-sinf · ${u.totalScore}ball</span></span>
      <button class="btn-cert-adm" onclick="adminIssueCert('${u.uid}')">🎖️ Sertifikat</button>
    </div>`).join('');

  document.getElementById('adm-schools').innerHTML=schools.slice(0,20).map((s,i)=>`
    <tr>
      <td>${i<3?medals[i]:'#'+(i+1)}</td>
      <td><b>${s.name}</b></td>
      <td>${s.district||''}</td>
      <td>${s.studentCount||0}</td>
      <td style="color:var(--gold);font-weight:900">${s.totalScore||0}</td>
    </tr>`).join('');
}

function adminIssueCert(uid){
  const users=LS.get('edu_users',[]);
  const u=users.find(x=>x.uid===uid);
  if(!u){alert("Foydalanuvchi topilmadi!");return;}
  const prevUser=ST.user, prevResult=ST.testResult;
  const allUsers=getAllUsers();
  const rank=allUsers.findIndex(x=>x.uid===uid);
  ST.user=u;
  ST.testResult={total:u.totalScore||0, pct:Math.round(((u.totalScore||0)/Math.max((u.testCount||1)*20,20))*100),
    fans:['Olimpiada','Barcha fanlar'], scores:['-','-']};
  document.getElementById('cert-modal').classList.remove('hidden');
  setTimeout(()=>{drawCert();},100);
  setTimeout(()=>{ST.user=prevUser;ST.testResult=prevResult;},500);
}

function closeAdmin(){
  ST.adminMode=false;
  document.getElementById('admin-panel').classList.add('hidden');
  document.getElementById('admin-code-panel').classList.remove('hidden');
  document.getElementById('adm-code').value='';
}

// ══════════════════════════════════════
//  DATA HELPERS
// ══════════════════════════════════════
function getAllUsers(){
  return LS.get('edu_users',[]).sort((a,b)=>(b.totalScore||0)-(a.totalScore||0));
}
function getSchoolsArr(){
  return Object.values(LS.get('edu_schools',{})).sort((a,b)=>(b.totalScore||0)-(a.totalScore||0));
}
function ek(s){return(s||'').replace(/[.#$\[\]\s\/]/g,'_')}
function esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function v(id){const el=document.getElementById(id);return el?el.value:'';}
function set(id,val){const el=document.getElementById(id);if(el)el.textContent=val;}
function empty(t){return`<p style="color:var(--muted);text-align:center;padding:28px;font-size:.85rem">${t}</p>`}
function showErr(el,msg){el.textContent=msg;el.classList.remove('hidden');setTimeout(()=>el.classList.add('hidden'),5000);}
