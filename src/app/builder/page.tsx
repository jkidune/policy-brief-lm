'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const steps = [
  {
    id: 1,
    label: 'The Hook',
    title: 'Title & Opening Hook',
    description: 'Your title must be informative and catchy. The hook answers: why does this matter right now?',
    tip: '💡 A good title avoids jargon. Example: "Closing the Gap: Why Tanzania\'s School Feeding Programme Is Leaving Rural Girls Behind"',
  },
  {
    id: 2,
    label: 'The Problem',
    title: 'Problem Statement',
    description: 'Define the urgency. Link your local findings to a national mandate (FYDP, Vision 2025, SDGs). Policymakers need to see why this is their problem to solve.',
    tip: '💡 Connect to a specific framework: "This finding directly contradicts Target 4.1 of the FYDP III, which commits to..."',
  },
  {
    id: 3,
    label: 'The Evidence',
    title: 'Key Findings & Evidence',
    description: 'Present only your most compelling data. Use rounded numbers, bar charts over pie charts, and avoid p-values. Make data readable at a glance.',
    tip: '💡 Instead of "p=0.023, β=0.47", write "Children in programme schools were 3x more likely to complete primary education."',
  },
  {
    id: 4,
    label: 'Recommendations',
    title: 'Policy Recommendations',
    description: 'Use imperative verbs. Be specific about which actor should do what. Split by government level where possible.',
    tip: '💡 Wrong: "It is suggested that the government consider reviewing..." ✓ Right: "Remove the requirement for upfront school fees by June 2025."',
  },
  {
    id: 5,
    label: 'Dissemination',
    title: 'Dissemination Plan',
    description: 'A brief that isn\'t read has no impact. Identify your top 3 target actors and the channels to reach them in Tanzania.',
    tip: '💡 Align with the parliamentary calendar. Budget Committee prep runs January–March. Submit your brief in January for maximum impact.',
  },
]

const audienceOptions = [
  'Government Ministers (High level — very short time)',
  'Civil Servants / Technocrats (Detail oriented)',
  'Parliamentary Budget Committee',
  'NGOs / Donors (Impact oriented)',
  'Media / Journalists',
  'General Public (Broad strokes)',
]

const initialForm = {
  researchTitle: '',
  audience: '',
  hook: '',
  problem: '',
  evidence: '',
  recommendations: '',
  dissemination: '',
}

