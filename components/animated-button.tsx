'use client';

import React from "react"

import { useState } from 'react';

interface AnimatedButtonProps {
  onClick: () => void;
  scale?: number;
  isMoving?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedButton({
  onClick,
  scale = 1,
  isMoving = false,
  children,
  className = '',
}: AnimatedButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    if (isMoving) {
      const x = Math.random() * 300 - 150;
      const y = Math.random() * 200 - 100;
      setPosition({ x, y });
    }
  };

  const handleClick = () => {
    if (isMoving) {
      const x = Math.random() * 300 - 150;
      const y = Math.random() * 200 - 100;
      setPosition({ x, y });
    }
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        transition: isMoving
          ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          : 'transform 0.15s ease-out',
      }}
      className={`px-8 py-3 text-lg font-bold rounded-full transition-all duration-200 active:scale-95 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden ${className}`}
    >
      {/* Shine effect */}
      <span className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-pulse opacity-0 hover:opacity-100 transition-opacity" />
      
      {/* Content with glow on YES button */}
      <span className={`relative z-10 ${scale > 1 ? 'drop-shadow-lg' : ''}`}>
        {children}
      </span>
    </button>
  );
}
