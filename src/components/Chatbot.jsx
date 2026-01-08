import { useState, useRef, useEffect } from "react";
import { Send, X, Bot } from "lucide-react";

export function Chatbot({ onClose, language }) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I am your Smart Hotel assistant. How can I help you today?",
      sender: "bot",
      timestamp: Date.now(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Menu information",
    "Opening hours",
    "WiFi password",
    "Room service",
    "Special dietary needs",
  ];

  const getBotResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();

    if (lower.includes("menu") || lower.includes("food")) {
      return "You can browse our menu at the top. We offer Main Courses, Salads, Desserts and Beverages.";
    }
    if (lower.includes("hours") || lower.includes("time")) {
      return "Our restaurant is open from 7 AM to 11 PM.\nRoom service is available 24/7.";
    }
    if (lower.includes("wifi") || lower.includes("internet")) {
      return "WiFi Network: SMART-HOTEL\nPassword: stayconnected\n\nHigh-speed internet is free.";
    }
    if (lower.includes("room service")) {
      return "Room service is available 24/7. You can order directly from this app.";
    }
    if (
      lower.includes("dietary") ||
      lower.includes("allerg") ||
      lower.includes("vegan")
    ) {
      return "We support Vegetarian, Vegan, and Gluten-free options.\nUse menu filters to find suitable dishes.";
    }
    if (lower.includes("payment") || lower.includes("pay")) {
      return "We accept UPI, Credit/Debit cards, and Digital Wallets.";
    }
    if (lower.includes("location") || lower.includes("table")) {
      return "Your table/room number is shown at the top of the app.";
    }
    if (lower.includes("thank")) {
      return "You're welcome! 😊";
    }

    return "I can help you with menu, orders, room service, WiFi, payments, or dietary info. What do you want to know?";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const text = inputValue;

    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: "bot",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3>Smart Assistant</h3>
            <p className="text-white/90 text-xs">Online • Instant replies</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.sender === "user"
                  ? "bg-orange-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "user" ? "text-white/70" : "text-gray-500"
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-gray-600 text-xs mb-2">Quick questions</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-700"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
