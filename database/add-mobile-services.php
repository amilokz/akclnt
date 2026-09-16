<?php

use App\Models\Service;

$services = [
    [
        'category' => 'Mobile Development',
        'name' => 'Mobile App Development',
        'icon' => '📱',
        'description' => 'Cross-platform mobile apps for Android and iOS built with Flutter — one codebase, native performance, and a single team maintaining it.',
        'features' => [
            'Android & iOS from one codebase',
            'Clean, modern UI/UX',
            'REST API & backend integration',
            'Play Store & App Store deployment',
        ],
        'is_active' => true,
    ],
    [
        'category' => 'Mobile Development',
        'name' => 'Flutter App Development',
        'icon' => '🦋',
        'description' => 'Custom Flutter applications with smooth animations, offline support, and a Laravel or Firebase backend behind them.',
        'features' => [
            'Custom Flutter UI & animations',
            'Firebase or Laravel backend',
            'Push notifications',
            'Offline-first data handling',
        ],
        'is_active' => true,
    ],
    [
        'category' => 'Mobile Development',
        'name' => 'App Maintenance & Publishing',
        'icon' => '🚀',
        'description' => 'End-to-end Play Console and App Store management — store listings, releases, updates, and compliance handled for you.',
        'features' => [
            'Play Console & App Store setup',
            'Store listing & assets',
            'Release and version management',
            'Bug fixes and ongoing updates',
        ],
        'is_active' => true,
    ],
];

foreach ($services as $data) {
    $existing = Service::where('name', $data['name'])->first();
    if ($existing) {
        $existing->update($data);
        echo "Updated: {$data['name']}\n";
    } else {
        Service::create($data);
        echo "Created: {$data['name']}\n";
    }
}

echo "Done. Total services: " . Service::count() . "\n";