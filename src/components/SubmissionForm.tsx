import React, { useState } from 'react';
import { type SubmissionData } from '../services/geminiService';
import { Loader2 } from 'lucide-react';

interface SubmissionFormProps {
  onSubmit: (data: SubmissionData) => void;
  isLoading: boolean;
}

export default function SubmissionForm({ onSubmit, isLoading }: SubmissionFormProps) {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="repoName" className="block text-sm font-medium text-gray-300 mb-2">
            Repository Name
          </label>
          <input
            type="text"
            id="repoName"
            name="repoName"
            value={formData.repoName}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            placeholder="e.g., awesome-dev-tool"
          />
        </div>
        <div>
          <label htmlFor="techStack" className="block text-sm font-medium text-gray-300 mb-2">
            Tech Stack
          </label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            placeholder="e.g., React, Tailwind, Gemini API"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectLink" className="block text-sm font-medium text-gray-300 mb-2">
            Project Link (Optional)
          </label>
          <input
            type="url"
            id="projectLink"
            name="projectLink"
            value={formData.projectLink || ''}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label htmlFor="demoLink" className="block text-sm font-medium text-gray-300 mb-2">
            Demo Link (Optional)
          </label>
          <input
            type="url"
            id="demoLink"
            name="demoLink"
            value={formData.demoLink || ''}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label htmlFor="targetCommunity" className="block text-sm font-medium text-gray-300 mb-2">
          Target Community
        </label>
        <input
          type="text"
          id="targetCommunity"
          name="targetCommunity"
          value={formData.targetCommunity}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          placeholder="e.g., Open Source Contributors, Junior Devs"
        />
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-2">
          Project Summary / README Content
        </label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
          rows={4}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
          placeholder="Paste your README summary or describe what your project does..."
        />
      </div>

      <div>
        <label htmlFor="problemSolved" className="block text-sm font-medium text-gray-300 mb-2">
          Problem Solved
        </label>
        <textarea
          id="problemSolved"
          name="problemSolved"
          value={formData.problemSolved}
          onChange={handleChange}
          required
          rows={3}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
          placeholder="What specific problem does this solve for the target community?"
        />
      </div>

      <div className="flex gap-4">
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
          className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors border border-gray-600"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="w-2/3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Generating...
            </>
          ) : (
            'Generate Post'
          )}
        </button>
      </div>
    </form>
  );
}
