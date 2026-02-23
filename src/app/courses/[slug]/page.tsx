'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

const weeks = [
  {
    id: 'week1',
    label: 'Week 1',
    title: 'Strategic Foundations & Audience Identification',
    hours: 6,
    overview: `Focus on understanding the "Translation" process. Academic papers are nuanced and lengthy; policy briefs are concise and persuasive. This week is about identifying your key message and your specific audience within Tanzania's policy ecosystem.`,
    topics: [
      'Academic vs. Policy writing paradigm shift',
      'Identifying the "Policy Problem" in your research',
      'Stakeholder mapping: MDAs, CSOs, Parliament',
      "Tanzania policy ecosystem: FYDP, MKUKUTA, Vision 2025",
      'Timing your brief to the parliamentary budget calendar',
    ],
    resources: [
      {
        icon: '📚',
        title: 'World Bank Guide on Persuasive Policy Briefs',
        description: 'Search "World Bank Developing Policy Briefs D2S4" — excellent breakdown of structure and audience targeting.',
      },
      {
        icon: '📹',
        title: 'SciDev.Net Script Course',
        description: 'Free online module "Science communication skills for journalists and researchers" — highly relevant to Sub-Saharan context.',
      },
      {
        icon: '📝',
        title: 'Local Exemplar Analysis',
        description: 'Find 3 policy briefs from REPOA or ESRF (repoa.or.tz / esrf.or.tz). Identify their "Hook" and "Ask".',
      },
    ],
    assignments: [
      'Read 3 sample briefs from REPOA or ESRF',
      'Draft a one-page Stakeholder Map (3 local actors)',
      'Select 1 research paper or thesis to adapt',
      'Define your "One Main Message" in one sentence',
    ],
  },
  {
    id: 'week2',
    label: 'Week 2',
    title: 'Epistemic Translation & Structural Mechanics',
    hours: 7,
    overview: `This week focuses on the craft of writing. You will draft the core components using the 1:3:25 rule (1-page outline, 3-page brief, 25-page report). The brief structure follows: Title → Executive Summary → Context → Key Findings → Recommendations.`,
    topics: [
      'The 1:3:25 rule for brief length',
      'Drafting the Executive Summary (max 150 words)',
      'Problem Statement linked to FYDP III or national mandates',
      'Imperative verb recommendations: "Remove" not "It is suggested..."',
      'Accessibility: no jargon, feasibility, evidence-based advice',
    ],
    resources: [
      {
        icon: '⚒️',
        title: 'IDRC Toolkit: How to Write a Policy Brief',
        description: 'Go to idrc-crdi.ca and search "How to write a policy brief". Section-by-section breakdown with templates.',
      },
      {
        icon: '🎓',
        title: 'Coursera: Writing Policy Briefs and Writing for Popular Media',
        description: 'Free audit available. Structured video lectures on formulating arguments for diverse audiences.',
      },
      {
        icon: '✍️',
        title: 'Hemingway App',
        description: 'Use hemingwayapp.com (free) to check readability. Aim for Grade 8–10 reading level.',
      },
    ],
    assignments: [
      'Draft Executive Summary (max 150 words)',
      'Write Problem Statement linked to a national mandate',
      'Draft 3 specific Policy Recommendations using imperative verbs',
      'Select 1 chart or visual from your research to simplify',
      'Complete first full draft of the brief',
    ],
  },
  {
    id: 'week3',
    label: 'Week 3',
    title: 'Plain Language, Data Visualization & Formatting',
    hours: 6,
    overview: `A policy brief's visual appeal directly influences its cognitive retention. This week covers plain language editing, data visualization best practices, and digital accessibility — including alt-text for screen readers used by Tanzanian government portals.`,
    topics: [
      'Jargon elimination: the "Jargon Hunt" technique',
      'Bar charts over pie charts; always use rounded numbers',
      'No p-values or statistical significance markers for lay audiences',
      'Alt-text for digital accessibility (screen readers)',
      'Layout: sidebars, subheadings, bold text, bullet points',
    ],
    resources: [
      {
        icon: '📊',
        title: 'California Policy Lab: Policy Brief Guide',
        description: 'Search "capolicylab.org Policy Briefs 101". Excellent guidance on data visualization for non-expert audiences.',
      },
      {
        icon: '🎨',
        title: 'Canva Templates',
        description: 'Search Canva for "Newsletter" or "Report" templates. Makes your brief look professional without a designer.',
      },
      {
        icon: '🎙️',
        title: 'O\'Brien Institute Webinar: Influencing Policy Makers',
        description: 'Search YouTube "Influencing policy makers art and science policy brief" for expert presentation tips.',
      },
    ],
    assignments: [
      'Perform "Jargon Hunt" — delete or replace all academic terms',
      'Replace complex statistics with rounded, impactful numbers',
      'Add alt-text to all figures and charts in your brief',
      'Ask a non-expert friend to read it and note confusing sections',
      'Format the document with columns, subheadings, and sidebars',
    ],
  },
  {
    id: 'week4',
    label: 'Week 4',
    title: 'Quality Assurance, Peer Review & Dissemination',
    hours: 6,
    overview: `A brief that isn't read has no impact. This week covers peer review using structured rubrics, and building a multi-channel dissemination strategy tailored to Tanzania's legislative calendar, civil society networks, and media landscape.`,
    topics: [
      'Peer review rubric: Executive Summary, Tone, Evidence, Actionability, Format',
      'Constructive feedback: specificity, localization, solutions',
      'Policy Forum Tanzania Breakfast Debates strategy',
      'Aligning with parliamentary budget calendar (Jan–June)',
      'Op-Ed guidelines for The Citizen and Mwananchi',
      'Social media dissemination for African policymakers',
    ],
    resources: [
      {
        icon: '📋',
        title: 'NCFR Reviewer Guidelines',
        description: 'Search "NCFR Research and Policy Brief Reviewer Guidelines 2018". Provides a structured peer review rubric.',
      },
      {
        icon: '🌍',
        title: 'Policy Forum Tanzania',
        description: 'Visit policyforum-tz.org — learn about Breakfast Debates and member organizations like HakiElimu and ANSAF.',
      },
      {
        icon: '📰',
        title: 'The Citizen Op-Ed Submission',
        description: 'Visit thecitizen.co.tz. Their editorial mandate: "solutions grounded in research, pushing the development agenda".',
      },
    ],
    assignments: [
      'Complete self-audit using the full peer review rubric',
      'Create a list of 10 targeted stakeholders with contact info',
      'Draft a dissemination timeline aligned to parliamentary calendar',
      'Write 3 LinkedIn posts summarizing your brief in plain language',
      'Finalize and export PDF for distribution',
    ],
  },
]

