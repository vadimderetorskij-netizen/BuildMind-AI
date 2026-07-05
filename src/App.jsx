import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./App.css";
import ProjectCard from "./components/ProjectCard";
import AnalysisCard from "./components/AnalysisCard";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
 const [numPages, setNumPages] = useState(0);
 const [pageNumber, setPageNumber] = useState(1);
 const [pdfWidth, setPdfWidth] = useState(600);
 const [pdfText, setPdfText] = useState("");
 const [analysis, setAnalysis] = useState(null);
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
async function extractText(file) {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjs.getDocument(arrayBuffer).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    text += content.items.map(item => item.str).join(" ");
    text += "\n";
    console.log(text);
    setPdfText(text);
  }

  setPdfText(text);
}
function analyzeDrawing() {
  if (!pdfText) {
    alert("Спочатку завантаж PDF");
    return;
  }

  const rooms = (pdfText.match(/ROOM|POM|CLASS|SALA/gi) || []).length;
  const doors = (pdfText.match(/DOOR|DRZWI/gi) || []).length;
  const windows = (pdfText.match(/WINDOW|OKNO/gi) || []).length;

  setAnalysis({
    fileName: selectedFile.name,
    rooms,
    walls: "визначаються...",
    concrete: "розраховується...",
    materials: windows + doors,
  });
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
        <input
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            setSelectedFile(file);

            if (file) {
              extractText(file);
            }
          }}
        />
      </label>

      {selectedFile && (
        <>
          <p>📄 Вибраний файл: {selectedFile.name}</p>

          <Document
            file={selectedFile}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setPageNumber(1);
            }}
          >
            <Page pageNumber={pageNumber} width={pdfWidth} />
          </Document>

          <div className="pdf-controls">
            <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
              ⬅ Попередня
            </button>

            <span>Сторінка {pageNumber} / {numPages}</span>

            <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
              Наступна ➡
            </button>

            <button onClick={() => setPdfWidth(pdfWidth - 100)}>−</button>
            <button onClick={() => setPdfWidth(pdfWidth + 100)}>+</button>

            <button onClick={analyzeDrawing}>🤖 Аналізувати</button>
          </div>

          <AnalysisCard analysis={analysis} />

          {pdfText && (
            <div className="project-card">
              <h3>📄 Текст з PDF</h3>
              <pre style={{ whiteSpace: "pre-wrap", maxHeight: "300px", overflow: "auto" }}>
                {pdfText}
              </pre>
            </div>
          )}
        </>
      )}

      {showForm && (
        <form className="project-form" onSubmit={createProject}>
          <h2>Новий проєкт</h2>

          <input name="name" placeholder="Назва проєкту" value={form.name} onChange={handleChange} />
          <input name="client" placeholder="Замовник" value={form.client} onChange={handleChange} />
          <input name="address" placeholder="Адреса" value={form.address} onChange={handleChange} />
          <input name="type" placeholder="Тип будівлі" value={form.type} onChange={handleChange} />

          <button className="btn" type="submit">Створити</button>
        </form>
      )}

      <div className="projects">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            deleteProject={deleteProject}
          />
        ))}
      </div>
    </main>
  </div>
);
}

export default App;