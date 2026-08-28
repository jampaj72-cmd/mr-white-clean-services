import React from 'react';

interface AvatarProps {
  name: string;
  photo?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
};

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function colorFromName(name: string) {
  const colors = ['#0F8B8D', '#19B5B7', '#39B86A', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899'];
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffff;
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ name, photo, size = 'md', className = '' }: AvatarProps) {
  if (photo) {
    return <img src={photo} alt={name} className={`${sizes[size]} rounded-full object-cover flex-shrink-0 ${className}`} />;
  }
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 ${className}`}
      style={{ backgroundColor: colorFromName(name) }}
    >
      {initials(name)}
    </div>
  );
}
