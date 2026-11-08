
# Document details
| Field | Answer |
|---|---|
| Product name | Momentum |
| Author(s) | Qiyaam Moodley. Student number not provided; add before final submission. |
| Course code and cohort | Not provided; add the correct Melsoft course code and cohort. |
| Facilitator / reviewer | Not provided; add facilitator name. |
| Link to original app idea | `docs/idea.md` (save the previously submitted concept document here). |
| GitHub repository | Not created yet; add repository URL after creating it. Save this document as `docs/PRD.md`. |
| Version | v0.1 |
| Status | In review draft, pending administrative details and facilitator feedback. |

This is a full working draft. Do not mark it Approved until the missing administrative details are completed and the facilitator has reviewed it.

# Change log
| Version | Date | Section(s) changed | What changed | Regenerated? |
|---|---|---|---|---|
| v0.1 | 28 Oct 2026 | All | First full PRD draft based on the Momentum App Concept Document. | None |

# 1. Product overview
## 1.1 Product name
Momentum

## 1.2 One-line pitch
Momentum helps goal-driven people organise daily actions so that they can make steady progress towards personal goals.

## 1.3 Problem statement
People often manage goals, habits, schedules, and progress notes in separate places, making it difficult to see how daily actions connect to long-term aims. A user may have 3 or more active goals but no single view of tasks, deadlines, and consistency. Generic to-do lists track tasks but do not always give each goal its own context or help users reflect on progress. Momentum addresses this gap with one dashboard that links goals, calendar activities, habits, and optional AI planning support.

## 1.4 Solution
Users create goals, break them into tasks, and schedule tasks on a calendar. The dashboard shows today's tasks, upcoming deadlines, habit completion, and progress for each active goal. Users record habit completions and write weekly reflections. The AI Growth Assistant turns a goal and available time into a suggested plan, but the user must review and approve suggestions before they are saved.

## 1.5 Platform
Responsive web app that works in a browser. Design and build desktop web first, then support mobile browsers.

## 1.6 Vision
Within two years, Momentum could become a personal operating space where users plan and review goals across learning, fitness, career, business, and hobbies without needing separate goal trackers.

## 1.7 Key terms
| Term | Exact meaning in this app |
|---|---|
| Goal | A longer-term outcome a user wants to achieve. |
| Task | One actionable step linked to a goal, with an optional due date. |
| Habit | A repeated action the user plans to complete daily or on selected weekdays. |
| Completion | A record that a task or habit was completed on a specific date. |
| Workspace | The detail area for one goal, showing its tasks, notes, and progress. |
| AI plan | A draft list of suggested steps produced by the AI Growth Assistant. |
| Weekly review | A user's summary of progress, challenges, and next actions for one week. |

# 2. Users, personas and roles
## 2.1 Primary user
People aged 18–35 in South Africa who want to organise personal or professional goals. They may be students, early-career workers, traders, fitness enthusiasts, or people learning new skills. Tech comfort ranges from low to high. They may use a laptop or phone browser and may rely on prepaid mobile data.

## 2.2 Secondary users
No secondary user role in v1. Each account is private to its owner. Project administration is handled through the Supabase dashboard, not app screens.

## 2.3 Personas
| Field | Persona 1 | Persona 2 |
|---|---|---|
| Name and age | Lerato Mokoena, 21 | Aiden Naidoo, 28 |
| Role | User | User |
| Occupation / situation | Student balancing coursework, exercise, and learning web development | Junior professional learning trading and improving fitness |
| Device and connectivity | Android phone, prepaid mobile data, occasional laptop | Laptop with home Wi-Fi and Android phone |
| Tech comfort | Medium | High |
| Language(s) | English, isiZulu | English |
| Goal | Keep study and personal goals organised during the week | Follow a consistent routine and review trading practice |
| Frustrations today | Tasks are scattered across notes, calendar, and reminders | Starts several plans but forgets to review progress |
| How the app helps | One dashboard links tasks, deadlines, habits, and goal progress | Goal workspaces and weekly reviews help organise routines and reflect |
| Quote | “I want to know what I should focus on today.” | “I want my plan and progress in one place.” |

## 2.4 Roles and permissions
| Role | How someone gets this role | Can do | Cannot do |
|---|---|---|---|
| User | Creates an account and verifies email | Manage own goals, tasks, habits, completions, AI requests, weekly reviews, and profile | Read or change another user's records; view server secrets; change AI provider settings |
| Project maintainer | Developer with access to Supabase dashboard; not a public app role | Maintain project configuration and review technical errors | Access user content unless authorised and necessary for support |

Owner permissions are enforced by Supabase Row-Level Security (RLS) and server-side checks, not only by hiding buttons.

## 2.5 Admin
There are no admin screens in v1; project maintenance is done through the Supabase dashboard.

# 3. Goals, success metrics and non-goals
## 3.1 Goals
| ID | Goal | Metric | Target | How to check |
|---|---|---|---|---|
| G1 | Help users organise goals | Test users who create one goal and one task in a 10-minute test | At least 8 of 10 | Observe test and count saved Goal/Task records |
| G2 | Support consistent planning | Test users who schedule at least 3 tasks in first session | At least 7 of 10 | Count dated Task records during test |
| G3 | Make reflection useful | Test users who save a weekly review after recording activity | At least 6 of 10 | Count Weekly Review records |
| G4 | Make AI planning understandable | Test users who generate, review, and save or reject an AI plan without help | At least 8 of 10 | Observe AI Coach test |

