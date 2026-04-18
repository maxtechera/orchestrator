const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

const outDir = __dirname;
const repoRoot = path.resolve(outDir, '..', '..');
const courseMd = fs.readFileSync(path.join(repoRoot, 'docs', 'memory-course-outline.md'), 'utf8');
const readmeMd = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function mdToHtml(md) {
  return md
    .split(/\n## /g)
    .map((chunk, idx) => {
      const normalized = idx === 0 ? chunk : `## ${chunk}`;
      return `<section class="card"><pre>${escapeHtml(normalized)}</pre></section>`;
    })
    .join('\n');
}

const baseCss = `
:root { color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #09111f; color: #e5eefc; }
.wrap { max-width: 1180px; margin: 0 auto; padding: 40px 28px 80px; }
.hero { padding: 40px; border-radius: 30px; background: linear-gradient(135deg, #0f172a 0%, #172554 45%, #0b3b6f 100%); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 20px 70px rgba(0,0,0,.35); }
.eyebrow { color: #93c5fd; text-transform: uppercase; letter-spacing: .12em; font-size: 12px; font-weight: 700; margin-bottom: 10px; }
h1,h2,h3 { margin: 0 0 14px; }
p { margin: 0; color: #d7e6ff; line-height: 1.6; }
.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; margin-top: 24px; }
.card { background: rgba(15, 23, 42, 0.92); border: 1px solid rgba(255,255,255,.08); border-radius: 24px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,.22); }
.kicker { display:inline-block; padding: 6px 10px; border-radius: 999px; background: rgba(96,165,250,.16); color: #bfdbfe; font-size: 12px; font-weight: 700; margin-bottom: 12px; }
.ctaRow { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 24px; }
.btn { display: inline-flex; padding: 14px 20px; border-radius: 999px; text-decoration: none; font-weight: 700; }
.primary { background: #7dd3fc; color: #082032; }
.secondary { color: #e0f2fe; border: 1px solid rgba(125,211,252,.45); }
pre { white-space: pre-wrap; margin: 0; font-size: 15px; line-height: 1.55; color: #dbeafe; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.markdown { margin-top: 28px; display: grid; gap: 18px; }
.small { font-size: 14px; color: #c7d7ef; }
.github { background: #0d1117; }
.github .card { background: #0d1117; border-color: #30363d; }
.github pre { color: #c9d1d9; }
.proofBoard .grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.metrics { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 14px; margin-top: 20px; }
.metric { background: rgba(255,255,255,.05); border-radius: 18px; padding: 18px; }
.metric strong { display:block; font-size: 28px; margin-bottom: 6px; }
`;

const previewHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body><div class="wrap"><div class="hero"><div class="eyebrow">La Academia · OSS Tool → Course</div><h1>/memory, from install to trusted recall</h1><p>Pasá de "los hooks ya corren" a un sistema de memoria persistente que Claude puede usar de verdad. El curso muestra HOT, WARM, COLD, sync pipeline, wiki y mantenimiento anti-sludge.</p><div class="ctaRow"><a class="btn primary">Inscribirme al curso /memory</a><a class="btn secondary">Ver cómo funciona el sistema</a></div></div><div class="grid"><div class="card"><div class="kicker">Friction point</div><h3>Setup works, confidence does not</h3><p>La instalación te deja con hooks activos, pero no te enseña qué guardar, cómo estructurar tiers o cuándo podar memoria vieja.</p></div><div class="card"><div class="kicker">Transformation</div><h3>Install → operating model</h3><p>El estudiante sale con una arquitectura usable, reglas de clasificación, queries de recuperación y rutina semanal de mantenimiento.</p></div><div class="card"><div class="kicker">Modules</div><h3>7 modules, hands-on</h3><p>Olvido, 3-tier architecture, hooks, retrieval, multi-agent handoff, anti-rot maintenance y sistema completo de extremo a extremo.</p></div><div class="card"><div class="kicker">Best for</div><h3>Claude Code users running long projects</h3><p>Ideal para quienes ya instalaron /memory y quieren recuperar contexto real entre sesiones sin volver a cargar todo manualmente.</p></div></div></div></body></html>`;

const outlineHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body><div class="wrap"><div class="hero"><div class="eyebrow">Rendered course outline</div><h1>/memory course outline</h1><p>Module breakdown, friction mapping, operating-model angle, and CTA copy for README plus newsletter.</p></div><div class="markdown">${mdToHtml(courseMd)}</div></div></body></html>`;

const emailHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body><div class="wrap"><div class="hero"><div class="eyebrow">MailerLite-ready preview</div><h1>You installed /memory. Now make it trustworthy.</h1><p>Most people stop after setup. The course teaches what belongs in each tier, how sync actually works, and how to keep recall useful instead of noisy.</p><div class="ctaRow"><a class="btn primary">Enroll in the /memory course</a></div></div><div class="grid"><div class="card"><div class="kicker">Inside</div><h3>HOT, WARM, COLD explained live</h3><p class="small">Build a system Claude can query without flooding every session.</p></div><div class="card"><div class="kicker">Fix the friction</div><h3>From "hooks work" to "memory works"</h3><p class="small">Learn storage rules, retrieval surfaces, sync cadence, wiki flow, and anti-rot maintenance.</p></div></div></div></body></html>`;

const githubHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body class="github"><div class="wrap"><div class="card"><pre>${escapeHtml(readmeMd)}</pre></div></div></body></html>`;

const proofHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body><div class="wrap proofBoard"><div class="hero"><div class="eyebrow">MAX-564 visual proof</div><h1>/memory course package</h1><p>OSS tool to paid course bridge for MailerLite and README CTA surfaces.</p><div class="metrics"><div class="metric"><strong>7</strong><span>modules</span></div><div class="metric"><strong>1</strong><span>friction point mapped</span></div><div class="metric"><strong>2</strong><span>CTA surfaces written</span></div><div class="metric"><strong>$97</strong><span>offer step</span></div></div></div><div class="grid"><div class="card"><div class="kicker">Core promise</div><h3>From install to trusted recall</h3><p>Student leaves with a working persistent-memory setup, not just theory.</p></div><div class="card"><div class="kicker">MailerLite</div><h3>Email preview included</h3><p>Ready for newsletter CTA and nurture placement.</p></div><div class="card"><div class="kicker">Repo</div><h3>Docs + artifact pack</h3><p>Markdown outline, preview HTML, proof images, and MP4 attachment.</p></div></div></div></body></html>`;

for (const [name, html] of Object.entries({
  'preview.html': previewHtml,
  'course-outline.html': outlineHtml,
  'email-preview.html': emailHtml,
  'github-readme.html': githubHtml,
  'proof-board.html': proofHtml,
})) {
  fs.writeFileSync(path.join(outDir, name), html);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });

  await page.goto(`file://${path.join(outDir, 'course-outline.html')}`);
  await page.screenshot({ path: path.join(outDir, 'rendered_html_screenshot.png'), fullPage: true });

  await page.goto(`file://${path.join(outDir, 'email-preview.html')}`);
  await page.screenshot({ path: path.join(outDir, 'rendered_html_preview_screenshot.png'), fullPage: true });

  await page.goto(`file://${path.join(outDir, 'github-readme.html')}`);
  await page.screenshot({ path: path.join(outDir, 'rendered_github_markdown_screenshot.png'), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 1400 });
  await page.goto(`file://${path.join(outDir, 'preview.html')}`);
  await page.screenshot({ path: path.join(outDir, 'screenshot_desktop.png'), fullPage: true });

  const mobile = await browser.newPage({ ...devices['iPhone 13'] });
  await mobile.goto(`file://${path.join(outDir, 'preview.html')}`);
  await mobile.screenshot({ path: path.join(outDir, 'screenshot_mobile.png'), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto(`file://${path.join(outDir, 'proof-board.html')}`);
  await page.screenshot({ path: path.join(outDir, 'linear_attached_visual_proof.png'), fullPage: true });

  await browser.close();
})();
