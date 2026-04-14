# Example: Growth — Referral Campaign Launch

Domain skill: `growth`

---

## Inputs
- Product: Orchestrator (maxtechera/orchestrator)
- Referral mechanic: "refer a friend, both get 1 month free access to skill-content plugin"
- Existing user list: 847 subscribers in MailerLite (tag: `orchestrator-user`)
- Landing page CMS credentials in `~/.config/orchestrator/.env`
- GA4 property ID: in `~/.config/orchestrator/.env`

## Deliverables
- [ ] Referral landing page live at `/referral` (explains the mechanic, capture form)
- [ ] Unique tracked share URL per referrer (UTM: `utm_source=referral&utm_medium=email&utm_campaign=apr2026-referral`)
- [ ] GA4 conversion event created: `referral_signup`
- [ ] Announcement email to existing 847 subscribers (MailerLite)
- [ ] A/B test: subject line A "Get a free month for referring a friend" vs. B "Share this, both of you win"
- [ ] Control variant: 50/50 split, minimum 400 recipients per variant

## Verification
- Referral landing page returns HTTP 200
- UTM links resolve and fire `referral_signup` event in GA4 real-time
- GA4 real-time confirms `referral_signup` fires on test form submit
- A/B split confirmed in MailerLite (50/50, both variants live)
- Control variant has ≥400 recipients assigned
- Unique share URLs tracked per referrer (or per campaign minimum)
- All links in announcement email resolve

## Artifacts
- Referral landing page URL: [link]
- GA4 real-time screenshot (event firing): [attached]
- MailerLite campaign screenshot (A/B split visible): [attached]
- Share URL examples: [list]
