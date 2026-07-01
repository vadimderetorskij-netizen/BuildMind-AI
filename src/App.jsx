import "./App.css";

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🏗️ BuildMind AI</h2>
        <button>+ Новий проєкт</button>

        <nav>
          <p>📂 Проєкти</p>
          <p>📄 Креслення</p>
          <p>📐 Takeoff</p>
          <p>🧱 Матеріали</p>
          <p>💰 Кошторис</p>
          <p>🚚 Закупівлі</p>
          <p>🤖 AI Assistant</p>
        </nav>
      </aside>

      <main className="main">
        <h1>Панель проєктів</h1>
        <p>Завантаж PDF/DWG, порахуй обʼєми, матеріали та кошторис.</p>

        <div className="cards">
          <div className="card">
            <h3>ЖК Green Park</h3>
            <p>PDF: 3 файли</p>
            <p>Статус: чорновий кошторис</p>
          </div>

          <div className="card">
            <h3>Будинок Kowalski</h3>
            <p>PDF: 1 файл</p>
            <p>Статус: очікує аналізу</p>
          </div>

          <div className="card new">
            <h3>+ Створити новий проєкт</h3>
            <p>Почати новий розрахунок</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;