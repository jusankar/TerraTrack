/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Navigation, 
  Layers, 
  AlertTriangle, 
  Info,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Animal, Geofence, MapCoordinate } from '../types';

interface InteractiveMapProps {
  animals: Animal[];
  selectedAnimalId: string | null;
  onSelectAnimal: (animalId: string) => void;
  geofences: Geofence[];
  onUpdateGeofences?: (geofences: Geofence[]) => void;
  isDrawingGeofence: boolean;
  drawingType: 'circular' | 'polygon' | null;
  onFinishDrawingGeofence?: (newFence: Geofence) => void;
  playbackMode: boolean;
  playbackPathIndex: number;
  showRouteHistory: boolean;
  routeHistoryRange: string;
  isLiveTracking: boolean;
  mapStyle: 'terrain' | 'satellite' | 'standard';
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  animals,
  selectedAnimalId,
  onSelectAnimal,
  geofences,
  onUpdateGeofences,
  isDrawingGeofence,
  drawingType,
  onFinishDrawingGeofence,
  playbackMode,
  playbackPathIndex,
  showRouteHistory,
  routeHistoryRange,
  isLiveTracking,
  mapStyle
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<MapCoordinate>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<MapCoordinate>({ x: 0, y: 0 });
  
  // Geofence drawing state
  const [drawnPoints, setDrawnPoints] = useState<MapCoordinate[]>([]);
  const [drawnRadius, setDrawnRadius] = useState<number>(80);

