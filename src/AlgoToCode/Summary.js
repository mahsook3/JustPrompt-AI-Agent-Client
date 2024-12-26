import React from "react";
import ReactMarkdown from "react-markdown";
import { ExternalLink } from "lucide-react";

export default function Summary({ summary, searchResults, loading }) {
  return (
    <div className="space-y-6 w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
<div className="overflow-x-auto" style={{ width: '500px' }}>
  <div className="flex space-x-4 pb-4">
    {searchResults.map((result, index) => (
      <div key={index} className="w-[300px] flex-shrink-0 flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-600">
          <img
            src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg"
            alt="Stack Overflow Logo"
            className="h-8 w-auto mb-2"
          />
          <h3 className="text-lg font-semibold line-clamp-2 break-words">
            {result.question}
          </h3>
        </div>
        <div className="p-4 flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 break-words">
            {result.answers[0].body}
          </p>
        </div>
        <div className="p-4 mt-auto">
          <a
            href={result.answers[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Learn More
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    ))}
  </div>
</div>
          )}
        </div>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Summary</h2>
        </div>
        <div className="p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ReactMarkdown className="prose dark:prose-invert">
              {summary}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
