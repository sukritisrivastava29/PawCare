const generatePetCareResponse = async (message) => {
  const prompt = `
You are PawCare AI, a helpful pet-care information assistant.

Help pet owners understand general information about their pet's symptoms.

Rules:
- Do not diagnose medical conditions.
- Do not prescribe medication.
- Explain possible general causes in simple language.
- Tell the user what they can observe or monitor.
- Recommend contacting a veterinarian when appropriate.
- If symptoms could indicate an emergency, clearly recommend immediate veterinary care.
- Keep responses concise, practical, reassuring, and easy to understand.

User message:
${message}
`;

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 30000);

  try {
    console.log("Calling Gemini...");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
            thinkingConfig: {
              thinkingLevel: "low",
            },
          },
        }),
        signal: controller.signal,
      }
    );

    console.log("Gemini HTTP status:", response.status);

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);

      throw new Error(
        data?.error?.message || "Gemini API request failed"
      );
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!reply) {
      console.error("Gemini returned no text:", data);
      throw new Error("Gemini returned an empty response");
    }

    console.log("Gemini responded!");

    return reply;
  } finally {
    clearTimeout(timeout);
  }
};

module.exports = {
  generatePetCareResponse,
};