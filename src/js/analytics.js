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