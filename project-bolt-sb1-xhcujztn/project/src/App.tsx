import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Star, Zap, Crown, Gem, DollarSign, Target, BarChart3, Sparkles, Calculator, Plus, Minus, BookOpen, AlertTriangle, Moon, Sun, Palette } from 'lucide-react';

interface Item {
  id: number;
  name: string;
  valueOG: string;
  valueTag: string;
  demand: string;
  rarity: 'Low' | 'Mid' | 'High' | 'Extreme';
  salesOG: string;
  salesTag: string;
  category: string;
}

const items: Item[] = [
  // Guns
  { id: 1, name: "Night Sky", valueOG: "80", valueTag: "N/A", demand: "7/10", rarity: "High", salesOG: "$50", salesTag: "N/A", category: "Guns" },
  { id: 2, name: "Ash's Skyline", valueOG: "70", valueTag: "N/A", demand: "7/10", rarity: "High", salesOG: "$45", salesTag: "N/A", category: "Guns" },
  { id: 3, name: "Forest Gun", valueOG: "30", valueTag: "N/A", demand: "6/10", rarity: "High", salesOG: "$25", salesTag: "N/A", category: "Guns" },
  
  // Knives
  { id: 4, name: "Azure", valueOG: "0.5", valueTag: "N/A", demand: "3/10", rarity: "Low", salesOG: "$0.5", salesTag: "N/A", category: "Knives" },
  { id: 5, name: "Jade", valueOG: "0.5", valueTag: "N/A", demand: "3/10", rarity: "Low", salesOG: "$0.5", salesTag: "N/A", category: "Knives" },
  { id: 6, name: "Arctic", valueOG: "1", valueTag: "N/A", demand: "4/10", rarity: "Low", salesOG: "$1", salesTag: "N/A", category: "Knives" },
  { id: 7, name: "Sakura", valueOG: "2", valueTag: "N/A", demand: "5/10", rarity: "Low", salesOG: "$2", salesTag: "N/A", category: "Knives" },
  { id: 8, name: "RGB Eternal", valueOG: "3", valueTag: "6", demand: "5/10", rarity: "Low", salesOG: "$3", salesTag: "$5", category: "Knives" },
  { id: 9, name: "Mermaid", valueOG: "8", valueTag: "N/A", demand: "6/10", rarity: "Low", salesOG: "$5", salesTag: "N/A", category: "Knives" },
  { id: 10, name: "Splash", valueOG: "9", valueTag: "N/A", demand: "6/10", rarity: "Low", salesOG: "$8", salesTag: "N/A", category: "Knives" },
  { id: 11, name: "Paranormal", valueOG: "10", valueTag: "N/A", demand: "6/10", rarity: "Low", salesOG: "$8", salesTag: "N/A", category: "Knives" },
  { id: 12, name: "Cosmic", valueOG: "12", valueTag: "4-5", demand: "6/10", rarity: "Low", salesOG: "$10", salesTag: "$4", category: "Knives" },
  { id: 13, name: "Cerulean", valueOG: "13", valueTag: "4-5", demand: "6/10", rarity: "Low", salesOG: "$10", salesTag: "$4", category: "Knives" },
  { id: 14, name: "Phantom", valueOG: "14", valueTag: "4-5", demand: "6/10", rarity: "Low", salesOG: "$12", salesTag: "$4", category: "Knives" },
  { id: 15, name: "Poseidon", valueOG: "16", valueTag: "N/A", demand: "6/10", rarity: "Low", salesOG: "$12", salesTag: "N/A", category: "Knives" },
  { id: 16, name: "Infinite", valueOG: "17", valueTag: "6-8", demand: "6/10", rarity: "Mid", salesOG: "$15", salesTag: "$6-8", category: "Knives" },
  { id: 17, name: "Radiant", valueOG: "18", valueTag: "5-6", demand: "6/10", rarity: "Mid", salesOG: "$15", salesTag: "$5", category: "Knives" },
  { id: 18, name: "Heartache", valueOG: "20", valueTag: "N/A", demand: "8/10", rarity: "Low", salesOG: "$18", salesTag: "N/A", category: "Knives" },
  { id: 19, name: "Zeus", valueOG: "22", valueTag: "N/A", demand: "6/10", rarity: "Mid", salesOG: "$18", salesTag: "N/A", category: "Knives" },
  { id: 20, name: "Blue Cosmic", valueOG: "22", valueTag: "N/A", demand: "9/10", rarity: "Low", salesOG: "$18", salesTag: "N/A", category: "Knives" },
  { id: 21, name: "Latte", valueOG: "23", valueTag: "N/A", demand: "8/10", rarity: "Low", salesOG: "$18", salesTag: "N/A", category: "Knives" },
  { id: 22, name: "Blue Splash", valueOG: "25", valueTag: "N/A", demand: "7/10", rarity: "Low", salesOG: "$18", salesTag: "N/A", category: "Knives" },
  { id: 23, name: "Blood Radiant", valueOG: "26", valueTag: "10-12", demand: "7/10", rarity: "Low", salesOG: "$20", salesTag: "$8-10", category: "Knives" },
  { id: 24, name: "Eternal", valueOG: "26", valueTag: "5-6", demand: "6/10", rarity: "Mid", salesOG: "$20", salesTag: "$5", category: "Knives" },
  { id: 25, name: "Fracture", valueOG: "26", valueTag: "5-6", demand: "6/10", rarity: "Mid", salesOG: "$20", salesTag: "$5", category: "Knives" },
  { id: 26, name: "Dracula", valueOG: "34", valueTag: "N/A", demand: "8/10", rarity: "Low", salesOG: "$25", salesTag: "N/A", category: "Knives" },
  { id: 27, name: "Envy", valueOG: "36", valueTag: "N/A", demand: "8/10", rarity: "Low", salesOG: "$25", salesTag: "N/A", category: "Knives" },
  { id: 28, name: "Insomnia", valueOG: "36", valueTag: "N/A", demand: "8/10", rarity: "Mid", salesOG: "$25", salesTag: "N/A", category: "Knives" },
  { id: 29, name: "Miracle", valueOG: "40", valueTag: "24/16", demand: "7/10", rarity: "Mid", salesOG: "$25", salesTag: "$16/12$", category: "Knives" },
  { id: 30, name: "Cyclone", valueOG: "42", valueTag: "N/A", demand: "8/10", rarity: "Mid", salesOG: "$30", salesTag: "N/A", category: "Knives" },
  { id: 31, name: "Mellow", valueOG: "55", valueTag: "8-11", demand: "6/10", rarity: "Mid", salesOG: "$35", salesTag: "$8-10", category: "Knives" },
  { id: 32, name: "Grime", valueOG: "65", valueTag: "55", demand: "7/10", rarity: "Mid", salesOG: "$40", salesTag: "$35", category: "Knives" },
  { id: 33, name: "Hyperion", valueOG: "70", valueTag: "N/A", demand: "8/10", rarity: "Mid", salesOG: "$45", salesTag: "N/A", category: "Knives" },
  { id: 34, name: "Supernova", valueOG: "75", valueTag: "38", demand: "7/10", rarity: "Mid", salesOG: "$45", salesTag: "$25", category: "Knives" },
  { id: 35, name: "Luminance", valueOG: "80", valueTag: "N/A", demand: "9/10", rarity: "Mid", salesOG: "$50", salesTag: "N/A", category: "Knives" },
  { id: 36, name: "Ghoul", valueOG: "90", valueTag: "110", demand: "9/10", rarity: "Mid", salesOG: "$60", salesTag: "$70", category: "Knives" },
  { id: 37, name: "Equinox", valueOG: "95", valueTag: "N/A", demand: "9/10", rarity: "Mid", salesOG: "$55", salesTag: "N/A", category: "Knives" },
  { id: 38, name: "Sea of Voices", valueOG: "125", valueTag: "N/A", demand: "7/10", rarity: "High", salesOG: "$80", salesTag: "N/A", category: "Knives" },
  { id: 39, name: "Permafrost", valueOG: "160", valueTag: "N/A", demand: "6/10", rarity: "High", salesOG: "$90", salesTag: "N/A", category: "Knives" },
  { id: 40, name: "Neptune", valueOG: "180", valueTag: "200", demand: "8/10", rarity: "High", salesOG: "$100", salesTag: "$105", category: "Knives" },
  { id: 41, name: "Radiant 2", valueOG: "220", valueTag: "N/A", demand: "8/10", rarity: "High", salesOG: "$115", salesTag: "N/A", category: "Knives" },
  { id: 42, name: "Corrupt", valueOG: "N/A", valueTag: "260-360", demand: "8/10", rarity: "High", salesOG: "N/A", salesTag: "$120-160", category: "Knives" },
  { id: 43, name: "Vampire", valueOG: "N/A", valueTag: "260-360", demand: "8/10", rarity: "High", salesOG: "N/A", salesTag: "$120-160", category: "Knives" },
  { id: 44, name: "Lovely Azure", valueOG: "280", valueTag: "360", demand: "8/10", rarity: "High", salesOG: "$140", salesTag: "$160", category: "Knives" },
  { id: 45, name: "Aureus", valueOG: "360", valueTag: "360-460", demand: "7/10", rarity: "High", salesOG: "$180", salesTag: "$180-220", category: "Knives" },
  { id: 46, name: "Eerie", valueOG: "550", valueTag: "350", demand: "9/10", rarity: "Extreme", salesOG: "$250", salesTag: "$150", category: "Knives" },
  { id: 47, name: "Keqing", valueOG: "700", valueTag: "700-1100", demand: "9/10", rarity: "Extreme", salesOG: "$300", salesTag: "$300-400", category: "Knives" },
  { id: 48, name: "La Lune", valueOG: "1200", valueTag: "700-1000", demand: "8/10", rarity: "Extreme", salesOG: "$450", salesTag: "$300-400", category: "Knives" },

  // Chairs
  { id: 49, name: "Legacy", valueOG: "N/A", valueTag: "N/A", demand: "6/10", rarity: "Extreme", salesOG: "N/A", salesTag: "N/A", category: "Chairs" },
  { id: 50, name: "Royal Red", valueOG: "250", valueTag: "60", demand: "6/10", rarity: "Extreme", salesOG: "$115", salesTag: "$35", category: "Chairs" },
  { id: 51, name: "Festive Devil", valueOG: "230", valueTag: "35-45", demand: "6/10", rarity: "Extreme", salesOG: "$110", salesTag: "$30", category: "Chairs" },
  { id: 52, name: "Dusk", valueOG: "150", valueTag: "140-180", demand: "6/10", rarity: "High", salesOG: "$80", salesTag: "$80-100", category: "Chairs" },
  { id: 53, name: "Hallow", valueOG: "70", valueTag: "35", demand: "5/10", rarity: "High", salesOG: "$50", salesTag: "$25", category: "Chairs" },
  { id: 54, name: "Vibrant", valueOG: "60", valueTag: "35", demand: "7/10", rarity: "High", salesOG: "$40", salesTag: "$25", category: "Chairs" },
  { id: 55, name: "Rosa Devil", valueOG: "30", valueTag: "N/A", demand: "7/10", rarity: "High", salesOG: "$24", salesTag: "N/A", category: "Chairs" },
  { id: 56, name: "Blossom", valueOG: "26", valueTag: "7", demand: "5/10", rarity: "Mid", salesOG: "$20", salesTag: "$5", category: "Chairs" },
  { id: 57, name: "Decay", valueOG: "24", valueTag: "5", demand: "5/10", rarity: "High", salesOG: "$16", salesTag: "$4", category: "Chairs" },
  { id: 58, name: "Seafoam", valueOG: "22", valueTag: "N/A", demand: "5/10", rarity: "Mid", salesOG: "$16", salesTag: "N/A", category: "Chairs" },
  { id: 59, name: "RGB Devil", valueOG: "20", valueTag: "N/A", demand: "6/10", rarity: "Mid", salesOG: "$14", salesTag: "N/A", category: "Chairs" },
  { id: 60, name: "Royal Blue", valueOG: "20", valueTag: "4", demand: "5/10", rarity: "High", salesOG: "$14", salesTag: "$4", category: "Chairs" },
  { id: 61, name: "Fragrant", valueOG: "16", valueTag: "11", demand: "6/10", rarity: "Mid", salesOG: "$10", salesTag: "$8", category: "Chairs" },
  { id: 62, name: "Fluorescent", valueOG: "13", valueTag: "N/A", demand: "6/10", rarity: "Mid", salesOG: "$10", salesTag: "N/A", category: "Chairs" },
  { id: 63, name: "Storm", valueOG: "13", valueTag: "7", demand: "6/10", rarity: "Mid", salesOG: "$10", salesTag: "$5", category: "Chairs" },
  { id: 64, name: "Cupid", valueOG: "12", valueTag: "6", demand: "6/10", rarity: "Mid", salesOG: "$10", salesTag: "$4", category: "Chairs" },
  { id: 65, name: "Swamp", valueOG: "10", valueTag: "6", demand: "5/10", rarity: "Mid", salesOG: "$8", salesTag: "$4", category: "Chairs" },
  { id: 66, name: "Forest Devil", valueOG: "9", valueTag: "5", demand: "5/10", rarity: "High", salesOG: "$7", salesTag: "$4", category: "Chairs" },
  { id: 67, name: "Frost Devil", valueOG: "8", valueTag: "4", demand: "5/10", rarity: "Mid", salesOG: "$6", salesTag: "$3", category: "Chairs" },
  { id: 68, name: "Lovesick", valueOG: "7", valueTag: "4", demand: "4/10", rarity: "Low", salesOG: "$5", salesTag: "$3", category: "Chairs" },
  { id: 69, name: "Cursed", valueOG: "7", valueTag: "4", demand: "5/10", rarity: "Low", salesOG: "$5", salesTag: "$3", category: "Chairs" },
  { id: 70, name: "Shore", valueOG: "6", valueTag: "N/A", demand: "5/10", rarity: "Low", salesOG: "$5", salesTag: "N/A", category: "Chairs" },
  { id: 71, name: "Gingerbread", valueOG: "6", valueTag: "3", demand: "4/10", rarity: "Extreme", salesOG: "$4", salesTag: "$3", category: "Chairs" },
  { id: 72, name: "Christmas", valueOG: "5", valueTag: "N/A", demand: "3/10", rarity: "Extreme", salesOG: "$3", salesTag: "N/A", category: "Chairs" },
  { id: 73, name: "Lantern", valueOG: "4", valueTag: "N/A", demand: "3/10", rarity: "Extreme", salesOG: "$3", salesTag: "N/A", category: "Chairs" },
  { id: 74, name: "Pumpkin", valueOG: "4", valueTag: "N/A", demand: "3/10", rarity: "Extreme", salesOG: "$3", salesTag: "N/A", category: "Chairs" },
  { id: 75, name: "Cat", valueOG: "3", valueTag: "N/A", demand: "4/10", rarity: "Low", salesOG: "$1", salesTag: "N/A", category: "Chairs" },

  // Accessories
  { id: 76, name: "RGB Antlers", valueOG: "N/A", valueTag: "N/A", demand: "idk lol", rarity: "Extreme", salesOG: "N/A", salesTag: "N/A", category: "Accessories" },
  { id: 77, name: "RGB Wings", valueOG: "11", valueTag: "N/A", demand: "6/10", rarity: "Low", salesOG: "$8", salesTag: "N/A", category: "Accessories" },
  { id: 78, name: "8-BIT", valueOG: "6", valueTag: "3", demand: "6/10", rarity: "Mid", salesOG: "$5", salesTag: "$3", category: "Accessories" },
  { id: 79, name: "Mono Wings", valueOG: "5", valueTag: "3", demand: "5/10", rarity: "Low", salesOG: "$5", salesTag: "$3", category: "Accessories" },
  { id: 80, name: "Bat Guard", valueOG: "2.5", valueTag: "N/A", demand: "4/10", rarity: "Low", salesOG: "$2", salesTag: "N/A", category: "Accessories" },
  { id: 81, name: "Festive Wings", valueOG: "2", valueTag: "N/A", demand: "5/10", rarity: "Low", salesOG: "$2", salesTag: "N/A", category: "Accessories" },
  { id: 82, name: "Animated Wings", valueOG: "1", valueTag: "N/A", demand: "4/10", rarity: "Low", salesOG: "$1", salesTag: "N/A", category: "Accessories" },
  { id: 83, name: "Neon Wings", valueOG: "1", valueTag: "N/A", demand: "4/10", rarity: "Low", salesOG: "$1", salesTag: "N/A", category: "Accessories" },

  // Animations
  { id: 84, name: "Levitating", valueOG: "120", valueTag: "N/A", demand: "7/10", rarity: "High", salesOG: "$75", salesTag: "N/A", category: "Animations" },
  { id: 85, name: "Slouch 2", valueOG: "1", valueTag: "N/A", demand: "5/10", rarity: "Low", salesOG: "$1", salesTag: "N/A", category: "Animations" },
  { id: 86, name: "Rebel", valueOG: "0.5", valueTag: "N/A", demand: "4/10", rarity: "Low", salesOG: "$0.5", salesTag: "N/A", category: "Animations" },

  // Effects
  { id: 87, name: "Display", valueOG: "38", valueTag: "N/A", demand: "6/10", rarity: "Mid", salesOG: "$26", salesTag: "N/A", category: "Effects" },
  { id: 88, name: "Snowfall", valueOG: "6", valueTag: "3", demand: "7/10", rarity: "Mid", salesOG: "$4", salesTag: "$2", category: "Effects" },
];

