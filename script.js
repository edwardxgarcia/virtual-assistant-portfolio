// Edit this list to add or change work samples. Put the sample file in /samples.
const PROJECTS = [
 {title:"Administrative Task Tracker",file:"samples/administrative-task-tracker.csv",
  desc:"A task list with priorities, due dates, status, and follow-up dates.",
  purpose:"Keep every task visible so nothing is missed or forgotten.",tools:"Excel or Google Sheets",
  workflow:"List each task, set a priority and due date, set a follow-up date, then update the status as work moves.",
  result:"One place to see what is due, what is waiting, and what is done."},
 {title:"Project Coordination Dashboard",file:"samples/project-coordination-dashboard.csv",
  desc:"Milestones with owners, dates, progress, and the next action.",purpose:"Show project progress and risks at a glance.",tools:"Excel or Google Sheets",
  workflow:"Break the project into milestones, assign owners, record progress each week, and note the next action.",
  result:"Clear status for the team and early warning when something is at risk."},
 {title:"Spreadsheet and Data Entry Sample",file:"samples/spreadsheet-data-entry-sample.csv",
  desc:"Structured order records with formulas for line totals.",purpose:"Show clean, consistent data entry that is easy to sort and filter.",tools:"Excel or Google Sheets",
  workflow:"Use one row per record, consistent formats, unique IDs, and formulas for calculated columns. Check totals before sharing.",
  result:"Accurate records that are ready for sorting, filtering, and reporting."},
 {title:"Standard Operating Procedure (SOP)",file:"samples/sop-new-request-intake.md",
  desc:"A step-by-step procedure for handling a new request.",purpose:"Make a repeatable process easy for anyone to follow.",tools:"Any text editor, Word, or Google Docs",
  workflow:"State the purpose and scope, write short numbered steps, add a priority guide, and list common problems.",
  result:"A consistent process and less guesswork for new team members."},
 {title:"Meeting Notes and Action Items",file:"samples/meeting-notes-and-action-items.md",
  desc:"A meeting summary with decisions, owners, and deadlines.",purpose:"Turn a conversation into clear next steps.",tools:"Any text editor, Word, or Google Docs",
  workflow:"Capture the summary and decisions, list actions with an owner and due date, and share the notes the same day.",
  result:"Everyone knows who is doing what, and by when."},
 {title:"Administrative Records Tracker",file:"samples/administrative-records-tracker.csv",
  desc:"A log of documents and requests with location and status.",purpose:"Make any document or request easy to find.",tools:"Excel or Google Sheets",
  workflow:"Log each item on arrival, record where it is stored, and update the status and date when it changes.",
  result:"Fast retrieval and a clear history of each record."}
];
const $ = s => document.querySelector(s);
async function getText(f){ if(window.__SAMPLES&&window.__SAMPLES[f]) return window.__SAMPLES[f]; const r=await fetch(f); if(!r.ok) throw 0; return r.text(); }
function parseCSV(t){return t.trim().split("\n").map(l=>l.split(","));}
function esc(s){return s.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));}
function table(rows){
  const h=rows[0].map(c=>`<th scope="col">${esc(c)}</th>`).join("");
  const b=rows.slice(1).map(r=>"<tr>"+r.map(c=>/^\d+%$/.test(c)?`<td><span class="bar"><i style="width:${c}"></i></span>${c}</td>`:`<td>${esc(c)}</td>`).join("")+"</tr>").join("");
  return `<table><thead><tr>${h}</tr></thead><tbody>${b}</tbody></table>`;
}
const modal=$("#modal");
$("#projects").innerHTML=PROJECTS.map((p,i)=>`<article class="card"><p class="tag">Demonstration project</p><h3>${p.title}</h3><p>${p.desc}</p><button class="btn ghost" data-i="${i}">View sample</button></article>`).join("");
$("#projects").addEventListener("click",async e=>{
  const b=e.target.closest("button[data-i]"); if(!b) return;
  const p=PROJECTS[b.dataset.i];
  $("#mTitle").textContent=p.title;
  $("#mInfo").innerHTML=[["Purpose",p.purpose],["Tools",p.tools],["Approach",p.workflow],["Intended benefit",p.result]].map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join("");
  $("#mDownload").href=p.file;
  const box=$("#mPreview"); box.textContent="Loading preview...";
  modal.showModal();
  try{const t=await getText(p.file); box.innerHTML=p.file.endsWith(".csv")?table(parseCSV(t)):`<pre>${esc(t)}</pre>`;}
  catch{box.textContent="The preview needs the site to be served online (for example on GitHub Pages). You can still download the file.";}
});
modal.querySelector(".close").onclick=()=>modal.close();
modal.addEventListener("click",e=>{if(e.target===modal)modal.close();});
const menu=document.querySelector(".menu"),nav=$("#nav");
menu.onclick=()=>{const o=nav.classList.toggle("open");menu.setAttribute("aria-expanded",o);};
nav.addEventListener("click",e=>{if(e.target.tagName==="A"){nav.classList.remove("open");menu.setAttribute("aria-expanded",false);}});

