const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');
const { execSync } = require('child_process');

const outDir = path.resolve(__dirname);
const repoRoot = path.resolve(outDir, '..', '..');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function read(rel) {
  return fs.readFileSync(path.join(repoRoot, rel), 'utf8');
}

function mdToSections(md) {
  return md.split(/\n(?=## )/g).map((section) => {
    const lines = section.trim().split('\n');
    const heading = (lines.shift() || '').replace(/^##\s*/, '');
    const body = lines.join('\n').trim();
    return `<section class="card"><h2>${escapeHtml(heading)}</h2><pre>${escapeHtml(body)}</pre></section>`;
  }).join('\n');
}

const outlineMd = read('docs/memory-course-outline.md');
const pageCopyMd = read('docs/memory-course-page-copy.md');
const readmeCtaMd = read('docs/memory-readme-cta.md');
const pkg = JSON.parse(fs.readFileSync(path.join(outDir, 'package.json'), 'utf8'));

const baseCss = `
:root { color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #07111f; color: #e5eefc; }
.wrap { max-width: 1140px; margin: 0 auto; padding: 48px 32px 88px; }
.hero { padding: 44px; border-radius: 32px; background: linear-gradient(135deg, #0f172a, #172554 45%, #0f766e); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 20px 80px rgba(0,0,0,.35); }
.eyebrow { color: #93c5fd; text-transform: uppercase; letter-spacing: .12em; font-size: 12px; font-weight: 700; margin-bottom: 14px; }
h1,h2,h3 { margin: 0 0 16px; }
p { color: #d7e6ff; line-height: 1.6; }
.grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 24px; margin-top: 24px; }
.card { border-radius: 24px; padding: 24px; background: rgba(15,23,42,.86); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 12px 40px rgba(0,0,0,.22); }
.btnrow { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 24px; }
.btn { display:inline-flex; padding:14px 20px; border-radius:999px; font-weight:700; text-decoration:none; }
.btn.primary { background:#67e8f9; color:#082f49; }
.btn.secondary { border:1px solid rgba(103,232,249,.4); color:#cffafe; }
pre { white-space: pre-wrap; word-wrap: break-word; margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 15px; line-height: 1.55; color: #dbeafe; }
.kpi { display:inline-block; padding: 7px 12px; border-radius: 999px; background: rgba(103,232,249,.12); color: #a5f3fc; font-weight: 700; margin-right: 10px; margin-bottom: 10px; }
.email { background: #f8fafc; color:#0f172a; }
.email p, .email li, .email h1, .email h2, .email h3 { color:#0f172a; }
.email .shell { max-width: 760px; margin: 32px auto; background:white; border-radius: 24px; padding: 40px; box-shadow: 0 18px 60px rgba(15,23,42,.18); }
.github { background: #0d1117; }
.github .card { background: #0d1117; border-color: #30363d; }
.github pre { color: #c9d1d9; }
.slide { width: 1080px; height: 1920px; padding: 90px 80px; background: linear-gradient(180deg, #020617, #0f172a 45%, #164e63); color: white; display:flex; flex-direction:column; justify-content:space-between; }
.slide h1 { font-size: 82px; line-height: 1.04; }
.slide h2 { font-size: 54px; line-height: 1.1; color:#a5f3fc; }
.slide p { font-size: 42px; line-height: 1.3; color:#dbeafe; }
.slide .footer { font-size: 34px; color:#67e8f9; }
`;

const landingHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body><div class="wrap"><section class="hero"><div class="eyebrow">Course landing preview</div><h1>${pkg.offer.tagline_en}</h1><p>${pkg.placements.landing_page.hero.subhead}</p><div><span class="kpi">$97 course</span><span class="kpi">Bilingual track</span><span class="kpi">/memory + Obsidian</span></div><div class="btnrow"><a class="btn primary">${pkg.placements.landing_page.ctas.primary}</a><a class="btn secondary">${pkg.placements.landing_page.ctas.secondary}</a></div></section><section class="grid"><article class="card"><h3>What breaks today</h3><p>Context windows are not memory. Compaction drops details, sessions crash, and handoffs leak critical facts.</p></article><article class="card"><h3>What students build</h3><p>HOT routing, WARM topic notes, a COLD vault, WAL before compaction, and a weekly cleanup ritual.</p></article><article class="card"><h3>Who it is for</h3><p>Claude Code, OpenClaw, and Gemini CLI users who want continuity across sessions and tools.</p></article><article class="card"><h3>Funnel</h3><p>Free GitHub install to /memory, then a clean step-up when the Obsidian setup becomes the real blocker.</p></article></section></div></body></html>`;

const outlineHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body><div class="wrap"><section class="hero"><div class="eyebrow">Rendered course outline</div><h1>AI Memory Systems / Memoria para Agentes IA</h1><p>Six modules covering failure modes, architecture, WAL safety, Obsidian setup, cross-platform sync, and the weekly memory ritual.</p></section><section class="grid" style="grid-template-columns:1fr; margin-top:28px">${mdToSections(outlineMd)}</section></div></body></html>`;

const emailHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body class="email"><div class="shell"><div style="font-size:12px;text-transform:uppercase;letter-spacing:.14em;color:#0891b2;font-weight:700;margin-bottom:14px">Mailerlite preview</div><h1>${pkg.placements.email.subject}</h1><p><strong>${pkg.placements.email.preview_text}</strong></p><div><pre style="font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:18px;line-height:1.7;white-space:pre-wrap">${escapeHtml(pkg.placements.email.body_markdown)}</pre></div><p style="margin-top:28px"><a style="display:inline-block;padding:14px 20px;border-radius:999px;background:#0f766e;color:white;text-decoration:none;font-weight:700">${pkg.placements.landing_page.ctas.primary}</a></p></div></body></html>`;

const githubHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body class="github"><div class="wrap"><article class="card"><pre>${escapeHtml(readmeCtaMd)}</pre></article></div></body></html>`;

const slideData = [
  { file: 'slide-01.html', title: 'Why agents forget', body: 'Context windows are not memory. Compaction and session loss erase exactly what your workflow needs later.', footer: 'Module 1' },
  { file: 'slide-02.html', title: '3-tier architecture', body: 'HOT router, WARM topic memory, and a COLD vault give agents continuity without chaos.', footer: 'Module 2' },
  { file: 'slide-03.html', title: 'WAL before compaction', body: 'Write critical facts first, then summarize. That is how decisions survive crashes and handoffs.', footer: 'Module 3' },
  { file: 'slide-04.html', title: 'Install, sync, maintain', body: 'Use /memory with Obsidian, sync Claude Code to OpenClaw to Gemini CLI, then prune with TTL decay.', footer: 'Modules 4-6' }
];

for (const [name, html] of Object.entries({
  'landing-preview.html': landingHtml,
  'course-outline.html': outlineHtml,
  'email-preview.html': emailHtml,
  'github-readme.html': githubHtml
})) {
  fs.writeFileSync(path.join(outDir, name), html);
}

for (const slide of slideData) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body><div class="slide"><div><div class="eyebrow">AI Memory Systems</div><h1>${slide.title}</h1><p>${slide.body}</p></div><div class="footer">${slide.footer} · Build the memory layer your AI agents are missing</div></div></body></html>`;
  fs.writeFileSync(path.join(outDir, slide.file), html);
}

(async() => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2600 } });

  await page.goto(`file://${path.join(outDir, 'course-outline.html')}`);
  await page.screenshot({ path: path.join(outDir, 'course-outline-render.png'), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 1700 });
  await page.goto(`file://${path.join(outDir, 'email-preview.html')}`);
  await page.screenshot({ path: path.join(outDir, 'email-render.png'), fullPage: true });

  await page.goto(`file://${path.join(outDir, 'github-readme.html')}`);
  await page.screenshot({ path: path.join(outDir, 'rendered_github_markdown_screenshot.png'), fullPage: true });

  await page.goto(`file://${path.join(outDir, 'landing-preview.html')}`);
  await page.screenshot({ path: path.join(outDir, 'screenshot_desktop.png'), fullPage: true });

  const mobile = await browser.newPage({ ...devices['iPhone 13'] });
  await mobile.goto(`file://${path.join(outDir, 'landing-preview.html')}`);
  await mobile.screenshot({ path: path.join(outDir, 'screenshot_mobile.png'), fullPage: true });
  await mobile.close();

  const slidePage = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  for (let i = 0; i < slideData.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    await slidePage.goto(`file://${path.join(outDir, slideData[i].file)}`);
    await slidePage.screenshot({ path: path.join(outDir, `slide-${n}.png`) });
  }
  await slidePage.goto(`file://${path.join(outDir, 'slide-01.html')}`);
  await slidePage.screenshot({ path: path.join(outDir, 'reel-cover.png') });
  await slidePage.screenshot({ path: path.join(outDir, 'landing-hero.png') });

  await browser.close();

  execSync(`ffmpeg -y -framerate 0.5 -i ${path.join(outDir, 'slide-%02d.png')} -vf format=yuv420p,scale=1080:1920 -c:v libx264 -pix_fmt yuv420p ${path.join(outDir, 'final_mp4_attachment.mp4')}`, { stdio: 'inherit' });
})();
