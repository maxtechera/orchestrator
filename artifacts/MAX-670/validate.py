#!/usr/bin/env python3
from pathlib import Path
import re, sys
post = Path(__file__).with_name('post.md').read_text(encoding='utf-8')
body = post.split('---', 2)[-1].strip() if post.startswith('---') else post.strip()
hashtags = re.findall(r'(?<!\w)#[A-Za-z0-9_]+', body)
checks = [
    ('body <= 3000 chars', len(body) <= 3000, len(body)),
    ('hashtags <= 3', len(hashtags) <= 3, hashtags),
    ('CTA present', 'Comment "orchestrator"' in body, None),
    ('no http(s) link in body', not re.search(r'https?://', body), None),
    ('short paragraph structure preserved', max(len(p) for p in body.split('\n\n')) < 320, None),
]
failed = False
for label, ok, detail in checks:
    print(f"{'PASS' if ok else 'FAIL'} {label}" + (f" ({detail})" if detail is not None else ''))
    failed |= not ok
sys.exit(1 if failed else 0)
