export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  readyTime?: string;
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 'mixed-baklawa',
    name: 'Mixed Baklawa',
    description: 'Assorted baklawa with pistachios, walnuts, and almonds.',
    price: 18,
    available: true,
    image: '/api/placeholder/300/200'
  },
  {
    id: 'maamoul-dates',
    name: 'Maamoul with Dates',
    description: 'Traditional date-filled semolina cookies.',
    price: 22,
    available: false,
    readyTime: 'Ready Tomorrow by 2 PM',
    image: '/api/placeholder/300/200'
  },
  {
    id: 'knafeh-nabulsieh',
    name: 'Knafeh Nabulsieh',
    description: 'Classic cheese knafeh with crispy shredded phyllo.',
    price: 16,
    available: false,
    readyTime: 'Ready Tomorrow by 2 PM',
    image: '/api/placeholder/300/200'
  },
  {
    id: 'rose-muhallabia',
    name: 'Rose Muhallabia',
    description: 'Creamy milk pudding infused with rose water.',
    price: 8,
    available: true,
    image: '/api/placeholder/300/200'
  },
  {
    id: 'halawet-el-jibn',
    name: 'Halawet El Jibn',
    description: 'Sweet cheese rolls with ashta cream.',
    price: 14,
    available: true,
    image: '/api/placeholder/300/200'
  },
  {
    id: 'osmalieh',
    name: 'Osmalieh',
    description: 'Crispy phyllo layers with cream and pistachios.',
    price: 12,
    available: true,
    image: '/api/placeholder/300/200'
  },
  {
    id: 'pistachio-baklawa',
    name: 'Pistachio Baklawa',
    description: 'Premium baklawa filled with finest Aleppo pistachios.',
    price: 25,
    available: true,
    image: '/api/placeholder/300/200'
  },
  {
    id: 'walnut-maamoul',
    name: 'Walnut Maamoul',
    description: 'Buttery semolina cookies filled with spiced walnuts.',
    price: 20,
    available: false,
    readyTime: 'Ready Tomorrow by 2 PM',
    image: '/api/placeholder/300/200'
  },
  {
    id: 'aish-el-saraya',
    name: 'Aish El Saraya',
    description: 'Palace bread with cream and candied orange blossom.',
    price: 15,
    available: true,
    image: '/api/placeholder/300/200'
  }
];
