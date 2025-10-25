// Project Types & Interfaces

export interface ElectricalItem {
  id: string;
  name: string;
  category: 'prize' | 'lumina' | 'switches' | 'tablouri' | 'protectii' | 'cabluri' | 'doze';
  price: number;
  icon: string;
  description?: string;
}

export interface RoomItem {
  id: string;
  itemId: string;
  quantity: number;
  comment?: string;
  groupId?: string; // For grouping items together
}

export interface ItemGroup {
  id: string;
  name: string;
  color?: string;
  items: string[]; // Array of RoomItem IDs
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  items: RoomItem[];
  groups?: ItemGroup[];
  width?: number;
  height?: number;
}

export interface RoadmapStage {
  id: string;
  name: string;
  status: 'not_started' | 'in_progress' | 'completed';
  date?: string;
  description: string;
  icon: string; // lucide icon name
}

export interface FotovoltaicMetadata {
  systemPower?: number; // kW
  numberOfPanels?: number;
  totalCost?: number;
  yearlyProduction?: number;
  monthlySavings?: number;
  batteryCapacity?: number;
  [key: string]: any;
}

export interface BransamentMetadata {
  propertyType?: string;
  distance?: number;
  requestedPower?: number;
  totalCost?: number;
  [key: string]: any;
}

export interface Project {
  id: string;
  name: string;
  type: 'rezidential' | 'fotovoltaic' | 'bransament';
  description?: string;
  rooms: Room[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'in_progress' | 'completed';
  roadmap?: RoadmapStage[];
  metadata?: FotovoltaicMetadata | BransamentMetadata | any; // Metadata specifică tipului
}

export const ELECTRICAL_CATALOG: ElectricalItem[] = [
  // Prize
  { id: 'priza-simpla', name: 'Priză simplă', category: 'prize', price: 15, icon: 'Plug', description: 'Priză standard 220V' },
  { id: 'priza-dubla', name: 'Priză dublă', category: 'prize', price: 25, icon: 'Plug2', description: 'Priză dublă 220V' },
  { id: 'priza-usb', name: 'Priză USB', category: 'prize', price: 45, icon: 'Usb', description: 'Priză cu port USB' },
  { id: 'priza-schuko', name: 'Priză Schuko', category: 'prize', price: 20, icon: 'Plug', description: 'Priză cu împământare' },

  // Lumină
  { id: 'spot-led', name: 'Spot LED', category: 'lumina', price: 35, icon: 'Lightbulb', description: 'Spot LED 5W' },
  { id: 'plafoniera', name: 'Plafonieră', category: 'lumina', price: 120, icon: 'Lamp', description: 'Plafonieră LED 24W' },
  { id: 'banda-led', name: 'Bandă LED', category: 'lumina', price: 50, icon: 'Minus', description: 'Bandă LED RGB 5m' },
  { id: 'aplica', name: 'Aplică perete', category: 'lumina', price: 85, icon: 'LampDesk', description: 'Aplică decorativă' },

  // Întrerupătoare
  { id: 'intrerupator-simplu', name: 'Întrerupător simplu', category: 'switches', price: 12, icon: 'ToggleLeft', description: 'Întrerupător 1 circuit' },
  { id: 'intrerupator-dublu', name: 'Întrerupător dublu', category: 'switches', price: 18, icon: 'ToggleRight', description: 'Întrerupător 2 circuite' },
  { id: 'intrerupator-touch', name: 'Întrerupător touch', category: 'switches', price: 60, icon: 'Fingerprint', description: 'Întrerupător tactil' },
  { id: 'dimmer', name: 'Dimmer LED', category: 'switches', price: 80, icon: 'SlidersHorizontal', description: 'Variator de lumină' },

  // Tablouri
  { id: 'tablou-12', name: 'Tablou 12 module', category: 'tablouri', price: 180, icon: 'PanelTop', description: 'Tablou electric 12 module' },
  { id: 'tablou-24', name: 'Tablou 24 module', category: 'tablouri', price: 320, icon: 'PanelTop', description: 'Tablou electric 24 module' },

  // Protecții
  { id: 'disjunctor', name: 'Disjunctor', category: 'protectii', price: 45, icon: 'ShieldCheck', description: 'Disjunctor automat 16A' },
  { id: 'diferential', name: 'Diferențial', category: 'protectii', price: 95, icon: 'Shield', description: 'Întrerupător diferențial 40A' },

  // Cabluri
  { id: 'cablu-1.5', name: 'Cablu 3x1.5mm', category: 'cabluri', price: 8, icon: 'Cable', description: 'Cabluelectric/metru' },
  { id: 'cablu-2.5', name: 'Cablu 3x2.5mm', category: 'cabluri', price: 12, icon: 'Cable', description: 'Cablu electric/metru' },

  // Doze
  { id: 'doza-aparat', name: 'Doză aparat', category: 'doze', price: 3, icon: 'Box', description: 'Doză pentru priză/întrerupător' },
  { id: 'doza-derivatie', name: 'Doză derivație', category: 'doze', price: 5, icon: 'BoxSelect', description: 'Doză de derivație' },
];

export const ROOM_ICONS = {
  living: 'Sofa',
  bucatarie: 'UtensilsCrossed',
  dormitor: 'Bed',
  baie: 'Bath',
  hol: 'DoorOpen',
  birou: 'Briefcase',
  copii: 'Baby',
  garaj: 'Car',
  terasa: 'Flower2',
  altele: 'LayoutGrid',
};

export const PROJECT_TYPES = [
  { 
    id: 'rezidential', 
    name: 'Proiect Rezidențial', 
    icon: 'Home',
    color: '#2B5FA5', // Blue
    bgGradient: 'from-blue-600 to-blue-800',
    description: 'Instalații electrice pentru locuințe și case'
  },
  {
    id: 'fotovoltaic',
    name: 'Sistem Fotovoltaic',
    icon: 'Sun',
    color: '#E8E683', // Gold
    bgGradient: 'from-selectrik-gold to-selectrik-gold',
    description: 'Panouri solare și sisteme de energie regenerabilă'
  },
  { 
    id: 'bransament', 
    name: 'Branșament Electric', 
    icon: 'Zap',
    color: '#10b981', // Green
    bgGradient: 'from-green-500 to-green-600',
    description: 'Conectare la rețeaua electrică'
  },
];
