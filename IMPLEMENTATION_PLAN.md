# Momentum Implementation Plan

**Document:** `IMPLEMENTATION_PLAN.md`  
**Product:** Momentum  
**Version:** v0.1 draft  
**Source of truth:** `docs/PRD.md` (Momentum PRD v0.1, 28 October 2026)  
**Status:** Draft for review. A user-authorised front-end prototype has been started. The unresolved clarification gates still block production backend integration and any claim of full PRD completion.

> This plan is derived from the available Momentum PRD. The Implementation Plan Guide, Instagram example, official implementation-plan template, and final exported Stitch designs were not available in the files supplied for this task. Therefore, this document follows a clear implementation-plan structure but cannot honestly claim exact compliance with the missing template or visual verification against final designs. No missing product decisions have been silently invented.

## 1. Product summary

Momentum is a responsive web app that helps people organise personal goals, turn goals into tasks, schedule work, track habits, review weekly progress, and optionally use AI to draft goal steps. Users must review and select AI suggestions before they become tasks.

### MVP scope

Implement the seven PRD features:

| Feature ID | Feature | Priority | Main screens |
|---|---|---|---|
| F1 | Account and profile | Must | S1, S2, S10, M1 |
| F2 | Goal and task management | Must | S3, S4, S5, M2 |
| F3 | Dashboard and calendar | Must | S3, S6 |
| F4 | Habit tracking and weekly review | Must | S3, S7, S9 |
| F5 | AI Growth Assistant | Must | S8, S5 |
| F6 | Goal workspace notes | Should | S5 |
| F7 | Progress summary | Should | S3, S9 |

### Explicitly deferred / out of scope

Do not implement native iOS/Android apps, brokerage connections, live market data, automated trading, financial advice, social feeds, public profiles, followers, sharing private goals, payments, subscriptions, ads, marketplace, wearable integrations, health platform integrations, external calendar sync, shared goals, accountability partners, advanced trading analytics, or push notifications. Do not add features just because a component or library makes them easy.

## 2. Source documents and traceability

- Product requirements: `docs/PRD.md`, sections 1–16.
- Screen inventory and specifications: PRD Sections 8.1–8.4.
- Shared visual components and design tokens: PRD Sections 8.3 and 9.
- Entities, relationships, stack, permissions and environment variables: PRD Sections 10–11.
- Quality, security and privacy: PRD Section 12.
- Stories and acceptance tests: PRD Section 6.
- Final Stitch exports: **not supplied / not verified**. Add their approved location before implementation and compare each implemented screen to its corresponding design.

All IDs must remain exactly as written in the PRD: F1–F7, US1–US9, S1–S10, M1–M2, BR1–BR12, and T-US1-1 through T-US9-2. Do not renumber them. Every implementation task and test should reference the relevant IDs.

## 3. Clarifications required before implementation

The PRD says no product-scope questions remain, but the following contradictions or missing implementation decisions are visible in the source material. The coding agent must not guess. Record approved answers in the PRD change log, update affected sections, then regenerate this plan if the answers change scope or behaviour.

| ID | Clarification | Why it blocks or affects implementation |
|---|---|---|
| C1 | **S1 consent copy:** Section 8.2 says the required checkbox is “I confirm that I am 18 years old or older.” Section 12.4 says it must say “I confirm that I am 18 years old or older and agree to the Momentum Privacy Notice.” Which exact copy is approved? | The UI and stored consent meaning must match. |
| C2 | **Privacy Notice destination/content:** S10 has a “Privacy notice” link, but the complete approved notice text and route are not supplied. | The link must not lead to a fabricated legal notice. Provide approved content or confirm a placeholder is acceptable for classroom-only use. |
| C3 | **AI provider configuration:** PRD names OpenAI API, but `AI_MODEL`, model availability, structured response format and provider retention configuration are not fixed. Confirm the selected model and structured output contract. | Prevents an agent from selecting an unapproved model or inventing output fields. |
| C4 | **Account deletion mechanics:** Confirm whether deletion should use Supabase Auth admin deletion from an Edge Function and which records/cascades must be removed. PRD says service-role key is only used “if required”. | A service-role key must not be exposed in the browser; deletion must reliably remove Auth and app data. |
| C5 | **Final designs:** Supply the final Stitch project URL or exported screens/style guide, or confirm that the approved PRD tokens/specifications alone are the implementation reference. | Required to validate visual fidelity; the prompt pack is not proof that final screens were generated. |
| C6 | **Official course template:** The exact `IMPLEMENTATION_PLAN_TEMPLATE.md` and Guide are missing from the accessible files. Supply them to verify section order, required wording and checklist. | This draft cannot be certified as matching the exact course template until reviewed against it. |

