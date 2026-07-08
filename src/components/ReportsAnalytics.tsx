/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart, 
  TrendingUp, 
  Battery, 
  Activity, 
  MapPin, 
  Calendar,
  Layers,
  ChevronDown,
  Info,
  CheckCircle2
} from 'lucide-react';

export const ReportsAnalytics: React.FC = () => {
  const [activeReportTab, setActiveReportTab] = useState<'activity' | 'battery' | 'heatmap'>('activity');

  // Heatmap pasture data grid represent coordinates index
  const heatmapData = [
    [20, 45, 90, 10, 5],
    [80, 100, 75, 40, 15],
    [10, 60, 50, 95, 80],
    [5, 12, 30, 20, 40]
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Analytics Main Intro Card */}
      <div className="bg-[#F5F7F2] border border-stone-200 rounded-2xl p-5 shadow-sm">
        <span className="text-[#3A5A40] text-[10px] font-bold uppercase tracking-wider">Cloud Analytics & Big Data Suite</span>
        <h1 className="text-xl font-bold text-stone-900 mt-1">Livestock Behavioral Analytics</h1>
        <p className="text-stone-600 text-xs mt-1">Statistical intelligence parsed from dual-axis accelerometers and GPS tracking nodes.</p>
      </div>

      {/* Analytics Tabs */}
      <div className="flex bg-stone-100 border border-stone-200 p-1.5 rounded-xl text-xs shadow-inner">
        <button
          id="btn-report-tab-activity"
          onClick={() => setActiveReportTab('activity')}
          className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeReportTab === 'activity' ? 'bg-[#3A5A40] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Activity className="w-4 h-4" /> Activity & Movement
        </button>
        <button
          id="btn-report-tab-battery"
          onClick={() => setActiveReportTab('battery')}
          className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeReportTab === 'battery' ? 'bg-[#3A5A40] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Battery className="w-4 h-4" /> Power & Uptime
        </button>
        <button
          id="btn-report-tab-heatmap"
          onClick={() => setActiveReportTab('heatmap')}
          className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeReportTab === 'heatmap' ? 'bg-[#3A5A40] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <MapPin className="w-4 h-4" /> Pasture Heatmap
        </button>
      </div>

      {/* Main Content Areas */}
      <div className="space-y-6">

        {/* Tab 1: Activity & Movement Analytics */}
        {activeReportTab === 'activity' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Daily Distance Bar Chart */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Daily Distance Travelled (km)</h3>
                <p className="text-stone-500 text-[11px] font-medium">Compare current total pasture walking distances</p>
              </div>

              {/* Responsive SVG Bar Chart */}
              <div className="w-full h-48 mt-4">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* Grid lines */}
                  <line x1="40" y1="20" x2="380" y2="20" stroke="#f5f5f4" strokeWidth="1" strokeDasharray="4,4" />
                  <line x1="40" y1="70" x2="380" y2="70" stroke="#f5f5f4" strokeWidth="1" strokeDasharray="4,4" />
                  <line x1="40" y1="120" x2="380" y2="120" stroke="#f5f5f4" strokeWidth="1" strokeDasharray="4,4" />
                  <line x1="40" y1="170" x2="380" y2="170" stroke="#e7e5e4" strokeWidth="1" />

                  {/* Y Axis labels */}
                  <text x="30" y="24" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">6km</text>
                  <text x="30" y="74" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">4km</text>
                  <text x="30" y="124" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">2km</text>
                  <text x="30" y="174" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">0km</text>

                  {/* Bars (Daisy 4.8km, Bella 1.1km, Pip 2.4km, Rocky 3.9km, Duke 5.5km) */}
                  {/* Daisy */}
                  <rect x="65" y="50" width="30" height="120" fill="url(#greenBar)" rx="3" className="transition-all hover:opacity-85" />
                  <text x="80" y="44" fill="#3A5A40" fontSize="9" fontWeight="bold" textAnchor="middle">4.8</text>
                  <text x="80" y="185" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Daisy</text>

                  {/* Bella */}
                  <rect x="130" y="142" width="30" height="28" fill="url(#greenBar)" rx="3" className="transition-all hover:opacity-85" />
                  <text x="145" y="136" fill="#3A5A40" fontSize="9" fontWeight="bold" textAnchor="middle">1.1</text>
                  <text x="145" y="185" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Bella</text>

                  {/* Pip */}
                  <rect x="195" y="110" width="30" height="60" fill="url(#greenBar)" rx="3" className="transition-all hover:opacity-85" />
                  <text x="210" y="104" fill="#3A5A40" fontSize="9" fontWeight="bold" textAnchor="middle">2.4</text>
                  <text x="210" y="185" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Pip</text>

                  {/* Rocky */}
                  <rect x="260" y="72" width="30" height="98" fill="url(#greenBar)" rx="3" className="transition-all hover:opacity-85" />
                  <text x="275" y="66" fill="#3A5A40" fontSize="9" fontWeight="bold" textAnchor="middle">3.9</text>
                  <text x="275" y="185" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Rocky</text>

                  {/* Duke */}
                  <rect x="325" y="32" width="30" height="138" fill="url(#woodBar)" rx="3" className="transition-all hover:opacity-85" />
                  <text x="340" y="26" fill="#B58250" fontSize="9" fontWeight="bold" textAnchor="middle">5.5</text>
                  <text x="340" y="185" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Duke</text>

                  <defs>
                    <linearGradient id="greenBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A3B18A" />
                      <stop offset="100%" stopColor="#3A5A40" />
                    </linearGradient>
                    <linearGradient id="woodBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4A373" />
                      <stop offset="100%" stopColor="#B58250" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Weekly Grazing Intensity Line Chart */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Weekly Grazing Intensity</h3>
                  <p className="text-stone-500 text-[11px] font-medium">Average grazing hours per day across herd</p>
                </div>
                <span className="text-[10px] bg-[#E1EAD8] text-[#3A5A40] border border-[#3A5A40]/10 px-2 py-0.5 rounded-full font-bold">
                  +12.4% vs Last Week
                </span>
              </div>

              {/* SVG Area Line Chart */}
              <div className="w-full h-48">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3A5A40" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#3A5A40" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="380" y2="20" stroke="#f5f5f4" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="40" y1="70" x2="380" y2="70" stroke="#f5f5f4" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="40" y1="120" x2="380" y2="120" stroke="#f5f5f4" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="40" y1="170" x2="380" y2="170" stroke="#e7e5e4" strokeWidth="1" />

                  {/* Axis scale */}
                  <text x="30" y="24" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">10h</text>
                  <text x="30" y="74" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">5h</text>
                  <text x="30" y="124" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">2h</text>
                  <text x="30" y="174" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">0h</text>

                  {/* Area fill */}
                  {/* Coordinates: Mon (55, 120), Tue (105, 90), Wed (155, 110), Thu (205, 60), Fri (255, 80), Sat (305, 50), Sun (355, 70) */}
                  <path 
                    d="M 55,120 L 105,90 L 155,110 L 205,60 L 255,80 L 305,50 L 355,70 L 355,170 L 55,170 Z" 
                    fill="url(#areaGrad)" 
                  />

                  {/* Line overlay */}
                  <path 
                    d="M 55,120 L 105,90 L 155,110 L 205,60 L 255,80 L 305,50 L 355,70" 
                    fill="none" 
                    stroke="#3A5A40" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                  />

                  {/* Dots at data points */}
                  <circle cx="55" cy="120" r="4" fill="#fff" stroke="#3A5A40" strokeWidth="2" />
                  <circle cx="105" cy="90" r="4" fill="#fff" stroke="#3A5A40" strokeWidth="2" />
                  <circle cx="155" cy="110" r="4" fill="#fff" stroke="#3A5A40" strokeWidth="2" />
                  <circle cx="205" cy="60" r="4" fill="#fff" stroke="#3A5A40" strokeWidth="2" />
                  <circle cx="255" cy="80" r="4" fill="#fff" stroke="#3A5A40" strokeWidth="2" />
                  <circle cx="305" cy="50" r="4" fill="#fff" stroke="#3A5A40" strokeWidth="2" />
                  <circle cx="355" cy="70" r="4" fill="#fff" stroke="#3A5A40" strokeWidth="2" />

                  {/* Days Labels */}
                  <text x="55" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Mon</text>
                  <text x="105" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Tue</text>
                  <text x="155" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Wed</text>
                  <text x="205" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Thu</text>
                  <text x="255" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Fri</text>
                  <text x="305" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Sat</text>
                  <text x="355" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Sun</text>
                </svg>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Battery & Connectivity Analytics */}
        {activeReportTab === 'battery' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Battery Decay Trends */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-stone-900">IoT Node Battery Degradation</h3>
                <p className="text-stone-500 text-[11px] font-medium">7-day charge decay gradient across devices</p>
              </div>

              <div className="w-full h-48">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="380" y2="20" stroke="#f5f5f4" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="40" y1="95" x2="380" y2="95" stroke="#f5f5f4" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="40" y1="170" x2="380" y2="170" stroke="#e7e5e4" strokeWidth="1" />

                  {/* Y Axis labels */}
                  <text x="30" y="24" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">100%</text>
                  <text x="30" y="99" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">50%</text>
                  <text x="30" y="174" fill="#a8a29e" fontSize="10" textAnchor="end" fontFamily="monospace" fontWeight="bold">0%</text>

                  {/* Decay Line 1 (Standard Daisy) - Slow slope */}
                  <path d="M 50,30 L 100,35 L 150,38 L 200,43 L 250,46 L 300,50 L 350,54" fill="none" stroke="#3A5A40" strokeWidth="2.5" />
                  <text x="360" y="56" fill="#3A5A40" fontSize="9" fontWeight="bold">Daisy</text>

                  {/* Decay Line 2 (Pip SHP-108) - Fast slope */}
                  <path d="M 50,40 L 100,58 L 150,88 L 200,112 L 250,132 L 300,154 L 350,165" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="3,1" />
                  <text x="360" y="168" fill="#EF4444" fontSize="9" fontWeight="bold">Pip (Faulty)</text>

                  {/* Days */}
                  <text x="50" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Jul 1</text>
                  <text x="150" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Jul 3</text>
                  <text x="250" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Jul 5</text>
                  <text x="350" y="186" fill="#78716c" fontSize="9" fontWeight="semibold" textAnchor="middle">Jul 7</text>
                </svg>
              </div>
            </div>

            {/* Gateway Uptime statistics */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Edge Gateway Connected Health</h3>
                <p className="text-stone-500 text-[11px] font-medium">Network ping diagnostics and gateway loading quotients</p>
              </div>

              <div className="space-y-4 py-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-stone-700 font-semibold">GW-HT-901 (North Pasture)</span>
                    <span className="text-[#3A5A40] font-bold font-mono">99.8% Online</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200/50">
                    <div className="h-full bg-[#3A5A40] rounded-full" style={{ width: '99.8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-stone-700 font-semibold">GW-MT-802 (South Pasture)</span>
                    <span className="text-[#3A5A40] font-bold font-mono">98.2% Online</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200/50">
                    <div className="h-full bg-[#3A5A40] rounded-full" style={{ width: '98.2%' }} />
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F7F2] border border-stone-200 p-3 rounded-xl flex items-center gap-2 text-xs text-stone-600 mt-2 font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#3A5A40]" />
                <span>Both sub-GHz LoRaWAN gateways are emitting beacon packages smoothly.</span>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Pasture Heatmap Grid overlay */}
        {activeReportTab === 'heatmap' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-stone-900">Forage & Grazing Field Heatmap</h3>
              <p className="text-stone-500 text-[11px] font-medium">Identifies high-density coordinates to monitor vegetation deplete levels</p>
            </div>

            {/* Interactive Grid representing different zones */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {heatmapData.flatMap((row, rIdx) => 
                row.map((val, cIdx) => {
                  // color opacity based on val
                  let bgClass = 'bg-stone-50 border-stone-200 text-stone-500';
                  if (val > 80) bgClass = 'bg-[#3A5A40] text-white border-[#3A5A40] shadow-sm';
                  else if (val > 50) bgClass = 'bg-[#E1EAD8] text-stone-900 border-stone-300 font-bold';
                  else if (val > 25) bgClass = 'bg-[#E1EAD8]/60 text-[#3A5A40] border-stone-200';
                  else if (val > 10) bgClass = 'bg-[#E1EAD8]/30 text-[#3A5A40]/70 border-stone-100';

                  return (
                    <div 
                      key={`${rIdx}-${cIdx}`}
                      className={`h-16 rounded-xl border flex flex-col justify-between p-2 font-mono text-[9px] transition-all hover:scale-105 cursor-crosshair shadow-sm ${bgClass}`}
                    >
                      <span className="font-bold">Grid {String.fromCharCode(65 + rIdx)}{cIdx + 1}</span>
                      <span className="text-right text-[10px] font-bold">{val}% density</span>
                    </div>
                  );
                })
              )}
            </div>

            <div className="bg-[#F5F7F2] border border-[#3A5A40]/15 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-stone-600 mt-2">
              <Info className="w-4 h-4 text-[#3A5A40] mt-0.5 shrink-0" />
              <div>
                <span className="text-stone-900 font-bold">Grazing Recommendation</span>
                <p className="mt-0.5 leading-snug font-medium">Grid B2 and C4 are currently heavily overgrazed (95%+ occupancy). Recommend shifting the Main Pasture geofence westward into Grid D1-D3 to allow clover forage regrowth.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
