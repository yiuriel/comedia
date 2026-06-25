import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import BitsPage from "./pages/BitsPage";
import MonologuesPage from "./pages/MonologuesPage";

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <Header />
      <main className="flex-1 min-h-0">
        <Routes>
          <Route path="/" element={<BitsPage />} />
          <Route path="/monologues" element={<MonologuesPage />} />
        </Routes>
      </main>
    </div>
  );
}
