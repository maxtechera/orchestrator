from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import textwrap, subprocess, json, os

ROOT = Path('/data/workspace/repos/orchestrator')
OUT = ROOT / 'docs' / 'assets' / 'MAX-548'
TMP = OUT / 'tmp'
OUT.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)

W, H = 540, 960
BG = '#0b1020'
PANEL = '#121a33'
RED = '#ff5c7a'
GREEN = '#35e39a'
BLUE = '#79a8ff'
WHITE = '#f5f7ff'
MUTED = '#b8c0e0'
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

variants = [
  {
    'slug':'problem-agitate-solve',
    'title':'Your AI said done. It wasn\'t.',
    'hooks':[
      'Your AI said done. It wasn\'t.',
      'The ticket closed. The bug survived.',
      'Most agents grade their own homework.'
    ],
    'cta':'DM ORCHESTRATOR for the free install guide',
    'slides':[
      ('HOOK', 'Your AI said done. It wasn\'t.', RED),
      ('FAILURES', 'Broken link\nWrong price\nMissing test', RED),
      ('TRUTH', 'Closed tickets can still be wrong.', WHITE),
      ('FIX', '/orchestrator verifies the output before you trust it.', GREEN),
      ('CTA', 'Comment sweep or DM ORCHESTRATOR', BLUE),
    ]
  },
  {
    'slug':'contrarian',
    'title':'Better prompting is not the fix.',
    'hooks':[
      'Better prompting is not the fix.',
      'The fix is verification, not vibes.',
      'Prompting harder will not catch a broken link.'
    ],
    'cta':'Link in bio for the repo and install guide',
    'slides':[
      ('HOOK', 'The fix is not better prompting.', RED),
      ('OLD MODEL', 'Agent does work\nAgent says done\nEveryone hopes', WHITE),
      ('NEW MODEL', 'Agent ships proof\n/orchestrator checks reality', GREEN),
      ('WHY', 'Humans only review exceptions, not every claim.', WHITE),
      ('CTA', 'Link in bio → github.com/maxtechera/orchestrator', BLUE),
    ]
  },
  {
    'slug':'specific-number',
    'title':'10 tickets. 3 caught.',
    'hooks':[
      '10 tickets. 3 caught before prod.',
      'One sweep found 3 fake dones.',
      '7 closed. 3 flagged. That\'s the point.'
    ],
    'cta':'Comment sweep and I\'ll send the repo',
    'slides':[
      ('HOOK', '10 tickets. One sweep.', BLUE),
      ('RUN', '/orchestrator sweep', WHITE),
      ('RESULT', '3 flagged\n1 broken link\n1 wrong price\n1 missing test', RED),
      ('WIN', '7 verified and closed.', GREEN),
      ('CTA', 'Comment sweep for the repo link', BLUE),
    ]
  },
  {
    'slug':'insider-reveal',
    'title':'How agent teams actually scale.',
    'hooks':[
      'The insider trick: stop trusting self-reported done.',
      'How agent teams scale without chaos.',
      'You do not need more reviewers. You need better verification.'
    ],
    'cta':'DM ORCHESTRATOR for the install guide',
    'slides':[
      ('HOOK', 'Here is how agent teams actually scale.', BLUE),
      ('MISTAKE', 'Reviewing every ticket manually does not scale.', RED),
      ('SYSTEM', 'Require evidence first. Verify automatically.', GREEN),
      ('FLOW', 'Only exceptions go to humans.', WHITE),
      ('CTA', 'DM ORCHESTRATOR for the free guide', BLUE),
    ]
  },
  {
    'slug':'testimonial',
    'title':'The moment I stopped trusting done.',
    'hooks':[
      'I stopped trusting done after one broken launch.',
      'One fake done was enough for me.',
      'This is the system I wish I had sooner.'
    ],
    'cta':'Link in bio, then DM ORCHESTRATOR',
    'slides':[
      ('HOOK', 'One fake done was enough.', RED),
      ('STORY', 'Ticket closed. CTA broken. Launch lost trust.', WHITE),
      ('LESSON', 'Self-reported done is not proof.', RED),
      ('SOLUTION', '/orchestrator forces evidence before review.', GREEN),
      ('CTA', 'Link in bio + DM ORCHESTRATOR', BLUE),
    ]
  },
]