**Administrative details** (student number, course/cohort, facilitator and repository URL) belong in the submission metadata; they do not change application behaviour. Fill them in when known.

**Gate:** The user has authorised a front-end prototype before C1–C6 and final design exports are resolved. Keep implementation within prototype scope until the clarifications are answered or explicitly waived. Do not treat this as approval to ship production authentication, AI data processing, or account deletion workflows. Check the exact official course template when it becomes available.

## 4. Technical architecture

Use only the stack specified in PRD Section 11:

- Frontend: React 18, Vite 6, TypeScript 5, Tailwind CSS 3.
- Backend and database: Supabase PostgreSQL, Supabase Auth, Supabase Edge Functions.
- Hosting: Vercel.
- Package manager/runtime: npm and Node.js 20 LTS or supported current LTS.
- Tests: Vitest, React Testing Library, and manual browser tests.
- Version control: Git and GitHub.

### Application boundaries

1. React renders the responsive screens and handles client-side form validation and navigation.
2. Supabase Auth handles sign-up, email verification, login, password reset and sessions. Passwords are never stored in application tables.
3. PostgreSQL stores user profiles, goals, tasks, habits, habit completions and weekly reviews.
4. RLS and server-side checks enforce owner-only access for every user-owned record.
5. The AI Growth Assistant calls a Supabase Edge Function. The function validates the authenticated session and request, applies per-user rate limits, calls the configured AI provider using a server-side secret, validates the response, and returns draft suggestions. The browser never receives the provider secret.
6. No file storage or scheduled jobs are required in v1.

### Suggested folder structure from PRD 11.6

```text
src/
  app/
  components/
  features/
    auth/
    dashboard/
    goals/
    calendar/
    habits/
    ai-coach/
    reviews/
    settings/
  lib/
  types/
  tests/
supabase/
  migrations/
  functions/
    ai-plan/
    account-deletion/   # only after C4 confirms the workflow

docs/
  idea.md
  PRD.md
IMPLEMENTATION_PLAN.md
.env.example
```

The `account-deletion/` function name is a proposed organisation of the PRD's account-deletion workflow, not a new product feature. Adjust only if the confirmed implementation uses a different function boundary.

## 5. Setup and configuration

### Local setup commands

```bash
node --version
npm --version
npm create vite@latest momentum -- --template react-ts
cd momentum
npm install
npm install @supabase/supabase-js react-router-dom
npm install -D tailwindcss postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npx tailwindcss init -p
```

These commands establish the PRD stack. If the repository already exists, inspect it first and do not recreate or overwrite it. Add only the packages actually needed by the implementation. Use the Vite, Tailwind and Vitest configuration supported by the installed versions.

### Environment files

Create `.env.example` with placeholders only:

```dotenv
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Server-side Supabase Edge Function configuration only
SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
SUPABASE_SERVICE_ROLE_KEY=SET_ONLY_IF_APPROVED_AND_REQUIRED
OPENAI_API_KEY=YOUR_SERVER_SIDE_PROVIDER_KEY
AI_MODEL=APPROVED_MODEL_IDENTIFIER
```

- Never commit a real key, password, service-role key or provider secret.
- `VITE_` variables are public in the browser bundle. Only the Supabase URL and anon key belong there.
- `SUPABASE_SERVICE_ROLE_KEY` and `OPENAI_API_KEY` are secrets and may only be used server-side in Edge Function secrets/configuration.
- The service-role key is privileged. Do not use it for normal CRUD requests; use authenticated Supabase access plus RLS.
- Do not place secrets in screenshots, logs, documentation or Git history.

## 6. Database schema and migration plan

