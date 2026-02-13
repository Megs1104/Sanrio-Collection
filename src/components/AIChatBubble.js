import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { getIdToken, getUserId } from "../utils/authAssistance";

const API_ENDPOINT =
  "https://1ah3etfl1l.execute-api.eu-west-2.amazonaws.com/chat";

const AIChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [sessionId] = useState(() => `session-${Date.now()}`);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        setUserId(id || `guest-${Date.now()}`);
      } catch (error) {
        console.error("Error getting user ID: ", error);
        setUserId(`guest-${Date.now()}`);
      }
    };
    fetchUserId();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!userId) {
      console.error("No user ID available.");
      return;
    }

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setLoading(true);
    setInput("");
    try {
      const token = await getIdToken();
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
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
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

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
                <div key={index} className={`chat-message ${message.role}`}>
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
};

export default AIChatBubble;
