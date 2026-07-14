import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <header className="app-header">
        <h1>🎮 QuestLog</h1>
        <p>Discover, explore, and track your next favorite game.</p>
      </header>

      
      <main style={{ flex: 1 }}>
        <AppRoutes />
      </main>

      
      <Footer />
    </div>
  );
}


export default App;