## 3.2 Non-goals
- No native iOS or Android app in v1; responsive web is sufficient.
- No brokerage connection, live market data, automated trading, or financial advice. Trading is one possible goal type.
- No social feed, public profiles, followers, or sharing private goals.
- No payments, subscriptions, ads, or marketplace.
- No wearable, health platform, or external calendar integration.
- AI never changes a user's plan automatically; users review and explicitly save suggestions.

# 4. Features, business rules and notifications
## 4.1 Feature list
| ID | Feature | User actions | Priority | Goal | Stories | Screens |
|---|---|---|---|---|---|---|
| F1 | Account and profile | Sign up, verify email, log in, reset password, log out, edit display name, delete account | Must | G1 | US1 | S1, S2, S10, M1 |
| F2 | Goal and task management | Create, view, edit, archive, delete goals; add/edit/complete/delete tasks | Must | G1, G2 | US2, US3 | S3, S4, S5, M2 |
| F3 | Dashboard and calendar | View today's tasks and deadlines; browse month; open date task list | Must | G2 | US4 | S3, S6 |
| F4 | Habit tracking and weekly review | Create habits, choose weekdays, record completion, save weekly reflection | Must | G3 | US5, US6 | S3, S7, S9 |
| F5 | AI Growth Assistant | Enter goal and available time, generate draft, review, retry, save selected steps | Must | G4 | US7 | S8, S5 |
| F6 | Goal workspace notes | Add/edit goal notes and choose category | Should | G1 | US8 | S5 |
| F7 | Progress summary | View goal completion percentage and weekly totals | Should | G3 | US9 | S3, S9 |

## 4.2 MVP definition
The MVP lets a user sign in, manage goals and tasks, plan tasks on a calendar, track habits, review weekly progress, and use AI to draft goal steps that the user chooses to save.

## 4.3 Future features
- Native mobile apps and push notifications.
- Google or Outlook calendar synchronisation.
- Shared goals and accountability partners.
- Advanced trading journal analytics or trading platform integrations.
- Subscription tiers and premium AI usage.

## 4.4 Business rules
| ID | Exact rule | Used by |
|---|---|---|
| BR1 | A user may have at most 20 active goals. Archived goals do not count. Goal title is 3–80 characters. | F2, S4, S5 |
| BR2 | Task title is 1–120 characters. A task belongs to one goal owned by the same user. Due date is optional; when set, it cannot be earlier than task creation date unless editing an existing task. | F2, S5, S6 |
| BR3 | Goal progress = completed non-deleted tasks ÷ all non-deleted tasks × 100, rounded to nearest whole number. A goal with zero tasks shows 0%. | F2, F7, S3, S5 |
| BR4 | Habit title is 2–60 characters. User selects one or more weekdays. Only one completion per habit per local date. Timezone is Africa/Johannesburg (SAST, UTC+2). | F4, S7 |
| BR5 | Calendar week starts Monday. Month view shows task due dates and habit completion markers. Selecting a date opens its task list. Current month opens by default. | F3, S6 |
| BR6 | AI prompt is up to 500 characters; available time is 15–1,200 minutes per week. AI returns 3–7 steps, each title up to 120 characters and estimated duration 5–240 minutes. | F5, S8 |
| BR7 | AI suggestions are drafts. No task is created until user selects “Save selected steps”. User can remove suggestions first. | F5, S8, S5 |
| BR8 | AI does not provide professional medical, legal, or financial advice. For trading goals it can help with journaling and learning plans, but not recommend a specific trade or promise profit. | F5, S8 |
| BR9 | Weekly review covers Monday–Sunday in SAST. One review per user per week; editing updates the existing record. | F4, F7, S9 |
| BR10 | All reads and writes are restricted to authenticated user_id using server checks and database RLS. Access to another user's record returns not-found/not-allowed without exposing data. | F1–F7 |
| BR11 | Archived goals are hidden from Active by default but visible in Archived. Archiving does not delete tasks or history. | F2, S4, S5 |
| BR12 | Goal deletion requires confirmation and permanently deletes its tasks, notes, and related completion records. | F2, S5, M2 |

## 4.5 Notifications
No push, SMS, or product email notifications in v1. Dashboard shows due and overdue tasks in-app. Authentication verification and password-reset emails are sent by Supabase Auth.

# 5. Accounts and sign-in
| Decision | Answer |
|---|---|
| Sign-up methods | Email and password via Supabase Auth |
| Who may sign up | Anyone aged 18+ with an email address |
| Minimum age | 18. Required unticked checkbox: “I confirm that I am 18 years old or older.” |
| Verification | Required before dashboard access. Unverified users see verification instructions and resend action only. |
| Password rules | 10–72 characters; confirm password at sign-up; show/hide toggle. Supabase Auth handles passwords. |
| Log in | Email and password; Forgot password link |
| Forgot password | Send reset link; response does not reveal whether an account exists |
| Log out | Available in Settings; ends session and returns to S2 |
| Delete account | Settings → M1 confirmation. Deletes account and user-owned records; irreversible. |

# 6. User stories, acceptance criteria and edge cases
## 6.1 Stories
**US1 – Account.** As a new user, I want to create and access my account so that my goals stay private.  
- **T-US1-1:** Given valid details and age confirmation, when I sign up, then a verification email is sent and the app shows the verify-email message.
- **T-US1-2:** Given an unverified account, when I open the dashboard, then I am redirected to S2 with a verification message.
- **T-US1-3:** Given a verified account and correct credentials, when I log in, then S3 opens.
- **T-US1-4:** Given an incorrect password, then the app says “Email or password is incorrect.” without revealing account existence.

