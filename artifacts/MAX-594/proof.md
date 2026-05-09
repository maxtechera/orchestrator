# MAX-594 YouTube Short Proof

Linear: https://linear.app/max-techera/issue/MAX-594/max-548-youtube-short

## Deliverables
- `artifacts/MAX-594/final.mp4`
- `artifacts/MAX-594/title.txt`
- `artifacts/MAX-594/description.txt`

## Source
- Package: `artifacts/MAX-548/package.json`
- Placement: `placements.youtube_short`
- Media source: `content/reels/MAX-548/videos/03-specific-number.mp4`

## Verification
- `final.mp4` exists and is non-empty.
- `title.txt` matches `placements.youtube_short.title`.
- `description.txt` matches `placements.youtube_short.description`.
- `ffprobe artifacts/MAX-594/final.mp4`: `duration=12.000000`, `size=127268`.
- SHA256:
  - `final.mp4`: `d8fa2b01a195d87f65bab322cde7d10a46481d77dd056b231a11ff57b44f8eac`
  - `title.txt`: `3ee36fe8a0bb6ff53ebd8e49f035858a8bfd88f83eba7e1bfb9510c551d6dfa9`
  - `description.txt`: `ea4d0276688ca2a58b809a3daf8961a614dfcf8a1a7a9789242f6f497eb71b88`
