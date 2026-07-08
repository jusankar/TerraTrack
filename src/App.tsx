/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Map as MapIcon, 
  Layers, 
  Bell, 
  User, 
  PlusCircle, 
  Activity, 
  Wifi, 
  BarChart2, 
  Settings, 
  LogOut, 
  Heart, 
  Info, 
  Phone, 
  ShieldAlert, 
  CloudSun,
  Laptop,
  Smartphone,
  Maximize2,
  Navigation,
  Sparkles,
  ChevronRight,
  Battery,
  AlertTriangle,
  X
} from 'lucide-react';

// Data and Types
import { Animal, Geofence, WeatherInfo, NotificationAlert } from './types';
import { 
  INITIAL_ANIMALS, 
  INITIAL_GEOFENCES, 
  INITIAL_WEATHER, 
  INITIAL_ALERTS 
} from './data/mockData';

// Components
import { Login } from './components/Login';
import { InteractiveMap } from './components/InteractiveMap';
import { Dashboard } from './components/Dashboard';
import { AnimalDetail } from './components/AnimalDetail';
import { MovementPlayback } from './components/MovementPlayback';
import { GeofenceManagement } from './components/GeofenceManagement';
import { ReportsAnalytics } from './components/ReportsAnalytics';
import { WeatherClimate } from './components/WeatherClimate';
import { AnimalRegistration } from './components/AnimalRegistration';
import { DeviceRegistration } from './components/DeviceRegistration';
import { UserProfile } from './components/UserProfile';
import { AlertsNotifications } from './components/AlertsNotifications';

