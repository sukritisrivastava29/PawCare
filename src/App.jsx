import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Provider from "./pages/Provider";
import Emergency from "./pages/Emergency";
import PetProfile from "./pages/PetProfile";
import HealthRecord from "./pages/HealthRecord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/provider/:id" element={<Provider />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/pet" element={<PetProfile />} />
        <Route path="/health-record" element={<HealthRecord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;