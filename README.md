# Momentum

Momentum is a personal growth workspace for turning meaningful goals into manageable daily actions.

## Current build status

This repository now contains an interactive front-end prototype for the dashboard, goals, calendar, habits, AI Growth Coach, weekly review, and personalisation settings.

The prototype stores demo data in the browser's `localStorage`. It does **not** yet have Supabase authentication, database persistence, server-side authorization, a connected AI provider, or production account deletion. The AI Coach currently returns a local planning draft and does not send user data to an external provider.

## Tech stack

- React 18 + Vite 6 + TypeScript 5
- Tailwind CSS 3 (design tokens) + custom responsive CSS
- React Router
- Supabase client dependency reserved for the backend phase
- Vitest + React Testing Library

## Run locally

Requirements: Node.js 20 LTS or later and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Checks

```bash
npm run build
npm test
```

## Environment variables

Copy `.env.example` to `.env.local` only when configuring local services. Never commit `.env`, `.env.local`, service-role keys, AI provider keys, or other secrets. Only `.env.example` belongs in Git.

## Project source of truth

- `IMPLEMENTATION_PLAN.md` is the development sequence and traceability guide.
- `docs/PRD.md` is the product requirements source.
- `docs/designs/` is reserved for approved exported Stitch screens.

Review the clarification register in `IMPLEMENTATION_PLAN.md` before treating this prototype as production-ready. In particular, resolve the consent copy, Privacy Notice, AI provider/structured output contract, account deletion workflow, and final design exports.
