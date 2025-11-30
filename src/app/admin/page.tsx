'use client';

import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/lib/api';
import type { Product } from '@/lib/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/products';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'tissu' as Product['category'],
    price: '',
    oldPrice: '',
    description: '',
    images: '',
    isNew: false,
    publishedDate: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const categories: { value: Product['category']; label: string }[] = [
    { value: 'tissu', label: 'Tissu' },
    { value: 'chemise', label: 'Chemise' },
    { value: 'pantalon', label: 'Pantalon' },
    { value: 'costume', label: 'Costume' },
    { value: 'accessoire', label: 'Accessoire' },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const imagesArray = formData.images
        .split(',')
        .map(img => img.trim())
        .filter(img => img.length > 0);

      if (imagesArray.length === 0) {
        setError('Au moins une image est requise');
        return;
      }

      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
        description: formData.description,
        images: imagesArray,
        isNew: formData.isNew,
        publishedDate: formData.publishedDate,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        setSuccess('Produit mis à jour avec succès');
      } else {
        await createProduct(productData);
        setSuccess('Produit créé avec succès');
      }

      resetForm();
      await loadProducts();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'enregistrement du produit');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      oldPrice: product.oldPrice?.toString() || '',
      description: product.description,
      images: product.images.join(', '),
      isNew: product.isNew,
      publishedDate: product.publishedDate,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      await deleteProduct(id);
      setSuccess('Produit supprimé avec succès');
      await loadProducts();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression du produit');
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'tissu',
      price: '',
      oldPrice: '',
      description: '',
      images: '',
      isNew: false,
      publishedDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">
                Administration - GOLFA COUTURE
              </h1>
              <p className="text-stone-600">Gérez vos produits</p>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Retour à l'accueil
            </Button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Formulaire */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as Product['category'] })
                    }
                    className="flex h-10 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="price">Prix (FCFA) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="oldPrice">Ancien prix (FCFA) - optionnel</Label>
                  <Input
                    id="oldPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="publishedDate">Date de publication *</Label>
                  <Input
                    id="publishedDate"
                    type="date"
                    value={formData.publishedDate}
                    onChange={(e) =>
                      setFormData({ ...formData, publishedDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-600"
                  />
                  <Label htmlFor="isNew" className="cursor-pointer">
                    Nouveau produit
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="flex w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <Label htmlFor="images">
                  Images (chemins séparés par des virgules) *
                </Label>
                <Input
                  id="images"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="/images/Image1.jpeg, /images/Image2.jpeg"
                  required
                />
                <p className="text-xs text-stone-500 mt-1">
                  Exemple: /images/Image1.jpeg, /images/Image2.jpeg
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                  {editingProduct ? 'Mettre à jour' : 'Créer le produit'}
                </Button>
                {editingProduct && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Annuler
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Liste des produits */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des produits ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-stone-600">Chargement...</p>
            ) : products.length === 0 ? (
              <p className="text-center py-8 text-stone-600">Aucun produit</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        {product.isNew && (
                          <Badge className="bg-green-600 text-white">NOUVEAU</Badge>
                        )}
                        <Badge variant="outline">{product.category.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                      <p className="text-sm text-stone-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-xl font-bold mb-4">{formatPrice(product.price)}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                          className="flex-1"
                        >
                          Modifier
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="flex-1"
                        >
                          Supprimer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

