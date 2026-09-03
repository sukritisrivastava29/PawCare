import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./AIHealth.css";

const API_URL = "https://pawcare-backend-vswt.onrender.com/api";
function formatAIText(text) {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={index} className="ai-space" />;
    }

    if (/^#{1,3}\s+/.test(trimmed)) {
      return (
        <div key={index} className="ai-section-title">
          {trimmed.replace(/^#{1,3}\s+/, "")}
        </div>
      );
    }

    if (
      trimmed.startsWith("**") &&
      trimmed.endsWith("**") &&
      trimmed.length > 4
    ) {
      return (
        <div key={index} className="ai-section-title">
          {trimmed.replace(/\*\*/g, "")}
        </div>
      );
    }

    if (
      trimmed.startsWith("- ") ||
      trimmed.startsWith("* ") ||
      trimmed.startsWith("• ")
    ) {
      const bulletText = trimmed.replace(/^[-*•]\s+/, "");

      const parts = bulletText.split(/(\*\*.*?\*\*)/g);

      return (
        <div key={index} className="ai-bullet">
          <span className="bullet-dot">•</span>

          <span>
            {parts.map((part, partIndex) => {
              if (
                part.startsWith("**") &&
                part.endsWith("**")
              ) {
                return (
                  <strong key={partIndex}>
                    {part.replace(/\*\*/g, "")}
                  </strong>
                );
              }

              return part;
            })}
          </span>
        </div>
      );
    }

    // Normal paragraph
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);

    return (
      <p key={index} className="ai-paragraph">
        {parts.map((part, partIndex) => {
          if (
            part.startsWith("**") &&
            part.endsWith("**")
          ) {
            return (
              <strong key={partIndex}>
                {part.replace(/\*\*/g, "")}
              </strong>
            );
          }

          return part;
        })}
      </p>
    );
  });
}

function AIHealth() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "Hi! I'm PawCare AI. Tell me what you're noticing about your pet, and I'll help you understand what information may be useful to discuss with a veterinarian.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    const token = localStorage.getItem("token");

    // User isn't logged in
    if (!token) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Please log in to use PawCare AI.",
          isError: true,
        },
      ]);

      return;
    }

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
      const response = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          // 🔥 THIS FIXES THE 401
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      console.log("AI response:", response.status, data);

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Failed to get response from PawCare AI"
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.reply ||
            "I couldn't generate a response. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("AI ERROR:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "I'm having trouble connecting to PawCare AI right now. Please try again in a moment.",
          isError: true,
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
        <div className="ai-container">

          <Link to="/" className="back-link">
            ← Back home
          </Link>

          <section className="ai-heading">
            <p className="ai-eyebrow">
              AI HEALTH ASSISTANT
            </p>

            <h1>
              Make pet health
              <span> easier to understand.</span>
            </h1>

            <p className="ai-intro">
              Describe what you're noticing about your pet and
              get general information to help you decide what
              to discuss with a veterinarian.
            </p>
          </section>

          <section className="ai-chat-card">

            <div className="ai-chat-header">
              <div className="ai-brand">
                <div className="ai-brand-icon">
                  ✦
                </div>

                <div>
                  <strong>PawCare AI</strong>
                  <span>Pet health assistant</span>
                </div>
              </div>

              <div className="ai-status">
                <span className="status-dot"></span>
                Online
              </div>
            </div>

            <div className="ai-messages">

              <div className="conversation-label">
                TODAY
              </div>

              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`message-row ${
                    item.role === "user"
                      ? "user-row"
                      : "ai-row"
                  }`}
                >
                  {item.role === "ai" && (
                    <div className="message-avatar">
                      ✦
                    </div>
                  )}

                  <div
                    className={`chat-bubble ${
                      item.role === "user"
                        ? "user-bubble"
                        : "ai-bubble"
                    } ${
                      item.isError
                        ? "error-bubble"
                        : ""
                    }`}
                  >
                    {item.role === "ai"
                      ? formatAIText(item.text)
                      : item.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-row ai-row">
                  <div className="message-avatar">
                    ✦
                  </div>

                  <div className="typing-bubble">
                    <span className="typing-label">
                      PawCare AI is thinking
                    </span>

                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="ai-input-wrapper">

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
                  disabled={
                    !message.trim() || loading
                  }
                  aria-label="Send message"
                >
                  →
                </button>
              </div>

              <p className="input-hint">
                Press Enter to send
              </p>

            </div>
          </section>

          <div className="ai-bottom">

            <div className="ai-disclaimer">
              <span>ⓘ</span>

              <p>
                PawCare AI provides general information and
                does not diagnose conditions or replace
                professional veterinary advice. For
                emergencies, contact a veterinarian
                immediately.
              </p>
            </div>

            <Link
              to="/search"
              className="ai-care-button"
            >
              Find nearby care
              <span>→</span>
            </Link>

          </div>

        </div>
      </main>
    </div>
  );
}

export default AIHealth;