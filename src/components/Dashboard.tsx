/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldAlert, 
  Wifi, 
  WifiOff, 
  Gauge, 
  Activity, 
  Battery, 
  AlertOctagon, 
  CloudSun, 
  PlusCircle, 
  QrCode, 
  Map, 
  BarChart2, 
  Bell, 
  User, 
  Compass, 
  TrendingUp, 
  ChevronRight,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Animal, WeatherInfo, NotificationAlert } from '../types';

interface DashboardProps {
  animals: Animal[];
  weather: WeatherInfo;
  alerts: NotificationAlert[];
  onAcknowledgeAlert: (alertId: string) => void;
  onNavigate: (view: 'dashboard' | 'map' | 'animals' | 'alerts' | 'profile' | 'register-animal' | 'register-device' | 'reports' | 'weather') => void;
  onSelectAnimal: (animalId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  animals,
  weather,
  alerts,
  onAcknowledgeAlert,
  onNavigate,
  onSelectAnimal
}) => {
  // Compute analytics from animals list
  const totalAnimals = animals.length;
  const onlineAnimals = animals.filter(a => a.battery > 10 && a.signal > 1).length;
  const offlineAnimals = totalAnimals - onlineAnimals;
  const movingAnimals = animals.filter(a => a.speed > 0.5 && a.activity !== 'Resting').length;
  const restingAnimals = animals.filter(a => a.activity === 'Resting' || a.speed <= 0.5).length;
  const lowBatteryAnimals = animals.filter(a => a.battery < 20).length;
  const activeAlerts = alerts.filter(al => !al.isAcknowledged);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-[#E1EAD8] text-[#3A5A40] border-[#A3B18A]/30';
      case 'Idle': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Grazing': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Battery Low': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Alert': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header with Welcome and Weather */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
        <div>
          <span className="text-[#3A5A40] text-xs font-semibold tracking-wider uppercase">Pasture Management Center</span>
          <h1 className="text-2xl font-bold text-stone-900 mt-1">Hello, Johnathan Miller</h1>
          <p className="text-stone-500 text-xs mt-0.5">Green Meadows Dairy Farm • 1,200 Hectares</p>
        </div>
        
        {/* Quick Weather Capsule */}
        <button 
          id="btn-weather-capsule"
          onClick={() => onNavigate('weather')} 
          className="flex items-center gap-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 px-4 py-2.5 rounded-xl text-left transition-all active:scale-95"
        >
          <CloudSun className="w-8 h-8 text-amber-500 fill-amber-500/10" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-stone-850">{weather.temp}°C</span>
              <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.2 rounded-full font-medium">
                {weather.alerts.length > 0 ? 'Storm Alert' : 'Normal'}
              </span>
            </div>
            <p className="text-stone-500 text-[10px]">Feels like {weather.feelsLike}°C • Humid: {weather.humidity}%</p>
          </div>
        </button>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Animals Tracking */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between hover:border-[#3A5A40]/45 transition-all group shadow-sm hover:shadow-md">
          <div className="flex justify-between items-start">
            <span className="text-stone-500 text-xs font-medium">Registered Livestock</span>
            <span className="p-1.5 bg-[#F5F7F2] text-[#3A5A40] border border-stone-100 rounded-lg group-hover:scale-110 transition-transform">
              <Compass className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-stone-900 tracking-tight">{totalAnimals}</h3>
            <div className="flex gap-2 items-center mt-1 text-[10px] text-stone-500">
              <span className="flex items-center gap-0.5 text-[#3A5A40] font-semibold"><Wifi className="w-3 h-3" /> {onlineAnimals} Online</span>
              <span>•</span>
              <span className="flex items-center gap-0.5 text-stone-400"><WifiOff className="w-3 h-3" /> {offlineAnimals} Offline</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Moving Status */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between hover:border-[#3A5A40]/45 transition-all group shadow-sm hover:shadow-md">
          <div className="flex justify-between items-start">
            <span className="text-stone-500 text-xs font-medium">Grazing vs. Resting</span>
            <span className="p-1.5 bg-sky-50 text-sky-700 border border-sky-100 rounded-lg group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-stone-900 tracking-tight">{movingAnimals} <span className="text-xs text-stone-500 font-normal">moving</span></h3>
            <p className="text-[10px] text-stone-500 mt-1">
              <span className="text-sky-700 font-medium">{Math.round((movingAnimals/totalAnimals)*100)}% active grazing</span> • {restingAnimals} resting
            </p>
          </div>
        </div>

        {/* KPI 3: Power Alert */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between hover:border-[#3A5A40]/45 transition-all group shadow-sm hover:shadow-md">
          <div className="flex justify-between items-start">
            <span className="text-stone-500 text-xs font-medium">Low Battery Nodes</span>
            <span className="p-1.5 bg-orange-50 text-orange-700 border border-orange-100 rounded-lg group-hover:scale-110 transition-transform">
              <Battery className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className={`text-3xl font-bold tracking-tight ${lowBatteryAnimals > 0 ? 'text-orange-600' : 'text-stone-900'}`}>{lowBatteryAnimals}</h3>
            <p className="text-[10px] text-stone-500 mt-1">
              {lowBatteryAnimals > 0 ? '⚠️ Action: recharge nodes' : 'All tracker batteries safe (>20%)'}
            </p>
          </div>
        </div>

        {/* KPI 4: Security Alerts */}
        <div 
          onClick={() => onNavigate('alerts')}
          className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between hover:border-[#3A5A40]/45 cursor-pointer transition-all group shadow-sm hover:shadow-md"
        >
          <div className="flex justify-between items-start">
            <span className="text-stone-500 text-xs font-medium">Safe-zone Breaches</span>
            <span className={`p-1.5 rounded-lg group-hover:scale-110 transition-transform ${activeAlerts.length > 0 ? 'bg-red-50 text-red-600 animate-pulse border border-red-100' : 'bg-stone-100 text-stone-500'}`}>
              <AlertOctagon className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className={`text-3xl font-bold tracking-tight ${activeAlerts.length > 0 ? 'text-red-600' : 'text-stone-900'}`}>
              {activeAlerts.length}
            </h3>
            <p className="text-[10px] text-stone-500 mt-1">
              {activeAlerts.length > 0 ? '🔴 Urgent: containment violations' : 'No containment violations'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Panels */}
      <div>
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">Quick Control Panel</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button 
            id="btn-quick-map"
            onClick={() => onNavigate('map')}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-[#F5F7F2] border border-stone-200 hover:border-[#3A5A40]/40 rounded-2xl transition-all group text-center shadow-sm cursor-pointer"
          >
            <div className="p-3 bg-[#E1EAD8] text-[#3A5A40] rounded-xl mb-2 group-hover:scale-110 transition-transform">
              <Map className="w-5 h-5" />
            </div>
            <span className="text-stone-800 text-xs font-semibold">Open Live Map</span>
            <span className="text-[10px] text-stone-400 mt-0.5">Real-time GIS</span>
          </button>

          <button 
            id="btn-quick-reg-animal"
            onClick={() => onNavigate('register-animal')}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-[#F5F7F2] border border-stone-200 hover:border-[#3A5A40]/40 rounded-2xl transition-all group text-center shadow-sm cursor-pointer"
          >
            <div className="p-3 bg-sky-50 text-sky-700 rounded-xl mb-2 group-hover:scale-110 transition-transform">
              <PlusCircle className="w-5 h-5" />
            </div>
            <span className="text-stone-800 text-xs font-semibold">Register Animal</span>
            <span className="text-[10px] text-stone-400 mt-0.5">Add to inventory</span>
          </button>

          <button 
            id="btn-quick-reg-device"
            onClick={() => onNavigate('register-device')}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-[#F5F7F2] border border-stone-200 hover:border-[#3A5A40]/40 rounded-2xl transition-all group text-center shadow-sm cursor-pointer"
          >
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl mb-2 group-hover:scale-110 transition-transform">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="text-stone-800 text-xs font-semibold">Pair IoT Device</span>
            <span className="text-[10px] text-stone-400 mt-0.5">NFC/QR scanner</span>
          </button>

          <button 
            id="btn-quick-reports"
            onClick={() => onNavigate('reports')}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-[#F5F7F2] border border-stone-200 hover:border-[#3A5A40]/40 rounded-2xl transition-all group text-center shadow-sm cursor-pointer"
          >
            <div className="p-3 bg-violet-50 text-violet-700 rounded-xl mb-2 group-hover:scale-110 transition-transform">
              <BarChart2 className="w-5 h-5" />
            </div>
            <span className="text-stone-800 text-xs font-semibold">View Analytics</span>
            <span className="text-[10px] text-stone-400 mt-0.5">Heatmaps & Reports</span>
          </button>

          <button 
            id="btn-quick-alerts"
            onClick={() => onNavigate('alerts')}
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-[#F5F7F2] border border-stone-200 hover:border-[#3A5A40]/40 rounded-2xl transition-all group text-center col-span-2 md:col-span-1 shadow-sm cursor-pointer"
          >
            <div className="p-3 bg-red-50 text-red-600 rounded-xl mb-2 group-hover:scale-110 transition-transform relative border border-red-50">
              <Bell className="w-5 h-5" />
              {activeAlerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
            <span className="text-stone-800 text-xs font-semibold">Incident Feed</span>
            <span className="text-[10px] text-stone-400 mt-0.5">{activeAlerts.length} issues active</span>
          </button>
        </div>
      </div>

      {/* Dual Column Layout: Active alerts vs. Live Map Quick Glimpse */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Unacknowledged Urgent Alerts Feed */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 lg:col-span-2 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-stone-900">Critical Incidents</h2>
              <p className="text-stone-500 text-xs">Unresolved pasture boundary exceptions</p>
            </div>
            <button 
              id="btn-view-all-alerts"
              onClick={() => onNavigate('alerts')} 
              className="text-xs text-[#3A5A40] font-semibold hover:underline flex items-center gap-1"
            >
              All Alerts <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activeAlerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-stone-400 bg-stone-50/50 border border-dashed border-stone-200 rounded-xl">
                <CheckCircle className="w-8 h-8 text-[#3A5A40] mb-2" />
                <span className="text-xs font-semibold text-stone-700">All coordinates healthy</span>
                <span className="text-[10px] text-stone-400 mt-0.5 font-medium">Geofences fully secure</span>
              </div>
            ) : (
              activeAlerts.slice(0, 3).map(alert => (
                <div 
                  key={alert.id} 
                  className={`border rounded-xl p-3.5 flex items-start justify-between gap-4 transition-all ${
                    alert.severity === 'critical' 
                      ? 'bg-red-50/40 border-red-200 hover:border-red-350' 
                      : 'bg-amber-50/30 border-amber-200 hover:border-amber-350'
                  }`}
                >
                  <div className="flex gap-3">
                    <span className={`p-2 rounded-lg mt-0.5 ${
                      alert.severity === 'critical' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'
                    }`}>
                      <AlertOctagon className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{alert.type}</span>
                        {alert.tagId && (
                          <button 
                            id={`btn-alert-tag-${alert.animalId}`}
                            onClick={() => { if (alert.animalId) onSelectAnimal(alert.animalId); }}
                            className="text-[9px] bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded text-stone-600 hover:text-stone-800 hover:bg-stone-200"
                          >
                            🏷️ {alert.tagId}
                          </button>
                        )}
                      </div>
                      <p className="text-stone-600 text-xs mt-1 font-medium">{alert.message}</p>
                      <span className="text-[10px] text-stone-400 flex items-center gap-1 mt-1.5">
                        <Clock className="w-3 h-3" /> {alert.timestamp}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    id={`btn-ack-alert-${alert.id}`}
                    onClick={() => onAcknowledgeAlert(alert.id)}
                    className="text-[10px] px-2.5 py-1.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:text-stone-950 font-bold rounded-lg transition-all shadow-sm"
                  >
                    Acknowledge
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Quick Livestock List */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <h2 className="text-base font-bold text-stone-900 mb-1">Livestock Status</h2>
            <p className="text-stone-500 text-xs mb-4">Quick overview of monitored nodes</p>
            
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {animals.map(animal => (
                <div 
                  key={animal.id}
                  onClick={() => onSelectAnimal(animal.id)}
                  className="flex items-center justify-between p-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-100 hover:border-stone-200 rounded-xl cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl select-none">
                      {animal.species === 'Cow' ? '🐄' : animal.species === 'Sheep' ? '🐑' : '🐐'}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-stone-850">{animal.name}</h4>
                      <span className="text-[9px] font-mono text-stone-500">{animal.tagId} • {animal.breed}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-medium ${getStatusColor(animal.status)}`}>
                      {animal.status}
                    </span>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-stone-400 font-mono">
                      <Battery className={`w-3 h-3 ${animal.battery < 20 ? 'text-red-500' : 'text-stone-400'}`} />
                      <span>{animal.battery}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            id="btn-dashboard-map"
            onClick={() => onNavigate('map')}
            className="w-full mt-4 py-2.5 bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white font-semibold text-xs rounded-xl shadow-md shadow-[#3A5A40]/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Map className="w-4 h-4" /> Go to Live Map Mode
          </button>
        </div>

      </div>
    </div>
  );
};
