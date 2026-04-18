#!/usr/bin/env bash
set -euo pipefail
FONT=$(fc-match -f '%{file}\n' 'DejaVu Sans' | head -1)
ROOT=/data/workspace/tmp-MAX-548-orchestrator/content/reels/MAX-548
OUT="$ROOT/thumbnails"
mkdir -p "$OUT"
make_thumb() {
  local slug="$1"
  local title="$2"
  cat > "$OUT/$slug.html" <<HTML
<!doctype html>
<html><head><meta charset="utf-8"><style>
body{margin:0;width:1080px;height:1920px;background:linear-gradient(180deg,#08111f,#111827);font-family:Inter,Arial,sans-serif;color:white;display:flex;flex-direction:column;justify-content:space-between;padding:96px;box-sizing:border-box}
.kicker{font-size:32px;color:#7dd3fc;letter-spacing:.08em;text-transform:uppercase}
h1{font-size:112px;line-height:1.02;margin:80px 0 0;max-width:820px}
.footer{font-size:40px;color:#dbeafe}
.repo{font-size:32px;color:#cbd5e1}
</style></head><body><div><div class="kicker">MAX-548 /orchestrator</div><h1>${title}</h1></div><div><div class="footer">Your AI said done. It wasn't.</div><div class="repo">github.com/maxtechera/orchestrator</div></div></body></html>
HTML
  wkhtmltoimage --quality 100 --width 1080 --height 1920 "$OUT/$slug.html" "$OUT/$slug.png" >/dev/null 2>&1
}
make_thumb "01-problem-agitate-solve" "Your AI agent said done. It wasn't."
make_thumb "02-contrarian" "The problem is not the model."
make_thumb "03-specific-number" "Sweep 10 tickets, catch the 3 that lied."
make_thumb "04-insider-reveal" "The real win is the verification contract."
make_thumb "05-testimonial" "This is what stopped the looks-done problem."
