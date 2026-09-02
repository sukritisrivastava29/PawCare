import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function AIHealth() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm PawCare AI. Tell me what you're noticing about your pet, and I'll help you understand what information may be useful to discuss with a veterinarian.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to get response from PawCare AI"
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply || "I couldn't generate a response. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("AI ERROR:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            error.message ||
            "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="pawcare-app">
      <Navbar />

      <main className="ai-page">
        <div className="container">

          <Link to="/" className="back-link">
            ← Back home
          </Link>

          <div className="page-heading">
            <p className="eyebrow">AI HEALTH ASSISTANT</p>

            <h1>
              Make pet health
              <span> easier to understand.</span>
            </h1>

            <p>
              Describe your pet's symptoms and get general,
              easy-to-understand guidance to help you decide what
              to discuss with a veterinarian.
            </p>
          </div>

          <div className="ai-grid">

            <div className="ai-chat-card">

              <div className="ai-chat-header">
                <span>✦ PAWCARE AI</span>
                <small>Gemini</small>
              </div>

              <div className="ai-messages">

                {messages.map((item, index) => (
                  <div
                    key={index}
                    className={`chat-bubble ${
                      item.role === "user"
                        ? "user-bubble"
                        : "ai-bubble"
                    }`}
                  >
                    {item.text}
                  </div>
                ))}

                {loading && (
                  <div className="chat-bubble ai-bubble">
                    Thinking...
                  </div>
                )}

              </div>

              <div className="ai-input">

                <input
                  type="text"
                  placeholder="Describe your pet's symptoms..."
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!message.trim() || loading}
                  aria-label="Send message"
                >
                  →
                </button>

              </div>

              <p className="ai-disclaimer">
                PawCare AI provides general information and does
                not diagnose conditions or replace professional
                veterinary advice. For emergencies, contact a
                veterinarian immediately.
              </p>

              <Link
                to="/search"
                className="ai-care-button"
              >
                Find nearby care
              </Link>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default AIHealth;