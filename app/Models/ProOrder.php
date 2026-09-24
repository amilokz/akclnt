<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProOrder extends Model
{
    protected $fillable = [
        'package', 'name', 'email', 'phone', 'website_url', 'app_url',
        'amount', 'tid', 'status', 'admin_note', 'approved_at', 'report_sent_at', 'ip',
    ];

    protected $casts = [
        'approved_at'    => 'datetime',
        'report_sent_at' => 'datetime',
    ];
}
