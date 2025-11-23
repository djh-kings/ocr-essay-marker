export default function AnswerInput({ 
  answer, 
  onChange, 
  onSubmit, 
  onReset, 
  isLoading, 
  hasAnswer,
  wordCount 
}) {
  const targetWords = 150
  const maxWords = 250
  const percentageOfTarget = Math.min(100, (wordCount / targetWords) * 100)
  
  let wordCountColor = 'text-text-muted'
  if (wordCount >= targetWords && wordCount <= maxWords) {
    wordCountColor = 'text-success'
  } else if (wordCount > maxWords) {
    wordCountColor = 'text-warning'
  }

  return (
    <div>
      <label htmlFor="answer-input" className="block text-xl font-semibold text-text-body mb-4">
        Write Your Answer
      </label>
      
      <textarea
        id="answer-input"
        value={answer}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here... Aim for 150-200 words for an 8-mark question."
        className="w-full h-64 px-4 py-3 border-2 border-secondary rounded-lg focus:outline-none focus:border-accent transition-all resize-none font-sans text-text-body"
        disabled={isLoading}
      />

      <div className="mt-4 flex items-center justify-between">
        <div className="space-y-2">
          <p className={`text-sm font-semibold ${wordCountColor}`}>
            {wordCount} words
            {wordCount < targetWords && ` • Target: ${targetWords} words`}
            {wordCount >= targetWords && wordCount <= maxWords && ' • Good length!'}
            {wordCount > maxWords && ' • Consider being more concise'}
          </p>
          <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                wordCount >= targetWords ? 'bg-success' : 'bg-accent'
              }`}
              style={{ width: `${percentageOfTarget}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          {hasAnswer && !isLoading && (
            <button
              onClick={onReset}
              className="btn-secondary px-6 py-3 rounded-lg font-semibold"
            >
              Clear Answer
            </button>
          )}
          
          <button
            onClick={onSubmit}
            disabled={!hasAnswer || isLoading}
            className={`btn-primary px-8 py-3 rounded-lg font-bold text-white transition-all shadow-visulearn-sm ${
              !hasAnswer || isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:brightness-110'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Marking...
              </span>
            ) : (
              'Mark My Answer'
            )}
          </button>
        </div>
      </div>

      {wordCount > 0 && wordCount < 30 && (
        <p className="mt-3 text-sm text-warning font-semibold">
          Warning: Your answer is quite short. 8-mark questions typically require 150-200 words to fully address all criteria.
        </p>
      )}
    </div>
  )
}
