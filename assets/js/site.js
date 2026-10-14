(() => {
 const c=window.LAB_CONFIG||{};
 document.documentElement.style.setProperty('--accent',c.accent||'#d85c35');
 document.documentElement.style.setProperty('--accent-dark',c.accentDark||'#a83d22');
 document.documentElement.style.setProperty('--max',c.pageWidth||'1180px');
 document.documentElement.style.setProperty('--body-font',c.fontBody||"'Manrope',sans-serif");
 document.documentElement.style.setProperty('--heading-font',c.fontHeading||"'Playfair Display',serif");
 const bar=document.querySelector('.loading-bar');
 if(bar) addEventListener('scroll',()=>{const d=document.documentElement;bar.style.width=((d.scrollTop/(d.scrollHeight-d.clientHeight||1))*100)+'%';},{passive:true});
 if(c.enableAnimations!==false && 'IntersectionObserver' in window){document.documentElement.classList.add('js-motion');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const note=document.querySelector('.cookie-note');if(note&&!sessionStorage.getItem('lab-note-dismissed'))note.hidden=false;
 document.querySelectorAll('[data-dismiss-note]').forEach(b=>b.addEventListener('click',()=>{if(note)note.hidden=true;sessionStorage.setItem('lab-note-dismissed','1')}));
 document.querySelectorAll('[data-demo-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const out=f.querySelector('[data-form-result]');if(out)out.textContent='Demo only: no data was sent or stored. Use the PHP Server Lab to test real submissions.';}));
 if(c.enableAnalytics && c.googleAnalyticsId){const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(c.googleAnalyticsId);document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',c.googleAnalyticsId);}
})();
