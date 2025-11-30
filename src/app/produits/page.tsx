'use client';

import { useState, useMemo, useEffect } from 'react';
import { formatPrice, getDiscountPercentage, categories } from '@/lib/products';
import { getProducts } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OrderDialog } from '@/components/OrderDialog';
import type { Product } from '@/lib/products';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsOrderDialogOpen(true);
  };

  // Filtrage et recherche
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Navigation */}
      <nav className="bg-stone-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wider">
              GOLFA COUTURE
            </a>
            
            {/* Menu Desktop */}
            <div className="hidden md:flex gap-4 lg:gap-6 text-sm">
              <a href="/#nouveautes" className="hover:text-amber-400 transition">NOUVEAUTÉS</a>
              <a href="/produits" className="hover:text-amber-400 transition">PRODUITS</a>
              <a href="/#testimonials" className="hover:text-amber-400 transition">TÉMOIGNAGES</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Tous les produits avec filtre et recherche */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-2 sm:mb-3 md:mb-4">
              Tous Nos Produits
            </h1>
            <p className="text-stone-600 text-sm sm:text-base md:text-lg">
              Explorez notre collection complète
            </p>
          </div>

          {/* Filtres et Recherche */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-4">
            {/* Recherche */}
            <div className="w-full max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm sm:text-base"
              />
            </div>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`text-xs sm:text-sm ${selectedCategory === cat.value ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Résultats */}
          {loading ? (
            <div className="text-center py-8 sm:py-12 md:py-16">
              <p className="text-lg sm:text-xl text-stone-600">Chargement des produits...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8 sm:py-12 md:py-16">
              <p className="text-lg sm:text-xl text-stone-600 mb-4">Aucun produit trouvé</p>
              <Button
                className="text-sm sm:text-base"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-center">
                <p className="text-stone-600 text-sm">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <div className="relative w-full h-48 sm:h-64 md:h-80">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            product.images.length > 1 ? 'group-hover:opacity-0' : 'group-hover:scale-110'
                          }`}
                        />
                        {product.images.length > 1 && (
                          <img
                            src={product.images[1]}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                        {product.isNew && (
                          <Badge className="bg-green-600 text-white font-bold text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1">
                            NOUVEAU
                          </Badge>
                        )}
                        {product.oldPrice && (
                          <Badge className="bg-red-600 text-white font-bold text-xs sm:text-sm md:text-base px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1">
                            -{getDiscountPercentage(product.price, product.oldPrice)}%
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full">
                        <p className="text-[10px] sm:text-xs text-stone-600">
                          {new Date(product.publishedDate).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long'
                          })}
                        </p>
                      </div>
                      {product.images.length > 1 && (
                        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 bg-stone-900/80 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                          <p className="text-[10px] sm:text-xs text-white flex items-center gap-0.5 sm:gap-1">
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            +{product.images.length - 1}
                          </p>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4 sm:p-5 md:p-6">
                      <Badge variant="outline" className="mb-2 sm:mb-3 text-xs">
                        {product.category.toUpperCase()}
                      </Badge>
                      <h3 className="font-bold text-base sm:text-lg mb-2 text-stone-900">
                        {product.name}
                      </h3>
                      <p className="text-stone-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div>
                          <p className="text-xl sm:text-2xl font-bold text-stone-900">
                            {formatPrice(product.price)}
                          </p>
                          {product.oldPrice && (
                            <p className="text-xs sm:text-sm text-stone-400 line-through">
                              {formatPrice(product.oldPrice)}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-stone-900 hover:bg-amber-600 transition-colors text-xs sm:text-sm md:text-base py-2 sm:py-2.5"
                        onClick={() => handleOrder(product)}
                      >
                        Commander
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">GOLFA COUTURE</h3>
          <p className="text-stone-400 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base">
            Votre boutique de tissus et vêtements pour homme de qualité
          </p>
          <p className="text-stone-500 text-xs sm:text-sm">
            © 2025 GOLFA COUTURE. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* Order Dialog */}
      {selectedProduct && (
        <OrderDialog
          product={selectedProduct}
          open={isOrderDialogOpen}
          onOpenChange={setIsOrderDialogOpen}
        />
      )}
    </div>
  );
}

