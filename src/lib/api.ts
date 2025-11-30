import type { Product } from './products';

const API_BASE = '/api/products';

// API pour obtenir tous les produits
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des produits');
  }
  return response.json();
}

// API pour obtenir un produit par ID
export async function getProductById(id: number): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

// API pour créer un nouveau produit
export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de la création du produit');
  }
  
  return response.json();
}

// API pour mettre à jour un produit
export async function updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
  const response = await fetch(API_BASE, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...updates }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de la mise à jour du produit');
  }
  
  return response.json();
}

// API pour supprimer un produit
export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}?id=${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de la suppression du produit');
  }
}

