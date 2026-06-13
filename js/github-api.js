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