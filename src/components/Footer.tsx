import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="footer-logo">Youmake</span>
          <p className="footer-tagline">
            Build websites and web apps with AI - just describe what you want
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <a href="https://youmake.dev" target="_blank" rel="noopener noreferrer">
              Try Youmake
            </a>
            <a href="https://youmake.dev/pricing" target="_blank" rel="noopener noreferrer">
              Pricing
            </a>
            <a href="https://youmake.dev/docs" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="/articles">Blog</a>
            <a href="https://twitter.com/youmake_dev" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://github.com/youmake" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Youmake. All rights reserved.</p>
          <p className="footer-built">
            #1 Vibe Coding Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
