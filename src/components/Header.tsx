import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <img
            src="/youmake_logo.svg"
            alt="Youmake"
            className="logo-icon"
            width="32"
            height="32"
          />
          <span className="logo-text">Youmake Blog</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/articles" className="nav-link">
            Articles
          </Link>
          <a
            href="https://youmake.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-button"
          >
            Try Youmake
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
