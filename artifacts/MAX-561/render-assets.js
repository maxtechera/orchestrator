const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const outDir = __dirname;
const pkg = JSON.parse(fs.readFileSync(path.join(outDir, 'package.json'), 'utf8'));

const email = pkg.placements.email;
const reel = pkg.placements.instagram_reel;
const thread = pkg.placements.x_thread;
const linkedin = pkg.placements.linkedin_post;
const carousel = pkg.placements.instagram_carousel;

const css = `
:root { color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, Arial, sans-serif; background: #07111f; color: #f8fafc; }
a { color: inherit; }
.wrap { max-width: 1200px; margin: 0 auto; padding: 40px 32px 80px; }
.hero { padding: 36px; border-radius: 28px; background: linear-gradient(135deg, #0f172a, #1d4ed8 60%, #f97316 120%); box-shadow: 0 18px 60px rgba(0,0,0,.35); }
.eyebrow { text-transform: uppercase; letter-spacing: .12em; font-size: 12px; font-weight: 700; opacity: .8; }
h1 { margin: 12px 0 8px; font-size: 52px; line-height: 1; }
p.lead { font-size: 20px; line-height: 1.6; max-width: 900px; color: #dbeafe; }
.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 24px; }
.card { border-radius: 24px; background: rgba(15, 23, 42, .86); border: 1px solid rgba(255,255,255,.08); padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,.2); }
.card h2, .card h3 { margin: 0 0 12px; }
.card p, .card li { color: #dbe4ff; font-size: 17px; line-height: 1.55; }
.badge { display:inline-block; border-radius:999px; padding: 6px 10px; background:#172554; color:#bfdbfe; font-size:12px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; margin-bottom: 12px; }
.kpis { display:flex; gap:12px; flex-wrap:wrap; margin-top: 18px; }
.kpi { min-width: 160px; padding: 14px 16px; border-radius: 20px; background: rgba(255,255,255,.09); }
.kpi strong { display:block; font-size: 28px; }
pre { white-space: pre-wrap; font-family: ui-monospace, monospace; font-size: 14px; line-height: 1.55; color: #e2e8f0; margin: 0; }
.cta { display:inline-block; margin-top: 14px; background: #f97316; color: white; padding: 14px 18px; border-radius: 999px; text-decoration: none; font-weight: 700; }
.col-1 { display:grid; gap:24px; }
`; 

const emailHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="wrap"><section class="hero"><div class="eyebrow">MailerLite feature block</div><h1>${email.subject_options[0]}</h1><p class="lead">${email.preview_text}</p><div class="kpis"><div class="kpi"><strong>40+</strong>plugins tested in Q1</div><div class="kpi"><strong>47</strong>/review runs last week</div><div class="kpi"><strong>70 min</strong>blog to publish chain</div></div></section><section class="card" style="margin-top:24px"><div class="badge">Email body</div><h2>Read the full breakdown</h2><p>${email.feature_block_text}</p><a class="cta" href="${email.cta_url}">Read the full breakdown</a></section></div></body></html>`;

const socialHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="wrap"><section class="hero"><div class="eyebrow">MAX-561 social package</div><h1>9,000 plugins in the market. Kept 9.</h1><p class="lead">Cross-platform launch pack for maxtechera/claude-plugins, with native copy for Instagram, TikTok, X, LinkedIn, YouTube, and MailerLite.</p><div class="kpis"><div class="kpi"><strong>15+</strong>derivatives</div><div class="kpi"><strong>1</strong>pillar source</div><div class="kpi"><strong>5</strong>reply packs</div></div></section><div class="grid"><section class="card"><div class="badge">Instagram Reel</div><h2>${reel.hook_primary}</h2><p>${reel.script_sections.body_10_40s}</p><p><strong>CTA:</strong> ${reel.cta}</p></section><section class="card"><div class="badge">Carousel</div><h2>9-slide status-appeal arc</h2><pre>${carousel.slides.join('\n\n')}</pre></section><section class="card"><div class="badge">X thread</div><h2>${thread.hook_primary}</h2><pre>${thread.posts.join('\n\n')}</pre></section><section class="card"><div class="badge">LinkedIn</div><h2>Executive-advisor cut</h2><p>${linkedin.body}</p></section></div></div></body></html>`;

fs.writeFileSync(path.join(outDir, 'email-preview.html'), emailHtml);
fs.writeFileSync(path.join(outDir, 'social-package-preview.html'), socialHtml);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });

  await page.goto(`file://${path.join(outDir, 'email-preview.html')}`);
  await page.screenshot({ path: path.join(outDir, 'rendered_html_preview_screenshot.png'), fullPage: true });

  await page.goto(`file://${path.join(outDir, 'social-package-preview.html')}`);
  await page.screenshot({ path: path.join(outDir, 'linear_attached_visual_proof.png'), fullPage: true });

  await browser.close();
})();
