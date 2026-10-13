import Image from 'next/image';
import type { Shot } from '@/content/media';

/** A folder with papers peeking out (like the tools on arupb.com). The papers show screenshots when there are any. */
export function Folder({ shots = [], className, sizes = '96px' }: { shots?: Shot[]; className?: string; sizes?: string }) {
  const papers = shots.length ? shots.slice(0, 3) : [null, null];
  return (
    <span className={className ? `folder ${className}` : 'folder'} aria-hidden="true">
      <span className="folder__back" />
      {papers.map((shot, i) => (
        <span className="folder__paper" key={shot?.src.src ?? i}>
          {shot ? <Image src={shot.src} alt="" sizes={sizes} /> : null}
        </span>
      ))}
      <span className="folder__front" />
    </span>
  );
}
