'use client';

import { useState, useRef, useEffect } from 'react';
import ValentineCard from '@/components/valentine-card';

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-100 via-red-50 to-pink-50">
      <ValentineCard />
    </main>
  );
}
