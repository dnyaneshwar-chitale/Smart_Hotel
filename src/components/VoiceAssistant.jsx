import { useState } from "react";
import { Mic, MicOff, X, Volume2 } from "lucide-react";
import { menuData } from "../data/menuData";

export function VoiceAssistant({ onClose, onAddToCart, language }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const startListening = () => {
    setIsListening(true);
    setTranscript("");
    setResponse("");

    // Simulated voice recognition
    setTimeout(() => {
      const sampleQueries = [
        "I want pizza",
        "Show me vegetarian options",
        "What desserts do you have?",
        "Add chicken steak to cart",
        "Show me spicy food",
      ];

      const query =
        sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setTranscript(query);
      processVoiceCommand(query);
      setIsListening(false);
    }, 2000);
  };

  const stopListening = () => setIsListening(false);

  const processVoiceCommand = (command) => {
    const lower = command.toLowerCase();

    let results = [];

    if (lower.includes("pizza")) {
      results = menuData.filter((item) =>
        item.nameTranslations[language].toLowerCase().includes("pizza")
      );
      setResponse(
        `I found ${results.length} pizza option${
          results.length !== 1 ? "s" : ""
        }.`
      );
    } else if (lower.includes("vegetarian") || lower.includes("veg")) {
      results = menuData.filter((item) => item.dietType === "veg");
      setResponse(`Here are ${results.length} vegetarian options.`);
    } else if (lower.includes("dessert") || lower.includes("sweet")) {
      results = menuData.filter((item) => item.category === "Dessert");
      setResponse(
        `We have ${results.length} delicious desserts available.`
      );
    } else if (lower.includes("spicy")) {
      results = menuData.filter((item) => item.spiceLevel === "spicy");
      setResponse(`Here are ${results.length} spicy dishes for you.`);
    } else if (lower.includes("chicken")) {
      results = menuData.filter((item) =>
        item.nameTranslations[language].toLowerCase().includes("chicken")
      );
      setResponse(
        `Found ${results.length} chicken dish${
          results.length !== 1 ? "es" : ""
        }.`
      );
    } else if (lower.includes("beverage") || lower.includes("drink")) {
      results = menuData.filter((item) => item.category === "Beverage");
      setResponse(`Here are ${results.length} beverage options.`);
    } else {
      results = menuData.filter((item) => item.isPopular);
      setResponse(
        `Here are our popular items. Try saying things like "show me pizza" or "vegetarian options".`
      );
    }

    setSuggestions(results);
  };

  const handleAddToCart = (item) => {
    onAddToCart(item);
    setResponse(`Added ${item.nameTranslations[language]} to your cart!`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="flex items-center gap-2">
              <Volume2 className="w-6 h-6" />
              Voice Assistant
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/90 text-sm">
            Speak naturally to search for dishes or add items to your cart
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {/* Mic Button */}
          <div className="text-center mb-6">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? "bg-red-600 animate-pulse"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {isListening ? (
                <MicOff className="w-10 h-10 text-white" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </button>
            <p className="mt-3 text-gray-600">
              {isListening ? "Listening..." : "Tap to speak"}
            </p>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-gray-700 text-sm mb-1">You said:</p>
              <p className="text-gray-900">{transcript}</p>
            </div>
          )}

          {/* Assistant Response */}
          {response && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-gray-700 text-sm mb-1">Assistant:</p>
              <p className="text-gray-900">{response}</p>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div>
              <h3 className="text-gray-900 mb-3">Results</h3>
              <div className="space-y-3">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 border border-gray-200 rounded-lg hover:bg-orange-50 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.nameTranslations[language]}
                      className="w-16 h-16 rounded object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-gray-900">
                        {item.nameTranslations[language]}
                      </p>
                      <p className="text-gray-500 text-sm line-clamp-1">
                        {item.descriptionTranslations[language]}
                      </p>
                      <p className="text-orange-600 mt-1">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed self-center"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Example Commands */}
          {!transcript && (
            <div className="mt-6">
              <p className="text-gray-700 mb-3">Try saying:</p>
              <div className="space-y-2">
                {[
                  "Show me pizza",
                  "I want vegetarian food",
                  "What desserts do you have?",
                  "Show me spicy dishes",
                  "I want chicken",
                ].map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTranscript(ex);
                      processVoiceCommand(ex);
                    }}
                    className="block w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-gray-700 transition"
                  >
                    "{ex}"
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