**US2 – Goals.** As a user, I want to create and organise goals so that ambitions have a clear place.  
- **T-US2-1:** With fewer than 20 active goals, a 3–80 character title saves and appears in S4.
- **T-US2-2:** At 20 active goals, creating another is blocked with “You have reached the limit of 20 active goals. Archive one to add another.”
- **T-US2-3:** A title shorter than 3 characters is blocked with “Enter at least 3 characters.”

**US3 – Tasks.** As a user, I want to create tasks under a goal so that I can turn a goal into actions.  
- **T-US3-1:** A task title of 1–120 characters saves under a goal the user owns.
- **T-US3-2:** Marking a task complete updates its status and dashboard totals.
- **T-US3-3:** Adding a task to a goal owned by someone else is rejected by the server and creates no record.

**US4 – Calendar.** As a user, I want to schedule and view tasks so that I can plan my week.  
- **T-US4-1:** A task due date appears on the correct SAST date in S6.
- **T-US4-2:** Selecting a date shows only tasks due on that date.
- **T-US4-3:** A date with no tasks shows “Nothing planned for this day.”

**US5 – Habits.** As a user, I want to record habits so that I can see my consistency.  
- **T-US5-1:** Completing a scheduled habit saves one record for today's SAST date.
- **T-US5-2:** Tapping complete twice does not create a duplicate record.
- **T-US5-3:** A habit not scheduled for today does not offer the normal completion action.

**US6 – Weekly review.** As a user, I want to write a weekly review so that I can learn from progress.  
- **T-US6-1:** A review with up to 1,000 characters per field saves.
- **T-US6-2:** Saving edits for an existing week updates the existing review.
- **T-US6-3:** Text over 1,000 characters is blocked and a character count is shown.

**US7 – AI plan.** As a user, I want AI to suggest steps so that I can start with a practical plan.  
- **T-US7-1:** A valid prompt and weekly minutes produce 3–7 draft steps.
- **T-US7-2:** After removing one suggestion and saving, only selected suggestions become tasks.
- **T-US7-3:** If AI fails or times out, show “We couldn’t create a plan right now. Try again or add tasks manually.” and retain the input.

**US8 – Goal notes.** As a user, I want notes on a goal so that I can keep context with it.  
- **T-US8-1:** Notes up to 2,000 characters save on the goal.
- **T-US8-2:** Notes over 2,000 characters are blocked and remaining character count is shown.

**US9 – Progress.** As a user, I want a progress summary so that I can review activity without counting manually.  
- **T-US9-1:** Dashboard progress follows BR3.
- **T-US9-2:** Weekly totals include only the current user's records and the selected SAST week.

## 6.2 Edge cases
- Connection drops while saving: retain form values, show offline message, and do not claim success.
- A goal is archived in another tab: refresh or show “This goal is no longer active.”
- AI returns fewer than 3 or more than 7 suggestions: reject response and do not save malformed tasks.
- AI returns invalid structured data: show retry message and retain prompt.
- User changes week with unsaved review edits: warn before switching.
- Two tabs attempt the same habit completion: database uniqueness prevents duplicates.
- User edits URL to access another user's goal: RLS denies access and returns no private fields.
- User deletes a goal with tasks: M2 explains linked data will also be deleted.
- User has no goals or habits: show empty states with clear create actions.
- Session expires during save: show “Your session has expired. Log in again.”

# 7. User flows and navigation map
## 7.1 Flows
**Flow A – Goal management (F2):** S2 → S3 → S4 → S5. Delete path: S5 → M2 → S4. If the 20-goal limit is reached, remain on S4 and show the BR1 message. Invalid form values remain on S5 with field errors.

**Flow B – Weekly planning (F3):** S3 → S6 → select date → view that date's tasks → open task in S5. If no tasks exist, S6 shows “Nothing planned for this day.” Offline mode is read-only.

**Flow C – AI planning (F5):** S3 → S8 → enter goal and weekly minutes → Generate plan → review suggestions → remove unwanted suggestions → select destination goal → Save selected steps → S5. On AI failure, show the exact US7 error and allow retry.

**Flow D – Habits and review (F4):** S3 → S7 → mark scheduled habits complete → S9 → write and save review. If a review already exists for the week, load it for editing.

## 7.2 Navigation map
```text
S1 Sign Up ↔ S2 Log In → S3 Dashboard
S2 → S10 Settings and Profile
S3 → S4 Goals → S5 Goal Workspace
S3 → S6 Calendar → S5 Goal Workspace
S3 → S7 Habits
S3 → S8 AI Growth Assistant → S5 after saving selected steps
S3 → S9 Weekly Review
S10 → M1 Delete Account Confirmation → S2 after deletion
S5 → M2 Delete Goal Confirmation → S4 after deletion
All protected screens require a verified authenticated session.
```

# 8. Screens
## 8.1 Screen inventory
| ID | Screen | Purpose | Entry | Main actions |
|---|---|---|---|---|
| S1 | Sign Up | Create account | `/signup` | Enter email/password, age confirmation, create |
| S2 | Log In | Access account | `/login` | Log in, forgot password, resend verification |
| S3 | Dashboard | Today's priorities and progress | After login | Open goals, calendar, habits, AI, review |
| S4 | Goals | List/filter goals | S3 or after deletion | Create, search, filter, open |
| S5 | Goal Workspace | Goal details, tasks, notes, progress | S4, S6, S8 | Edit goal, manage tasks, archive/delete |
| S6 | Calendar | Month/date task view | S3 | Change month, select date, open task |
| S7 | Habits | Habit schedule and completions | S3 | Create/edit/archive habit, complete |
| S8 | AI Growth Assistant | Draft goal steps | S3 | Prompt, time, generate, retry, select, save |
| S9 | Weekly Review | Weekly totals and reflection | S3 | Select week, reflect, save |
| S10 | Settings and Profile | Profile and account actions | Dashboard menu | Edit name, privacy notice, logout, delete |
| M1 | Delete Account Confirmation | Confirm account deletion | S10 | Confirm or cancel |
| M2 | Delete Goal Confirmation | Confirm goal deletion | S5 | Confirm or cancel |