export default function BuilderPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [saved, setSaved] = useState(false)

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const filledFields = Object.values(form).filter((v) => v.trim().length > 0).length
  const completionPercent = Math.round((filledFields / Object.keys(form).length) * 100)

  const currentStep = steps.find((s) => s.id === activeStep)!

  const fieldMap: Record<number, keyof typeof initialForm> = {
    1: 'hook',
    2: 'problem',
    3: 'evidence',
    4: 'recommendations',
    5: 'dissemination',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Policy Brief Builder</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Structure your policy brief section by section. Each field saves your draft as
          you work. Complete all sections to generate a full brief skeleton ready for formatting.
        </p>
      </div>

      {/* Progress bar */}
      <Card className="border border-teal-100 bg-teal-50/40">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-teal-800">Brief Completion</span>
            <span className="text-sm font-bold text-teal-700">{completionPercent}%</span>
          </div>
          <div className="w-full bg-teal-100 rounded-full h-2">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Step Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {/* Research title + audience — always visible */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-3 mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Your Research
            </p>
            <input
              type="text"
              placeholder="Title of your research / thesis..."
              value={form.researchTitle}
              onChange={(e) => update('researchTitle', e.target.value)}
              className="w-full text-sm p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
            <select
              value={form.audience}
              onChange={(e) => update('audience', e.target.value)}
              className="w-full text-sm p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
            >
              <option value="">Select target audience...</option>
              {audienceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Step buttons */}
          {steps.map((step) => {
            const field = fieldMap[step.id]
            const isDone = form[field]?.trim().length > 0
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border font-medium text-sm transition-all flex items-center justify-between ${
                  activeStep === step.id
                    ? 'bg-teal-700 text-white border-teal-700 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                }`}
              >
                <span>{step.id}. {step.label}</span>
                {isDone && (
                  <span className={`text-xs ${activeStep === step.id ? 'text-teal-200' : 'text-teal-600'}`}>
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Main input area */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border border-gray-100 shadow-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="bg-teal-100 text-teal-800 mb-2">
                    Step {currentStep.id} of {steps.length}
                  </Badge>
                  <CardTitle className="text-2xl text-gray-900">
                    {currentStep.title}
                  </CardTitle>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {currentStep.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tip box */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 leading-relaxed">
                {currentStep.tip}
              </div>

              {/* Textarea */}
              <Textarea
                rows={10}
                placeholder={getPlaceholder(activeStep)}
                value={form[fieldMap[activeStep]]}
                onChange={(e) => update(fieldMap[activeStep], e.target.value)}
                className="w-full focus:ring-2 focus:ring-teal-500 resize-none text-sm leading-relaxed"
              />

              {/* Word count */}
              <p className="text-xs text-gray-400 text-right">
                {form[fieldMap[activeStep]].split(/\s+/).filter(Boolean).length} words
                {activeStep === 1 && ' · Aim for a compelling 1–2 sentence hook'}
                {activeStep === 2 && ' · Aim for 100–200 words'}
                {activeStep === 3 && ' · Aim for 200–300 words'}
                {activeStep === 4 && ' · Aim for 3–5 specific recommendations'}
                {activeStep === 5 && ' · List channels, actors, and timing'}
              </p>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  disabled={activeStep === 1}
                  className="text-gray-600"
                >
                  ← Previous
                </Button>

                <Button
                  onClick={handleSave}
                  className="bg-teal-700 hover:bg-teal-800 text-white px-6"
                >
                  {saved ? '✓ Saved!' : 'Save Draft'}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
                  disabled={activeStep === steps.length}
                  className="text-teal-700 border-teal-300"
                >
                  Next →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview panel — shows when all steps have content */}
          {completionPercent === 100 && (
            <Card className="border border-teal-200 bg-teal-50/30 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-teal-800">
                  📄 Brief Preview
                </CardTitle>
                <p className="text-sm text-teal-600">
                  Your full brief skeleton — ready to copy into a Word document or Canva template.
                </p>
              </CardHeader>
              <CardContent className="space-y-5 text-sm text-gray-800 leading-relaxed">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">Research</p>
                  <p className="font-semibold">{form.researchTitle}</p>
                  <p className="text-gray-500 text-xs">Audience: {form.audience}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">Hook</p>
                  <p>{form.hook}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">Problem Statement</p>
                  <p>{form.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">Key Evidence</p>
                  <p>{form.evidence}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">Recommendations</p>
                  <p>{form.recommendations}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-1">Dissemination Plan</p>
                  <p>{form.dissemination}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function getPlaceholder(step: number): string {
  switch (step) {
    case 1:
      return 'Write your policy brief title and opening hook here.\n\nExample title: "Closing the Gap: How Digital Tax Portals Are Excluding Women-Owned Businesses in Dar es Salaam"\n\nExample hook: "Every year, Tanzania loses an estimated TSh 4.2 billion in uncollected SME tax revenue — not due to evasion, but because the TANePS digital procurement portal remains inaccessible to 68% of women-owned businesses surveyed in Kinondoni and Ilala districts..."'
    case 2:
      return 'Define the policy problem with urgency.\n\nStart with the scale of the issue, then link it explicitly to a national mandate.\n\nExample: "Despite FYDP III\'s commitment to financial inclusion under Pillar 2, current procurement regulations require upfront registration fees of TSh 150,000 — a barrier cited by 74% of respondents as their primary reason for non-participation..."'
    case 3:
      return 'Present your key findings in plain language.\n\n• Use rounded numbers (not 19,847 — write "nearly 20,000")\n• Avoid p-values and statistical jargon\n• Lead with the most impactful finding\n\nExample: "Among the 3,832 women-owned SMEs surveyed, only 12% had successfully registered on TANePS. Of those who attempted registration, 61% abandoned the process due to document complexity..."'
    case 4:
      return 'List 3–5 specific, actionable recommendations using imperative verbs.\n\nFormat by actor:\n\nMinistry of Finance:\n• Remove the TSh 150,000 upfront registration fee for businesses with annual revenue below TSh 50 million\n• Simplify the TANePS onboarding process to a maximum of 3 document requirements\n\nPPRA:\n• Launch quarterly digital literacy workshops in Kinondoni, Ilala, and Temeke districts by Q3 2025'
    case 5:
      return 'Map your dissemination strategy to specific actors and channels.\n\nExample:\n\nPrimary targets:\n1. Director of SME Policy, Ministry of Industry — direct email + Policy Forum breakfast debate\n2. Budget Committee Chairperson, Bunge — submit brief by January 2026 ahead of budget prep\n3. Policy Forum Tanzania — present at March 2026 Breakfast Debate\n\nMedia:\n• Submit op-ed to The Citizen (thecitizen.co.tz) — focus on human story angle\n• LinkedIn thread with 5 key statistics + link to full brief\n• WhatsApp distribution via ANSAF and HakiElimu member networks'
    default:
      return ''
  }
}