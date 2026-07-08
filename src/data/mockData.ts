/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Animal, Geofence, WeatherInfo, NotificationAlert } from '../types';

export const INITIAL_ANIMALS: Animal[] = [
  {
    id: 'anim_1',
    tagId: 'COW-402',
    name: 'Daisy',
    species: 'Cow',
    breed: 'Holstein',
    gender: 'Female',
    age: 4,
    weight: 620,
    status: 'Healthy',
    battery: 88,
    speed: 1.2,
    activity: 'Grazing',
    lastUpdate: '2 mins ago',
    coordinates: { x: 380, y: 310 },
    temp: 38.6, // normal is 38.5 - 39.3
    heartRate: 68, // normal is 48-84
    signal: 5,
    gateway: 'GW-HT-901',
    firmware: 'v2.1.4',
    owner: 'Johnathan Miller',
    ownerPhone: '+1 (555) 019-2834',
    farmName: 'Green Meadows Dairy',
    notes: 'Very docile. High milk productivity. Keep an eye on left hind hoof.',
    activationDate: '2025-03-12',
    path: [
      { x: 300, y: 250, time: '06:00 AM', activity: 'Resting', speed: 0, notes: 'Resting near shade trees' },
      { x: 320, y: 260, time: '07:30 AM', activity: 'Walking', speed: 1.5, notes: 'Began morning stroll' },
      { x: 350, y: 290, time: '09:00 AM', activity: 'Grazing', speed: 0.8, notes: 'Grazing primary clover area' },
      { x: 380, y: 310, time: '11:00 AM', activity: 'Grazing', speed: 1.2, notes: 'Slow movement, heavy feeding' },
      { x: 500, y: 320, time: '12:30 PM', activity: 'Walking', speed: 2.1, notes: 'Headed towards North Water Pond' },
      { x: 620, y: 380, time: '02:00 PM', activity: 'Resting', speed: 0.2, notes: 'Drinking and resting by the water' },
      { x: 580, y: 340, time: '03:30 PM', activity: 'Grazing', speed: 0.6, notes: 'Grazing near east boundary' },
      { x: 440, y: 300, time: '05:00 PM', activity: 'Walking', speed: 1.8, notes: 'Returning to core pasture' }
    ]
  },
  {
    id: 'anim_2',
    tagId: 'COW-215',
    name: 'Bella',
    species: 'Cow',
    breed: 'Jersey',
    gender: 'Female',
    age: 3,
    weight: 450,
    status: 'Healthy',
    battery: 42,
    speed: 0.1,
    activity: 'Resting',
    lastUpdate: '5 mins ago',
    coordinates: { x: 310, y: 260 },
    temp: 38.4,
    heartRate: 54,
    signal: 4,
    gateway: 'GW-HT-901',
    firmware: 'v2.1.4',
    owner: 'Johnathan Miller',
    ownerPhone: '+1 (555) 019-2834',
    farmName: 'Green Meadows Dairy',
    notes: 'Prefers shaded areas near the old oak grove.',
    activationDate: '2025-05-18',
    path: [
      { x: 300, y: 240, time: '06:00 AM', activity: 'Resting', speed: 0 },
      { x: 305, y: 245, time: '08:00 AM', activity: 'Resting', speed: 0.1 },
      { x: 310, y: 260, time: '10:00 AM', activity: 'Grazing', speed: 0.5 },
      { x: 315, y: 255, time: '12:00 PM', activity: 'Resting', speed: 0 },
      { x: 310, y: 260, time: '02:00 PM', activity: 'Resting', speed: 0.1 }
    ]
  },
  {
    id: 'anim_3',
    tagId: 'SHP-108',
    name: 'Pip',
    species: 'Sheep',
    breed: 'Merino',
    gender: 'Female',
    age: 2,
    weight: 65,
    status: 'Battery Low',
    battery: 8,
    speed: 0.8,
    activity: 'Grazing',
    lastUpdate: '1 min ago',
    coordinates: { x: 740, y: 580 },
    temp: 39.0, // normal is 38.3 - 39.9
    heartRate: 74, // normal is 70-90
    signal: 3,
    gateway: 'GW-MT-802',
    firmware: 'v1.9.9',
    owner: 'Johnathan Miller',
    ownerPhone: '+1 (555) 019-2834',
    farmName: 'Green Meadows Dairy',
    notes: 'Needs shearing next week. Device battery depleting rapidly.',
    activationDate: '2025-08-01',
    path: [
      { x: 800, y: 550, time: '06:00 AM', activity: 'Resting', speed: 0 },
      { x: 780, y: 560, time: '08:00 AM', activity: 'Walking', speed: 1.1 },
      { x: 750, y: 570, time: '10:00 AM', activity: 'Grazing', speed: 0.9 },
      { x: 740, y: 580, time: '12:00 PM', activity: 'Grazing', speed: 0.8 }
    ]
  },
  {
    id: 'anim_4',
    tagId: 'GOT-055',
    name: 'Rocky',
    species: 'Goat',
    breed: 'Boer',
    gender: 'Male',
    age: 2,
    weight: 85,
    status: 'Idle',
    battery: 92,
    speed: 0.3,
    activity: 'Resting',
    lastUpdate: '10 secs ago',
    coordinates: { x: 790, y: 640 },
    temp: 39.1, // normal is 38.5 - 39.7
    heartRate: 82, // normal is 70-90
    signal: 5,
    gateway: 'GW-MT-802',
    firmware: 'v1.9.11',
    owner: 'Sarah Connor',
    ownerPhone: '+1 (555) 011-9922',
    farmName: 'Rocky Ridge Caprines',
    notes: 'Extremely active climber. Prone to testing fence boundaries.',
    activationDate: '2025-10-10',
    path: [
      { x: 700, y: 600, time: '06:00 AM', activity: 'Resting', speed: 0 },
      { x: 720, y: 620, time: '08:00 AM', activity: 'Walking', speed: 2.5 },
      { x: 780, y: 650, time: '10:00 AM', activity: 'Running', speed: 4.8 },
      { x: 790, y: 640, time: '12:00 PM', activity: 'Resting', speed: 0.3 }
    ]
  },
  {
    id: 'anim_5',
    tagId: 'COW-099',
    name: 'Duke',
    species: 'Cow',
    breed: 'Holstein',
    gender: 'Male',
    age: 5,
    weight: 790,
    status: 'Alert',
    battery: 76,
    speed: 4.5,
    activity: 'Running',
    lastUpdate: 'Just now',
    coordinates: { x: 80, y: 780 }, // Outside boundary!
    temp: 40.2, // Abnormal temperature! Indicating heat stress or fever.
    heartRate: 98, // High heart rate
    signal: 2,
    gateway: 'GW-HT-901',
    firmware: 'v2.1.4',
    owner: 'Johnathan Miller',
    ownerPhone: '+1 (555) 019-2834',
    farmName: 'Green Meadows Dairy',
    notes: 'Strong bull. High temperament. Has currently breached the Southwestern Geofence!',
    activationDate: '2024-09-15',
    path: [
      { x: 180, y: 620, time: '06:00 AM', activity: 'Resting', speed: 0 },
      { x: 160, y: 650, time: '08:00 AM', activity: 'Grazing', speed: 1.1 },
      { x: 140, y: 700, time: '10:00 AM', activity: 'Walking', speed: 2.3 },
      { x: 100, y: 740, time: '11:30 AM', activity: 'Running', speed: 3.8, notes: 'Left Safe Grazing Area' },
      { x: 80, y: 780, time: '12:00 PM', activity: 'Running', speed: 4.5, notes: 'Breached Southwest Ditch boundary' }
    ]
  }
];

