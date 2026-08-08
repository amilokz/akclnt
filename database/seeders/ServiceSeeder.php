<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Web Development',
                'icon' => '💻',
                'description' => 'Custom websites and web apps built with modern technology, tailored to your business needs.',
                'features' => [
                    'Responsive, mobile-friendly design',
                    'Fast performance and SEO optimization',
                    'Custom admin panels and dashboards',
                    'Ongoing support and maintenance',
                ],
            ],
            [
                'name' => 'Mobile App Development',
                'icon' => '📱',
                'description' => 'iOS and Android apps that deliver smooth, native-like performance for your users.',
                'features' => [
                    'Cross-platform (iOS + Android)',
                    'Clean, modern UI/UX',
                    'API integration',
                    'App Store & Play Store deployment',
                ],
            ],
            [
                'name' => 'E-Commerce Solutions',
                'icon' => '🛒',
                'description' => 'Complete online store setup with secure payments, inventory, and order management.',
                'features' => [
                    'Secure payment gateway integration',
                    'Inventory & order management',
                    'Product catalog with search/filter',
                    'Admin dashboard for store owners',
                ],
            ],
            [
                'name' => 'Software Development',
                'icon' => '⚙️',
                'description' => 'End-to-end business software — CRMs, management systems, and custom internal tools.',
                'features' => [
                    'Custom business logic',
                    'Role-based access control',
                    'Reporting & analytics',
                    'Scalable architecture',
                ],
            ],
            [
    'name' => 'Amazon Account Management',
    'icon' => '📦',
    'description' => 'Complete Amazon seller account management — from listing optimization to order fulfillment and account health monitoring.',
    'features' => [
        'Product listing creation & optimization',
        'Inventory & order management',
        'PPC campaign setup and monitoring',
        'Account health & compliance tracking',
    ],
],
[
    'name' => 'Graphic Design & Branding',
    'icon' => '🎨',
    'description' => 'Visual identity design that makes your brand memorable — logos, branding kits, and marketing materials.',
    'features' => [
        'Logo & brand identity design',
        'Social media graphics',
        'Marketing & print materials',
        'UI/UX design for apps and websites',
    ],
],
[
    'name' => 'MERN Stack Development',
    'icon' => '⚡',
    'description' => 'Fast, modern web applications built with MongoDB, Express, React, and Node.js.',
    'features' => [
        'Real-time web applications',
        'RESTful API development',
        'Scalable database design',
        'Modern, responsive UI',
    ],
],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}