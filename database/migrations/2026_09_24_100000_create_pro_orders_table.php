<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pro_orders', function (Blueprint $table) {
            $table->id();
            $table->string('package', 20);
            $table->string('name', 100);
            $table->string('email')->index();
            $table->string('phone', 30)->nullable();
            $table->string('website_url')->nullable();
            $table->string('app_url', 500)->nullable();
            $table->unsignedInteger('amount');
            $table->string('tid', 30)->unique();
            $table->string('status', 20)->default('pending')->index();
            $table->string('admin_note', 500)->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('report_sent_at')->nullable();
            $table->string('ip', 45)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pro_orders');
    }
};
