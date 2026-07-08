/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  PlusCircle, 
  ArrowLeft, 
  QrCode, 
  Check, 
  HelpCircle, 
  Info,
  Sparkles,
  Camera,
  Layers,
  Phone,
  User,
  Heart
} from 'lucide-react';
import { Animal, AnimalSpecies } from '../types';

interface AnimalRegistrationProps {
  onRegister: (animalData: Partial<Animal>) => void;
  onBack: () => void;
}

export const AnimalRegistration: React.FC<AnimalRegistrationProps> = ({
  onRegister,
  onBack
}) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<AnimalSpecies>('Cow');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState<number>(3);
  const [weight, setWeight] = useState<number>(450);
  const [gender, setGender] = useState<'Male' | 'Female'>('Female');
  const [tagId, setTagId] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [owner, setOwner] = useState('Johnathan Miller');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [notes, setNotes] = useState('');

  // QR Scanning Simulator
  const [isScanning, setIsScanning] = useState(false);
  const [scannedSuccess, setScannedSuccess] = useState(false);

  const triggerQrSimulator = () => {
    setIsScanning(true);
    setScannedSuccess(false);

    // Simulate laser scanning for 1.8 seconds
    setTimeout(() => {
      setIsScanning(false);
      setScannedSuccess(true);
      const randomIds = ['COW-921', 'SHP-404', 'GOT-098', 'COW-104', 'GOT-331'];
      const chosenTag = `${species.substring(0,3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
      setTagId(chosenTag);
      setDeviceId(`TX-${chosenTag}-LORA`);
    }, 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !breed || !tagId) {
      alert('Please fill out all required fields or scan a tracker QR code.');
      return;
    }

    // Default coordinate points on map
    const defaultCoords = {
      x: 200 + Math.floor(Math.random() * 400),
      y: 200 + Math.floor(Math.random() * 400)
    };

    const newAnimal: Partial<Animal> = {
      name,
      species,
      breed,
      age: Number(age),
      weight: Number(weight),
      gender,
      tagId,
      status: 'Healthy',
      battery: 100,
      speed: 0,
      activity: 'Resting',
      lastUpdate: 'Just now',
      coordinates: defaultCoords,
      temp: 38.6,
      heartRate: 72,
      signal: 5,
      gateway: 'GW-HT-901',
      firmware: 'v2.1.4',
      owner,
      ownerPhone: phone,
      farmName: 'Green Meadows Dairy',
      notes,
      activationDate: new Date().toISOString().split('T')[0],
      path: [
        { ...defaultCoords, time: 'Just now', activity: 'Resting', speed: 0, notes: 'Asset paired and deployed to pasture.' }
      ]
    };

    onRegister(newAnimal);
    alert(`${name} registered and paired successfully with tracking tag ${tagId}!`);
    onBack();
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button 
          id="btn-back-reg-animal"
          onClick={onBack}
          className="p-2 bg-white border border-stone-200 text-stone-500 hover:text-stone-800 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-stone-900">Register New Animal</h1>
          <p className="text-stone-500 text-xs font-medium">Add livestock and pair IoT trackers instantly</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Profile Picture Mock & Species Selection */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
          {/* Mock Drag & Drop Upload */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-stone-200 hover:border-[#3A5A40]/50 p-6 rounded-xl text-center bg-stone-50/50 group transition-all cursor-pointer">
            <div className="p-3 bg-white rounded-full text-stone-400 group-hover:text-[#3A5A40] transition-colors mb-2 shadow-sm border border-stone-100">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-stone-700 block">Upload Profile Photo</span>
            <span className="text-[10px] text-stone-400 mt-1">Drag file or click to choose (JPEG/PNG)</span>
          </div>

          {/* Species Selector fields */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-500 block mb-1.5">Livestock Classification *</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Cow', 'Sheep', 'Goat'] as const).map(type => (
                  <button
                    key={type}
                    id={`btn-species-${type}`}
                    type="button"
                    onClick={() => {
                      setSpecies(type);
                      setBreed(type === 'Cow' ? 'Holstein' : type === 'Sheep' ? 'Merino' : 'Boer');
                      setWeight(type === 'Cow' ? 600 : type === 'Sheep' ? 65 : 75);
                    }}
                    className={`py-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                      species === type 
                        ? 'bg-[#E1EAD8] border-[#A3B18A] text-[#3A5A40]' 
                        : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-850 hover:bg-stone-100'
                    }`}
                  >
                    <span>{type === 'Cow' ? '🐄' : type === 'Sheep' ? '🐑' : '🐐'}</span>
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">Gender *</label>
                <select 
                  id="select-gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-950 focus:border-[#3A5A40] focus:bg-white outline-none font-medium"
                >
                  <option value="Female">Female (Dam / Doe / Ewe)</option>
                  <option value="Male">Male (Sire / Buck / Ram)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">Animal Identifier Name *</label>
                <input 
                  id="input-name"
                  type="text"
                  placeholder="e.g. Daisy, Gertrude"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none font-medium"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tracker Pairing QR Laser Scanning Simulator */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-stone-900">IoT Sensor pairing</h3>
              <p className="text-stone-500 text-xs">Pair the animal with a collar-mounted GPS transponder</p>
            </div>
            
            <button 
              id="btn-scan-qr"
              type="button"
              onClick={triggerQrSimulator}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-950 border border-stone-200 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-stone-500" /> Scan Tracker QR Code
            </button>
          </div>

          {isScanning && (
            <div className="relative h-44 bg-stone-950 rounded-xl border border-dashed border-[#3A5A40]/50 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-[#3A5A40] via-[#A3B18A] to-[#3A5A40] animate-[bounce_1.5s_infinite]" />
              <QrCode className="w-12 h-12 text-[#A3B18A] animate-pulse mb-2" />
              <span className="text-xs font-bold text-[#A3B18A] font-mono">Initializing Camera Feed... Scanning collar QR</span>
            </div>
          )}

          {scannedSuccess && !isScanning && (
            <div className="p-3 bg-[#E1EAD8] border border-[#A3B18A]/50 rounded-xl flex items-center gap-2 text-xs text-[#3A5A40] animate-fade font-semibold">
              <Check className="w-5 h-5" />
              <span>Collar IoT Node found! Paired successfully. Tag ID: <span className="font-bold text-stone-900 font-mono">{tagId}</span></span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-500 block mb-1">Assigned Tag ID (Auto-scanned) *</label>
              <input 
                id="input-tag"
                type="text"
                placeholder="e.g. COW-402, SHP-219"
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-500 block mb-1">LoRa Device ID (Simulated MAC)</label>
              <input 
                id="input-device"
                type="text"
                placeholder="Auto-injected"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                className="w-full bg-stone-100/50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-500 outline-none font-mono cursor-not-allowed"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Veterinary specifications and notes */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-stone-900">Veterinary & Profile Metrics</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold text-stone-500 block mb-1">Age (Years)</label>
                <input 
                  id="input-age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-500 block mb-1">Weight (kg)</label>
                <input 
                  id="input-weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-500 block mb-1">Breed Classification *</label>
                <input 
                  id="input-breed"
                  type="text"
                  placeholder="e.g. Holstein"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-500 block mb-1">Owner Name</label>
              <input 
                id="input-owner"
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-500 block mb-1">Special Medical Notes / Instructions</label>
              <textarea 
                id="textarea-notes"
                placeholder="e.g. Pregnant cow, requires shade monitoring..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none h-20 resize-none font-medium"
              />
            </div>
          </div>

          <div className="bg-[#F5F7F2] p-5 rounded-2xl border border-stone-200/60 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] bg-violet-100 text-violet-700 border border-violet-200 px-2.5 py-0.5 rounded-full font-bold">SMART ASSIGN</span>
              <p className="text-stone-600 text-[11px] leading-relaxed font-medium">
                Upon saving, this transponder pairs automatically with our cloud monitoring database. Recommended gateway connectivity will route via <span className="text-stone-800 font-bold">GW-HT-901</span> sub-GHz antenna cluster.
              </p>
            </div>
            
            <button 
              id="btn-submit-reg-animal"
              type="submit"
              className="w-full py-2.5 bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white font-bold text-xs rounded-xl shadow-md shadow-[#3A5A40]/10 transition-all cursor-pointer"
            >
              Add Asset & Deploy
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
