const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { chromium } = require('playwright');

const outDir = __dirname;
const pkg = JSON.parse(fs.readFileSync(path.join(outDir, 'package.json'), 'utf8'));
const proofMd = fs.readFileSync(path.join(outDir, 'proof-pack.md'), 'utf8');

const css = `
:root { color-scheme: dark; }
* { box-sizing: border-box; }
body { margin:0; font-family: Inter, Arial, sans-serif; background:#08111f; color:#e5eefc; }
.wrap { max-width: 1180px; margin:0 auto; padding:40px 28px 72px; }
.hero, .card { background: linear-gradient(180deg, rgba(17,24,39,.96), rgba(10,15,28,.96)); border:1px solid rgba(148,163,184,.18); border-radius:28px; box-shadow:0 20px 70px rgba(0,0,0,.35); }
.hero { padding:40px; }
.eyebrow { color:#7dd3fc; font-size:12px; font-weight:800; letter-spacing:.18em; text-transform:uppercase; }
h1 { font-size:56px; line-height:1.05; margin:12px 0 18px; }
p.lead { color:#cbd5e1; font-size:22px; line-height:1.6; max-width:920px; }
.grid { display:grid; grid-template-columns:1.05fr .95fr; gap:24px; margin-top:24px; }
.card { padding:28px; }
.kicker { color:#93c5fd; font-size:13px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; margin-bottom:14px; }
.copy { white-space:pre-wrap; font-size:22px; line-height:1.55; color:#eff6ff; }
.small { font-size:18px; color:#cbd5e1; line-height:1.6; }
.tweet { padding:18px 0; border-top:1px solid rgba(148,163,184,.16); font-size:20px; line-height:1.55; }
.tweet:first-of-type { border-top:none; padding-top:0; }
.badges { display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
.badge { padding:8px 12px; border-radius:999px; background:#0f172a; border:1px solid rgba(125,211,252,.25); color:#bae6fd; font-size:15px; }
.cta { margin-top:18px; padding:18px 20px; border-radius:18px; background:rgba(8,145,178,.14); border:1px solid rgba(103,232,249,.35); }
.cta strong { color:#ecfeff; }
pre { white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, monospace; font-size:16px; line-height:1.6; color:#dbeafe; margin:0; }
`;

const reel = pkg.placements.instagram_reel;
const thread = pkg.placements.x_thread;
const esc = (s='') => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const previewHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="wrap"><div class="hero"><div class="eyebrow">MAX-533 · Memory launch content</div><h1>SESSION-STATE appears mid-session. The note lands in Obsidian. Context survives.</h1><p class="lead">Launch-ready content package for the memory demo, centered on durable session memory instead of hand-written cleanup, with a NODO subscribe CTA.</p></div><div class="grid"><section class="card"><div class="kicker">Instagram Reel</div><div class="copy">${esc(reel.text)}</div><div class="badges">${reel.hashtags.map(tag => `<span class="badge">${esc(tag)}</span>`).join('')}</div><div class="cta"><strong>${esc(reel.cta.action)}</strong><br>${esc(reel.cta.reason_for_now)}</div></section><section class="card"><div class="kicker">X Thread</div>${thread.tweets.map((t, i) => `<div class="tweet"><strong>${i+1}.</strong> ${esc(t.text)}</div>`).join('')}<div class="cta"><strong>${esc(thread.cta.action)}</strong><br>${esc(thread.cta.reason_for_now)}</div></section></div></div></body></html>`;
const mdHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="wrap"><div class="hero"><div class="eyebrow">MAX-533 · Proof pack</div><h1>Rendered markdown proof</h1><p class="lead">Machine-readable package plus visual proof for the memory demo launch content.</p></div><section class="card" style="margin-top:24px"><pre>${esc(proofMd)}</pre></section></div></body></html>`;
fs.writeFileSync(path.join(outDir, 'preview.html'), previewHtml);
fs.writeFileSync(path.join(outDir, 'rendered-markdown.html'), mdHtml);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } });
  await page.goto(`file://${path.join(outDir, 'preview.html')}`);
  await page.screenshot({ path: path.join(outDir, 'rendered_html_preview_screenshot.png'), fullPage: true });
  await page.goto(`file://${path.join(outDir, 'rendered-markdown.html')}`);
  await page.screenshot({ path: path.join(outDir, 'rendered_html_screenshot.png'), fullPage: true });
  await browser.close();

  const font = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';
  const normal = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';
  const slides = [
    { title: 'Your workflow is losing context', body: 'Not because the model is weak. Because session state disappears between runs.' },
    { title: 'SESSION-STATE.md appears mid-session', body: 'Working memory gets written while the task is live, not reconstructed after the fact.' },
    { title: 'Obsidian gets the durable note', body: 'The decision is synced into memory so the next session starts with context instead of guesswork.' },
    { title: 'Subscribe to NODO', body: 'Weekly systems, agent workflows, and memory patterns behind what actually ships.' }
  ];
  slides.forEach((slide, i) => {
    const idx = String(i + 1).padStart(2, '0');
    const png = path.join(outDir, `slide-${idx}.png`);
    const cmd = `ffmpeg -y -f lavfi -i color=c=#08111f:s=1080x1920:d=1 -vf "drawbox=x=54:y=54:w=972:h=1812:color=#0f172a:t=fill,drawbox=x=54:y=54:w=972:h=1812:color=#38bdf8@0.18:t=4,drawtext=fontfile=${font}:text='${slide.title.replace(/[:']/g, m => '\\' + m)}':fontcolor=white:fontsize=58:x=84:y=180,drawtext=fontfile=${normal}:text='${slide.body.replace(/[:']/g, m => '\\' + m)}':fontcolor=#dbeafe:fontsize=34:x=84:y=420:line_spacing=14:box=0,drawtext=fontfile=${normal}:text='MAX-533  memory demo launch content':fontcolor=#7dd3fc:fontsize=26:x=84:y=120" -frames:v 1 ${png}`;
    execSync(cmd, { stdio: 'inherit' });
  });
  const list = path.join(outDir, 'slides.txt');
  fs.writeFileSync(list, ['01','02','03','04'].map(n => `file 'slide-${n}.png'\nduration 3\n`).join('') + `file 'slide-04.png'\n`);
  execSync(`ffmpeg -y -f concat -safe 0 -i ${list} -vf format=yuv420p -r 30 -pix_fmt yuv420p ${path.join(outDir, 'final_mp4_attachment.mp4')}`, { stdio: 'inherit' });
  execSync(`ffmpeg -y -i ${path.join(outDir, 'slide-01.png')} -frames:v 1 ${path.join(outDir, 'reel-cover.png')}`, { stdio: 'inherit' });
})();
