# Nexora AI — Landing Page PRD

## Original Problem Statement
High-converting landing page for an AI Automation & Product Development Company. Positioning: "A product-driven AI automation company that builds scalable solutions and also delivers custom software for businesses" — NOT a typical service agency. Build own AI products + help businesses automate.

User-specified palette: Deep Blue #0B3C5D, Soft Blue #328CC1, Teal #2EC4B6, BG #F7F9FB, Text #1F2937. Suggested fonts: Inter / Poppins.

10 required sections: Hero → Positioning → Problem → Services → Products → How It Works → Benefits → Case Study → CTA → Footer.

## Personas
- **Mid-market founder / COO** evaluating an AI automation partner
- **Head of Ops** drowning in manual workflows, looking for ERP + automation
- **CTO** vetting a partner capable of shipping production AI products

## Core Requirements (Static)
- Trust-first design with clear CTA above the fold
- Premium SaaS feel, card-based bento layout, asymmetric grids
- Working lead-capture form persisting to MongoDB
- Fully responsive
- data-testid on every interactive element

## What's Been Implemented (2026-04)
- **Backend** (`/app/backend/server.py`)
  - `POST /api/leads` (validates name/email/lead_type, saves to `leads` collection)
  - `GET /api/leads` (list, sorted desc, no _id leaked)
  - Retained `/api/status` endpoints
  - Pydantic models: `LeadCreate`, `Lead`
- **Frontend** (`/app/frontend/src/`)
  - `pages/Landing.jsx` composes all sections
  - `components/landing/`: Nav, Hero, Positioning, Problem, Services, Products, HowItWorks, Benefits, CaseStudy, CTASection, Footer
  - Cabinet Grotesk (Fontshare) display + Inter body
  - Custom CSS animations: beam pulse, dash flow, rise-in, gradient text
  - Shadcn Button/Input/Textarea + sonner toasts
- **Placeholders**: brand "Nexora.AI", products FlowMind / ClinicOS / InsightIQ, email hello@nexora.ai, LinkedIn placeholder

## Test Status
- Backend: 11/11 pytest cases passing
- Frontend: 100% core flows (render, nav, scroll, form submit success + validation, mobile)

## Prioritized Backlog
- **P1** Rate-limit `POST /api/leads` (spam protection) + optional hCaptcha
- **P1** Admin auth + dashboard to view captured leads
- **P2** Email notification on new lead (Resend / SendGrid)
- **P2** Swap placeholder brand assets with real logo + copy + real LinkedIn/email
- **P2** Replace Calendly placeholder — embed a real Cal.com/Calendly iframe for "Book a Call"
- **P2** Add `/thank-you` route and analytics conversion events
- **P3** Case study detail pages (clickable "Learn more")
- **P3** Pricing / packages section (optional)
- **P3** Blog / insights section for SEO

## Next Tasks
1. Collect real brand name + copy + assets from owner
2. Add lead-spam protection (rate limit + basic honeypot)
3. Wire email notifications to the team inbox
