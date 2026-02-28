# 🏗️ ForkToPost Architecture

This document outlines the architectural design and technical decisions of the **ForkToPost** project.

## 📌 High-Level Overview

ForkToPost is a client-side heavy React application that utilizes Google's Gemini AI to assist developers in creating submission posts for the DEV.to community. The application provides an immersive, themed environment with multimodal capabilities, generating both text and visual assets.

## 🗺️ System Design

The application follows a multimodal generation flow:

```mermaid
graph TD
    User([User]) -->|Input Project Data| Form[SubmissionForm]
    Form -->|SubmissionData| API[Gemini Service]
    
    subgraph AI Generation
        API -->|Text Prompt| GeminiText[Gemini 3 Flash]
        API -->|Vision Prompt| GeminiImage[Gemini 3.1 Flash Image]
        GeminiText -->|Markdown| Result
        GeminiImage -->|Base64 Image| Result
    end

    Result[GenerationResult] --> Preview[PostPreview]
    Preview -->|Copy Content| Clipboard([Clipboard])
    
    subgraph Themes
        App[App.tsx] -.->|Theme State| CSS[CSS Variables]
        CSS -.->|Apply Styles| UI[React Components]
        App -.->|Particles| Effects[Motion Effects]
    end
```

## 🏗️ Component Breakdown

### 1. `App.tsx` (The Orchestrator)
- Manages global state: theme, loading status, and generated artifacts (text/image).
- Orchestrates particle effects and background shaders via `motion` and custom CSS.
- Handles theme persistence in `localStorage`.

### 2. `SubmissionForm.tsx` (Data Capture)
- **Dual Modes**: Supports `custom` (field-based) and `template` (README-based).
- **Advanced Flags**:
    - `addEmpathy`: Triggers a tone override in the AI prompt for emotional resonance.
    - `includeArchitecture`: Requests a structured technical deep-dive in the output.
    - `generateImage`: Enables the parallel image generation flow.
- **Template Logic**: Automatically wraps YouTube and Cloud Run URLs in Liquid tags (`{% embed %}`).

### 3. `geminiService.ts` (Multimodal Integration)
- Interfaces with `@google/genai` using two specific models:
    - **Text**: `gemini-3-flash-preview` handles the narrative and layout.
    - **Image**: `gemini-3.1-flash-image-preview` generates cinematic visual metaphors.
- **Prompt Engineering**: Dynamically constructs instructions for tone, structure, and scannability.
- **Attribution**: Appends a project credit footer to every generated post.

### 4. `PostPreview.tsx` (Presentation)
- Renders Markdown via `react-markdown` with GFM support.
- Displays generated cover images with themed metadata overlays.
- Provides a themed "Success" interface with clipboard synchronization.

## 🎨 Theming System

The system leverages CSS Variables and the `data-theme` attribute.
- **Visuals**: Themes like `Sea` and `Forest` use custom SVG filters (caustics) and dynamic particle systems.
- **Typography**: Each theme defines its own font stack (Display, Serif, Mono).
- **Styling**: Tailwind CSS 4 utility classes react to theme-specific color tokens.

## 🛠️ Tech Stack Decisions

- **React 19**: Chosen for high-performance rendering and modern hooks.
- **Google Gemini 3 (Flash)**: Selected for lightning-fast text generation and cost efficiency.
- **Google Gemini 3.1 (Flash Image)**: Provides high-quality visual metaphors for software projects.
- **Motion**: Powers micro-animations and immersive background interactions.
- **Tailwind CSS 4**: Modernized JIT styling system.

## ⚙️ Environment Configuration

The following variables are required for full functionality:

- `GEMINI_API_KEY`: Your Google AI Studio API Key.
- `MODEL_NAME_TEXT`: Set to `gemini-3-flash-preview`.
- `MODEL_NAME_IMAGE`: Set to `gemini-3.1-flash-image-preview`.
- `APP_URL`: The deployment URL for linking purposes.

> Never commit your .env file to version control.