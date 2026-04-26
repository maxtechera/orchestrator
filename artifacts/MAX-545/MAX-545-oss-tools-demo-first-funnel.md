# MAX-545, OSS tools demo-first funnel

Built for `maxtechera/orchestrator`.

## Strategy in one line
Show the tool working first, let GitHub earn trust, use email to turn installs into deeper intent, and sell the course as the "how this becomes your system" layer.

## Funnel spine
`short demo -> GitHub tools -> newsletter -> course -> cohort`

## Tool-by-tool content calendar

| Tool | 4 reels | 1 long-form video |
| --- | --- | --- |
| `/memory` | 1. "The agent forgot the customer again" 2. "One memory write fixed the next 10 prompts" 3. "Stop re-explaining context every session" 4. "The moment recall turns into leverage" | Build a memory layer that keeps customer, product, and workflow context available across sessions |
| `/ship` | 1. "Idea to shipped asset without tab chaos" 2. "What a real GTM run looks like" 3. "One command, content package out" 4. "From rough brief to launch-ready deliverables" | Run a real launch workflow end to end, from brief to content package to proof |
| `/orch` | 1. "The failure got caught before I did" 2. "Why one agent is not enough for real execution" 3. "Dispatch, verify, proof, done" 4. "The ops loop that prevents fake progress" | Coordinate specialist agents on one ticket, show verification, proof capture, and closeout |

## Hook library

### `/memory`
- Your agent is not broken, it is just stateless.
- I got tired of re-pasting the same context into every run.
- The unlock is not a better prompt, it is memory that survives the session.
- Watch what happens when the second run already knows the customer.

### `/ship`
- Most GTM workflows die between the brief and the assets.
- This is what it looks like when one command turns strategy into deliverables.
- Stop treating launch as a checklist, run it like a system.
- The point is not more content, it is shippable content with proof.

### `/orch`
- The real win is not delegation, it is catching bad work before it ships.
- One agent can write. Orchestrators can finish.
- If there is no proof, it is not done.
- Watch the system route, verify, and close the ticket without status theater.

## CTA copy

### Primary CTA
- **Action:** Explore the free tools
- **Reason for now:** Copy the foundation before the paid walkthrough fills in the system design
- **Destination:** `https://maxtechera.com/tools`

### Secondary CTAs
- Join the newsletter to get the breakdown behind each demo
- Watch the full walkthrough to see how the tools connect
- Apply to the cohort if you want your own stack built with feedback

## Offer ladder
1. **Free demo content** proves the tool works.
2. **GitHub tools page** converts curiosity into install intent.
3. **Newsletter** converts install intent into recurring attention.
4. **Course** sells the full architecture and implementation logic.
5. **Cohort** sells hands-on build support.

## `/ship` workflow wiring

```yaml
ship_content_playbook:
  awareness_input:
    source: demo-performance + repo click intent + newsletter replies
  package_outputs:
    - instagram_reel
    - instagram_carousel
    - tiktok
    - youtube_short
    - x_thread
    - linkedin_post
    - email
    - blog_post
    - landing_page
  required_fields:
    - hook_variants
    - CTA action
    - CTA reason_for_now
    - media path
    - proof screenshots
  routing_rules:
    - if asset is short-form demo, route to reel engine + captions
    - if asset is educational breakdown, route to blog + email variants
    - if asset is conversion asset, route to landing page package
  success_events:
    - github_tools_click
    - newsletter_signup
    - course_page_visit
    - cohort_apply_start
```

## What this changes in the business
- Free OSS tools stop acting like passive repos and start acting like a demo-driven acquisition loop.
- The course becomes the natural "show me the full stack" next step.
- The cohort becomes the premium "help me implement this" next step.

## Recommended publishing rhythm
- 3 short demos per week
- 1 long-form walkthrough per week
- 1 newsletter issue per tool proof or implementation lesson
- 1 monthly cohort-oriented synthesis piece
