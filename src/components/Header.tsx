'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import './Header.css';

const NAV = [
  { href: '/articles', label: 'Articles', exact: true },
  { href: '/topics/vibe-coding', label: 'Vibe coding', exact: false },
  { href: '/about', label: 'About', exact: false },
];

// Floating pill navbar, same shape as the main app's (www.youmake.dev).
export function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="header-pill">
        <Link href="/" className="logo" aria-label="Youmake Blog home">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny SVG logo, nothing to optimize */}
          <img src="/youmake_logo.svg" alt="" className="logo-icon" width="24" height="24" />
          <span className="logo-text">Youmake</span>
          <span className="logo-tag">Blog</span>
        </Link>

        <nav className="nav" aria-label="Main">
          {NAV.map(({ href, label, exact }) => {
            const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} className={`nav-link${active ? ' active' : ''}`} aria-current={active ? 'page' : undefined}>
                {label}
              </Link>
            );
          })}
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
