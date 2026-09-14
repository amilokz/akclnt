<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.06);">

        <tr><td style="background:linear-gradient(135deg,#5B5FEF,#00A896);padding:28px 32px;">
          <div style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-.5px;">akclnt</div>
          <div style="font-size:12px;color:rgba(255,255,255,.8);margin-top:4px;text-transform:uppercase;letter-spacing:2px;">New enquiry</div>
        </td></tr>

        <tr><td style="padding:32px;">
          <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.6;">
            You have a new enquiry from the website.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#111827;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:110px;color:#6b7280;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600;">{{ $lead->name }}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;"><a href="mailto:{{ $lead->email }}" style="color:#5B5FEF;text-decoration:none;">{{ $lead->email }}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">{{ $lead->phone }}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;">Service</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">{{ optional($lead->service)->name ?? '—' }}</td></tr>
            @if($lead->budget)
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#6b7280;">Budget</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">{{ $lead->budget }}</td></tr>
            @endif
          </table>

          <div style="margin-top:24px;">
            <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Message</div>
            <div style="background:#f9fafb;border-radius:12px;padding:16px;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">{{ $lead->message }}</div>
          </div>

          <div style="margin-top:28px;">
            <a href="mailto:{{ $lead->email }}" style="display:inline-block;background:#5B5FEF;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:999px;">Reply to {{ explode(' ', $lead->name)[0] }}</a>
          </div>
        </td></tr>

        <tr><td style="padding:20px 32px;background:#fafafa;border-top:1px solid #f0f0f0;font-size:12px;color:#9ca3af;">
          Received {{ $lead->created_at->format('d M Y, g:i a') }} · akclnt.com
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>