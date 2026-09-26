// ---------- Experience carousel (middle column) ----------
const experiences = [
  {
    role: "UI/UX Designer",
    desc: "Led Flow Smart's design process as Lead Designer, defining the product's visual direction, building reusable UI components, and turning early ideas into web and mobile experiences. Standardized the team's design workflow, contributing to on-time releases and 99% overall user satisfaction.",
    meta: "Flow Smart — Lead Designer | 2026 – Present",
  },
  {
    role: "UI/UX Designer",
    desc: "Designed user-centered web and mobile interfaces by applying UI/UX best practices, usability, accessibility, and visual consistency while collaborating with clients to deliver high-quality digital solutions, resulting in a 95% customer satisfaction rate and consistent on-time project delivery.",
    meta: "Freelance / Remote | 2022 – Present",
  },
  {
    role: "Lead Generation Specialist",
    desc: "Conducted lead generation and data research by sourcing and verifying email contacts for educational institutions, identifying key decision-makers, and maintaining 95% data accuracy through rigorous validation to support targeted outreach campaigns.",
    meta: "Lead Generation & Data Research | 2026 – 2026",
  },
  {
    role: "UI/UX Designer Intern",
    desc: "Contributed to the design of user-centered interfaces by applying UI/UX principles and user-focused thinking in real-world projects. Enhanced problem-solving and design accuracy while improving digital experiences, resulting in a notable improvement in design efficiency and technical skills within 2 weeks of intensive practice.",
    meta: "Project Moonshot IT Solutions | 2026 – 2026",
  },
  {
    role: "AI Video Annotator",
    desc: "Performed video data annotation for AI and machine learning model training by conducting object tracking, activity labeling, and data validation while maintaining compliance with quality standards, resulting in a 100% QA accuracy score.",
    meta: "AI / ML Data Annotation | 2025 – 2026",
  },
  {
    role: "Project Manager",
    desc: "Led the end-to-end development of a research-based community geo-tagging mobile application, overseeing system design, feature planning, and smart reporting and route optimization functionality, resulting in 92% positive user feedback and successful client acceptance.",
    meta: "Geoport Malaybalay — Capstone | 2022 – 2024",
  },
  {
    role: "Academic Mentoring Secretary & Social Media Manager",
    desc: "Managed academic mentoring initiatives by coordinating activities, maintaining documentation, and facilitating mentor-student communication while developing social media content that increased page engagement and reach by 64%.",
    meta: "BukSU Computer Society | 2022 – 2026",
  },
];

// ---------- Build dots FIRST (before we query them) ----------
const dotsContainer = document.getElementById("experienceDots");

if (dotsContainer) {
  dotsContainer.innerHTML = experiences
    .map(
      (_, i) =>
        `<button class="dot${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Experience ${i + 1}"></button>`
    )
    .join("");
}

// ---------- Now query the freshly-built dots ----------
const slideEl  = document.getElementById("experienceSlide");
const roleEl   = slideEl?.querySelector('[data-field="role"]');
const descEl   = slideEl?.querySelector('[data-field="desc"]');
const metaEl   = slideEl?.querySelector('[data-field="meta"]');
const dots     = document.querySelectorAll("#experienceDots .dot");
const prevBtn  = document.getElementById("prevExperience");
const nextBtn  = document.getElementById("nextExperience");

let currentExperience = 0;
let experienceTimer = null;

function renderExperience(index) {
  const item = experiences[index];
  if (!item || !slideEl) return;

  // restart the fade-in animation
  slideEl.style.animation = "none";
  // eslint-disable-next-line no-unused-expressions
  slideEl.offsetHeight; // force reflow
  slideEl.style.animation = "";

  roleEl.textContent = item.role;
  descEl.textContent = item.desc;
  metaEl.textContent = item.meta;

  dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  currentExperience = index;
}

function goToExperience(index, { restartAutoplay = true } = {}) {
  const total = experiences.length;
  const next = (index + total) % total;
  renderExperience(next);
  if (restartAutoplay) startAutoplay();
}

function startAutoplay() {
  clearInterval(experienceTimer);
  experienceTimer = setInterval(() => {
    goToExperience(currentExperience + 1, { restartAutoplay: false });
  }, 6000);
}

if (slideEl) {
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goToExperience(Number(dot.dataset.index));
    });
  });

  prevBtn?.addEventListener("click", () => goToExperience(currentExperience - 1));
  nextBtn?.addEventListener("click", () => goToExperience(currentExperience + 1));

  // Render the very first experience so the slide is in sync with dot 0
  renderExperience(0);
  startAutoplay();
}

