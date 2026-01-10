import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="footer-logo">Yomake</span>
          <p className="footer-tagline">
            Build websites and web apps with AI - just describe what you want
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <a href="https://yomake.ai" target="_blank" rel="noopener noreferrer">
              Try Yomake
            </a>
            <a href="https://yomake.ai/pricing" target="_blank" rel="noopener noreferrer">
              Pricing
            </a>
            <a href="https://yomake.ai/docs" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="/articles">Blog</a>
            <a href="https://twitter.com/yomake_io" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://github.com/yomake" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Yomake. All rights reserved.</p>
          <p className="footer-built">
            #1 Vibe Coding Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
