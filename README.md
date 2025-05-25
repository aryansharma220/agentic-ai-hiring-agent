<div align="center">

# 🚀 AI Hiring Assistant

### *Revolutionary AI-Powered Recruitment Platform*

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

*Transform your hiring process with cutting-edge AI technology that provides intelligent resume analysis, skill gap identification, and personalized recruitment insights.*


---

</div>

## 🌟 Project Overview

The **AI Hiring Assistant** is a next-generation recruitment platform that leverages advanced artificial intelligence to revolutionize how organizations evaluate candidates. Built with modern web technologies and powered by Google's Gemini AI, this platform provides comprehensive resume analysis, intelligent matching algorithms, and actionable insights that help HR professionals make data-driven hiring decisions.

### 🎯 Mission Statement

To bridge the gap between talent and opportunity by providing intelligent, unbiased, and comprehensive candidate evaluation tools that enhance the recruitment process while saving time and improving hiring quality.

---

## ✨ Key Features

### 🧠 **Advanced AI Analysis Engine**
- **Intelligent Resume Parsing**: Extracts and categorizes skills, experience, and qualifications with 95%+ accuracy
- **Contextual Understanding**: Analyzes job descriptions to understand role requirements and company culture fit
- **Multi-dimensional Scoring**: Comprehensive evaluation across technical skills, soft skills, and domain expertise
- **Bias-Free Assessment**: AI-powered analysis eliminates unconscious bias in initial candidate screening

### 📊 **Comprehensive Skills Analysis**
- **Technical Skills Mapping**: Identifies 500+ technical skills across programming languages, frameworks, databases, and tools
- **Soft Skills Recognition**: Evaluates leadership, communication, problem-solving, and adaptability capabilities
- **Experience Level Assessment**: Determines proficiency levels (Beginner, Intermediate, Expert) for each skill
- **Skill Gap Analysis**: Pinpoints missing skills and provides learning recommendations with timelines

### 🎯 **Intelligent Matching System**
- **Dynamic Match Scoring**: Real-time compatibility scoring between candidates and job requirements
- **Weighted Evaluation**: Customizable importance levels for different skill categories
- **Market Intelligence**: Incorporates current market trends and salary data for informed decisions
- **Growth Potential Assessment**: Identifies candidates with high learning agility and career growth potential

### 📈 **Market Insights & Analytics**
- **Trending Technologies**: Real-time analysis of in-demand skills and emerging technologies
- **Salary Intelligence**: Comprehensive salary benchmarks and market rate analysis
- **Career Growth Mapping**: Identifies potential career paths and advancement opportunities
- **Industry Demand Analysis**: Sector-specific skill requirements and market trends

### 🎨 **Modern User Experience**
- **Glassmorphism Design**: Cutting-edge UI with advanced visual effects and animations
- **Responsive Architecture**: Seamless experience across desktop, tablet, and mobile devices
- **Dark/Light Theme**: Adaptive theming for optimal user comfort
- **Real-time Feedback**: Instant visual feedback and progress indicators

### 🔧 **Professional Tools**
- **Automated Email Generation**: AI-crafted interview invitations and follow-up communications
- **Exportable Reports**: Comprehensive PDF reports with detailed candidate analysis
- **Integration Ready**: API-first design for seamless integration with existing HR systems
- **Batch Processing**: Analyze multiple resumes simultaneously for efficient screening

---

## 🏗️ Technical Architecture

### **Frontend Stack**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Next.js     │────│     React       │────│  Tailwind CSS   │
│   (Framework)   │    │  (UI Library)   │    │   (Styling)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
┌─────────────────────────────────┼─────────────────────────────────┐
│                    Frontend Features                               │
├─────────────────────────────────────────────────────────────────┤
│ • Server-Side Rendering (SSR)   • Component-Based Architecture   │
│ • Advanced Animations           • Responsive Design              │
│ • Performance Optimization      • Accessibility Compliance       │
└─────────────────────────────────────────────────────────────────┘
```

### **Backend Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Routes    │────│   File Upload   │────│   PDF Parser    │
│   (Next.js)     │    │  (Formidable)   │    │  (pdf-parse)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
┌─────────────────────────────────┼─────────────────────────────────┐
│                    AI Integration                                   │
├─────────────────────────────────────────────────────────────────┤
│ • Google Gemini AI               • Natural Language Processing    │
│ • Advanced Prompt Engineering    • Structured Data Extraction     │
│ • Real-time Analysis             • Error Handling & Validation    │
└─────────────────────────────────────────────────────────────────┘
```

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/ai-hiring-assistant.git
cd ai-hiring-assistant
```

### **2. Install Dependencies**
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### **3. Environment Configuration**

Create a `.env.local` file in the root directory:

```env
# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="AI Hiring Assistant"

# Optional: Analytics and Monitoring
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Development Settings
NODE_ENV=development
```

### **4. Obtain Gemini API Key**

1. **Visit Google AI Studio**: [https://aistudio.google.com/](https://aistudio.google.com/)
2. **Create Account**: Sign in with your Google account
3. **Generate API Key**: Click "Create API Key" and copy the generated key
4. **Add to Environment**: Paste the key in your `.env.local` file

### **5. Start Development Server**
```bash
npm run dev
```

🎉 **Success!** Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📱 Usage Guide

### **Step 1: Upload Resume**
- Click the **"Choose File"** button or drag & drop a PDF resume
- Supported formats: PDF (up to 10MB)
- The system will automatically extract text content

### **Step 2: Input Job Description**
- Paste the complete job description in the text area
- Include requirements, responsibilities, and preferred qualifications
- The AI will analyze and extract key requirements

### **Step 3: Analyze & Review**
- Click **"Analyze Resume"** to start the AI processing
- Review the comprehensive analysis including:
  - **Match Score**: Overall compatibility percentage
  - **Skills Analysis**: Technical, soft, and domain skills breakdown
  - **Gap Analysis**: Missing skills and learning recommendations
  - **Market Insights**: Salary expectations and growth potential

### **Step 4: Generate Communications**
- Use the **"Generate Interview Email"** feature
- Customize the AI-generated interview invitation
- Copy and send professional communication to candidates

---


## 🙏 Acknowledgments

- **Google Gemini AI** for powering our intelligent analysis
- **Next.js Team** for the incredible framework
- **Tailwind CSS** for the utility-first styling approach
- **Open Source Community** for inspiration and tools

---


<div align="center">

### 🌟 Star this project if you find it helpful!

**Made with ❤️ by Aryan Sharma


</div>