// ---------- Make entire project card clickable ----------
// Each card links to its FIRST button's href.
// If a card has multiple buttons, the others remain clickable individually.
document.querySelectorAll(".proj-row").forEach((card) => {
  const firstBtn = card.querySelector(".proj-btn");
  if (!firstBtn) return;

  // Show pointer + make it keyboard-accessible
  card.style.cursor = "pointer";
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "link");
  card.setAttribute("aria-label", `Open ${card.querySelector(".proj-title")?.textContent || "project"}`);

  const go = () => {
    window.open(firstBtn.href, "_blank", "noopener,noreferrer");
  };

  // Click anywhere on the card except on a link/button directly
  card.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) return;   // let real links handle their own click
    go();
  });

  // Keyboard: Enter or Space triggers the card
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  });
});

// ---------- Project stack (rendered from this array) ----------
const projects = [
  {
    name: "GEOPORT MALAYBALAY (CAPSTONE)",
    year: "2023 – 2025",
    category: "MAJOR PROJECT",
    desc: "Geoport Malaybalay is a community-driven mobile application that enables citizens to report highway and infrastructure issues, including vehicular accidents, in real time. By simply taking a picture, the app automatically geotags the reporter's location using AI-powered image processing. It also provides dynamic rerouting suggestions, helping drivers avoid hazards, improving road safety, and enabling faster response from local authorities.",
    buttons: [
      { label: "Project Web", href: "https://dookiemercado.github.io/GeoportWeb/" },
    ],
  },
  {
    name: "BASE360",
    year: "2026",
    category: "SIDE PROJECTS",
    desc: "A UI/UX design challenge completed as part of the BASE360 application process. The objective was to design a B2C customer communication platform that unifies social comments, direct messages, WhatsApp, SMS, calls, and email into a single intelligent inbox. The project focused on creating a clean, scalable, and user-friendly interface with streamlined workflows, AI-assisted interactions, and a modern design system to improve productivity and enhance the customer support experience.",
    buttons: [
      { label: "View Design", href: "https://www.figma.com/proto/Qx9WKMrrvgrHrb5VTLkrZV/BASE-360?node-id=2-2&viewport=-912%2C856%2C0.36&t=yJ7PVcwwKeQuRwbA-8&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=2%3A2&page-id=0%3A1&hide-ui=1" },
    ],
  },
  {
    name: "VIPTutors Website (Redesign)",
    year: "2026",
    category: "SIDE PROJECTS",
    desc: "A UI/UX redesign concept created as part of the VIPTutors application process. The project focused on improving the website's visual hierarchy, user experience, accessibility, and overall usability while maintaining the brand's identity. The redesign includes a more intuitive layout, refined interface components, and a modern design system to enhance the user journey.",
    buttons: [
      { label: "View Design", href: "https://www.figma.com/proto/nR8exxben6QH9sydIpyLaS/VIP-tutors-Landing-Page-Redesign?page-id=0%3A1&node-id=1-2&viewport=287%2C178%2C0.09&t=NOxgCFxkhqukbXWd-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1%3A2" },
      { label: "Visit Website", href: "https://m.viptutors.co/" },
    ],
  },
  {
    name: "SELLA",
    year: "2026",
    category: "SIDE PROJECTS",
    desc: "SELLA is a modern sales management platform built for growing businesses. From tracking real-time revenue to managing your full product catalog, SELLA gives your team everything they need to close deals faster and stay on top of every order without the complexity of traditional systems.",
    buttons: [
      { label: "View Design", href: "https://www.figma.com/design/FV9aQX2OJ4LYHAYX6aM8g7/Sella?node-id=0-1&t=UsI8pIxk8kcHprtL-1" },
    ],
  },
  {
    name: "COFFEE CLOCK",
    year: "2026",
    category: "SIDE PROJECTS",
    desc: "Coffee Clock is a modern coffee shop reimagined to enhance both aesthetics and user experience. The redesign focuses on creating a warm, inviting environment that balances comfort and functionality, making it ideal for socializing, working, or relaxing. Key elements include a cohesive visual identity, intuitive layout, and attention to detail in furniture, lighting, and branding. This project demonstrates my ability to merge design, atmosphere, and functionality to create a memorable customer experience.",
    buttons: [
      { label: "View Design", href: "https://www.figma.com/design/3T0rU3qFQcKvgj6KbNiJnh/COFFEE-CLOCK?node-id=412-4320&t=p4XP2Ulb5hrC6kFa-1" },
    ],
  },
  {
    name: "TAKESPOT",
    year: "2026",
    category: "SIDE PROJECTS",
    desc: "TakeSpot is a geolocation-based selfie gallery app that turns real-world locations into shared visual stories. Snap a selfie at a spot, drop it on the map, and join a chain of photos left by everyone who's ever stood in that same place. Every location has its own gallery — a Spot Chain that grows over time as more people visit and contribute. Discover spots near you, explore what others have captured there, and leave your mark for the next person to find. It's not just about the photo. It's about the place, the moment, and the people who were there before you.",
    buttons: [
      { label: "View Design", href: "https://www.figma.com/design/RmR9UTq9As6EPwLdd8auPo/Takespot-Design?node-id=0-1&t=4kr30mKqMylkbTGs-1" },
    ],
  },
  {
    name: "BUKSU SAVE PARKING",
    year: "2024",
    category: "SIDE PROJECTS",
    desc: "BukSU Save Parking is a mobile application that allows users to save their parking location and easily navigate back to their parked vehicle using the built-in navigation feature.",
    buttons: [
      { label: "Project Web", href: "https://mercado69.github.io/BUKSU-SAVE-PARKING/" },
      { label: "View Design", href: "https://www.figma.com/design/mA4ZmPUpHXHWpv0meiDvVR/App-Dev-Onboarding?m=auto&t=BO4a8mpli3Vbl4Ca-6" },
    ],
  },
  {
    name: "SHOP GUARD",
    year: "2024",
    category: "SIDE PROJECTS",
    desc: "Shopguard is a mobile-friendly application project designed to help users control shopping addiction by tracking spending habits, setting limits, and providing streaks or warnings when users are close to exceeding their set budget, encouraging smarter spending decisions in real time.",
    buttons: [
      { label: "View Design", href: "https://www.figma.com/design/LBL1l5Ka66BuH6zmwP69P4/SHOP-GUARD?m=auto&t=BO4a8mpli3Vbl4Ca-6" },
    ],
  },
  {
    name: "MIX AND MATCH FURNITURES",
    year: "2021",
    category: "SIDE PROJECTS",
    desc: "Mix & Match Furnitures is a proposed online furniture shopping application that allows users to browse and customize furniture based on their personal style, tailor items to their preferences, and receive smarter recommendations by setting their room size for a better fit and layout.",
    buttons: [
      { label: "View Design", href: "https://www.figma.com/design/2Mq5q1j4U1f5jmjbsV9FGr/Mix-and-Match-Furnitures?m=auto&t=BO4a8mpli3Vbl4Ca-6" },
    ],
  },
];

