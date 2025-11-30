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

// Produits par défaut (fallback si l'API ne répond pas)
const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Tissu Bazin Riche Premium",
    category: "tissu",
    price: 7500,
    oldPrice: 10500,
    images: [
      '/images/Image3.jpeg',
      '/images/Image2.jpeg',
      '/images/Image1.jpeg',
    ],
    isNew: true,
    publishedDate: "2025-11-25",
    description: "Bazin riche de qualité supérieure, parfait pour vos tenues traditionnelles"
  },
  {
    id: 2,
    name: "Tissu 3 Pièces Classique",
    category: "costume",
    price: 7500,
    oldPrice: 10500,
    images: [
      '/images/Image1.jpeg',
      '/images/Image2.jpeg',
      '/images/Image3.jpeg',
    ],
    isNew: true,
    publishedDate: "2025-11-24",
    description: "Tissu élégant en laine, coupe moderne"
  },
  {
    id: 3,
    name: "Tissu Oxford Bleu Marine",
    category: "chemise",
    price: 8500,
    images: [
      '/images/Image4.jpeg',
      '/images/Image5.jpeg',
      '/images/Image6.jpeg',
    ],
    isNew: false,
    publishedDate: "2025-11-20",
    description: "Tissu en coton oxford, coupe ajustée"
  },
  {
    id: 4,
    name: "Tissu Qualité Premium",
    category: "tissu",
    price: 9500,
    oldPrice: 35000,
    images: [
      '/images/Image7.jpeg',
      '/images/Image8.jpeg',
      '/images/Image9.jpeg',
    ],
    isNew: true,
    publishedDate: "2025-11-26",
    description: "Tissu de qualité supérieure, parfait pour les vêtements de qualité"
  },
  {
    id: 5,
    name: "Tissu Chino Beige",
    category: "tissu",
    price: 6500,
    images: [
      '/images/Image8.jpeg',
      '/images/Image7.jpeg',
      '/images/Image6.jpeg',
    ],
    isNew: false,
    publishedDate: "2025-11-18",
    description: "Tissu chino confortable, coupe droite"
  },
  {
    id: 6,
    name: "Tissu coton",
    category: "tissu",
    price: 18000,
    oldPrice: 28000,
    images: [
     '/images/Image3.jpeg',
    ],
    isNew: false,
    publishedDate: "2025-11-15",
    description: "Tissu coton de haute qualité"
  },
  {
    id: 7,
    name: "Tissu de Cérémonie",
    category: "tissu",
    price: 10000,
    images: [
      '/images/Image6.jpeg',
    ],
    isNew: true,
    publishedDate: "2025-11-27",
    description: "Chemise blanche parfaite pour les événements"
  },
  {
    id: 8,
    name: "Tissu bleu marine",
    category: "tissu",
    price: 6500,
    oldPrice: 10500,
    images: [
      '/images/Image5.jpeg',
    ],
    isNew: true,
    publishedDate: "2025-11-28",
    description: "Tissu bleu marine, coupe moderne"
  },
  {
    id: 9,
    name: "Tissu Blanc gris",
    category: "tissu",
    price: 6500,
    oldPrice: 75000,
    images: [
      '/images/Image4.jpeg',
      '/images/Image5.jpeg',
      '/images/Image6.jpeg',
    ],
    isNew: true,
    publishedDate: "2025-11-26",
    description: "Tissu blanc gris, coupe moderne"
  }
];

// Fonction pour charger les produits depuis l'API
// Pour les composants serveur, on peut utiliser directement le JSON
export async function getProductsFromAPI(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des produits');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);
    // Fallback vers les produits par défaut
    return defaultProducts;
  }
}

// Export pour compatibilité avec le code existant
// Les composants clients devront utiliser getProductsFromAPI() ou getProducts() de api.ts
export const products = defaultProducts;

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
