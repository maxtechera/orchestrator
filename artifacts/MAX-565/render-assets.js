const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

const outDir = path.resolve(__dirname);
const repoRoot = path.resolve(outDir, '..', '..');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function mdToSections(md) {
  return md.split(/\n---\n/g).map((section) => `<section class="card"><pre>${escapeHtml(section)}</pre></section>`).join('\n');
}

const courseMd = fs.readFileSync(path.join(repoRoot, 'docs/course-outline.md'), 'utf8');
const lessonMd = fs.readFileSync(path.join(repoRoot, 'docs/sample-lessons/module-1-lesson-1-context-limit-wall.md'), 'utf8');
const readmeMd = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');

const baseCss = `
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #0b1020; color: #e5e7eb; }
  .wrap { max-width: 1120px; margin: 0 auto; padding: 48px 32px 80px; }
  .eyebrow { color: #93c5fd; text-transform: uppercase; letter-spacing: .12em; font-size: 12px; font-weight: 700; }
  h1, h2, h3 { margin: 0 0 16px; }
  .hero { padding: 40px; border-radius: 32px; background: linear-gradient(135deg, #111827, #172554); border: 1px solid rgba(255,255,255,.08); box-shadow: 0 20px 70px rgba(0,0,0,.35); }
  .hero p { color: #cbd5e1; font-size: 20px; line-height: 1.5; max-width: 760px; }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 24px; }
  .card { border-radius: 24px; background: rgba(15,23,42,.9); border: 1px solid rgba(255,255,255,.08); padding: 24px; box-shadow: 0 12px 40px rgba(0,0,0,.25); }
  .card h3 { font-size: 22px; }
  .ctaRow { display: flex; gap: 16px; margin-top: 24px; }
  .btn { display: inline-flex; padding: 14px 20px; border-radius: 999px; text-decoration: none; font-weight: 700; }
  .btn.primary { background: #60a5fa; color: #08111f; }
  .btn.secondary { background: transparent; color: #dbeafe; border: 1px solid rgba(147,197,253,.5); }
  .markdown { margin-top: 28px; }
  pre { white-space: pre-wrap; word-wrap: break-word; margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 15px; line-height: 1.55; color: #dbe4ff; }
  .github { background: #0d1117; }
  .github .card { background: #0d1117; border-color: #30363d; }
  .github pre { color: #c9d1d9; }
  .badge { display:inline-block; padding: 6px 10px; border-radius: 999px; background: rgba(96,165,250,.15); color: #bfdbfe; font-weight: 700; margin-bottom: 12px; }
`;

const landingHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body><div class="wrap"><div class="hero"><div class="eyebrow">La Academia · Preview</div><h1>/orchestrator, run reliable multi-agent workflows in 1 week</h1><p>Pasá de prompts sueltos a equipos de agentes con contratos, memoria y guardrails. Incluye 6 módulos, lección gratuita y plantillas clonables.</p><div class="ctaRow"><a class="btn primary">Inscribirme al curso /orchestrator</a><a class="btn secondary">Ver la lección gratuita</a></div></div><div class="grid"><div class="card"><div class="badge">What you get</div><h3>6 modules, ~30 production-ready lessons</h3><p>Single-agent failure modes, ticket contracts, agent team spawning, memory, critics, retries, and production orchestration.</p></div><div class="card"><div class="badge">Free lesson</div><h3>The context-limit wall</h3><p>Ungated workbook plus preview video showing exactly why one agent stops being enough once proof and coordination matter.</p></div><div class="card"><div class="badge">For</div><h3>Claude Code users scaling beyond one agent</h3><p>Indie devs, AI-forward engineers, and small agencies who already ship with one coding agent and need reliable parallel workflows.</p></div><div class="card"><div class="badge">Promise</div><h3>Reliable parallel execution in 1 week</h3><p>Without losing context, duplicating work, or letting agents drift onto the wrong repo, surface, or proof path.</p></div></div></div></body></html>`;

const courseHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body><div class="wrap"><div class="hero"><div class="eyebrow">Rendered course outline</div><h1>/orchestrator course outline</h1><p>Module plan, ICP, transformation, lesson inventory, preview lesson strategy, and CTA copy.</p></div><div class="markdown">${mdToSections(courseMd)}</div></div></body></html>`;

const lessonHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body><div class="wrap"><div class="hero"><div class="eyebrow">Rendered sample lesson</div><h1>Module 1, Lesson 1</h1><p>The context-limit wall and why single-agent workflows break.</p></div><div class="markdown">${mdToSections(lessonMd)}</div></div></body></html>`;

const githubHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}</style></head><body class="github"><div class="wrap"><div class="card"><pre>${escapeHtml(readmeMd)}</pre></div></div></body></html>`;

for (const [name, html] of Object.entries({ 'landing-preview.html': landingHtml, 'course-outline.html': courseHtml, 'sample-lesson.html': lessonHtml, 'github-readme.html': githubHtml })) {
  fs.writeFileSync(path.join(outDir, name), html);
}

(async() => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });
  await page.goto(`file://${path.join(outDir, 'course-outline.html')}`);
  await page.screenshot({ path: path.join(outDir, 'course-outline-render.png'), fullPage: true });

  await page.goto(`file://${path.join(outDir, 'sample-lesson.html')}`);
  await page.screenshot({ path: path.join(outDir, 'sample-lesson-render.png'), fullPage: true });

  await page.goto(`file://${path.join(outDir, 'github-readme.html')}`);
  await page.screenshot({ path: path.join(outDir, 'github-markdown-readme.png'), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 1600 });
  await page.goto(`file://${path.join(outDir, 'landing-preview.html')}`);
  await page.screenshot({ path: path.join(outDir, 'desktop-preview.png'), fullPage: true });

  const iphone = await browser.newPage({ ...devices['iPhone 13'] });
  await iphone.goto(`file://${path.join(outDir, 'landing-preview.html')}`);
  await iphone.screenshot({ path: path.join(outDir, 'mobile-preview.png'), fullPage: true });

  await browser.close();
})();
