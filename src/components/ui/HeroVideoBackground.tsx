import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Film } from 'lucide-react';

interface HeroVideoBackgroundProps {
  videoId?: string;
  overlayOpacity?: number;
  darkMode?: boolean;
}

export function HeroVideoBackground({
  videoId = 'LXb3EKWsInQ', // YouTube video showcasing tech & fintech innovation in Africa
  overlayOpacity = 0.88,
  darkMode = false
}: HeroVideoBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${darkMode ? 'bg-[#070708]' : 'bg-white'}`}>
      {/* YouTube Background Video Container */}
      <div className={`absolute inset-0 w-full h-full scale-125 lg:scale-110 pointer-events-none ${darkMode ? 'opacity-35' : 'opacity-40'}`}>
        <iframe
          className="w-full h-full object-cover border-0"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&enablejsapi=1&playsinline=1`}
          title="Africa Fintech Revolution"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* Crisp Non-Gradient Backdrop Overlay ensuring high-contrast text legibility */}
      <div 
        className={`absolute inset-0 ${darkMode ? 'bg-[#070708]' : 'bg-white'} backdrop-blur-[1px]`}
        style={{ opacity: overlayOpacity }}
      />

      {/* Subtle Bottom Border Divider */}
      <div className={`absolute bottom-0 left-0 right-0 h-px ${darkMode ? 'bg-zinc-800' : 'bg-gray-200/80'} pointer-events-none`} />

      {/* Small Video Credit Badge */}
      <div className="absolute bottom-3 right-6 pointer-events-auto hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 text-white text-[10px] font-mono border border-zinc-700/60 shadow-lg">
        <Film className="w-3 h-3 text-[#D5FF2F]" />
        <span>CINEMATIC BACKGROUND: FINTECH REVOLUTION IN AFRICA</span>
      </div>
    </div>
  );
}
