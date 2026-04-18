from pathlib import Path
import textwrap

ROOT = Path(__file__).parent

def esc(text: str) -> str:
    return (
        text.replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
    )

def lines_svg(lines, x, y, size=28, fill='#e2e8f0', weight='400', lh=1.35):
    out = []
    for i, line in enumerate(lines):
        yy = y + i * int(size * lh)
        out.append(f'<text x="{x}" y="{yy}" font-size="{size}" font-weight="{weight}" fill="{fill}">{esc(line)}</text>')
    return '\n'.join(out)

def wrap(text, width):
    return textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False)

def write(name, content):
    (ROOT / name).write_text(content, encoding='utf-8')

social_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640" viewBox="0 0 1280 640" font-family="DejaVu Sans">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="45%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="28" flood-color="#020617" flood-opacity="0.35"/></filter>
  </defs>
  <rect width="1280" height="640" fill="url(#bg)"/>
  <circle cx="1100" cy="540" r="220" fill="#38bdf8" opacity="0.14"/>
  <rect x="56" y="56" width="280" height="44" rx="22" fill="#0f172a" fill-opacity="0.72" stroke="#334155"/>
  <text x="78" y="84" font-size="18" font-weight="600" fill="#7dd3fc">maxtechera/orchestrator</text>
  <text x="56" y="198" font-size="84" font-weight="700" fill="#f8fafc">Verified agent</text>
  <text x="56" y="278" font-size="84" font-weight="700" fill="#f8fafc">orchestration</text>
  {lines_svg(wrap('Dispatch worker agents, run independent verification, and only ship tickets that actually pass.', 42), 56, 340, size=31, fill='#dbeafe', weight='500')}
  <rect x="56" y="540" width="330" height="44" rx="22" fill="#0f172a" fill-opacity="0.72" stroke="#334155"/>
  <text x="80" y="568" font-size="19" font-weight="500" fill="#cbd5e1">Linear, GitHub, Notion, Jira</text>
  <rect x="404" y="540" width="300" height="44" rx="22" fill="#0f172a" fill-opacity="0.72" stroke="#334155"/>
  <text x="428" y="568" font-size="19" font-weight="500" fill="#cbd5e1">Claude Code + OpenClaw</text>

  <g filter="url(#shadow)">
    <rect x="782" y="72" width="436" height="250" rx="28" fill="#0f172a" fill-opacity="0.82" stroke="#334155"/>
    <text x="814" y="114" font-size="18" fill="#94a3b8" letter-spacing="2">KEY SKILLS INCLUDED</text>
    <text x="814" y="236" font-size="132" font-weight="700" fill="#f8fafc">8</text>
    <text x="814" y="280" font-size="26" fill="#bfdbfe">content, ecommerce, engineering, finance,</text>
    <text x="814" y="314" font-size="26" fill="#bfdbfe">gtm, seo, sales-outreach, product</text>

    <rect x="782" y="344" width="436" height="220" rx="28" fill="#0f172a" fill-opacity="0.82" stroke="#334155"/>
    <text x="814" y="386" font-size="18" fill="#94a3b8" letter-spacing="2">WHY IT GETS CLICKED</text>
    <rect x="814" y="410" width="372" height="42" rx="16" fill="#111827" stroke="#1f2937"/>
    <text x="834" y="437" font-size="21" fill="#e2e8f0">Ticket contract drives execution</text>
    <text x="1092" y="437" font-size="21" font-weight="700" fill="#86efac">Clear scope</text>
    <rect x="814" y="462" width="372" height="42" rx="16" fill="#111827" stroke="#1f2937"/>
    <text x="834" y="489" font-size="21" fill="#e2e8f0">Separate verification harness</text>
    <text x="1052" y="489" font-size="21" font-weight="700" fill="#86efac">No self-grading</text>
    <rect x="814" y="514" width="372" height="42" rx="16" fill="#111827" stroke="#1f2937"/>
    <text x="834" y="541" font-size="21" fill="#e2e8f0">Works with your existing board</text>
    <text x="1088" y="541" font-size="21" font-weight="700" fill="#86efac">Zero-config start</text>
  </g>