Create versioned SQL migrations under `supabase/migrations/`. Follow the entities and field definitions in PRD Section 10. Do not add product tables or fields without a PRD change.

### Tables

1. `user_profiles`: `id` (auth user ID, primary/unique), `display_name` (2–50), `email` (read-only in app, unique), `created_at`.
2. `goals`: `id`, `user_id`, `title` (3–80), `category` (Personal, Study, Fitness, Career, Business, Trading, Other), `description` (optional, max 500), `target_date` (optional), `status` (Active/Archived), `notes` (max 2,000), `created_at`.
3. `tasks`: `id`, `goal_id`, `user_id`, `title` (1–120), `due_date` (optional), `estimated_minutes` (optional, 5–480), `status` (Todo/Done), `created_at`.
4. `habits`: `id`, `user_id`, `title` (2–60), `weekdays` (one or more Monday–Sunday values), `status` (Active/Archived), `created_at`.
5. `habit_completions`: `id`, `habit_id`, `user_id`, `completion_date` (SAST local date), `created_at`; unique constraint on `(habit_id, completion_date)`.
6. `weekly_reviews`: `id`, `user_id`, `week_start` (Monday date), `went_well` (max 1,000), `difficulties` (max 1,000), `next_focus` (max 1,000), `created_at`; unique constraint on `(user_id, week_start)`.

### Relationships and deletion

- One user profile has many goals, habits and weekly reviews.
- One goal has many tasks; goal deletion cascades to tasks.
- One habit has many habit completions; habit deletion cascades to completions.
- Every linked `user_id` must match the authenticated owner and, for tasks, the owner of the referenced goal.
- Account deletion removes the Auth account and all user-owned application records. Implement the exact secure workflow only after C4 is answered.

### Migration order

1. Create profile table and auth-user profile provisioning mechanism, after confirming the approved Supabase approach.
2. Create goals and tasks with foreign keys, constraints and indexes.
3. Create habits and habit completions with the uniqueness constraint.
4. Create weekly reviews with the unique user/week constraint.
5. Enable RLS on every user-owned table.
6. Add policies for owner-only select/insert/update/delete.
7. Add database constraints or triggers for integrity rules that must not rely on the browser.
8. Add demo seed data from PRD Section 8.4, clearly labelled as demo data. Never seed a real user's personal content.

## 7. Security, RLS and permissions

Security is a release blocker, not a final polish task.

- Enable RLS on all user-owned tables before connecting production UI flows.
- Profile policies: authenticated user can access only the profile whose ID matches `auth.uid()`.
- Goal policies: authenticated user can CRUD only rows where `user_id = auth.uid()`.
- Task policies: authenticated user can CRUD only rows owned by them, and the referenced goal must belong to the same user.
- Habit and completion policies: owner-only; completion must reference a habit owned by the same user.
- Weekly review policies: owner-only; enforce one review per user/week in the database.
- Do not rely on hidden buttons or client-side route guards as authorisation.
- Cross-account access must return the PRD's safe message: “You can’t access that item.” Do not expose another user's data or confirm private record existence.
- Validate text and numeric limits on both client and server/database where possible.
- Render notes as text, never executable HTML.
- Do not send email or unrelated profile data to the AI provider. Send only the required goal prompt and available-time information.
- Apply AI limits from PRD 12.1: maximum 10 requests per user per hour and 30 per user per day; prompt maximum 500 characters; maximum 7 returned steps.
- Avoid logging full private AI prompts by default.

### Required access-control tests

Use two separate test accounts. Verify account A cannot read, update or delete account B's profile, goals, tasks, habits, completions or reviews, including by changing URL IDs or direct API requests. Verify a task cannot be attached to another user's goal. Verify an unauthenticated request cannot access protected records.

## 8. Design system and responsive behaviour

Implement exact design tokens from PRD Section 9:

| Token | Value |
|---|---|
| Primary | `#167D63` |
| Accent | `#B9F3D0` |
| Background | `#F5F7F6` |
| Surface | `#FFFFFF` |
| Main text | `#17211D` |
| Secondary text | `#53635B` |
| Border | `#D8E2DC` |
| Error | `#B42318` |
| Success | `#167D63` |
| Warning | `#9A6700` |
| Font | Inter, system sans-serif fallback |

