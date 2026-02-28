import React, { useState } from 'react';
import { type SubmissionData } from '../services/geminiService';
import { Loader2, Anchor, Scroll, Zap, Monitor } from 'lucide-react';

interface SubmissionFormProps {
  onSubmit: (data: SubmissionData) => void;
  isLoading: boolean;
  theme: 'original' | 'tech' | 'forest' | 'sea';
}

const DEFAULT_TEMPLATE = `*This is a submission for the [DEV Weekend Challenge: Community](https://dev.to/challenges/weekend-2026-02-28)*

## The Community
<!-- Tell us about the community you built this for -->

## What I Built
<!-- Give us an overview of your app -->

## Demo
<!-- Share a video demo or link to your project -->

## Code
<!-- Show us the code! You can embed a GitHub repo directly into your post. -->

## How I Built It
<!-- Tell us about the technologies you used -->

<!-- Team Submissions: Please pick one member to publish the submission and credit teammates by listing their DEV usernames directly in the body of the post. -->

<!-- Thanks for participating! -->`;

export default function SubmissionForm({ onSubmit, isLoading, theme }: SubmissionFormProps) {
  const [formData, setFormData] = useState<SubmissionData>({
    mode: 'custom',
    repoName: '',
    techStack: '',
    summary: '',
    targetCommunity: '',
    problemSolved: '',
    projectLink: '',
    demoLink: '',
    template: DEFAULT_TEMPLATE,
    youtubeUrl: '',
    cloudRunUrl: '',
    generateImage: false,
    addEmpathy: false,
    includeArchitecture: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = theme === 'sea' ? "w-full bg-cyan-950/20 border-b border-biolume/30 focus:border-biolume focus:ring-0 font-display text-lg tracking-[0.1em] text-biolume placeholder-biolume/20 py-3 transition-all duration-500" :
                    theme === 'forest' ? "w-full bg-transparent border-b-2 border-[#8b4513]/20 focus:border-[#4a5d23] focus:ring-0 font-serif text-lg italic text-[#4a3728] placeholder-[#8b7355]/50 py-2 transition-colors" :
                    theme === 'tech' ? "w-full bg-black/20 border border-[#2D3139] focus:border-[#FF5C00] focus:ring-0 font-mono text-sm text-white placeholder-[#8B949E]/30 p-3 transition-all" :
                    "w-full bg-slate-900/50 border border-slate-700 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-sans text-white placeholder-slate-500 p-3 transition-all";

  const labelClass = theme === 'sea' ? "flex items-center gap-2 font-display text-[10px] font-bold text-teal-glow uppercase tracking-[0.25em] mb-1" :
                    theme === 'forest' ? "flex items-center gap-2 font-serif text-sm font-bold text-[#4a5d23] uppercase tracking-widest mb-1 italic" :
                    theme === 'tech' ? "flex items-center gap-2 font-mono text-[10px] font-bold text-[#FF5C00] uppercase tracking-widest mb-1" :
                    "flex items-center gap-2 font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1";

  const Icon = theme === 'sea' ? Anchor : theme === 'forest' ? Scroll : theme === 'tech' ? Zap : Monitor;

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Mode Switcher */}
      <div className="flex p-1 bg-black/20 rounded-lg border border-white/5 w-fit">
        <button
          type="button"
          onClick={() => setFormData(p => ({ ...p, mode: 'custom' }))}
          className={`px-4 py-2 rounded-md font-bold transition-all text-xs uppercase tracking-widest ${
            formData.mode === 'custom' 
              ? (theme === 'sea' ? 'bg-biolume text-black' : theme === 'forest' ? 'bg-[#4a5d23] text-white' : 'bg-brand text-white')
              : 'text-muted hover:text-white'
          }`}
        >
          Custom_Fields
        </button>
        <button
          type="button"
          onClick={() => setFormData(p => ({ ...p, mode: 'template' }))}
          className={`px-4 py-2 rounded-md font-bold transition-all text-xs uppercase tracking-widest ${
            formData.mode === 'template' 
              ? (theme === 'sea' ? 'bg-biolume text-black' : theme === 'forest' ? 'bg-[#4a5d23] text-white' : 'bg-brand text-white')
              : 'text-muted hover:text-white'
          }`}
        >
          Template_Mode
        </button>
      </div>

      {formData.mode === 'custom' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative">
              <label htmlFor="repoName" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '01_Artifact_Identity' : theme === 'forest' ? 'The Repository\'s Name' : '01_Repo_Name'}
              </label>
              <input
                type="text"
                id="repoName"
                name="repoName"
                value={formData.repoName}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder={theme === 'sea' ? 'NAME_OF_THE_SUBMERGED' : theme === 'forest' ? 'What is it called?' : 'e.g., awesome-project'}
              />
            </div>
            <div className="relative">
              <label htmlFor="techStack" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '02_Elemental_Composition' : theme === 'forest' ? 'The Loom of Tech' : '02_Tech_Stack'}
              </label>
              <input
                type="text"
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder={theme === 'sea' ? 'REACT_GEMINI_ABYSS' : theme === 'forest' ? 'React, Gemini, Magic...' : 'e.g., React, TypeScript'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative">
              <label htmlFor="projectLink" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '03_Source_Coordinate' : theme === 'forest' ? 'Path to the Source' : '03_Project_URL'}
              </label>
              <input
                type="url"
                id="projectLink"
                name="projectLink"
                value={formData.projectLink || ''}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="relative">
              <label htmlFor="demoLink" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '04_Visual_Transmission' : theme === 'forest' ? 'A Window into the World' : '04_Demo_URL'}
              </label>
              <input
                type="url"
                id="demoLink"
                name="demoLink"
                value={formData.demoLink || ''}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="targetCommunity" className={labelClass}>
              <Icon className="h-3 w-3" />
              {theme === 'sea' ? '05_Kindred_Explorers' : theme === 'forest' ? 'The Kindred Spirits' : '05_Target_Community'}
            </label>
            <input
              type="text"
              id="targetCommunity"
              name="targetCommunity"
              value={formData.targetCommunity}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder={theme === 'sea' ? 'WHO_BRAVES_THESE_WATERS?' : theme === 'forest' ? 'Who will wander these woods?' : 'e.g., Developers'}
            />
          </div>

          <div className="relative">
            <label htmlFor="summary" className={labelClass}>
              <Icon className="h-3 w-3" />
              {theme === 'sea' ? '06_Artifact_History' : theme === 'forest' ? 'The Roots (README)' : '06_Context'}
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={5}
              className={`${inputClass} resize-none`}
              placeholder={theme === 'sea' ? 'ETCH_THE_STORY_OF_ITS_ORIGIN...' : theme === 'forest' ? 'Tell the story of its birth...' : 'Paste README content...'}
            />
          </div>

          <div className="relative">
            <label htmlFor="problemSolved" className={labelClass}>
              <Icon className="h-3 w-3" />
              {theme === 'sea' ? '07_Current_Stabilization' : theme === 'forest' ? 'The Thorns Removed' : '07_Problem_Solved'}
            </label>
            <textarea
              id="problemSolved"
              name="problemSolved"
              value={formData.problemSolved}
              onChange={handleChange}
              required
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder={theme === 'sea' ? 'WHAT_BURDEN_DOES_IT_LIFT?' : theme === 'forest' ? 'What burden does it lift?' : 'What problem does it solve?'}
            />
          </div>
        </>
      ) : (
        <>
          <div className="relative">
            <label htmlFor="projectLink" className={labelClass}>
              <Icon className="h-3 w-3" />
              {theme === 'sea' ? '01_Source_Coordinate' : theme === 'forest' ? 'Path to the Source' : '01_Repo_URL'}
            </label>
            <input
              type="url"
              id="projectLink"
              name="projectLink"
              value={formData.projectLink || ''}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="https://github.com/..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative">
              <label htmlFor="youtubeUrl" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '02_Visual_Transmission' : theme === 'forest' ? 'The Moving Image' : '02_YouTube_URL'}
              </label>
              <input
                type="url"
                id="youtubeUrl"
                name="youtubeUrl"
                value={formData.youtubeUrl || ''}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://youtu.be/..."
              />
            </div>
            <div className="relative">
              <label htmlFor="cloudRunUrl" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '03_Cloud_Manifestation' : theme === 'forest' ? 'The Ethereal Link' : '03_Cloud_Run_URL'}
              </label>
              <input
                type="url"
                id="cloudRunUrl"
                name="cloudRunUrl"
                value={formData.cloudRunUrl || ''}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://...run.app"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="summary" className={labelClass}>
              <Icon className="h-3 w-3" />
              {theme === 'sea' ? '04_Artifact_Context' : theme === 'forest' ? 'The Roots (README)' : '04_Context'}
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Paste README or project context here..."
            />
          </div>

          <div className="relative">
            <label htmlFor="template" className={labelClass}>
              <Icon className="h-3 w-3" />
              {theme === 'sea' ? '05_Transmission_Template' : theme === 'forest' ? 'Ancient Scroll Template' : '05_Markdown_Template'}
            </label>
            <textarea
              id="template"
              name="template"
              value={formData.template}
              onChange={handleChange}
              required
              rows={12}
              className={`${inputClass} resize-none font-mono text-xs`}
              placeholder="Enter your Markdown template..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="generateImage"
                name="generateImage"
                checked={formData.generateImage}
                onChange={handleChange}
                className={`h-5 w-5 rounded transition-all ${
                  theme === 'sea' ? 'bg-cyan-950 border-biolume text-biolume focus:ring-biolume' :
                  theme === 'forest' ? 'bg-[#fff9e6] border-[#8b4513] text-[#4a5d23] focus:ring-[#4a5d23]' :
                  theme === 'tech' ? 'bg-black border-[#2D3139] text-[#FF5C00] focus:ring-[#FF5C00]' :
                  'bg-slate-900 border-slate-700 text-indigo-500 focus:ring-indigo-500'
                }`}
              />
              <label htmlFor="generateImage" className={`text-sm font-bold uppercase tracking-widest ${
                theme === 'sea' ? 'font-display text-biolume' :
                theme === 'forest' ? 'font-serif text-[#4a5d23] italic' :
                theme === 'tech' ? 'font-mono text-[#FF5C00]' :
                'font-sans text-slate-300'
              }`}>
                {theme === 'sea' ? 'GENERATE_VISUAL_ARTIFACT' : theme === 'forest' ? 'Conjure an Illustration' : 'Generate_Cover_Image'}
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="addEmpathy"
                name="addEmpathy"
                checked={formData.addEmpathy}
                onChange={handleChange}
                className={`h-5 w-5 rounded transition-all ${
                  theme === 'sea' ? 'bg-cyan-950 border-biolume text-biolume focus:ring-biolume' :
                  theme === 'forest' ? 'bg-[#fff9e6] border-[#8b4513] text-[#4a5d23] focus:ring-[#4a5d23]' :
                  theme === 'tech' ? 'bg-black border-[#2D3139] text-[#FF5C00] focus:ring-[#FF5C00]' :
                  'bg-slate-900 border-slate-700 text-indigo-500 focus:ring-indigo-500'
                }`}
              />
              <label htmlFor="addEmpathy" className={`text-sm font-bold uppercase tracking-widest ${
                theme === 'sea' ? 'font-display text-biolume' :
                theme === 'forest' ? 'font-serif text-[#4a5d23] italic' :
                theme === 'tech' ? 'font-mono text-[#FF5C00]' :
                'font-sans text-slate-300'
              }`}>
                {theme === 'sea' ? 'INFUSE_EMOTIONAL_RESONANCE' : theme === 'forest' ? 'Add a Heartbeat' : 'Add_Empathy_to_Story'}
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="includeArchitecture"
                name="includeArchitecture"
                checked={formData.includeArchitecture}
                onChange={handleChange}
                className={`h-5 w-5 rounded transition-all ${
                  theme === 'sea' ? 'bg-cyan-950 border-biolume text-biolume focus:ring-biolume' :
                  theme === 'forest' ? 'bg-[#fff9e6] border-[#8b4513] text-[#4a5d23] focus:ring-[#4a5d23]' :
                  theme === 'tech' ? 'bg-black border-[#2D3139] text-[#FF5C00] focus:ring-[#FF5C00]' :
                  'bg-slate-900 border-slate-700 text-indigo-500 focus:ring-indigo-500'
                }`}
              />
              <label htmlFor="includeArchitecture" className={`text-sm font-bold uppercase tracking-widest ${
                theme === 'sea' ? 'font-display text-biolume' :
                theme === 'forest' ? 'font-serif text-[#4a5d23] italic' :
                theme === 'tech' ? 'font-mono text-[#FF5C00]' :
                'font-sans text-slate-300'
              }`}>
                {theme === 'sea' ? 'REVEAL_SYSTEM_BLUEPRINT' : theme === 'forest' ? 'Sketch the Blueprint' : 'Include_Architecture'}
              </label>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col md:flex-row gap-6 pt-6">
        <button
          type="button"
          onClick={() => setFormData({
            mode: formData.mode,
            repoName: '',
            techStack: '',
            summary: '',
            targetCommunity: '',
            problemSolved: '',
            projectLink: '',
            demoLink: '',
            template: DEFAULT_TEMPLATE,
          })}
          className={`md:w-1/3 uppercase tracking-widest text-sm transition-colors ${
            theme === 'sea' ? 'font-display text-[10px] text-biolume/40 hover:text-biolume' :
            theme === 'forest' ? 'font-serif italic text-[#8b4513] hover:text-[#4a5d23]' :
            theme === 'tech' ? 'font-mono text-[#8B949E] hover:text-[#FF5C00]' :
            'font-sans text-slate-500 hover:text-white'
          }`}
        >
          {theme === 'sea' ? 'PURGE_SEQUENCE' : theme === 'forest' ? 'Burn the Draft' : 'Reset_Form'}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`md:w-2/3 font-bold py-5 px-8 uppercase tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 text-lg ${
            theme === 'sea' ? 'pearl-button rounded-none font-display' :
            theme === 'forest' ? 'golden-seed rounded-full font-serif text-[#4a3728]' :
            theme === 'tech' ? 'bg-[#FF5C00] hover:bg-[#FF7A33] text-black font-mono' :
            'bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-sans'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              {theme === 'sea' ? 'TRANSMITTING...' : theme === 'forest' ? 'Weaving Magic...' : 'Processing...'}
            </>
          ) : (
            theme === 'sea' ? 'INITIATE_PEARL' : theme === 'forest' ? 'Plant the Seed' : 'Execute_Generation'
          )}
        </button>
      </div>
    </form>
  );
}
