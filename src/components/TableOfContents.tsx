'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/utils/articles';

// Sticky "On this page" list. The links work without JS; the observer only
// highlights the section being read.
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    const targets = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    // Current section = the last heading above the top quarter of the viewport.
    // Recomputed from positions (not from which entry fired) so a fast scroll
    // that skips headings past a narrow band still lands on the right one.
    const update = () => {
      const line = window.innerHeight * 0.25;
      let current: string | undefined;
      for (const el of targets) {
        if (el.getBoundingClientRect().top > line) break;
        current = el.id;
      }
      setActive(current);
    };
    const observer = new IntersectionObserver(update, { threshold: [0, 1] });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="toc" aria-label="On this page">
      <span className="eyebrow">On this page</span>
      <ol>
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a href={`#${id}`} className={active === id ? 'active' : undefined} aria-current={active === id ? 'location' : undefined}>
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