export const INITIAL_GEOFENCES: Geofence[] = [
  {
    id: 'fence_1',
    name: 'Main Pasture (Safe)',
    type: 'polygon',
    coordinates: [
      { x: 150, y: 150 },
      { x: 850, y: 120 },
      { x: 920, y: 700 },
      { x: 120, y: 740 }
    ],
    color: '#10B981', // green
    isActive: true,
    alertOnExit: true,
    alertOnEntry: false
  },
  {
    id: 'fence_2',
    name: 'North-East Restricted Marsh',
    type: 'circular',
    coordinates: [{ x: 820, y: 220 }],
    radius: 90,
    color: '#EF4444', // red
    isActive: true,
    alertOnExit: false,
    alertOnEntry: true
  }
];

export const INITIAL_WEATHER: WeatherInfo = {
  temp: 24,
  feelsLike: 26,
  humidity: 78,
  rainProbability: 20,
  windSpeed: 14,
  windDirection: 'NE',
  uvIndex: 4,
  aqi: 45, // Good
  sunrise: '05:48 AM',
  sunset: '07:32 PM',
  forecast: [
    { day: 'Today', temp: 24, icon: 'CloudRain', condition: 'Partly Cloudy' },
    { day: 'Wed', temp: 26, icon: 'Sun', condition: 'Sunny & Warm' },
    { day: 'Thu', temp: 25, icon: 'Cloud', condition: 'Cloudy' },
    { day: 'Fri', temp: 22, icon: 'CloudLightning', condition: 'Heavy Thunderstorms' },
    { day: 'Sat', temp: 23, icon: 'CloudRain', condition: 'Light Showers' },
    { day: 'Sun', temp: 25, icon: 'Sun', condition: 'Clear Skies' },
    { day: 'Mon', temp: 27, icon: 'Sun', condition: 'Hot & Humid' }
  ],
  alerts: [
    {
      id: 'w_alert_1',
      type: 'Storm Warning',
      severity: 'warning',
      message: 'Severe thunderstorms forecast for Friday. Plan shelter transfer for sheep.'
    }
  ]
};

export const INITIAL_ALERTS: NotificationAlert[] = [
  {
    id: 'alert_1',
    animalId: 'anim_5',
    animalName: 'Duke',
    tagId: 'COW-099',
    type: 'Fence Out',
    message: 'Duke (COW-099) has exited the Main Pasture (Safe) geofence boundary.',
    timestamp: '5 mins ago',
    isAcknowledged: false,
    severity: 'critical'
  },
  {
    id: 'alert_2',
    animalId: 'anim_5',
    animalName: 'Duke',
    tagId: 'COW-099',
    type: 'Abnormal Temp',
    message: 'Duke exhibits high body temperature: 40.2°C (Fever/Heat stress threshold).',
    timestamp: '4 mins ago',
    isAcknowledged: false,
    severity: 'critical'
  },
  {
    id: 'alert_3',
    animalId: 'anim_3',
    animalName: 'Pip',
    tagId: 'SHP-108',
    type: 'Low Battery',
    message: 'Pip\'s tracker (SHP-108) is critical at 8% battery.',
    timestamp: '2 hours ago',
    isAcknowledged: true,
    severity: 'warning'
  },
  {
    id: 'alert_4',
    type: 'Weather Warning',
    message: 'Friday weather warning: High winds and storm conditions ahead.',
    timestamp: 'Yesterday',
    isAcknowledged: false,
    severity: 'info'
  }
];
