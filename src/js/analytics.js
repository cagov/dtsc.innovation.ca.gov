//GA setup
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-20973992-35', 'auto'); // my specific site
ga('create', 'UA-3419582-2', 'auto', 'tracker2'); // all ca.gov
ga('send', 'pageview');
ga('tracker2.send', 'pageview');

window.onload = function() {
  let s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "https://www.google-analytics.com/analytics.js";
  document.head.append(s);
}

// GA event tracking
// track links
document.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click',function() {
    reportGA('offsite', this.href)
  })          
});


function reportGA(eventAction, eventLabel, eventCategory = 'click') {
  if(typeof(ga) !== 'undefined') {
    ga('send', 'event', eventCategory, eventAction, eventLabel);
    ga('tracker2.send', 'event', eventCategory, eventAction, eventLabel);
  } else {
    setTimeout(function() {
      reportGA(eventAction, eventLabel, eventCategory);
    }, 500);
  }
}


// meta pixel library loader

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1197520694174921');
fbq('track', 'PageView');
