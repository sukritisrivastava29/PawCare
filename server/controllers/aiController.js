const {
  generatePetCareResponse,
} = require("../services/geminiService");

const chatWithAI = async (req, res) => {
  try {
    console.log("AI request received");

    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    console.log("Message:", message);

    const reply = await generatePetCareResponse(message);

    res.json({
      reply,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    if (error.name === "AbortError") {
      return res.status(504).json({
        error: "Gemini took too long to respond. Please try again.",
      });
    }

    res.status(500).json({
      error: error.message || "Failed to get AI response",
    });
  }
};

module.exports = {
  chatWithAI,
};