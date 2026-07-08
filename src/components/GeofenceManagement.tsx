/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ShieldCheck, 
  AlertOctagon, 
  Settings, 
  Circle, 
  BellRing, 
  Zap, 
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { Geofence } from '../types';

interface GeofenceManagementProps {
  geofences: Geofence[];
  onToggleGeofence: (id: string) => void;
  onDeleteGeofence: (id: string) => void;
  onStartDrawing: (type: 'circular' | 'polygon') => void;
  isDrawingGeofence: boolean;
  drawingType: 'circular' | 'polygon' | null;
  onSimulateBreach: () => void;
}

export const GeofenceManagement: React.FC<GeofenceManagementProps> = ({
  geofences,
  onToggleGeofence,
  onDeleteGeofence,
  onStartDrawing,
  isDrawingGeofence,
  drawingType,
  onSimulateBreach
}) => {
  const [newFenceName, setNewFenceName] = useState('');
  const [alertOnExit, setAlertOnExit] = useState(true);
  const [alertOnEntry, setAlertOnEntry] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      {/* Overview Banner */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <span className="text-[#3A5A40] text-[10px] font-bold uppercase tracking-widest">Geofencing & Containment Engine</span>
          <h1 className="text-xl font-bold text-stone-900 mt-1">Safe grazing perimeter perimeters</h1>
          <p className="text-stone-500 text-xs font-medium">Set circular or polygon safe limits. IoT trackers fire LTE alarms immediately on exit.</p>
        </div>
        
        {/* Simulation Sandbox Button */}
        <button 
          id="btn-simulate-breach"
          onClick={onSimulateBreach}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#D4A373] hover:bg-[#D4A373]/90 text-stone-900 text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95 animate-pulse cursor-pointer"
        >
          <Zap className="w-4 h-4" /> Simulate Boundary Breach
        </button>
      </div>

      {/* Drawing Tools Section */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
        <h2 className="text-sm font-semibold text-stone-900">Draw New Geofence Perimeter</h2>
        <p className="text-xs text-stone-500 font-medium">Choose a tool, then interact directly with the map above to create safe pasture perimeters.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Circular Button */}
          <button 
            id="btn-draw-circle"
            onClick={() => onStartDrawing('circular')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
              isDrawingGeofence && drawingType === 'circular'
                ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-950'
            }`}
          >
            <div className={`p-3 rounded-xl ${
              isDrawingGeofence && drawingType === 'circular' ? 'bg-yellow-100 text-yellow-600' : 'bg-stone-100 text-stone-500'
            }`}>
              <Circle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-stone-900">Circular Geofence</span>
            <span className="text-[10px] text-stone-400 max-w-[200px] font-medium">Click map center, with a preset 90m grazing buffer radius</span>
          </button>

          {/* Polygon Button */}
          <button 
            id="btn-draw-polygon"
            onClick={() => onStartDrawing('polygon')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
              isDrawingGeofence && drawingType === 'polygon'
                ? 'bg-blue-50 border-blue-300 text-blue-800'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-950'
            }`}
          >
            <div className={`p-3 rounded-xl ${
              isDrawingGeofence && drawingType === 'polygon' ? 'bg-blue-100 text-blue-600' : 'bg-stone-100 text-stone-500'
            }`}>
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-stone-900">4-Point Polygon Geofence</span>
            <span className="text-[10px] text-stone-400 max-w-[200px] font-medium">Plot 4 points sequentially on the map to envelope irregular pastures</span>
          </button>
        </div>

        {isDrawingGeofence && (
          <div className="bg-[#E1EAD8] border border-[#A3B18A] p-3 rounded-xl text-center text-xs text-[#3A5A40] font-bold animate-pulse">
            👆 Drawing tool active! Please scroll or click on the Map at the top to drop your coordinates.
          </div>
        )}
      </div>

      {/* Existing Geofences List */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
        <h2 className="text-sm font-semibold text-stone-900">Active Livestock Perimeters ({geofences.length})</h2>
        
        <div className="space-y-3.5">
          {geofences.map(fence => (
            <div 
              key={fence.id}
              className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">
                  {fence.type === 'circular' ? '⭕' : '🟩'}
                </span>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-extrabold text-stone-900">{fence.name}</h3>
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: fence.color }}
                    />
                  </div>
                  
                  <p className="text-[11px] text-stone-500 leading-normal font-medium">
                    Type: <span className="text-stone-700 font-semibold uppercase">{fence.type}</span> • 
                    {fence.type === 'circular' ? ` Radius: ${fence.radius || 90}m` : ` Points: ${fence.coordinates.length}`} • 
                    Alert on Exit: <span className="text-stone-700 font-semibold">{fence.alertOnExit ? 'Yes' : 'No'}</span>
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 self-end md:self-auto">
                {/* Active Toggle */}
                <button 
                  id={`btn-toggle-fence-${fence.id}`}
                  onClick={() => onToggleGeofence(fence.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer shadow-sm ${
                    fence.isActive 
                      ? 'bg-[#E1EAD8] border-[#A3B18A] text-[#3A5A40]' 
                      : 'bg-stone-100 border-stone-200 text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {fence.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {fence.isActive ? 'Active Monitoring' : 'Muted'}
                </button>

                {/* Delete */}
                {fence.id !== 'fence_1' && (
                  <button 
                    id={`btn-delete-fence-${fence.id}`}
                    onClick={() => onDeleteGeofence(fence.id)}
                    className="p-2 bg-white border border-stone-200 hover:border-red-200 text-stone-400 hover:text-red-600 rounded-lg transition-all cursor-pointer shadow-sm"
                    title="Remove Perimeter"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
