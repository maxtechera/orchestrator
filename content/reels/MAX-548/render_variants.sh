#!/usr/bin/env bash
set -euo pipefail
FONT=$(fc-match -f '%{file}\n' 'DejaVu Sans' | head -1)
ROOT=/data/workspace/tmp-MAX-548-orchestrator/content/reels/MAX-548
OUT="$ROOT/videos"
TXT="$ROOT/render-text"
mkdir -p "$OUT" "$TXT"

render() {
  local slug="$1"
  local headline="$2"
  local body="$3"
  local cta="$4"
  printf '%s\n' "$headline" > "$TXT/$slug-headline.txt"
  printf '%s\n' "$body" > "$TXT/$slug-body.txt"
  printf '%s\n' "$cta" > "$TXT/$slug-cta.txt"
  ffmpeg -y -f lavfi -i color=c=0x0a0f1c:s=1080x1920:d=12 \
    -vf "drawtext=fontfile=$FONT:text='MAX-548 /orchestrator':fontcolor=0x93c5fd:fontsize=30:x=80:y=100,\
         drawtext=fontfile=$FONT:textfile=$TXT/$slug-headline.txt:fontcolor=white:fontsize=74:x=80:y=220:line_spacing=12,\
         drawtext=fontfile=$FONT:textfile=$TXT/$slug-body.txt:fontcolor=0xdbe4f0:fontsize=42:x=80:y=650:line_spacing=18,\
         drawtext=fontfile=$FONT:textfile=$TXT/$slug-cta.txt:fontcolor=0x7dd3fc:fontsize=40:x=80:y=1560:line_spacing=16,\
         drawtext=fontfile=$FONT:text='github.com/maxtechera/orchestrator':fontcolor=white:fontsize=32:x=80:y=1760" \
    -c:v libx264 -pix_fmt yuv420p -threads 2 "$OUT/$slug.mp4"
}

render "01-problem-agitate-solve" "Your AI agent said done. It wasn't." $'Ticket closed. Broken link still live. Test still red.\nNow the cleanup work lands on you.\nRun /orchestrator so the sweep checks proof before done is accepted.' "DM ORCHESTRATOR for the free install guide"
render "02-contrarian" "The problem is not the model." $'Smarter agents still fail when nobody verifies the finish.\n/orchestrator keeps the tickets with evidence and flags the fake dones.\nMore autonomy without verification only creates faster mistakes.' "Comment sweep for the repo link"
render "03-specific-number" "Sweep 10 tickets, catch the 3 that lied." $'Close the 7 with proof. Escalate the 3 missing real evidence.\nLess trust theater. Less production risk. Faster clean handoffs.\nThat is what the /orchestrator sweep gives you.' "Link in bio for the open-source repo"
render "04-insider-reveal" "The real win is the verification contract." $'Artifact delta. Business delta. Surface correctness.\nIf one is missing, the ticket does not get the victory lap.\nThat is how /orchestrator catches fake done states.' "DM ORCHESTRATOR for the install guide"
render "05-testimonial" "This is what stopped the looks-done problem." $'We had agents closing tickets that still needed human cleanup.\nAfter adding /orchestrator, the bluff tickets showed up fast.\nHuman review got smaller because the sweep found the real misses.' "Comment sweep or grab the repo"
