import { Activity, ActivityCategory } from '@/types/carbon';

export const activities: Record<ActivityCategory, Activity[]> = {
  transport: [
    { id: 'car', name: 'Car (km/day)', icon: '🚗', carbonPerUnit: 0.161, unit: 'km' },
    { id: 'bus', name: 'Bus (km/day)', icon: '🚌', carbonPerUnit: 0.015, unit: 'km' },
    { id: 'train', name: 'Train (km/day)', icon: '🚆', carbonPerUnit: 0.008, unit: 'km' },
    { id: 'bike', name: 'Bike (km/day)', icon: '🚴', carbonPerUnit: 0, unit: 'km' },
    // A single domestic return flight (short-haul) in India
    { id: 'flight', name: 'Flights/year', icon: '✈️', carbonPerUnit: 200, unit: 'flights' },
  ],
  energy: [
    { id: 'electricity', name: 'Electricity (kWh/day)', icon: '💡', carbonPerUnit: 0.82, unit: 'kWh' }, // CEA India Grid Factor
    // Assumes 3kW gas geyser/heater and Natural Gas factor
    { id: 'heating', name: 'Gas Heating (hours/day)', icon: '🔥', carbonPerUnit: 0.732, unit: 'hours' },
    // Assumes 1.5-ton AC (2.3kW) and India Grid Factor
    { id: 'ac', name: 'AC Usage (hours/day)', icon: '❄️', carbonPerUnit: 1.886, unit: 'hours' },
  ],
  food: [
    { id: 'meat', name: 'Meat Meals/week', icon: '🥩', carbonPerUnit: 6.0, unit: 'meals' },
    { id: 'dairy', name: 'Dairy Products/day', icon: '🥛', carbonPerUnit: 0.767, unit: 'servings' },
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
