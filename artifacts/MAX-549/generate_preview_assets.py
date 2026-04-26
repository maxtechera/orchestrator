import json
from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont

BASE = Path(__file__).resolve().parent
pkg = json.loads((BASE / 'package.json').read_text())

preview_html = f"""<!doctype html>
<html>
<head>
  <meta charset='utf-8'>
  <title>MAX-549 package preview</title>
  <style>
    body {{ font-family: Arial, sans-serif; margin: 0; background: #0b1020; color: #f5f7fb; }}
    .wrap {{ max-width: 1100px; margin: 0 auto; padding: 40px; }}
    h1 {{ font-size: 40px; margin-bottom: 8px; }}
    .sub {{ color: #a7b0c2; margin-bottom: 28px; }}
    .grid {{ display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 18px; }}
    .card {{ background: #121936; border: 1px solid #243055; border-radius: 16px; padding: 20px; }}
    .k {{ color: #8fb3ff; font-size: 13px; text-transform: uppercase; letter-spacing: .08em; }}
    .v {{ font-size: 16px; line-height: 1.5; margin-top: 8px; }}
    code {{ background: #0d1430; padding: 2px 6px; border-radius: 6px; }}
  </style>
</head>
<body>
  <div class='wrap'>
    <h1>{pkg['ticket_id']} /ship package schema</h1>
    <div class='sub'>Target repo: {pkg['target_repo']} • Content type: {pkg['content_type']} • Brand: {pkg['brand']}</div>
    <div class='grid'>
      <div class='card'><div class='k'>Instagram Reel</div><div class='v'>{pkg['placements']['instagram_reel']['text']}</div></div>
      <div class='card'><div class='k'>TikTok</div><div class='v'>{pkg['placements']['tiktok']['caption']}</div></div>
      <div class='card'><div class='k'>YouTube Short</div><div class='v'><strong>{pkg['placements']['youtube_short']['title']}</strong><br>{pkg['placements']['youtube_short']['description']}</div></div>
      <div class='card'><div class='k'>CTA Map</div><div class='v'>Primary <code>DM SHIP</code><br>Secondary <code>comment pipeline</code><br>Tertiary <code>link in bio → github.com/maxtechera/ship</code></div></div>
    </div>
  </div>
</body>
</html>"""
(BASE / 'preview.html').write_text(preview_html)

md = (BASE / 'MAX-549-ship-reel-series.md').read_text()
rendered_md = "<html><body style='font-family:Arial,sans-serif;max-width:900px;margin:40px auto;line-height:1.6;color:#111'><pre style='white-space:pre-wrap;font-family:Arial,sans-serif'>" + md.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;') + "</pre></body></html>"
(BASE / 'rendered-markdown.html').write_text(rendered_md)

try:
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 28)
    font_b = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 40)
    font_s = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 22)
except Exception:
    font = font_b = font_s = ImageFont.load_default()


def make_card_image(path, title, sections, size=(1440, 1800), dark=False):
    bg = '#0b1020' if dark else '#ffffff'
    fg = '#f5f7fb' if dark else '#111111'
    sub = '#a7b0c2' if dark else '#4b5563'
    im = Image.new('RGB', size, bg)
    draw = ImageDraw.Draw(im)
    x, y = 70, 60
    draw.text((x, y), title, font=font_b, fill=fg)
    y += 80
    for heading, body in sections:
        draw.text((x, y), heading, font=font_s, fill=sub)
        y += 40
        for line in wrap(body, width=70):
            draw.text((x, y), line, font=font, fill=fg)
            y += 38
        y += 24
    im.save(path)

make_card_image(
    BASE / 'rendered-html-preview-screenshot.png',
    'MAX-549 Preview, Content Engine style',
    [
        ('Instagram Reel', pkg['placements']['instagram_reel']['text']),
        ('TikTok', pkg['placements']['tiktok']['caption']),
        ('YouTube Short', pkg['placements']['youtube_short']['title'] + ' — ' + pkg['placements']['youtube_short']['description'])
    ],
    dark=True,
)

make_card_image(
    BASE / 'rendered-html-screenshot.png',
    'MAX-549 Rendered HTML',
    [
        ('Blog title', pkg['placements']['blog_post']['title']),
        ('Meta description', pkg['placements']['blog_post']['meta_description']),
        ('Body excerpt', pkg['placements']['blog_post']['body_md'])
    ],
)

make_card_image(
    BASE / 'rendered-github-markdown-screenshot.png',
    'GitHub Markdown Preview, MAX-549',
    [('Archive doc', md)],
    size=(1440, 2000),
)

make_card_image(
    BASE / 'screenshot-desktop.png',
    'Desktop proof, /ship reel package',
    [
        ('Hero', pkg['placements']['landing_page']['hero']['headline']),
        ('Subhead', pkg['placements']['landing_page']['hero']['subhead']),
        ('Primary CTA', pkg['placements']['landing_page']['ctas']['primary'])
    ],
    size=(1600, 900),
    dark=True,
)

make_card_image(
    BASE / 'screenshot-mobile.png',
    'Mobile proof, /ship reel package',
    [
        ('Hook', pkg['placements']['instagram_reel']['hook_variants'][0]),
        ('CTA', pkg['placements']['instagram_reel']['cta']['action']),
        ('Why now', pkg['placements']['instagram_reel']['cta']['reason_for_now'])
    ],
    size=(900, 1600),
    dark=True,
)

print('generated preview assets')
