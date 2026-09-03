const generatePetCareResponse = async (message) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is missing from the server environment."
    );
  }

  if (!message || !message.trim()) {
    throw new Error("Message is required.");
  }

  const models = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
  ];

  let lastError = null;

  for (const model of models) {
    try {
      console.log(`Calling Gemini: ${model}`);

      const url =
        `https://generativelanguage.googleapis.com/v1beta/models/` +
        `${model}:generateContent`;

      const response = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
        text: `
You are PawCare AI, a helpful pet-care information assistant.

Your purpose is to help pet owners understand general information about animal health.

Rules:
- Do not diagnose diseases or conditions.
- Do not prescribe medication.
- Do not provide medication dosages.
- Do not claim certainty about a pet's condition.
- Explain possible reasons in simple language.
- Give safe general information where appropriate.
- Tell the user when they should contact a veterinarian.
- If symptoms could indicate an emergency, clearly recommend immediate veterinary care.
- Never replace professional veterinary advice.
- Keep responses concise and easy to understand.
- Use short plain-text headings and bullet points when helpful.
- Do NOT use Markdown headings such as #, ##, or ###.
- Do NOT use tables.
- You may use **bold text** for important words.
- Keep the response friendly and reassuring.

Example format:

Possible reasons:
- **Dietary changes:** A sudden change in food may affect appetite.
- **Stress:** Changes in routine or environment can sometimes affect eating.
- **Health issues:** Several health problems can cause similar symptoms.

What you can do:
- Make sure your pet has access to fresh water.
- Monitor their eating, drinking, energy, and other symptoms.

When to contact a veterinarian:
- Contact a veterinarian if symptoms persist, worsen, or are accompanied by concerning signs.
- Seek immediate veterinary care if the situation appears to be an emergency.

User message:
${message.trim()}
`.trim(),},
            ],
          },

          contents: [
            {
              role: "user",
              parts: [
                {
                  text: message.trim(),
                },
              ],
            },
          ],

          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 700,
          },
        }),
      });

      console.log(
        `Gemini ${model} status: ${response.status}`
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          `Gemini returned an invalid response (${response.status}).`
        );
      }

      if (response.ok) {
        const reply = data?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text || "")
          .join("")
          .trim();

        if (reply) {
          console.log(
            `Gemini response successful using ${model}`
          );

          return reply;
        }

        lastError = new Error(
          "Gemini returned an empty response."
        );

        continue;
      }

      const apiMessage =
        data?.error?.message ||
        `Gemini request failed with status ${response.status}`;

      console.error(
        `Gemini ${model} error:`,
        apiMessage
      );

      lastError = new Error(apiMessage);

      if (
        response.status === 429 ||
        response.status === 500 ||
        response.status === 502 ||
        response.status === 503 ||
        response.status === 504
      ) {
        console.log(
          `${model} unavailable. Trying fallback...`
        );

        continue;
      }

    
      if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 403
      ) {
        throw new Error(apiMessage);
      }
    } catch (error) {
      console.error(
        `Gemini ${model} exception:`,
        error.message
      );

      lastError = error;
      if (model !== models[models.length - 1]) {
        console.log("Switching to fallback Gemini model...");
        continue;
      }
    }
  }

  throw (
    lastError ||
    new Error(
      "PawCare AI is temporarily unavailable. Please try again."
    )
  );
};

module.exports = {
  generatePetCareResponse,
};