const stackListEl = document.getElementById("stackList");

if (stackListEl) {
  stackListEl.innerHTML = projects
    .map(
      (project, i) => `
        <article class="proj-row" style="--i:${i};">
          <div class="proj-row-inner">
            <div class="proj-copy">
              <div class="proj-meta">
                <span class="proj-category">${project.category}</span>
                <span class="proj-year">${project.year}</span>
              </div>
              <h3 class="proj-title">${project.name}</h3>
              <p class="proj-desc">${project.desc}</p>
              <div class="proj-buttons">
                ${project.buttons
                  .map(
                    (b) => `
                      <a class="proj-btn" href="${b.href}" target="_blank" rel="noopener noreferrer">
                        ${b.label}
                      </a>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

// ---------- Make entire project card clickable ----------
// Must run AFTER cards are rendered above.
document.querySelectorAll(".proj-row").forEach((card) => {
  const firstBtn = card.querySelector(".proj-btn");
  if (!firstBtn) return;

  card.style.cursor = "pointer";
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "link");
  card.setAttribute(
    "aria-label",
    `Open ${card.querySelector(".proj-title")?.textContent || "project"}`
  );

  const go = () => {
    window.open(firstBtn.href, "_blank", "noopener,noreferrer");
  };

  card.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) return;
    go();
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  });
});

// ---------- Strategy — scroll-driven text reveal ----------
const strategySection = document.getElementById("strategy");

if (strategySection) {
  const paragraphs = strategySection.querySelectorAll(".strategy-text");
  const allWords = [];

  paragraphs.forEach((p) => {
    const words = p.textContent.trim().split(/\s+/);
    p.innerHTML = words
      .map((w) => `<span class="word">${w}</span>`)
      .join(" ");
    p.querySelectorAll(".word").forEach((span) => allWords.push(span));
  });

  function updateStrategyReveal() {
    const rect = strategySection.getBoundingClientRect();
    const vh = window.innerHeight;

    const start = vh * 0.85;
    const end = vh * 0.25;
    const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

    const lit = Math.floor(progress * allWords.length);
    allWords.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
  }

  window.addEventListener("scroll", updateStrategyReveal, { passive: true });
  window.addEventListener("resize", updateStrategyReveal);
  updateStrategyReveal();
}