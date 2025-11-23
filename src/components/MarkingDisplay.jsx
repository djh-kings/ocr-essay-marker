export default function MarkingDisplay({ marking, totalMarks, questionContext }) {
  const percentage = Math.round((marking.marks / totalMarks) * 100)
  
  // Determine grade colour using VisuLearn palette
  let gradeColor = 'bg-red-100 text-error border-error'
  if (percentage >= 88) gradeColor = 'bg-green-100 text-success border-success' // 7-8 marks
  else if (percentage >= 50) gradeColor = 'bg-yellow-100 text-warning border-warning' // 4-6 marks

  // Determine band display
  const bandLabel = marking.band.charAt(0).toUpperCase() + marking.band.slice(1)
  const bandEmoji = {
    high: '🌟',
    mid: '📈',
    low: '📝'
  }[marking.band]

  return (
    <div className="card mb-8 border-2 border-primary">
      <h2 className="text-2xl font-bold text-primary mb-6">Your Results</h2>

      {/* Score Display */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-8 text-white mb-6 shadow-visulearn">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-sm font-semibold mb-2">YOUR SCORE</p>
            <p className="text-6xl font-bold">{marking.marks}<span className="text-3xl text-blue-200">/{totalMarks}</span></p>
            <p className="text-blue-100 mt-2 text-lg">{percentage}% • {bandEmoji} {bandLabel} Band</p>
          </div>
          <div className="text-right">
            <div className={`inline-block px-6 py-3 rounded-lg ${gradeColor} border-2 font-bold text-2xl`}>
              {marking.marks >= 7 ? 'Grade 8-9' : marking.marks >= 5 ? 'Grade 6-7' : marking.marks >= 4 ? 'Grade 5' : 'Grade 3-4'}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="space-y-6">
        {/* Overall Feedback */}
        <div className="card-sm bg-blue-50 border-2 border-primary">
          <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
            <span className="text-xl">💬</span>
            Overall Feedback
          </h3>
          <p className="text-text-body leading-relaxed">{marking.feedback}</p>
        </div>

        {/* Strengths */}
        {marking.strengths && marking.strengths.length > 0 && (
          <div className="card-sm bg-green-50 border-2 border-success">
            <h3 className="font-bold text-success mb-3 flex items-center gap-2">
              <span className="text-xl">✅</span>
              What You Did Well
            </h3>
            <ul className="space-y-2">
              {marking.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 text-text-body">
                  <span className="text-success font-bold mt-0.5">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas for Improvement */}
        {marking.improvements && marking.improvements.length > 0 && (
          <div className="card-sm bg-orange-50 border-2 border-accent">
            <h3 className="font-bold text-accent mb-3 flex items-center gap-2">
              <span className="text-xl">📈</span>
              How to Improve Your Answer
            </h3>
            <ul className="space-y-2">
              {marking.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-3 text-text-body">
                  <span className="text-accent font-bold mt-0.5">→</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing Elements */}
        {marking.missingElements && marking.missingElements.length > 0 && (
          <div className="card-sm bg-purple-50 border-2 border-purple-400">
            <h3 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
              <span className="text-xl">🔍</span>
              Key Points You Missed
            </h3>
            <ul className="space-y-2">
              {marking.missingElements.map((element, index) => (
                <li key={index} className="flex items-start gap-3 text-text-body">
                  <span className="text-purple-600 font-bold mt-0.5">•</span>
                  <span>{element}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="mt-8 card-sm bg-background border-2 border-secondary">
        <h3 className="font-bold text-primary mb-3">📚 Next Steps for Revision</h3>
        <ul className="space-y-2 text-text-body text-sm">
          <li>• Review the mark scheme criteria for {questionContext}</li>
          <li>• Practice writing balanced answers that cover BOTH sides</li>
          <li>• Use the missing points above to improve your knowledge</li>
          <li>• Try the other past paper questions to build confidence</li>
          <li>• Discuss your answer with your teacher for further guidance</li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 card-sm bg-yellow-50 border-2 border-warning">
        <p className="text-sm text-text-body">
          <strong className="text-warning">⚠️ Remember:</strong> This AI marking is a guide to help your revision. 
          Always review your work with your teacher, and remember that in the real exam, 
          examiners will consider the full context of your response.
        </p>
      </div>
    </div>
  )
}
