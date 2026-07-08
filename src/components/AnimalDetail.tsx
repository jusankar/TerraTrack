/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Battery, 
  Wifi, 
  Activity, 
  Thermometer, 
  Heart, 
  Compass, 
  Calendar, 
  Check, 
  Play, 
  Route, 
  Navigation,
  Sparkles,
  Weight,
  Clock,
  User,
  ShieldAlert,
  Gauge
} from 'lucide-react';
import { Animal } from '../types';

interface AnimalDetailProps {
  animal: Animal;
  onBack: () => void;
  isLiveTracking: boolean;
  onToggleLiveTracking: () => void;
  showRouteHistory: boolean;
  onToggleRouteHistory: () => void;
  onOpenPlayback: () => void;
  onGetDirections: () => void;
}

export const AnimalDetail: React.FC<AnimalDetailProps> = ({
  animal,
  onBack,
  isLiveTracking,
  onToggleLiveTracking,
  showRouteHistory,
  onToggleRouteHistory,
  onOpenPlayback,
  onGetDirections
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'health' | 'timeline'>('info');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-[#E1EAD8] text-[#3A5A40] border-[#A3B18A]/40';
      case 'Idle': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Grazing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Battery Low': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Alert': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  // Check temperature status
  const getTempStatus = (temp: number) => {
    if (temp > 39.5) return { text: 'Elevated (Fever/Heat stress)', color: 'text-red-700' };
    if (temp < 38.0) return { text: 'Sub-normal (Chilled)', color: 'text-blue-700' };
    return { text: 'Optimal Range', color: 'text-[#3A5A40]' };
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button 
          id="btn-back-detail"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-3.5 py-1.5 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to List
        </button>
        <span className={`text-xs px-3 py-1 rounded-full border font-bold tracking-wide uppercase ${getStatusColor(animal.status)}`}>
          • {animal.status}
        </span>
      </div>

      {/* Animal Core Profile Banner Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-sm">
        {/* Absolute Background glows */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#E1EAD8]/40 rounded-full blur-2xl" />
        <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-stone-100 rounded-full blur-2xl" />

        {/* Big visual species icon placeholder */}
        <div className="w-20 h-20 bg-stone-50 border border-stone-200 shadow-sm rounded-2xl flex items-center justify-center text-4xl select-none">
          {animal.species === 'Cow' ? '🐄' : animal.species === 'Sheep' ? '🐑' : '🐐'}
        </div>

        <div className="text-center md:text-left flex-1 space-y-1 z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900">{animal.name}</h1>
            <span className="font-mono text-[10px] bg-stone-100 border border-stone-200 px-2 py-0.5 rounded text-stone-600 max-w-max mx-auto md:mx-0 font-bold">
              {animal.tagId}
            </span>
          </div>
          <p className="text-stone-500 text-xs font-medium">
            {animal.breed} • {animal.gender} • {animal.age} Years Old • {animal.weight} kg
          </p>
          <p className="text-stone-400 text-[10px] italic max-w-lg">
            Notes: {animal.notes || 'No special medical instructions logged.'}
          </p>
        </div>

        {/* Core Actions Panel */}
        <div className="flex flex-col gap-2 w-full md:w-auto z-10">
          <button 
            id="btn-track-live-detail"
            onClick={onToggleLiveTracking}
            className={`w-full md:w-36 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isLiveTracking 
                ? 'bg-[#3A5A40] hover:bg-[#3A5A40]/95 text-white shadow-md shadow-[#3A5A40]/10 animate-pulse'
                : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 shadow-sm'
            }`}
          >
            <Activity className="w-4 h-4" />
            {isLiveTracking ? 'Live Tracking...' : 'Track Live Location'}
          </button>
          <button 
            id="btn-playback-detail"
            onClick={onOpenPlayback}
            className="w-full md:w-36 py-2 bg-[#3A5A40]/10 hover:bg-[#3A5A40]/15 text-[#3A5A40] border border-[#3A5A40]/20 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Play className="w-4 h-4" /> Movement Playback
          </button>
        </div>
      </div>

      {/* Detail Tab Navigation */}
      <div className="flex border-b border-stone-200">
        {(['info', 'health', 'timeline'] as const).map(tab => (
          <button
            key={tab}
            id={`btn-tab-detail-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-xs font-bold capitalize transition-all border-b-2 -mb-[2px] cursor-pointer ${
              activeTab === tab 
                ? 'border-[#3A5A40] text-[#3A5A40]' 
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            {tab === 'info' ? 'Tracker Diagnostics' : tab === 'health' ? 'Health Analytics' : 'Movement Timeline'}
          </button>
        ))}
      </div>

      {/* Tab Panel Content */}
      <div className="transition-all duration-300">
        
        {/* Tab 1: Tracker Diagnostics */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade">
            {/* IoT telemetry info */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">IoT Hardware Node Information</h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-400">Transmitter ID</span>
                  <span className="text-stone-800 font-semibold">TX-{animal.tagId}-LORA</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-400">Node Firmware</span>
                  <span className="text-stone-800 font-semibold">{animal.firmware}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-400">Activation Date</span>
                  <span className="text-stone-800 font-semibold">{animal.activationDate}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100">
                  <span className="text-stone-400">Primary Edge Gateway</span>
                  <span className="text-stone-800 font-semibold">{animal.gateway}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-stone-400">LTE Link Status</span>
                  <span className="text-[#3A5A40] font-bold flex items-center gap-1">
                    <Wifi className="w-3.5 h-3.5" /> Connected
                  </span>
                </div>
              </div>
            </div>

            {/* Tracker status charts / gauges */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">Device Telemetry Vitality</h3>
                
                {/* Battery and Signal sliders */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-stone-500 flex items-center gap-1 font-medium"><Battery className="w-4 h-4" /> Battery Level</span>
                      <span className={`font-bold ${animal.battery < 20 ? 'text-red-600 animate-pulse' : 'text-[#3A5A40]'}`}>
                        {animal.battery}%
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${animal.battery < 20 ? 'bg-red-600' : 'bg-[#3A5A40]'}`} 
                        style={{ width: `${animal.battery}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-stone-500 flex items-center gap-1 font-medium"><Wifi className="w-4 h-4" /> Signal Strength</span>
                      <span className="text-blue-600 font-bold">
                        {animal.signal}/5 RSSI ({-(110 - (animal.signal * 15))} dBm)
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full" 
                        style={{ width: `${(animal.signal / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Path and GPS coordinates card */}
              <div className="bg-stone-50 border border-stone-200/80 p-3 rounded-xl space-y-2 mt-4 shadow-inner">
                <div className="flex justify-between text-[11px]">
                  <span className="text-stone-500 flex items-center gap-1"><Compass className="w-3.5 h-3.5 text-stone-400" /> Coordinates</span>
                  <span className="text-stone-800 font-mono font-medium">37.8923° N, 122.0456° W</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-stone-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-stone-400" /> Last GPS Sync</span>
                  <span className="text-stone-600 font-medium">{animal.lastUpdate}</span>
                </div>
                
                <div className="pt-2 border-t border-stone-200/60 flex justify-between gap-2">
                  <button 
                    id="btn-history-toggle"
                    onClick={onToggleRouteHistory}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      showRouteHistory 
                        ? 'bg-violet-100 text-violet-700 border-violet-200' 
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    <Route className="w-3.5 h-3.5" />
                    {showRouteHistory ? 'Hide Path Line' : 'Plot Path Line'}
                  </button>
                  <button 
                    id="btn-directions"
                    onClick={onGetDirections}
                    className="flex-1 py-1.5 bg-white hover:bg-stone-50 text-stone-600 text-[10px] font-bold rounded-lg border border-stone-200 hover:text-stone-900 flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5 text-stone-400" /> Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Health Diagnostics */}
        {activeTab === 'health' && (
          <div className="space-y-4 animate-fade">
            {/* Visual health score slider */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#E1EAD8] text-[#3A5A40] border border-[#A3B18A]/30 rounded-xl flex items-center justify-center font-black text-lg shadow-inner">
                    {animal.id === 'anim_5' ? '42' : '96'}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">Estimated Vitality & Health Score</h3>
                    <p className="text-stone-500 text-xs font-medium">Biometric algorithms processed from body temperature and gait movement</p>
                  </div>
                </div>
                
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                  animal.id === 'anim_5' ? 'bg-red-100 border-red-200 text-red-800' : 'bg-[#E1EAD8] border-[#A3B18A]/40 text-[#3A5A40]'
                }`}>
                  {animal.id === 'anim_5' ? '⚠️ Veterinary Attention Requested' : '🌱 Biometrics Fully Stable'}
                </span>
              </div>
            </div>

            {/* Health Vitals grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Temperature card */}
              <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium flex items-center gap-1"><Thermometer className="w-4 h-4 text-red-600" /> Body Temperature</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">{animal.temp}°C</span>
                </div>
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  {/* Gauge indicator: optimal is ~38.5 to 39.3 */}
                  <div 
                    className={`h-full rounded-full ${
                      animal.temp > 39.5 ? 'bg-red-600' : animal.temp < 38.0 ? 'bg-blue-600' : 'bg-[#3A5A40]'
                    }`} 
                    style={{ width: `${((animal.temp - 35) / 8) * 100}%` }}
                  />
                </div>
                <span className={`text-[10px] block font-mono font-semibold ${getTempStatus(animal.temp).color}`}>
                  {getTempStatus(animal.temp).text}
                </span>
              </div>

              {/* Heart rate card */}
              <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium flex items-center gap-1"><Heart className="w-4 h-4 text-rose-500 animate-pulse" /> Heart Pulse</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">{animal.heartRate} bpm</span>
                </div>
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 rounded-full" 
                    style={{ width: `${(animal.heartRate / 120) * 100}%` }}
                  />
                </div>
                <span className={`text-[10px] block font-semibold font-mono ${animal.heartRate > 90 ? 'text-amber-600' : 'text-[#3A5A40]'}`}>
                  {animal.heartRate > 90 ? '⚠️ Slightly elevated pace' : 'Optimal pulse range'}
                </span>
              </div>

              {/* Activity intensity */}
              <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium flex items-center gap-1"><Activity className="w-4 h-4 text-blue-500" /> Current Activity</span>
                  <span className="font-bold text-blue-800 text-xs bg-blue-100 px-2 py-0.5 rounded-full">{animal.activity}</span>
                </div>
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: animal.activity === 'Running' ? '100%' : animal.activity === 'Walking' ? '60%' : animal.activity === 'Grazing' ? '40%' : '10%' }}
                  />
                </div>
                <span className="text-[10px] text-stone-500 block font-semibold">
                  Walking speed: {animal.speed} km/h
                </span>
              </div>
            </div>

            {/* Health logs / Estimates summaries */}
            <div className="bg-[#F5F7F2] border border-stone-200/80 p-4 rounded-xl text-xs space-y-2 text-stone-700 shadow-sm">
              <h4 className="font-bold text-stone-850 text-xs">Daily Activity Estimates</h4>
              <div className="grid grid-cols-3 gap-4 text-center py-2">
                <div className="bg-white p-2.5 rounded-lg border border-stone-200 shadow-sm">
                  <span className="text-[10px] text-stone-400 block font-medium">Rest Duration</span>
                  <span className="text-stone-850 font-bold font-mono text-xs">8.5 hrs</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-stone-200 shadow-sm">
                  <span className="text-[10px] text-stone-400 block font-medium">Grazing Time</span>
                  <span className="text-stone-850 font-bold font-mono text-xs">6.2 hrs</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-stone-200 shadow-sm">
                  <span className="text-[10px] text-stone-400 block font-medium">Est. Distance</span>
                  <span className="text-stone-850 font-bold font-mono text-xs">4.8 km</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Movement Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-4 animate-fade">
            <div className="flex justify-between items-center bg-violet-50 border border-violet-200 px-4 py-2.5 rounded-xl text-xs text-violet-700 font-medium">
              <span>Timeline logs computed chronologically from gateway checkpoints today.</span>
              <button 
                id="btn-timeline-play"
                onClick={onOpenPlayback} 
                className="bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white font-bold text-[10px] px-2.5 py-1 rounded shadow-sm flex items-center gap-1 transition-all cursor-pointer"
              >
                <Play className="w-3 h-3" /> Replay Path
              </button>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-stone-200">
              {animal.path.map((point, index) => (
                <div key={index} className="relative flex items-start gap-4">
                  {/* Timeline point indicator */}
                  <span className={`absolute -left-[20px] top-1.5 w-3 h-3 rounded-full border-2 border-white ${
                    point.activity === 'Resting' ? 'bg-amber-500' : 
                    point.activity === 'Grazing' ? 'bg-blue-500' : 
                    point.activity === 'Running' ? 'bg-red-500' : 'bg-[#3A5A40]'
                  }`} />
                  
                  <div className="flex-1 bg-white border border-stone-200 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:border-[#3A5A40]/30 transition-all shadow-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{point.time}</span>
                        <span className="text-[10px] bg-stone-100 border border-stone-200 px-2 py-0.2 rounded-full text-stone-600 font-mono font-bold">
                          {point.activity}
                        </span>
                      </div>
                      <p className="text-stone-600 text-[11px] mt-1 font-medium">
                        {point.notes || `Livestock recorded ${point.activity.toLowerCase()} at standard pace.`}
                      </p>
                    </div>
                    
                    <div className="text-right font-mono text-[10px] text-stone-400">
                      <span>Coord: {point.x}, {point.y} • {point.speed} km/h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
