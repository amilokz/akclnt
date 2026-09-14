import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import Home from '../pages/public/Home.jsx';
import Services from '../pages/public/Services.jsx';
import ServiceDetail from '../pages/public/ServiceDetail.jsx';
import Portfolio from '../pages/public/Portfolio.jsx';
import About from '../pages/public/About.jsx';
import Team from '../pages/public/Team.jsx';
import Testimonials from '../pages/public/Testimonials.jsx';
import FAQ from '../pages/public/FAQ.jsx';
import Contact from '../pages/public/Contact.jsx';
import Login from '../pages/admin/Login.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import ClientDashboard from '../pages/client/ClientDashboard.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Projects from '../pages/admin/Projects.jsx';
import Privacy from '../pages/public/Privacy.jsx';
import Terms from '../pages/public/Terms.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import Leads from '../pages/admin/Leads.jsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
            </Route>

            <Route path="/admin/login" element={<Login />} />
                      <Route
                element={
                    <ProtectedRoute allowedRoles={['admin', 'team']}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/leads" element={<Leads />} />
                <Route path="/admin/projects" element={<Projects />} />
            </Route>
            <Route
                path="/client/dashboard"
                element={
                    <ProtectedRoute allowedRoles={['client']}>
                        <ClientDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}