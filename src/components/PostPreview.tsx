import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, ArrowLeft, Anchor, Sparkles, ScrollText, FileText, Zap, Monitor } from 'lucide-react';
import { motion } from 'motion/react';

interface PostPreviewProps {
  content: string;
  imageUrl?: string;
  onBack: () => void;
  theme: 'original' | 'tech' | 'forest' | 'sea';
}

export default function PostPreview({ content, imageUrl, onBack, theme }: PostPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Icon = theme === 'sea' ? Anchor : theme === 'forest' ? ScrollText : theme === 'tech' ? Zap : Monitor;

  return (
    <div className={`p-8 md:p-12 relative ${
      theme === 'sea' ? 'stone-card border-t-4 border-biolume' :
      theme === 'forest' ? 'parchment-card' :
      theme === 'tech' ? 'bg-[#0F1115] border border-[#2D3139]' :
      'bg-slate-800/50 border border-slate-700 rounded-2xl'
    }`}>
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b pb-8 ${
        theme === 'sea' ? 'border-biolume/20' :
        theme === 'forest' ? 'border-[#8b4513]/20' :
        'border-white/10'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 ${
            theme === 'sea' ? 'bg-biolume/20 border border-biolume/40' :
            theme === 'forest' ? 'bg-[#4a5d23] rounded-full' :
            'bg-brand/20 rounded-lg'
          }`}>
            <Icon className={`h-6 w-6 ${theme === 'forest' ? 'text-[#f4e4bc]' : theme === 'sea' ? 'text-biolume' : 'text-brand'}`} />
          </div>
          <div>
            <h2 className={`text-2xl font-bold uppercase ${
              theme === 'sea' ? 'font-display text-pearl tracking-widest' :
              theme === 'forest' ? 'font-serif text-[#4a3728] italic' :
              theme === 'tech' ? 'font-mono text-white' :
              'font-sans text-white'
            }`}>
              {theme === 'sea' ? 'Abyssal_Transmission' : theme === 'forest' ? 'The Enchanted Story' : 'Output_Preview'}
            </h2>
            <p className={`text-[10px] uppercase tracking-[0.2em] ${
              theme === 'sea' ? 'font-display text-biolume/60' :
              theme === 'forest' ? 'font-serif text-[#4a5d23] italic' :
              'text-muted font-mono'
            }`}>
              Status: {theme === 'sea' ? 'Artifact_Decoded' : theme === 'forest' ? 'Woven by Spirits' : 'Success'}
            </p>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button
            onClick={onBack}
            className={`flex-1 md:flex-none flex items-center justify-center px-6 py-3 border uppercase tracking-widest transition-colors text-sm ${
              theme === 'sea' ? 'border-biolume/20 hover:bg-biolume/5 font-display text-biolume' :
              theme === 'forest' ? 'border-[#8b4513]/20 hover:bg-[#8b4513]/5 font-serif italic text-[#4a3728]' :
              theme === 'tech' ? 'border-[#2D3139] hover:bg-white/5 font-mono text-[#8B949E]' :
              'border-slate-700 hover:bg-white/5 font-sans text-slate-400 rounded-lg'
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {theme === 'sea' ? 'RE_CALIBRATE' : theme === 'forest' ? 'Rewhisper' : 'Edit_Input'}
          </button>
          <button
            onClick={handleCopy}
            className={`flex-1 md:flex-none flex items-center justify-center px-8 py-3 font-bold uppercase tracking-[0.2em] transition-all text-sm ${
              copied
                ? 'bg-emerald-500 text-slate-900 shadow-lg'
                : theme === 'sea' ? 'pearl-button' :
                  theme === 'forest' ? 'golden-seed text-[#4a3728]' :
                  theme === 'tech' ? 'bg-[#FF5C00] text-black font-mono' :
                  'bg-indigo-600 text-white rounded-lg font-sans'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                {theme === 'sea' ? 'BUFFER_SYNCED' : theme === 'forest' ? 'Stored in Memory' : 'Copied'}
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                {theme === 'sea' ? 'EXTRACT_DATA' : theme === 'forest' ? 'Gather the Words' : 'Copy_Markdown'}
              </>
            )}
          </button>
        </div>
      </div>

      {imageUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-10 overflow-hidden rounded-xl border border-white/10 shadow-2xl"
        >
          <img 
            src={imageUrl} 
            alt="Generated Cover" 
            className="w-full h-auto object-cover max-h-[400px]"
            referrerPolicy="no-referrer"
          />
          <div className={`p-3 text-[10px] uppercase tracking-widest text-center ${
            theme === 'sea' ? 'bg-biolume/10 text-biolume font-display' :
            theme === 'forest' ? 'bg-[#4a5d23]/10 text-[#4a5d23] font-serif italic' :
            theme === 'tech' ? 'bg-[#FF5C00]/10 text-[#FF5C00] font-mono' :
            'bg-indigo-500/10 text-indigo-400 font-sans'
          }`}>
            {theme === 'sea' ? 'VISUAL_ARTIFACT_GENERATED' : theme === 'forest' ? 'A Vision from the Woods' : 'AI_Generated_Cover_Image'}
          </div>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`prose max-w-none p-8 md:p-12 border overflow-auto max-h-[70vh] ${
          theme === 'sea' ? 'prose-invert bg-cyan-950/20 border-biolume/10 rounded-none prose-headings:font-display prose-headings:text-biolume prose-p:font-body prose-p:text-slate-300' :
          theme === 'forest' ? 'prose-stone bg-[#fff9e6]/30 border-[#8b4513]/10 rounded-lg prose-headings:font-serif prose-headings:italic prose-headings:text-[#4a5d23] prose-p:font-serif prose-p:text-[#5d4a3e] prose-p:italic' :
          theme === 'tech' ? 'prose-invert bg-black/40 border-[#2D3139] rounded-none prose-headings:font-mono prose-headings:text-[#FF5C00] prose-p:font-mono prose-p:text-[#8B949E]' :
          'prose-invert bg-slate-900/50 border-slate-700 rounded-xl prose-headings:text-white prose-p:text-slate-400'
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </motion.div>

      <div className={`mt-8 flex justify-between items-center uppercase tracking-widest text-[10px] ${
        theme === 'sea' ? 'font-display text-biolume/40' :
        theme === 'forest' ? 'font-serif text-[#4a5d23]/60 italic' :
        'text-muted font-mono'
      }`}>
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3" />
          <span>{theme === 'sea' ? 'ABYSS_SIG' : theme === 'forest' ? 'Magic Signature' : 'Checksum'}: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        </div>
        <span>{theme === 'sea' ? 'Submerged_In_The_Void' : theme === 'forest' ? 'Woven in the Ancient Woods' : 'UTF-8_Encoded'}</span>
      </div>
    </div>
  );
}