## 8.2 Screen specifications
**S1 Sign Up:** Momentum logo; heading “Create your account”; helper “Build a plan for what matters to you.”; Email; Password with show/hide; Confirm password; unticked checkbox “I confirm that I am 18 years old or older.”; primary “Create account”; link “Already have an account? Log in”. Email required; password 10–72 characters; confirmation matches; age checkbox required. Loading button says “Creating account…”. Success says “Check your email to verify your account.” Error retains non-password values. Offline shows offline banner and disables submit.

**S2 Log In:** Logo; “Welcome back”; Email; Password with show/hide; “Forgot password?”; “Log in”; link to S1. Loading says “Signing in…”. Invalid credentials: “Email or password is incorrect.” Unverified account: “Please verify your email before continuing.” Forgot password response: “If an account matches that email, a reset link will be sent.”

**S3 Dashboard:** Header and profile menu; time-based greeting; date; cards “Active goals”, “Tasks due today”, “Habits completed”; “Today’s tasks” with title, goal, due date and completion control; “Goal progress” with percentage; “Upcoming” list for next 7 days; shortcuts “Add goal”, “Open calendar”, “Ask AI”. Show at most 5 tasks per dashboard list. Sample counts: 3 active goals, 2 tasks due today, 1 of 3 habits completed. Empty text: “Start with one goal. You can add smaller steps as you go.” Loading uses skeletons; error: “We couldn’t load your dashboard. Try again.”

**S4 Goals:** Header; “Your goals”; tabs Active/Archived; search placeholder “Search goals”; “Create goal”; cards show title, category, target date, progress, task count, status. Active goals sort by target date nearest first; undated goals after dated goals, newest first. Archived goals sort by most recently archived. Empty text: “No goals yet. Add one thing you want to work towards.” Search empty text: “No goals match your search.”

**S5 Goal Workspace:** Breadcrumb Goals; title; category; target date; progress; Edit, Archive, Delete; notes; task list (incomplete first, then due date ascending, undated last); Add task. Goal fields: title 3–80 characters, category Personal/Study/Fitness/Career/Business/Trading/Other, optional target date, description max 500, notes max 2,000. Task fields: title 1–120, optional due date, estimated minutes 5–480. Empty tasks: “No steps yet. Add the first action for this goal.” Error: “We couldn’t save that change. Try again.” Delete opens M2.

**S6 Calendar:** Header; “Calendar”; month label; Previous month, Next month, Today; Monday-first grid; task markers and habit-completion markers; selected-date panel. Selecting a task opens S5. Empty date: “Nothing planned for this day.” Error: “We couldn’t load your calendar. Try again.” Month navigation never changes stored dates.

**S7 Habits:** Header; “Habits”; “Add habit”; today's date; rows show title, scheduled weekdays, completion control and current-week count; Active/Archived filter. Habit fields: title 2–60 characters, one or more weekdays, optional start date. Empty text: “Choose one small action to repeat.” Only scheduled weekdays can be completed.

**S8 AI Growth Assistant:** Header; “AI Growth Assistant”; note “AI suggestions are a starting point. Review each step before saving.”; prompt field max 500; numeric field “Minutes available per week” 15–1,200; “Generate plan”; draft steps with title, estimated minutes, checkbox and remove; “Try again”; “Save selected steps”. Loading: “Building your draft plan…”. Error: “We couldn’t create a plan right now. Try again or add tasks manually.” Keep prompt. If nothing selected, disable save and show “Select at least one step to save.” User chooses an existing goal or confirms a new goal before tasks are saved.

**S9 Weekly Review:** Header; “Weekly review”; week selector Monday–Sunday; counts for tasks completed, habits completed, active goals; fields “What went well?”, “What was difficult?”, “What will I focus on next week?” each max 1,000 characters; “Save review”. One review per week. Success toast: “Weekly review saved.”

**S10 Settings and Profile:** Header; “Settings and profile”; display name 2–50; read-only email; “Privacy notice”; “Save profile”; “Log out”; “Delete account”. Success toast: “Profile updated.” Invalid name: “Enter a display name between 2 and 50 characters.” Deletion opens M1.

**M1 Delete Account Confirmation:** Heading “Delete your account?”; text “This permanently deletes your goals, tasks, habits, completions, notes, and weekly reviews. This cannot be undone.”; “Delete account”; “Cancel”. Loading: “Deleting account…”. Success ends session and returns to S2 with “Your account has been deleted.” Failure: “We couldn’t delete your account. Try again.”

**M2 Delete Goal Confirmation:** Heading “Delete this goal?”; text “This also permanently deletes the goal’s tasks, notes, and completion history.”; “Delete goal”; “Cancel”. Success returns to S4 with “Goal deleted.” Failure: “We couldn’t delete this goal. Try again.”

## 8.3 Shared components
| Component | Used on | Contents | Behaviour |
|---|---|---|---|
| Header | S2–S10 | Logo, title, profile/menu | Sticky desktop; compact mobile; keyboard accessible |
| Primary button | All forms | Filled high-contrast button | Height 48px; disabled during submit |
| Secondary button | S1–S10 and modals | Outline/neutral button | Cancel/back actions |
| Danger button | S5, S10, M1, M2 | Red destructive action | Always confirms before permanent deletion |
| Text field | S1, S2, S4, S5, S7–S10 | Label, input, helper/error | Visible focus; retains input on error |
| Card | S3–S7, S9 | Title, details, optional progress/status | 12px radius and consistent padding |
| Toast | S3–S10 | Short success/failure message | Disappears after 3 seconds; not the only error indicator |
| Empty-state block | S3–S9 | Explanation and relevant action | Shown when no records exist |
| Loading placeholder | S3–S9 | Skeleton cards/rows | Shown while waiting for data |
| Offline banner | Protected screens | “You’re offline. Changes may not be saved.” | Save actions requiring server confirmation are disabled |