// Apps I've built. Screenshots live in assets/projects/.
const APPS = [
 {name:"Mama's Lending App", status:"Live, in daily use", live:true,
  what:"A loan management web app for my mother's small lending business, used every day on her phone.",
  points:["Tracks borrowers, loans, payment schedules, payments, expenses, and cash and GCash on hand",
          "Works out installments, interest, and overdue charges automatically, so no more manual computing",
          "Built from her real business rules, gathered by talking through worked examples with her"],
  stack:["React","TypeScript","Supabase (PostgreSQL)","Cloudflare","Git & GitHub","PWA"],
  shots:[["lending-home.webp","Home: money on hand (cash and GCash) and today's totals at a glance"],
         ["lending-loans.webp","Loans still being paid, with the balance left and the next due date"],
         ["lending-pay-grace.webp","Recording a payment: the app adds the overdue charge automatically when a payment is late"],
         ["lending-loan-detail.webp","Loan details: amount, interest, total to repay, and what is still left to pay"],
         ["lending-reports.webp","Reports: payments received, interest collected, loans given, and expenses for any period"],
         ["lending-borrowers.webp","Borrower list with each person's payday schedule"],
         ["lending-phone-home.webp","On a phone: it installs like an app (PWA)"],
         ["lending-phone-pay-grace.webp","Recording a payment on a phone"]],
  note:"Screenshots use made-up demo borrowers. No real customer data is shown.",
  detail:[["The problem","My mother ran her lending business on paper and mental math. Working out installments, interest, and late charges took time and was easy to get wrong, and it was hard to know how much money was out at any moment."],
   ["What it does",["Records borrowers, loans, and every payment, and keeps cash and GCash balances up to date",
     "Creates the payment schedule automatically (1-month loan = 2 payments, 2-month loan = 4)",
     "Computes overdue charges by days late, and applies each payment in the right order: overdue charge, then interest, then principal",
     "Handles renewals (deducts the remaining balance from the new loan) and early or agreed full settlement",
     "Shows today's and this month's totals, plus reports for any date range",
     "Lets her fix a number or cancel a wrong entry, while keeping a history of every change",
     "Encrypted backup and restore, and a sign-in so only approved people can see the records"]],
   ["How I built it",["Gathered the business rules directly from my mother, confirming each one with real examples before building it",
     "Made the rules she hadn't decided yet adjustable in the app, instead of guessing",
     "Used a separate practice database with demo data, so every change is tested before it reaches the live records",
     "Deployed it online on Cloudflare, with version control on GitHub, and wrote a simple printed user guide for her",
     "Keep improving it based on what she asks for while using it day to day"]]]},
 {name:"FROST", status:"In progress", live:false,
  what:"A voice-controlled AI desktop assistant for Windows, inspired by JARVIS. It runs fully on my own PC, with no subscription.",
  points:["Talk to it by voice (wake word) or text, and it answers out loud",
          "Runs local AI models, including one that can understand images",
          "Can control other apps, but always asks before anything risky"],
  stack:["Electron","React","TypeScript","Python","Ollama (local AI)","faster-whisper","FFmpeg"],
  shots:[["frost-dashboard.webp","Command Center view: the assistant, AI status, live system stats, and an activity log (conversation blurred for privacy)"],
         ["frost-immersive.webp","Immersive mode: a full-screen animated orb that reacts while FROST listens and speaks"],
         ["frost-permissions.webp","Permission settings: FROST asks before deleting, sending, buying, or acting on text it just read"],
         ["frost-settings.webp","Appearance settings: modes, themes, colors, and effects"]],
  detail:[["The idea","I wanted a personal assistant like JARVIS that I can talk to, that helps on my own computer, and that keeps everything private and free, with no cloud subscription."],
   ["What it does",["Voice in and out: speech-to-text (Whisper), text-to-speech, and a “Frost” wake word for hands-free use",
     "Local AI brain through Ollama (Qwen3 for chat, Qwen3-VL for images), set up to fit a 6 GB graphics card",
     "Chat accepts images, documents, files, and video",
     "Controls Windows apps: switching windows, typing, clicking, and reading window text",
     "Several looks (Holographic, Minimal, Assistant, Command Center, Immersive) and a live system monitor"]],
   ["Safety first",["Permission modes, from “Ask first” to “Full control (safe)”",
     "Always asks before Delete, Send, Buy, or Pay, before typing into a terminal, and before acting right after reading a web page or window",
     "Never types passwords, never bypasses Windows security prompts, and only deletes to the Recycle Bin",
     "Esc or the Stop button cancels any action"]],
   ["How I built it",["Planned and built in phases, with a Windows installer for each version (0.5 to 0.7.x)",
     "Tested each release on my own PC before moving on",
     "Next steps: video editing and background removal (FFmpeg), coding help in a safe folder, and website tasks"]]]},
 {name:"LinkHub", status:"Completed", live:true,
  what:"A desktop app that turns 1,800+ saved links into a searchable research library for job hunting and learning.",
  points:["Imports links I saved in Facebook Messenger and removes duplicates",
          "Sorts them into job opportunities, AI resources, learning, and more",
          "Ranks job posts by how well they fit what I'm looking for"],
  stack:["Electron","Node.js","JSON","Data cleanup"],
  shots:[["linkhub-dashboard.webp","Dashboard: 1,854 links collected, duplicates removed, best-fit jobs, and links by category and source"],
         ["linkhub-jobs.webp","Job Opportunities: ranked by fit, with pay, type, remote setup, and filters"],
         ["linkhub-all-links.webp","All Links: every unique link with its category, source, and status, searchable and filterable"],
         ["linkhub-import.webp","Import Center: paste a Messenger conversation or load a file, and it finds and sorts every link"]],
  detail:[["The problem","For months I saved useful links (job posts, tutorials, tools) by sending them to myself on Messenger. There were well over a thousand, with no way to search or sort them."],
   ["What it does",["Imports a Messenger chat export and pulls out every link (1,854 in my first import)",
     "Removes duplicates and sorts links into collections: Job Opportunities, AI & Development, Video Editing, Learning, Tools, Business & Freelancing",
     "Scores job posts by fit, shows pay, remote setup, and type, and can export the list to CSV",
     "Flags links that need review, with favorites, archive, and trash",
     "Saves everything locally on my PC"]]]},
 {name:"CozySpace", status:"Completed", live:true,
  what:"A calm personal productivity app for Windows: tasks, focus timer, notes, and projects in one place.",
  points:["My Day view with a daily plan, Top 3 priorities, and progress",
          "Focus timer (stopwatch or Pomodoro) that tracks time per task",
          "Idle detection: time away from the PC is set aside, never added to a task without asking"],
  stack:["Electron","Node.js","Git"],
  shots:[["cozyspace-myday.webp","My Day: today's progress, focused time, waiting tasks, Top 3, and the task I'm working on now"],
         ["cozyspace-tasks.webp","Tasks: one calm list with filters (today, upcoming, overdue) and a calendar view"],
         ["cozyspace-focus.webp","Focus: one task, one timer (stopwatch or Pomodoro), with time logged automatically"],
         ["cozyspace-notes.webp","Notes: a brain dump to catch thoughts quickly, then turn them into tasks or keep them as notes"],
         ["cozyspace-projects.webp","Projects: group related tasks and notes and track progress"]],
  detail:[["Why I built it","I wanted one simple, calm place to plan my day and keep focus, built the way I actually work."],
   ["What it does",["Tasks with priorities and due dates, plus list and calendar views",
     "Focus timer with stopwatch and Pomodoro modes, and time insights",
     "Detects when I step away and keeps that time as “unsorted” until I decide what it was",
     "Brain-dump notes that can be turned into tasks, and projects to group related work"]]]},
 {name:"Claude Usage Monitor", status:"Completed", live:true,
  what:"A Windows app with a floating widget that shows how much of my AI plan's usage limits are left, so I can plan my work.",
  points:["Live session and weekly usage, with reset times",
          "Estimates whether I'll run out before the reset",
          "24-hour usage chart and simple recommendations"],
  stack:["Windows desktop app","Data visualization","Local data storage"],
  shots:[["usage-overview.webp","Overview: usage left this session and this week, reset times, a 24-hour chart, and recommendations"],
         ["usage-history.webp","History: usage over time, daily totals for 30 days, busiest hours, and export to CSV"],
         ["usage-insights.webp","Insights: tips worked out from my real usage, plus general habits that stretch the limits"],
         ["usage-claude-code.webp","Claude Code: reads token counts from Claude Code's local logs when it's used on this PC"],
         ["usage-connection.webp","Connection: where the numbers come from; everything stays on the PC"],
         ["usage-settings.webp","Settings: start with Windows, check interval, floating widget options, and plan renewal reminders"]],
  detail:[["Why I built it","I use Claude heavily for building apps, so I wanted to see at a glance how much usage I have left, without opening the website."],
   ["What it does",["A small always-on-top widget showing usage left in the current session",
     "A dashboard with weekly usage, reset times, pace estimates, history charts, and insights",
     "Keeps a local history (exportable to CSV) and reminds me before my plan renews",
     "Designed to support other AI tools like ChatGPT and Gemini later"]]]}
];
(function(){
  const list=document.getElementById("appList"), dlg=document.getElementById("appModal");
  if(!list) return;
  const img=f=>"assets/projects/"+f;
  list.innerHTML=APPS.map((a,i)=>`<article class="card app">
    <figure class="shot" data-i="${i}"><img src="${img(a.shots[0][0])}" alt="${a.name}: ${a.shots[0][1]}" loading="lazy"></figure>
    <div><p class="status${a.live?"":" wip"}">${a.status}</p><h3>${a.name}</h3><p class="what">${a.what}</p>
    <ul>${a.points.map(p=>`<li>${p}</li>`).join("")}</ul>
    <ul class="stack">${a.stack.map(t=>`<li>${t}</li>`).join("")}</ul>
    <button class="btn ghost" data-i="${i}">See screenshots &amp; details (${a.shots.length})</button></div></article>`).join("");
  let cur=null;
  function show(k){const s=cur.shots[k];const im=document.getElementById("aImg");im.src=img(s[0]);im.alt=cur.name+": "+s[1];
    document.getElementById("aCap").textContent=s[1];
    document.querySelectorAll("#aThumbs button").forEach((b,j)=>b.setAttribute("aria-current",j===k));}
  function open(i){cur=APPS[i];
    document.getElementById("aStatus").textContent=cur.status;
    document.getElementById("aTitle").textContent=cur.name;
    document.getElementById("aSummary").textContent=cur.what+(cur.note?" "+cur.note:"");
    document.getElementById("aThumbs").innerHTML=cur.shots.map((s,j)=>`<button type="button" data-k="${j}" aria-label="Screenshot ${j+1}: ${s[1]}"><img src="${img(s[0])}" alt=""></button>`).join("");
    document.getElementById("aBody").innerHTML=cur.detail.map(([h,b])=>`<h4>${h}</h4>`+(Array.isArray(b)?`<ul>${b.map(x=>`<li>${x}</li>`).join("")}</ul>`:`<p>${b}</p>`)).join("")+
      `<h4>Tools used</h4><ul class="stack">${cur.stack.map(t=>`<li>${t}</li>`).join("")}</ul>`;
    show(0); dlg.showModal(); dlg.scrollTop=0;}
  list.addEventListener("click",e=>{const t=e.target.closest("[data-i]");if(t)open(+t.dataset.i);});
  document.getElementById("aThumbs").addEventListener("click",e=>{const b=e.target.closest("[data-k]");if(b)show(+b.dataset.k);});
  dlg.querySelector(".close").onclick=()=>dlg.close();
  dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close();});
  dlg.addEventListener("keydown",e=>{if(!cur)return;const k=[...document.querySelectorAll("#aThumbs button")].findIndex(b=>b.getAttribute("aria-current")==="true");
    if(e.key==="ArrowRight")show((k+1)%cur.shots.length);if(e.key==="ArrowLeft")show((k-1+cur.shots.length)%cur.shots.length);});
})();