interface TradeItem {
  item: Item;
  quantity: number;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'Low': return 'from-gray-400 to-gray-600';
    case 'Mid': return 'from-blue-400 to-blue-600';
    case 'High': return 'from-purple-400 to-purple-600';
    case 'Extreme': return 'from-yellow-400 to-orange-500';
    default: return 'from-gray-400 to-gray-600';
  }
};

const getRarityIcon = (rarity: string) => {
  switch (rarity) {
    case 'Low': return <Star className="h-4 w-4" />;
    case 'Mid': return <Gem className="h-4 w-4" />;
    case 'High': return <Crown className="h-4 w-4" />;
    case 'Extreme': return <Sparkles className="h-4 w-4" />;
    default: return <Star className="h-4 w-4" />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Guns': return '🔫';
    case 'Knives': return '🗡️';
    case 'Chairs': return '🪑';
    case 'Accessories': return '👑';
    case 'Animations': return '🎭';
    case 'Effects': return '✨';
    default: return '📦';
  }
};

const getDemandTrend = (demand: string) => {
  if (demand === 'idk lol') return <BarChart3 className="h-4 w-4 text-gray-500" />;
  const rating = parseInt(demand.split('/')[0]);
  if (rating >= 8) return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (rating >= 6) return <BarChart3 className="h-4 w-4 text-yellow-500" />;
  return <TrendingDown className="h-4 w-4 text-red-500" />;
};

