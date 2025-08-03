import { Award, GraduationCap } from "lucide-react"

interface CertificateProps {
  studentName: string
  courseName: string
  score: number
  date: string
}

export function Certificate({ studentName, courseName, score, date }: CertificateProps) {
  return (
    <div className="bg-white border-4 border-blue-600 rounded-lg p-8 text-center shadow-lg">
      <div className="border-2 border-blue-200 rounded-lg p-6">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 rounded-full p-3">
            <Award className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-blue-600 mb-2">CERTIFICATE OF COMPLETION</h1>

        <div className="flex items-center justify-center space-x-2 mb-6">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-semibold text-gray-800">MM Institute</span>
        </div>

        <p className="text-gray-600 mb-4">This is to certify that</p>

        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">{studentName}</h2>

        <p className="text-gray-600 mb-2">has successfully completed</p>

        <h3 className="text-lg font-semibold text-blue-600 mb-4">{courseName}</h3>

        <p className="text-gray-600 mb-4">
          with a score of <span className="font-bold text-green-600">{score}%</span>
        </p>

        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
          <div className="text-left">
            <p className="text-sm text-gray-500">Date of Completion</p>
            <p className="font-semibold">{date}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Authorized by</p>
            <p className="font-semibold">MM Institute</p>
          </div>
        </div>
      </div>
    </div>
  )
}
