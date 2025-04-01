import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ai-auto-reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setReply(data.reply);
    } catch (error) {
      setReply("Error connecting to the backend.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Yep Cars CRM Dashboard</h1>
      <p>Send a test message to AI Auto-Responder:</p>
      <textarea
        rows="4"
        style={{ width: "100%", padding: "0.5rem" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <br />
      <button onClick={sendMessage} style={{ marginTop: "1rem", padding: "0.75rem 1.5rem" }}>
        Send Message
      </button>
      <h3 style={{ marginTop: "2rem" }}>AI Reply:</h3>
      <p>{reply}</p>
    </div>
  );
}

export default App;
