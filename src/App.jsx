import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Provider from "./pages/Provider";
import AIHealth from "./pages/AIHealth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/provider/:id" element={<Provider />} />
        <Route path="/ai-health" element={<AIHealth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;