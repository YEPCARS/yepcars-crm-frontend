import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const BACKEND_URL = "https://yepcars-crm-backend-production.up.railway.app";

function Messages() {
  const [userMessage, setUserMessage] = useState('');
  const [aiReply, setAiReply] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    if (!userMessage.trim()) {
      setStatus("Please enter a message.");
      return;
    }

    setStatus("Sending...");
    try {
      const res = await fetch(`${BACKEND_URL}/ai-auto-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setAiReply(data.reply);

      let leadScore = 5;
      let category = "General";

      const lowerMsg = userMessage.toLowerCase();
      if (lowerMsg.includes("buy") || lowerMsg.includes("finance") || lowerMsg.includes("truck") || lowerMsg.includes("car")) {
        leadScore = 9;
        category = "Buying Interest";
      } else if (lowerMsg.includes("how much") || lowerMsg.includes("price")) {
        leadScore = 7;
        category = "Price Inquiry";
      } else if (lowerMsg.includes("thanks") || lowerMsg.includes("ok")) {
        leadScore = 3;
        category = "Low Intent";
      }

      await addDoc(collection(db, "leads"), {
        message: userMessage,
        aiReply: data.reply,
        createdAt: serverTimestamp(),
        leadScore,
        category
      });

      setStatus("✅ Message saved to CRM.");
    } catch (error) {
      console.error("Error:", error);
      setAiReply("⚠️ Error connecting to the backend.");
      setStatus("❌ Failed to save lead.");
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
      <p><em>{status}</em></p>
    </div>
  );
}

export default Messages;
