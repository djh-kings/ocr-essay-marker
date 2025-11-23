export default function QuestionSelector({ questions, selectedQuestion, onQuestionChange }) {
  if (!questions || questions.length === 0) {
    return (
      <div className="card-sm">
        <p className="text-text-muted">Loading questions...</p>
      </div>
    )
  }

  return (
    <div>
      <label htmlFor="question-select" className="block text-xl font-semibold text-text-body mb-4">
        Select Your Question
      </label>
      
      <select
        id="question-select"
        value={selectedQuestion?.id || ''}
        onChange={(e) => onQuestionChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-secondary rounded-lg focus:outline-none focus:border-accent transition-colors text-text-body bg-white"
      >
        {questions.map(q => (
          <option key={q.id} value={q.id}>
            {q.year} {q.month} - Q{q.questionNumber}: {q.context} ({q.marks} marks)
          </option>
        ))}
      </select>

      {selectedQuestion && (
        <div className="mt-6 p-6 bg-blue-50 rounded-xl border-2 border-primary">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-primary mb-1">
                {selectedQuestion.paper} • {selectedQuestion.month} {selectedQuestion.year} • Question {selectedQuestion.questionNumber}
              </p>
              <p className="text-sm text-text-muted">
                Topic: {selectedQuestion.topic} • {selectedQuestion.marks} marks • {selectedQuestion.timeAllocation}
              </p>
            </div>
            <span className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
              {selectedQuestion.marks} marks
            </span>
          </div>
          
          <div className="prose prose-sm max-w-none">
            <p className="text-text-body whitespace-pre-line leading-relaxed">
              {selectedQuestion.question}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