// Scroll effects: reveal on scroll, progress bar, active nav link, count-up numbers
document.documentElement.classList.add("js");
(function(){
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets=document.querySelectorAll(".hero > *, .hero .glance div, section h2, .sub, #about p, .card, .logos li, .chips, .timeline > li, .steps li, .contact p, .note");
  targets.forEach(el=>{
    el.classList.add("reveal");
    const sibs=[...el.parentNode.children].filter(c=>c.classList.contains("reveal")||c===el);
    el.style.setProperty("--d",Math.min(sibs.indexOf(el),6)*0.09+"s");
  });
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{
    const c=e.target.querySelector("[data-count]");
    if(e.isIntersecting){e.target.classList.add("in");if(c){reduce?c.textContent=c.dataset.count:count(c);}}
    else{e.target.classList.remove("in");if(c&&!reduce){cancelAnimationFrame(c._raf);c.textContent="0";}}
  });},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
  function count(el){const end=+el.dataset.count,t0=performance.now(),d=1400;
    cancelAnimationFrame(el._raf);(function f(t){const p=Math.min((t-t0)/d,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)el._raf=requestAnimationFrame(f);})(t0);}
  const bar=document.querySelector(".progress"),top=document.querySelector(".top");
  function onScroll(){const m=document.documentElement.scrollHeight-innerHeight;bar.style.transform="scaleX("+(m>0?scrollY/m:0)+")";top.classList.toggle("scrolled",scrollY>10);
    const tl=document.querySelector(".timeline");if(tl){const r=tl.getBoundingClientRect();tl.style.setProperty("--p",Math.max(0,Math.min(1,(innerHeight*0.6-r.top)/r.height)));}}
  addEventListener("scroll",onScroll,{passive:true});onScroll();
  const links=[...document.querySelectorAll("nav a")];
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.setAttribute("aria-current",a.getAttribute("href")==="#"+e.target.id));}),{rootMargin:"-45% 0px -50% 0px"});
  document.querySelectorAll("main section[id]").forEach(s=>so.observe(s));
})();

