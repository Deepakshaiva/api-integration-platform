import { useState } from 'react';
import api from '../api/apiClient';

export default function IntegrationForm({ refreshData }) {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [method, setMethod] = useState('POST');
  const [payload, setPayload] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/integrations', {
        name,
        service,
        endpoint,
        method,
        payload: payload ? JSON.parse(payload) : {},
      });
      alert('Integration created successfully');
      refreshData(); // reload table
      setName('');
      setService('');
      setEndpoint('');
      setPayload('');
    } catch (err) {
      alert('Failed to create integration');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <h3>Create New Integration</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ display:'block', marginBottom:8 }}
      />

      <input
        placeholder="Service (e.g. slack)"
        value={service}
        onChange={(e) => setService(e.target.value)}
        required
        style={{ display:'block', marginBottom:8 }}
      />

      <input
        placeholder="Endpoint URL"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        required
        style={{ display:'block', marginBottom:8 }}
      />

      <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ display:'block', marginBottom:8 }}>
        <option>POST</option>
        <option>GET</option>
        <option>PUT</option>
      </select>

      <textarea
        placeholder='Payload JSON e.g. {"text": "Hello"}'
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        style={{ display:'block', marginBottom:8, width:'100%', height:80 }}
      />

      <button type="submit">Create Integration</button>
    </form>
  );
}
