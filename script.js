document.addEventListener("DOMContentLoaded",()=>{const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");if(menu&&nav)menu.addEventListener("click",()=>nav.classList.toggle("open"));const items=document.querySelectorAll(".reveal");if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});items.forEach(x=>io.observe(x))}else items.forEach(x=>x.classList.add("visible"));document.querySelectorAll("a[href]").forEach(a=>a.addEventListener("click",()=>nav&&nav.classList.remove("open")));

// Hide the desktop header while scrolling down on small screens.
let lastY=window.scrollY;
window.addEventListener("scroll",()=>{const header=document.querySelector(".site-header");if(!header||window.innerWidth>680)return;const y=window.scrollY;if(y<20){header.classList.remove("header-hidden")}else if(y>lastY+8){header.classList.add("header-hidden")}else if(y<lastY-8){header.classList.remove("header-hidden")}lastY=y},{passive:true});

// Inject one consistent icon-based liquid-glass navigation on every page.
const path=location.pathname.split("/").pop()||"index.html";
const links=[
 {href:"index.html",label:"Home",icon:'<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/></svg>'},
 {href:"projects.html",label:"Work",icon:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>'},
 {href:"certificates.html",label:"Certs",icon:'<svg viewBox="0 0 24 24"><path d="M6 3.5h12v17H6z"/><path d="M9 7h6M9 11h6M9 15h3"/><path d="m14 17 2 2 3-4"/></svg>'},
 {href:"skills.html",label:"Skills",icon:'<svg viewBox="0 0 24 24"><path d="m8 16 4-4 4 4"/><path d="m8 8 4 4 4-4"/><path d="M4 4h16v16H4z"/></svg>'},
 {href:"contact.html",label:"Contact",icon:'<svg viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/></svg>'}
];
if(!document.querySelector(".bottom-nav")){const bar=document.createElement("nav");bar.className="bottom-nav";bar.setAttribute("aria-label","Mobile navigation");bar.innerHTML=links.map(l=>'<a href="'+l.href+'" class="'+(path===l.href?"active":"")+'" aria-label="'+l.label+'">'+l.icon+"<span>"+l.label+"</span></a>").join("");document.body.appendChild(bar);}
});