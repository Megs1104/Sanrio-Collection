import React from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const API_ENDPOINT =
  "https://1ah3etfl1l.execute-api.eu-west-2.amazonaws.com/chat";

function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId] = useState(() => `user-${Date.now()}`);
  const [sessionId] = useState(() => `session-${Date.now()}`);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          userId: userId,
          sessionId: sessionId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage = {
          role: "assistant",
          content: data.reply,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || "Something went wrong 😔");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Failed to send message, Please check your connection.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
    setInput("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  }

  return (
    <div>
      {!isOpen && (
        <button className="chat-bubble-button" onClick={() => setIsOpen(true)}>
          💭
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3 className="chat-header">Ask me about Sanrio Characters!</h3>
            <button
              className="chat-close-button"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <p>Hello! Ask me anything about Sanrio characters!</p>
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  {message.role === "assistant" ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
              ))
            )}

            {loading && <div className="chat-loading">Thinking...</div>}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about a character..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              ↩
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIChatBubble;
