/* 
==========================================
   Urban Legend Comics — main.js 
   Purposefully minimal, fast, and 
   stable 
   ========================================== 
   */
(function () { "use strict";
  // Update footer year 
  // automatically
  function setYear() { var yearEl = 
    document.getElementById("year"); 
    if (yearEl) {
      yearEl.textContent = new 
      Date().getFullYear();
    }
  }
  // Safely load Instagram embeds 
  // if present
  function loadInstagram() { if 
    (window.instgrm && 
    window.instgrm.Embeds) {
      window.instgrm.Embeds.process(); 
      return;
    }
    // If embed.js was not already 
    // loaded, load it once
    if 
    (!document.getElementById("ig-embed-script")) 
    {
      var script = 
      document.createElement("script"); 
      script.id = 
      "ig-embed-script"; 
      script.async = true; 
      script.src = 
      "https://www.instagram.com/embed.js"; 
      document.body.appendChild(script);
    }
  }
  // Run when DOM is ready
  document.addEventListener("DOMContentLoaded", 
  function () {
    setYear(); loadInstagram();
  });
})();


