import Image from 'next/image';

interface MediaCardProps {
  title: string;
  description: string;
  artwork: string;
}

export function MediaCard({ title, description, artwork }: MediaCardProps) {
  return (
    <div className="group min-w-[220px] rounded-2xl bg-spotify-card p-4 transition hover:-translate-y-1 hover:bg-white/10">
      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl">
        <Image src={artwork} alt={title} fill className="object-cover" unoptimized />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  );
}
