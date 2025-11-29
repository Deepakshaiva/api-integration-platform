import { useState } from 'react';
import api from '../api/apiClient';

export default function LoginPage() {
  const [email, setEmail] = useState('deepak@example.com');
  const [password, setPassword] = useState('test123');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard'; // redirect
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ padding: 24, border: '1px solid #ddd', borderRadius: 8, minWidth: 320 }}>
        <h2 style={{ marginBottom: 16 }}>Integration Platform Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ width: '100%', padding: 8, background: '#007bff', color: 'white' }}>
          Login
        </button>
      </form>
    </div>
  );
}
