# 🎓 LMS Technical Blueprint
### Policy Brief Mastery — Built with Next.js + Supabase
> Your step-by-step guide for setting up in TRAE IDE

---

## 1. THE BIG PICTURE

```
What we're building:
┌─────────────────────────────────────────────────┐
│              LEARNING MANAGEMENT SYSTEM          │
│                                                  │
│  📊 Dashboard   → Overview, progress, objectives │
│  📚 Courses     → Modules, materials, quizzes    │
│  🛠️ Brief Builder → Your existing HTML, upgraded │
│  🧪 Module Test → End-of-module assessment       │
│  📈 Progress    → Tracking across all content    │
└─────────────────────────────────────────────────┘
```

**First course loaded:** "Communicating Research through Policy Briefs"  
(Tanzania-contextualized, based on the UNU-MERIT framework)

---

## 2. TECH STACK CONFIRMED

| Layer         | Tool                  | Version   | Purpose                              |
|---------------|-----------------------|-----------|--------------------------------------|
| Framework     | **Next.js**           | 14 (App Router) | Pages, routing, SSR           |
| Styling       | **Tailwind CSS**      | 3.x       | Utility-first CSS                    |
| Components    | **shadcn/ui**         | latest    | Cards, progress bars, dialogs        |
| Database      | **Supabase**          | -         | Postgres DB + Auth + File Storage    |
| Content       | **MDX**               | -         | Notes as Markdown + components       |
| Charts        | **Chart.js** (keep)   | 4.x       | Workload + progress charts           |
| IDE           | **TRAE**              | -         | Local development                    |

---

## 3. PROJECT INITIALIZATION — COMMANDS FOR TRAE TERMINAL

Run these in order inside TRAE's built-in terminal:

### Step 1: Create the Next.js project
```bash
npx create-next-app@latest policy-brief-lms \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd policy-brief-lms
```

### Step 2: Install core dependencies
```bash
# shadcn/ui setup
npx shadcn-ui@latest init

# Supabase client
npm install @supabase/supabase-js @supabase/ssr

# Content
npm install @next/mdx @mdx-js/loader @mdx-js/react

# Utilities
npm install clsx tailwind-merge lucide-react

# Chart support
npm install chart.js react-chartjs-2
```

### Step 3: Install shadcn components you'll need
```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add button
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
```

---

## 4. FOLDER ARCHITECTURE

After setup, your `/src` folder should be organized like this:

```
src/
├── app/
│   ├── layout.tsx                    ← Root layout (nav + footer)
│   ├── page.tsx                      ← Redirects to /dashboard
│   │
│   ├── dashboard/
│   │   └── page.tsx                  ← Main dashboard view
│   │
│   ├── courses/
│   │   ├── page.tsx                  ← All courses list
│   │   └── [slug]/
│   │       ├── page.tsx              ← Course landing (objectives, modules)
│   │       ├── [module]/
│   │       │   ├── page.tsx          ← Module page (lessons, materials)
│   │       │   └── quiz/
│   │       │       └── page.tsx      ← Module quiz
│   │       └── test/
│   │           └── page.tsx          ← End-of-module test
│   │
│   └── builder/
│       └── page.tsx                  ← Your Brief Builder (upgraded HTML)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   ├── dashboard/
│   │   ├── StatCard.tsx              ← "25 Hours", "Week 1", "€50 saved"
│   │   ├── GoalsTracker.tsx          ← Learning goals checklist
│   │   ├── WorkloadChart.tsx         ← Doughnut chart (from your HTML)
│   │   └── ProgressBar.tsx           ← Per-module progress
│   │
│   ├── course/
│   │   ├── ModuleCard.tsx            ← Clickable module in sidebar
│   │   ├── MaterialViewer.tsx        ← PDF, video, slides viewer
│   │   ├── WeekTab.tsx               ← Tab for each week
│   │   └── AssignmentChecklist.tsx   ← Week assignment checkboxes
│   │
│   ├── quiz/
│   │   ├── QuizEngine.tsx            ← Reusable quiz component
│   │   ├── QuestionCard.tsx          ← Single question display
│   │   └── ResultSummary.tsx         ← After quiz score display
│   │
│   └── builder/
│       ├── BuilderSidebar.tsx        ← Step navigation (Hook, Problem...)
│       ├── BuilderForm.tsx           ← Input section
│       └── PreviewPanel.tsx          ← Live brief preview
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 ← Browser Supabase client
│   │   ├── server.ts                 ← Server Supabase client
│   │   └── queries.ts                ← All DB query functions
│   │
│   └── utils.ts                      ← cn(), formatDate(), etc.
│
└── content/
    └── courses/
        └── policy-brief/
            ├── course.json           ← Course metadata
            ├── week1.mdx             ← Week 1 notes
            ├── week2.mdx             ← Week 2 notes
            ├── week3.mdx             ← Week 3 notes
            └── week4.mdx             ← Week 4 notes
```

