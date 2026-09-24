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
import AuditPage from '../pages/public/AuditPage.jsx';
import ProAuditPage from '../pages/public/ProAuditPage.jsx';
import Login from '../pages/admin/Login.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import ClientDashboard from '../pages/client/ClientDashboard.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Projects from '../pages/admin/Projects.jsx';
import Privacy from '../pages/public/Privacy.jsx';
import Terms from '../pages/public/Terms.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import Leads from '../pages/admin/Leads.jsx';
import Analytics from '../pages/admin/Analytics.jsx';
import Blog from '../pages/public/Blog.jsx';
import BlogPost from '../pages/public/BlogPost.jsx';
import AdminPosts from '../pages/admin/AdminPosts.jsx';
import Products from '../pages/public/Products.jsx';
import AdminProducts from '../pages/admin/AdminProducts.jsx';
import AdminPortfolio from '../pages/admin/AdminPortfolio.jsx';
import AdminProOrders from '../pages/admin/AdminProOrders.jsx';

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
                <Route path="/free-audit" element={<AuditPage />} />
                <Route path="/pro-audit" element={<ProAuditPage />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/products" element={<Products />} />
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
                <Route path="/admin/analytics" element={<Analytics />} />
                <Route path="/admin/posts" element={<AdminPosts />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                                <Route path="/admin/portfolio" element={<AdminPortfolio />} />
                                <Route path="/admin/pro-orders" element={<AdminProOrders />} />
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