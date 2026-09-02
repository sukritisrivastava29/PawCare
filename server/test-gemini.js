const dotenv = require("dotenv");

dotenv.config();

async function testGemini() {
  console.log("API key loaded:", !!process.env.GEMINI_API_KEY);

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
                text: "Say PawCare is working.",
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  console.log("Status:", response.status);
  console.log(JSON.stringify(data, null, 2));
}

testGemini();