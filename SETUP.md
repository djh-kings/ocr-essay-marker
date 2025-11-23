# Complete Setup Guide for OCR Essay Marker

This guide will walk you through setting up and deploying your OCR J277/01 Essay Marker application **from scratch**. Don't worry - I'll explain every step!

---

## 📦 What You'll Need

1. **GitHub Account** ([sign up here](https://github.com/join))
2. **Vercel Account** ([sign up here](https://vercel.com/signup))
3. **Anthropic API Key** ([get one here](https://console.anthropic.com/))
4. **Node.js installed** on your computer ([download here](https://nodejs.org/))

---

## 🚀 Step-by-Step Setup

### Step 1: Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Click on "API Keys" in the left menu
4. Click "Create Key"
5. Give it a name like "OCR Essay Marker"
6. **Copy the key** - you'll need it later!
7. You get $5 free credit to start

---

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the green "New" button (top left)
3. Repository name: `ocr-essay-marker`
4. Description: "AI-powered marking for OCR J277/01 8-mark questions"
5. **Select "Public"** (or Private if you prefer)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"
8. **Keep this page open** - you'll need it in Step 4

---

### Step 3: Set Up Your Local Project

Open Terminal (Mac/Linux) or Command Prompt (Windows) and run these commands:

```bash
# Navigate to where you want to store the project
cd ~/Desktop  # or wherever you like

# Create project folder
mkdir ocr-essay-marker
cd ocr-essay-marker

# Copy all the files I created for you into this folder
# (You'll need to move the files from /home/claude/ocr-essay-marker/ to your project folder)

# Install dependencies
npm install
```

---

### Step 4: Configure Environment Variables

1. In your project folder, create a file called `.env.local`
2. Add this content (replace with YOUR actual API key):

```env
ANTHROPIC_API_KEY=sk-ant-xxxxx-your-actual-key-here
```

**⚠️ IMPORTANT:** Never commit `.env.local` to GitHub! It's already in `.gitignore` to protect your API key.

---

### Step 5: Test Locally

```bash
# Start the development server
npm run dev
```

You should see:
```
  VITE v6.0.3  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open `http://localhost:5173/` in your browser.

**Test it:**
1. Select a question
2. Write a short answer
3. Click "Mark My Answer"
4. You should see results!

If it works locally, you're ready to deploy!

---

### Step 6: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: OCR Essay Marker v1.0"

# Connect to your GitHub repository (replace with YOUR repo URL)
git remote add origin https://github.com/YOUR-USERNAME/ocr-essay-marker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Refresh your GitHub repository page - you should see all your files!

---

### Step 7: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click "Add New Project"
3. Click "Import Git Repository"
4. Select your `ocr-essay-marker` repository
5. Vercel will auto-detect it's a Vite project ✅
6. **CRITICAL:** Click "Environment Variables"
7. Add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-xxxxx` (your actual API key)
8. Click "Deploy"

Wait 1-2 minutes...

🎉 **Your app is now live!**

Vercel will give you a URL like: `https://ocr-essay-marker.vercel.app`

---

## ✅ Testing Your Live App

1. Go to your Vercel URL
2. Select "2024 June - Q4: Computer game development"
3. Write a test answer like:

```
The programmer should consider both open source and proprietary licensing. 
Open source means the code is freely available and anyone can modify it. 
This would give the game a wider audience and allow community improvements. 
However, the programmer wouldn't earn money directly from sales. 

Proprietary licensing means the code is protected and users must pay to use it. 
This would generate income for the programmer and protect their work. 
However, it would limit the audience to paying customers only.

For a game, I would recommend proprietary licensing because the programmer 
can earn money from their work, which is important for sustainability.
```

4. Click "Mark My Answer"
5. You should get detailed feedback with a mark out of 8!

---

## 🔧 Troubleshooting

### "Failed to mark answer"
- Check your API key is correct in Vercel environment variables
- Check you have API credits remaining at console.anthropic.com

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` and run `npm install` fresh

### Questions not loading
- Check the `/public/data/` files are in your repository
- Look at browser console for errors (F12)

### Local server won't start
- Make sure no other app is using port 5173
- Try `npx vite --port 3000` to use a different port

---

## 📱 Sharing with Students

Once deployed, you can:

1. Share the Vercel URL with students
2. Add it to your school VLE/Teams
3. Create a QR code for easy access
4. Embed it in an iframe on your school website

---

## 🔄 Making Updates

When you want to add new questions or make changes:

```bash
# 1. Edit the files locally

# 2. Test changes
npm run dev

# 3. Commit and push
git add .
git commit -m "Added new question for 2025"
git push

# Vercel automatically redeploys!
```

---

## 💰 API Costs

Anthropic charges per token:
- Claude Sonnet 4.5: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- Each marking uses ~1,500-2,000 tokens total
- **Estimate:** 500-1000 student submissions per $10

Your free $5 credit gives you ~250-500 markings to start!

---

## 🆘 Need Help?

If you get stuck:

1. Check the error message carefully
2. Look in browser console (F12 → Console tab)
3. Check Vercel deployment logs
4. Contact me with specific error messages

---

## 🎓 You're Done!

Your OCR Essay Marker is now:
- ✅ Live on the internet
- ✅ Using authentic OCR questions
- ✅ Applying official mark schemes
- ✅ Providing instant feedback to students
- ✅ Ready for revision sessions!

Happy teaching! 🎉
