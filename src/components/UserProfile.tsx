/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Map, 
  Bell, 
  Settings, 
  Globe, 
  Users, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';

interface UserProfileProps {
  onLogout: () => void;
  mapStyle: 'terrain' | 'satellite' | 'standard';
  onSetMapStyle: (style: 'terrain' | 'satellite' | 'standard') => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  onLogout,
  mapStyle,
  onSetMapStyle
}) => {
  const [notifyBreach, setNotifyBreach] = useState(true);
  const [notifyBattery, setNotifyBattery] = useState(true);
  const [notifyTemp, setNotifyTemp] = useState(true);
  
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);
  const [clusterMarkers, setClusterMarkers] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      {/* Overview Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 bg-[#E1EAD8] text-[#3A5A40] border border-[#3A5A40]/10 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm">
          JM
        </div>
        <div>
          <h1 className="text-lg font-bold text-stone-900">Johnathan Miller</h1>
          <p className="text-stone-500 text-xs">Primary Admin • Green Meadows Dairy</p>
          <span className="text-[9px] font-mono font-bold bg-[#F5F7F2] text-[#3A5A40] border border-[#3A5A40]/25 px-2 py-0.5 rounded mt-1.5 inline-block">
            ACTIVE ORG LICENSE
          </span>
        </div>
      </div>

      {/* Grid of Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Farm & Team Members */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-xs uppercase tracking-wider">
            <Users className="w-4 h-4 text-[#3A5A40]" />
            <span>Farm Team roster</span>
          </div>

          <div className="space-y-3">
            {/* Owner */}
            <div className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-200/60 rounded-xl">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs text-stone-900 border border-stone-200 shadow-sm">🤠</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Johnathan Miller</h4>
                  <span className="text-[9px] text-stone-500">Owner / Proprietor</span>
                </div>
              </div>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Admin</span>
            </div>

            {/* Herdsman */}
            <div className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-200/60 rounded-xl">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs text-stone-900 border border-stone-200 shadow-sm">🧑‍🌾</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Sarah Connor</h4>
                  <span className="text-[9px] text-stone-500">Field Herdsman</span>
                </div>
              </div>
              <span className="text-[9px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">Manager</span>
            </div>

            {/* Vet */}
            <div className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-200/60 rounded-xl">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs text-stone-900 border border-stone-200 shadow-sm">🩺</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Dr. Aaron Patel</h4>
                  <span className="text-[9px] text-stone-500">Visiting Veterinarian</span>
                </div>
              </div>
              <span className="text-[9px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold">Consultant</span>
            </div>
          </div>
        </div>

        {/* Map Rendering Preferences */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-xs uppercase tracking-wider">
            <Map className="w-4 h-4 text-[#3A5A40]" />
            <span>Map Layers & rendering</span>
          </div>

          <div className="space-y-4">
            {/* Map Style selector */}
            <div>
              <label className="text-xs text-stone-500 block mb-1.5 font-bold">GIS Map Background Layer</label>
              <div className="grid grid-cols-3 gap-2 bg-stone-100 p-1 rounded-xl border border-stone-200">
                {(['standard', 'terrain', 'satellite'] as const).map(style => (
                  <button
                    key={style}
                    id={`btn-map-style-${style}`}
                    type="button"
                    onClick={() => onSetMapStyle(style)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${
                      mapStyle === style ? 'bg-[#3A5A40] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Map toggles */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-700 font-medium">Plot 24h breadcrumb trail lines</span>
                <input 
                  id="toggle-breadcrumbs"
                  type="checkbox"
                  checked={showBreadcrumbs}
                  onChange={() => setShowBreadcrumbs(!showBreadcrumbs)}
                  className="w-4 h-4 rounded accent-[#3A5A40] bg-stone-100 border-stone-300 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-700 font-medium">Cluster close markers</span>
                <input 
                  id="toggle-cluster"
                  type="checkbox"
                  checked={clusterMarkers}
                  onChange={() => setClusterMarkers(!clusterMarkers)}
                  className="w-4 h-4 rounded accent-[#3A5A40] bg-stone-100 border-stone-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification thresholds */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-xs uppercase tracking-wider">
            <Bell className="w-4 h-4 text-[#3A5A40]" />
            <span>Notification thresholds</span>
          </div>

          <div className="space-y-3.5 text-xs text-stone-700">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-800 block">Safe-zone geofence escapes</span>
                <span className="text-[10px] text-stone-500 font-medium">Urgent notifications when any animal crosses fences</span>
              </div>
              <input 
                id="toggle-notify-breach"
                type="checkbox"
                checked={notifyBreach}
                onChange={() => setNotifyBreach(!notifyBreach)}
                className="w-4 h-4 rounded accent-[#3A5A40] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-800 block">Device battery alerts</span>
                <span className="text-[10px] text-stone-500 font-medium">Alerts when transponder nodes drop below 20%</span>
              </div>
              <input 
                id="toggle-notify-battery"
                type="checkbox"
                checked={notifyBattery}
                onChange={() => setNotifyBattery(!notifyBattery)}
                className="w-4 h-4 rounded accent-[#3A5A40] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-800 block">Abnormal temperature indicators</span>
                <span className="text-[10px] text-stone-500 font-medium">Alerts when biometrics hit fever or chills</span>
              </div>
              <input 
                id="toggle-notify-temp"
                type="checkbox"
                checked={notifyTemp}
                onChange={() => setNotifyTemp(!notifyTemp)}
                className="w-4 h-4 rounded accent-[#3A5A40] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Account Settings / License */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-xs uppercase tracking-wider">
              <Settings className="w-4 h-4 text-[#3A5A40]" />
              <span>Subscription & Device Stats</span>
            </div>

            <div className="space-y-2 text-xs text-stone-500 font-mono font-semibold">
              <div className="flex justify-between border-b border-stone-100 py-1">
                <span>Organization License</span>
                <span className="text-stone-900 font-bold">Green Meadows - Enterprise</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 py-1">
                <span>Monitored Nodes</span>
                <span className="text-stone-900 font-bold">5 Active Nodes (Max 200)</span>
              </div>
              <div className="flex justify-between py-1">
                <span>API Status</span>
                <span className="text-emerald-700 font-bold">CONNECTED (100% HEALTHY)</span>
              </div>
            </div>
          </div>

          <button 
            id="btn-logout"
            onClick={onLogout}
            className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 border border-red-200 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 text-center block cursor-pointer"
          >
            Log Out Account Session
          </button>
        </div>

      </div>
    </div>
  );
};
