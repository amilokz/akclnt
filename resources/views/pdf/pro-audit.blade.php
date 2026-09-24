@php
    $w = $r['website'] ?? null;
    $a = $r['app'] ?? null;
    $color = function ($s) {
        if ($s === null || $s === '') return '#9ca3af';
        return $s >= 90 ? '#059669' : ($s >= 50 ? '#d97706' : '#dc2626');
    };
    $labels = ['performance' => 'Performance', 'seo' => 'SEO', 'accessibility' => 'Accessibility', 'best_practices' => 'Best practices'];
    $prio = ['High' => '#dc2626', 'Medium' => '#d97706', 'Low' => '#059669'];
@endphp
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    @page { margin: 0 0 50px 0; }
    body { font-family: DejaVu Sans, sans-serif; font-size: 11px; color: #1f2937; margin: 0; }
    .wrap { padding: 0 40px; }
    .header { background: #0B0D14; color: #fff; padding: 36px 40px 30px; }
    .brand { font-size: 11px; color: #a5a8ff; letter-spacing: 1px; }
    .title { font-size: 24px; font-weight: bold; margin-top: 8px; }
    .meta { font-size: 11px; color: #9ca3af; margin-top: 6px; }
    .grade { font-size: 40px; font-weight: bold; text-align: right; }
    .grade-label { font-size: 10px; color: #9ca3af; text-align: right; }
    h2 { font-size: 15px; color: #0B0D14; margin: 26px 0 10px; padding-bottom: 6px; border-bottom: 2px solid #5B5FEF; }
    h3 { font-size: 12px; margin: 16px 0 6px; color: #374151; }
    p { line-height: 1.55; margin: 0 0 8px; }
    table { width: 100%; border-collapse: collapse; }
    .scores td { text-align: center; padding: 10px 4px; border: 1px solid #e5e7eb; }
    .score-num { font-size: 22px; font-weight: bold; }
    .score-lbl { font-size: 9px; color: #6b7280; }
    .kv td { padding: 5px 0; border-bottom: 1px solid #f3f4f6; }
    .kv td.v { text-align: right; font-weight: bold; }
    .list li { margin-bottom: 5px; line-height: 1.5; }
    .plan th { background: #f3f4f6; text-align: left; padding: 7px; font-size: 10px; color: #4b5563; }
    .plan td { padding: 8px 7px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
    .badge { color: #fff; font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 3px; }
    .box { background: #f5f5ff; border: 1px solid #e0e1ff; padding: 12px 14px; margin-top: 8px; }
    .avoid { page-break-inside: avoid; }
    .footer { position: fixed; bottom: -32px; left: 40px; right: 40px; font-size: 9px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 6px; }
    .yes { color: #059669; font-weight: bold; }
    .no { color: #dc2626; font-weight: bold; }
</style>
</head>
<body>
<div class="footer">akclnt · Pro Audit Report · Order #{{ $order->id }} · akclnt.com</div>

<div class="header">
    <table>
        <tr>
            <td>
                <div class="brand">AKCLNT PRO AUDIT</div>
                <div class="title">{{ $w['url'] ?? ($a['name'] ?? 'Your Pro Audit') }}</div>
                <div class="meta">{{ $packages[$order->package]['label'] ?? 'Pro Audit' }} · Prepared for {{ $order->name }} · {{ now()->format('d M Y') }}</div>
            </td>
            <td style="width: 110px;">
                <div class="grade">{{ $r['grade'] ?? '-' }}</div>
                <div class="grade-label">Overall grade</div>
            </td>
        </tr>
    </table>
</div>

<div class="wrap">
    <h2>Summary</h2>
    <p>{{ $r['summary'] ?? '' }}</p>

    @if(!empty($r['quick_wins']))
        <div class="box avoid">
            <strong>Quick wins you can do this week</strong>
            <ul class="list">@foreach($r['quick_wins'] as $q)<li>{{ $q }}</li>@endforeach</ul>
        </div>
    @endif

    @if($w)
        <h2>Website: {{ $w['url'] ?? '' }}</h2>
        @foreach(['mobile' => 'Mobile', 'desktop' => 'Desktop'] as $key => $label)
            @if(!empty($w[$key]['scores']))
                <div class="avoid">
                    <h3>{{ $label }} scores</h3>
                    <table class="scores"><tr>
                        @foreach($labels as $sk => $sl)
                            @php $s = $w[$key]['scores'][$sk] ?? null; @endphp
                            <td><div class="score-num" style="color: {{ $color($s) }}">{{ $s ?? '-' }}</div><div class="score-lbl">{{ $sl }}</div></td>
                        @endforeach
                    </tr></table>
                    @if(!empty($w[$key]['metrics']))
                        <table class="kv" style="margin-top: 8px;">
                            @foreach($w[$key]['metrics'] as $mk => $mv)<tr><td>{{ $mk }}</td><td class="v">{{ $mv }}</td></tr>@endforeach
                        </table>
                    @endif
                </div>
            @endif
        @endforeach

        @if(!empty($w['checks']))
            <div class="avoid">
                <h3>On-page checks</h3>
                <table class="kv">
                    @foreach($w['checks'] as $ck => $cv)<tr><td>{{ $ck }}</td><td class="v"><span class="{{ $cv ? 'yes' : 'no' }}">{{ $cv ? 'Yes' : 'No' }}</span></td></tr>@endforeach
                </table>
            </div>
        @endif

        @if(!empty($w['pages']))
            <h3>Pages reviewed</h3>
            @foreach($w['pages'] as $pg)
                <div class="avoid" style="margin-bottom: 10px;">
                    <strong>{{ $pg['title'] ?? $pg['url'] }}</strong>
                    <div style="color: #6b7280; font-size: 9px;">{{ $pg['url'] ?? '' }}</div>
                    @if(!empty($pg['issues']))
                        <ul class="list">@foreach($pg['issues'] as $iss)<li>{{ $iss }}</li>@endforeach</ul>
                    @else
                        <p style="color: #059669;">No major issues found on this page.</p>
                    @endif
                </div>
            @endforeach
        @endif
    @endif
    @if($a)
        <h2>App: {{ $a['name'] ?? '' }}</h2>
        <table class="kv avoid">
            <tr><td>Store</td><td class="v">{{ $a['store'] ?? '-' }}</td></tr>
            <tr><td>Rating</td><td class="v">{{ $a['rating'] ?? '-' }} ({{ $a['ratings_count'] ?? 0 }} ratings)</td></tr>
            <tr><td>Last updated</td><td class="v">{{ $a['last_updated'] ?? '-' }}</td></tr>
            <tr><td>Developer</td><td class="v">{{ $a['developer'] ?? '-' }}</td></tr>
        </table>
        @foreach(['top_complaints' => 'What users complain about', 'top_praise' => 'What users like', 'aso' => 'App Store Optimization'] as $ak => $at)
            @if(!empty($a[$ak]))
                <div class="avoid"><h3>{{ $at }}</h3><ul class="list">@foreach($a[$ak] as $c)<li>{{ $c }}</li>@endforeach</ul></div>
            @endif
        @endforeach
    @endif

    @if(!empty($r['fix_plan']))
        <h2>Your fix plan</h2>
        <table class="plan">
            <tr><th style="width: 60px;">Priority</th><th>What to do</th><th style="width: 40%;">How</th></tr>
            @foreach($r['fix_plan'] as $f)
                <tr class="avoid">
                    <td><span class="badge" style="background: {{ $prio[$f['priority'] ?? ''] ?? '#6b7280' }}">{{ $f['priority'] ?? '-' }}</span></td>
                    <td><strong>{{ $f['task'] ?? '' }}</strong><br><span style="color: #6b7280;">{{ $f['why'] ?? '' }}</span></td>
                    <td>{{ $f['how'] ?? '' }}</td>
                </tr>
            @endforeach
        </table>
    @endif

    <div class="box avoid" style="margin-top: 24px;">
        <strong>Want us to fix this for you?</strong>
        <p style="margin-top: 6px;">
            @if(!empty($r['recommended_services']))Based on this audit we recommend: {{ implode(', ', $r['recommended_services']) }}. @endif
            Reply to the email this report came with, or contact us at akclnt.com/contact.
        </p>
    </div>

    <p style="margin-top: 18px; font-size: 9px; color: #9ca3af;">
        This report combines automated tests (Google PageSpeed Insights, store listing data) with AI analysis. Scores can vary slightly between test runs.
    </p>
</div>
</body>
</html>
