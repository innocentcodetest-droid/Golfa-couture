import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Product } from '@/lib/products';

const PRODUCTS_FILE = path.join(process.cwd(), 'public', 'data', 'products.json');

// Lire les produits depuis le fichier JSON
async function readProducts(): Promise<Product[]> {
  try {
    const fileContents = await fs.readFile(PRODUCTS_FILE, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Erreur lors de la lecture des produits:', error);
    return [];
  }
}

// Écrire les produits dans le fichier JSON
async function writeProducts(products: Product[]): Promise<void> {
  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (error) {
    console.error('Erreur lors de l\'écriture des produits:', error);
    throw error;
  }
}

// GET - Récupérer tous les produits
export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des produits' },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau produit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const products = await readProducts();
    
    // Générer un nouvel ID
    const newId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) + 1 
      : 1;
    
    const newProduct: Product = {
      ...body,
      id: newId,
    };
    
    const updatedProducts = [...products, newProduct];
    await writeProducts(updatedProducts);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un produit
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID du produit requis' },
        { status: 400 }
      );
    }
    
    const products = await readProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: `Produit avec l'ID ${id} introuvable` },
        { status: 404 }
      );
    }
    
    const updatedProduct: Product = {
      ...products[index],
      ...updates,
      id, // S'assurer que l'ID ne change pas
    };
    
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    await writeProducts(updatedProducts);
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du produit' },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un produit
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID du produit requis' },
        { status: 400 }
      );
    }
    
    const products = await readProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length === products.length) {
      return NextResponse.json(
        { error: `Produit avec l'ID ${id} introuvable` },
        { status: 404 }
      );
    }
    
    await writeProducts(filteredProducts);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    );
  }
}

