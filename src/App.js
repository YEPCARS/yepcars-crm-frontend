import React from 'react';
import Messages from './Messages';
import Leads from './Leads';

function App() {
  return (
    <div>
      <Messages />
      <hr style={{ margin: '40px 0' }} />
      <Leads />
    </div>
  );
}

export default App;