- Text sizes: page title 28px/700; section 20px/650; card title 16px/600; body 16px/400; small 12px/400.
- Spacing: 8px unit; 8, 16, 24, 32, 40px; 4px only for tight icon/text gaps.
- Margins: 24px desktop, 16px mobile.
- Radius: cards 12px; inputs/buttons 8px; pills 999px.
- Card shadow: `0 2px 8px rgba(23,33,29,0.06)`.
- Buttons: 48px high; touch targets at least 44×44px.
- Icons: Lucide outline. No stock photos. No dark mode in v1.
- Desktop above 1,024px: left sidebar and content max-width 1,200px.
- Tablet 640–1,024px: collapsed sidebar.
- Mobile below 640px: top header and bottom navigation for Dashboard, Goals, Calendar, Habits and More.
- All controls have hover, keyboard focus, disabled and pressed states. Inputs have visible labels and accessible error text.
- Body text at least 16px, small text at least 12px, contrast at least 4.5:1, status never communicated by colour alone.
- Shared offline banner exact text: “You’re offline. Changes may not be saved.”
- Toasts disappear after 3 seconds and must not be the only indication of an error.

Compare S1–S10 and M1–M2 to the final Stitch exports when those are supplied. Until then, PRD Section 9 and Section 8.2 are the available design references.

## 9. Application routes and screen mapping

Use the route paths from PRD Section 8.1 where specified. `/signup` and `/login` are explicit. Other route paths are not explicitly fixed by the PRD; choose a consistent route convention during setup and record it in the PRD if the facilitator requires exact paths.

| ID | Screen | Feature | Access |
|---|---|---|---|
| S1 | Sign Up | F1 | Public |
| S2 | Log In | F1 | Public |
| S3 | Dashboard | F2, F3, F4, F7 | Verified authenticated user |
| S4 | Goals | F2 | Verified authenticated user |
| S5 | Goal Workspace | F2, F5, F6 | Verified authenticated user; owner only |
| S6 | Calendar | F3 | Verified authenticated user |
| S7 | Habits | F4 | Verified authenticated user |
| S8 | AI Growth Assistant | F5 | Verified authenticated user |
| S9 | Weekly Review | F4, F7 | Verified authenticated user |
| S10 | Settings and Profile | F1 | Verified authenticated user |
| M1 | Delete Account Confirmation | F1 | Opened from S10 |
| M2 | Delete Goal Confirmation | F2 | Opened from S5 |

Protected screens require a verified authenticated session. Unverified users receive the PRD verification message and resend-verification action only. Logout ends the session and returns to S2. Successful account deletion returns to S2. Successful goal deletion returns to S4.

## 10. Feature implementation phases

**Phase 0: Clarifications and project baseline**

Scope:
- Resolve C1–C6.
- Check this plan against the official Implementation Plan Template and Guide.
- Confirm repository state before changing files.
- Add the PRD and final design references to the repository in their agreed locations.

Definition of Done:
- [ ] C1–C6 have written answers or approved limitations.
- [ ] PRD change log updated for every approved product decision.
- [ ] Official template comparison completed and required headings/order corrected.
- [ ] Final Stitch references attached or explicitly waived.
- [ ] No unresolved product ambiguity remains that would require the coding agent to guess.

**Phase 1: Project foundation and shared UI**

Scope:
- Initialise or inspect React 18 + Vite 6 + TypeScript 5 project.
- Configure Tailwind CSS 3, routing, lint/test scripts if already part of repository conventions, Vitest and React Testing Library.
- Create the folder structure from Section 4.
- Add exact design tokens and shared components from PRD 8.3/9: header, primary/secondary/danger buttons, text fields, cards, toast, empty state, loading skeleton and offline banner.
- Implement responsive shell and navigation.
- Add `.env.example` with placeholders only and confirm secrets are excluded from Git.

Definition of Done:
- [ ] App starts locally using documented npm commands.
- [ ] TypeScript build passes.
- [ ] Vitest runs successfully.
- [ ] Shared components render and keyboard focus is visible.
- [ ] Desktop, tablet and 360px mobile layouts are checked.
- [ ] Token values match PRD Section 9 exactly.
- [ ] No real secret exists in source control.

