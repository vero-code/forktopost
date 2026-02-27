import React, { useState } from 'react';
import { type SubmissionData } from '../services/geminiService';
import { Loader2, Anchor, Scroll, Zap, Monitor } from 'lucide-react';

interface SubmissionFormProps {
  onSubmit: (data: SubmissionData) => void;
  isLoading: boolean;
  theme: 'original' | 'tech' | 'forest' | 'sea';
}

export default function SubmissionForm({ onSubmit, isLoading, theme }: SubmissionFormProps) {
  const [formData, setFormData] = useState<SubmissionData>({
    repoName: '',
    techStack: '',
    summary: '',
    targetCommunity: '',
    problemSolved: '',
    projectLink: '',
    demoLink: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      <div className="flex flex-col md:flex-row gap-6 pt-6">
        <button
          type="button"
          onClick={() => setFormData({
            repoName: '',
            techStack: '',
            summary: '',
            targetCommunity: '',
            problemSolved: '',
            projectLink: '',
            demoLink: '',
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