const getItemValue = (item: Item, useTag: boolean = false): number => {
  const value = useTag && item.valueTag !== 'N/A' ? item.valueTag : item.valueOG;
  if (value === 'N/A') return 0;
  
  // Handle ranges like "260-360" or "4-5"
  if (value.includes('-')) {
    const [min, max] = value.split('-').map(v => parseFloat(v.replace(/[^0-9.]/g, '')));
    return (min + max) / 2;
  }
  
  // Handle values like "24/16"
  if (value.includes('/')) {
    const [first] = value.split('/').map(v => parseFloat(v.replace(/[^0-9.]/g, '')));
    return first;
  }
  
  return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
};

const getDemandScore = (demand: string): number => {
  if (demand === 'idk lol') return 5;
  return parseInt(demand.split('/')[0]) || 0;
};

const calculateTradeResult = (side1: TradeItem[], side2: TradeItem[]) => {
  const calculateSideValue = (side: TradeItem[]) => {
    return side.reduce((total, tradeItem) => {
      const ogValue = getItemValue(tradeItem.item, false);
      const tagValue = getItemValue(tradeItem.item, true);
      const bestValue = Math.max(ogValue, tagValue);
      return total + (bestValue * tradeItem.quantity);
    }, 0);
  };

  const calculateSideDemand = (side: TradeItem[]) => {
    let totalDemand = 0;
    let totalItems = 0;
    
    side.forEach(tradeItem => {
      const demandScore = getDemandScore(tradeItem.item.demand);
      totalDemand += demandScore * tradeItem.quantity;
      totalItems += tradeItem.quantity;
    });
    
    return totalItems > 0 ? totalDemand / totalItems : 0;
  };

  const side1Value = calculateSideValue(side1);
  const side2Value = calculateSideValue(side2);
  const side1Demand = calculateSideDemand(side1);
  const side2Demand = calculateSideDemand(side2);

  const valueDiff = side1Value - side2Value;
  const demandDiff = side1Demand - side2Demand;
  
  let valueResult = 'Fair';
  let demandResult = 'Fair';
  let overallResult = 'Fair';

  // Value assessment
  if (Math.abs(valueDiff) <= side1Value * 0.1) {
    valueResult = 'Fair';
  } else if (valueDiff > 0) {
    valueResult = 'Win';
  } else {
    valueResult = 'Lose';
  }

  // Demand assessment
  if (Math.abs(demandDiff) <= 0.5) {
    demandResult = 'Fair';
  } else if (demandDiff > 0) {
    demandResult = 'Win';
  } else {
    demandResult = 'Lose';
  }

  // Overall assessment
  if (valueResult === 'Win' && demandResult !== 'Lose') {
    overallResult = 'Win';
  } else if (valueResult === 'Lose' && demandResult !== 'Win') {
    overallResult = 'Lose';
  } else if (valueResult === 'Win' && demandResult === 'Lose') {
    overallResult = side1Demand >= 6 ? 'Win' : 'Fair';
  } else {
    overallResult = 'Fair';
  }

  return {
    side1Value,
    side2Value,
    side1Demand,
    side2Demand,
    valueResult,
    demandResult,
    overallResult
  };
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeTab, setActiveTab] = useState('items');
  const [darkMode, setDarkMode] = useState(true);
  
  // Trade calculator state
  const [side1Items, setSide1Items] = useState<TradeItem[]>([]);
  const [side2Items, setSide2Items] = useState<TradeItem[]>([]);
  const [selectedItemForTrade, setSelectedItemForTrade] = useState<Item | null>(null);

  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))];
  const rarities = ['All', 'Low', 'Mid', 'High', 'Extreme'];

  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesRarity = selectedRarity === 'All' || item.rarity === selectedRarity;
      return matchesSearch && matchesCategory && matchesRarity;
    });

    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'value':
          // Special handling for Corrupt and Vampire (serial-only items)
          aValue = getItemValue(a, a.valueOG === 'N/A');
          bValue = getItemValue(b, b.valueOG === 'N/A');
          break;
        case 'demand':
          aValue = getDemandScore(a.demand);
          bValue = getDemandScore(b.demand);
          break;
        case 'rarity':
          const rarityOrder = { 'Low': 1, 'Mid': 2, 'High': 3, 'Extreme': 4 };
          aValue = rarityOrder[a.rarity];
          bValue = rarityOrder[b.rarity];
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [searchTerm, selectedCategory, selectedRarity, sortBy, sortOrder]);

  const addToTrade = (item: Item, side: 1 | 2) => {
    const targetSide = side === 1 ? side1Items : side2Items;
    const setTargetSide = side === 1 ? setSide1Items : setSide2Items;
    
    const existingItem = targetSide.find(ti => ti.item.id === item.id);
    if (existingItem) {
      setTargetSide(targetSide.map(ti => 
        ti.item.id === item.id ? { ...ti, quantity: ti.quantity + 1 } : ti
      ));
    } else {
      setTargetSide([...targetSide, { item, quantity: 1 }]);
    }
  };

  const removeFromTrade = (itemId: number, side: 1 | 2) => {
    const targetSide = side === 1 ? side1Items : side2Items;
    const setTargetSide = side === 1 ? setSide1Items : setSide2Items;
    
    setTargetSide(targetSide.filter(ti => ti.item.id !== itemId));
  };

  const updateQuantity = (itemId: number, side: 1 | 2, quantity: number) => {
    if (quantity <= 0) {
      removeFromTrade(itemId, side);
      return;
    }
    
    const targetSide = side === 1 ? side1Items : side2Items;
    const setTargetSide = side === 1 ? setSide1Items : setSide2Items;
    
    setTargetSide(targetSide.map(ti => 
      ti.item.id === itemId ? { ...ti, quantity } : ti
    ));
  };

  const tradeResult = useMemo(() => {
    if (side1Items.length === 0 || side2Items.length === 0) return null;
    return calculateTradeResult(side1Items, side2Items);
  }, [side1Items, side2Items]);

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Win': return 'text-green-400';
      case 'Fair': return 'text-yellow-400';
      case 'Lose': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const themeClasses = darkMode 
    ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50';

  const cardClasses = darkMode
    ? 'bg-black/20 backdrop-blur-xl border-white/10 text-white'
    : 'bg-white/80 backdrop-blur-xl border-gray-200 text-gray-900';

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-500`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 ${darkMode ? 'bg-blue-500' : 'bg-blue-300'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${darkMode ? 'bg-green-500' : 'bg-green-300'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 ${darkMode ? 'bg-purple-500' : 'bg-purple-300'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000`}></div>
      </div>

      {/* Header */}
      <header className={`relative z-10 ${darkMode ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-xl border-b ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl animate-ping opacity-20"></div>
              </div>
              <div>
                <h1 className={`text-3xl font-bold bg-gradient-to-r ${darkMode ? 'from-white via-blue-200 to-green-200' : 'from-gray-800 via-blue-600 to-green-600'} bg-clip-text text-transparent`}>
                  Breaking Point 2 Values
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Made By: Jidayne</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl ${cardClasses} hover:scale-105 transition-all`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <div className="text-right">
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{items.length}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Items Listed</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r ${darkMode ? 'from-white via-blue-200 to-green-200' : 'from-gray-800 via-blue-600 to-green-600'} bg-clip-text text-transparent leading-tight`}>
            Welcome to Breaking Point 2 Values
          </h2>
          <div className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 space-y-2`}>
            <p><strong>Discord Server:</strong> <a href="https://discord.gg/Ne3NwU5Y" className=\"text-blue-400 hover:text-blue-300 transition-colors" target=\"_blank" rel="noopener noreferrer">https://discord.gg/Ne3NwU5Y</a></p>
            <p><strong>Last Update:</strong> 8/9/2025</p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className={`${cardClasses} rounded-2xl p-2`}>
          <div className="flex space-x-2">
            {[
              { id: 'items', label: 'Items', icon: <BarChart3 className="h-5 w-5" /> },
              { id: 'calculator', label: 'Trade Calculator', icon: <Calculator className="h-5 w-5" /> },
              { id: 'guide', label: 'Guide', icon: <BookOpen className="h-5 w-5" /> },
              { id: 'important', label: 'Important', icon: <AlertTriangle className="h-5 w-5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                    : `${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Tab */}
      {activeTab === 'items' && (
        <>
          {/* Filters */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className={`${cardClasses} rounded-2xl p-6`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'} h-5 w-5`} />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-4 py-3 ${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  {categories.map(category => (
                    <option key={category} value={category} className={darkMode ? 'bg-slate-800' : 'bg-white'}>
                      {category === 'All' ? 'All Categories' : `${getCategoryIcon(category)} ${category}`}
                    </option>
                  ))}
                </select>

                {/* Rarity Filter */}
                <select
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className={`px-4 py-3 ${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  {rarities.map(rarity => (
                    <option key={rarity} value={rarity} className={darkMode ? 'bg-slate-800' : 'bg-white'}>
                      {rarity === 'All' ? 'All Rarities' : rarity}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`flex-1 px-4 py-3 ${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  >
                    <option value="name" className={darkMode ? 'bg-slate-800' : 'bg-white'}>Name</option>
                    <option value="value" className={darkMode ? 'bg-slate-800' : 'bg-white'}>Value</option>
                    <option value="demand" className={darkMode ? 'bg-slate-800' : 'bg-white'}>Demand</option>
                    <option value="rarity" className={darkMode ? 'bg-slate-800' : 'bg-white'}>Rarity</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className={`px-4 py-3 ${darkMode ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'} border rounded-xl transition-all`}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Items Grid */}
          <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative ${cardClasses} rounded-2xl p-6 border hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Rarity Gradient Background */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getRarityColor(item.rarity)} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                        <div>
                          <h3 className={`text-lg font-bold ${darkMode ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'} transition-colors line-clamp-1`}>
                            {item.name}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${darkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-full`}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor(item.rarity)} text-white text-xs font-medium`}>
                        {getRarityIcon(item.rarity)}
                        <span>{item.rarity}</span>
                      </div>
                    </div>

                    {/* Values */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>OG Value:</span>
                        <span className="text-lg font-bold text-green-400">
                          {item.valueOG === 'N/A' ? 'N/A' : `${item.valueOG}`}
                        </span>
                      </div>
                      
                      {item.valueTag !== 'N/A' && (
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tag Value:</span>
                          <span className="text-lg font-bold text-blue-400">{item.valueTag}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sales (OG):</span>
                        <span className="text-sm font-semibold text-yellow-400">
                          {item.salesOG === 'N/A' ? 'N/A' : item.salesOG}
                        </span>
                      </div>

                      {item.salesTag !== 'N/A' && (
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sales (Tag):</span>
                          <span className="text-sm font-semibold text-yellow-400">{item.salesTag}</span>
                        </div>
                      )}
                    </div>

                    {/* Demand */}
                    <div className={`flex items-center justify-between pt-4 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
                      <div className="flex items-center space-x-2">
                        <Target className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Demand:</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getDemandTrend(item.demand)}
                        <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.demand}</span>
                      </div>
                    </div>

                    {/* Trade Calculator Buttons */}
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => addToTrade(item, 1)}
                        className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors"
                      >
                        + Side 1
                      </button>
                      <button
                        onClick={() => addToTrade(item, 2)}
                        className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition-colors"
                      >
                        + Side 2
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAndSortedItems.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No items found</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </main>
        </>
      )}

      {/* Trade Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Side 1 */}
            <div className={`${cardClasses} rounded-2xl p-6`}>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                Your Side
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {side1Items.map(tradeItem => (
                  <div key={tradeItem.item.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-white/5' : 'bg-gray-50'} rounded-lg`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getCategoryIcon(tradeItem.item.category)}</span>
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tradeItem.item.name}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Value: {getItemValue(tradeItem.item, tradeItem.item.valueOG === 'N/A')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(tradeItem.item.id, 1, tradeItem.quantity - 1)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className={`w-8 text-center font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tradeItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(tradeItem.item.id, 1, tradeItem.quantity + 1)}
                        className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {side1Items.length === 0 && (
                  <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Add items from the Items tab
                  </div>
                )}
              </div>
            </div>

            {/* Side 2 */}
            <div className={`${cardClasses} rounded-2xl p-6`}>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                Their Side
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {side2Items.map(tradeItem => (
                  <div key={tradeItem.item.id} className={`flex items-center justify-between p-3 ${darkMode ? 'bg-white/5' : 'bg-gray-50'} rounded-lg`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getCategoryIcon(tradeItem.item.category)}</span>
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tradeItem.item.name}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Value: {getItemValue(tradeItem.item, tradeItem.item.valueOG === 'N/A')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(tradeItem.item.id, 2, tradeItem.quantity - 1)}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className={`w-8 text-center font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tradeItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(tradeItem.item.id, 2, tradeItem.quantity + 1)}
                        className="w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {side2Items.length === 0 && (
                  <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Add items from the Items tab
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trade Result */}
          {tradeResult && (
            <div className={`${cardClasses} rounded-2xl p-6 mt-8`}>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 text-center`}>Trade Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Value</div>
                  <div className="space-y-2">
                    <div className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Your Side: {tradeResult.side1Value.toFixed(1)}
                    </div>
                    <div className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Their Side: {tradeResult.side2Value.toFixed(1)}
                    </div>
                    <div className={`text-xl font-bold ${getResultColor(tradeResult.valueResult)}`}>
                      {tradeResult.valueResult}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Demand</div>
                  <div className="space-y-2">
                    <div className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Your Side: {tradeResult.side1Demand.toFixed(1)}/10
                    </div>
                    <div className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Their Side: {tradeResult.side2Demand.toFixed(1)}/10
                    </div>
                    <div className={`text-xl font-bold ${getResultColor(tradeResult.demandResult)}`}>
                      {tradeResult.demandResult}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Overall</div>
                  <div className={`text-3xl font-bold ${getResultColor(tradeResult.overallResult)} mt-8`}>
                    {tradeResult.overallResult}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={() => setSide1Items([])}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Clear Your Side
                </button>
                <button
                  onClick={() => setSide2Items([])}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Clear Their Side
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Guide Tab */}
      {activeTab === 'guide' && (
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className={`${cardClasses} rounded-2xl p-8`}>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Guide</h3>
            <div className="space-y-4">
              {[
                "N/A stands for Not Available (not detected / doesn't exist).",
                "Tag/Serial RGB Eternal stands for Stocking version.",
                "Rarity is related to OG version of items.",
                "Tag = item with date ... OG = item with no date.",
                "Corrupt + Vampire exist only in Serials.",
                "Crafting OG items grants you a Tag Item.",
                "Prices follow up with demand + value.",
                "Item not mentioned in the value list = worthless / less than 1."
              ].map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Important Tab */}
      {activeTab === 'important' && (
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className={`${cardClasses} rounded-2xl p-8`}>
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Important Notice</h3>
            </div>
            
            <div className="space-y-6">
              <div className={`p-6 ${darkMode ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'} border rounded-xl`}>
                <h4 className={`text-xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-800'} mb-3`}>
                  Unofficial Values
                </h4>
                <p className={`${darkMode ? 'text-yellow-200' : 'text-yellow-700'} text-lg leading-relaxed`}>
                  The values displayed on this website are <strong>unofficial</strong> and should be considered as <strong>recommended guidelines</strong> only. 
                  These are not official game values and may vary based on market conditions and individual trading preferences.
                </p>
              </div>

              <div className={`p-4 ${darkMode ? 'bg-gray-500/10 border-gray-500/20' : 'bg-gray-50 border-gray-200'} border rounded-xl`}>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                  <strong>Note:</strong> The values were detected based on current demand (RAP - Recent Average Price) and market analysis. 
                  Always use your own judgment when making trades.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`relative z-10 ${darkMode ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-xl border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Breaking Point 2 Values • Made by Jidayne • {items.length} items tracked
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}

export default App;