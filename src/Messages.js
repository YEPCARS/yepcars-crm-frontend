import React, { useState } from 'react';

const BACKEND_URL = "https://yepcars-crm-backend-production.up.railway.app";

function Messages() {
  const [userMessage, setUserMessage] = useState('');
  const [aiReply, setAiReply] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/ai-auto-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setAiReply(data.reply);
    } catch (error) {
      console.error("Error connecting to the backend:", error);
      setAiReply("Error connecting to the backend.");
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Yep Cars CRM Dashboard</h2>
      <p>Send a test message to AI Auto-Responder:</p>
      <textarea
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        rows={4}
        placeholder="Type a message..."
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleSubmit}>Send Message</button>
      <p><strong>AI Reply:</strong> {aiReply}</p>
    </div>
  );
}

export default Messages;
