'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import Link from 'next/link'

ChartJS.register(ArcElement, Tooltip, Legend)

const learningGoals = [
  'Have awareness of the modes of dissemination',
  'Understand how to translate research into policy briefs',
  'Understand key criteria for a good policy brief',
  'Increase skill in policy brief writing',
  'Increase skill in peer reviewing',
  'Understand dissemination strategies for Tanzania',
]

const modules = [
  { week: 1, title: 'Strategic Foundations & Audience Identification', hours: 6, color: 'bg-teal-500' },
  { week: 2, title: 'Epistemic Translation & Structural Mechanics', hours: 7, color: 'bg-teal-400' },
  { week: 3, title: 'Plain Language, Data Visualization & Formatting', hours: 6, color: 'bg-teal-300' },
  { week: 4, title: 'Quality Assurance, Peer Review & Dissemination', hours: 6, color: 'bg-teal-200' },
]

const workloadData = {
  labels: ['Contact / Reading (7h)', 'Tasks / Writing (18h)'],
  datasets: [
    {
      data: [7, 18],
      backgroundColor: ['#ccfbf1', '#0f766e'],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
}

const workloadOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { font: { family: 'Inter' }, usePointStyle: true },
    },
  },
}

export default function DashboardPage() {
  const [checkedGoals, setCheckedGoals] = useState<boolean[]>(
    new Array(learningGoals.length).fill(false)
  )

  const toggleGoal = (index: number) => {
    const updated = [...checkedGoals]
    updated[index] = !updated[index]
    setCheckedGoals(updated)
  }

  const completedCount = checkedGoals.filter(Boolean).length
  const progressPercent = Math.round((completedCount / learningGoals.length) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Course Dashboard</h1>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          Welcome to your self-guided study plan for{' '}
          <strong>Communicating Research through Policy Briefs</strong>. 
          Track your progress through the 25-hour curriculum, access resources 
          for each module, and draft your own policy brief.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-100 shadow-sm hover:-translate-y-0.5 transition-transform">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Estimated Workload
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-teal-700">25</span>
              <span className="text-gray-600">Hours Total</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Recommended: 6–7 hours/week</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 shadow-sm hover:-translate-y-0.5 transition-transform">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Duration
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-teal-700">4</span>
              <span className="text-gray-600">Weeks</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Self-paced modules</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 shadow-sm hover:-translate-y-0.5 transition-transform">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Goals Completed
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-teal-700">{completedCount}</span>
              <span className="text-gray-600">of {learningGoals.length}</span>
            </div>
            <Progress value={progressPercent} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* What You Will Learn */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">What You Will Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "The 'breakfast test' standard for policy writing",
              "Stakeholder mapping for Tanzania's Ministry ecosystem",
              "IDRC brief structure: Title → Summary → Context → Evidence → Recommendations",
              "Data visualization for non-expert audiences (no p-values!)",
              "Align briefs with Tanzania's parliamentary budget calendar",
              "Op-Ed writing for The Citizen and Mwananchi newspapers",
              "Digital dissemination via LinkedIn, X, and WhatsApp",
              "Peer review rubric and quality assurance techniques",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-teal-600 mt-0.5">✓</span>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goals Tracker + Workload Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl text-gray-800">Learning Goals Tracker</CardTitle>
              <Badge
                className={
                  progressPercent === 100
                    ? 'bg-green-100 text-green-800'
                    : 'bg-teal-100 text-teal-800'
                }
              >
                {progressPercent}% Complete
              </Badge>
            </div>
            <p className="text-sm text-gray-500">Check off goals as you master them:</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {learningGoals.map((goal, i) => (
              <label
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={checkedGoals[i]}
                  onCheckedChange={() => toggleGoal(i)}
                  className="text-teal-600"
                />
                <span
                  className={`text-sm ${
                    checkedGoals[i] ? 'line-through text-gray-400' : 'text-gray-700'
                  }`}
                >
                  {goal}
                </span>
              </label>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Workload Distribution</CardTitle>
            <p className="text-sm text-gray-500">Based on the 25-hour UNU-MERIT estimate</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Doughnut data={workloadData} options={workloadOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Overview */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Course Modules</CardTitle>
          <p className="text-sm text-gray-500">4-week structured learning path</p>
        </CardHeader>
        <CardContent className="space-y-4">
            {modules.map((mod) => (
  <Link key={mod.week} href="/courses/policy-brief">
  <div
    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/30 transition-colors cursor-pointer"
  >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <span className="text-teal-700 font-bold text-sm">W{mod.week}</span>
              </div>
              
              <div className="flex-grow">
                <p className="font-medium text-gray-800">{mod.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{mod.hours} hours estimated</p>
              </div>
              
              <Badge variant="outline" className="text-teal-700 border-teal-200 flex-shrink-0">
                Week {mod.week}
              </Badge>
            </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
    
  )
}