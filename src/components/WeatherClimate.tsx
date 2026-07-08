/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Sun, 
  CloudRain, 
  Cloud, 
  CloudLightning, 
  Wind, 
  Droplets, 
  Compass, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  Sunset, 
  Sunrise,
  ShieldCheck
} from 'lucide-react';
import { WeatherInfo } from '../types';

interface WeatherClimateProps {
  weather: WeatherInfo;
}

export const WeatherClimate: React.FC<WeatherClimateProps> = ({ weather }) => {
  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500 fill-amber-500/10" />;
      case 'CloudRain': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-stone-400" />;
      case 'CloudLightning': return <CloudLightning className="w-5 h-5 text-amber-600" />;
      default: return <Sun className="w-5 h-5 text-amber-500" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'danger': return 'bg-red-50 border border-red-200 text-red-800 shadow-sm';
      case 'warning': return 'bg-amber-50 border border-amber-200 text-amber-800 shadow-sm';
      default: return 'bg-blue-50 border border-blue-200 text-blue-800 shadow-sm';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Intro Header */}
      <div className="bg-[#F5F7F2] border border-stone-200 rounded-2xl p-5 shadow-sm">
        <span className="text-[#3A5A40] text-[10px] font-bold uppercase tracking-wider">Agronomical Telemetry Hub</span>
        <h1 className="text-xl font-bold text-stone-900 mt-1">Micro-Climate Intelligence</h1>
        <p className="text-stone-600 text-xs mt-1">Real-time localized meteorological indexes synced with pasture coordinates.</p>
      </div>

      {/* Weather Warnings Alert Banner */}
      {weather.alerts.length > 0 && (
        <div className="space-y-3">
          {weather.alerts.map(alert => (
            <div 
              key={alert.id}
              className={`p-4 rounded-xl flex items-start gap-3.5 transition-all ${getSeverityClass(alert.severity)}`}
            >
              <span className="p-2 bg-white/80 rounded-lg mt-0.5 animate-bounce shadow-sm border border-stone-200">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </span>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 uppercase tracking-wider">{alert.type} Alert</span>
                  <span className="text-[9px] bg-red-100 text-red-800 border border-red-200 px-2 py-0.5 rounded font-bold">CRITICAL RISK</span>
                </div>
                <p className="text-stone-700 text-[11px] leading-relaxed font-medium">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Environmental Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Metric 1: Temp & Feels */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-stone-400 text-[10px] font-bold uppercase">Temperature</span>
          <div className="mt-2.5 space-y-1">
            <h3 className="text-2xl font-black text-stone-900">{weather.temp}°C</h3>
            <span className="text-[10px] text-stone-500 block font-mono font-bold">Feels like {weather.feelsLike}°C</span>
          </div>
        </div>

        {/* Metric 2: Wind */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-stone-400 text-[10px] font-bold uppercase">Wind Speed</span>
          <div className="mt-2.5 space-y-1">
            <h3 className="text-2xl font-black text-stone-900 flex items-center gap-1.5">
              <Wind className="w-5 h-5 text-emerald-600" />
              <span>{weather.windSpeed} km/h</span>
            </h3>
            <span className="text-[10px] text-stone-500 block font-mono font-bold">Direction: {weather.windDirection}</span>
          </div>
        </div>

        {/* Metric 3: Rain */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-stone-400 text-[10px] font-bold uppercase">Rain Probability</span>
          <div className="mt-2.5 space-y-1">
            <h3 className="text-2xl font-black text-stone-900 flex items-center gap-1.5">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span>{weather.rainProbability}%</span>
            </h3>
            <span className="text-[10px] text-stone-500 block font-mono font-bold">Humidity: {weather.humidity}%</span>
          </div>
        </div>

        {/* Metric 4: UV & Air */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <span className="text-stone-400 text-[10px] font-bold uppercase">UV & Air Index</span>
          <div className="mt-2.5 space-y-1">
            <h3 className="text-2xl font-black text-stone-900">UV {weather.uvIndex}</h3>
            <span className="text-[10px] text-stone-500 block font-mono font-bold">AQI: {weather.aqi} (Excellent)</span>
          </div>
        </div>

      </div>

      {/* Sun Cycles and Hydration recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Sun cycles */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3.5 shadow-sm">
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Astral & Light Intervals</h3>
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center gap-2 shadow-sm">
              <Sunrise className="w-5 h-5 text-amber-500" />
              <div>
                <span className="text-[9px] text-stone-400 block leading-tight font-bold">Sunrise</span>
                <span className="text-stone-900 font-bold">{weather.sunrise}</span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center gap-2 shadow-sm">
              <Sunset className="w-5 h-5 text-amber-700" />
              <div>
                <span className="text-[9px] text-stone-400 block leading-tight font-bold">Sunset</span>
                <span className="text-stone-900 font-bold">{weather.sunset}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agronomy intelligence recommendation */}
        <div className="bg-gradient-to-r from-[#F5F7F2] to-[#E1EAD8]/30 border border-stone-200 rounded-2xl p-5 flex items-start gap-3 shadow-sm">
          <span className="p-2.5 bg-[#E1EAD8] text-[#3A5A40] rounded-xl mt-0.5 shadow-inner">
            <Sparkles className="w-5 h-5" />
          </span>
          <div className="space-y-1 text-xs">
            <h3 className="font-bold text-[#3A5A40]">Pasture Health & Hydration Advice</h3>
            <p className="text-stone-700 text-[11px] leading-relaxed font-medium">
              With temperature at {weather.temp}°C and winds from the {weather.windDirection}, evaporation is moderate. Goat perimeters are safe from mud rot. Ensure South Pasture water ponds are replenished before Thursday evening rainfront.
            </p>
          </div>
        </div>

      </div>

      {/* Weather Forecast (Next 7 Days) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-stone-900">7-Day Pasture Weather Outlook</h2>
        
        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {weather.forecast.map((fc, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-stone-50 border border-stone-200 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="p-1.5 bg-white border border-stone-200 rounded-lg text-stone-700 shadow-sm">
                  {getWeatherIcon(fc.icon)}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{fc.day}</h4>
                  <span className="text-[10px] text-stone-500 font-medium">{fc.condition}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold font-mono text-stone-900">{fc.temp}°C</span>
                <div className="text-[9px] text-stone-400 font-mono font-bold">Normal winds</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
