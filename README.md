# 🔱 ForkToPost

![Version](https://img.shields.io/badge/version-v0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Google-4285F4?logo=google-gemini&logoColor=white)

**ForkToPost** is the ultimate submission generator for the **DEV Weekend Challenge: Community**. It helps you transform your GitHub repository into a compelling story that captures the attention of the DEV.to community.

Whether you're struggling to articulate your value proposition or just want to craft a professional, witty, and scannable post, ForkToPost uses Google's **Gemini AI** to weave your code into a winning narrative.

---

## ✨ Features

- 🤖 **AI-Powered Narrative**: Leverages Gemini-3.1-pro-preview to analyze your repository and generate structured Markdown.
- 🎨 **Immersive UI Themes**: Four distinct visual experiences to match your project's vibe:
  - 🌊 **Sea (Abyssal)**: A deep-sea, bioluminescent aesthetic with terminal-inspired elements.
  - 🌳 **Forest (Enchanted)**: A warm, parchment-style design that feels like reading an ancient scroll.
  - ⚡ **Technical (Terminal)**: A sleek, high-contrast dark mode for the minimalists.
  - 💻 **Original (Modern)**: A clean, standard professional interface.
- 📝 **Dual Modes**:
  - **Custom Fields**: Tailor every detail from target community to specific problems solved.
  - **Template Mode**: Paste a standard template and let the AI fill in the blanks based on your README.
- 📋 **One-Click Copy**: Instantly copy your generated post to your clipboard, ready for DEV.to.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini API)
- [animations]: [Motion](https://motion.dev/)
- [icons]: [Lucide React](https://lucide.dev/)

---

## 🏗️ Architecture

For a detailed deep-dive into the system design, data flow, and component breakdown, please refer to our [ARCHITECTURE.md](file:///c:/Users/sf/projects/forktopost/ARCHITECTURE.md).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A Google AI (Gemini) API Key. Get one at [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/forktopost.git
   cd forktopost
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 🎭 The Alchemy (Themes)

| Theme | Aesthetic | Vibe |
| :--- | :--- | :--- |
| **Sea** | Bioluminescent Abyss | "Submerged in the technical void." |
| **Forest** | Ancient Wood | "Code blossoms into stories." |
| **Technical** | Cybernetic Grid | "01_Technical_Submission_Protocol_Active." |
| **Original** | Minimalist Modern | "The ultimate DEV submission generator." |

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Made with ✨ (and Gemini) for the DEV.to Community.*

