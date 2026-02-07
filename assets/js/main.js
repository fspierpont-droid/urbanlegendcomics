/* =========================================================
   Urban Legend Comics — main.js
   Purposefully stable, small, and readable.
   ========================================================= */

(function () {
  // ---------- Config: Rotating Featured Books ----------
  const ROTATING_BOOKS = [
    {
      title: "Amazing Spider-Man #2",
      note: "Example entry • Key issue • Ask for photos/details",
      ref: "UL-ROT-ASM2",
      status: "Asking",
      price: "Inquire",
      img: "./assets/img/book-asm2.jpg"
    },
    {
      title: "Incredible Hulk #181",
      note: "Example entry • High-demand key • Condition sensitive",
      ref: "UL-ROT-H181",
      status: "Asking",
      price: "Inquire",
      img: "./assets/img/book-h181.jpg"
    },
    {
      title: "Werewolf by Night #32",
      note: "Example entry • Major key • Photos on request",
      ref: "UL-ROT-WBN32",
      status: "Asking",
      price: "Inquire",
      img: "./assets/img/book-wbn32.jpg"
    }
  ];

  function $(id) { return document.getElementById(id); }

  function setYear() {
    const yearEl = $("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function safeText(v) {
    return String(v || "").trim();
  }

  function makeRefCode() {
    const d = new Date();
    const y = String(d.getFullYear()).slice(-2);
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `UL-${y}${m}${day}-${rnd}`;
  }

  function encode(s) {
    return encodeURIComponent(s);
  }

  function initSellPage() {
    const textBtn = $("sellTextBtn");
    const emailBtn = $("sellEmailBtn");
    if (!textBtn || !emailBtn) return;

    const phone = "+18139431728";
    const email = "gbuschy@outlook.com";

    function buildMessage() {
      const ref = makeRefCode();
      const name = safeText($("sellName")?.value);
      const city = safeText($("sellCity")?.value);
      const size = safeText($("sellSize")?.value);
      const highlights = safeText($("sellHighlights")?.value);
      const notes = safeText($("sellNotes")?.value);

      const lines = [];
      lines.push("Hi Urban Legend Comics — I’d like to sell a collection.");
      lines.push(`Ref Code: ${ref}`);
      if (name) lines.push(`Name: ${name}`);
      if (city) lines.push(`City: ${city}`);
      if (size) lines.push(`Size: ${size}`);
      if (highlights) lines.push(`Highlights: ${highlights}`);
      if (notes) lines.push(`Notes: ${notes}`);
      lines.push("");
      lines.push("I can attach 3–6 photos (wide shot, keys/slabs, sample condition).");

      return { ref, text: lines.join("\n") };
    }

    function refreshLinks() {
      const msg = buildMessage();
      textBtn.setAttribute("href", `sms:${phone}?&body=${encode(msg.text)}`);
      emailBtn.setAttribute("href", `mailto:${email}?subject=${encode(`Sell a Collection — Ref ${msg.ref}`)}&body=${encode(msg.text)}`);
    }

    refreshLinks();
    ["sellName","sellCity","sellSize","sellHighlights","sellNotes"].forEach((id) => {
      const el = $(id);
      if (!el) return;
      el.addEventListener("input", refreshLinks, { passive: true });
    });
  }

  function initRotatingBooks() {
    const mount = $("rotatingBooks");
    if (!mount) return;

    function card(item) {
      const title = safeText(item.title);
      const note = safeText(item.note);
      const ref = safeText(item.ref);
      const status = safeText(item.status || "Asking");
      const price = safeText(item.price || "Inquire");
      const img = safeText(item.img);

      const imgHtml = img
        ? `<div class="pMeta" style="margin-top:8px;">
             <a class="link" href="${img}" target="_blank" rel="noopener">Open photo</a>
             <span class="muted"> • ${img.replace("./assets/img/","assets/img/")}</span>
           </div>`
        : "";

      return `
        <div class="product">
          <div class="pTop">
            <div>
              <div class="pTitle">${title}</div>
              <div class="pMeta">${note ? note : "Details on request"}<br/><span class="muted">Ref: ${ref}</span></div>
              ${imgHtml}
            </div>
            <span class="badge">${status}</span>
          </div>

          <div class="priceRow">
            <div>
              <div class="price">${price}</div>
              <div class="smallNote">Text/Call with Ref Code for availability</div>
            </div>
          </div>

          <div class="pActions">
            <a class="btn small primary" href="sms:+18139431728?&body=${encode(`Hi Urban Legend Comics — asking about: ${title}\nRef Code: ${ref}\nCan you share photos/price?`)}">Text Ref Code</a>
            <a class="btn small" href="tel:+18139431728">Call</a>
            <a class="btn small ghost" href="./spotlight.html">High-end Spotlight</a>
          </div>
        </div>
      `;
    }

    mount.innerHTML = ROTATING_BOOKS.map(card).join("");
  }

  function boot() {
    setYear();
    initSellPage();
    initRotatingBooks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { passive: true });
  } else {
    boot();
  }
})();
