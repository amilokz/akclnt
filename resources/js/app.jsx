import './bootstrap';
import '../css/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoot from './AppRoot.jsx';

const root = document.getElementById('app');

if (root) {
    createRoot(root).render(
        <BrowserRouter>
            <AuthProvider>
                <AppRoot />
            </AuthProvider>
        </BrowserRouter>
    );
}