## 8.4 Sample data set
| Entity | Example |
|---|---|
| User personas | Lerato Mokoena and Aiden Naidoo (fictional demo personas) |
| Goal 1 | Learn React fundamentals; Study; target 30 Nov 2026; Active |
| Goal 2 | Build a consistent gym routine; Fitness; target 31 Dec 2026; Active |
| Goal 3 | Improve trading journal discipline; Trading; target 15 Dec 2026; Active |
| Tasks | Complete React hooks lesson; backtest one strategy for 30 minutes; complete Monday strength workout |
| Habits | Read for 20 minutes; review trading journal; train or walk |
| Weekly review | 8 tasks completed; 9 habit check-ins; next focus: plan the week on Sunday |

# 9. Design direction
## 9.1 Look and brand
| Item | Choice |
|---|---|
| Look and feel | Focused, encouraging, calm |
| Primary | Momentum Green `#167D63` |
| Accent | Bright Mint `#B9F3D0` |
| Background | `#F5F7F6` |
| Surface | `#FFFFFF` |
| Main text | `#17211D` |
| Secondary text | `#53635B` |
| Border | `#D8E2DC` |
| Error / success / warning | `#B42318` / `#167D63` / `#9A6700` |
| Dark mode | None in v1 |
| Font | Inter, system sans-serif fallback |
| Text sizes | Page title 28px/700; section 20px/650; card title 16px/600; body 16px/400; small 12px/400 |
| Spacing | 8px unit; gaps 8, 16, 24, 32, 40px; 4px only for tight icon/text gaps |
| Side margins | 24px desktop; 16px mobile |
| Radius | Cards 12px; inputs/buttons 8px; pills 999px |
| Shadows | `0 2px 8px rgba(23,33,29,0.06)` for cards only |
| Button height | 48px; tappable target at least 44×44px |
| Icons | Lucide outline |
| Logo | “Momentum” wordmark with rising-path/forward-arrow mark in green |
| Imagery | No stock photos; use icons, progress bars, initials, and simple charts |

## 9.2 Tone of voice
Friendly, direct, encouraging, and not guilt-based. Example: “Small steps count. Choose one action to move your goal forward today.”

## 9.3 Platform rules
Responsive web first. Desktop over 1,024px uses left sidebar and content max-width 1,200px. Tablet 640–1,024px uses collapsed sidebar. Mobile below 640px uses top header and bottom navigation for Dashboard, Goals, Calendar, Habits, and More. Every interactive control has hover, keyboard focus, disabled, and pressed states. AI and review screens become single-column on mobile.

## 9.4 Accessibility
- Body text at least 16px; small text never below 12px.
- Normal text contrast ratio at least 4.5:1; verify final combinations with a contrast checker before approval.
- Tappable controls at least 44×44px.
- Never use colour alone to communicate status; add text or icons.
- Icon-only controls have accessible names; all inputs have visible labels.
- Main flows must work using keyboard only with visible focus.

Reference apps: Todoist for task hierarchy, Google Calendar for month navigation, and Headspace for supportive language. These are references only; Momentum will not copy their branding.

# 10. Data model
## 10.1 Entities and fields
**UserProfile:** one record for a user's profile; authentication credentials remain in Supabase Auth.
| Field | Type | Required | Default | Unique | Rules / delete |
|---|---|---|---|---|---|
| id | ID | Yes | Auth user ID | Yes | Delete with account |
| display_name | Text (50) | Yes | None | No | 2–50 characters |
| email | Email | Yes | Auth email | Yes | Read-only in app |
| created_at | Date-time | Yes | Now | No | Stored UTC; shown SAST |

**Goal:** one outcome the user wants to achieve.
| Field | Type | Required | Default | Unique | Rules / delete |
|---|---|---|---|---|---|
| id | ID | Yes | Auto | Yes | Primary key |
| user_id | Link to UserProfile | Yes | Session user | No | Owner only; cascade with user |
| title | Text (80) | Yes | None | No | 3–80 characters |
| category | Choice | Yes | Other | No | Personal, Study, Fitness, Career, Business, Trading, Other |
| description | Long text (500) | No | Empty | No | Max 500 |
| target_date | Date | No | None | No | Optional |
| status | Choice | Yes | Active | No | Active, Archived |
| notes | Long text (2000) | No | Empty | No | Max 2,000 |
| created_at | Date-time | Yes | Now | No | Stored UTC |

**Task:** one actionable step linked to a Goal.
| Field | Type | Required | Default | Unique | Rules / delete |
|---|---|---|---|---|---|
| id | ID | Yes | Auto | Yes | Primary key |
| goal_id | Link to Goal | Yes | None | No | Cascade with Goal |
| user_id | Link to UserProfile | Yes | Session user | No | Must match Goal owner |
| title | Text (120) | Yes | None | No | 1–120 characters |
| due_date | Date | No | None | No | Optional |
| estimated_minutes | Whole number | No | None | No | 5–480 if supplied |
| status | Choice | Yes | Todo | No | Todo, Done |
| created_at | Date-time | Yes | Now | No | Stored UTC |

