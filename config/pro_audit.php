<?php

return [
    'packages' => [
        'website' => ['label' => 'Website Pro Audit', 'price' => 999],
        'app'     => ['label' => 'App Store Pro Audit', 'price' => 999],
        'combo'   => ['label' => 'Website + App Combo', 'price' => 1499],
    ],
    'payment' => [
        'method'         => 'JazzCash',
        'currency'       => 'PKR',
        'account_title'  => env('PRO_AUDIT_ACCOUNT_TITLE', ''),
        'account_number' => env('PRO_AUDIT_ACCOUNT_NUMBER', ''),
    ],

    // n8n + delivery
    'n8n_webhook'     => env('PRO_AUDIT_N8N_WEBHOOK', 'http://localhost:5678/webhook/pro-audit'),
    'callback_secret' => env('PRO_AUDIT_CALLBACK_SECRET'),
    'resend_key'      => env('RESEND_API_KEY'),
    'mail_from'       => env('PRO_AUDIT_MAIL_FROM', 'akclnt Pro Audit <leads@akclnt.com>'),
    'admin_email'     => env('PRO_AUDIT_ADMIN_EMAIL', 'info@akclnt.com'),
];
