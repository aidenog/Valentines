'use client';

import { useState, useRef, useEffect } from 'react';
import Confetti from '@/components/confetti';
import { AnimatedButton } from '@/components/animated-button';

export default function ValentineCard() {
  const [stage, setStage] = useState<'question' | 'success'>('question');
  const [messageIndex, setMessageIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const confettiRef = useRef<{ trigger: () => void }>(null);
  const heartIdRef = useRef(0);

  const messages = [
    'Are you sure? 🥺',
    'Please Na 😳',
    'Aise nhi kro 😤',
    "Maaaannnnnn Jaooooo 😭",
    'Say YES already 💕',
  ];

  const handleNoClick = () => {
    const nextIndex = (messageIndex + 1) % messages.length;
    setMessageIndex(nextIndex);
    setYesScale((prev) => Math.min(prev + 0.2, 3));
    
    // Add floating hearts on NO click
    const newHeart = {
      id: heartIdRef.current++,
      x: Math.random() * 100,
    };
    setHearts((prev) => [...prev, newHeart]);
    
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 3000);
  };

  const handleYesClick = () => {
    setStage('success');
    confettiRef.current?.trigger();
  };

  return (
    <>
      <Confetti ref={confettiRef} />
      
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl animate-floating-hearts"
            style={{
              left: `${heart.x}%`,
              bottom: '0',
            }}
          >
            💕
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center min-h-screen px-4 relative">
        <div className="text-center max-w-md w-full">
          {stage === 'question' ? (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold text-rose-600 mb-4 animate-pulse-glow">
                  {messageIndex === 0 ? '💖' : ''}
                  {messageIndex === 1 ? '😍' : ''}
                  {messageIndex === 2 ? '🥰' : ''}
                  {messageIndex === 3 ? '😢' : ''}
                  {messageIndex === 4 ? '💕' : ''}
                </h1>
                <p className="text-3xl md:text-4xl font-bold text-gray-800 animate-bounce-gentle">
                  {messageIndex === 0
                    ? 'Will you be my Valentine Sukkuu? 💖'
                    : messages[messageIndex]}
                </p>
              </div>

              <div className="relative h-24 flex items-center justify-center gap-4">
                <AnimatedButton
                  onClick={handleYesClick}
                  scale={yesScale}
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                >
                  YES ❤️
                </AnimatedButton>

                <AnimatedButton
                  onClick={handleNoClick}
                  isMoving={true}
                  className="bg-gray-500 hover:bg-gray-600 text-white"
                >
                  NO 😒
                </AnimatedButton>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                (Na Keh kr dikhao... 😉)
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="text-7xl md:text-8xl animate-heart-beat">
                💕
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-rose-600 animate-scale-bounce">
                YAY!!! 🎉
              </h2>
              <p className="text-2xl md:text-3xl text-gray-700 animate-float">
                You're my Valentine 😍
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setStage('question');
                    setMessageIndex(0);
                    setYesScale(1);
                    setHearts([]);
                  }}
                  className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full transition-colors hover:scale-105 active:scale-95"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