**Phase 2: Supabase schema, migrations and access control**

Scope:
- Configure Supabase client using public Vite environment variables.
- Implement the six data tables and relationships in Section 6.
- Add constraints, indexes, foreign keys, uniqueness rules, and RLS policies.
- Add demo seed data from PRD 8.4.
- Add two test accounts for owner-isolation tests.

Definition of Done:
- [ ] Migrations apply cleanly to a fresh development database.
- [ ] All user-owned tables have RLS enabled.
- [ ] Owner CRUD policies work.
- [ ] Cross-user read/write/delete attempts are denied.
- [ ] Task-to-goal owner consistency is enforced.
- [ ] Habit completion and weekly review uniqueness constraints work.
- [ ] Demo data is clearly labelled and contains no real personal data.

**Phase 3: Account and profile (F1)**

Screens: S1, S2, S10, M1.

Scope:
- Sign-up with email/password, password confirmation, age checkbox and verification email.
- Verified-user login, unverified-user handling, forgot-password flow and non-enumerating reset response.
- Profile display-name editing, read-only email, logout and account deletion workflow.
- Protect all app routes and handle expired sessions.

Required traceability: F1, US1, S1, S2, S10, M1, BR10, T-US1-1, T-US1-2, T-US1-3, T-US1-4.

Definition of Done:
- [ ] Valid sign-up triggers verification and exact success copy.
- [ ] Invalid/missing fields are handled; non-password values remain after errors.
- [ ] Unverified account cannot enter protected screens.
- [ ] Verified user can log in; incorrect credentials show exact PRD message.
- [ ] Forgot-password response does not reveal account existence.
- [ ] Display name accepts only 2–50 characters.
- [ ] Logout ends session and returns to S2.
- [ ] M1 deletion removes account and owned data only after C4 is approved; returns to S2 with exact success message.
- [ ] All F1 tests pass.

**Phase 4: Goals and tasks (F2, F6)**

Screens: S4, S5, M2; dashboard goal links can use temporary route placeholders until Phase 5.

Scope:
- Active/Archived goal lists, search, sorting, create/edit/archive/restore/delete.
- Goal workspace with task create/edit/complete/uncomplete/delete, task sorting and notes.
- M2 confirmation and cascading deletion.
- Enforce active-goal limit and all field constraints on server/database as well as client.

Required traceability: F2, F6, US2, US3, US8, S4, S5, M2, BR1, BR2, BR3, BR10, BR11, BR12, T-US2-1, T-US2-2, T-US2-3, T-US3-1, T-US3-2, T-US3-3, T-US8-1, T-US8-2.

Definition of Done:
- [ ] User can create, view, edit, archive, restore and search own goals.
- [ ] Active goals sort by nearest target date; undated goals follow dated goals, newest first.
- [ ] Archived goals sort by most recently archived.
- [ ] BR1 limit and exact message are enforced even for concurrent create requests.
- [ ] Task validation and goal-owner relationship are enforced.
- [ ] Task order is incomplete first, then due date ascending, undated last.
- [ ] Progress calculation follows BR3, including 0% for no tasks.
- [ ] Notes respect the 2,000-character limit.
- [ ] M2 confirmation and cascade deletion match PRD.
- [ ] All F2/F6 tests pass.

**Phase 5: Dashboard and calendar (F3, F7)**

Screens: S3, S6.

Scope:
- Dashboard summary cards, time-based greeting/date, today's tasks (maximum five), goal progress, upcoming seven days and quick actions.
- Calendar Monday-first month view, previous/next/today controls, task due-date markers, habit completion markers and selected-date task list.
- Selecting a task opens its goal workspace.
- Use SAST/Africa-Johannesburg for displayed date calculations.

Required traceability: F3, F7, US4, S3, S6, BR3, BR5, BR10, T-US4-1, T-US4-2, T-US4-3, T-US9-1, T-US9-2.

Definition of Done:
- [ ] Dashboard counts reflect the current user's saved data.
- [ ] Dashboard task list shows no more than five tasks.
- [ ] Upcoming list covers the next seven days.
- [ ] Goal progress follows BR3.
- [ ] Calendar week starts Monday and opens on current month.
- [ ] Due dates render on the correct SAST date.
- [ ] Selecting a date filters the task list to that date.
- [ ] Empty date shows “Nothing planned for this day.”
- [ ] Month navigation does not modify stored task dates.
- [ ] All F3/F7 tests pass.