**Habit:** one repeated action scheduled for selected weekdays.
| Field | Type | Required | Default | Unique | Rules / delete |
|---|---|---|---|---|---|
| id | ID | Yes | Auto | Yes | Primary key |
| user_id | Link to UserProfile | Yes | Session user | No | Cascade with user |
| title | Text (60) | Yes | None | No | 2–60 characters |
| weekdays | Choice list | Yes | None | No | Monday–Sunday; at least one |
| status | Choice | Yes | Active | No | Active, Archived |
| created_at | Date-time | Yes | Now | No | Stored UTC |

**HabitCompletion:** one completion record for a Habit on a local date.
| Field | Type | Required | Default | Unique | Rules / delete |
|---|---|---|---|---|---|
| id | ID | Yes | Auto | Yes | Primary key |
| habit_id | Link to Habit | Yes | None | No | Cascade with Habit |
| user_id | Link to UserProfile | Yes | Session user | No | Must match Habit owner |
| completion_date | Date | Yes | Today in SAST | Unique with habit_id | One per habit/date |
| created_at | Date-time | Yes | Now | No | Stored UTC |

**WeeklyReview:** one reflection per user per week.
| Field | Type | Required | Default | Unique | Rules / delete |
|---|---|---|---|---|---|
| id | ID | Yes | Auto | Yes | Primary key |
| user_id | Link to UserProfile | Yes | Session user | No | Cascade with user |
| week_start | Date | Yes | Current Monday | Unique with user_id | One per user/week |
| went_well | Long text (1000) | No | Empty | No | Max 1,000 |
| difficulties | Long text (1000) | No | Empty | No | Max 1,000 |
| next_focus | Long text (1000) | No | Empty | No | Max 1,000 |
| created_at | Date-time | Yes | Now | No | Stored UTC |

## 10.2 Relationships
- One UserProfile has many Goals, Habits, and WeeklyReviews.
- One Goal has many Tasks; deleting a Goal deletes its Tasks.
- One Habit has many HabitCompletions; each completion belongs to one Habit and one UserProfile.
- Every linked user_id must match the authenticated owner.

## 10.3 Status values and changes
| Entity.field | From | To | Cause |
|---|---|---|---|
| Goal.status | Active | Archived | User selects Archive |
| Goal.status | Archived | Active | User selects Restore |
| Task.status | Todo | Done | User completes task |
| Task.status | Done | Todo | User unchecks task |
| Habit.status | Active | Archived | User archives habit |
| Habit.status | Archived | Active | User restores habit |

## 10.4 Reference and seed data
Goal categories and weekday values are fixed reference data maintained in code. Seed data uses Section 8.4 and is labelled demo data. Development test account: `momentum.demo@example.com`, with a test-only password stored only in local development environment. Never use it for real personal data. No public admin role.

# 11. Tech stack and architecture
## 11.1 Stack
| Layer | Choice | Why |
|---|---|---|
| Frontend | React 18 + Vite 6 | Fits course work and supports responsive browser app |
| Language | TypeScript 5 | Catches data and form errors during development |
| Styling | Tailwind CSS 3 | Consistent responsive styling with shared tokens |
| Backend/API | Supabase PostgreSQL, Auth, Edge Functions | Database, sign-in, server-side rules, AI proxy |
| Database | PostgreSQL via Supabase | Relational goals, tasks, habits, and reviews |
| Authentication | Supabase Auth | Verification, login, password reset |
| File storage | None in v1 | No file uploads |
| Scheduled jobs | None in v1 | No scheduled server work needed |
| Hosting | Vercel; local Vite development | Shareable web demo |
| Package manager | npm; Node.js 20 LTS or supported current LTS | Common JavaScript setup |
| Testing | Vitest + React Testing Library and manual browser tests | Test rules and flows |
| Version control | Git/GitHub; `docs/PRD.md`, root `MASTER.md` | Traceable changes |

## 11.2 Third-party services
| Service | Purpose | Free tier enough? | Key? |
|---|---|---|---|
| Supabase | Database, auth, RLS, Edge Functions | Expected for small classroom MVP; verify current quotas | URL and anon key public; service-role key secret |
| OpenAI API | Draft goal steps in AI Growth Assistant | Usage may cost money; enforce a low budget and rate limits | Secret key only in Edge Function |

## 11.3 How parts connect
React uses the Supabase client to read and write user-owned records, with PostgreSQL RLS restricting queries to the authenticated user. The AI Growth Assistant calls a Supabase Edge Function that checks the session, validates input, calls the AI provider with a server-side secret, validates the response, and returns draft suggestions. The AI secret is never sent to the browser.

## 11.4 Permissions
| Entity | Action | Allowed | Rule |
|---|---|---|---|
| UserProfile | Read | Owner | auth.uid() matches id |
| UserProfile | Create/update/delete | Owner | Display name 2–50; deletion server-side |
| Goal | CRUD | Owner | RLS checks user_id; linked records cascade |
| Task | CRUD | Owner | goal_id must belong to same owner |
| Habit | CRUD | Owner | user_id must equal auth.uid() |
| HabitCompletion | Read/create/delete | Owner | Unique habit_id + completion_date |
| WeeklyReview | CRUD | Owner | Unique user_id + week_start |
| AI request | Invoke | Authenticated user | Edge Function validates input and applies rate limit |

## 11.5 Environment variables and secrets
| Name | Purpose | Source | Classification |
|---|---|---|---|
| VITE_SUPABASE_URL | Browser project URL | Supabase settings | Public |
| VITE_SUPABASE_ANON_KEY | Browser key | Supabase settings | Public; RLS required |
| SUPABASE_URL | Edge Function project URL | Supabase settings | Server-side config |
| SUPABASE_SERVICE_ROLE_KEY | Privileged key only if required for deletion workflow | Supabase settings | Secret; Edge Function only |
| OPENAI_API_KEY | AI provider key | Provider dashboard | Secret; Edge Function only |
| AI_MODEL | Model identifier | Provider settings | Server-side config |

