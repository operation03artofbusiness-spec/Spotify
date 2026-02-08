import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search' },
  { href: '/library', label: 'Your Library' }
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 flex-col gap-6 border-r border-white/10 bg-spotify-dark p-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Pulse</p>
        <h1 className="text-2xl font-semibold">Streaming</h1>
      </div>
      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-4 py-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl bg-black/40 p-4 text-sm text-white/70">
        Upgrade to Pulse Premium for offline downloads and studio-quality audio.
      </div>
    </aside>
  );
}
