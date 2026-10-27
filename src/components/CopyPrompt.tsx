'use client';

import { useState } from 'react';

// The template prompt with a copy button; the text itself is server-rendered.
export function CopyPrompt({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the prompt is still selectable on the page.
    }
  };

  return (
    <div className="prompt-box">
      <p className="prompt-text">{prompt}</p>
      <button type="button" className="btn prompt-copy" onClick={copy} aria-live="polite">
        {copied ? 'Copied' : 'Copy prompt'}
      </button>
    </div>
  );
}