**Phase 6: Habit tracking and weekly review (F4, F7)**

Screens: S7, S9.

Scope:
- Create/edit/archive/restore habits, select weekdays, show current-week counts, record scheduled-day completions.
- Enforce one completion per habit per SAST local date using a database uniqueness constraint.
- Weekly review selector Monday–Sunday, summary counts, create/edit one review per user/week.
- Warn before switching week when unsaved edits exist, but use only warning copy approved through the PRD clarification process.

Required traceability: F4, F7, US5, US6, US9, S7, S9, BR4, BR9, BR10, T-US5-1, T-US5-2, T-US5-3, T-US6-1, T-US6-2, T-US6-3, T-US9-2.

Definition of Done:
- [ ] Habit title and weekday validation match BR4.
- [ ] Completion is available only on scheduled weekdays.
- [ ] Two tabs cannot create duplicate completion records.
- [ ] Completion date is correct for Africa/Johannesburg.
- [ ] Current-week completion counts are correct.
- [ ] Weekly review week is Monday–Sunday in SAST.
- [ ] One review per user/week; edits update the existing record.
- [ ] Each reflection field enforces 1,000 characters and displays a counter.
- [ ] Unsaved-edit week-switch warning uses approved wording.
- [ ] All F4/F7 tests pass.

**Phase 7: AI Growth Assistant (F5)**

Screen: S8; saved steps flow to S5.

Scope:
- Build authenticated Edge Function for AI plan generation.
- Validate prompt length and weekly minutes; apply rate limits; call approved AI model; validate structured output; return draft only.
- UI supports generation, loading, retry, selecting/removing draft steps and selecting an existing goal or confirming a new goal.
- Save only selected steps after explicit user action.
- Trading goals produce learning/journaling plans only, never trade recommendations or profit promises.

Required traceability: F5, US7, S8, S5, BR6, BR7, BR8, BR10, T-US7-1, T-US7-2, T-US7-3.

Definition of Done:
- [ ] Prompt is limited to 500 characters.
- [ ] Weekly minutes are 15–1,200.
- [ ] Provider response contains 3–7 valid steps; each title is at most 120 characters and estimated duration is 5–240 minutes.
- [ ] Invalid, empty, timed-out or malformed provider responses are rejected safely.
- [ ] Per-user rate limits are 10/hour and 30/day.
- [ ] Provider secret exists only in Edge Function secrets.
- [ ] AI requests include only required prompt and time information, not email or unrelated profile data.
- [ ] No task is created during generation or retry.
- [ ] Only selected steps are saved after the user confirms a destination goal.
- [ ] Error retains the prompt and shows the exact PRD message.
- [ ] Trading-goal restrictions in BR8 are followed.
- [ ] All F5 tests pass.

**Phase 8: Quality, accessibility, privacy and deployment**

Scope:
- Complete responsive checks across supported browsers and 360–1,440px widths.
- Verify keyboard-only flows, focus, labels, contrast and touch targets.
- Verify offline/read-only behaviour, preserved form values and no false success messages.
- Verify error messages, session expiry, data isolation, POPIA notice and provider/database region disclosure.
- Configure Vercel deployment and production environment variables.
- Run the full automated and manual test suite; prepare the five-minute demo.

Required traceability: all F1–F7, S1–S10, M1–M2, BR1–BR12, US1–US9, Section 12 quality/security/privacy requirements.

Definition of Done:
- [ ] Latest two stable Chrome and Edge, latest stable Firefox and Safari checked.
- [ ] Responsive widths from 360px to 1,440px checked.
- [ ] Dashboard content or loading placeholder appears within 3 seconds on stable 10 Mbps under PRD's stated data volume.
- [ ] Lists request no more than 50 records at a time.
- [ ] Offline banner exact copy appears; server-dependent actions do not claim success; form input is retained.
- [ ] Keyboard-only main flows pass.
- [ ] Text contrast is verified at 4.5:1 and targets are at least 44×44px.
- [ ] Cross-account and unauthenticated access tests pass.
- [ ] No secrets are present in browser bundles or Git history.
- [ ] Privacy Notice and processing-region/retention details are approved and accurately disclosed.
- [ ] Vercel production build and deployment succeed with environment variables configured securely.
- [ ] Full test suite passes; known failures are documented rather than hidden.
- [ ] Five-minute demo follows PRD 11.7.