## 11.6 Folder structure
```text
src/
  app/              routes and app layout
  components/       shared buttons, cards, fields, toasts
  features/
    auth/ dashboard/ goals/ calendar/ habits/
    ai-coach/ reviews/ settings/
  lib/              Supabase client, date helpers, validation
  types/            shared TypeScript types
  tests/            unit and component tests
supabase/
  migrations/       schema and RLS policies
  functions/        AI plan and account deletion
docs/
  idea.md
  PRD.md
MASTER.md
.env.example
```

## 11.7 Testing plan
- Automated unit tests: BR1 goal limit; BR2 task validation; BR3 progress; BR4 habit schedule/duplicate completion; BR6 AI input/output validation; BR9 one review per week.
- Access tests: one account cannot read, update, or delete another account's records.
- Manual tests: sign-up, verification, login, password reset, mobile layout, keyboard use, date handling, AI failure, account deletion, offline messages.
- Test accounts: demo user in Section 10.4 plus a second local-only account to test data isolation. Never commit real passwords.
- Five-minute demo: sign in; create goal and two tasks; schedule a task and open calendar; create and complete a habit; generate AI plan and save selected steps; save weekly reflection; show dashboard progress.

# 12. Quality, errors, security and privacy
## 12.1 Quality requirements
| Area | Testable requirement |
|---|---|
| Speed | On stable 10 Mbps, dashboard shows content or loading placeholder within 3 seconds for up to 20 active goals and 200 tasks |
| Data usage | No auto-play media or file uploads; lists request at most 50 records at a time |
| Offline | Show “You’re offline. Changes may not be saved.” Cached views may be read-only; no success until server confirms |
| Devices | Latest two stable Chrome and Edge versions; latest stable Firefox and Safari; responsive 360–1,440px |
| Language/region | English (South Africa); dates like 28 Oct 2026; 24-hour time; Africa/Johannesburg timezone; no currency or phone data collected |
| Accessibility | Meet Section 9.4; keyboard-only test for main flows |
| Scale | Target 500 registered users and up to 100 concurrent sessions, subject to hosting limits |
| Abuse limits | Max 10 AI requests/user/hour and 30/user/day; prompt max 500 characters; max 7 output steps |

## 12.2 Error messages
| Situation | Exact message | Next action |
|---|---|---|
| No internet | “You’re offline. Changes may not be saved.” | Disable server-dependent saves; preserve form input |
| Server error | “We couldn’t complete that action. Try again.” | Keep screen and values; Retry |
| Expired session | “Your session has expired. Log in again.” | Route to S2 after message |
| Not allowed/not found | “You can’t access that item.” | Return to previous screen without revealing data |
| Form field error | Red border and specific text such as “Enter at least 3 characters.” | Keep other values |
| AI error | “We couldn’t create a plan right now. Try again or add tasks manually.” | Keep prompt; do not auto-save |
| Goal limit | “You have reached the limit of 20 active goals. Archive one to add another.” | Stay on S4 |

## 12.3 Security
- Supabase Auth handles passwords; app tables never store password text.
- Secrets never appear in browser code, commits, screenshots, or documentation.
- RLS and Edge Function checks enforce owner-only access.
- Validate and limit text on server and client; render notes as text, not executable HTML.
- Send only required goal prompt and time information to AI; do not send email or unrelated profile data.
- Apply per-user AI rate limits and provider spending limits. Avoid logging full private prompts by default.

## 12.4 Privacy and POPIA
| Personal information | Why needed | Who sees it | Storage | Retention | Deletion |
|---|---|---|---|---|---|
| Email | Login and recovery | User and auth service | Supabase Auth; region to be confirmed | Until account deletion | S10 → M1 |
| Display name | Personalised greeting | User only | Supabase PostgreSQL; region to be confirmed | Until account deletion | S10 → M1 |
| Goals, tasks, notes, habits, completions, reviews | Core planning | Owner only | Supabase PostgreSQL; region to be confirmed | Until user deletes records/account | Delete records or S10 → M1 |
| AI prompt/response | Generate plan | User and AI provider under provider terms | Passed through Edge Function; provider region/retention to be checked | Not stored in app unless selected steps are saved; provider terms apply | Saved tasks deleted normally |

Consent wording on S1: “I confirm that I am 18 years old or older and agree to the Momentum Privacy Notice.” Checkbox is unticked by default and required. S10 links to a Privacy Notice explaining collection, purpose, storage location, retention, and deletion. Users under 18 cannot register in v1. Before public release, confirm database region and AI provider processing/retention settings and disclose cross-border processing if applicable.

# 13. Assumptions, risks, open questions and milestones
## 13.1 Assumptions
- Users want one place to organise several goal types; test with 5–10 intended users.
- Users will review AI suggestions instead of expecting automatic plan changes; test the AI Coach prototype.
- Supabase free tier is sufficient for classroom MVP; confirm quotas before deployment.
- AI provider can return structured suggestions; test invalid, empty, and timed-out responses.

## 13.2 Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI output is inaccurate/general | Medium | Medium | Label suggestions, validate structure, allow edit/removal, never auto-save |
| AI costs exceed budget | Medium | High | Budget alerts, rate limits, short prompts and outputs |
| Private goal data leaks | Low | High | RLS on every table and cross-account access tests |
| Scope grows too large | High | High | Defer advanced trading analytics, integrations, native apps, social features |
| Connection failure loses work | Medium | Medium | Preserve form state and confirm saves only after server response |

