<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditRequest extends Model
{
    protected $fillable = ['email', 'url', 'name', 'ip'];
}
