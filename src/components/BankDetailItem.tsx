import React, { useState } from "react";

interface BankDetailItemProps {
  label: string;
  value: string;
}

const BankDetailItem: React.FC<BankDetailItemProps> = ({ label, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative">
      <label className="text-base-700 mb-1 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <div className="border-base-300 bg-base-50 text-base-800 w-full rounded-lg border px-4 py-3 pr-12 font-mono text-sm">
          {value}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="text-base-500 hover:text-base-700 absolute top-1/2 right-2 -translate-y-1/2 transform p-2 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default BankDetailItem;
