export default function MarkingDisplay({ marking, totalMarks, questionContext, wordCount, onTryAgain, onNewQuestion }) {
  const percentage = Math.round((marking.marks / totalMarks) * 100)
  
  // Determine grade colour using VisuLearn palette
  let gradeColor = 'bg-red-100 text-error border-error'
  if (percentage >= 88) gradeColor = 'bg-green-100 text-success border-success' // 7-8 marks
  else if (percentage >= 50) gradeColor = 'bg-yellow-100 text-warning border-warning' // 4-6 marks

  // Determine band display
  const bandLabel = marking.band.charAt(0).toUpperCase() + marking.band.slice(1)

  // Encouraging messages based on band
  const encouragementMessages = {
    high: "Excellent work! You've demonstrated strong understanding and exam technique.",
    mid: "Good effort! You're on the right track. With a bit more detail and balance, you could reach the top band.",
    low: "You've made a start! Focus on the improvements below, add more detail, and you could easily boost this to 4-6 marks."
  }

  // Word count analysis - IMPROVED LOGIC
  const targetWords = 150
  const maxWords = 250
  const wordCoverage = Math.min(100, Math.round((wordCount / targetWords) * 100)) // Cap at 100%
  
  // Better status messages
  let wordCountStatus = ''
  let wordCountColor = ''
  
  if (wordCount < 100) {
    wordCountStatus = 'Too Short'
    wordCountColor = 'text-error'
  } else if (wordCount < 150) {
    wordCountStatus = 'Needs More'
    wordCountColor = 'text-warning'
  } else if (wordCount >= 150 && wordCount <= 250) {
    wordCountStatus = 'Good Length'
    wordCountColor = 'text-success'
  } else if (wordCount > 250 && wordCount <= 300) {
    wordCountStatus = 'Slightly Long'
    wordCountColor = 'text-warning'
  } else {
    wordCountStatus = 'Too Long'
    wordCountColor = 'text-error'
  }

  return (
    <div className="card mb-8 border-2 border-primary">
      <h2 className="text-2xl font-bold text-primary mb-6">Your Results</h2>

      {/* Score Display - IMPROVED VISIBILITY */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-10 text-white mb-6 shadow-visulearn">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-blue-200 text-sm font-semibold mb-3 uppercase tracking-wide">YOUR SCORE</p>
            <p className="text-8xl font-extrabold text-white leading-none">{marking.marks}<span className="text-4xl text-blue-200 font-bold">/{totalMarks}</span></p>
            <p className="text-blue-100 mt-4 text-xl font-semibold">{percentage}% - {bandLabel} Band</p>
          </div>
          <div className="text-right">
            <div className={`inline-block px-8 py-4 rounded-xl ${gradeColor} border-2 font-bold text-3xl shadow-lg`}>
              {marking.marks >= 7 ? 'Grade 8/9' : marking.marks >= 5 ? 'Grade 6/7' : marking.marks >= 4 ? 'Grade 5' : 'Grade 3/4'}
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Answer Statistics - IMPROVED */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card-sm bg-background border-2 border-secondary text-center">
          <p className="text-text-muted text-sm font-semibold mb-1">WORD COUNT</p>
          <p className={`text-3xl font-bold ${wordCountColor}`}>{wordCount}</p>
          <p className="text-xs text-text-muted mt-1">{wordCountStatus}</p>
        </div>
        <div className="card-sm bg-background border-2 border-secondary text-center">
          <p className="text-text-muted text-sm font-semibold mb-1">TARGET</p>
          <p className="text-3xl font-bold text-text-body">150-200</p>
          <p className="text-xs text-text-muted mt-1">words</p>
        </div>
        <div className="card-sm bg-background border-2 border-secondary text-center">
          <p className="text-text-muted text-sm font-semibold mb-1">TARGET MET</p>
          <p className={`text-3xl font-bold ${wordCountColor}`}>
            {wordCount >= 150 && wordCount <= 250 ? 'Yes' : 'No'}
          </p>
          <p className="text-xs text-text-muted mt-1">
            {wordCount < 150 ? `Need ${150 - wordCount} more` : wordCount > 250 ? `${wordCount - 250} over` : 'Good range'}
          </p>
        </div>
      </div>

      {/* NEW: Encouragement Message */}
      <div className="card-sm bg-blue-50 border-2 border-primary mb-6">
        <p className="text-primary font-semibold text-lg">{encouragementMessages[marking.band]}</p>
      </div>

      {/* Feedback Section */}
      <div className="space-y-6">
        {/* Overall Feedback - IMPROVED FORMATTING */}
        <div className="card-sm bg-blue-50 border-2 border-primary">
          <h3 className="font-bold text-primary mb-3 text-lg">
            Overall Feedback
          </h3>
          <div className="text-text-body leading-relaxed space-y-2">
            {marking.feedback.split('. ').map((sentence, index, array) => (
              sentence.trim() && (
                <p key={index} className="text-base">
                  {sentence.trim()}{index < array.length - 1 ? '.' : ''}
                </p>
              )
            ))}
          </div>
        </div>

        {/* Strengths */}
        {marking.strengths && marking.strengths.length > 0 && (
          <div className="card-sm bg-green-50 border-2 border-success">
            <h3 className="font-bold text-success mb-3 text-lg">
              What You Did Well
            </h3>
            <ul className="space-y-3">
              {marking.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 text-text-body">
                  <span className="text-success font-bold mt-0.5 text-lg">✓</span>
                  <span className="text-base">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas for Improvement */}
        {marking.improvements && marking.improvements.length > 0 && (
          <div className="card-sm bg-orange-50 border-2 border-accent">
            <h3 className="font-bold text-accent mb-3 text-lg">
              How to Improve Your Answer
            </h3>
            <ul className="space-y-3">
              {marking.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-3 text-text-body">
                  <span className="text-accent font-bold mt-0.5 text-lg">→</span>
                  <span className="text-base">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Missing Elements - ALWAYS SHOW IF PRESENT */}
        {marking.missingElements && marking.missingElements.length > 0 && (
          <div className="card-sm bg-purple-50 border-2 border-purple-400">
            <h3 className="font-bold text-purple-700 mb-3 text-lg">
              Key Points You Missed
            </h3>
            <p className="text-sm text-purple-700 mb-3 font-semibold">
              Including these points could have significantly improved your mark:
            </p>
            <ul className="space-y-3">
              {marking.missingElements.map((element, index) => (
                <li key={index} className="flex items-start gap-3 text-text-body">
                  <span className="text-purple-600 font-bold mt-0.5 text-lg">•</span>
                  <span className="text-base">{element}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="mt-8 card-sm bg-background border-2 border-secondary">
        <h3 className="font-bold text-primary mb-3">Next Steps for Revision</h3>
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
          <strong className="text-warning">Remember:</strong> This AI marking is a guide to help your revision. 
          Always review your work with your teacher, and remember that in the real exam, 
          examiners will consider the full context of your response.
        </p>
      </div>

      {/* NEW: Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={onTryAgain}
          className="btn-secondary flex-1 px-6 py-4 rounded-lg font-bold text-lg"
        >
          Revise and Resubmit
        </button>
        <button
          onClick={onNewQuestion}
          className="btn-primary flex-1 px-6 py-4 rounded-lg font-bold text-lg"
        >
          Try Another Question
        </button>
      </div>
    </div>
  )
}
