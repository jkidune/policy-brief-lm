1. THE BIG PICTURE

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
