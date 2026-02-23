import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const courses = [
  {
    slug: 'policy-brief',
    title: 'Communicating Research through Policy Briefs',
    description:
      'A Tanzania-contextualized self-study path replicating the UNU-MERIT curriculum. Learn to translate academic research into concise, persuasive policy briefs.',
    weeks: 4,
    hours: 25,
    modules: 4,
    level: 'Intermediate',
    tags: ['Policy Writing', 'Tanzania', 'Dissemination'],
  },
]

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Courses</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Structured self-study paths built for researchers and professionals in Dar es Salaam.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Link key={course.slug} href={`/courses/${course.slug}`}>
            <Card className="border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-teal-200 transition-all cursor-pointer h-full">
              <CardContent className="pt-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold text-gray-900 leading-snug">
                    {course.title}
                  </h2>
                  <Badge className="bg-teal-100 text-teal-800 flex-shrink-0">
                    {course.level}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex gap-6 pt-2 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xl font-bold text-teal-700">{course.weeks}</p>
                    <p className="text-xs text-gray-500">Weeks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-teal-700">{course.hours}</p>
                    <p className="text-xs text-gray-500">Hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-teal-700">{course.modules}</p>
                    <p className="text-xs text-gray-500">Modules</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs text-gray-600">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-1">
                  <span className="text-sm font-medium text-teal-700 hover:underline">
                    Start Course →
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}