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
];
