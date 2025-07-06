import { useState } from "react";

const StoryGenerator = () => {
  const [idea, setIdea] = useState("");
  const [language, setLanguage] = useState("english");
  const [mood, setMood] = useState("Happy");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateStory = async () => {
    if (!idea) {
      setError("Please enter a story idea.");
      return;
    }
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError("Missing Gemini API key. Check your .env file.");
      return;
    }

    setLoading(true);
    setError("");
    setStory("");

    const prompt = `
Role:
You are a creative assistant that generates engaging short stories.

Task:
Write a short story based on the following inputs:

Idea: ${idea}
Language: ${language}
Mood: ${mood}

Guidelines:
- The story should match the given mood and language.
- Keep the story under 250 words.
- No introductions or extra text. Only output the story.

Output:
Only the story.
`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.candidates?.[0]?.content?.text ||
        "";

      if (generatedText) {
        setStory(generatedText);
      } else {
        setError("No story generated. Try again.");
      }
    } catch (err) {
      setError("Failed to fetch story. Check API key and connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-w-full min-h-[250px] bg-gradient-to-br from-yellow-50 via-rose-50 to-blue-50">

      <div className="bg-white/10 min-w-full  backdrop-blur-sm rounded-2xl shadow-lg px-6 py-4 mb-6">
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-pink-300 tracking-tight drop-shadow-md">
    👻🧛 AI Story Generator 🩸💀
  </h1>


        <textarea
          className="w-full sm:w-[80vw] md:w-[60vw] lg:w-[49.5vw] min-h-[150px] p-6 border-2 border-stone-300 focus:border-blue-500 rounded-2xl text-2xl font-semibold mb-8 transition outline-none shadow-sm bg-white  placeholder:text-stone-400"
          placeholder="Enter your story idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <div className="flex  sm:flex-row gap-4 mb-6">
          <select
          className="w-full p-2 rounded-lg border border-gray-300 shadow-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="hinglish">Hinglish</option>
          </select>
          <select
            className="w-full p-2 rounded-lg border border-gray-300 shadow-sm"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="Happy">Happy 😊</option>
            <option value="Sad">Sad 😢</option>
            <option value="Funny">Funny 😂</option>
            <option value="Scary">Scary 😱</option>
            <option value="Romantic">Romantic 💖</option>
            <option value="Adventure">Adventure 🗺️</option>
            <option value="Mystery">Mystery 🕵️</option>
          </select>
        </div>

        <button
          className={`w-full bg-blue-900 hover:bg-blue-800 text-white text-xl sm:text-2xl font-extrabold px-4 py-3 sm:py-4 rounded-2xl shadow-md transition duration-200  ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          onClick={generateStory}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center  bg-Blue-900 justify-center gap-3">
              <svg
                className="animate-spin  bg-Blue-900 h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Generating...
            </span>
          ) : (
            "Submit ✨"
          )}
        </button>

        {story && (
          <div className="bg-yellow-50 border-l-8 border-yellow-600 text-stone-900 p-4 sm:p-6 md:p-8 rounded-2xl mt-6 shadow-inner animate-fade-in text-lg sm:text-xl font-medium whitespace-pre-wrap">
            <span className="block mb-4  text-3xl font-extrabold text-stone-700">Your Story:</span>
            {story}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-8 border-red-500 text-red-800 p-4 sm:p-6 rounded-2xl mt-4 shadow-inner animate-shake text-lg sm:text-xl font-bold">
            {error}
          </div>
        )}

        <style>
          {`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px);}
              to { opacity: 1; transform: translateY(0);}
            }
            .animate-fade-in { animation: fade-in 0.6s ease-out both; }

            @keyframes shake {
              10%, 90% { transform: translateX(-1px); }
              20%, 80% { transform: translateX(2px); }
              30%, 50%, 70% { transform: translateX(-4px); }
              40%, 60% { transform: translateX(4px); }
            }
            .animate-shake { animation: shake 0.5s; }
          `}
        </style>
      </div>
    </div>
  );
};

export default StoryGenerator;