## 11. Test-driven development workflow

Follow this cycle for every phase and feature:

1. Read the relevant PRD feature, user story, business rule, screen specification and edge cases.
2. Write or update failing tests first for the acceptance criteria and unhappy paths.
3. Run the focused tests and confirm they fail for the expected reason.
4. Implement the smallest change that makes the tests pass.
5. Run focused tests, then the full suite and TypeScript/build checks.
6. Manually test the relevant screen at desktop and mobile sizes, including keyboard and error states.
7. Compare the result to the approved Stitch design when available.
8. Update the Definition of Done only for checks actually run and passed.
9. Commit the completed phase with a clear message, e.g. `Phase 3 complete: account and profile`.
10. Stop and report results. Do not begin the next phase until the student has reviewed and approved the current phase.

### Test coverage map

| PRD test ID | Expected test focus | Phase |
|---|---|---|
| T-US1-1 | Valid sign-up, age consent and verification email | 3 |
| T-US1-2 | Unverified user blocked from dashboard | 3 |
| T-US1-3 | Verified user login opens S3 | 3 |
| T-US1-4 | Invalid credentials use generic exact message | 3 |
| T-US2-1 | Valid goal title saves | 4 |
| T-US2-2 | 20-active-goal limit and exact message | 4 |
| T-US2-3 | Goal title shorter than 3 rejected | 4 |
| T-US3-1 | Task title and ownership validation | 4 |
| T-US3-2 | Task completion updates status and totals | 4/5 |
| T-US3-3 | Cross-owner task/goal request rejected | 2/4 |
| T-US4-1 | Due date shown on correct SAST date | 5 |
| T-US4-2 | Selected date shows only its tasks | 5 |
| T-US4-3 | Empty date exact message | 5 |
| T-US5-1 | Scheduled habit completion saves for SAST date | 6 |
| T-US5-2 | Duplicate completion prevented | 2/6 |
| T-US5-3 | Unscheduled day has no normal completion action | 6 |
| T-US6-1 | Review fields up to 1,000 chars save | 6 |
| T-US6-2 | Existing week review updates same record | 6 |
| T-US6-3 | Over-limit review text blocked and counter shown | 6 |
| T-US7-1 | Valid AI request returns 3–7 draft steps | 7 |
| T-US7-2 | Only selected draft suggestions become tasks | 7 |
| T-US7-3 | AI failure retains prompt and exact error | 7 |
| T-US8-1 | Notes up to 2,000 chars save | 4 |
| T-US8-2 | Notes over 2,000 chars blocked and counter shown | 4 |
| T-US9-1 | Dashboard progress calculation follows BR3 | 5 |
| T-US9-2 | Weekly totals are current-user and selected-SAST-week only | 5/6 |

## 12. Global business-rule verification

| Rule | Required implementation check |
|---|---|
| BR1 | At most 20 active goals; title 3–80; archived excluded from count; enforce safely under concurrent requests. |
| BR2 | Task title 1–120; task belongs to one goal owned by same user; optional due date; past-date restriction follows PRD wording for new vs existing tasks. |
| BR3 | Progress is completed non-deleted tasks divided by all non-deleted tasks × 100, rounded to nearest whole number; zero tasks = 0%. |
| BR4 | Habit title 2–60; at least one weekday; one completion per habit per local date; Africa/Johannesburg timezone. |
| BR5 | Monday-first calendar; task due-date and habit-completion markers; selected date opens task list; current month default. |
| BR6 | AI prompt ≤500; weekly minutes 15–1,200; 3–7 steps; title ≤120; estimate 5–240 minutes. |
| BR7 | AI suggestions are drafts; save only after explicit selection and “Save selected steps”. |
| BR8 | No professional medical/legal/financial advice; trading plans limited to journaling and learning, no trade recommendations or profit promises. |
| BR9 | Weekly review Monday–Sunday SAST; one review per user/week; edits update same record. |
| BR10 | All reads/writes owner-restricted by server checks and RLS; other-user access does not reveal data. |
| BR11 | Archived goals hidden from Active by default, visible in Archived; archive preserves tasks/history. |
| BR12 | Goal deletion requires confirmation and permanently deletes tasks, notes and related completion records. |

