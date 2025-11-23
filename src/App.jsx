import { useState, useEffect } from 'react'
import Header from './components/Header'
import QuestionSelector from './components/QuestionSelector'
import AnswerInput from './components/AnswerInput'
import MarkingDisplay from './components/MarkingDisplay'

function App() {
  const [questions, setQuestions] = useState([])
  const [markSchemes, setMarkSchemes] = useState({})
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [answer, setAnswer] = useState('')
  const [marking, setMarking] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [attemptedQuestions, setAttemptedQuestions] = useState(new Set())

  // Load questions and mark schemes on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [questionsRes, markSchemesRes] = await Promise.all([
          fetch('/data/questions.json'),
          fetch('/data/markschemes.json')
        ])
        
        const questionsData = await questionsRes.json()
        const markSchemesData = await markSchemesRes.json()
        
        // Convert mark schemes array to object for easy lookup
        const schemesMap = {}
        markSchemesData.forEach(scheme => {
          schemesMap[scheme.id] = scheme
        })
        
        setQuestions(questionsData)
        setMarkSchemes(schemesMap)
        
        // Auto-select first question
        if (questionsData.length > 0) {
          setSelectedQuestion(questionsData[0])
        }
      } catch (err) {
        console.error('Failed to load data:', err)
        setError('Failed to load questions. Please refresh the page.')
      }
    }
    
    loadData()
  }, [])

  const handleQuestionChange = (questionId) => {
    const question = questions.find(q => q.id === questionId)
    setSelectedQuestion(question)
    setAnswer('')
    setMarking(null)
    setError(null)
  }

  const handleAnswerChange = (newAnswer) => {
    setAnswer(newAnswer)
  }

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError('Please write an answer before submitting.')
      return
    }

    if (answer.trim().split(/\s+/).length < 30) {
      setError('Your answer seems quite short. Extended responses typically need 100-200 words. Are you sure you want to submit?')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answer: answer,
          question: selectedQuestion,
          markScheme: markSchemes[selectedQuestion.id]
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to mark answer')
      }

      const result = await response.json()
      setMarking(result)
      
      // Track that this question has been attempted
      setAttemptedQuestions(prev => new Set([...prev, selectedQuestion.id]))
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('marking-results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)

    } catch (err) {
      console.error('Marking error:', err)
      setError(`Failed to mark your answer: ${err.message}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setAnswer('')
    setMarking(null)
    setError(null)
  }

  const handleTryAgain = () => {
    setMarking(null)
    // Scroll back to answer input
    setTimeout(() => {
      document.getElementById('answer-input')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      document.getElementById('answer-input')?.focus()
    }, 100)
  }

  const handleNewQuestion = () => {
    // Move to next question or first if at end
    const currentIndex = questions.findIndex(q => q.id === selectedQuestion.id)
    const nextIndex = (currentIndex + 1) % questions.length
    setSelectedQuestion(questions[nextIndex])
    setAnswer('')
    setMarking(null)
    setError(null)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-10 py-10">
        <Header />
        
        <main id="main-content" className="bg-white rounded-2xl shadow-visulearn p-8 mb-8">
          {/* NEW: Progress Tracker */}
          {questions.length > 0 && (
            <div className="mb-8 p-4 bg-background rounded-xl border-2 border-secondary">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-text-body uppercase tracking-wide">Your Progress</h3>
                <span className="text-sm font-semibold text-primary">
                  {attemptedQuestions.size} / {questions.length} Questions Attempted
                </span>
              </div>
              <div className="flex gap-2">
                {questions.map((q, index) => (
                  <div
                    key={q.id}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      attemptedQuestions.has(q.id)
                        ? 'bg-success'
                        : q.id === selectedQuestion?.id
                        ? 'bg-accent'
                        : 'bg-secondary'
                    }`}
                    title={`${q.year} ${q.month} Q${q.questionNumber}`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-text-muted">
                <span>Completed</span>
                <span>Current</span>
                <span>Not Started</span>
              </div>
            </div>
          )}

          {/* Instructions */}
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-text-body mb-4">How to Use This Tool</h3>
            <ol className="space-y-2 text-text-body">
              <li><strong>1.</strong> Select a question from the dropdown below</li>
              <li><strong>2.</strong> Read the question carefully and plan your answer</li>
              <li><strong>3.</strong> Write your response (aim for 150-200 words)</li>
              <li><strong>4.</strong> Click "Mark My Answer" to get instant feedback</li>
              <li><strong>5.</strong> Review your marks and learn how to improve</li>
            </ol>
            <p className="text-sm text-text-muted mt-4">
              <strong>Tip:</strong> This is a revision tool - use it alongside your class notes and past exam practice.
            </p>
          </section>

          <hr className="border-secondary my-8" />

          {/* Question Selection */}
          <section className="mb-8">
            <QuestionSelector
              questions={questions}
              selectedQuestion={selectedQuestion}
              onQuestionChange={handleQuestionChange}
            />
          </section>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-2 border-error rounded-xl p-4 mb-6">
              <p className="text-error font-semibold">{error}</p>
            </div>
          )}

          {/* Answer Input */}
          {selectedQuestion && (
            <section className="mb-8">
              <AnswerInput
                answer={answer}
                onChange={handleAnswerChange}
                onSubmit={handleSubmit}
                onReset={handleReset}
                isLoading={isLoading}
                hasAnswer={answer.trim().length > 0}
                wordCount={answer.trim().split(/\s+/).filter(w => w.length > 0).length}
              />
            </section>
          )}
        </main>

        {/* Marking Results */}
        {marking && (
          <div id="marking-results">
            <MarkingDisplay
              marking={marking}
              totalMarks={selectedQuestion.marks}
              questionContext={selectedQuestion.context}
              wordCount={answer.trim().split(/\s+/).filter(w => w.length > 0).length}
              onTryAgain={handleTryAgain}
              onNewQuestion={handleNewQuestion}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-text-muted mt-8">
          <p>OCR J277/01 Essay Marker • VisuLearn Design System</p>
          <p className="mt-2">Questions © OCR • For revision purposes only</p>
          <p className="mt-1">AI marking is a guide - always review with your teacher</p>
        </footer>
      </div>
    </div>
  )
}

export default App