  // Auto-focus zoom on selected animal
  useEffect(() => {
    if (selectedAnimalId) {
      const selected = animals.find(a => a.id === selectedAnimalId);
      if (selected) {
        // Smoothly center the map on this animal's coordinate
        const targetX = 500 - selected.coordinates.x;
        const targetY = 400 - selected.coordinates.y;
        setPanOffset({ x: targetX, y: targetY });
        setZoomLevel(1.5);
      }
    } else {
      // Reset if none selected
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [selectedAnimalId]);

  // Handle map click for drawing geofences or clicking empty space
  const handleMapClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!isDrawingGeofence || !drawingType) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    
    // Convert screen coordinates to SVG viewBox coordinates (1000x800)
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    
    // Scale appropriately based on zoom and pan
    const viewPortWidth = rect.width;
    const viewPortHeight = rect.height;
    
    const svgX = Math.round((rawX / viewPortWidth) * 1000);
    const svgY = Math.round((rawY / viewPortHeight) * 800);

    if (drawingType === 'polygon') {
      const newPoints = [...drawnPoints, { x: svgX, y: svgY }];
      setDrawnPoints(newPoints);
      
      // If we have 4 points, auto-finish polygon
      if (newPoints.length === 4 && onFinishDrawingGeofence) {
        const fence: Geofence = {
          id: `fence_${Date.now()}`,
          name: `Custom Pasture ${geofences.length + 1}`,
          type: 'polygon',
          coordinates: newPoints,
          color: '#3B82F6',
          isActive: true,
          alertOnExit: true,
          alertOnEntry: false
        };
        onFinishDrawingGeofence(fence);
        setDrawnPoints([]);
      }
    } else if (drawingType === 'circular') {
      if (onFinishDrawingGeofence) {
        const fence: Geofence = {
          id: `fence_${Date.now()}`,
          name: `Custom Circular Zone ${geofences.length + 1}`,
          type: 'circular',
          coordinates: [{ x: svgX, y: svgY }],
          radius: drawnRadius,
          color: '#F59E0B',
          isActive: true,
          alertOnExit: true,
          alertOnEntry: true
        };
        onFinishDrawingGeofence(fence);
      }
    }
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawingGeofence) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
  };

  // Status-to-color mapper
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return '#10B981'; // Green
      case 'Idle': return '#F59E0B'; // Yellow/Orange
      case 'Grazing': return '#3B82F6'; // Blue
      case 'Battery Low': return '#ED8936'; // Orange-red
      case 'Alert': return '#EF4444'; // Red
      default: return '#6B7280';
    }
  };

  const getSpeciesEmoji = (species: string) => {
    switch (species) {
      case 'Cow': return '🐄';
      case 'Sheep': return '🐑';
      case 'Goat': return '🐐';
      default: return '🐾';
    }
  };

  // Selected animal tracking state helper
  const activeAnimal = selectedAnimalId ? animals.find(a => a.id === selectedAnimalId) : null;

  return (
    <div className="relative w-full h-full bg-[#FAFAF9] overflow-hidden select-none rounded-2xl border border-stone-200 shadow-sm">
      {/* Background Grid & Compass Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(58,90,64,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(58,90,64,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Map Control Tools (Floating) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <button 
          id="btn-zoom-in"
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 3))}
          className="p-2.5 bg-white/95 text-stone-700 hover:bg-stone-50 border border-stone-200 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button 
          id="btn-zoom-out"
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.5))}
          className="p-2.5 bg-white/95 text-stone-700 hover:bg-stone-50 border border-stone-200 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button 
          id="btn-reset-view"
          onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
          className="p-2.5 bg-white/95 text-stone-700 hover:bg-stone-50 border border-stone-200 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          title="Recenter"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Map Information / Overlay Panel */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-white/95 backdrop-blur-md border border-stone-200 px-3.5 py-2.5 rounded-xl shadow-md flex flex-col gap-1.5 text-xs text-stone-600">
        <div className="flex items-center gap-2 font-bold text-stone-900">
          <Layers className="w-4 h-4 text-[#3A5A40]" />
          <span>Farm GIS Layer ({mapStyle.toUpperCase()})</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 font-mono text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
            <span>Healthy (Online)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block" />
            <span>Grazing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
            <span>Idle (Resting)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 block" />
            <span>Breached / Alert</span>
          </div>
        </div>
      </div>

      {/* Geofence Mode Ticker */}
      {isDrawingGeofence && (
        <div className="absolute top-4 right-4 z-20 bg-amber-50/95 backdrop-blur-md border border-amber-200 px-4 py-2 rounded-xl shadow-md flex items-center gap-2 text-xs text-amber-800 animate-pulse font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>
            {drawingType === 'polygon' 
              ? `Drawing Polygon Fence: Click 4 locations (${drawnPoints.length}/4 points)`
              : `Circular Fence Tool Active. Click Map to place center.`}
          </span>
        </div>
      )}

      {/* Map Canvas viewport */}
      <div 
        id="map-viewport"
        className={`w-full h-full cursor-grab ${isPanning ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <svg 
          viewBox="0 0 1000 800" 
          className="w-full h-full select-none"
          onClick={handleMapClick}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: '50% 50%',
            transition: isPanning ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* DEFINITIONS FOR GRADIENTS AND FILTERS */}
          <defs>
            <radialGradient id="lakeGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#A8DADC" />
              <stop offset="70%" stopColor="#457B9D" />
              <stop offset="100%" stopColor="#1D3557" />
            </radialGradient>
            
            <linearGradient id="grassTerrain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={mapStyle === 'satellite' ? '#1c2e15' : '#F5F7F2'} />
              <stop offset="100%" stopColor={mapStyle === 'satellite' ? '#12200d' : '#E1EAD8'} />
            </linearGradient>

            <linearGradient id="restrictedMarsh" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0.25" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* TERRAIN / MAP BASE LAYER */}
          <rect width="1000" height="800" fill="url(#grassTerrain)" />

          {/* SATELLITE ROAD & CONTOURS OR STANDARD TOPO GRAPHICS */}
          {mapStyle !== 'satellite' ? (
            <>
              {/* Topographical elevation lines */}
              <path d="M 50,100 Q 250,50 400,120 T 750,80 T 950,150" fill="none" stroke="#D4E4CF" strokeWidth="2" strokeDasharray="3,3" />
              <path d="M 50,150 Q 250,100 400,170 T 750,130 T 950,200" fill="none" stroke="#D4E4CF" strokeWidth="1.5" />
              <path d="M 20,400 Q 300,320 500,410 T 800,350 T 980,420" fill="none" stroke="#D4E4CF" strokeWidth="1.5" />
              <path d="M 10,650 Q 200,580 450,670 T 780,620 T 990,690" fill="none" stroke="#D4E4CF" strokeWidth="2" strokeDasharray="5,4" />
            </>
          ) : (
            <>
              {/* Satellite fields divider lines */}
              <line x1="500" y1="0" x2="500" y2="800" stroke="#253a1d" strokeWidth="1" />
              <line x1="0" y1="350" x2="1000" y2="350" stroke="#253a1d" strokeWidth="1" />
            </>
          )}

          {/* FARM WATERING HOLE (LAKE POND) */}
          <path 
            d="M 600,380 Q 660,330 750,370 T 820,460 Q 770,530 630,490 Z" 
            fill="url(#lakeGrad)" 
            stroke={mapStyle === 'satellite' ? '#253a1d' : '#457B9D'} 
            strokeWidth="3" 
            opacity="0.9" 
          />
          <text x="700" y="440" fill="#fff" fillOpacity="0.5" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" className="pointer-events-none">
            WATER POND
          </text>

          {/* TREE GROVES (GRAZING SHADES) */}
          <g opacity="0.85">
            {/* Grove 1 */}
            <circle cx="320" cy="220" r="35" fill="#A3B18A" opacity="0.8" />
            <circle cx="340" cy="240" r="30" fill="#588157" opacity="0.8" />
            <circle cx="300" cy="240" r="25" fill="#3A5A40" opacity="0.9" />
            
            {/* Grove 2 */}
            <circle cx="780" cy="620" r="40" fill="#A3B18A" opacity="0.8" />
            <circle cx="810" cy="600" r="30" fill="#588157" opacity="0.8" />
            <circle cx="750" cy="630" r="35" fill="#3A5A40" opacity="0.9" />

            {/* Labels */}
            <text x="320" y="275" fill={mapStyle === 'satellite' ? '#cbd5e0' : '#3A5A40'} fontSize="10" fontWeight="bold" textAnchor="middle">Oak Grove</text>
            <text x="780" y="675" fill={mapStyle === 'satellite' ? '#cbd5e0' : '#3A5A40'} fontSize="10" fontWeight="bold" textAnchor="middle">Clover Pasture</text>
          </g>

          {/* VILLAGE / BARN OUTLINE */}
          <g transform="translate(180, 600)" opacity="0.8">
            <rect x="0" y="0" width="80" height="60" rx="4" fill="#D4A373" stroke="#A3B18A" strokeWidth="2" />
            <polygon points="0,0 40,-30 80,0" fill="#3A5A40" stroke="#588157" strokeWidth="1.5" />
            <rect x="30" y="25" width="20" height="35" fill="#588157" />
            <text x="40" y="-35" fill={mapStyle === 'satellite' ? '#cbd5e0' : '#3A5A40'} fontSize="11" fontWeight="bold" textAnchor="middle">MAIN BARN</text>
          </g>

          {/* CLAY ROAD */}
          <path 
            d="M 50,550 Q 200,530 400,560 T 700,540 T 950,560" 
            fill="none" 
            stroke={mapStyle === 'satellite' ? '#5a4d3c' : '#edd6bc'} 
            strokeWidth="14" 
            strokeLinecap="round" 
            opacity="0.8" 
          />
          <path 
            d="M 50,550 Q 200,530 400,560 T 700,540 T 950,560" 
            fill="none" 
            stroke="#fff" 
            strokeWidth="1" 
            strokeDasharray="8,8" 
            strokeLinecap="round" 
            opacity="0.5" 
          />

          {/* GEOFENCES DISPLAY */}
          {geofences.map(fence => {
            if (fence.type === 'polygon' && fence.coordinates.length > 1) {
              const pointsStr = fence.coordinates.map(p => `${p.x},${p.y}`).join(' ');
              return (
                <g key={fence.id} opacity={fence.isActive ? 1 : 0.4}>
                  <polygon 
                    points={pointsStr} 
                    fill="none" 
                    stroke={fence.color} 
                    strokeWidth="3.5" 
                    strokeDasharray={fence.id === 'fence_1' ? '8,6' : '4,4'}
                    filter="url(#glow)"
                  />
                  <polygon 
                    points={pointsStr} 
                    fill={fence.color} 
                    fillOpacity="0.04"
                    className="cursor-pointer"
                  />
                  {/* Label in middle */}
                  <text 
                    x={fence.coordinates.reduce((sum, p) => sum + p.x, 0) / fence.coordinates.length}
                    y={fence.coordinates.reduce((sum, p) => sum + p.y, 0) / fence.coordinates.length - 20}
                    fill={fence.color}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-sans drop-shadow-md select-none pointer-events-none"
                  >
                    🚧 {fence.name.toUpperCase()}
                  </text>
                </g>
              );
            } else if (fence.type === 'circular' && fence.coordinates[0]) {
              const center = fence.coordinates[0];
              const radius = fence.radius || 80;
              return (
                <g key={fence.id} opacity={fence.isActive ? 1 : 0.4}>
                  <circle 
                    cx={center.x} 
                    cy={center.y} 
                    r={radius} 
                    fill="url(#restrictedMarsh)" 
                    stroke={fence.color} 
                    strokeWidth="3" 
                    strokeDasharray="6,4"
                    filter="url(#glow)"
                  />
                  {/* Label */}
                  <text 
                    x={center.x}
                    y={center.y - 10}
                    fill="#EF4444"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-sans drop-shadow-md pointer-events-none"
                  >
                    ⚠️ {fence.name}
                  </text>
                </g>
              );
            }
            return null;
          })}

          {/* DRAWING GEOFENCE TEMP GRAPHICS */}
          {isDrawingGeofence && drawingType === 'polygon' && drawnPoints.length > 0 && (
            <g>
              {/* Lines between points */}
              {drawnPoints.map((p, idx) => {
                if (idx === 0) return null;
                const prev = drawnPoints[idx - 1];
                return (
                  <line 
                    key={idx} 
                    x1={prev.x} 
                    y1={prev.y} 
                    x2={p.x} 
                    y2={p.y} 
                    stroke="#3B82F6" 
                    strokeWidth="3" 
                    strokeDasharray="4,4" 
                  />
                );
              })}
              {/* Highlight clicked points */}
              {drawnPoints.map((p, idx) => (
                <circle 
                  key={idx} 
                  cx={p.x} 
                  cy={p.y} 
                  r="6" 
                  fill="#3B82F6" 
                  stroke="#fff" 
                  strokeWidth="2" 
                />
              ))}
            </g>
          )}

          {/* ANIMAL PATH ROUTE HISTORY (Polylines) */}
          {showRouteHistory && activeAnimal && activeAnimal.path.length > 0 && (
            <g>
              {/* Complete movement trail */}
              <path 
                d={`M ${activeAnimal.path.map(p => `${p.x},${p.y}`).join(' L ')}`} 
                fill="none" 
                stroke="#6366F1" // Indigo trail
                strokeWidth="4" 
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
                filter="url(#glow)"
              />
              <path 
                d={`M ${activeAnimal.path.map(p => `${p.x},${p.y}`).join(' L ')}`} 
                fill="none" 
                stroke="#fff" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="5,5"
                opacity="0.9"
              />
              
              {/* Stops indicators (breadcrumbs) */}
              {activeAnimal.path.map((point, idx) => (
                <g key={idx} className="cursor-help group">
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r="5" 
                    fill="#4F46E5" 
                    stroke="#fff" 
                    strokeWidth="1.5" 
                  />
                  {/* Timestamp Label */}
                  <text 
                    x={point.x} 
                    y={point.y - 12} 
                    fill="#333" 
                    backgroundColor="#fff"
                    fontSize="8" 
                    fontWeight="semibold" 
                    textAnchor="middle"
                    className="font-mono bg-white px-1 shadow rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  >
                    {point.time}
                  </text>
                </g>
              ))}
            </g>
          )}

          {/* ANIMATED PLAYBACK TRIAL */}
          {playbackMode && activeAnimal && activeAnimal.path[playbackPathIndex] && (
            <g>
              {/* Render path up to current index */}
              {playbackPathIndex > 0 && (
                <path 
                  d={`M ${activeAnimal.path.slice(0, playbackPathIndex + 1).map(p => `${p.x},${p.y}`).join(' L ')}`} 
                  fill="none" 
                  stroke="#EC4899" // Hot Pink Playback trail
                  strokeWidth="5" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                  filter="url(#glow)"
                />
              )}
            </g>
          )}

          {/* ANIMAL MARKERS */}
          {animals.map(animal => {
            // Determine coordinate based on playback status
            let x = animal.coordinates.x;
            let y = animal.coordinates.y;

            if (playbackMode && selectedAnimalId === animal.id) {
              const currentPoint = animal.path[playbackPathIndex];
              if (currentPoint) {
                x = currentPoint.x;
                y = currentPoint.y;
              }
            }

            const isSelected = selectedAnimalId === animal.id;
            const color = getStatusColor(animal.status);
            const emoji = getSpeciesEmoji(animal.species);

            return (
              <g 
                key={animal.id} 
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAnimal(animal.id);
                }}
              >
                {/* Glowing ring under selected marker or alert marker */}
                {(isSelected || animal.status === 'Alert') && (
                  <circle 
                    cx={x} 
                    cy={y} 
                    r={isSelected ? '28' : '22'} 
                    fill="none" 
                    stroke={color} 
                    strokeWidth="2" 
                    opacity="0.5"
                    className="animate-ping"
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                )}

                {/* Outer Status Ring */}
                <circle 
                  cx={x} 
                  cy={y} 
                  r={isSelected ? '20' : '16'} 
                  fill={color} 
                  stroke="#fff" 
                  strokeWidth={isSelected ? '3' : '2'} 
                  className="shadow-md transition-all hover:scale-110"
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />

                {/* Inner White Plate for Emoji */}
                <circle 
                  cx={x} 
                  cy={y} 
                  r={isSelected ? '15' : '12'} 
                  fill="#fff" 
                />

                {/* Emoji Indicator */}
                <text 
                  x={x} 
                  y={y + (isSelected ? 5 : 4)} 
                  fontSize={isSelected ? '15' : '12'} 
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  {emoji}
                </text>

                {/* Custom direction indicator arrow if moving */}
                {animal.speed > 0.5 && (
                  <polygon
                    points={`${x},${y - (isSelected ? 30 : 25)} ${x - 5},${y - (isSelected ? 22 : 18)} ${x + 5},${y - (isSelected ? 22 : 18)}`}
                    fill={color}
                    opacity="0.9"
                    transform={`rotate(${animal.id === 'anim_5' ? 240 : 45}, ${x}, ${y})`}
                  />
                )}

                {/* Mini tag ID or Name Tag */}
                <g transform={`translate(${x}, ${y + (isSelected ? 35 : 28)})`}>
                  <rect 
                    x="-28" 
                    y="-8" 
                    width="56" 
                    height="15" 
                    rx="3" 
                    fill="rgba(250, 249, 246, 0.95)" 
                    stroke={isSelected ? color : '#d6d3d1'}
                    strokeWidth="1"
                  />
                  <text 
                    x="0" 
                    y="3" 
                    fill="#1c1917" 
                    fontSize="8" 
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {animal.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating GPS Info overlay */}
      {selectedAnimalId && activeAnimal && (
        <div className="absolute top-4 right-4 z-20 pointer-events-none bg-white/95 backdrop-blur border border-stone-200 p-3 rounded-xl shadow-md flex flex-col gap-1 font-mono text-[10px] text-stone-500">
          <div className="flex items-center gap-1 text-stone-900 font-bold text-[11px] mb-1">
            <Navigation className="w-3.5 h-3.5 text-[#3A5A40] fill-[#E1EAD8]" />
            <span>REAL-TIME TELEMETRY</span>
          </div>
          <div>Tag: <span className="text-stone-900 font-bold">{activeAnimal.tagId}</span></div>
          <div>Speed: <span className="text-stone-900 font-bold">{activeAnimal.speed} km/h</span></div>
          <div>X, Y: <span className="text-[#3A5A40] font-bold">{playbackMode && activeAnimal.path[playbackPathIndex] ? `${activeAnimal.path[playbackPathIndex].x}, ${activeAnimal.path[playbackPathIndex].y}` : `${activeAnimal.coordinates.x}, ${activeAnimal.coordinates.y}`}</span></div>
          <div>Signal: <span className="text-stone-900 font-bold">{"⚡".repeat(activeAnimal.signal)}</span></div>
        </div>
      )}
    </div>
  );
};
