export interface Product {
  id: number;
  name: string;
  category: 'tissu' | 'chemise' | 'pantalon' | 'costume' | 'accessoire';
  price: number;
  oldPrice?: number;
  images: string[]; // Changé de image à images (tableau)
  isNew: boolean;
  publishedDate: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Tissu Bazin Riche Premium",
    category: "tissu",
    price: 45000,
    oldPrice: 65000,
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea3c8564?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=600&fit=crop"
    ],
    isNew: true,
    publishedDate: "2025-11-25",
    description: "Bazin riche de qualité supérieure, parfait pour vos tenues traditionnelles"
  },
  {
    id: 2,
    name: "Costume 3 Pièces Classique",
    category: "costume",
    price: 125000,
    oldPrice: 175000,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&h=600&fit=crop"
    ],
    isNew: true,
    publishedDate: "2025-11-24",
    description: "Costume élégant en laine, coupe moderne"
  },
  {
    id: 3,
    name: "Chemise Oxford Bleu Marine",
    category: "chemise",
    price: 35000,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop"
    ],
    isNew: false,
    publishedDate: "2025-11-20",
    description: "Chemise en coton oxford, coupe ajustée"
  },
  {
    id: 4,
    name: "Tissu Wax Africain",
    category: "tissu",
    price: 25000,
    oldPrice: 35000,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558769132-cb1aea3c8564?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop"
    ],
    isNew: true,
    publishedDate: "2025-11-26",
    description: "Wax authentique, motifs traditionnels africains"
  },
  {
    id: 5,
    name: "Pantalon Chino Beige",
    category: "pantalon",
    price: 42000,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=600&fit=crop"
    ],
    isNew: false,
    publishedDate: "2025-11-18",
    description: "Pantalon chino confortable, coupe droite"
  },
  {
    id: 6,
    name: "Tissu Coton Premium",
    category: "tissu",
    price: 18000,
    oldPrice: 28000,
    images: [
      "https://images.unsplash.com/photo-1604052511689-bde456fb2874?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558769132-cb1aea3c8564?w=500&h=600&fit=crop"
    ],
    isNew: false,
    publishedDate: "2025-11-15",
    description: "Coton de haute qualité pour chemises et pantalons"
  },
  {
    id: 7,
    name: "Chemise Blanche Cérémonie",
    category: "chemise",
    price: 38000,
    images: [
      "https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=500&h=600&fit=crop"
    ],
    isNew: true,
    publishedDate: "2025-11-27",
    description: "Chemise blanche parfaite pour les événements"
  },
  {
    id: 8,
    name: "Costume Noir Slim Fit",
    category: "costume",
    price: 150000,
    oldPrice: 220000,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&h=600&fit=crop"
    ],
    isNew: true,
    publishedDate: "2025-11-28",
    description: "Costume noir élégant, coupe slim moderne"
  },
  {
    id: 9,
    name: "Tissu Soie Mélangée",
    category: "tissu",
    price: 55000,
    oldPrice: 75000,
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558769132-cb1aea3c8564?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604052511689-bde456fb2874?w=500&h=600&fit=crop"
    ],
    isNew: true,
    publishedDate: "2025-11-26",
    description: "Tissu soie mélangée luxueux, tombé parfait"
  }
];

export function getDiscountPercentage(price: number, oldPrice?: number): number {
  if (!oldPrice) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(price) + ' FCFA';
}

export const categories = [
  { value: 'all', label: 'Tous les produits' },
  { value: 'tissu', label: 'Tissus' },
  { value: 'chemise', label: 'Chemises' },
  { value: 'pantalon', label: 'Pantalons' },
  { value: 'costume', label: 'Costumes' },
  { value: 'accessoire', label: 'Accessoires' },
] as const;
