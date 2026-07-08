/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AnimalSpecies = 'Cow' | 'Sheep' | 'Goat';

export type AnimalStatus = 'Healthy' | 'Idle' | 'Grazing' | 'Battery Low' | 'Alert';

export type AnimalActivity = 'Resting' | 'Grazing' | 'Walking' | 'Running';

export interface MapCoordinate {
  x: number;
  y: number;
}

export interface MovementPoint extends MapCoordinate {
  time: string;
  activity: AnimalActivity;
  speed: number;
  notes?: string;
}

export interface Animal {
  id: string;
  tagId: string;
  name: string;
  species: AnimalSpecies;
  breed: string;
  gender: 'Male' | 'Female';
  age: number; // in years
  weight: number; // in kg
  status: AnimalStatus;
  battery: number; // 0 to 100
  speed: number; // km/h
  activity: AnimalActivity;
  lastUpdate: string; // ISO string or relative
  coordinates: MapCoordinate;
  path: MovementPoint[];
  temp: number; // body temperature in Celsius
  heartRate: number; // bpm
  signal: number; // 1-5 LTE signal strength
  gateway: string; // Gateway serial number
  firmware: string;
  owner: string;
  ownerPhone: string;
  farmName: string;
  notes?: string;
  activationDate: string;
  avatarUrl?: string;
}

export interface Geofence {
  id: string;
  name: string;
  type: 'circular' | 'polygon';
  coordinates: MapCoordinate[]; // array of points
  radius?: number; // for circular
  color: string;
  isActive: boolean;
  alertOnExit: boolean;
  alertOnEntry: boolean;
}

export interface WeatherInfo {
  temp: number;
  feelsLike: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  aqi: number;
  sunrise: string;
  sunset: string;
  forecast: {
    day: string;
    temp: number;
    icon: string;
    condition: string;
  }[];
  alerts: {
    id: string;
    type: 'Heavy Rain' | 'Heat Stress' | 'High Wind' | 'Storm Warning';
    severity: 'info' | 'warning' | 'danger';
    message: string;
  }[];
}

export interface NotificationAlert {
  id: string;
  animalId?: string;
  animalName?: string;
  tagId?: string;
  type: 'Fence Out' | 'No Movement' | 'Excessive Speed' | 'Device Offline' | 'Low Battery' | 'Abnormal Temp' | 'Weather Warning' | 'Fence In';
  message: string;
  timestamp: string;
  isAcknowledged: boolean;
  severity: 'info' | 'warning' | 'critical';
}
