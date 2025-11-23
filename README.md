# OCR J277/01 Essay Marker

An AI-powered revision tool for GCSE Computer Science students to practice and receive instant feedback on 8-mark extended response questions from OCR J277/01 Component 1 past papers.

## 🎯 Purpose

This tool helps students:
- Practice authentic 8-mark exam questions from past papers (2022-2024)
- Receive instant, accurate marking based on official OCR mark schemes
- Understand what they did well and where to improve
- Build confidence with extended response questions before their exams

## 🚀 Features

- **Authentic Questions**: Real past paper questions from June 2022, 2023, and 2024
- **Accurate Marking**: Uses Claude AI with official OCR mark schemes and examiner reports
- **Detailed Feedback**: Shows strengths, improvements needed, and compares to exemplar answers
- **Mark Band System**: Applies OCR's three-level marking (Low/Mid/High bands)
- **Instant Results**: No waiting - get feedback immediately

## 📋 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (Sonnet 4.5)
- **Deployment**: Vercel (serverless functions)
- **Version Control**: GitHub

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/))
- GitHub account
- Vercel account

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ocr-essay-marker
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment variables**

Create a `.env.local` file in the root directory:
```env
VITE_API_URL=http://localhost:5173/api/mark
ANTHROPIC_API_KEY=your-api-key-here
```

4. **Run the development server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Deployment to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Add environment variable: `ANTHROPIC_API_KEY`
- Click "Deploy"

3. **Done!** Your app will be live at `your-project.vercel.app`

## 📁 Project Structure

```
ocr-essay-marker/
├── api/
│   └── mark.js                 # Vercel serverless function for Claude API
├── public/
│   └── data/
│       ├── questions.json      # Question bank (2022-2024 papers)
│       └── markschemes.json    # Official mark schemes
├── src/
│   ├── components/
│   │   ├── QuestionSelector.jsx
│   │   ├── AnswerInput.jsx
│   │   ├── MarkingDisplay.jsx
│   │   └── Header.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local                  # Environment variables (not in git)
├── package.json
├── vite.config.js
└── README.md
```

## 🎓 How to Use (Student Instructions)

1. **Select a Question**: Choose from dropdown of past paper questions
2. **Read Carefully**: Understand what the question is asking
3. **Write Your Answer**: Type or paste your response (aim for ~150-200 words)
4. **Submit**: Click "Mark My Answer"
5. **Review Feedback**: 
   - See your marks (e.g., 6/8)
   - Read what you did well
   - Understand what was missing
   - Learn how to improve

## 📊 Question Bank

Currently includes:
- **June 2024 Q4**: Open source vs proprietary software licensing (8 marks)
- **June 2023 Q4**: AI in CCTV for shopping centres (8 marks)  
- **June 2022 Q4**: Social media content monitoring (8 marks)

More questions will be added over time.

## 🔒 Privacy & Data

- No student data is stored
- Answers are sent to Claude API for marking only
- No tracking or analytics
- Completely anonymous

## 🤝 Contributing

To add new questions:

1. Edit `public/data/questions.json`
2. Add corresponding mark scheme to `public/data/markschemes.json`
3. Test thoroughly before deploying

## 📝 License

For educational use only. OCR past paper questions remain copyright of OCR.

## 👨‍🏫 Teacher Notes

This is a **revision tool**, not a replacement for teaching. Use it:
- After teaching extended response technique
- For homework practice
- As exam preparation
- To identify common weaknesses

Always review AI marking with students - it's very good but not perfect!

## 🐛 Issues?

Contact your teacher or raise an issue on GitHub.

---

Built with ❤️ for GCSE Computer Science students
