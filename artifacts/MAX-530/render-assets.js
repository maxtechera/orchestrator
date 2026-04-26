const { execSync } = require('child_process');
const path = require('path');

const outDir = __dirname;
const env = { ...process.env, OMP_NUM_THREADS: '1', MAGICK_THREAD_LIMIT: '1' };
const FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';
const BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';

function run(command) {
  execSync(command, { stdio: 'inherit', env });
}

run(`convert -size 1440x1800 xc:'#07101b' \
  -fill '#0f172a' -draw 'roundrectangle 42,42 1398,1758 28,28' \
  -fill '#67e8f9' -font ${BOLD} -pointsize 28 -annotate +90+104 'MAX-530 INCIDENT-LED LAUNCH CONTENT' \
  -fill white -font ${BOLD} -pointsize 58 -annotate +90+180 'We broke prod, then wrote the 5 rules every AI team should have.' \
  -fill '#cbd5e1' -font ${FONT} -pointsize 30 -annotate +90+300 'Instagram Reel + X Thread + NODO CTA' \
  -fill '#e5eefc' -font ${FONT} -pointsize 34 -annotate +90+430 '1  No direct prod writes' \
  -annotate +90+500 '2  Human approval for risky actions' \
  -annotate +90+570 '3  Proof before status changes' \
  -annotate +90+640 '4  Rollback paths before confidence' \
  -annotate +90+710 '5  Short feedback loops over blind autonomy' \
  -fill '#67e8f9' -annotate +90+860 'CTA  Subscribe to NODO' \
  -fill '#cbd5e1' -pointsize 30 -annotate +90+920 'Secondary CTA  Reply RULES for the checklist' \
  -fill '#94a3b8' -pointsize 26 -annotate +90+1060 'Visual proof frame generated from package data' \
  ${path.join(outDir, 'rendered_html_preview_screenshot.png')}`);

run(`convert -size 1440x1400 xc:'#08111f' \
  -fill '#0f172a' -draw 'roundrectangle 42,42 1398,1358 28,28' \
  -fill '#67e8f9' -font ${BOLD} -pointsize 28 -annotate +90+104 'MAX-530 PROOF PACK' \
  -fill white -font ${BOLD} -pointsize 52 -annotate +90+180 'Rendered markdown proof' \
  -fill '#dbeafe' -font ${FONT} -pointsize 30 -annotate +90+300 'Ticket intent: incident-led launch content after breaking prod' \
  -annotate +90+360 'Assets: source markdown, package.json, preview HTML, proof HTML, screenshots, mp4' \
  -fill '#67e8f9' -annotate +90+420 'CTA: Subscribe to NODO  |  Reply RULES' \
  -fill '#dbeafe' -annotate +90+480 'Reel angle: turn a painful incident into operating rules' \
  -fill '#94a3b8' -pointsize 28 -annotate +90+620 'This image stands in for the rendered markdown view for Linear proof.' \
  ${path.join(outDir, 'rendered_html_screenshot.png')}`);

const slides = [
  ['slide-01.png', 'We broke prod', 'The useful output was not the incident. It was the operating rules we wrote after it.'],
  ['slide-02.png', 'Rule 1 and 2', 'No direct prod writes. Human approval for risky actions.'],
  ['slide-03.png', 'Rule 3 and 4', 'Proof before status changes. Rollback paths before confidence.'],
  ['slide-04.png', 'Rule 5', 'Short feedback loops beat blind autonomy every time.'],
  ['slide-05.png', 'Subscribe to NODO', 'Weekly operator workflows, proof-first systems, and launch mechanics from real incidents.']
];

for (const [file, title, body] of slides) {
  const lines = body.match(/.{1,34}(\s|$)/g).map(s => s.trim()).filter(Boolean);
  let cmd = `convert -size 1080x1920 xc:'#07101b' -fill '#0f172a' -draw 'roundrectangle 54,54 1026,1866 28,28' -fill '#7f1d1d' -draw 'rectangle 54,54 1026,224' -fill '#67e8f9' -font ${FONT} -pointsize 26 -annotate +84+120 'MAX-530  incident-led launch content' -fill white -font ${BOLD} -pointsize 60 -annotate +84+240 '${title}' -fill '#dbeafe' -font ${FONT} -pointsize 34`;
  let y = 430;
  for (const line of lines) {
    cmd += ` -annotate +84+${y} '${line.replace(/'/g, "\\'")}'`;
    y += 60;
  }
  cmd += ` ${path.join(outDir, file)}`;
  run(cmd);
}

run(`ffmpeg -y -threads 1 -framerate 1 -i ${path.join(outDir, 'slide-%02d.png')} -vf "scale=1080:1920,format=yuv420p" -r 30 -c:v mpeg4 -q:v 5 ${path.join(outDir, 'final_mp4_attachment.mp4')}`);
run(`cp ${path.join(outDir, 'slide-01.png')} ${path.join(outDir, 'reel-cover.png')}`);
