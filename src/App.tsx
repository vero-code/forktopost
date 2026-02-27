import React, { useState } from 'react';
import SubmissionForm from './components/SubmissionForm';
import PostPreview from './components/PostPreview';
import { generateSubmissionPost, type SubmissionData } from './services/geminiService';
import { Sparkles, Code2, Terminal, Lightbulb } from 'lucide-react';

export default function App() {
  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: SubmissionData) => {
    setIsLoading(true);
    setError(null);
    try {
      const post = await generateSubmissionPost(data);
      setGeneratedPost(post);
    } catch (err) {
      setError('Failed to generate post. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setGeneratedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-500/20">
              <Code2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            DEV Challenge <span className="text-indigo-400">Post Generator</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Craft a winning submission for the DEV Weekend Challenge in seconds. Powered by Gemini.
          </p>
        </header>

        <main>
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-8 flex items-center">
              <Terminal className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {generatedPost ? (
            <PostPreview content={generatedPost} onBack={handleBack} />
          ) : (
            <>
              <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-6 sm:p-8">
                <div className="flex items-center mb-6 pb-6 border-b border-gray-700">
                  <Sparkles className="h-6 w-6 text-indigo-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">Project Details</h2>
                </div>
                <SubmissionForm onSubmit={handleGenerate} isLoading={isLoading} />
              </div>

              <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                  <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
                  Pro Tips for Better Results
                </h3>
                <ul className="list-disc list-inside text-gray-400 space-y-1 ml-1">
                  <li>Be specific about the <strong>problem</strong> you're solving.</li>
                  <li>Mention who your <strong>target audience</strong> is (e.g., beginners, experts).</li>
                  <li>Paste your full <strong>README</strong> content for the best context.</li>
                </ul>
              </div>
            </>
          )}
        </main>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Built with React, Tailwind CSS, and Gemini API.</p>
        </footer>
      </div>
    </div>
  );
}
