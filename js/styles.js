/*!
 * Mario Wiecha | Webdesigner
 * www.mario-wiecha.de
 */
// Automatisches Jahr im Footer aktualisieren
document.getElementById("jahr").textContent = new Date().getFullYear();
// ======= Hamburger-Menü =======
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});
// ======= Menü schließen nach Klick auf Link =======
document.querySelectorAll(".nav-button").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
// === Countdown bis zum angegebenen Datum ===
const zielDatum = new Date("2025-12-15T00:00:00").getTime(); // 🕒 <— Datum hier anpassen
const countdownEl = document.getElementById("countdown");

const timer = setInterval(() => {
  const jetzt = new Date().getTime();
  const differenz = zielDatum - jetzt;

  if (differenz <= 0) {
    clearInterval(timer);
    countdownEl.textContent = "Der neue Auftritt ist jetzt online!";
    countdownEl.style.color = "#0f0";
    return;
  }

  const tage = Math.floor(differenz / (1000 * 60 * 60 * 24));
  const stunden = Math.floor(
    (differenz % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minuten = Math.floor((differenz % (1000 * 60 * 60)) / (1000 * 60));
  const sekunden = Math.floor((differenz % (1000 * 60)) / 1000);

  countdownEl.textContent = `${tage}T ${stunden}Std ${minuten}Min ${sekunden}Sek`;
}, 1000);

// Lightbox-Funktionalität für Bilder

document.addEventListener("DOMContentLoaded", function () {
  const footerImage = document.querySelector(".footer-inhalt img");
  const lightbox = document.getElementById("footerLightbox");
  const lightboxImg = document.getElementById("footerLightboxImg");

  footerImage.addEventListener("click", () => {
    lightboxImg.src = footerImage.src;
    lightbox.style.display = "flex";
    setTimeout(() => lightbox.classList.add("show"), 10);
  });

  // Klick außerhalb oder auf das Bild schließt die Lightbox
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
      lightbox.classList.remove("show");
      setTimeout(() => (lightbox.style.display = "none"), 300);
    }
  });
});

