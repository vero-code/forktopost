import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Anchor, Sparkles, ScrollText, Zap, Monitor, Share2, Loader2, Globe, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { publishToDevTo } from '../services/devToService';
import { uploadToImgBB } from '../services/imgbbService';

interface PostPreviewProps {
  content: string;
  imageUrl?: string;
  onBack: () => void;
  theme: 'original' | 'tech' | 'forest' | 'sea';
  apiKey: string;
  userProfile: any;
  onApiKeyChange: (key: string) => void;
  imgbbApiKey: string;
  onImgbbApiKeyChange: (key: string) => void;
  showPublishModal: boolean;
  onClosePublishModal: () => void;
}

export default function PostPreview({ content, imageUrl, theme, apiKey, userProfile, onApiKeyChange, imgbbApiKey, onImgbbApiKeyChange, showPublishModal, onClosePublishModal }: PostPreviewProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Global API key state is handled in App.tsx

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
              theme === 'forest' ? 'font-serif text-[#4a5d23] italic font-bold' :
              'text-muted font-mono'
            }`}>
              Status: {theme === 'sea' ? 'Artifact_Decoded' : theme === 'forest' ? 'Woven by Spirits' : 'Success'}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className={`p-1.5 rounded-full ${
            theme === 'sea' ? 'bg-biolume/10 text-biolume/40' :
            theme === 'forest' ? 'bg-[#4a5d23]/10 text-[#4a5d23]/40' :
            'bg-white/5 text-muted'
          }`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPublishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`max-w-md w-full p-8 ${
                theme === 'sea' ? 'stone-card border-biolume/40' :
                theme === 'forest' ? 'parchment-card' :
                theme === 'tech' ? 'bg-[#0F1115] border border-[#2D3139]' :
                'bg-slate-800 border-slate-700 rounded-2xl'
              }`}
            >
              <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 uppercase ${
                theme === 'sea' ? 'font-display text-biolume tracking-widest' :
                theme === 'forest' ? 'font-serif text-[#4a3728] italic' :
                theme === 'tech' ? 'font-mono text-[#FF5C00]' :
                'font-sans text-white'
              }`}>
                <Globe className="h-5 w-5" />
                {theme === 'sea' ? 'DISTRIBUTION_NODE' : theme === 'forest' ? 'The Messenger' : 'Publish_Draft'}
              </h3>

              {publishStatus === 'success' ? (
                <div className="text-center py-6 space-y-4">
                  <div className="flex justify-center">
                    <Check className="h-12 w-12 text-emerald-500" />
                  </div>
                  <p className={theme === 'tech' ? 'font-mono text-white text-sm' : 'text-slate-300 font-sans'}>
                    Post successfully drafted on DEV.to!
                  </p>
                  <button
                    onClick={onClosePublishModal}
                    className="w-full py-3 bg-emerald-500 text-slate-900 font-bold rounded-lg uppercase tracking-widest text-xs"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className={`block text-[10px] uppercase tracking-widest mb-2 ${
                      theme === 'sea' ? 'font-display text-biolume' :
                      theme === 'forest' ? 'font-serif text-[#4a5d23]' :
                      'text-muted font-mono'
                    }`}>
                      DEV.to API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => {
                        onApiKeyChange(e.target.value);
                      }}
                      placeholder="forem_..."
                      className={`w-full p-3 bg-black/20 border transition-all text-sm ${
                        theme === 'sea' ? 'border-biolume/20 focus:border-biolume font-display text-biolume' :
                        theme === 'forest' ? 'border-[#8b4513]/20 focus:border-[#4a5d23] font-serif italic' :
                        theme === 'tech' ? 'border-[#2D3139] focus:border-[#FF5C00] font-mono text-white' :
                        'border-slate-700 focus:border-indigo-500 rounded-lg text-white'
                      }`}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-[10px] text-muted italic">
                        Get yours at <a href="https://dev.to/settings/extensions" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">dev.to Settings</a>
                      </p>
                      
                      {userProfile && (
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2"
                        >
                          <img 
                            src={userProfile.profile_image} 
                            alt={userProfile.username} 
                            className="h-4 w-4 rounded-full border border-white/20"
                          />
                          <span className={`text-[10px] font-bold ${
                            theme === 'sea' ? 'text-biolume' :
                            theme === 'forest' ? 'text-[#4a5d23]' :
                            'text-[#FF5C00]'
                          }`}>
                            @{userProfile.username}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-[10px] uppercase tracking-widest mb-2 ${
                      theme === 'sea' ? 'font-display text-biolume' :
                      theme === 'forest' ? 'font-serif text-[#4a5d23]' :
                      'text-muted font-mono'
                    }`}>
                      ImgBB API Key (for Images)
                    </label>
                    <input
                      type="password"
                      value={imgbbApiKey}
                      onChange={(e) => {
                        onImgbbApiKeyChange(e.target.value);
                      }}
                      placeholder="..."
                      className={`w-full p-3 bg-black/20 border transition-all text-sm ${
                        theme === 'sea' ? 'border-biolume/20 focus:border-biolume font-display text-biolume' :
                        theme === 'forest' ? 'border-[#8b4513]/20 focus:border-[#4a5d23] font-serif italic' :
                        theme === 'tech' ? 'border-[#2D3139] focus:border-[#FF5C00] font-mono text-white' :
                        'border-slate-700 focus:border-indigo-500 rounded-lg text-white'
                      }`}
                    />
                    <p className="text-[10px] text-muted italic mt-1">
                      Enables auto-upload of AI images
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="flex items-start gap-2 text-xs text-red-500 bg-red-500/10 p-3 rounded border border-red-500/20">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={onClosePublishModal}
                      className={`flex-1 py-3 border text-xs uppercase tracking-widest ${
                        theme === 'sea' ? 'border-biolume/20 font-display text-biolume hover:bg-biolume/5' :
                        theme === 'forest' ? 'border-[#8b4513]/20 font-serif italic text-[#4a3728] hover:bg-[#8b4513]/5' :
                        theme === 'tech' ? 'border-[#2D3139] font-mono text-muted hover:bg-white/5' :
                        'border-slate-700 font-sans text-slate-400 rounded-lg hover:bg-white/5'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={!apiKey || isPublishing}
                      onClick={async () => {
                        setIsPublishing(true);
                        setErrorMessage('');
                        try {
                          const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                          let firstLine = lines.length > 0 ? lines[0] : '';
                          
                          let title = firstLine
                            .replace(/^Post Title:\s*/i, '')
                            .replace(/^Title:\s*/i, '')
                            .replace(/[#*`]/g, '')
                            .trim();

                          if (!title || title.length < 5) title = 'My GitHub Project Submission';
                          
                          let bodyMarkdown = content;
                          
                          if (lines.length > 1 && content.trim().startsWith(firstLine)) {
                            bodyMarkdown = content.replace(firstLine, '').trim();
                          }
                          
                          let finalImageUrl = (imageUrl && imageUrl.startsWith('http')) ? imageUrl : undefined;

                          if (imageUrl && imageUrl.startsWith('data:') && imgbbApiKey) {
                             try {
                               finalImageUrl = await uploadToImgBB(imgbbApiKey, imageUrl);
                             } catch (uploadErr) {
                               console.warn("ImgBB upload failed, proceeding without image", uploadErr);
                             }
                          }

                          await publishToDevTo(apiKey, {
                            title,
                            body_markdown: bodyMarkdown,
                            published: false,
                            main_image: finalImageUrl,
                            tags: ['github', 'opensource', 'productivity']
                          });
                          
                          setPublishStatus('success');
                        } catch (err: any) {
                          setErrorMessage(err.message || 'Failed to publish');
                          setPublishStatus('error');
                        } finally {
                          setIsPublishing(false);
                        }
                      }}
                      className={`flex-1 py-3 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                        theme === 'sea' ? 'pearl-button' :
                        theme === 'forest' ? 'golden-seed text-[#4a3728]' :
                        theme === 'tech' ? 'bg-[#FF5C00] text-black font-mono' :
                        'bg-indigo-600 text-white rounded-lg font-sans'
                      } disabled:opacity-50 disabled:grayscale`}
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing
                        </>
                      ) : (
                        <>
                          <Share2 className="h-4 w-4" />
                          Publish_Draft
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            theme === 'forest' ? 'bg-[#4a5d23]/15 text-[#4a5d23] font-serif italic font-bold' :
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
          theme === 'forest' ? 'prose-stone prose-lg bg-[#fff9e6]/30 border-[#8b4513]/10 rounded-lg prose-headings:font-serif prose-headings:italic prose-headings:text-[#4a5d23] prose-p:font-serif prose-p:text-[#5d4a3e] prose-p:italic prose-p:text-xl prose-li:font-serif prose-li:text-[#5d4a3e] prose-li:italic prose-li:text-xl prose-hr:border-[#8b4513]/30 marker:text-[#4a5d23]' :
          theme === 'tech' ? 'prose-invert bg-black/40 border-[#2D3139] rounded-none prose-headings:font-mono prose-headings:text-[#FF5C00] prose-p:font-mono prose-p:text-[#8B949E]' :
          'prose-invert bg-slate-900/50 border-slate-700 rounded-xl prose-headings:text-white prose-p:text-slate-400'
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </motion.div>

      <div className={`mt-8 flex justify-between items-center uppercase tracking-widest text-[10px] ${
        theme === 'sea' ? 'font-display text-biolume/70' :
        theme === 'forest' ? 'font-serif text-[#4a5d23] italic font-bold' :
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
