/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  QrCode, 
  Cpu, 
  Check, 
  Wifi, 
  Server, 
  Smartphone,
  Gauge,
  Sparkles
} from 'lucide-react';
import { Animal } from '../types';

interface DeviceRegistrationProps {
  animals: Animal[];
  onBack: () => void;
  onRegisterDevice: (deviceData: any) => void;
}

export const DeviceRegistration: React.FC<DeviceRegistrationProps> = ({
  animals,
  onBack,
  onRegisterDevice
}) => {
  const [deviceType, setDeviceType] = useState<'Smart Sensor Node' | 'Edge Gateway' | 'Asset Tracker'>('Smart Sensor Node');
  const [serialNumber, setSerialNumber] = useState('');
  const [firmware, setFirmware] = useState('v2.1.4');
  const [assignedAnimalId, setAssignedAnimalId] = useState('');
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [connectionTested, setConnectionTested] = useState(false);

  const triggerScanner = () => {
    setIsScanning(true);
    setScanDone(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanDone(true);
      const randSerial = `SN-${deviceType.substring(0,3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setSerialNumber(randSerial);
    }, 1500);
  };

  const handleTestPing = () => {
    setConnectionTested(true);
    alert('Ping package transmitted! Latency: 44ms over LoRa SF7. Signal strength: Excellent.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber) {
      alert('Please fill out all required fields or scan the barcode.');
      return;
    }

    onRegisterDevice({
      deviceType,
      serialNumber,
      firmware,
      assignedAnimalId,
      status: 'Online'
    });

    alert(`IoT Hardware ${deviceType} with serial ${serialNumber} successfully provisioned!`);
    onBack();
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button 
          id="btn-back-reg-device"
          onClick={onBack}
          className="p-2 bg-white border border-stone-200 text-stone-500 hover:text-stone-800 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-stone-900">Register IoT Hardware Node</h1>
          <p className="text-stone-500 text-xs font-medium">Provision sensor collars, edge gateways, or sub-GHz asset trackers</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Hardware Type Selection */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <label className="text-xs font-bold text-stone-500 block">IoT Hardware Architecture Type *</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Sensor Node */}
            <button
              id="btn-dev-type-node"
              type="button"
              onClick={() => {
                setDeviceType('Smart Sensor Node');
                setFirmware('v2.1.4');
              }}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                deviceType === 'Smart Sensor Node'
                  ? 'bg-[#E1EAD8] border-[#A3B18A] text-[#3A5A40]'
                  : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-850 hover:bg-stone-100'
              }`}
            >
              <Cpu className="w-5 h-5" />
              <span className="text-xs font-bold text-stone-900">Smart Sensor Node</span>
              <span className="text-[9px] text-stone-400 font-medium">Collar device tracks GPS & Temperature</span>
            </button>

            {/* Edge Gateway */}
            <button
              id="btn-dev-type-gateway"
              type="button"
              onClick={() => {
                setDeviceType('Edge Gateway');
                setFirmware('v4.0.2');
              }}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                deviceType === 'Edge Gateway'
                  ? 'bg-blue-100 border-blue-300 text-blue-800'
                  : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-850 hover:bg-stone-100'
              }`}
            >
              <Server className="w-5 h-5" />
              <span className="text-xs font-bold text-stone-900">Edge Gateway Antenna</span>
              <span className="text-[9px] text-stone-400 font-medium">LoRaWAN base station for field mesh</span>
            </button>

            {/* Asset Tracker */}
            <button
              id="btn-dev-type-tracker"
              type="button"
              onClick={() => {
                setDeviceType('Asset Tracker');
                setFirmware('v1.8.9');
              }}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                deviceType === 'Asset Tracker'
                  ? 'bg-violet-100 border-violet-300 text-violet-800'
                  : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-850 hover:bg-stone-100'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span className="text-xs font-bold text-stone-900">Herd Asset Tracker</span>
              <span className="text-[9px] text-stone-400 font-medium">Compact LTE tracker with long battery</span>
            </button>

          </div>
        </div>

        {/* Scan Portal */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Hardware Serial Scan</h3>
              <p className="text-stone-500 text-xs font-medium">Scan the hardware barcode or MAC address label</p>
            </div>
            
            <button 
              id="btn-scan-device-qr"
              type="button"
              onClick={triggerScanner}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-950 border border-stone-200 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-stone-500" /> Scan Device QR
            </button>
          </div>

          {isScanning && (
            <div className="relative h-44 bg-stone-950 rounded-xl border border-dashed border-[#3A5A40]/50 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-[#3A5A40] via-[#A3B18A] to-[#3A5A40] animate-[bounce_1.5s_infinite]" />
              <QrCode className="w-12 h-12 text-[#A3B18A] animate-pulse mb-2" />
              <span className="text-xs font-bold text-[#A3B18A] font-mono">Camera active... Scan device barcode</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-500 block mb-1">Device Serial Key (MAC Address) *</label>
              <input 
                id="input-serial"
                type="text"
                placeholder="e.g. SN-LORA-490321"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none font-mono font-bold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-500 block mb-1">Firmware Build Version</label>
              <input 
                id="input-firmware"
                type="text"
                placeholder="e.g. v2.1.4"
                value={firmware}
                onChange={(e) => setFirmware(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Pairing parameters and test link */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold text-stone-850 uppercase tracking-wider font-mono">Device Deployment Pairing</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-500 block mb-1">Assign to Monitored Livestock</label>
              <select 
                id="select-assign-animal"
                value={assignedAnimalId}
                onChange={(e) => setAssignedAnimalId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-950 focus:border-[#3A5A40] focus:bg-white outline-none font-semibold"
              >
                <option value="">Unassigned (Inventory Reserve)</option>
                {animals.map(animal => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name} ({animal.tagId} • {animal.species})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button 
                id="btn-test-ping"
                type="button"
                onClick={handleTestPing}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 border border-stone-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Wifi className="w-4 h-4 text-[#3A5A40]" /> Ping Device Link Test
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-[10px] text-stone-500 max-w-md font-medium">
              Registration initializes key handshakes to bind with the pasture's LoRa gateways. A battery health check of 100% is simulated on deployment.
            </p>
            
            <button 
              id="btn-submit-reg-device"
              type="submit"
              className="px-8 py-2.5 bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white font-bold text-xs rounded-xl shadow-md shadow-[#3A5A40]/10 transition-all cursor-pointer"
            >
              Provision IoT Node
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
