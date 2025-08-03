"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Award, Download, Home, RotateCcw } from "lucide-react"
import Link from "next/link"
import { Certificate } from "@/components/certificate"

export default function ResultsPage() {
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const savedScore = localStorage.getItem("quizScore")
    const savedTotal = localStorage.getItem("totalQuestions")

    if (savedScore && savedTotal) {
      const scoreNum = Number.parseInt(savedScore)
      const totalNum = Number.parseInt(savedTotal)
      const percentageNum = Math.round((scoreNum / totalNum) * 100)

      setScore(scoreNum)
      setTotalQuestions(totalNum)
      setPercentage(percentageNum)
      setPassed(percentageNum >= 60)
    }
  }, [])

  const handleDownloadCertificate = () => {
    // In a real application, this would generate and download a PDF certificate
    const certificateData = {
      studentName: "Student Name", // In real app, get from user input or profile
      courseName: "General Knowledge Quiz",
      score: percentage,
      date: new Date().toLocaleDateString(),
      institute: "MM Institute",
    }

    // For demo purposes, we'll show an alert
    alert(`Certificate would be downloaded for ${certificateData.studentName} with ${certificateData.score}% score`)
  }

  const getResultMessage = () => {
    if (percentage >= 90) return "Excellent! Outstanding performance!"
    if (percentage >= 80) return "Great job! Very good performance!"
    if (percentage >= 70) return "Good work! Nice performance!"
    if (percentage >= 60) return "Well done! You passed the quiz!"
    return "Keep learning! You can retake the quiz."
  }

  const getResultColor = () => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-blue-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">MM Institute</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Quiz Results</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Results Card */}
          <Card>
            <CardHeader className="text-center">
              <div className={`text-6xl font-bold mb-4 ${getResultColor()}`}>{percentage}%</div>
              <CardTitle className="text-2xl">{passed ? "Congratulations!" : "Keep Learning!"}</CardTitle>
              <CardDescription className="text-lg">{getResultMessage()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-600">{totalQuestions - score}</div>
                  <div className="text-sm text-gray-600">Incorrect Answers</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Certificate Status</span>
                </div>
                <p className="text-yellow-700 text-sm">
                  {passed
                    ? "You've earned a certificate! Download it below."
                    : "Score 60% or higher to earn a certificate. You can retake the quiz."}
                </p>
              </div>

              <div className="space-y-3">
                {passed && (
                  <Button onClick={handleDownloadCertificate} className="w-full" size="lg">
                    <Download className="h-5 w-5 mr-2" />
                    Download Certificate
                  </Button>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <Link href="/quiz">
                    <Button variant="outline" className="w-full bg-transparent">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retake Quiz
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Preview */}
          {passed && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Certificate Preview</CardTitle>
                <CardDescription className="text-center">Your achievement certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <Certificate
                  studentName="Student Name"
                  courseName="General Knowledge Quiz"
                  score={percentage}
                  date={new Date().toLocaleDateString()}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Performance Breakdown */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Detailed breakdown of your quiz performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-xl font-bold text-blue-600">{totalQuestions}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-xl font-bold text-red-600">{totalQuestions - score}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-xl font-bold text-purple-600">{percentage}%</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
