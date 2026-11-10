import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  className?: string;
}

const AVATAR_PALETTES = [
  'from-cyan-600 to-blue-700 text-cyan-50',
  'from-indigo-600 to-purple-700 text-indigo-50',
  'from-emerald-600 to-teal-700 text-emerald-50',
  'from-amber-600 to-orange-700 text-amber-50',
];

function getInitials(name: string): string {
  const cleaned = name
    .replace(/^(ดร\.|ครู|ผศ\.|รศ\.|ศ\.|นาย|นาง|นางสาว)\s*/g, '')
    .trim();
  if (!cleaned) return 'ค';
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
}

function getPalette(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_PALETTES[Math.abs(hash) % AVATAR_PALETTES.length];
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, className = 'w-10 h-10' }) => {
  const [imgError, setImgError] = useState(false);

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${className} rounded-full object-cover flex-shrink-0`}
      />
    );
  }

  return (
    <div
      aria-label={name}
      className={`${className} rounded-full bg-gradient-to-br ${getPalette(name)} flex items-center justify-center font-bold text-xs tracking-tight flex-shrink-0 select-none`}
    >
      {getInitials(name)}
    </div>
  );
};