def fit(draw, text, max_width, start_size=96, bold=True):
    for size in range(start_size, 32, -4):
        font = ImageFont.truetype(FONT_BOLD if bold else FONT, size)
        lines = []
        for paragraph in text.split('\n'):
            words = paragraph.split()
            if not words:
                lines.append('')
                continue
            line = words[0]
            for word in words[1:]:
                trial = line + ' ' + word
                if draw.textbbox((0,0), trial, font=font)[2] <= max_width:
                    line = trial
                else:
                    lines.append(line)
                    line = word
            lines.append(line)
        width = max(draw.textbbox((0,0), l or ' ', font=font)[2] for l in lines)
        if width <= max_width and len(lines) <= 5:
            return font, lines
    font = ImageFont.truetype(FONT_BOLD if bold else FONT, 32)
    return font, textwrap.wrap(text, width=20)

for idx, variant in enumerate(variants, start=1):
    vtmp = TMP / variant['slug']
    vtmp.mkdir(parents=True, exist_ok=True)
    slide_list = []
    for sidx, (kicker, body, accent) in enumerate(variant['slides'], start=1):
        img = Image.new('RGB', (W,H), BG)
        d = ImageDraw.Draw(img)
        d.rounded_rectangle((60,70,W-60,H-70), radius=48, fill=PANEL, outline=accent, width=6)
        d.text((110,120), f'VARIANT {idx:02d}', font=ImageFont.truetype(FONT_BOLD, 42), fill=MUTED)
        d.text((110,190), kicker, font=ImageFont.truetype(FONT_BOLD, 72), fill=accent)
        font, lines = fit(d, body, W-220, start_size=82, bold=True)
        line_h = font.size + 16
        total_h = line_h * len(lines)
        y = 300 + max(0, (260 - total_h)//2)
        for line in lines:
            bbox = d.textbbox((0,0), line, font=font)
            x = (W - (bbox[2]-bbox[0]))//2
            d.text((x,y), line, font=font, fill=WHITE)
            y += line_h
        hook_y = H - 250
        d.text((110,hook_y), 'Primary hook', font=ImageFont.truetype(FONT_BOLD, 32), fill=MUTED)
        hook_font = ImageFont.truetype(FONT, 28)
        hy = hook_y + 46
        for line in textwrap.wrap(variant['hooks'][0], width=28)[:2]:
            d.text((110,hy), line, font=hook_font, fill=WHITE)
            hy += 34
        slide = vtmp / f'slide-{sidx:02d}.png'
        img.save(slide)
        slide_list.append(slide)
    thumb = OUT / f"MAX-548-{idx:02d}-{variant['slug']}-thumbnail.png"
    Image.open(slide_list[0]).save(thumb)
    concat = vtmp / 'concat.txt'
    with concat.open('w') as f:
        for slide in slide_list:
            f.write(f"file '{slide}'\n")
            f.write('duration 2.8\n')
        f.write(f"file '{slide_list[-1]}'\n")
    mp4 = OUT / f"MAX-548-{idx:02d}-{variant['slug']}.mp4"
    subprocess.run([
        'ffmpeg','-y','-f','concat','-safe','0','-i',str(concat),
        '-r','30','-vf',f"fps=30,scale={W}:{H},format=yuv420p",
        '-c:v','mpeg4','-q:v','2','-movflags','+faststart',str(mp4)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

manifest = []
for idx, variant in enumerate(variants, start=1):
    manifest.append({
        'variant': idx,
        'slug': variant['slug'],
        'title': variant['title'],
        'hooks': variant['hooks'],
        'cta': variant['cta'],
        'mp4': f'docs/assets/MAX-548/MAX-548-{idx:02d}-{variant["slug"]}.mp4',
        'thumbnail': f'docs/assets/MAX-548/MAX-548-{idx:02d}-{variant["slug"]}-thumbnail.png',
    })
(OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps({'out': str(OUT), 'count': len(variants)}, indent=2))
