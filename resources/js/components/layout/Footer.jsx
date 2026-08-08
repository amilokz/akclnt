import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-ink text-paper mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
                    <span className="font-mono text-xs text-graphite ml-2">akclnt --version</span>
                </div>

                <h3 className="font-display text-2xl font-semibold max-w-md">
                    Let's build something worth shipping.
                </h3>

                <div className="flex gap-6 mt-6">
                    <Link to="/testimonials" className="font-mono text-xs uppercase tracking-wider text-graphite hover:text-paper">
                        Testimonials
                    </Link>
                    <Link to="/faq" className="font-mono text-xs uppercase tracking-wider text-graphite hover:text-paper">
                        FAQ
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mt-10 pt-8 border-t border-white/10 gap-4">
                    <p className="font-mono text-xs text-graphite">
                        © {new Date().getFullYear()} akclnt. All rights reserved.
                    </p>
                    <p className="font-mono text-xs text-graphite">
                        Rawalpindi, Pakistan
                    </p>
                </div>
            </div>
        </footer>
    );
}