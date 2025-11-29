import { useEffect, useState } from 'react';
import api from '../api/apiClient';

export default function IntegrationList({ refreshData }) {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const res = await api.get('/integrations');
        setIntegrations(res.data.integrations);
      } catch (err) {
        console.error('Error fetching integrations', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIntegrations();
  }, [refreshData]); // re-run when reload flag changes

  if (loading) return <p>Loading integrations...</p>;
  if (integrations.length === 0) return <p>No integrations yet.</p>;

  // trigger / retry integration
  async function triggerIntegration(id) {
    try {
      const res = await api.post(`/integrations/${id}/trigger`);
      const { status, message } = res.data;

      alert(message || `Integration trigger ${status}`);

      if (typeof refreshData === 'function') {
        refreshData(); // 🔁 ask parent to refresh list
      }
    } catch (err) {
      console.error('Trigger error:', err);
      alert('Network or server error while triggering integration');
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Your Integrations</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Status</th>
            <th>Last Triggered</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {integrations.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.service}</td>
              <td style={{ color: item.status === 'failed' ? 'red' : 'green' }}>
                {item.status}
              </td>
              <td>
                {item.lastTriggeredAt
                  ? new Date(item.lastTriggeredAt).toLocaleString()
                  : 'Never'}
              </td>
              <td>
                <button onClick={() => triggerIntegration(item._id)}>
                  {item.status === 'failed' ? 'Retry' : 'Trigger'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
