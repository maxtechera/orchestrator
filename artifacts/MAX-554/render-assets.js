const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');
const { execSync } = require('child_process');

const outDir = __dirname;
const pkg = JSON.parse(fs.readFileSync(path.join(outDir, 'package.json'), 'utf8'));

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const css = `
:root { color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #07111f; color: #e5eefc; }
.wrap { max-width: 1180px; margin: 0 auto; padding: 48px 32px 88px; }
.hero { padding: 44px; border-radius: 32px; background: linear-gradient(135deg, #0f172a, #172554 45%, #0f766e); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 20px 80px rgba(0,0,0,.35); }
.eyebrow { color: #93c5fd; text-transform: uppercase; letter-spacing: .14em; font-size: 12px; font-weight: 700; margin-bottom: 14px; }
h1,h2,h3 { margin: 0 0 16px; }
h1 { font-size: 56px; line-height: 1.02; }
h2 { font-size: 28px; }
p, li { color: #d7e6ff; line-height: 1.68; font-size: 18px; }
.grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 24px; margin-top: 28px; }
.card { border-radius: 24px; padding: 28px; background: rgba(15,23,42,.86); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 12px 40px rgba(0,0,0,.22); }
.kpi { display:inline-block; padding: 7px 12px; border-radius: 999px; background: rgba(103,232,249,.12); color: #a5f3fc; font-weight: 700; margin-right: 10px; margin-bottom: 10px; }
pre { white-space: pre-wrap; word-wrap: break-word; margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 15px; line-height: 1.55; color: #dbeafe; }
.btnrow { display:flex; gap:16px; flex-wrap:wrap; margin-top:24px; }
.btn { display:inline-flex; padding:14px 20px; border-radius:999px; font-weight:700; text-decoration:none; }
.btn.primary { background:#67e8f9; color:#082f49; }
.btn.secondary { border:1px solid rgba(103,232,249,.4); color:#cffafe; }
.email { background: #f8fafc; color: #0f172a; }
.email .shell { max-width: 760px; margin: 40px auto; background: white; border-radius: 24px; padding: 40px; box-shadow: 0 18px 60px rgba(15,23,42,.18); }
.email h1, .email p, .email li { color: #0f172a; }
.github { background:#0d1117; }
.github .card { background:#0d1117; border-color:#30363d; }
.github pre { color:#c9d1d9; }
.blog article { max-width: 820px; margin: 0 auto; }
.blog h1 { font-size: 54px; }
.blog h2 { margin-top: 32px; }
.blog .lede { font-size: 22px; color: #bfdbfe; }
.slide { width:1080px; height:1920px; padding:90px 80px; background: linear-gradient(180deg, #020617, #0f172a 45%, #164e63); color:white; display:flex; flex-direction:column; justify-content:space-between; }
.slide h1 { font-size:84px; }
.slide p { font-size:42px; line-height:1.24; color:#dbeafe; }
.slide .footer { font-size:34px; color:#67e8f9; }
`;

const landingHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="wrap"><section class="hero"><div class="eyebrow">${pkg.placements.landing.eyebrow}</div><h1>${pkg.placements.landing.headline}</h1><p>${pkg.placements.landing.subhead}</p><div>${pkg.placements.landing.bullets.map((b) => `<span class="kpi">${b}</span>`).join('')}</div><div class="btnrow"><a class="btn primary">${pkg.source_blog.primary_cta}</a><a class="btn secondary">${pkg.source_blog.secondary_cta}</a></div></section><section class="grid"><article class="card"><h2>Blog angle</h2><p>The launch story frames Ship as the missing GTM operating layer after the build, not another shiny workflow demo.</p></article><article class="card"><h2>MailerLite asset</h2><p>The companion email keeps the message tight, benefits-first, and ready to paste into a campaign builder.</p></article><article class="card"><h2>Proof pack</h2><p>Rendered HTML, desktop and mobile screenshots, GitHub markdown proof, and an MP4 attachment for Linear.</p></article><article class="card"><h2>Receipts</h2><p>Install path, credential gate, stage model, and repo links are all visible in the rendered assets below.</p></article></section></div></body></html>`;

const blogHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body class="blog"><div class="wrap"><article><div class="eyebrow">Rendered HTML blog preview</div><h1>${pkg.source_blog.title}</h1><p class="lede">The build side of AI got fast before the launch side did. Ship is the system I built to close that gap.</p><p>You can spin up code, wire features, and move a repo faster than ever. Then the annoying part kicks in, validation, positioning, launch prep, content, analytics, follow-up, and the credential checks nobody wants to think about until a token expires five minutes before push.</p><p>That is why Ship exists. It turns that last mile into an explicit pipeline for Claude Code teams, with stage gates, role routing, proof requirements, and preflight checks before the public launch.</p><h2>The GTM gap for indie hackers</h2><p>A lot of launches do not miss because the product is weak. They miss because the surrounding system is soft. No real handoffs. No launch proof. No clear owner for the next stage. Ship gives that operating layer a shape.</p><h2>What Ship does</h2><p><strong>Validate.</strong> Stress-test the offer, pain, and angle before overbuilding.</p><p><strong>Build.</strong> Route implementation to the right repo and artifact surface.</p><p><strong>Launch.</strong> Package the blog, email, screenshots, MP4, and public proof instead of leaving them scattered.</p><p><strong>Measure.</strong> Pull stars, signups, CTR, and response signals back into the loop.</p><p><strong>Iterate.</strong> Run the next cycle with sharper proof and fewer dumb mistakes.</p><h2>The credential gate matters more than people think</h2><p>Ship blocks launch actions when credentials are stale. That sounds boring until it saves forty-five minutes right when momentum matters most. Healthy or blocked. Pass or fail. Before you push, not after you break the launch.</p><pre>python3 credentials/scripts/check_local.py --only "github,railway,vercel,openai,anthropic" --json</pre><h2>Install in 3 commands</h2><pre>/plugin marketplace add maxtechera/ship
clawhub install ship
/ship</pre><h2>When not to use Ship</h2><p>If you just need one tiny prompt, this is too much. If you do not want stage gates or proof, this is too much. But if you want agent speed to translate into actual market movement, this is the category I wanted to exist.</p><h2>CTA</h2><p>Star the repo, read the launch story, and join the newsletter. Mostrá receipts o callate.</p></article></div></body></html>`;

const emailHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body class="email"><div class="shell"><div class="eyebrow" style="color:#0891b2">MailerLite preview</div><h1>${pkg.placements.email.subject}</h1><p><strong>${pkg.placements.email.preview_text}</strong></p><pre style="font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:18px;line-height:1.7;white-space:pre-wrap;color:#0f172a">${escapeHtml(pkg.placements.email.body)}</pre><p style="margin-top:28px"><a style="display:inline-block;padding:14px 20px;border-radius:999px;background:#0f766e;color:white;text-decoration:none;font-weight:700">${pkg.source_blog.primary_cta}</a></p></div></body></html>`;

const githubHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body class="github"><div class="wrap"><article class="card"><div class="eyebrow">Rendered GitHub markdown preview</div><pre>${escapeHtml(pkg.placements.github_markdown)}</pre></article></div></body></html>`;

const slides = [
  { file: 'slide-01.html', title: 'Build got fast', body: 'Launch stayed messy. Ship closes that gap with stages, proof, and a real GTM operating layer.', footer: 'Ship launch' },
  { file: 'slide-02.html', title: '5 stages', body: 'Validate. Build. Launch. Measure. Iterate. No more random prompt hopping.', footer: 'Pipeline' },
  { file: 'slide-03.html', title: 'Credential gate', body: 'Healthy or blocked, before you push. Expired tokens stop momentum more than most founders admit.', footer: 'Preflight' },
  { file: 'slide-04.html', title: 'Receipts', body: 'Rendered blog proof, MailerLite email, GitHub markdown, desktop and mobile screenshots, plus MP4 for Linear.', footer: 'Proof pack' }
];

for (const [name, html] of Object.entries({
  'landing-preview.html': landingHtml,
  'rendered-blog.html': blogHtml,
  'email-preview.html': emailHtml,
  'github-readme.html': githubHtml
})) {
  fs.writeFileSync(path.join(outDir, name), html);
}

for (const slide of slides) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="slide"><div><div class="eyebrow">MAX-554 proof pack</div><h1>${slide.title}</h1><p>${slide.body}</p></div><div class="footer">${slide.footer}</div></div></body></html>`;
  fs.writeFileSync(path.join(outDir, slide.file), html);
}

(async() => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });

  await page.goto(`file://${path.join(outDir, 'rendered-blog.html')}`);
  await page.screenshot({ path: path.join(outDir, 'rendered_html_screenshot.png'), fullPage: true });

  await page.goto(`file://${path.join(outDir, 'email-preview.html')}`);
  await page.screenshot({ path: path.join(outDir, 'rendered_html_preview_screenshot.png'), fullPage: true });

  await page.goto(`file://${path.join(outDir, 'github-readme.html')}`);
  await page.screenshot({ path: path.join(outDir, 'rendered_github_markdown_screenshot.png'), fullPage: true });

  await page.goto(`file://${path.join(outDir, 'landing-preview.html')}`);
  await page.screenshot({ path: path.join(outDir, 'screenshot_desktop.png'), fullPage: true });

  const mobile = await browser.newPage({ ...devices['iPhone 13'] });
  await mobile.goto(`file://${path.join(outDir, 'landing-preview.html')}`);
  await mobile.screenshot({ path: path.join(outDir, 'screenshot_mobile.png'), fullPage: true });
  await mobile.close();

  const slidePage = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  for (let i = 0; i < slides.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    await slidePage.goto(`file://${path.join(outDir, slides[i].file)}`);
    await slidePage.screenshot({ path: path.join(outDir, `slide-${n}.png`) });
  }
  await browser.close();

  execSync(`ffmpeg -y -framerate 0.5 -i ${path.join(outDir, 'slide-%02d.png')} -vf format=yuv420p,scale=1080:1920 -c:v libx264 -pix_fmt yuv420p ${path.join(outDir, 'final_mp4_attachment.mp4')}`, { stdio: 'inherit' });
})();
