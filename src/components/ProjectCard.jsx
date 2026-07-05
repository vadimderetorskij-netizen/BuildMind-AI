function ProjectCard({ project, index, deleteProject }) {
  return (
    <div className="project-card">
      <h3>🏗️ {project.name}</h3>
      <p><b>Замовник:</b> {project.client}</p>
      <p><b>Адреса:</b> {project.address}</p>
      <p><b>Тип:</b> {project.type}</p>

      <button className="delete-btn" onClick={() => deleteProject(index)}>
        Видалити
      </button>
    </div>
  );
}

export default ProjectCard;