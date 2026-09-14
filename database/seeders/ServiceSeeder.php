<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        // Reset table so re-seeding doesn't create duplicates
        Schema::disableForeignKeyConstraints();
        Service::truncate();
        Schema::enableForeignKeyConstraints();

        $services = [

            // ================= WEB DEVELOPMENT =================
            [
                'category' => 'Web Development',
                'name' => 'Custom Website Development',
                'icon' => '💻',
                'description' => 'Fully custom websites and web apps built to fit your business — no rigid templates, just what you actually need.',
                'features' => [
                    'Responsive, mobile-first design',
                    'Custom admin panels & dashboards',
                    'SEO-friendly and fast',
                    'Built on Laravel + React',
                ],
            ],
            [
                'category' => 'Web Development',
                'name' => 'E-commerce Store',
                'icon' => '🛒',
                'description' => 'Complete online stores with secure checkout, product management, and everything you need to start selling.',
                'features' => [
                    'Secure payment gateway integration',
                    'Product catalog with search & filters',
                    'Inventory & order management',
                    'Store owner admin dashboard',
                ],
            ],
            [
                'category' => 'Web Development',
                'name' => 'Landing Page Design',
                'icon' => '🎯',
                'description' => 'High-converting landing pages designed to turn visitors into leads and sales.',
                'features' => [
                    'Conversion-focused layout',
                    'Fast loading & mobile optimized',
                    'Lead capture forms',
                    'A/B test ready',
                ],
            ],
            [
                'category' => 'Web Development',
                'name' => 'Booking System',
                'icon' => '📅',
                'description' => 'Online booking and appointment systems with calendars, reminders, and payment support.',
                'features' => [
                    'Real-time availability calendar',
                    'Automated email/SMS reminders',
                    'Online payment collection',
                    'Admin booking management',
                ],
            ],
            [
                'category' => 'Web Development',
                'name' => 'Invoice & Quotation System',
                'icon' => '🧾',
                'description' => 'Custom invoicing and quotation tools to create, send, and track billing in one place.',
                'features' => [
                    'Professional invoice & quote templates',
                    'Auto tax & total calculation',
                    'PDF export and email sending',
                    'Payment status tracking',
                ],
            ],
            [
                'category' => 'Web Development',
                'name' => 'Bug Fixing & Support',
                'icon' => '🐛',
                'description' => 'Quick, reliable fixes for broken features, errors, and issues on your existing website or app.',
                'features' => [
                    'Fast diagnosis & resolution',
                    'Works with any stack',
                    'Security & performance fixes',
                    'Ongoing maintenance available',
                ],
            ],

            // ================= AI & AUTOMATION =================
            [
                'category' => 'AI & Automation',
                'name' => 'n8n Automation Service',
                'icon' => '🔗',
                'description' => 'Automate repetitive work by connecting your apps with custom n8n workflows.',
                'features' => [
                    'Custom multi-app workflows',
                    'Scheduled & trigger-based automation',
                    'API & webhook integrations',
                    'Self-hosted setup available',
                ],
            ],
            [
                'category' => 'AI & Automation',
                'name' => 'AI Chatbot Development',
                'icon' => '🤖',
                'description' => 'Smart AI chatbots that answer questions, capture leads, and support customers 24/7.',
                'features' => [
                    'Trained on your business data',
                    'Website & WhatsApp integration',
                    'Lead capture & handoff',
                    'Multi-language support',
                ],
            ],
            [
                'category' => 'AI & Automation',
                'name' => 'AI Content Agency',
                'icon' => '✍️',
                'description' => 'AI-assisted content creation for blogs, social media, and marketing — at scale.',
                'features' => [
                    'SEO blog & article writing',
                    'Social media content',
                    'Brand-consistent tone',
                    'Bulk content pipelines',
                ],
            ],
            [
                'category' => 'AI & Automation',
                'name' => 'Social Media Automation',
                'icon' => '📲',
                'description' => 'Auto-schedule and publish content across your social platforms without manual work.',
                'features' => [
                    'Auto-posting & scheduling',
                    'Multi-platform publishing',
                    'Content queue management',
                    'Performance tracking',
                ],
            ],
            [
                'category' => 'AI & Automation',
                'name' => 'WhatsApp CRM + Broadcast',
                'icon' => '💬',
                'description' => 'Manage customer chats and send bulk broadcasts through a WhatsApp-based CRM.',
                'features' => [
                    'Bulk broadcast messaging',
                    'Contact & lead management',
                    'Automated replies',
                    'Chat history & tags',
                ],
            ],
            [
                'category' => 'AI & Automation',
                'name' => 'AI Voice Agent',
                'icon' => '🎙️',
                'description' => 'AI-powered voice agents that handle calls, bookings, and inquiries automatically.',
                'features' => [
                    'Natural voice conversations',
                    'Call handling & routing',
                    'Appointment booking by voice',
                    'CRM integration',
                ],
            ],

            // ================= DIGITAL MARKETING =================
            [
                'category' => 'Digital Marketing',
                'name' => 'SEO Services',
                'icon' => '🔍',
                'description' => 'Rank higher on Google and bring in organic traffic that actually converts.',
                'features' => [
                    'Keyword research & strategy',
                    'On-page & technical SEO',
                    'Content optimization',
                    'Monthly ranking reports',
                ],
            ],
            [
                'category' => 'Digital Marketing',
                'name' => 'Local SEO',
                'icon' => '📍',
                'description' => 'Get found by nearby customers with optimized Google Business and local listings.',
                'features' => [
                    'Google Business Profile setup',
                    'Local keyword targeting',
                    'Reviews & citations',
                    'Map pack ranking',
                ],
            ],
            [
                'category' => 'Digital Marketing',
                'name' => 'Google Ads Management',
                'icon' => '📢',
                'description' => 'Profitable Google Ads campaigns managed and optimized to lower cost and raise ROI.',
                'features' => [
                    'Campaign setup & targeting',
                    'Keyword & bid optimization',
                    'Conversion tracking',
                    'Weekly performance tuning',
                ],
            ],
            [
                'category' => 'Digital Marketing',
                'name' => 'Email Marketing',
                'icon' => '📧',
                'description' => 'Email campaigns and automations that nurture leads and drive repeat sales.',
                'features' => [
                    'Campaign design & copy',
                    'Automated drip sequences',
                    'List segmentation',
                    'Open & click reporting',
                ],
            ],
            [
                'category' => 'Digital Marketing',
                'name' => 'Social Media Management',
                'icon' => '📸',
                'description' => 'End-to-end management of your social presence — content, posting, and engagement.',
                'features' => [
                    'Content calendar & design',
                    'Regular posting',
                    'Community engagement',
                    'Growth reporting',
                ],
            ],
            [
                'category' => 'Digital Marketing',
                'name' => 'Google Analytics Setup',
                'icon' => '📊',
                'description' => 'Proper analytics and tracking setup so you know exactly what your site is doing.',
                'features' => [
                    'GA4 & tag setup',
                    'Conversion & event tracking',
                    'Custom dashboards',
                    'Data-driven insights',
                ],
            ],

            // ================= HOSTING & SUPPORT =================
            [
                'category' => 'Hosting & Support',
                'name' => 'Web Hosting & Maintenance',
                'icon' => '🌐',
                'description' => 'Reliable hosting plus ongoing updates, backups, and maintenance for peace of mind.',
                'features' => [
                    'Managed hosting setup',
                    'Regular backups & updates',
                    'Uptime monitoring',
                    'Security hardening',
                ],
            ],
            [
                'category' => 'Hosting & Support',
                'name' => 'API Integration',
                'icon' => '🔌',
                'description' => 'Connect your website or app with third-party services and APIs seamlessly.',
                'features' => [
                    'Payment, CRM & tool integrations',
                    'Custom REST API development',
                    'Webhook handling',
                    'Secure authentication',
                ],
            ],
            [
                'category' => 'Hosting & Support',
                'name' => 'Website Speed Optimization',
                'icon' => '⚡',
                'description' => 'Make your site load faster for better user experience and higher SEO rankings.',
                'features' => [
                    'Core Web Vitals improvement',
                    'Image & asset optimization',
                    'Caching & CDN setup',
                    'Code & query optimization',
                ],
            ],

            // ================= LEAD GENERATION =================
            [
                'category' => 'Lead Generation',
                'name' => 'Lead Generation Service',
                'icon' => '🧲',
                'description' => 'Targeted lead generation to fill your pipeline with qualified prospects.',
                'features' => [
                    'Targeted prospect research',
                    'Outreach campaigns',
                    'Lead qualification',
                    'CRM-ready lead lists',
                ],
            ],

            // ================= CONSULTING =================
            [
                'category' => 'Consulting',
                'name' => 'Tech Consulting',
                'icon' => '🧠',
                'description' => 'Expert guidance on tech decisions, architecture, and choosing the right tools.',
                'features' => [
                    'Tech stack advice',
                    'Architecture planning',
                    'Code & system review',
                    'Scalability roadmap',
                ],
            ],
            [
                'category' => 'Consulting',
                'name' => 'Digital Transformation',
                'icon' => '🚀',
                'description' => 'Modernize your business processes with the right digital tools and automation.',
                'features' => [
                    'Process assessment',
                    'Automation strategy',
                    'Tool selection & rollout',
                    'Team onboarding',
                ],
            ],
            [
                'category' => 'Consulting',
                'name' => 'n8n Training',
                'icon' => '🎓',
                'description' => 'Hands-on n8n training so your team can build and manage automations themselves.',
                'features' => [
                    'Beginner to advanced sessions',
                    'Real workflow building',
                    'Best practices & tips',
                    'Ongoing Q&A support',
                ],
            ],

            // ================= DIGITAL PRODUCTS =================
            [
                'category' => 'Digital Products',
                'name' => 'n8n Workflow Templates',
                'icon' => '🧩',
                'description' => 'Ready-to-use n8n workflow templates to automate common tasks instantly.',
                'features' => [
                    'Plug-and-play workflows',
                    'Well documented',
                    'Easy to customize',
                    'Time-saving automations',
                ],
            ],
            [
                'category' => 'Digital Products',
                'name' => 'Laravel Boilerplates',
                'icon' => '📦',
                'description' => 'Production-ready Laravel starter kits to kickstart your next project fast.',
                'features' => [
                    'Auth & roles built in',
                    'Clean, scalable structure',
                    'Common features ready',
                    'Well documented code',
                ],
            ],

            // ================= ACCOUNTING =================
            [
                'category' => 'Accounting',
                'name' => 'Amazon Accounting Management',
                'icon' => '📒',
                'description' => 'Accurate Amazon seller accounting — reconciliation, reporting, and profit tracking.',
                'features' => [
                    'Sales & fee reconciliation',
                    'Profit & loss reporting',
                    'Inventory cost tracking',
                    'Tax-ready statements',
                ],
            ],

            // ================= DESIGN =================
            [
                'category' => 'Design',
                'name' => 'Graphic Design & Branding',
                'icon' => '🎨',
                'description' => 'Visual identity and design that makes your brand memorable — logos, graphics, and more.',
                'features' => [
                    'Logo & brand identity',
                    'Social media graphics',
                    'Marketing & print materials',
                    'UI/UX design',
                ],
            ],

        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}