import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
    LayoutDashboard, Users, FolderKanban, Package, LogOut, BarChart3 ,FileText, Menu, X, ExternalLink
} from 'lucide-react';

const nav = [
    { to: '/admin/dashboard', label: 'Overview', Icon: LayoutDashboard },
    { to: '/admin/leads',     label: 'Leads',    Icon: Users },
    { to: '/admin/projects',  label: 'Projects', Icon: FolderKanban },
    { to: '/admin/analytics', label: 'Analytics', Icon: BarChart3 },
    { to: '/admin/posts', label: 'Blog', Icon: FileText },
    { to: '/admin/products', label: 'Products', Icon: Package },
];

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const SidebarContent = () => (
        <>
            {/* brand */}
            <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="font-display text-xl font-black"
                     style={{
                         background: 'linear-gradient(90deg, #5B5FEF, #8B7BF7, #00A896)',
                         WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                     }}>
                    akclnt
                </div>
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/35 mt-1">
                    Admin Panel
                </div>
            </div>

            {/* nav */}
            <nav className="flex-1 px-3 py-5 space-y-1">
                {nav.map(({ to, label, Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                isActive ? 'text-white' : 'text-white/55 hover:text-white hover:bg-white/5'
                            }`
                        }
                        style={({ isActive }) =>
                            isActive
                                ? { background: 'linear-gradient(90deg, rgba(91,95,239,0.9), rgba(139,123,247,0.75))',
                                    boxShadow: '0 4px 14px -4px rgba(91,95,239,0.5)' }
                                : undefined
                        }
                    >
                        <Icon size={17} />
                        {label}
                    </NavLink>
                ))}

                <a href="/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-colors">
                    <ExternalLink size={17} />
                    View Site
                </a>
            </nav>

            {/* user */}
            <div className="px-3 pb-5">
                <div className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-white text-sm shrink-0"
                             style={{ background: 'linear-gradient(135deg, #5B5FEF, #00A896)' }}>
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm font-medium text-white truncate">{user?.name}</div>
                            <div className="font-mono text-[0.6rem] uppercase tracking-wider text-white/40">{user?.role}</div>
                        </div>
                    </div>
                    <button onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white transition-colors"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <LogOut size={14} /> Sign out
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: '#F7F8FA' }}>
            {/* ===== Desktop sidebar ===== */}
            <aside className="hidden lg:flex w-64 shrink-0 flex-col fixed inset-y-0 left-0"
                   style={{ background: 'linear-gradient(180deg, #10121C, #0B0D14)' }}>
                <SidebarContent />
            </aside>

            {/* ===== Mobile sidebar ===== */}
            <div className="lg:hidden fixed inset-0 z-40" style={{ pointerEvents: open ? 'auto' : 'none' }}>
                <div onClick={() => setOpen(false)}
                     className="absolute inset-0 bg-black transition-opacity"
                     style={{ opacity: open ? 0.5 : 0 }} />
                <aside className="absolute inset-y-0 left-0 w-64 flex flex-col transition-transform duration-300"
                       style={{ background: 'linear-gradient(180deg, #10121C, #0B0D14)', transform: open ? 'translateX(0)' : 'translateX(-100%)' }}>
                    <SidebarContent />
                </aside>
            </div>

            {/* ===== Main ===== */}
            <div className="flex-1 lg:ml-64 min-w-0">
                {/* topbar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
                    <div className="px-5 lg:px-8 h-16 flex items-center gap-4">
                        <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-600" aria-label="Menu">
                            {open ? <X size={22} /> : <Menu size={22} />}
                        </button>
                        <div className="flex-1" />
                        <div className="flex items-center gap-2.5">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-gray-500">Live</span>
                        </div>
                    </div>
                </header>

                <main className="p-5 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}