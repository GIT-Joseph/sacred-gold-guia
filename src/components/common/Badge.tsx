import React from 'react';
import { getTypeStyle } from '../../utils/typeColors';

interface BadgeProps {
  label: string;
  variant?: 'type' | 'default' | 'gold' | 'outline' | 'danger' | 'success';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', className = '' }) => {
  if (variant === 'type') {
    const style = getTypeStyle(label);
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm ${style.badge} ${className}`}>
        {label}
      </span>
    );
  }

  if (variant === 'gold') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 ${className}`}>
        {label}
      </span>
    );
  }

  if (variant === 'outline') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700 ${className}`}>
        {label}
      </span>
    );
  }

  if (variant === 'danger') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30 ${className}`}>
        {label}
      </span>
    );
  }

  if (variant === 'success') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 ${className}`}>
        {label}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 ${className}`}>
      {label}
    </span>
  );
};