export default function CoursePage() {
  const [checked, setChecked] = useState<Record<string, boolean[]>>({
    week1: new Array(weeks[0].assignments.length).fill(false),
    week2: new Array(weeks[1].assignments.length).fill(false),
    week3: new Array(weeks[2].assignments.length).fill(false),
    week4: new Array(weeks[3].assignments.length).fill(false),
  })

  const toggle = (weekId: string, index: number) => {
    const updated = [...checked[weekId]]
    updated[index] = !updated[index]
    setChecked({ ...checked, [weekId]: updated })
  }

  const totalTasks = Object.values(checked).flat().length
  const completedTasks = Object.values(checked).flat().filter(Boolean).length
  const overallPercent = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/courses" className="hover:text-teal-700 transition-colors">
            Courses
          </Link>
          <span>›</span>
          <span className="text-gray-700">Policy Brief Mastery</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Communicating Research through Policy Briefs
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              A Tanzania-contextualized 4-week curriculum. Replicate the UNU-MERIT learning 
              outcomes using open-access resources and local case studies from REPOA, ESRF, 
              and Policy Forum Tanzania.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Badge className="bg-teal-100 text-teal-800">4 Weeks</Badge>
            <Badge className="bg-teal-100 text-teal-800">25 Hours</Badge>
            <Badge variant="outline">Intermediate</Badge>
          </div>
        </div>

        {/* Overall progress */}
        <Card className="border border-teal-100 bg-teal-50/40">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-teal-800">Overall Course Progress</span>
              <span className="text-sm font-bold text-teal-700">{overallPercent}%</span>
            </div>
            <div className="w-full bg-teal-100 rounded-full h-2">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <p className="text-xs text-teal-600 mt-2">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Week Tabs */}
      <Tabs defaultValue="week1">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          {weeks.map((week) => (
            <TabsTrigger key={week.id} value={week.id} className="text-xs md:text-sm">
              {week.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {weeks.map((week) => (
          <TabsContent key={week.id} value={week.id}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Overview */}
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl text-gray-900">{week.title}</CardTitle>
                      <Badge variant="outline" className="text-teal-700 border-teal-200 flex-shrink-0 ml-3">
                        {week.hours}h
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">{week.overview}</p>
                    <div>
                      <h4 className="font-semibold text-teal-700 mb-2">Key Topics</h4>
                      <ul className="space-y-1">
                        {week.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-teal-500 mt-0.5">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Resources */}
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Self-Study Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {week.resources.map((res, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="text-2xl">{res.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-800">{res.title}</p>
                          <p className="text-sm text-gray-500 mt-0.5">{res.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Assignments sidebar */}
              <div>
                <Card className="border border-teal-100 bg-teal-50/40 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg text-teal-900">
                      {week.label} Assignments
                    </CardTitle>
                    <p className="text-xs text-teal-600">
                      {checked[week.id].filter(Boolean).length} of {week.assignments.length} done
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {week.assignments.map((task, i) => (
                      <label
                        key={i}
                        className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Checkbox
                          checked={checked[week.id][i]}
                          onCheckedChange={() => toggle(week.id, i)}
                          className="mt-0.5"
                        />
                        <span
                          className={`text-sm ${
                            checked[week.id][i]
                              ? 'line-through text-gray-400'
                              : 'text-gray-700'
                          }`}
                        >
                          {task}
                        </span>
                      </label>
                    ))}

                    {week.id === 'week4' && (
                      <Link href="/builder">
                        <div className="mt-4 bg-teal-700 hover:bg-teal-800 text-white text-center text-sm font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer">
                          Open Brief Builder →
                        </div>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}