</svg>'''
write('social-card.svg', social_svg)

preview_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1400" viewBox="0 0 1440 1400" font-family="DejaVu Sans">
  <rect width="1440" height="1400" fill="#020617"/>
  <text x="64" y="88" font-size="44" font-weight="700" fill="#f8fafc">MAX-525, GitHub repo optimization proof</text>
  <g>
    <rect x="64" y="130" width="620" height="180" rx="22" fill="#0f172a" stroke="#1e293b"/>
    <text x="92" y="178" font-size="28" font-weight="700" fill="#f8fafc">Updated description</text>
    {lines_svg(wrap('Verified AI-agent workflow orchestrator for Claude Code. Dispatch workers, run independent checks, ship only what passes.', 44), 92, 220, size=24, fill='#e2e8f0')}
    <text x="92" y="284" font-size="20" fill="#94a3b8">119 characters</text>
  </g>
  <g>
    <rect x="720" y="130" width="656" height="180" rx="22" fill="#0f172a" stroke="#1e293b"/>
    <text x="748" y="178" font-size="28" font-weight="700" fill="#f8fafc">Homepage</text>
    {lines_svg(wrap('https://github.com/maxtechera/orchestrator/blob/main/docs/course-outline.md', 56), 748, 222, size=22, fill='#7dd3fc')}
  </g>
  <g>
    <rect x="64" y="340" width="620" height="160" rx="22" fill="#0f172a" stroke="#1e293b"/>
    <text x="92" y="388" font-size="28" font-weight="700" fill="#f8fafc">Topics</text>
    <text x="92" y="432" font-size="22" fill="#bae6fd">gtm  ·  ai-agents  ·  claude-code  ·  skill</text>
    <text x="92" y="468" font-size="22" fill="#bae6fd">pipeline  ·  ship-engine  ·  content</text>
  </g>
  <g>
    <rect x="720" y="340" width="656" height="160" rx="22" fill="#0f172a" stroke="#1e293b"/>
    <text x="748" y="388" font-size="28" font-weight="700" fill="#f8fafc">Key skill count</text>
    <text x="748" y="448" font-size="64" font-weight="700" fill="#86efac">8</text>
    <text x="818" y="448" font-size="24" fill="#cbd5e1">domain skills in skills/</text>
  </g>
  <rect x="64" y="540" width="1312" height="780" rx="26" fill="#0f172a" stroke="#1e293b"/>
  <text x="92" y="590" font-size="30" font-weight="700" fill="#f8fafc">Social preview card</text>
  <rect x="92" y="620" width="1256" height="628" rx="24" fill="#111827" stroke="#334155"/>
  <text x="128" y="684" font-size="34" font-weight="700" fill="#f8fafc">Committed asset: artifacts/MAX-525/orchestrator-social-card.png</text>
  <text x="128" y="734" font-size="24" fill="#cbd5e1">The final PNG is composited into this proof render during generation.</text>
</svg>'''
write('preview-board.svg', preview_svg)

repo_desktop = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1100" viewBox="0 0 1440 1100" font-family="DejaVu Sans">
  <rect width="1440" height="1100" fill="#0d1117"/>
  <rect x="0" y="0" width="1440" height="76" fill="#161b22"/>
  <text x="48" y="48" font-size="28" fill="#f0f6fc" font-weight="700">GitHub</text>
  <rect x="80" y="132" width="1280" height="880" rx="16" fill="#0d1117" stroke="#30363d"/>
  <text x="120" y="200" font-size="38" font-weight="700" fill="#f0f6fc">maxtechera / orchestrator</text>
  <text x="120" y="248" font-size="26" fill="#8b949e">Verified AI-agent workflow orchestrator for Claude Code. Dispatch workers, run independent checks, ship only what passes.</text>
  <text x="120" y="296" font-size="22" fill="#58a6ff">https://github.com/maxtechera/orchestrator/blob/main/docs/course-outline.md</text>
  <rect x="120" y="334" width="96" height="34" rx="17" fill="#1f6feb"/><text x="144" y="357" font-size="18" fill="#ffffff">Code</text>
  <rect x="120" y="394" width="94" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="142" y="417" font-size="16" fill="#c9d1d9">gtm</text>
  <rect x="226" y="394" width="146" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="248" y="417" font-size="16" fill="#c9d1d9">ai-agents</text>
  <rect x="384" y="394" width="156" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="406" y="417" font-size="16" fill="#c9d1d9">claude-code</text>
  <rect x="552" y="394" width="98" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="576" y="417" font-size="16" fill="#c9d1d9">skill</text>
  <rect x="662" y="394" width="122" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="686" y="417" font-size="16" fill="#c9d1d9">pipeline</text>
  <rect x="796" y="394" width="150" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="820" y="417" font-size="16" fill="#c9d1d9">ship-engine</text>
  <rect x="958" y="394" width="122" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="982" y="417" font-size="16" fill="#c9d1d9">content</text>
  <text x="120" y="488" font-size="20" fill="#8b949e">README preview</text>
  <rect x="120" y="516" width="930" height="420" rx="18" fill="#161b22" stroke="#30363d"/>
  <text x="154" y="572" font-size="34" font-weight="700" fill="#f0f6fc">/orchestrator</text>
  <text x="154" y="620" font-size="24" fill="#c9d1d9">Expert orchestrator of agentic teams. The ticket contract defines work.</text>
  <text x="154" y="656" font-size="24" fill="#c9d1d9">The verification harness rules completion.</text>
  <text x="154" y="732" font-size="24" fill="#58a6ff">/plugin marketplace add maxtechera/orchestrator</text>
  <text x="154" y="774" font-size="24" fill="#58a6ff">clawhub install orchestrator</text>
  <rect x="1080" y="516" width="240" height="120" rx="12" fill="#111827" stroke="#334155"/>
  <text x="1112" y="584" font-size="22" fill="#e2e8f0">social card</text>