// Weinachten und Silvester
function updateNavbarSeason() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const display = document.getElementById("navbar-season-display");
  const content = document.getElementById("season-content");
  if (!display || !content) return;

  let targetDate = null;
  let prefix = "";
  let isLive = false;

  // WEIHNACHTEN (01.12. - 26.12.)
  if (month === 11 && day <= 26) {
    display.style.color = "#ff6b6b"; // Ein helleres, schöneres Rot
    if (day >= 24 && day <= 26) {
      content.innerHTML = `🎄 Frohe Weihnachten! 🎁`;
      display.style.display = "block";
      return;
    } else {
      targetDate = new Date(`December 24, ${year} 00:00:00`);
      prefix = "🎅 Bis Heiligabend: ";
      isLive = true;
    }
  }
  // SILVESTER (27.12. - 01.01.)
  else if ((month === 11 && day >= 27) || (month === 0 && day === 1)) {
    display.style.color = "#d4af37"; // Gold
    if (month === 0 && day === 1) {
      content.innerHTML = `🎆 Frohes neues Jahr ${year}! 🥂`;
      display.style.display = "block";
      return;
    } else {
      const nextYear = year + 1;
      targetDate = new Date(`January 1, ${nextYear} 00:00:00`);
      prefix = "⏳ Silvester in: ";
      isLive = true;
    }
  } else {
    display.style.display = "none";
    return;
  }

  if (isLive && targetDate) {
    const diff = targetDate - now;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((diff / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor((diff / 1000) % 60)
      .toString()
      .padStart(2, "0");

    content.innerHTML = `${prefix} ${d}d ${h}h ${m}m ${s}s`;
    display.style.display = "block";
  }
}

setInterval(updateNavbarSeason, 1000);
updateNavbarSeason();

//------------------//
//   Sweetalert    //
//----------------//

document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.querySelector(".ueber-mich-trigger");

  trigger.addEventListener("click", function (e) {
    e.preventDefault(); // Verhindert, dass die Seite springt

    Swal.fire({
      title: "<strong>Dein Partner für moderne Web-Lösungen</strong>",
      // icon: 'info',
      html: `
                <div style="text-align: left; font-family: sans-serif; line-height: 1.5;">
                    <p><strong>Hi 👋, ich bin Mario!</strong></p>
                    <br>
                    <p>Der Weg zu einer großartigen Website beginnt nicht mit einer langen Liste von Projekten, sondern mit einer klaren Vision und der Begeisterung für das Detail.</p>
                    <p>Aktuell baue ich mein Portfolio auf <strong>mario-wiecha.de</strong> auf. Das ist deine Chance: Da ich mich gerade in der Startphase befinde, profitiere ich nicht von Routine, sondern von frischem Wissen, modernsten Technologien und 100% Fokus auf dein Projekt.</p>
                    <br>
                    <p><strong>Was du von mir erwarten kannst:</strong></p>
                    <ul style="margin-left: 15px;">
                        <li><strong>Individuelle Betreuung:</strong> Dein Projekt ist bei mir keine „Nummer“. Ich nehme mir die Zeit, deine Ziele wirklich zu verstehen.</li>
                        <li><strong>Modernes Design & Technik:</strong> Aktuelle Standards für Speed, Sicherheit und alle Endgeräte (Responsive Design).</li>
                        <li><strong>Transparenz:</strong> Wir entwickeln deine Seite Schritt für Schritt gemeinsam. Du weißt immer genau, woran ich arbeite.</li>
                    </ul>
                    <br>
                    <p><strong>Warum ich das mache?</strong></p>
                    <p>Weil ich davon überzeugt bin, dass jede Idee eine professionelle digitale Bühne verdient. Ich möchte Lösungen schaffen, die funktionieren und dich weiterbringen.</p>
                    <br>
                    <p><em>Lass uns gemeinsam den ersten Schritt gehen!</em></p>
                    <br>
                    <p>Hast du eine Idee im Kopf? Schreib mir einfach eine Nachricht. Ich freue mich darauf, mein erstes großes Projekt gemeinsam mit dir zu realisieren.</p>
                </div>
            `,
      showCloseButton: true,
      confirmButtonText: "Schliessen 👍",
      showConfirmButton: false,
      confirmButtonColor: "rgba(48, 133, 214, 1)",
      width: "700px", // Breiter für bessere Lesbarkeit des langen Textes
      padding: "2em",
      background: "rgba(0, 0, 0, 0.45)",
      color: "rgba(255, 255, 255, 1)",
    });
  });
});
// Universelle Funktion zum Laden und Anzeigen von Inhalten in SweetAlert2
async function loadAndShowModal(fileName, title) {
  // Zeige ein Lade-Symbol, falls die Datei groß ist
  Swal.fire({
    title: "Lade...",
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch(fileName);
    if (!response.ok) throw new Error("Datei nicht gefunden");
    const text = await response.text();

    Swal.fire({
      title: `<span style="color: #ffffffff;">${title}</span>`,
      html: `<div style="text-align: left; font-size: 0.95rem; max-height: 50vh; overflow-y: auto; padding: 5px;">${text}</div>`,
      width: "800px",
      confirmButtonText: "OK ✔",
      showConfirmButton: false,
      confirmButtonColor: "#3085d6",
      showCloseButton: true,
      background: "rgba(0, 0, 0, 0.75)",
      color: "rgba(255, 255, 255, 1)",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Fehler",
      text: "Inhalt konnte nicht geladen werden. Bitte versuche es später erneut.",
    });
  }
}

// Event Listener für die Footer-Links
document.addEventListener("DOMContentLoaded", () => {
  // Über Mich
  document.getElementById("ueber_mich").addEventListener("click", (e) => {
    e.preventDefault();
    loadAndShowModal(
      "ueber_mich.html",
      "Dein Partner für moderne Web-Lösungen",
    );
  });

  // Impressum
  document.getElementById("impressum-link").addEventListener("click", (e) => {
    e.preventDefault();
    loadAndShowModal("impressum.html", "Impressum");
  });

  // Datenschutz
  document.getElementById("datenschutz-link").addEventListener("click", (e) => {
    e.preventDefault();
    loadAndShowModal("datenschutz.html", "Datenschutzerklärung");
  });
});

//------------------//
// Kontaktformular //
//----------------//

const contactForm = document.getElementById("contactForm");
const responseDiv = document.getElementById("formResponse");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Verhindert das Neuladen der Seite und das Absenden an senden.php

    // Schickes SweetAlert2-Modal für die Demo-Umgebung anzeigen
    Swal.fire({
      title: "Demo-Umgebung",
      text: "Das Absenden von Formularen ist in dieser Live-Vorschau deaktiviert.",
      icon: "info",
      confirmButtonText: "Verstanden",
      confirmButtonColor: "#3085d6",
      background: "rgba(0, 0, 0, 0.75)", // Passend zu deinen restlichen Modals abgedunkelt
      color: "rgba(255, 255, 255, 1)",   // Weiße Schrift für guten Kontrast
    });

    // Optional: Das Formular nach dem Klick zurücksetzen
    contactForm.reset();
  });
}
// ------------ //
// Cookiebanne //
// ---------- //
document.addEventListener("DOMContentLoaded", function () {
  // Nur anzeigen, wenn noch keine Entscheidung getroffen wurde
  if (!localStorage.getItem("cookieConsent")) {
    loadAndShowBanner();
  }
});

