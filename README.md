# AI Hiring Assistant

An intelligent web application that helps HR professionals analyze resumes against job descriptions using AI-powered insights.

## Features

- **Resume Upload**: Upload PDF resumes for analysis
- **Job Description Input**: Paste job descriptions for comparison
- **AI Analysis**: Get AI-powered match scores, candidate summaries, and interview emails
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI Integration**: Google Gemini API
- **PDF Processing**: pdf-parse
- **File Handling**: formidable

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Copy the key to your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload Resume**: Click "Choose File" and select a PDF resume
2. **Enter Job Description**: Paste the job description in the textarea
3. **Analyze**: Click "Analyze Resume" to get AI insights
4. **Review Results**: View the match score, candidate summary, and generated interview email
5. **Copy Email**: Use the copy button to copy the interview invitation email
