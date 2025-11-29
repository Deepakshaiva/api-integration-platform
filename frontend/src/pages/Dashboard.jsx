import IntegrationList from '../components/IntegrationList';
import IntegrationForm from '../components/IntegrationForm';
import { useState } from 'react';

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const [reload, setReload] = useState(false);
  const toggleReload = () => setReload(!reload);

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display:'flex', justifyContent:'space-between' }}>
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <p>Login successful 🎉</p>

      <IntegrationForm refreshData={toggleReload} />
      <IntegrationList key={reload} />
    </div>
  );
}