// Konfiguration: Nach wie vielen Tagen soll das Banner erneut erscheinen?
const REAPPEAR_DAYS = 30;

document.addEventListener("DOMContentLoaded", function () {
  if (shouldShowBanner()) {
    loadAndShowBanner();
  }
});

function shouldShowBanner() {
  const consentData = localStorage.getItem("cookieConsent");

  // Fall 1: Noch nie eine Entscheidung getroffen
  if (!consentData) return true;

  const data = JSON.parse(consentData);
  const lastDecision = new Date(data.date);
  const now = new Date();

  // Differenz in Tagen berechnen
  const diffTime = Math.abs(now - lastDecision);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Fall 2: Entscheidung ist älter als das Limit
  return diffDays > REAPPEAR_DAYS;
}

function saveConsent(level) {
  const data = {
    choice: level,
    date: new Date().toISOString(), // Speichert den aktuellen Zeitpunkt
  };
  localStorage.setItem("cookieConsent", JSON.stringify(data));
}

//------------------------------------//

async function loadAndShowBanner() {
  const response = await fetch("cookie-content.html");
  const htmlContent = await response.text();

  Swal.fire({
    title: "Datenschutz-Einstellungen",
    html: htmlContent,
    showDenyButton: true,
    confirmButtonText: "Alle akzeptieren",
    denyButtonText: "Nur notwendige",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("cookieConsent", "all");
    } else if (result.isDenied) {
      localStorage.setItem("cookieConsent", "necessary");
    }
  });
}

// Initialer Start
if (!localStorage.getItem("cookieConsent")) {
  loadAndShowBanner();
}

async function loadAndShowBanner() {
  try {
    // 1. Externe HTML-Datei laden
    const response = await fetch("cookie-content.html"); // Pfad anpassen!
    if (!response.ok) throw new Error("HTML konnte nicht geladen werden");
    const htmlContent = await response.text();

    // 2. SweetAlert2 mit dem geladenen HTML anzeigen
    Swal.fire({
      title: "Datenschutz & Cookies",
      html: htmlContent, // Hier wird der Inhalt eingefügt
      icon: "shield",
      showDenyButton: true,
      confirmButtonText: "Alle akzeptieren",
      denyButtonText: "Nur notwendige",
      confirmButtonColor: "#28a745",
      denyButtonColor: "#6c757d",
      allowOutsideClick: true,
      allowEscapeKey: true,
      width: "600px",
      background: "rgba(0, 0, 0, 0.75)",
      color: "rgba(255, 255, 255, 1)",
      customClass: {
        popup: "my-cookie-popup", // Optionale CSS-Klasse für Styling
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("cookieConsent", "all");
        activateTracking();
      } else if (result.isDenied) {
        localStorage.setItem("cookieConsent", "necessary");
        disableTracking();
      }
    });
  } catch (error) {
    console.error("Fehler beim Laden des Cookie-Banners:", error);
  }
}

function activateTracking() {
  console.log("Tracking aktiviert.");
  // Hier Google Analytics etc. initialisieren
}

function disableTracking() {
  console.log("Nur technisch notwendige Cookies gesetzt.");
}

//////////////////////////////////////////////////////////////
// Daten & Logik Hier trage ich meine echten Projekte ein. //
////////////////////////////////////////////////////////////

const myProjects = [
  {
    title: "Meine Portfolio",
    url: "https://www.mario-wiecha.de",
    date: "April 2026",
    status: "done",
    active: false,
    hint: "Mein eigenes Portfolio zur Demostration,<br>da seit Ihr bereits drauf !",
    desc: "Meine Webseite wurde explizit mit HTML5, modernem CSS3 und JavaScript für ein optimales Nutzererlebnis erstellt.",
    stack: ["HTML5", "CSS3", "JavaScript"],
  }
];

function loadPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  grid.innerHTML = ""; // Falls neu geladen wird

  myProjects.forEach((p) => {
    const icon = `https://www.google.com/s2/favicons?domain=${p.url}&sz=128`;
    const statusLabel =
      p.status === "work" ? "Ist Abgeschlossen" : "Noch in Arbeit";
    const statusClass = p.status === "done" ? "status-done" : "status-work";

    // Logik für den Button-Zustand
    const buttonAttr = p.active
      ? `href="${p.url}" target="_blank"`
      : `class="btn-open disabled"`;
    const hintHtml =
      !p.active && p.hint ? `<p class="btn-hint">${p.hint}</p>` : "";

    const card = document.createElement("div");
    card.className = "portfolio-card";
    card.innerHTML = `
            <div class="card-meta">
                <span class="${statusClass}">${statusLabel}</span>
                <span style="color: #313131ff;">${p.date}</span>
            </div>
            <div class="card-header">
                <img src="${icon}" class="fav-logo" alt="Logo">
                <h3 class="card-title">${p.title}</h3>
            </div>
            <div class="tech-tags">
                ${p.stack.map((t) => `<span class="tag">${t}</span>`).join("")}
            </div>
            <p class="card-desc">${p.desc}</p>
            <a ${p.active ? buttonAttr : ""} class="btn-open ${!p.active ? "disabled" : ""}">${p.active ? "Projekt öffnen" : "Button deaktiviert"}</a>
            ${hintHtml}
        `;
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadPortfolio);

// github-api.js (Deine externe JavaScript-Datei)

const githubUsername = "M-Wiecha";

async function fetchGitHubRepositories() {
    const container = document.getElementById('github-projects-container');
    const loadingIndicator = document.getElementById('projects-loading');

    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('Fehler beim Laden der GitHub-Daten');
        }

        const repos = await response.json();
        loadingIndicator.style.display = 'none';

        if (repos.length === 0) {
            container.innerHTML = '<p class="intro-text">Keine öffentlichen Repositories gefunden.</p>';
            return;
        }

        container.innerHTML = '';

        repos.forEach(repo => {
            if (repo.fork) return;

            const card = document.createElement('div');
            card.className = 'project-card';

            const displayTitle = repo.name.replace(/-/g, ' ');
            const description = repo.description || "Keine Beschreibung im GitHub-Repository hinterlegt.";

            let tagsHTML = '';
            if (repo.language) {
                tagsHTML += `<span class="badge badge-tech">#${repo.language.toLowerCase()}</span>`;
            }
            
            if (repo.name.toLowerCase().includes('css')) {
                tagsHTML += `<span class="badge badge-tech">#css</span>`;
            }
            if (repo.name.toLowerCase().includes('html')) {
                tagsHTML += `<span class="badge badge-tech">#html</span>`;
            }

            // ================= HIER WURDE DER CODE EINGEBAUT =================
            if (repo.license) {
                const licenseUrl = repo.license.url ? `https://choosealicense.com/licenses/${repo.license.key}/` : `https://opensource.org/licenses/MIT`;
                tagsHTML += `<a href="${licenseUrl}" target="_blank" class="badge badge-license" title="Zur Lizenz wechseln">${repo.license.name}</a>`;
            } else {
                // Wenn du manche Repos als Anschauungsmaterial ohne Lizenz anlegst:
                tagsHTML += `<span class="badge" style="background-color: #2d1e1e; color: #ff7b72; border: 1px solid #422424;">© Nur Anschauungsmaterial</span>`;
            }
            // =================================================================

            const liveDemoHTML = repo.homepage 
                ? `<a href="${repo.homepage}" target="_blank">🌐 Live-Demo</a>` 
                : `<a href="#" style="color: #484f58; pointer-events: none; text-decoration: none;">🌐 Keine Demo</a>`;

            card.innerHTML = `
                <h2>${displayTitle}</h2>
                <p class="project-description">${description}</p>
                
                <div class="tags-container">
                    ${tagsHTML}
                </div>

                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank">🔗 GitHub</a>
                    ${liveDemoHTML}
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        loadingIndicator.innerText = "Fehler beim Laden der Projekte. Bitte lade die Seite neu.";
    }
}

document.addEventListener("DOMContentLoaded", fetchGitHubRepositories);