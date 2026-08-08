<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; background: #f9fafb; padding: 40px 0;">
    <div style="max-width: 500px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 32px; border: 1px solid #e5e7eb;">
        <h2 style="color: #111827; margin-top: 0;">Welcome to Akclnt, {{ $user->name }}!</h2>

        <p style="color: #4b5563; line-height: 1.6;">
            Your client account has been created. You can now log in to your dashboard to track your projects, invoices, and support tickets.
        </p>

        <div style="background: #f3f4f6; border-radius: 6px; padding: 16px; margin: 24px 0;">
            <p style="margin: 0; color: #111827;"><strong>Email:</strong> {{ $user->email }}</p>
            <p style="margin: 8px 0 0; color: #111827;"><strong>Temporary Password:</strong> {{ $tempPassword }}</p>
        </div>

        <a href="{{ url('/admin/login') }}" style="display: inline-block; background: #111827; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500;">
            Log In to Your Dashboard
        </a>

        <p style="color: #9ca3af; font-size: 13px; margin-top: 24px;">
            For your security, we recommend changing your password after logging in.
        </p>
    </div>
</body>
</html>