# Atlas ABM — Men's Health Clinic Intelligence UI

Atlas ABM is a frontend prototype for account-based marketing teams targeting men's health clinics in affluent U.S. cities.

## What improved in this version

- Refined the interface into an operator-ready two-pane layout (scan controls + intelligence board).
- Expanded scoring transparency with score-factor breakdown per clinic.
- Added confidence gating so teams can filter for data quality, not just score.
- Kept decision-maker intelligence in-view with direct contact actions (Email/Call/LinkedIn).
- Improved ad verification presentation with explicit ad-evidence badges.
- Preserved CSV export with richer columns for sales/ops handoff.

## Included intelligence fields

- Clinic name, address, phone
- Ad evidence (Google / Meta / other signal labels)
- Decision makers (owner/director/manager style personas)
- Best contact strategy
- Score breakdown and lead score
- Record-level data confidence

## Run locally

```bash
python3 -m http.server 4173
```

Open: <http://localhost:4173>

## Productionization blueprint

Connect this UI to real providers/services:

1. Local business + clinic directory APIs for clinic discovery.
2. Google Ads transparency and Meta Ad Library verification services.
3. Contact enrichment for owner/director/manager identities and validated channels.
4. CRM and sequencing tools for prioritized outreach.
