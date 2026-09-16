<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_views', function (Blueprint $table) {
            $table->id();
            $table->string('path', 255)->index();
            $table->string('referrer', 255)->nullable();
            $table->string('visitor_hash', 64)->index();   // hashed IP+UA, no personal data stored
            $table->string('device', 20)->nullable();      // mobile / desktop / tablet
            $table->string('country', 2)->nullable();
            $table->timestamp('created_at')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_views');
    }
};