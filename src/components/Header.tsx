import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img
            src="/yomake_logo.svg"
            alt="Yomake"
            className="logo-icon"
            width="32"
            height="32"
          />
          <span className="logo-text">Yomake Blog</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/articles" className="nav-link">
            Articles
          </Link>
          <a
            href="https://yomake.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-button"
          >
            Try Yomake
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
