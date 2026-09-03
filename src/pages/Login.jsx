import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/animals");
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to PawCare");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] flex items-center justify-center px-6">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-[32px] overflow-hidden shadow-xl">

        {/* LEFT */}
        <div className="hidden md:flex bg-[#f2eee7] p-12 flex-col justify-between">

          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-11 h-11 rounded-2xl bg-[#d97745] flex items-center justify-center text-white text-xl">
                🐾
              </div>

              <span className="text-2xl font-bold text-[#292722]">
                PawCare
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-tight text-[#292722]">
              Better care
              <br />
              for every
              <br />
              <span className="text-[#d97745]">animal.</span>
            </h1>

            <p className="mt-6 text-[#706b63] text-lg leading-relaxed max-w-sm">
              Keep animal profiles, health information and care
              details organised in one place.
            </p>
          </div>

          <p className="text-sm text-[#8c867c]">
            For pet parents & rescuers
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-8 md:p-12">

          <div className="max-w-md mx-auto">

            <div className="mb-10">
              <p className="text-sm font-semibold text-[#d97745] mb-2">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold text-[#292722]">
                Sign in to PawCare
              </h2>

              <p className="text-[#817b72] mt-2">
                Continue caring for the animals you love.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl bg-red-50 border border-red-100 text-red-600 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-semibold text-[#403d38] mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-[#ded9d0] bg-[#fcfbf9] outline-none focus:border-[#d97745] focus:ring-2 focus:ring-[#d97745]/10 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#403d38] mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-[#ded9d0] bg-[#fcfbf9] outline-none focus:border-[#d97745] focus:ring-2 focus:ring-[#d97745]/10 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#292722] text-white font-semibold hover:bg-[#3b3934] transition disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

            </form>

            <p className="text-center text-sm text-[#8b857b] mt-8">
              PawCare · Animal care made simpler
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;