import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Loader from '../components/ui/Loader.jsx';
import WhatsAppButton from '../components/ui/WhatsAppButton.jsx';
import ChatBot from '../components/ui/ChatBot.jsx';
export default function PublicLayout() {
    const location = useLocation();

    // Scroll to top on route change for a clean transition.
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-paper">
            <Loader />
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
                        
            <WhatsAppButton />
              <ChatBot />
        </div>
       
    );
}
