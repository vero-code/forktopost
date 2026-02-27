import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, ArrowLeft } from 'lucide-react';

interface PostPreviewProps {
  content: string;
  onBack: () => void;
}

export default function PostPreview({ content, onBack }: PostPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Edit
        </button>
        <button
          onClick={handleCopy}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5 mr-2" />
              Copy Markdown
            </>
          )}
        </button>
      </div>

      <div className="prose prose-invert max-w-none bg-gray-900 p-6 rounded-lg border border-gray-700 overflow-auto max-h-[70vh]
        prose-headings:text-indigo-400
        prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
        prose-code:text-indigo-300 prose-code:bg-gray-800 prose-code:rounded prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700
      ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
