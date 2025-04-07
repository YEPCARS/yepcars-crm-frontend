import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function Messages() {
  const [leads, setLeads] = useState([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [aiReply, setAiReply] = useState('');
  const [leadScore, setLeadScore] = useState(null);

  const handleSubmit = async () => {
    if (!message || !phone) return alert("Message and phone are required");

    try {
      const res = await fetch('https://yepcars-crm-backend.railway.internal/ai-auto-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      const reply = data.reply || "Thank you for reaching out!";
      setAiReply(reply);

      const leadData = {
        name,
        phone,
        message,
        aiReply: reply,
        leadScore: Math.floor(Math.random() * 10) + 1,
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, 'leads'), leadData);
      alert('Lead submitted and saved!');
      setLeads((prev) => [leadData, ...prev]);
    } catch (err) {
      console.error('Submission failed', err);
      alert('Failed to send message');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Submit a Lead</h2>
      <input className="border p-2 w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <textarea className="border p-2 w-full" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>

      {aiReply && (
        <div className="bg-green-100 p-3 mt-4 rounded">
          <strong>AI Reply:</strong> {aiReply}
        </div>
      )}
    </div>
  );
}

export default Messages;