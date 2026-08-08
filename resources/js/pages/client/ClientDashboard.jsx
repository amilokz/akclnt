import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const statusLabels = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    review: 'In Review',
    completed: 'Completed',
};

const statusColors = {
    not_started: 'bg-gray-100 text-gray-600',
    in_progress: 'bg-signal-dim text-signal',
    review: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-emerald-100 text-emerald-700',
};

export default function ClientDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/client/projects')
            .then((res) => setProjects(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-paper">
            <nav className="bg-white border-b border-mist px-8 py-4 flex justify-between items-center">
                <h1 className="font-display text-lg font-bold text-ink">akclnt<span className="text-signal">.</span> Client Portal</h1>
                <button
                    onClick={handleLogout}
                    className="font-mono text-xs uppercase tracking-wider text-red-600 hover:underline"
                >
                    Logout
                </button>
            </nav>

            <div className="max-w-5xl mx-auto p-8">
                <div className="mb-10">
                    <h2 className="font-display text-2xl font-semibold text-ink">
                        Welcome, {user?.name}
                    </h2>
                    <p className="text-graphite text-sm">{user?.email}</p>
                </div>

                <div className="mb-12">
                    <span className="font-mono text-xs uppercase tracking-wider text-signal">
                        Your Projects
                    </span>

                    {loading ? (
                        <p className="text-graphite mt-4 font-mono text-sm">Loading...</p>
                    ) : projects.length === 0 ? (
                        <div className="border border-mist rounded-xl p-8 mt-4 text-center">
                            <p className="text-graphite text-sm">
                                No projects yet. Once your project starts, it'll show up here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4 mt-4">
                            {projects.map((project) => (
                                <div key={project.id} className="border border-mist rounded-xl p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-display text-lg font-semibold text-ink">
                                                {project.title}
                                            </h3>
                                            {project.service && (
                                                <span className="font-mono text-xs text-graphite">
                                                    {project.service.name}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`font-mono text-xs px-2.5 py-1 rounded-full ${statusColors[project.status]}`}>
                                            {statusLabels[project.status]}
                                        </span>
                                    </div>

                                    {project.description && (
                                        <p className="text-graphite text-sm mb-4">{project.description}</p>
                                    )}

                                    <div className="w-full bg-mist rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-signal h-2 rounded-full transition-all"
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="font-mono text-xs text-graphite mt-2">
                                        {project.progress}% complete
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-mist rounded-xl p-6">
                        <h3 className="font-display font-semibold text-ink mb-1">Invoices</h3>
                        <p className="text-sm text-graphite">
                            Your invoices and payments will appear here.
                        </p>
                    </div>

                    <div className="bg-white border border-mist rounded-xl p-6">
                        <h3 className="font-display font-semibold text-ink mb-1">Support Tickets</h3>
                        <p className="text-sm text-graphite">
                            Raise and track support tickets here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}