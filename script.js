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
