import React, { useState } from 'react';
import { type SubmissionData } from '../services/geminiService';
import { motion } from 'motion/react';
import { Loader2, Anchor, Scroll, Zap, Monitor, CheckCircle2, XCircle, FileSearch } from 'lucide-react';
import { checkGitHubRepo, fetchReadme } from '../services/githubService';

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

  const [repoStatus, setRepoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [lastCheckedUrl, setLastCheckedUrl] = useState('');

  const handleCheckRepo = async (url: string) => {
    if (!url || !url.includes('github.com') || url === lastCheckedUrl) return;
    
    setRepoStatus('loading');
    setLastCheckedUrl(url);
    
    const info = await checkGitHubRepo(url);
    if (info) {
      setRepoStatus('success');
      // Auto-fill repo name if empty
      if (!formData.repoName) {
        setFormData(prev => ({ ...prev, repoName: info.name }));
      }
    } else {
      setRepoStatus('error');
    }
  };

  const handleFetchReadme = async () => {
    if (!formData.projectLink) return;
    
    let path = '';
    const url = formData.projectLink;
    if (url.includes('github.com')) {
      try {
        const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
        path = urlObj.pathname.startsWith('/') ? urlObj.pathname.slice(1) : urlObj.pathname;
      } catch (e) {
        setRepoStatus('error');
        return;
      }
    } else {
      path = url;
    }

    const segments = path.split('/').filter(Boolean);
    if (segments.length < 2) return;

    const owner = segments[0];
    const repo = segments[1];
    
    setRepoStatus('loading');
    const readme = await fetchReadme(owner, repo);
    
    if (readme !== null) {
      setFormData(prev => ({ 
        ...prev, 
        summary: readme,
        repoName: prev.repoName || repo
      }));
      setRepoStatus('success');
      setFetchSuccess(true);
      setTimeout(() => setFetchSuccess(false), 2000);
      
      // Auto-scroll to the summary field
      setTimeout(() => {
        const el = document.getElementById('summary');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      setRepoStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    if (name === 'projectLink') {
      setRepoStatus('idle');
    }
    
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = theme === 'sea' ? "w-full bg-cyan-950/20 border-b border-biolume/30 focus:border-biolume focus:ring-0 font-display text-lg tracking-[0.1em] text-biolume placeholder-biolume/50 py-3 px-4 transition-all duration-500" :
                    theme === 'forest' ? "w-full bg-transparent border-b-2 border-[#8b4513]/20 focus:border-[#4a5d23] focus:ring-0 font-serif text-lg italic text-[#4a3728] placeholder-[#8b7355]/80 py-2 px-4 transition-colors" :
                    theme === 'tech' ? "w-full bg-[#161B22] border border-tech-border focus:border-tech-brand focus:ring-0 font-mono text-sm text-white placeholder-tech-muted/60 p-4 transition-all rounded-none" :
                    "w-full bg-gray-900/50 border border-gray-700 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-sans text-white placeholder-gray-500 p-3 transition-all";

  const labelClass = theme === 'sea' ? "flex items-center gap-2 font-display text-[10px] font-bold text-teal-glow uppercase tracking-[0.25em] mb-1" :
                    theme === 'forest' ? "flex items-center gap-2 font-serif text-sm font-bold text-[#4a5d23] uppercase tracking-widest mb-1 italic" :
                    theme === 'tech' ? "flex items-center gap-2 font-mono text-[10px] font-bold text-tech-brand uppercase tracking-widest mb-1" :
                    "flex items-center gap-2 font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1";

  const Icon = theme === 'sea' ? Anchor : theme === 'forest' ? Scroll : theme === 'tech' ? Zap : Monitor;

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Mode Switcher */}
      <div className="flex p-1 bg-black/20 rounded-lg border border-white/5 w-fit">
        <button
          type="button"
          onClick={() => setFormData(p => ({ ...p, mode: 'custom' }))}
          className={`px-4 py-1.5 transition-all tracking-widest font-bold ${
            theme === 'forest' ? 'font-serif italic text-sm rounded-md' : 
            theme === 'tech' ? 'font-mono text-xs rounded-none border' : 
            'text-xs uppercase rounded-md'
          } ${
            formData.mode === 'custom' 
              ? (
                  theme === 'sea' ? 'bg-biolume text-black border-transparent' : 
                  theme === 'forest' ? 'bg-[#4a5d23] text-white border-transparent' : 
                  theme === 'tech' ? 'bg-tech-brand text-black border-tech-brand shadow-[0_0_15px_rgba(255,92,0,0.3)]' : 
                  'bg-brand text-white border-transparent shadow-md shadow-indigo-500/20'
                )
              : (
                  theme === 'tech' ? 'text-tech-muted hover:text-white border-tech-border hover:border-tech-brand/50 bg-transparent' : 
                  theme === 'forest' ? 'text-[#4a5d23]/60 hover:text-[#4a5d23] bg-transparent' :
                  'text-gray-400 hover:text-white hover:bg-white/5 border-transparent bg-transparent'
                )
          }`}
        >
          {theme === 'forest' ? 'Seeds of Creation' : 'Custom_Fields'}
        </button>
        <button
          type="button"
          onClick={() => setFormData(p => ({ ...p, mode: 'template' }))}
          className={`px-4 py-1.5 transition-all tracking-widest font-bold ${
            theme === 'forest' ? 'font-serif italic text-sm rounded-md' : 
            theme === 'tech' ? 'font-mono text-xs rounded-none border' : 
            'text-xs uppercase rounded-md'
          } ${
            formData.mode === 'template' 
              ? (
                  theme === 'sea' ? 'bg-biolume text-black border-transparent' : 
                  theme === 'forest' ? 'bg-[#4a5d23] text-white border-transparent' : 
                  theme === 'tech' ? 'bg-tech-brand text-black border-tech-brand shadow-[0_0_15px_rgba(255,92,0,0.3)]' : 
                  'bg-brand text-white border-transparent shadow-md shadow-indigo-500/20'
                )
              : (
                  theme === 'tech' ? 'text-tech-muted hover:text-white border-tech-border hover:border-tech-brand/50 bg-transparent' : 
                  theme === 'forest' ? 'text-[#4a5d23]/60 hover:text-[#4a5d23] bg-transparent' :
                  'text-gray-400 hover:text-white hover:bg-white/5 border-transparent bg-transparent'
                )
          }`}
        >
          {theme === 'forest' ? 'Ancient Scrolls' : 'Template_Mode'}
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
                key="custom-repo-name"
                type="text"
                id="repoName"
                name="repoName"
                value={formData.repoName}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder={theme === 'sea' ? 'NAME_OF_THE_SUBMERGED' : theme === 'forest' ? 'What is it called?' : 'e.g., awesome-project'}
                autoComplete="off"
              />
            </div>
            <div className="relative">
              <label htmlFor="techStack" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '02_Elemental_Composition' : theme === 'forest' ? 'The Loom of Tech' : '02_Tech_Stack'}
              </label>
              <input
                key="custom-tech-stack"
                type="text"
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder={theme === 'sea' ? 'REACT_GEMINI_ABYSS' : theme === 'forest' ? 'React, Gemini, Magic...' : 'e.g., React, TypeScript'}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative">
              <label htmlFor="projectLink" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '03_Source_Coordinate' : theme === 'forest' ? 'Path to the Source' : '03_Project_URL'}
                
                {/* Inline Status Indicators */}
                <span className="ml-auto flex items-center gap-2 normal-case tracking-normal">
                  {repoStatus === 'loading' && <Loader2 className="h-3 w-3 animate-spin text-muted" />}
                  {repoStatus === 'success' && (
                    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 text-[10px] text-green-500 font-bold">
                      <CheckCircle2 className="h-3 w-3" />
                      {theme === 'sea' ? 'V_VALIDATED' : 'Verified'}
                    </motion.span>
                  )}
                  {repoStatus === 'error' && (
                    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 text-[10px] text-red-500 font-bold">
                      <XCircle className="h-3 w-3" />
                      {theme === 'sea' ? 'E_INVALID' : 'Error'}
                    </motion.span>
                  )}
                </span>
              </label>
              <div className="relative group">
                <input
                  key="custom-project-link"
                  type="url"
                  id="projectLink"
                  name="projectLink"
                  value={formData.projectLink || ''}
                  onChange={handleChange}
                  onBlur={(e) => handleCheckRepo(e.target.value)}
                  className={`${inputClass} pr-14`}
                  placeholder="https://github.com/..."
                  autoComplete="off"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {repoStatus === 'success' && (
                    <button
                      type="button"
                      onClick={handleFetchReadme}
                      title="Fetch README"
                      className={`p-2 rounded-full transition-all flex items-center justify-center shadow-lg ${
                        theme === 'sea' ? 'bg-biolume/20 text-biolume hover:bg-biolume hover:text-black border border-biolume/30' :
                        theme === 'forest' ? 'bg-[#4a5d23]/20 text-[#4a5d23] hover:bg-[#4a5d23] hover:text-white' :
                        'bg-brand/20 text-brand hover:bg-brand hover:text-white'
                      }`}
                    >
                      <FileSearch className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              {repoStatus === 'error' && (
                <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-red-500 uppercase tracking-widest animate-pulse">
                  Invalid Repository Connection
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="demoLink" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '04_Visual_Transmission' : theme === 'forest' ? 'A Window into the World' : '04_Demo_URL'}
              </label>
              <input
                key="custom-demo-link"
                type="url"
                id="demoLink"
                name="demoLink"
                value={formData.demoLink || ''}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://..."
                autoComplete="off"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="targetCommunity" className={labelClass}>
              <Icon className="h-3 w-3" />
              {theme === 'sea' ? '05_Kindred_Explorers' : theme === 'forest' ? 'The Kindred Spirits' : '05_Target_Community'}
            </label>
            <input
              key="custom-target-community"
              type="text"
              id="targetCommunity"
              name="targetCommunity"
              value={formData.targetCommunity}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder={theme === 'sea' ? 'WHO_BRAVES_THESE_WATERS?' : theme === 'forest' ? 'Who will wander these woods?' : 'e.g., Developers'}
              autoComplete="off"
            />
          </div>

          <div className="relative">
            <label htmlFor="summary" className={labelClass}>
              <Icon className="h-3 w-3" />
              {theme === 'sea' ? '06_Artifact_History' : theme === 'forest' ? 'The Roots (README)' : '06_Context'}
            </label>
            <textarea
              key="custom-summary"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={5}
              className={`${inputClass} resize-none ${fetchSuccess ? 'ring-2 ring-brand ring-offset-2 ring-offset-black' : ''} transition-all duration-500`}
              placeholder={theme === 'sea' ? 'ETCH_THE_STORY_OF_ITS_ORIGIN...' : theme === 'forest' ? 'Tell the story of its birth...' : 'Paste README content...'}
              autoComplete="off"
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
                
                <span className="ml-auto flex items-center gap-2 normal-case tracking-normal">
                  {repoStatus === 'loading' && <Loader2 className="h-3 w-3 animate-spin text-muted" />}
                  {repoStatus === 'success' && (
                    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 text-[10px] text-green-500 font-bold">
                      <CheckCircle2 className="h-3 w-3" />
                      {theme === 'sea' ? 'V_VALIDATED' : 'Verified'}
                    </motion.span>
                  )}
                  {repoStatus === 'error' && (
                    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 text-[10px] text-red-500 font-bold">
                      <XCircle className="h-3 w-3" />
                      {theme === 'sea' ? 'E_INVALID' : 'Error'}
                    </motion.span>
                  )}
                </span>
              </label>
            <div className="relative group">
              <input
                key="template-project-link"
                type="url"
                id="projectLink"
                name="projectLink"
                value={formData.projectLink || ''}
                onChange={handleChange}
                onBlur={(e) => handleCheckRepo(e.target.value)}
                required
                className={`${inputClass} pr-10`}
                placeholder="https://github.com/..."
                autoComplete="off"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {repoStatus === 'success' && (
                  <button
                    type="button"
                    onClick={handleFetchReadme}
                    title="Fetch README"
                    className={`p-2 rounded-full transition-all flex items-center justify-center shadow-lg ${
                      theme === 'sea' ? 'bg-biolume/20 text-biolume hover:bg-biolume hover:text-black border border-biolume/30' :
                      theme === 'forest' ? 'bg-[#4a5d23]/20 text-[#4a5d23] hover:bg-[#4a5d23] hover:text-white' :
                      'bg-brand/20 text-brand hover:bg-brand hover:text-white'
                    }`}
                  >
                    <FileSearch className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            {repoStatus === 'error' && (
              <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-red-500 uppercase tracking-widest animate-pulse">
                Invalid Repository Connection
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative">
              <label htmlFor="youtubeUrl" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '02_Visual_Transmission' : theme === 'forest' ? 'The Moving Image' : '02_YouTube_URL'}
              </label>
              <input
                key="template-youtube-url"
                type="url"
                id="youtubeUrl"
                name="youtubeUrl"
                value={formData.youtubeUrl || ''}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://youtu.be/..."
                autoComplete="off"
              />
            </div>
            <div className="relative">
              <label htmlFor="cloudRunUrl" className={labelClass}>
                <Icon className="h-3 w-3" />
                {theme === 'sea' ? '03_Cloud_Manifestation' : theme === 'forest' ? 'The Ethereal Link' : '03_Cloud_Run_URL'}
              </label>
              <input
                key="template-cloud-run-url"
                type="url"
                id="cloudRunUrl"
                name="cloudRunUrl"
                value={formData.cloudRunUrl || ''}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://...run.app"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="summary" className={labelClass}>
              <Icon className="h-3 w-3" />
              {theme === 'sea' ? '04_Artifact_Context' : theme === 'forest' ? 'The Roots (README)' : '04_Context'}
            </label>
            <textarea
              key="template-summary"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={4}
              className={`${inputClass} resize-none ${fetchSuccess ? 'ring-2 ring-brand ring-offset-2 ring-offset-black' : ''} transition-all duration-500`}
              placeholder="Paste README or project context here..."
              autoComplete="off"
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
              className={`${inputClass} resize-none`}
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
            theme === 'sea' ? 'font-display text-[10px] text-biolume/70 hover:text-biolume' :
            theme === 'forest' ? 'font-serif italic text-[#8b4513] hover:text-[#4a5d23]' :
            theme === 'tech' ? 'font-mono text-[#8B949E] hover:text-[#FF5C00]' :
            'font-sans text-slate-500 hover:text-white'
          }`}
        >
          {theme === 'sea' ? 'PURGE_SEQUENCE' : theme === 'forest' ? 'Burn the Draft' : 'Reset_Form'}
        </button>
        <button
          type="submit"
          disabled={isLoading || repoStatus === 'loading' || repoStatus === 'error'}
          className={`md:w-2/3 font-bold py-4 md:py-5 px-4 md:px-8 uppercase tracking-wider md:tracking-[0.2em] transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-4 text-base md:text-lg relative overflow-hidden group ${
            theme === 'sea' ? 'pearl-button rounded-none font-display' :
            theme === 'forest' ? 'golden-seed rounded-full font-serif text-[#4a3728]' :
            theme === 'tech' ? 'bg-tech-brand hover:bg-[#FF7A33] text-black font-mono rounded-none' :
            'bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-sans shadow-lg shadow-indigo-500/20'
          }`}
        >
          {theme === 'forest' && (
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
          )}
          {isLoading ? (
            <div className="relative z-10 flex items-center gap-4">
              <Loader2 className="animate-spin h-5 w-5" />
              {theme === 'sea' ? 'TRANSMITTING...' : theme === 'forest' ? 'Whispering...' : 'Processing...'}
            </div>
          ) : (
            <span className="relative z-10">
              {theme === 'sea' ? 'INITIATE_PEARL' : theme === 'forest' ? 'Plant the Seed' : 'Execute_Generation'}
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