// Backup for visitors whose email app does not open: copy the address or open Gmail.
(function(){
  const box=document.getElementById("mailnote"),copy=document.getElementById("copyMail"),gm=document.getElementById("gmailLink"),addr="edwardmoncera2026@gmail.com";let t;
  document.addEventListener("click",e=>{
    const a=e.target.closest('a[href^="mailto:"]'); if(!a) return;
    const u=new URL(a.href),q=u.searchParams;
    gm.href="https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(addr)+"&su="+encodeURIComponent(q.get("subject")||"")+"&body="+encodeURIComponent(q.get("body")||"");
    copy.textContent="Copy email address";box.hidden=false;clearTimeout(t);t=setTimeout(()=>box.hidden=true,20000);
  });
  copy.onclick=async()=>{
    try{await navigator.clipboard.writeText(addr);copy.textContent="Copied";}
    catch{const r=document.createRange();r.selectNodeContents(document.getElementById("mailaddr"));const s=getSelection();s.removeAllRanges();s.addRange(r);copy.textContent="Selected: press Ctrl+C";}
  };
  document.getElementById("closeNote").onclick=()=>box.hidden=true;
})();

// Scroll-linked effects: backdrop grid drift and the rotating ring around the photo.
(function(){
  const r=document.documentElement;
  function s(){r.style.setProperty("--sy",scrollY);r.style.setProperty("--rot",(scrollY*0.35)%360+"deg");}
  addEventListener("scroll",s,{passive:true});s();
})();

// Theme toggle (hologram dark by default, light optional) and cursor glow.
(function(){
  const root=document.documentElement,btn=document.getElementById("themeBtn");
  function label(){const light=root.getAttribute("data-theme")==="light";if(btn){btn.textContent=light?"Hologram mode":"Light mode";btn.setAttribute("aria-label",light?"Switch to hologram dark theme":"Switch to light theme");}}
  if(btn){btn.addEventListener("click",()=>{const next=root.getAttribute("data-theme")==="light"?"holo":"light";root.setAttribute("data-theme",next);try{localStorage.setItem("theme",next)}catch(e){}label();});}
  label();
  if(!matchMedia("(prefers-reduced-motion:reduce)").matches){
    addEventListener("pointermove",e=>{root.style.setProperty("--mx",e.clientX+"px");root.style.setProperty("--my",e.clientY+"px");},{passive:true});
  }
})();
