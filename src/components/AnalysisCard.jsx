function AnalysisCard({ analysis }) {
  if (!analysis) {
    return null;
  }

  return (
    <div className="project-card">
      <h3>🤖 AI Аналіз креслення</h3>
      <p><b>Файл:</b> {analysis.fileName}</p>
      <p><b>Кімнати:</b> {analysis.rooms}</p>
      <p><b>Стіни:</b> {analysis.walls}</p>
      <p><b>Бетон:</b> {analysis.concrete}</p>
      <p><b>Матеріали:</b> {analysis.materials}</p>
    </div>
  );
}

export default AnalysisCard;