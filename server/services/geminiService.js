const generatePetCareResponse = async (message) => {
  console.log("Calling Gemini...");

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent";

  const response = await fetch(url, {
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
              text: `You are PawCare AI, a concise pet-care assistant.

Do not diagnose or prescribe medication.
Give general information only.
Recommend a veterinarian when appropriate.

User:
${message}`,
            },
          ],
        },
      ],
    }),
  });

  console.log("Gemini HTTP status:", response.status);

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);

    throw new Error(
      data?.error?.message || "Gemini API request failed"
    );
  }

  const reply =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

  if (!reply) {
    console.error("No Gemini response:", data);
    throw new Error("Gemini returned an empty response");
  }

  console.log("Gemini responded!");

  return reply;
};

module.exports = {
  generatePetCareResponse,
};