import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HealthRecord from "./pages/HealthRecord";
import Emergency from "./pages/Emergency";
import AIHealth from "./pages/AIHealth";
import ProviderDetails from "./pages/ProviderDetails";
import Profile from "./pages/Profile";
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route
          path="/animals"
          element={
            <ProtectedRoute>
              <Animals />
            </ProtectedRoute>
          }
        />
        <Route
  path="/provider/:id"
  element={
    <ProtectedRoute>
      <ProviderDetails />
    </ProtectedRoute>
  }
/>
          <Route
          path="/health"
          element={
            <ProtectedRoute>
              <HealthRecord />
            </ProtectedRoute>
          }
        />
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
          {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
 <Route
          path="/ai-health"
          element={
            <ProtectedRoute>
              <AIHealth />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;