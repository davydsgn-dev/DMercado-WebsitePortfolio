const certifications = [
  { slug: "WDOTYCert",        title: "Web Designer of the Year & Service Awardee" },
  { slug: "ACCENTURE",        title: "Accenture Digital Skills: User Experience" },
  { slug: "WTOPCIT",          title: "Topcit Korea Lv2" },
  { slug: "WNCII",            title: "Tesda CSS: NCII Proficiency" },
  { slug: "WLEARNIFY",        title: "Learnify: UI/UX Full Course" },
  { slug: "BYOL",             title: "Bring Your Own Laptop: Figma UI/UX Design Course" },
  { slug: "WAJSMART",         title: "AJ Smart: Figma UI Design (Short Course)" },
  { slug: "NETWORKING-CYBER", title: "Cisco: Introduction to Cyber Security" },
  { slug: "NETWORKING-ITN",   title: "Cisco: Introduction to Networks" },
  { slug: "NETWORKING-SRWE",  title: "Cisco: Switching, Routing, and Wireless Essentials" },
  { slug: "NETWORKING-ENSA",  title: "Cisco: Enterprise Networking, Security, and Automation" },
  { slug: "WADHWANI",         title: "Wadhwani: Employability Skills Job Ready" },
  { slug: "WOJT",             title: "Project Moonshot: OJT Certificate" },
];

document.addEventListener("DOMContentLoaded", () => {

  const grid     = document.getElementById("certTrack");
  const modal    = document.getElementById("certificateModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.getElementById("closeModal");

  // ---------- Diagnostic: verify everything exists ----------
  console.log("[cert] grid:",      grid);
  console.log("[cert] modal:",     modal);
  console.log("[cert] modalImg:",  modalImg);
  console.log("[cert] closeBtn:",  closeBtn);

  // Render tiles
  if (grid) {
    grid.innerHTML = certifications
      .map(
        (c) => `
          <button class="certificate-card" data-certificate="${c.slug}">
            <span class="certificate-card__label">${c.title}</span>
            <span class="certificate-card__view">View certificate</span>
          </button>
        `
      )
      .join("");
    console.log("[cert] rendered", certifications.length, "tiles");
  } else {
    console.error("[cert] #certTrack NOT FOUND in HTML");
  }

  // ---------- Modal ----------
  function openModal(slug) {
    if (!modal)    { console.error("[cert] modal missing");    return; }
    if (!modalImg) { console.error("[cert] modalImg missing"); return; }
    if (!slug)     { console.error("[cert] slug is empty");    return; }

    const path = `./Images/Certifications/${slug}.png`;
    console.log("[cert] opening:", path);

    modalImg.onerror = () => console.error("[cert] FAILED to load:", path);
    modalImg.onload  = () => console.log ("[cert] loaded OK:", path);

    modalImg.src = path;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => { modalImg.removeAttribute("src"); }, 250);
  }

  if (grid) {
    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".certificate-card");
      if (!card) return;
      openModal(card.dataset.certificate);
    });
  }

  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("active")) closeModal();
  });

  // ---------- Carousel ----------
  let certIndex = 0;
  const trackEl     = document.getElementById("certTrack");
  const prevCertBtn = document.getElementById("prevCert");
  const nextCertBtn = document.getElementById("nextCert");
  const GAP = 16;

  function getVisibleCount() {
    const card = trackEl?.querySelector(".certificate-card");
    if (!card || !trackEl) return 1;
    const cardWidth = card.offsetWidth + GAP;
    return Math.max(1, Math.round(trackEl.offsetWidth / cardWidth));
  }

  function getMaxIndex() {
    return Math.max(0, certifications.length - 1);
  }

  function updateCertCarousel() {
    if (!trackEl) return;
    const card = trackEl.querySelector(".certificate-card");
    if (!card) return;

    const max = getMaxIndex();
    if (certIndex > max) certIndex = max;
    if (certIndex < 0) certIndex = 0;

    const cardWidth = card.offsetWidth + GAP;
    trackEl.style.transform = `translateX(-${certIndex * cardWidth}px)`;
  }

  nextCertBtn?.addEventListener("click", () => {
    const max  = getMaxIndex();
    const step = getVisibleCount();
    if (certIndex >= max) {
      certIndex = 0;
    } else {
      certIndex = Math.min(certIndex + step, max);
    }
    updateCertCarousel();
  });

  prevCertBtn?.addEventListener("click", () => {
    const max  = getMaxIndex();
    const step = getVisibleCount();
    if (certIndex <= 0) {
      certIndex = max;
    } else {
      certIndex = Math.max(certIndex - step, 0);
    }
    updateCertCarousel();
  });

  window.addEventListener("resize", updateCertCarousel);
  updateCertCarousel();
});