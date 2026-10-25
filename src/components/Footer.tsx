import Link from 'next/link';
import { author, topics } from '@/utils/site';
import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="footer-logo">Youmake</span>
          <p className="footer-tagline">
            Notes on building websites, apps and agents with AI. Describe it. Ship it.
          </p>
        </div>

        <div className="footer-links">
          {/* Every page links to every topic hub, so all articles stay two clicks from anywhere. */}
          <div className="footer-column">
            <h4>Topics</h4>
            {topics.map((topic) => (
              <Link key={topic.slug} href={`/topics/${topic.slug}`}>{topic.name}</Link>
            ))}
          </div>

          <div className="footer-column">
            <h4>Product</h4>
            <a href="https://www.youmake.dev/" target="_blank" rel="noopener noreferrer">
              Try Youmake
            </a>
            <a href="https://www.youmake.dev/#pricing" target="_blank" rel="noopener noreferrer">
              Pricing
            </a>
            <a href="https://www.youmake.dev/integrations/docs" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </div>

          <div className="footer-column">
            <h4>Blog</h4>
            <Link href="/articles">All articles</Link>
            <Link href="/about">About {author.name}</Link>
            <a href={author.sameAs[0]} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={author.sameAs[1]} target="_blank" rel="noopener noreferrer">X</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Youmake. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
