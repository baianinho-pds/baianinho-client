import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import MateriaPrima from "./pages/MateriaPrima";
function App() {
  return (
    <BrowserRouter>
      <div className="container-page">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/materia-prima" element={<MateriaPrima />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
