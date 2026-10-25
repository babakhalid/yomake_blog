import Image from 'next/image';
import Link from 'next/link';
import { author } from '@/utils/site';
import './AuthorCard.css';

export const AUTHOR_PHOTO = '/images/authors/khalid-baba.webp';
export const AUTHOR_PHOTO_SMALL = '/images/authors/khalid-baba-160.webp';

export function AuthorAvatar({ size = 36 }: { size?: number }) {
  return (
    <Image
      src={AUTHOR_PHOTO_SMALL}
      alt={author.name}
      width={size}
      height={size}
      className="author-avatar"
    />
  );
}

// Compact "written by" block with photo, role and links to LinkedIn / X.
export function AuthorCard({ heading = 'Written by' }: { heading?: string }) {
  return (
    <aside className="author-card" aria-label="About the author">
      <Image src={AUTHOR_PHOTO} alt={author.name} width={96} height={96} className="author-card-photo" />
      <div className="author-card-body">
        <span className="eyebrow">{heading}</span>
        <p className="author-card-name"><Link href="/about">{author.name}</Link></p>
        <p className="author-card-role">{author.jobTitle}</p>
        <p className="author-card-bio">{author.bio}</p>
        <div className="author-card-links">
          <a href={author.sameAs[0]} target="_blank" rel="me noopener noreferrer" className="chip">LinkedIn</a>
          <a href={author.sameAs[1]} target="_blank" rel="me noopener noreferrer" className="chip">X</a>
          <Link href="/about" className="chip">All articles</Link>
        </div>
      </div>
    </aside>
  );
}
