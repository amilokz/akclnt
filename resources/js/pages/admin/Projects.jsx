import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

const statusOptions = ['not_started', 'in_progress', 'review', 'completed'];

export default function Projects() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        client_id: '', title: '', description: '', status: 'not_started', progress: 0,
    });

    const fetchData = () => {
        axios.get('/api/admin/projects').then((res) => setProjects(res.data));
        axios.get('/api/admin/clients').then((res) => setClients(res.data));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/admin/projects', formData)
            .then(() => {
                setShowForm(false);
                setFormData({ client_id: '', title: '', description: '', status: 'not_started', progress: 0 });
                fetchData();
            })
            .catch((err) => alert(err.response?.data?.message || 'Error creating project'));
    };

    const handleProgressUpdate = (id, field, value) => {
        axios.patch(`/api/admin/projects/${id}`, { [field]: value })
            .then(() => fetchData())
            .catch((err) => console.error(err));
    };

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex gap-6 items-center">
                        <Link to="/admin/dashboard" className="text-sm text-gray-500 hover:underline">← Leads</Link>
                        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                        >
                            {showForm ? 'Cancel' : '+ New Project'}
                        </button>
                        <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
                    </div>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 mb-8 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                            <select name="client_id" value={formData.client_id} onChange={handleChange} required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2">
                                <option value="">Select a client</option>
                                {clients.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2" placeholder="e.g. E-commerce Website" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2" />
                        </div>
                        <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                            Create Project
                        </button>
                    </form>
                )}

                <div className="space-y-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                                    <p className="text-sm text-gray-500">{project.client?.name} — {project.client?.email}</p>
                                </div>
                                <select
                                    value={project.status}
                                    onChange={(e) => handleProgressUpdate(project.id, 'status', e.target.value)}
                                    className="text-xs border border-gray-300 rounded-lg px-2 py-1"
                                >
                                    {statusOptions.map((s) => (
                                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={project.progress}
                                    onChange={(e) => handleProgressUpdate(project.id, 'progress', parseInt(e.target.value))}
                                    className="flex-1"
                                />
                                <span className="text-sm text-gray-600 w-12">{project.progress}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}