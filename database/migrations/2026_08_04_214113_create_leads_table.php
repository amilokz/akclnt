<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('leads', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email');
        $table->string('phone');
        $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
        $table->string('budget')->nullable();
        $table->text('message');
        $table->enum('status', ['new', 'contacted', 'meeting_scheduled', 'deal_done', 'converted', 'lost'])
              ->default('new');
        $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
