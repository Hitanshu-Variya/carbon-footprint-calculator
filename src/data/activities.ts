import { Activity, ActivityCategory } from '@/types/carbon';

export const activities: Record<ActivityCategory, Activity[]> = {
  transport: [
    { id: 'car', name: 'Car (km/day)', icon: '🚗', carbonPerUnit: 0.171, unit: 'km' },
    { id: 'bus', name: 'Bus (km/day)', icon: '🚌', carbonPerUnit: 0.089, unit: 'km' },
    { id: 'train', name: 'Train (km/day)', icon: '🚆', carbonPerUnit: 0.041, unit: 'km' },
    { id: 'bike', name: 'Bike (km/day)', icon: '🚴', carbonPerUnit: 0, unit: 'km' },
    { id: 'flight', name: 'Flights/year', icon: '✈️', carbonPerUnit: 90, unit: 'flights' },
  ],
  energy: [
    { id: 'electricity', name: 'Electricity (kWh/day)', icon: '💡', carbonPerUnit: 0.233, unit: 'kWh' },
    { id: 'heating', name: 'Gas Heating (hours/day)', icon: '🔥', carbonPerUnit: 2.1, unit: 'hours' },
    { id: 'ac', name: 'AC Usage (hours/day)', icon: '❄️', carbonPerUnit: 0.9, unit: 'hours' },
  ],
  food: [
    { id: 'meat', name: 'Meat Meals/week', icon: '🥩', carbonPerUnit: 6.61, unit: 'meals' },
    { id: 'dairy', name: 'Dairy Products/day', icon: '🥛', carbonPerUnit: 1.3, unit: 'servings' },
    { id: 'local', name: 'Local Food %', icon: '🥗', carbonPerUnit: -0.5, unit: '%' },
  ],
  digital: [
    { id: 'streaming', name: 'Streaming (hours/day)', icon: '📺', carbonPerUnit: 0.055, unit: 'hours' },
    { id: 'devices', name: 'Device Charging/day', icon: '📱', carbonPerUnit: 0.008, unit: 'charges' },
    { id: 'cloud', name: 'Cloud Storage (GB)', icon: '☁️', carbonPerUnit: 0.02, unit: 'GB' },
  ],
  waste: [
    { id: 'recycling', name: 'Recycling Rate %', icon: '♻️', carbonPerUnit: -0.3, unit: '%' },
    { id: 'composting', name: 'Composting %', icon: '🌱', carbonPerUnit: -0.2, unit: '%' },
    { id: 'plastic', name: 'Single-use Plastic/week', icon: '🥤', carbonPerUnit: 0.5, unit: 'items' },
  ],
};

export const categoryNames: Record<ActivityCategory, string> = {
  transport: 'Transportation',
  energy: 'Energy Usage',
  food: 'Food & Diet',
  digital: 'Digital Footprint',
  waste: 'Waste Management',
};

export const categoryDescriptions: Record<ActivityCategory, string> = {
  transport: 'How you move around affects your carbon footprint',
  energy: 'Home energy consumption and utilities',
  food: 'Your diet and food choices matter',
  digital: 'Digital activities and device usage',
  waste: 'Waste reduction and recycling habits',
};