---

## 5. SUPABASE DATABASE SCHEMA

Run this SQL in your Supabase project's SQL Editor:

```sql
-- ============================================
-- COURSES
-- ============================================
create table courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,            -- e.g. "policy-brief"
  title text not null,
  description text,
  duration_weeks int default 4,
  total_hours int default 25,
  objectives jsonb,                     -- ["Understand dissemination", ...]
  what_you_will_learn jsonb,            -- ["Write a policy brief", ...]
  cover_image_url text,
  created_at timestamptz default now()
);

-- ============================================
-- MODULES (Weeks inside a course)
-- ============================================
create table modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  slug text not null,                   -- "week-1-foundations"
  title text not null,                  -- "Week 1: Strategic Foundations"
  description text,
  week_number int not null,
  estimated_hours int,
  key_topics jsonb,                     -- ["Stakeholder mapping", ...]
  created_at timestamptz default now()
);

-- ============================================
-- LESSONS (Materials inside a module)
-- ============================================
create table lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references modules(id) on delete cascade,
  title text not null,
  type text check (type in ('video','reading','slides','notes','quiz')),
  content_url text,                     -- For videos, external links
  content_mdx text,                     -- For inline notes
  duration_minutes int,
  order_index int not null,
  created_at timestamptz default now()
);

-- ============================================
-- QUIZZES
-- ============================================
create table quizzes (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references modules(id) on delete cascade,
  title text not null,
  is_final_test boolean default false,  -- Module end test vs quick quiz
  pass_threshold int default 70,        -- % to pass
  created_at timestamptz default now()
);

create table questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id) on delete cascade,
  question_text text not null,
  options jsonb not null,               -- ["Option A", "Option B", ...]
  correct_index int not null,           -- 0-based index of correct answer
  explanation text,                     -- Shown after answering
  order_index int not null
);

-- ============================================
-- USER PROGRESS
-- ============================================
create table user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete cascade,
  completed boolean default false,
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

create table goal_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  goal_index int not null,              -- Which goal (0-based)
  completed boolean default false,
  unique(user_id, course_id, goal_index)
);

create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  quiz_id uuid references quizzes(id) on delete cascade,
  score int not null,                   -- Percentage 0-100
  answers jsonb,                        -- [{question_id, selected_index}]
  passed boolean not null,
  attempted_at timestamptz default now()
);

-- ============================================
-- BRIEF BUILDER DRAFTS
-- ============================================
create table brief_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  target_audience text,
  hook_statement text,
  problem_statement text,
  evidence_summary text,
  recommendations text,
  dissemination_plan text,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);
```

---

## 6. ENVIRONMENT VARIABLES

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from: Supabase Dashboard → Settings → API

---

## 7. COURSE DATA STRUCTURE (course.json)

This seeds the first course — Policy Brief Mastery:

