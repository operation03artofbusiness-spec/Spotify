'use client';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/50 px-4 py-2">
      <span className="text-white/50">Search</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Songs, artists, albums"
        className="w-full bg-transparent text-sm text-white outline-none"
      />
    </div>
  );
}