## 13.3 Open questions
No product-scope questions remain for this MVP draft. Administrative details still need to be completed: student number, course code/cohort, facilitator name, and GitHub repository URL. Facilitator approval is required before status becomes Approved.

## 13.4 Milestones
| Milestone | What is finished | Location | Target |
|---|---|---|---|
| M0 Idea submitted | Original concept document | Previous submission / `docs/idea.md` | 27 Oct 2026 (done) |
| M1 PRD reviewed | PRD checked by student and facilitator | `docs/PRD.md` | 28 Oct 2026 |
| M2 Design ready | Style guide and S1–S10, M1–M2 screens checked | Design link to be added | 30 Oct 2026 |
| M3 MASTER.md ready | Build plan checked against approved PRD | `MASTER.md` | 31 Oct 2026 |
| M4 MVP built | Must features work in deployed browser app | Repository/demo link to be added | 6 Nov 2026 |
| M5 Tested and demoed | Tests passed and five-minute demo completed | Test checklist link to be added | 9 Nov 2026 |

# 14. Using your PRD with AI
Use these prompts only after the PRD is approved. The PRD remains the source of truth. If generated screens or code are wrong because the PRD is unclear, update this document and its change log before regenerating.

## Step 0: Style guide
```text
Using only Section 9 and Section 8.3 of the approved Momentum PRD, create a one-page style guide. Include exact colour hex codes, typography, spacing, buttons, fields, cards, header, navigation, toast, offline banner, and empty states. Do not invent tokens or screens.
```

## Step 1: Generate screens
```text
Design screen [S# and screen name] for Momentum responsive web. Use Sections 2.1, 8.1, 8.4, 9, and the relevant 8.2 specification. Use exact labels and messages. Include Normal, Empty, Loading, Error, Offline, and Success states where specified. Do not add features or sample data not in the PRD.
```

## Step 2: Generate MASTER.md
```text
Using the approved PRD and final screens, write MASTER.md as a phased build plan. Include scope/deferred features, stack and setup commands, .env.example, schema/migrations, RLS permissions, every BR rule, account decisions, navigation, design tokens, errors, seed data, build phases, Definition of Done checkboxes, and every T-test. Use IDs exactly. If unclear or contradictory, list Clarifications needed and stop before build phases.
```

## Step 3: Build one phase at a time
```text
Read docs/PRD.md and MASTER.md. Build Phase 1 only. Follow the build plan, run the app and tests, tick Definition of Done items that pass, list anything incomplete, and stop. Do not start the next phase until reviewed.
```

MASTER.md review checklist:
- Clarifications needed is empty before implementation.
- Every F#, US#, S#, M#, BR#, and T- ID appears where relevant.
- No feature is added unless it exists in the approved PRD.
- `.env.example` contains placeholders only; no real secret is committed.
- Each phase ends with a running app and test-based Definition of Done.

# 15. Submission checklist
## Complete
- Working draft has no template square-bracket placeholders or copied example hints.
- Required sections are filled; recommended sections are completed.
- Pitch follows the required pattern and is 20 words or fewer; problem statement contains a number.
- Key terms are defined and used consistently.
- Two personas are linked to a role; permissions and admin approach are stated.
- Four measurable goals and six non-goals are defined.
- Five Must features, two Should features, and ten full screens are listed.
- BR1–BR12 define limits and calculations.
- Notifications and account decisions are explicit.
- Every feature has user stories; stories include acceptance tests and unhappy paths; at least five edge cases are listed.
- Flows cover every Must feature; navigation map includes all screens and modals.
- Screen and modal specifications include states and sample content.
- Design tokens use exact values; contrast still needs final verification.
- Entities, relationships, status changes, seed data, stack, permissions, environment variables, folder structure, testing plan, error messages, security, and POPIA approach are described.
- Product-scope questions are closed; administrative details remain to be completed.
- Recheck traceability after screen generation and before generating MASTER.md.

## Administrative items before final submission
- Add student number, correct course code/cohort, and facilitator name.
- Create the GitHub repository; save original idea as `docs/idea.md` and this document as `docs/PRD.md`.
- Add final links to milestone rows when artifacts exist.
- Ask a classmate to complete peer review.
- Set status to In review for submission; set Approved only after facilitator sign-off.

## Peer review
| Reviewer name | Date | One-sentence summary |
|---|---|---|
| To be completed by classmate | To be completed | Momentum helps users manage goals, plan actions, track habits, and review progress with optional AI guidance. |

# 16. Glossary
| Term | Plain-English meaning |
|---|---|
| Acceptance criteria | Exact checks proving a feature works, written as Given/When/Then. |
| AI plan | Draft steps suggested by the AI Growth Assistant. |
| API | A way for one program to ask another for data or actions. |
| Backend | Server-side part that handles data, sign-in, and rules. |
| Business rule | A limit or calculation the app must follow. |
| Database | Organised place where the app stores information. |
| Edge Function | Server-side code that calls services without exposing secret keys in the browser. |
| MVP | Minimum Viable Product: the smallest version that solves the main problem. |
| Persona | Imaginary but realistic person representing a type of user. |
| POPIA | South Africa's Protection of Personal Information Act. |
| RLS | Row-Level Security: database rules controlling which records a user can read or change. |
| SAST | South African Standard Time, UTC+2. |
| Seed data | Fake sample records for testing and demonstrations. |
| User story | A feature from the user's point of view: As a…, I want…, so that…. |
| Unhappy path | What happens when something goes wrong, such as invalid input or no internet. |
