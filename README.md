# 🔱 ForkToPost

![Version](https://img.shields.io/badge/version-v1.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Google-4285F4?logo=google-gemini&logoColor=white)

**ForkToPost** is the ultimate submission generator for the [**DEV Weekend Challenge: Community**](https://dev.to/vero-code/from-code-to-connection-automating-the-story-of-our-craft-with-forktopost-3bla). It helps you transform your GitHub repository into a compelling story that captures the attention of the DEV.to community.

Whether you're struggling to articulate your value proposition or just want to craft a professional, witty, and scannable post, ForkToPost uses Google's **Gemini AI** to weave your code into a winning narrative.

![ForkToPost cinematic story example](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y6ewghwawujq8fdmkj64.png)

---

## 📺 Demo Video

Click to watch **ForkToPost** in action:

[![ForkToPost Demo Video](https://img.youtube.com/vi/ZlfC-FDkHB4/0.jpg)](https://youtu.be/ZlfC-FDkHB4)

---

## ✨ Features

⚡ Built for the Weekend: Designed specifically to help DEV Challenge participants meet tight deadlines without sacrificing quality.

- 🤖 **AI-Powered Narrative**: Leverages `gemini-3-flash-preview` to analyze your repository and generate structured Markdown.
  <br>![Gemini AI narrative generation interface](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aihc0zbp2fx2rw57ibzh.png)
- 🔗 **GitHub Integration**: Automatically fetch project names and README content by pasting a GitHub URL.
- 🎨 **Image Generation**: Create cinematic visual metaphors for your projects using `gemini-3.1-flash-image-preview`.
- 🖼️ **Image Hosting**: Automatically upload AI-generated images to **ImgBB** to ensure they appear as cover images on DEV.to.
- 🚀 **Direct Publish**: Publish your generated post directly as a **draft to DEV.to** with one click.
  <br>![Direct draft delivery to DEV.to dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w5p0l0x96454z68zfqh0.png)
- 👤 **Profile Verification**: Enter your API key to instantly see your DEV.to avatar and username, ensuring a secure and correct connection.
  <br>![DEV.to API profile synchronization](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eljgi53x03hf7ivus6ts.png)
- 🧠 **Advanced Writing Toggles**:
  - **Add Empathy**: Infuse your post with emotional resonance, focusing on the human struggle and the "aha!" moment.
  - **Architecture Deep-Dive**: Automatically generate a structured technical breakdown of your system.
- 🎭 **Immersive UI Themes**: Four distinct visual experiences to match your project's vibe:
  - 🌊 **Sea (Abyssal)**: A deep-sea, bioluminescent aesthetic with terminal-inspired elements.
  - 🌳 **Forest (Enchanted)**: A warm, parchment-style design that feels like reading an ancient scroll.
  - ⚡ **Technical (Terminal)**: A sleek, high-contrast dark mode for the minimalists.
  - 💻 **Original (Modern)**: A clean, standard professional interface.
- 📝 **Dual Modes**:
  - **Custom Fields**: Tailor every detail from target community to specific problems solved.
    <br>![Customizing AI parameters in ForkToPost](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xpw39kx0ip6hq6iz9j2s.png)
  - **Template Mode**: Paste a standard template and let the AI fill in the blanks. Supports automatic YouTube and Cloud Run embeds using Liquid tags (`{% embed %}`).
- 📋 **Stable Workspace**: A side-by-side layout that keeps your post preview centered while providing tools (copy, publish, etc.) in a stable right sidebar.
- 📋 **One-Click Copy**: Instantly copy your generated post and preview with a single click.
- 🛡️ **Attribution**: Every post includes a subtle credit footer: *Generated with ForkToPost*.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI**: [@google/genai](https://www.npmjs.com/package/@google/genai)
  - **Text**: `gemini-3-flash-preview`
  - **Vision/Image**: `gemini-3.1-flash-image-preview`
- **Image Hosting**: [ImgBB API](https://api.imgbb.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🏗️ Architecture

For a detailed deep-dive into the system design, data flow, and component breakdown, please refer to our [ARCHITECTURE.md](./ARCHITECTURE.md).

![ForkToPost system architecture blueprint](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/46gciyxw70n29bvaau95.png)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A Google AI (Gemini) API Key. Get one at [Google AI Studio](https://aistudio.google.com/).
- A DEV.to API Key (Optional, for direct publishing). Get one at [dev.to Settings > Extensions](https://dev.to/settings/extensions).
- An ImgBB API Key (Optional, for auto-uploading AI images). Get one at [api.imgbb.com](https://api.imgbb.com/).

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
   GEMINI_API_KEY=your_gemini_api_key_here
   MODEL_NAME_TEXT="gemini-3-flash-preview"
   MODEL_NAME_IMAGE="gemini-3.1-flash-image-preview"
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 🚀 Deployment (Vercel)

The easiest way to deploy **ForkToPost** is via [Vercel](https://vercel.com/):

1.  **Connect your GitHub Repository** to a new Vercel project.
2.  **Add Environment Variables**: In your project settings, add:
    *   `GEMINI_API_KEY`: Your Google AI Studio key.
    *   `MODEL_NAME_TEXT`: `gemini-3-flash-preview`
    *   `MODEL_NAME_IMAGE`: `gemini-3.1-flash-image-preview`
3.  **Vite Proxy**: The project includes a `vercel.json` file that automatically handles the API proxying for DEV.to, ensuring the direct publishing feature works in production.

---

## 🎭 The Alchemy (Themes)

![Original Modern UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gn49pm7xlbs34pxkgyad.png)

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

