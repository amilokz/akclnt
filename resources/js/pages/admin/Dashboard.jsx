import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    meeting_scheduled: 'bg-purple-100 text-purple-700',
    deal_done: 'bg-green-100 text-green-700',
    converted: 'bg-emerald-100 text-emerald-700',
    lost: 'bg-red-100 text-red-700',
};

const statusOptions = ['new', 'contacted', 'meeting_scheduled', 'deal_done', 'converted', 'lost'];

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = () => {
        axios.get('/api/admin/leads')
            .then((res) => setLeads(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleStatusChange = (leadId, newStatus) => {
        axios.patch(`/api/admin/leads/${leadId}/status`, { status: newStatus })
            .then(() => fetchLeads())
            .catch((err) => console.error(err));
    };

    const handleConvert = (leadId) => {
        axios.post(`/api/admin/leads/${leadId}/convert`)
            .then((res) => {
                alert(`Client created!\nEmail: ${res.data.client.email}\nTemp Password: ${res.data.temp_password}`);
                fetchLeads();
            })
            .catch((err) => {
                alert(err.response?.data?.message || 'Something went wrong');
            });
    };

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Leads Dashboard</h1>
                        <p className="text-sm text-gray-500">Welcome, {user?.name} ({user?.role})</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-red-600 hover:underline"
                    >
                        Logout
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-500">Loading leads...</p>
                ) : leads.length === 0 ? (
                    <p className="text-gray-500">No leads yet.</p>
                ) : (
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-left text-gray-600 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Contact</th>
                                    <th className="px-4 py-3">Service</th>
                                    <th className="px-4 py-3">Budget</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Received</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="border-b border-gray-100 last:border-0">
                                        <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                                        <td className="px-4 py-3 text-gray-600">
                                            <div>{lead.email}</div>
                                            <div className="text-xs text-gray-400">{lead.phone}</div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {lead.service?.name || '—'}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{lead.budget || '—'}</td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${statusColors[lead.status]}`}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status.replace('_', ' ')}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-gray-400 text-xs">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            {lead.status === 'deal_done' && (
                                                <button
                                                    onClick={() => handleConvert(lead.id)}
                                                    className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800"
                                                >
                                                    Convert to Client
                                                </button>
                                            )}
                                            {lead.status === 'converted' && (
                                                <span className="text-xs text-emerald-600 font-medium">✓ Client</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}