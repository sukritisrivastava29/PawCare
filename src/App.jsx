import { BrowserRouter, Routes, Route } from "react-router-dom";
import Animals from "./pages/Animals";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Provider from "./pages/Provider";
import AIHealth from "./pages/AIHealth";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/provider/:id" element={<Provider />} />
        <Route path="/ai-health" element={<AIHealth />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;