## 13. Error handling and offline behaviour

Use exact messages from PRD Section 12.2 and relevant screen specs:

- Offline: “You’re offline. Changes may not be saved.” Preserve form values and disable server-dependent saves.
- Server error: “We couldn’t complete that action. Try again.” Keep screen and values; allow retry.
- Expired session: “Your session has expired. Log in again.” Route to S2 after message.
- Not allowed/not found: “You can’t access that item.” Do not reveal private record details.
- Field errors: show specific text such as “Enter at least 3 characters.” and retain other values.
- AI error: “We couldn’t create a plan right now. Try again or add tasks manually.” Retain prompt and do not auto-save.
- Goal limit: “You have reached the limit of 20 active goals. Archive one to add another.” Stay on S4.

Do not show a success toast until the server confirms the operation. A toast is supplementary; important errors must also be visible in the relevant form or screen.

## 14. Seed data and demo scenario

Use fictional PRD sample data only:

- Goals: “Learn React fundamentals” (Study, 30 Nov 2026); “Build a consistent gym routine” (Fitness, 31 Dec 2026); “Improve trading journal discipline” (Trading, 15 Dec 2026).
- Tasks: “Complete React hooks lesson”; “backtest one strategy for 30 minutes”; “complete Monday strength workout”.
- Habits: “Read for 20 minutes”; “review trading journal”; “train or walk”.
- Weekly review example: 8 tasks completed; 9 habit check-ins; next focus: plan the week on Sunday.

The demo walkthrough must follow PRD Section 11.7: sign in; create a goal and two tasks; schedule a task and open calendar; create and complete a habit; generate an AI plan and save selected steps; save weekly reflection; show dashboard progress.

## 15. Release and handover checklist

- [ ] All Must features F1–F5 implemented and tested.
- [ ] Should features F6–F7 implemented if included in the approved MVP schedule; otherwise record the approved deferral.
- [ ] Every applicable screen S1–S10 and modal M1–M2 implemented.
- [ ] Every BR1–BR12 has automated or documented manual verification.
- [ ] Every T-US acceptance test has a recorded result.
- [ ] RLS and cross-account tests pass.
- [ ] AI provider key and Supabase secrets are server-side only.
- [ ] `.env.example` contains placeholders only.
- [ ] Privacy Notice and POPIA processing details reviewed.
- [ ] Accessibility, browser and responsive checks completed.
- [ ] Production deployment works and demo URL is recorded.
- [ ] GitHub repository contains `docs/PRD.md`, `IMPLEMENTATION_PLAN.md`, migrations and source code; no secrets.
- [ ] Five-minute demo completed and evidence/screenshots saved.
- [ ] Classmate peer review and facilitator sign-off completed as required.

## 16. Deferred items and non-goals reminder

The coding agent must not implement the PRD's future features or non-goals in this MVP. Specifically: native mobile apps, broker integrations, live market data, automated trading, financial advice, social features, payments, subscriptions, ads, marketplace, wearables, health integrations, external calendar sync, shared goals, accountability partners, advanced trading analytics, push notifications, and scheduled jobs.

## 17. Change control

When a requirement changes:

1. Update the relevant section of `docs/PRD.md` first.
2. Add a Change log row with version, date, affected sections, summary and whether this plan/designs/tests were regenerated.
3. Update impacted IDs and acceptance tests without renumbering unrelated IDs.
4. Regenerate the affected part of this plan.
5. Do not implement a change that exists only in chat or a code comment.

## 18. Coding-agent operating prompt

Use the separate file `IMPLEMENTATION_PLAN_PROMPT.md` to instruct the coding assistant. The coding assistant must work one phase at a time, use test-driven development, report evidence, and stop for review after each phase. It must not claim tests pass unless it actually ran them.
