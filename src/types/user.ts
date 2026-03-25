export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  level: number;
  xp: number;
  maxXp: number;
  avatar: AvatarConfig;
  createdAt: Date;
  lastLogin: Date;
}

export interface AvatarConfig {
  base: number;
  accessories: {
    hat?: string;
    glasses?: string;
    clothing?: string;
    hairstyle?: string;
  };
  colors: {
    skin: string;
    hair: string;
  };
}

export interface AccessoryItem {
  id: string;
  name: string;
  type: 'hat' | 'clothing' | 'hairstyle';
  icon: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  cost: number;
}

export const DEFAULT_AVATAR: AvatarConfig = {
  base: 0,
  accessories: {},
  colors: {
    skin: '#ffdbac',
    hair: '#8B4513'
  }
};

export const ACCESSORY_ITEMS: AccessoryItem[] = [
  {
    id: 'baseball_cap',
    name: 'Gorro',
    type: 'hat',
    icon: '🧢',
    image: '🧢',
    rarity: 'common',
    cost: 50
  },
  {
    id: 'crown',
    name: 'Corona Dorada',
    type: 'hat',
    icon: '👑',
    image: '👑',
    rarity: 'legendary',
    cost: 500
  },
  {
    id: 'beanie',
    name: 'Gorro de Lana',
    type: 'hat',
    icon: '🎩',
    image: '🎩',
    rarity: 'rare',
    cost: 150
  },
  {
    id: 'hoodie_red',
    name: 'Buzo Rojo',
    type: 'clothing',
    icon: '🧥',
    image: '🧥',
    rarity: 'common',
    cost: 75
  },
  {
    id: 'tuxedo',
    name: 'Esmoquin',
    type: 'clothing',
    icon: '🤵',
    image: '🤵',
    rarity: 'epic',
    cost: 300
  },
  {
    id: 'superhero_suit',
    name: 'Traje de Superhéroe',
    type: 'clothing',
    icon: '🦸',
    image: '🦸',
    rarity: 'legendary',
    cost: 750
  },
  {
    id: 'taper_fade',
    name: 'Taper Fade',
    type: 'hairstyle',
    icon: '💇',
    image: '💇',
    rarity: 'rare',
    cost: 200
  },
  {
    id: 'rainbow_hair',
    name: 'Peinado Arcoíris',
    type: 'hairstyle',
    icon: '🌈',
    image: '🌈',
    rarity: 'epic',
    cost: 400
  }
];