#!/usr/bin/env python3
import subprocess
from pathlib import Path

OUT = Path('/data/workspace/artifacts/MAX-569')
OUT.mkdir(parents=True, exist_ok=True)
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'

variants = [
    ('v1-problem-agitate-solve', 'AI said done.\nRepo disagreed.', 'Fake done gets caught.', [
        'Wrong repo.', 'No proof.', 'Still marked done.', '/orchestrator blocks it.'
    ]),
    ('v2-contrarian', 'More agents\nwill not save you.', 'Stop adding agents.', [
        'Speed amplifies mistakes.', 'Guardrails beat hype.', 'Proof beats vibes.', '/orchestrator enforces all 3.'
    ]),
    ('v3-specific-number', '3 checks before\nI trust agents.', '3 receipts or no ship.', [
        'Artifact delta', 'Business delta', 'Surface correctness', 'Miss one, no DONE.'
    ]),
    ('v4-insider-reveal', 'The trick is not\nthe prompt.', 'The hidden part of demos.', [
        'Wrong repo is common.', 'Missing proof is common.', 'Status theater is common.', '/orchestrator catches it.'
    ]),
    ('v5-testimonial', 'Best agent feature?\nNot done yet.', 'The workflow that helped.', [
        'Solo agents polished lies.', 'Parallel workers need proof.', 'Repo and outcome must match.', 'Then work counts.'
    ]),
]

for i, (slug, title, subtitle, bullets) in enumerate(variants, start=1):
    stem = f'max569-{i:02d}-{slug}'
    jpg = OUT / f'{stem}-thumb.jpg'
    png = OUT / f'{stem}-thumb.png'
    proof = OUT / f'{stem}-proof.png'
    mp4 = OUT / f'{stem}.mp4'

    bullet_text = '\n'.join([f'• {b}' for b in bullets])
    cmd = [
        'convert', '-size', '720x1280', 'xc:#0b1020',
        '-fill', '#ff4d4f', '-draw', 'rectangle 40,90 680,390',
        '-fill', '#111827', '-draw', 'rectangle 40,470 680,1010',
        '-fill', 'white', '-font', FONT_BOLD, '-pointsize', '48',
        '-gravity', 'NorthWest', '-annotate', '+70+140', title,
        '-fill', '#93c5fd', '-font', FONT_BOLD, '-pointsize', '30',
        '-annotate', '+70+520', subtitle,
        '-fill', 'white', '-font', FONT, '-pointsize', '28',
        '-annotate', '+70+600', bullet_text,
        '-fill', '#f9fafb', '-font', FONT_BOLD, '-pointsize', '24',
        '-annotate', '+70+1110', 'DM ORCHESTRATOR  |  comment sweep',
        '-quality', '92', str(jpg)
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['convert', str(jpg), '-define', 'png:color-type=2', str(png)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['cp', str(png), str(proof)], check=True)
    subprocess.run([
        'ffmpeg', '-y', '-loop', '1', '-i', str(jpg), '-t', '12', '-r', '30',
        '-vf', 'format=yuv420p', '-c:v', 'mpeg4', '-q:v', '4', str(mp4)
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    jpg.unlink(missing_ok=True)

print(f'Generated {len(variants)} MP4s, thumbnails, and proof PNGs in {OUT}')