type ActiveView = 
  | 'dashboard' 
  | 'map' 
  | 'animals' 
  | 'alerts' 
  | 'profile' 
  | 'register-animal' 
  | 'register-device' 
  | 'reports' 
  | 'weather';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [previewMode, setPreviewMode] = useState<'smartphone' | 'desktop'>('desktop');
  
  // App Core States
  const [animals, setAnimals] = useState<Animal[]>(INITIAL_ANIMALS);
  const [geofences, setGeofences] = useState<Geofence[]>(INITIAL_GEOFENCES);
  const [weather, setWeather] = useState<WeatherInfo>(INITIAL_WEATHER);
  const [alerts, setAlerts] = useState<NotificationAlert[]>(INITIAL_ALERTS);
  
  // Navigation & Map States
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  
  // Playback States
  const [playbackMode, setPlaybackMode] = useState(false);
  const [playbackPathIndex, setPlaybackPathIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500); // ms per step
  const [playbackActive, setPlaybackActive] = useState(false);
  
  // Plot States
  const [showRouteHistory, setShowRouteHistory] = useState(false);
  const [routeHistoryRange, setRouteHistoryRange] = useState('Today');
  const [isLiveTracking, setIsLiveTracking] = useState(false);
  const [mapStyle, setMapStyle] = useState<'terrain' | 'satellite' | 'standard'>('terrain');

  // Geofence Drawing State
  const [isDrawingGeofence, setIsDrawingGeofence] = useState(false);
  const [drawingType, setDrawingType] = useState<'circular' | 'polygon' | null>(null);

  // AUTOMATED SIMULATION: Walk wiggling loop
  useEffect(() => {
    const simulationInterval = setInterval(() => {
      setAnimals(prevAnimals => 
        prevAnimals.map(animal => {
          // Only move active, healthy grazing animals
          if (animal.status === 'Alert' || animal.status === 'Battery Low' || animal.activity === 'Resting') {
            return animal;
          }

          const angle = Math.random() * Math.PI * 2;
          const distance = 4 + Math.floor(Math.random() * 8); // small random walk
          let newX = Math.round(animal.coordinates.x + Math.cos(angle) * distance);
          let newY = Math.round(animal.coordinates.y + Math.sin(angle) * distance);

          // Restrict bounds (0 to 1000)
          newX = Math.max(10, Math.min(990, newX));
          newY = Math.max(10, Math.min(790, newY));

          // Mock speed wiggle
          const newSpeed = Number((0.5 + Math.random() * 2.1).toFixed(1));

          return {
            ...animal,
            coordinates: { x: newX, y: newY },
            speed: newSpeed,
            lastUpdate: 'Just now'
          };
        })
      );
    }, 6000);

    return () => clearInterval(simulationInterval);
  }, []);

  // Handler to acknowledge individual alert
  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isAcknowledged: true } : a));
  };

  // Handler to acknowledge all alerts in bulk
  const handleAcknowledgeAll = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isAcknowledged: true })));
  };

  // Handler to register a new animal
  const handleRegisterAnimal = (newAnimal: Partial<Animal>) => {
    const fullAnimal: Animal = {
      id: `anim_${Date.now()}`,
      tagId: newAnimal.tagId || 'COW-999',
      name: newAnimal.name || 'Unnamed',
      species: newAnimal.species || 'Cow',
      breed: newAnimal.breed || 'Unknown',
      gender: newAnimal.gender || 'Female',
      age: newAnimal.age || 3,
      weight: newAnimal.weight || 400,
      status: 'Healthy',
      battery: 100,
      speed: 0,
      activity: 'Resting',
      lastUpdate: 'Just now',
      coordinates: newAnimal.coordinates || { x: 300, y: 300 },
      path: newAnimal.path || [],
      temp: 38.6,
      heartRate: 72,
      signal: 5,
      gateway: 'GW-HT-901',
      firmware: 'v2.1.4',
      owner: newAnimal.owner || 'Johnathan Miller',
      ownerPhone: newAnimal.ownerPhone || '+1 (555) 019-2834',
      farmName: 'Green Meadows Dairy',
      notes: newAnimal.notes,
      activationDate: newAnimal.activationDate || new Date().toISOString().split('T')[0]
    };

    setAnimals(prev => [...prev, fullAnimal]);
    
    // Auto insert check-in log
    const entryAlert: NotificationAlert = {
      id: `alert_reg_${Date.now()}`,
      animalId: fullAnimal.id,
      animalName: fullAnimal.name,
      tagId: fullAnimal.tagId,
      type: 'Fence In',
      message: `${fullAnimal.name} (${fullAnimal.tagId}) paired and introduced safely to perimeters.`,
      timestamp: 'Just now',
      isAcknowledged: false,
      severity: 'info'
    };
    setAlerts(prev => [entryAlert, ...prev]);
  };

  // Handler to register hardware nodes
  const handleRegisterDevice = (deviceData: any) => {
    // If assigned to animal, update that animal's gateway/specs
    if (deviceData.assignedAnimalId) {
      setAnimals(prev => prev.map(a => a.id === deviceData.assignedAnimalId ? {
        ...a,
        gateway: deviceData.deviceType === 'Edge Gateway' ? deviceData.serialNumber : a.gateway,
        firmware: deviceData.firmware
      } : a));
    }
  };

  // Toggle geofence active status
  const handleToggleGeofence = (id: string) => {
    setGeofences(prev => prev.map(f => f.id === id ? { ...f, isActive: !f.isActive } : f));
  };

  // Delete geofence
  const handleDeleteGeofence = (id: string) => {
    setGeofences(prev => prev.filter(f => f.id !== id));
  };

  // Start Geofence Drawing Mode
  const handleStartDrawingGeofence = (type: 'circular' | 'polygon') => {
    setIsDrawingGeofence(true);
    setDrawingType(type);
    setActiveView('map'); // Switch to map immediately so they can draw
  };

  // Finish Drawing Geofence
  const handleFinishDrawingGeofence = (newFence: Geofence) => {
    setGeofences(prev => [...prev, newFence]);
    setIsDrawingGeofence(false);
    setDrawingType(null);
    alert(`Success: Created new pasture zone - "${newFence.name}"`);
  };

  // Simulate escape breach notification
  const handleSimulateBreach = () => {
    const target = animals.find(a => a.id === 'anim_4') || animals[0];
    const mockEscapedAlert: NotificationAlert = {
      id: `alert_esc_${Date.now()}`,
      animalId: target.id,
      animalName: target.name,
      tagId: target.tagId,
      type: 'Fence Out',
      message: `CRITICAL: ${target.name} (${target.tagId}) breached the North-East Restricted Marsh boundary!`,
      timestamp: 'Just now',
      isAcknowledged: false,
      severity: 'critical'
    };

    setAlerts(prev => [mockEscapedAlert, ...prev]);
    
    // Update animal's status as Alert
    setAnimals(prev => prev.map(a => a.id === target.id ? { ...a, status: 'Alert' } : a));
    setSelectedAnimalId(target.id);
    setActiveView('map');
    alert(`Alert Simulated! ${target.name} is reporting a Geofence breach.`);
  };

  // Navigation interceptor
  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    if (view !== 'map') {
      // Keep selected animal, but reset playback mode so overlay clears
      setPlaybackMode(false);
      setPlaybackActive(false);
    }
  };

  // Handle selected animal and focus
  const handleSelectAnimal = (animalId: string) => {
    setSelectedAnimalId(animalId);
    setActiveView('map');
  };

  const handleGetDirections = () => {
    const active = selectedAnimalId ? animals.find(a => a.id === selectedAnimalId) : null;
    if (active) {
      alert(`Plotting route to ${active.name} (${active.tagId}) from Main Barn. Estimated walking distance: 380m. Path: Clay road heading Northeast.`);
    }
  };

  // Selected animal helper reference
  const activeSelectedAnimal = selectedAnimalId ? animals.find(a => a.id === selectedAnimalId) : null;

  // If not logged in, show Login gate
  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // Define views and bottom navigation layouts
  const renderCoreViewContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard 
            animals={animals}
            weather={weather}
            alerts={alerts}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onNavigate={handleNavigate}
            onSelectAnimal={handleSelectAnimal}
          />
        );
      
      case 'map':
        return (
          <div className="space-y-4 pb-20">
            {/* Live map viewport */}
            <div className="h-[480px] w-full relative">
              <InteractiveMap 
                animals={animals}
                selectedAnimalId={selectedAnimalId}
                onSelectAnimal={handleSelectAnimal}
                geofences={geofences}
                isDrawingGeofence={isDrawingGeofence}
                drawingType={drawingType}
                onFinishDrawingGeofence={handleFinishDrawingGeofence}
                playbackMode={playbackMode}
                playbackPathIndex={playbackPathIndex}
                showRouteHistory={showRouteHistory}
                routeHistoryRange={routeHistoryRange}
                isLiveTracking={isLiveTracking}
                mapStyle={mapStyle}
              />
            </div>

            {/* Bottom Panel Drawer: Displays only if an animal is clicked */}
            {selectedAnimalId && activeSelectedAnimal && !playbackMode && (
              <div className="bg-gray-900/90 border border-gray-800/80 p-5 rounded-2xl space-y-4 shadow-xl relative animate-fade">
                <button 
                  id="btn-clear-map-select"
                  onClick={() => setSelectedAnimalId(null)} 
                  className="absolute top-4 right-4 p-1 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center text-3xl">
                    {activeSelectedAnimal.species === 'Cow' ? '🐄' : activeSelectedAnimal.species === 'Sheep' ? '🐑' : '🐐'}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{activeSelectedAnimal.name}</span>
                      <span className="font-mono text-[9px] bg-gray-800 text-gray-400 px-1.5 py-0.2 rounded">
                        {activeSelectedAnimal.tagId}
                      </span>
                    </h3>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {activeSelectedAnimal.breed} • Status: <span className="font-bold text-indigo-400">{activeSelectedAnimal.status}</span>
                    </p>
                  </div>
                </div>

                {/* Micro metrics grid */}
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                  <div className="bg-gray-950/40 p-2 rounded-xl border border-gray-800">
                    <span className="text-[9px] text-gray-500 block leading-none">Speed</span>
                    <span className="text-white font-bold">{activeSelectedAnimal.speed} km/h</span>
                  </div>
                  <div className="bg-gray-950/40 p-2 rounded-xl border border-gray-800">
                    <span className="text-[9px] text-gray-500 block leading-none">Vitals (Temp)</span>
                    <span className="text-white font-bold">{activeSelectedAnimal.temp}°C</span>
                  </div>
                  <div className="bg-gray-950/40 p-2 rounded-xl border border-gray-800">
                    <span className="text-[9px] text-gray-500 block leading-none">Battery</span>
                    <span className={`font-bold ${activeSelectedAnimal.battery < 20 ? 'text-red-500' : 'text-emerald-400'}`}>
                      {activeSelectedAnimal.battery}%
                    </span>
                  </div>
                </div>

                {/* Primary drawer action links */}
                <div className="flex gap-2 pt-1.5">
                  <button 
                    id="btn-drawer-track-live"
                    onClick={() => setIsLiveTracking(!isLiveTracking)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all border ${
                      isLiveTracking 
                        ? 'bg-emerald-600 border-emerald-500 text-white animate-pulse' 
                        : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300 hover:text-white'
                    }`}
                  >
                    {isLiveTracking ? '✓ Tracking Live' : 'Track Live'}
                  </button>
                  <button 
                    id="btn-drawer-history"
                    onClick={() => setShowRouteHistory(!showRouteHistory)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all border ${
                      showRouteHistory 
                        ? 'bg-indigo-600 border-indigo-500 text-white' 
                        : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300 hover:text-white'
                    }`}
                  >
                    Plot Path
                  </button>
                  <button 
                    id="btn-drawer-playback"
                    onClick={() => { setPlaybackMode(true); setPlaybackPathIndex(0); }}
                    className="flex-1 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    Replay
                  </button>
                  <button 
                    id="btn-drawer-details"
                    onClick={() => setActiveView('animals')}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 hover:text-white rounded-xl text-xs font-semibold transition-all"
                  >
                    Full Profile
                  </button>
                </div>
              </div>
            )}

            {/* Playback Overlay panel drawer */}
            {playbackMode && activeSelectedAnimal && (
              <MovementPlayback 
                animal={activeSelectedAnimal}
                playbackPathIndex={playbackPathIndex}
                onSetPathIndex={setPlaybackPathIndex}
                playbackSpeed={playbackSpeed}
                onSetPlaybackSpeed={setPlaybackSpeed}
                playbackActive={playbackActive}
                onSetPlaybackActive={setPlaybackActive}
                onClose={() => { setPlaybackMode(false); setPlaybackActive(false); }}
              />
            )}

            {/* If no selected animal, show a clean pasture helpful banner */}
            {!selectedAnimalId && (
              <div className="bg-gray-900/30 border border-gray-850 p-4 rounded-xl text-xs text-gray-400 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-400" />
                  <span>Click on any custom circular or polygon animal marker on the map to zoom and inspect vital telemetry.</span>
                </div>
                <button 
                  id="btn-map-breach"
                  onClick={handleSimulateBreach}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] px-2.5 py-1 rounded shadow"
                >
                  Simulate Breach
                </button>
              </div>
            )}
          </div>
        );
      
      case 'animals':
        // If an animal is selected, render the Detail subscreen
        if (selectedAnimalId && activeSelectedAnimal) {
          return (
            <AnimalDetail 
              animal={activeSelectedAnimal}
              onBack={() => setSelectedAnimalId(null)}
              isLiveTracking={isLiveTracking}
              onToggleLiveTracking={() => setIsLiveTracking(!isLiveTracking)}
              showRouteHistory={showRouteHistory}
              onToggleRouteHistory={() => setShowRouteHistory(!showRouteHistory)}
              onOpenPlayback={() => { setPlaybackMode(true); setPlaybackPathIndex(0); setActiveView('map'); }}
              onGetDirections={handleGetDirections}
            />
          );
        }

        // Otherwise list all animals
        return (
          <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-white">Livestock Asset Inventory</h1>
                <p className="text-gray-400 text-xs">Browse complete biometric records and pair configurations</p>
              </div>
              <button 
                id="btn-navigate-reg-animal"
                onClick={() => setActiveView('register-animal')}
                className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              >
                <PlusCircle className="w-4 h-4" /> Register Animal
              </button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {animals.map(animal => (
                <div 
                  key={animal.id}
                  onClick={() => setSelectedAnimalId(animal.id)}
                  className="p-5 bg-gray-900/40 border border-gray-800 hover:border-gray-700/80 rounded-2xl cursor-pointer transition-all flex items-start gap-4 hover:shadow-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: animal.status === 'Alert' ? '#EF4444' : animal.status === 'Healthy' ? '#10B981' : '#F59E0B' }} />

                  <div className="w-14 h-14 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center text-3xl shadow-inner select-none">
                    {animal.species === 'Cow' ? '🐄' : animal.species === 'Sheep' ? '🐑' : '🐐'}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{animal.name}</h3>
                      <span className="font-mono text-[9px] bg-gray-800 text-gray-500 px-1.5 py-0.2 rounded">{animal.tagId}</span>
                    </div>

                    <p className="text-gray-400 text-xs">
                      {animal.breed} • {animal.weight}kg • {animal.age} yrs
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-1">
                      <span>Temp: <span className="text-gray-300 font-semibold">{animal.temp}°C</span></span>
                      <span>Battery: <span className="text-gray-300 font-semibold">{animal.battery}%</span></span>
                      <span>Last sync: <span className="text-gray-300 font-semibold">{animal.lastUpdate}</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'alerts':
        return (
          <AlertsNotifications 
            alerts={alerts}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onAcknowledgeAll={handleAcknowledgeAll}
            onSelectAnimal={handleSelectAnimal}
          />
        );

      case 'profile':
        return (
          <UserProfile 
            onLogout={() => { setIsLoggedIn(false); setAnimals(INITIAL_ANIMALS); }}
            mapStyle={mapStyle}
            onSetMapStyle={setMapStyle}
          />
        );

      case 'register-animal':
        return (
          <AnimalRegistration 
            onRegister={handleRegisterAnimal}
            onBack={() => setActiveView('dashboard')}
          />
        );

      case 'register-device':
        return (
          <DeviceRegistration 
            animals={animals}
            onBack={() => setActiveView('dashboard')}
            onRegisterDevice={handleRegisterDevice}
          />
        );

      case 'reports':
        return <ReportsAnalytics />;

      case 'weather':
        return <WeatherClimate weather={weather} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#090D0A] text-gray-100 flex flex-col font-sans">
      
      {/* Top Main Navigation Header */}
      <header className="bg-gray-950/80 border-b border-gray-800/80 sticky top-0 z-30 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌾</span>
          <div>
            <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase">Pasture IoT Monitoring Portal</span>
            <h1 className="text-base font-black text-white leading-none mt-0.5">Livestock Telemetry Platform</h1>
          </div>
        </div>

        {/* View Mode Controller */}
        <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 p-1 rounded-xl text-xs font-bold">
          <button 
            id="btn-preview-desktop"
            onClick={() => setPreviewMode('desktop')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
              previewMode === 'desktop' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Laptop className="w-4 h-4" /> Desktop Web Portal
          </button>
          
          <button 
            id="btn-preview-smartphone"
            onClick={() => setPreviewMode('smartphone')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
              previewMode === 'smartphone' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Smartphone App Simulator
          </button>
        </div>
      </header>

      {/* Main Container Viewport */}
      {previewMode === 'desktop' ? (
        /* WIDE DESKTOP PORTAL VIEW */
        <div className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar Portal controls */}
          <aside className="lg:col-span-1 bg-gray-950 border border-gray-800/60 rounded-3xl p-5 h-fit space-y-5 sticky top-24">
            <div className="space-y-1">
              <span className="text-[9px] bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                OPERATIONAL SESSION
              </span>
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mt-1.5">Main Navigation</h3>
            </div>

            <nav className="space-y-1.5 text-xs font-bold">
              <button 
                id="btn-side-dashboard"
                onClick={() => handleNavigate('dashboard')}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${
                  activeView === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Activity className="w-4.5 h-4.5" /> Dashboard
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button 
                id="btn-side-map"
                onClick={() => handleNavigate('map')}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${
                  activeView === 'map' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <MapIcon className="w-4.5 h-4.5" /> Live Map Layer
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button 
                id="btn-side-animals"
                onClick={() => handleNavigate('animals')}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${
                  activeView === 'animals' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="w-4.5 h-4.5" /> Animal Directory
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button 
                id="btn-side-alerts"
                onClick={() => handleNavigate('alerts')}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${
                  activeView === 'alerts' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Bell className="w-4.5 h-4.5" /> Alarms Feed
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button 
                id="btn-side-profile"
                onClick={() => handleNavigate('profile')}
                className={`w-full text-left py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${
                  activeView === 'profile' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <User className="w-4.5 h-4.5" /> Farm Settings
                </span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            </nav>

            <div className="pt-4 border-t border-gray-800 text-[10px] text-gray-500 font-mono space-y-1">
              <div>Farm ID: <span className="text-white font-semibold">GREEN-MEAD-01</span></div>
              <div>Software Version: <span className="text-white">v3.5.2-LORA</span></div>
            </div>
          </aside>

          {/* Core workspace content */}
          <main className="lg:col-span-3">
            {renderCoreViewContent()}
          </main>
        </div>
      ) : (
        /* SMARTPHONE SIMULATOR FRAME */
        <div className="flex-1 flex items-center justify-center py-8">
          {/* iOS Device Bezel Wrapper Mockup */}
          <div className="w-[375px] h-[760px] bg-gray-950 border-[10px] border-gray-900 rounded-[48px] shadow-2xl relative flex flex-col overflow-hidden select-none border-t-[14px] border-b-[14px]">
            
            {/* Top iOS Camera Notch Bar */}
            <div className="absolute top-0 inset-x-0 h-6 bg-gray-950 flex justify-between items-center px-6 z-40 text-[10px] font-bold text-white">
              <span>9:41</span>
              {/* Camera Island pill */}
              <div className="w-20 h-4 bg-black rounded-full" />
              <div className="flex items-center gap-1 text-[8px]">
                <span>5G</span>
                <Wifi className="w-3 h-3 text-white" />
                <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
              </div>
            </div>

            {/* Simulated app title inside phone viewport */}
            <div className="bg-gray-950/90 border-b border-gray-800 px-4 pt-8 pb-3 flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-400 tracking-wider">🌾 IoT Tracker Mobile</span>
              <span className="font-mono text-[9px] text-gray-500">Live Connection</span>
            </div>

            {/* Scrollable Mobile Viewport area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#090D0A]">
              {renderCoreViewContent()}
            </div>

            {/* Native Mobile Floating Bottom Nav Bar */}
            <div className="bg-gray-950 border-t border-gray-900 px-2 py-3 flex justify-around items-center z-30">
              
              <button 
                id="btn-mobile-nav-dashboard"
                onClick={() => handleNavigate('dashboard')}
                className={`flex flex-col items-center gap-0.5 ${
                  activeView === 'dashboard' ? 'text-emerald-400' : 'text-gray-500'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span className="text-[8px] font-bold">Home</span>
              </button>

              <button 
                id="btn-mobile-nav-map"
                onClick={() => handleNavigate('map')}
                className={`flex flex-col items-center gap-0.5 ${
                  activeView === 'map' ? 'text-emerald-400' : 'text-gray-500'
                }`}
              >
                <MapIcon className="w-4 h-4" />
                <span className="text-[8px] font-bold">Map</span>
              </button>

              <button 
                id="btn-mobile-nav-animals"
                onClick={() => handleNavigate('animals')}
                className={`flex flex-col items-center gap-0.5 ${
                  activeView === 'animals' ? 'text-emerald-400' : 'text-gray-500'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span className="text-[8px] font-bold">Animals</span>
              </button>

              <button 
                id="btn-mobile-nav-alerts"
                onClick={() => handleNavigate('alerts')}
                className={`flex flex-col items-center gap-0.5 relative ${
                  activeView === 'alerts' ? 'text-emerald-400' : 'text-gray-500'
                }`}
              >
                <Bell className="w-4 h-4" />
                {alerts.some(a => !a.isAcknowledged) && (
                  <span className="absolute top-0 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                )}
                <span className="text-[8px] font-bold">Alarms</span>
              </button>

              <button 
                id="btn-mobile-nav-profile"
                onClick={() => handleNavigate('profile')}
                className={`flex flex-col items-center gap-0.5 ${
                  activeView === 'profile' ? 'text-emerald-400' : 'text-gray-500'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-[8px] font-bold">Profile</span>
              </button>

            </div>

            {/* iOS Home Indicator Bar */}
            <div className="absolute bottom-1 inset-x-0 h-1 flex justify-center pointer-events-none">
              <div className="w-24 h-1 bg-white/40 rounded-full" />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
