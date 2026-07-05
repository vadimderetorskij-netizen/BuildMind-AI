import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    client: "",
    address: "",
    type: "",
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function createProject(event) {
    event.preventDefault();

    if (!form.name) {
      alert("Введи назву проєкту");
      return;
    }

    setProjects([...projects, form]);

    setForm({
      name: "",
      client: "",
      address: "",
      type: "",
    });

    setShowForm(false);
  }

  function deleteProject(indexToDelete) {
    const updatedProjects = projects.filter(
      (project, index) => index !== indexToDelete
    );

    setProjects(updatedProjects);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🏗️ BuildMind AI</h1>
        <p>AI для аналізу креслень та автоматичного кошторису</p>
      </header>

      <main className="content">
        <button className="btn" onClick={() => setShowForm(true)}>
  📁 Новий проєкт
</button>

<label className="btn">
  📄 Завантажити PDF
  {selectedFile && (
  <p>📄 Вибраний файл: {selectedFile.name}</p>
)}
  <input
  type="file"
  accept=".pdf"
  style={{ display: "none" }}
  onChange={(e) => setSelectedFile(e.target.files[0])}
/>
</label>
        {showForm && (
          <form className="project-form" onSubmit={createProject}>
            <h2>Новий проєкт</h2>

            <input name="name" placeholder="Назва проєкту" value={form.name} onChange={handleChange} />
            <input name="client" placeholder="Замовник" value={form.client} onChange={handleChange} />
            <input name="address" placeholder="Адреса" value={form.address} onChange={handleChange} />
            <input name="type" placeholder="Тип будівлі" value={form.type} onChange={handleChange} />

            <button className="btn" type="submit">
              Створити
            </button>
          </form>
        )}

        <div className="projects">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <h3>🏗️ {project.name}</h3>
              <p><b>Замовник:</b> {project.client}</p>
              <p><b>Адреса:</b> {project.address}</p>
              <p><b>Тип:</b> {project.type}</p>

              <button className="delete-btn" onClick={() => deleteProject(index)}>
                Видалити
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;