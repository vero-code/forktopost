import React, { useState, useEffect } from 'react';
import SubmissionForm from './components/SubmissionForm';
import PostPreview from './components/PostPreview';
import { generateSubmissionPost, type SubmissionData } from './services/geminiService';
import { Sparkles, Waves, Anchor, Lightbulb, Zap, Leaf, Flower, Wind, Monitor, Palette, Droplets, Trees } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_POST_CONTENT, MOCK_IMAGE_URL } from './services/mockData';

type Theme = 'original' | 'tech' | 'forest' | 'sea';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('forktopost-theme');
    return (saved as Theme) || 'sea';
  });
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; top: string; left: string; size?: string; delay: string }[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('forktopost-theme', theme);
    
    // Generate particles based on theme
    const count = theme === 'forest' ? 15 : theme === 'sea' ? 8 : 0;
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      size: theme === 'sea' ? `${Math.random() * 60 + 40}px` : undefined,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(newParticles);
  }, [theme]);

  const handleGenerate = async (data: SubmissionData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const result = await generateSubmissionPost(data);
      setGeneratedPost(result.text);
      if (result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      }
    } catch (err) {
      const errorMsg = theme === 'sea' ? 'ABYSS_ERROR: The deep currents are unstable.' :
                       theme === 'forest' ? 'The forest spirits are restless.' :
                       'SYSTEM_ERROR: Generation failed.';
      setError(errorMsg);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setGeneratedPost(null);
    setGeneratedImage(null);
  };

  const handleTestPreview = () => {
    setGeneratedPost(MOCK_POST_CONTENT);
    setGeneratedImage(MOCK_IMAGE_URL);
  };

  return (
    <div className="min-h-screen relative overflow-hidden theme-bg">
      {theme === 'sea' && <div className="water-caustics" />}
      
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={theme === 'sea' ? 'jelly-particle' : 'firefly-particle'}
          style={{ 
            top: p.top, 
            left: p.left, 
            width: p.size, 
            height: p.size, 
            animationDelay: p.delay 
          }}
        />
      ))}

      {/* Theme Switcher */}
      <div className="fixed top-6 right-6 z-50 flex gap-2 bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/10">
        <button 
          onClick={() => setTheme('original')}
          className={`p-2 rounded-full transition-all ${theme === 'original' ? 'bg-indigo-500 text-white' : 'text-white/40 hover:text-white'}`}
          title="Original"
        >
          <Monitor className="h-4 w-4" />
        </button>
        <button 
          onClick={() => setTheme('tech')}
          className={`p-2 rounded-full transition-all ${theme === 'tech' ? 'bg-[#FF5C00] text-white' : 'text-white/40 hover:text-white'}`}
          title="Technical"
        >
          <Zap className="h-4 w-4" />
        </button>
        <button 
          onClick={() => setTheme('forest')}
          className={`p-2 rounded-full transition-all ${theme === 'forest' ? 'bg-[#4a5d23] text-white' : 'text-white/40 hover:text-white'}`}
          title="Forest"
        >
          <Trees className="h-4 w-4" />
        </button>
        <button 
          onClick={() => setTheme('sea')}
          className={`p-2 rounded-full transition-all ${theme === 'sea' ? 'bg-[#22d3ee] text-black' : 'text-white/40 hover:text-white'}`}
          title="Sea"
        >
          <Droplets className="h-4 w-4" />
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button 
          onClick={handleTestPreview}
          className="p-2 rounded-full text-white/40 hover:text-indigo-400 transition-all"
          title="Load Test Post"
        >
          <Sparkles className="h-4 w-4" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              {theme === 'sea' ? <Waves className="h-20 w-20 text-biolume animate-pulse" /> :
               theme === 'forest' ? <Leaf className="h-16 w-16 text-leaf animate-pulse" /> :
               theme === 'tech' ? <Zap className="h-16 w-16 text-[#FF5C00] animate-pulse" /> :
               <Monitor className="h-16 w-16 text-indigo-500 animate-pulse" />}
              
              {theme === 'forest' && <Flower className="h-6 w-6 text-[#f4e4bc] absolute -top-2 -right-2" />}
              {theme === 'sea' && <Zap className="h-8 w-8 text-cyan-300 absolute -top-2 -right-2 blur-[1px]" />}
            </div>
          </motion.div>
          
          <h1 className={`mb-4 ${
            theme === 'sea' ? 'text-7xl font-bold tracking-[0.2em] uppercase font-display text-pearl drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]' :
            theme === 'forest' ? 'text-8xl font-serif text-[#f4e4bc] drop-shadow-lg' :
            theme === 'tech' ? 'text-7xl font-bold tracking-[0.2em] uppercase font-mono text-white' :
            'text-7xl font-bold tracking-[0.2em] uppercase font-sans text-white'
          }`}>
            Fork<span className={theme === 'sea' ? 'text-biolume' : theme === 'forest' ? 'text-leaf' : theme === 'tech' ? 'text-[#FF5C00]' : 'text-indigo-500'}>To</span>Post
          </h1>
          
          <p className={`text-xl max-w-2xl mx-auto ${
            theme === 'sea' ? 'uppercase italic text-biolume/60 font-quicksand tracking-widest' :
            theme === 'forest' ? 'text-[#f4e4bc]/90 font-serif italic' :
            theme === 'tech' ? 'uppercase italic text-[#8B949E] font-mono' :
            'uppercase italic text-slate-400 font-sans'
          }`}>
            {theme === 'sea' ? 'Deep-sea technical alchemy. Transform your code in the bioluminescent abyss.' :
             theme === 'forest' ? 'Where code blossoms into stories. Whisper your repository\'s secrets to the forest.' :
             theme === 'tech' ? '01_Technical_Submission_Protocol_Active. Transform_Repo_To_Story.' :
             'The ultimate DEV.to submission generator for your GitHub projects.'}
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`px-6 py-4 mb-8 backdrop-blur-md border ${
                  theme === 'sea' ? 'bg-cyan-950/30 border-cyan-500/50 text-cyan-100 font-display tracking-widest text-sm' :
                  theme === 'forest' ? 'bg-red-900/30 border-red-500/50 text-red-100 font-serif italic' :
                  'bg-red-500/10 border-red-500/50 text-red-500 font-mono text-xs'
                }`}
              >
                {theme === 'sea' ? <Anchor className="h-5 w-5 mr-3 inline" /> :
                 theme === 'forest' ? <Wind className="h-5 w-5 mr-3 inline" /> :
                 <Zap className="h-5 w-5 mr-3 inline" />}
                {error}
              </motion.div>
            )}

            {generatedPost ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
              >
                <PostPreview content={generatedPost} imageUrl={generatedImage || undefined} onBack={handleBack} theme={theme} />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className={`p-8 md:p-12 ${
                  theme === 'sea' ? 'stone-card border-t-4 border-biolume' :
                  theme === 'forest' ? 'parchment-card' :
                  theme === 'tech' ? 'bg-[#0F1115] border border-[#2D3139]' :
                  'bg-slate-800/50 border border-slate-700 rounded-2xl'
                }`}
              >
                <div className={`flex items-center gap-3 mb-10 border-b pb-6 ${
                  theme === 'sea' ? 'border-biolume/20' :
                  theme === 'forest' ? 'border-[#8b4513]/20' :
                  'border-white/10'
                }`}>
                  <Sparkles className={`h-6 w-6 ${theme === 'sea' ? 'text-biolume' : theme === 'forest' ? 'text-[#4a5d23]' : 'text-brand'}`} />
                  <h2 className={`text-2xl font-bold uppercase ${
                    theme === 'sea' ? 'font-display text-pearl tracking-[0.15em]' :
                    theme === 'forest' ? 'font-serif text-[#4a3728] italic' :
                    theme === 'tech' ? 'font-mono text-white' :
                    'font-sans text-white'
                  }`}>
                    {theme === 'sea' ? 'Abyssal_Initialization' :
                     theme === 'forest' ? 'Ancient Scroll of Creation' :
                     'Generation_Protocol'}
                  </h2>
                </div>
                <SubmissionForm onSubmit={handleGenerate} isLoading={isLoading} theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className={`mt-24 pt-12 border-t text-center uppercase tracking-[0.3em] text-[10px] ${
          theme === 'sea' ? 'border-biolume/10 text-biolume/40 font-display' :
          theme === 'forest' ? 'border-[#f4e4bc]/20 text-[#f4e4bc]/60 font-serif italic' :
          'border-white/10 text-muted font-mono'
        }`}>
          <p>© 2026 ForkToPost // {theme === 'sea' ? 'Submerged in the Abyss' : theme === 'forest' ? 'Woven with Magic' : 'Technical Protocol Active'}</p>
          <p className="mt-4">
            Made by <a href="https://github.com/vero-code" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer">vero-code</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
