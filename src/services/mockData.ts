export const MOCK_POST_CONTENT = `🔱 ForkToPost: Transform Your Code into Compelling Stories

This is a submission for the [DEV Weekend Challenge: Community](https://dev.to/challenges/weekend-2026-02-28)

## The Community
I built **ForkToPost** for the builders, the hackers, and the storytellers of the **DEV community**. Every weekend, dozens of incredible projects are born during challenges, but many of them never reach their full potential because writing a compelling submission takes time—time that we'd rather spend coding. I wanted to create a tool that acts as a "Technical Sentinel," helping developers articulate their value proposition, technical depth, and creative spark with the help of **Gemini AI**.

## What I Built
ForkToPost is an immersive, multimodal workspace designed to turn a GitHub URL into a winning DEV.to post. It doesn't just "summarize"—it weaves a narrative. 

- **AI-Powered Narrative**: Uses \`gemini-3-flash-preview\` to analyze repos.
- **Visual Metaphors**: Generates cinematic project covers via \`gemini-3.1-flash-image-preview\`.
- **Direct Pipeline**: Integrated **ImgBB** for image hosting and one-click publishing to **DEV.to** drafts.

## Demo
{% embed https://github.com/vero-code/forktopost %}

## How I Built It
The core of ForkToPost is built on the bleeding edge: **React 19**, **Vite**, and **Tailwind CSS 4**. The transition between the "Abyssal Sea" and "Enchanted Forest" themes is powered by **Motion**, creating a workspace that feels alive and reactive to the project's vibe.

## Architecture & Tech Deep Dive
The system follows a reactive, client-side heavy architecture:
- **Multimodal Gateway**: A unified service that parallelizes text and image generation.
- **Theming Engine**: A CSS-variable driven system that swaps entire visual identities (fonts, shaders, particles) instantly.
- **Secure Proxy**: A Vercel-based proxy layer to handle DEV.to API calls while bypassing CORS restrictions.

---

*This post was generated with [ForkToPost](https://github.com/vero-code/forktopost) — transform your repositories into compelling stories.*`;

export const MOCK_IMAGE_URL = "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop";
