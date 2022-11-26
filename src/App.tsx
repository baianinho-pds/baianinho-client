import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import MateriaPrima from "./pages/MateriaPrima";
import SidebarMaterialUi from "./components/SidebarMaterialUi";
function App() {
  return (
    <BrowserRouter>
      <div className="container-page">
        <SidebarMaterialUi />
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
