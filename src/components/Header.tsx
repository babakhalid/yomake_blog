import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import './Header.css';

// Floating pill navbar, same shape as the main app's (www.youmake.dev).
export function Header() {
  return (
    <header className="header">
      <div className="header-pill">
        <Link to="/" className="logo" aria-label="Youmake Blog home">
          <img src="/youmake_logo.svg" alt="" className="logo-icon" width="24" height="24" />
          <span className="logo-text">Youmake</span>
          <span className="logo-tag">Blog</span>
        </Link>

        <nav className="nav" aria-label="Main">
          <NavLink to="/articles" end className="nav-link">Articles</NavLink>
          <NavLink to="/topics/vibe-coding" className="nav-link">Vibe coding</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a href="https://www.youmake.dev/" className="btn btn-primary header-cta">
            Start building
          </a>
        </div>
      </div>
    </header>
  );
}
