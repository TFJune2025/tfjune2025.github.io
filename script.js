document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
});

async function loadProjects() {
  const grid = document.getElementById("project-grid");

  try {
    const response = await fetch("data/projects.json");
    const data = await response.json();

    grid.innerHTML = "";

    data.projects.forEach((project) => {
      grid.appendChild(createProjectCard(project));
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    grid.innerHTML = "<p>Unable to load projects right now.</p>";
  }
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = `project-card${project.featured ? " featured" : ""}`;

  const badges = (project.badges || [])
    .map((badge) => `<span class="badge">${badge}</span>`)
    .join("");

  const actions = [
    project.repo ? `<a class="btn secondary" href="${project.repo}" target="_blank" rel="noreferrer">Repo</a>` : "",
    project.demo ? `<a class="btn primary" href="${project.demo}" target="_blank" rel="noreferrer">Live Demo</a>` : "",
    project.docs ? `<a class="btn outline" href="${project.docs}" target="_blank" rel="noreferrer">Docs</a>` : ""
  ]
    .filter(Boolean)
    .join("");

  card.innerHTML = `
    <div class="project-type">${project.type}</div>
    <h3>${project.title}</h3>
    <p>${project.summary}</p>
    <div class="badges">${badges}</div>
    <div class="card-actions">${actions}</div>
  `;

  return card;
}