```json
{
  "slug": "policy-brief",
  "title": "Communicating Research through Policy Briefs",
  "description": "A Tanzania-contextualized self-study path replicating the UNU-MERIT curriculum. Learn to translate academic research into concise, persuasive policy briefs that reach decision-makers.",
  "duration_weeks": 4,
  "total_hours": 25,
  "objectives": [
    "Understand the modes of research dissemination",
    "Translate academic findings into accessible policy language",
    "Master the structure and anatomy of an effective policy brief",
    "Develop peer review and quality assurance skills",
    "Design a multi-channel dissemination strategy for the Tanzanian context"
  ],
  "what_you_will_learn": [
    "The 'breakfast test' standard for policy writing",
    "Stakeholder mapping for Tanzania's Ministry ecosystem",
    "The IDRC brief structure: Title → Executive Summary → Context → Evidence → Recommendations",
    "Data visualization for non-expert audiences (no p-values!)",
    "How to align briefs with the Tanzanian parliamentary budget calendar",
    "Op-Ed writing for The Citizen and Mwananchi newspapers",
    "Digital dissemination via LinkedIn, X, and WhatsApp networks"
  ],
  "modules": [
    {
      "week_number": 1,
      "slug": "week-1-foundations",
      "title": "Strategic Foundations & Audience Identification",
      "estimated_hours": 6,
      "key_topics": [
        "Academic vs Policy writing paradigm shift",
        "Stakeholder mapping: MDAs, CSOs, Parliament",
        "Tanzania policy ecosystem: FYDP, MKUKUTA, Vision 2025",
        "Timing your brief to the legislative calendar"
      ]
    },
    {
      "week_number": 2,
      "slug": "week-2-structure",
      "title": "Epistemic Translation & Structural Mechanics",
      "estimated_hours": 7,
      "key_topics": [
        "The 1:3:25 rule for brief length",
        "Drafting the Executive Summary (max 150 words)",
        "Problem Statement linked to national mandates",
        "Imperative verb recommendations: 'Remove' not 'It is suggested...'"
      ]
    },
    {
      "week_number": 3,
      "slug": "week-3-visual",
      "title": "Plain Language, Data Visualization & Formatting",
      "estimated_hours": 6,
      "key_topics": [
        "Jargon elimination techniques",
        "Bar charts over pie charts; rounded numbers",
        "Alt-text for digital accessibility (screen readers)",
        "Layout: sidebars, subheadings, bullet points"
      ]
    },
    {
      "week_number": 4,
      "slug": "week-4-dissemination",
      "title": "Quality Assurance, Peer Review & Dissemination",
      "estimated_hours": 6,
      "key_topics": [
        "Peer review rubric (Executive Summary, Tone, Evidence, Actionability, Format)",
        "Constructive feedback frameworks",
        "Policy Forum Tanzania breakfast debates strategy",
        "Media engagement: The Citizen op-ed guidelines",
        "Social media dissemination for African policymakers"
      ]
    }
  ]
}
```

---

## 8. BUILD ORDER — WHAT TO BUILD FIRST

Follow this sequence to always have something working at each stage:

```
Phase 1: Shell (Week 1 of build)
─────────────────────────────────
✅ Next.js project initialized
✅ Tailwind + shadcn/ui configured
✅ Navbar and layout
✅ Dashboard page (static, no DB yet)
✅ Port your existing HTML → Dashboard component

Phase 2: Course Structure (Week 2 of build)
─────────────────────────────────────────────
✅ Supabase project created + schema applied
✅ Course, Module, Lesson pages
✅ Week tabs (your existing HTML logic → React)
✅ Assignment checklists

Phase 3: Progress & Interactivity (Week 3 of build)
─────────────────────────────────────────────────────
✅ Supabase Auth (email login)
✅ Progress tracking to DB
✅ Goal tracker saves state
✅ Quiz engine (multiple choice)

Phase 4: Brief Builder (Week 4 of build)
──────────────────────────────────────────
✅ Your existing Brief Builder HTML → full React component
✅ Drafts saved to Supabase
✅ Live preview panel
✅ Export to PDF (optional: react-pdf)

Phase 5: Polish
────────────────
✅ Module end-test with pass/fail
✅ Dashboard shows real % from DB
✅ Mobile responsive check
✅ MDX notes for each week
```

---

## 9. THE BRIEF BUILDER MIGRATION PLAN

Your existing HTML has 4 steps. Here's how it maps to the upgraded React version:

```
CURRENT HTML STEP          →    UPGRADED REACT COMPONENT
──────────────────────────────────────────────────────────
1. The Hook                →    HookStep.tsx (title + so-what statement)
2. The Problem             →    ProblemStep.tsx (problem + Tanzania context)
3. The Evidence            →    EvidenceStep.tsx (key findings + visual guide)
4. Recommendations         →    RecommendationsStep.tsx (imperative verb checker)

NEW steps to add:
5. Dissemination Plan      →    DisseminationStep.tsx (stakeholders, channels)
6. Preview & Export        →    PreviewStep.tsx (formatted brief preview)
```

Each step saves automatically to Supabase `brief_drafts` table.

---

## 10. FIRST FILE TO CREATE IN TRAE

Once your project is initialized, start here — create the Supabase client:

**`src/lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Then immediately port your dashboard HTML into:
**`src/app/dashboard/page.tsx`**

This gives you a working page in 30 minutes while the full structure builds.

---

## QUICK REFERENCE CARD

| What | Where | Notes |
|------|-------|-------|
| Course content (notes) | `/src/content/courses/policy-brief/` | MDX files |
| Course metadata | `course.json` + Supabase `courses` table | JSON seeded to DB |
| Brief Builder | `/src/app/builder/` | Upgraded from your HTML |
| Progress tracking | `user_progress` + `goal_progress` tables | Per user |
| Quiz data | `quizzes` + `questions` tables | JSON options array |
| Supabase dashboard | `app.supabase.com` | Free tier is enough |

---

*Next step: Run the Phase 1 commands above in TRAE terminal, then share your first dashboard component and we'll build it out together.*
