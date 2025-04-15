import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';

function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const leadsCollection = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(leadsCollection);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLeads(data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h2>🔥 Saved Leads</h2>
      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>Message</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' }}>AI Reply</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Score</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Category</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{lead.message}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{lead.aiReply}</td>
                  <td style={{ textAlign: 'center' }}>{lead.leadScore}</td>
                  <td>{lead.category}</td>
                  <td>{lead.createdAt?.toDate?.().toLocaleString?.() || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leads;
