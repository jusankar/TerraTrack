/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Calendar, 
  Clock, 
  Activity, 
  Compass, 
  Gauge, 
  X 
} from 'lucide-react';
import { Animal } from '../types';

interface MovementPlaybackProps {
  animal: Animal;
  playbackPathIndex: number;
  onSetPathIndex: (index: number) => void;
  playbackSpeed: number; // in ms per step
  onSetPlaybackSpeed: (speed: number) => void;
  playbackActive: boolean;
  onSetPlaybackActive: (active: boolean) => void;
  onClose: () => void;
}

export const MovementPlayback: React.FC<MovementPlaybackProps> = ({
  animal,
  playbackPathIndex,
  onSetPathIndex,
  playbackSpeed,
  onSetPlaybackSpeed,
  playbackActive,
  onSetPlaybackActive,
  onClose
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalSteps = animal.path.length;
  const currentPoint = animal.path[playbackPathIndex] || animal.path[0];

  // Playback timer effect
  useEffect(() => {
    if (playbackActive) {
      intervalRef.current = setInterval(() => {
        onSetPathIndex((playbackPathIndex + 1) % totalSteps);
      }, playbackSpeed);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playbackActive, playbackPathIndex, playbackSpeed, totalSteps]);

  const handlePlayPause = () => {
    onSetPlaybackActive(!playbackActive);
  };

  const handleReset = () => {
    onSetPlaybackActive(false);
    onSetPathIndex(0);
  };

  const handleSpeedChange = (speedMs: number) => {
    onSetPlaybackSpeed(speedMs);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xl relative overflow-hidden space-y-4">
      {/* Decorative indicator */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3A5A40] via-[#A3B18A] to-[#3A5A40]" />

      {/* Top Details & Close */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm">🔄</span>
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Historical Trail Replay</h3>
            <p className="text-stone-500 text-[10px] font-medium">Replaying movement history for <span className="text-[#3A5A40] font-bold">{animal.name}</span></p>
          </div>
        </div>
        
        <button 
          id="btn-close-playback"
          onClick={onClose} 
          className="p-1 bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 border border-stone-200 rounded-lg transition-all cursor-pointer shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Date Select & Current Stat Capsule */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl flex items-center gap-2 text-stone-700">
          <Calendar className="w-4 h-4 text-[#3A5A40]" />
          <div>
            <span className="text-[9px] text-stone-400 block leading-tight font-medium">Selected Date</span>
            <span className="font-bold text-stone-900 text-[11px]">Today (July 7, 2026)</span>
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl flex items-center gap-2 text-stone-700">
          <Clock className="w-4 h-4 text-[#3A5A40]" />
          <div>
            <span className="text-[9px] text-stone-400 block leading-tight font-medium">Timeline Stamp</span>
            <span className="font-mono font-bold text-[#3A5A40] text-[11px]">
              {currentPoint ? currentPoint.time : '00:00 AM'}
            </span>
          </div>
        </div>
      </div>

      {/* Primary scrubbing seek bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-stone-400 font-mono font-semibold">
          <span>Start ({animal.path[0]?.time})</span>
          <span>End ({animal.path[totalSteps - 1]?.time})</span>
        </div>
        
        <input 
          id="playback-range-slider"
          type="range"
          min="0"
          max={totalSteps - 1}
          value={playbackPathIndex}
          onChange={(e) => {
            onSetPlaybackActive(false);
            onSetPathIndex(parseInt(e.target.value));
          }}
          className="w-full accent-[#3A5A40] h-1.5 bg-stone-200 rounded-lg cursor-pointer"
        />
      </div>

      {/* Control Buttons Grid */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200 shadow-sm">
        
        {/* Play Pause Reset Group */}
        <div className="flex items-center gap-2">
          <button 
            id="btn-play-playback"
            onClick={handlePlayPause}
            className={`p-2.5 rounded-xl transition-all shadow-md text-white cursor-pointer ${
              playbackActive ? 'bg-[#D4A373] hover:bg-[#D4A373]/90 text-stone-900' : 'bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white'
            }`}
            title={playbackActive ? 'Pause' : 'Play'}
          >
            {playbackActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          <button 
            id="btn-reset-playback"
            onClick={handleReset}
            className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 rounded-xl transition-all cursor-pointer shadow-sm"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed multiplier selection */}
        <div className="flex items-center gap-1 bg-stone-100 border border-stone-200 p-1 rounded-xl text-[10px] font-bold">
          <button 
            id="btn-speed-1x"
            onClick={() => handleSpeedChange(1500)}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              playbackSpeed === 1500 ? 'bg-[#3A5A40] text-white shadow-sm' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            1x
          </button>
          <button 
            id="btn-speed-2x"
            onClick={() => handleSpeedChange(800)}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              playbackSpeed === 800 ? 'bg-[#3A5A40] text-white shadow-sm' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            2x Speed
          </button>
          <button 
            id="btn-speed-4x"
            onClick={() => handleSpeedChange(300)}
            className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              playbackSpeed === 300 ? 'bg-[#3A5A40] text-white shadow-sm' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            4x Speed
          </button>
        </div>

      </div>

      {/* Active Checkpoint Card Summary */}
      {currentPoint && (
        <div className="bg-gradient-to-r from-[#F5F7F2] to-[#E1EAD8]/30 border border-stone-200 p-3 rounded-xl flex items-start gap-3 shadow-sm">
          <span className="p-2 bg-[#E1EAD8] text-[#3A5A40] rounded-lg">
            <Activity className="w-4 h-4" />
          </span>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900">Status: {currentPoint.activity}</span>
              <span className="font-mono text-[9px] text-[#3A5A40] font-bold">Step {playbackPathIndex + 1} of {totalSteps}</span>
            </div>
            <p className="text-stone-600 text-[11px] leading-snug font-medium">
              {currentPoint.notes || `${animal.name} was recorded ${currentPoint.activity.toLowerCase()} at a speed of ${currentPoint.speed} km/h.`}
            </p>
            <div className="grid grid-cols-2 gap-x-4 pt-1 font-mono text-[10px] text-stone-400 font-semibold">
              <span>Speed: {currentPoint.speed} km/h</span>
              <span>Coord: {currentPoint.x}, {currentPoint.y}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
