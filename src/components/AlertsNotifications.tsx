/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Battery, 
  Info, 
  Filter,
  CheckCheck,
  Clock,
  MapPin
} from 'lucide-react';
import { NotificationAlert } from '../types';

interface AlertsNotificationsProps {
  alerts: NotificationAlert[];
  onAcknowledgeAlert: (id: string) => void;
  onAcknowledgeAll: () => void;
  onSelectAnimal: (animalId: string) => void;
}

export const AlertsNotifications: React.FC<AlertsNotificationsProps> = ({
  alerts,
  onAcknowledgeAlert,
  onAcknowledgeAll,
  onSelectAnimal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'critical' | 'unack'>('all');

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    // Search query matches Name, Tag, or Message
    const matchesSearch = 
      (alert.animalName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (alert.tagId?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchQuery.toLowerCase());

    // Tab filter matching
    if (filterMode === 'critical') {
      return matchesSearch && alert.severity === 'critical';
    }
    if (filterMode === 'unack') {
      return matchesSearch && !alert.isAcknowledged;
    }
    return matchesSearch;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'Fence Out': return <MapPin className="w-4 h-4 text-red-600" />;
      case 'Fence In': return <MapPin className="w-4 h-4 text-[#3A5A40]" />;
      case 'Low Battery': return <Battery className="w-4 h-4 text-orange-600" />;
      case 'Abnormal Temp': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Weather Warning': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default: return <Bell className="w-4 h-4 text-violet-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-red-600 text-[10px] font-extrabold uppercase tracking-wider">Incident Response Terminal</span>
          <h1 className="text-xl font-bold text-stone-900 mt-1">Pasture Security Alarms</h1>
          <p className="text-stone-500 text-xs font-medium">Monitors real-time perimeter escapes, device disconnections, and physical fevers.</p>
        </div>

        {alerts.some(a => !a.isAcknowledged) && (
          <button 
            id="btn-ack-all-alerts"
            onClick={onAcknowledgeAll}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#3A5A40]/10 active:scale-95 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" /> Acknowledge All Alerts
          </button>
        )}
      </div>

      {/* Search and Filters bar */}
      <div className="bg-white border border-stone-200 p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4 justify-between shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
            <Search className="w-4 h-4" />
          </span>
          <input 
            id="input-alert-search"
            type="text"
            placeholder="Search by name, tag, or alert type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 bg-stone-100 border border-stone-200 p-1 rounded-xl w-full md:w-auto font-mono text-xs font-bold">
          <button
            id="btn-alert-filter-all"
            onClick={() => setFilterMode('all')}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              filterMode === 'all' ? 'bg-[#3A5A40] text-white shadow-sm' : 'text-stone-500 hover:text-stone-850'
            }`}
          >
            All Logs ({alerts.length})
          </button>
          <button
            id="btn-alert-filter-unack"
            onClick={() => setFilterMode('unack')}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              filterMode === 'unack' ? 'bg-amber-100 text-amber-800 border border-amber-200/50' : 'text-stone-500 hover:text-stone-850'
            }`}
          >
            Active Alarms ({alerts.filter(a => !a.isAcknowledged).length})
          </button>
          <button
            id="btn-alert-filter-critical"
            onClick={() => setFilterMode('critical')}
            className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              filterMode === 'critical' ? 'bg-red-100 text-red-800 border border-red-200/50' : 'text-stone-500 hover:text-stone-850'
            }`}
          >
            Criticals ({alerts.filter(a => a.severity === 'critical').length})
          </button>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-stone-400 bg-stone-50/40 border border-dashed border-stone-200 rounded-2xl p-6">
            <div className="p-4 bg-white rounded-full border border-stone-200 text-stone-400 mb-3 shadow-inner">
              <CheckCircle className="w-10 h-10 text-[#3A5A40]" />
            </div>
            <h3 className="text-sm font-semibold text-stone-700">No Incidents Logged</h3>
            <p className="text-stone-500 text-xs mt-1 max-w-[280px]">Your livestock perimeters and telemetry signals are 100% compliant with geofences.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div 
              key={alert.id}
              className={`border p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                alert.isAcknowledged 
                  ? 'bg-stone-50/60 border-stone-150 opacity-60' 
                  : alert.severity === 'critical' 
                  ? 'bg-red-50/40 border-red-200 hover:border-red-300 hover:bg-red-50/70 shadow-sm' 
                  : 'bg-amber-50/35 border-amber-200 hover:border-amber-300 hover:bg-amber-50/60'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className={`p-2.5 rounded-lg mt-0.5 ${
                  alert.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-850'
                }`}>
                  {getAlertIcon(alert.type)}
                </span>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">{alert.type}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded font-mono ${
                      alert.severity === 'critical' ? 'bg-red-100 border border-red-200 text-red-700' : 'bg-amber-100 border border-amber-200 text-amber-700'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    
                    {alert.animalName && (
                      <button
                        id={`btn-alert-link-animal-${alert.animalId}`}
                        onClick={() => alert.animalId && onSelectAnimal(alert.animalId)}
                        className="text-[9px] bg-stone-100 hover:bg-stone-200 border border-stone-200 px-1.5 py-0.5 rounded text-stone-600 hover:text-stone-900 transition-all font-semibold cursor-pointer"
                      >
                        🐄 {alert.animalName} ({alert.tagId})
                      </button>
                    )}
                  </div>

                  <p className="text-stone-700 text-xs leading-relaxed font-medium">{alert.message}</p>
                  
                  <span className="text-[10px] text-stone-400 flex items-center gap-1 font-mono pt-1">
                    <Clock className="w-3 h-3" /> {alert.timestamp}
                  </span>
                </div>
              </div>

              {/* Acknowledge button */}
              {!alert.isAcknowledged ? (
                <button 
                  id={`btn-ack-alert-feed-${alert.id}`}
                  onClick={() => onAcknowledgeAlert(alert.id)}
                  className="px-3.5 py-1.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:text-stone-950 font-bold text-[10px] rounded-lg transition-all self-end md:self-auto shadow-sm cursor-pointer"
                >
                  Acknowledge
                </button>
              ) : (
                <span className="text-[10px] text-[#3A5A40] font-bold flex items-center gap-1 bg-[#E1EAD8] border border-[#A3B18A]/30 px-2 py-0.5 rounded self-end md:self-auto">
                  ✓ Resolved
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