</svg>'''
write('repo-desktop.svg', repo_desktop)

repo_mobile = f'''<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280" viewBox="0 0 720 1280" font-family="DejaVu Sans">
  <rect width="720" height="1280" fill="#0d1117"/>
  <rect x="0" y="0" width="720" height="76" fill="#161b22"/>
  <text x="28" y="48" font-size="28" fill="#f0f6fc" font-weight="700">GitHub</text>
  <rect x="24" y="112" width="672" height="1128" rx="20" fill="#0d1117" stroke="#30363d"/>
  <text x="56" y="176" font-size="34" font-weight="700" fill="#f0f6fc">maxtechera /</text>
  <text x="56" y="214" font-size="34" font-weight="700" fill="#f0f6fc">orchestrator</text>
  {lines_svg(wrap('Verified AI-agent workflow orchestrator for Claude Code. Dispatch workers, run independent checks, ship only what passes.', 28), 56, 260, size=22, fill='#8b949e')}
  {lines_svg(wrap('https://github.com/maxtechera/orchestrator/blob/main/docs/course-outline.md', 26), 56, 408, size=18, fill='#58a6ff')}
  <rect x="56" y="510" width="94" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="78" y="533" font-size="16" fill="#c9d1d9">gtm</text>
  <rect x="162" y="510" width="136" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="184" y="533" font-size="16" fill="#c9d1d9">ai-agents</text>
  <rect x="310" y="510" width="146" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="332" y="533" font-size="16" fill="#c9d1d9">claude-code</text>
  <rect x="56" y="558" width="98" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="80" y="581" font-size="16" fill="#c9d1d9">skill</text>
  <rect x="166" y="558" width="122" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="190" y="581" font-size="16" fill="#c9d1d9">pipeline</text>
  <rect x="300" y="558" width="150" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="324" y="581" font-size="16" fill="#c9d1d9">ship-engine</text>
  <rect x="462" y="558" width="122" height="34" rx="17" fill="#1b1f24" stroke="#30363d"/><text x="486" y="581" font-size="16" fill="#c9d1d9">content</text>
  <rect x="56" y="636" width="608" height="304" rx="18" fill="#111827" stroke="#334155"/>
  <text x="246" y="800" font-size="28" fill="#e2e8f0">social card</text>
  <rect x="56" y="972" width="608" height="208" rx="18" fill="#161b22" stroke="#30363d"/>
  <text x="84" y="1020" font-size="26" fill="#f0f6fc" font-weight="700">README preview</text>
  <text x="84" y="1060" font-size="20" fill="#c9d1d9">Expert orchestrator of agentic teams.</text>
  <text x="84" y="1092" font-size="20" fill="#c9d1d9">The ticket contract defines work.</text>
  <text x="84" y="1124" font-size="20" fill="#c9d1d9">The verification harness rules completion.</text>
</svg>'''
write('repo-mobile.svg', repo_mobile)

markdown_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1080" viewBox="0 0 1440 1080" font-family="DejaVu Sans">
  <rect width="1440" height="1080" fill="#ffffff"/>
  <rect x="56" y="56" width="1328" height="968" rx="20" fill="#ffffff" stroke="#d0d7de"/>
  <text x="96" y="128" font-size="44" font-weight="700" fill="#24292f">/orchestrator</text>
  <text x="96" y="182" font-size="28" fill="#24292f">Expert orchestrator of agentic teams. The ticket contract defines work.</text>
  <text x="96" y="220" font-size="28" fill="#24292f">The verification harness rules completion.</text>
  <text x="96" y="302" font-size="34" font-weight="700" fill="#24292f">Learn /orchestrator</text>
  <text x="96" y="354" font-size="26" fill="#57606a">• Course outline</text>
  <text x="96" y="392" font-size="26" fill="#57606a">• Free lesson workbook</text>
  <text x="96" y="430" font-size="26" fill="#57606a">• Paid course CTA</text>
  <rect x="96" y="486" width="1248" height="428" rx="18" fill="#f6f8fa" stroke="#d8dee4"/>
  <text x="128" y="538" font-size="26" fill="#24292f">GitHub repo presentation update for MAX-525</text>
  <text x="128" y="582" font-size="22" fill="#57606a">Description, homepage, topics, and social card were tuned for launch discovery.</text>
  <rect x="128" y="620" width="1184" height="300" rx="18" fill="#111827" stroke="#d0d7de"/>
  <text x="594" y="786" font-size="32" fill="#f8fafc">social card preview</text>
</svg>'''
write('github-markdown.svg', markdown_svg)
