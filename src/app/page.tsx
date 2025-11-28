'use client';

import { useState, useMemo } from 'react';
import { products, formatPrice, getDiscountPercentage, categories } from '@/lib/products';
import { testimonials } from '@/lib/testimonials';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OrderDialog } from '@/components/OrderDialog';
import type { Product } from '@/lib/products';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [selectedCategory, searchQuery]);

  const newProducts = filteredProducts.filter(p => p.isNew);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Navigation */}
      <nav className="bg-stone-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-wider">GOLFA COUTURE</h1>
            <div className="flex gap-6 text-sm">
              <a href="#nouveautes" className="hover:text-amber-400 transition">NOUVEAUTÉS</a>
              <a href="#produits" className="hover:text-amber-400 transition">PRODUITS</a>
              <a href="#testimonials" className="hover:text-amber-400 transition">TÉMOIGNAGES</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1920&h=600&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 to-stone-900/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-6xl font-bold mb-6 leading-tight">
              Tissus & Vêtements<br />Pour Homme
            </h2>
            <p className="text-xl mb-8 text-stone-200">
              Découvrez nos nouvelles collections de tissus premium et vêtements sur mesure.
              Qualité exceptionnelle garantie.
            </p>
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-6"
              onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Découvrir la Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Nouveautés Section */}
      {newProducts.length > 0 && (
        <section id="nouveautes" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-600 text-white text-sm px-4 py-2">NOUVEAUTÉS</Badge>
              <h2 className="text-4xl font-bold text-stone-900 mb-4">Derniers Arrivages</h2>
              <p className="text-stone-600 text-lg">Découvrez nos produits fraîchement ajoutés</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-amber-600"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-green-600 text-white font-bold">NOUVEAU</Badge>
                      {product.oldPrice && (
                        <Badge className="bg-red-600 text-white font-bold text-base px-3 py-1">
                          -{getDiscountPercentage(product.price, product.oldPrice)}%
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <p className="text-xs text-stone-600">
                        {new Date(product.publishedDate).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                    {product.images.length > 1 && (
                      <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
                        <p className="text-xs text-white flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          +{product.images.length - 1}
                        </p>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-stone-900">{product.name}</h3>
                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-stone-900">{formatPrice(product.price)}</p>
                        {product.oldPrice && (
                          <p className="text-sm text-stone-400 line-through">{formatPrice(product.oldPrice)}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      className="w-full bg-stone-900 hover:bg-amber-600 transition-colors"
                      onClick={() => handleOrder(product)}
                    >
                      Commander Maintenant
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tous les produits avec filtre et recherche */}
      <section id="produits" className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Tous Nos Produits</h2>
            <p className="text-stone-600 text-lg">Explorez notre collection complète</p>
          </div>

          {/* Filtres et Recherche */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            <div className="w-full md:w-96">
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={selectedCategory === cat.value ? 'bg-amber-600 hover:bg-amber-700' : ''}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Résultats */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-stone-600">Aucun produit trouvé</p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="bg-green-600 text-white font-bold">NOUVEAU</Badge>
                      )}
                      {product.oldPrice && (
                        <Badge className="bg-red-600 text-white font-bold text-base px-3 py-1">
                          -{getDiscountPercentage(product.price, product.oldPrice)}%
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <p className="text-xs text-stone-600">
                        {new Date(product.publishedDate).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                    {product.images.length > 1 && (
                      <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
                        <p className="text-xs text-white flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          +{product.images.length - 1}
                        </p>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3 text-xs">{product.category.toUpperCase()}</Badge>
                    <h3 className="font-bold text-lg mb-2 text-stone-900">{product.name}</h3>
                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-stone-900">{formatPrice(product.price)}</p>
                        {product.oldPrice && (
                          <p className="text-sm text-stone-400 line-through">{formatPrice(product.oldPrice)}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      className="w-full bg-stone-900 hover:bg-amber-600 transition-colors"
                      onClick={() => handleOrder(product)}
                    >
                      Commander
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section Témoignages */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-600 text-white text-sm px-4 py-2">TÉMOIGNAGES</Badge>
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Ce Que Disent Nos Clients</h2>
            <p className="text-stone-600 text-lg">Des milliers de clients satisfaits nous font confiance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-stone-600">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-stone-700 mb-3 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <p className="text-xs text-stone-500">{testimonial.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">GOLFA COUTURE</h3>
          <p className="text-stone-400 mb-6">
            Votre boutique de tissus et vêtements pour homme de qualité
          </p>
          <p className="text-stone-500 text-sm">
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
