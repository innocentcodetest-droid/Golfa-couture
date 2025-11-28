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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wider">GOLFA COUTURE</h1>
            
            {/* Menu Desktop */}
            <div className="hidden md:flex gap-4 lg:gap-6 text-sm">
              <a href="#nouveautes" className="hover:text-amber-400 transition">NOUVEAUTÉS</a>
              <a href="#produits" className="hover:text-amber-400 transition">PRODUITS</a>
              <a href="#testimonials" className="hover:text-amber-400 transition">TÉMOIGNAGES</a>
            </div>

            {/* Bouton Menu Mobile */}
            <button
              className="md:hidden p-2 hover:bg-stone-800 rounded transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menu Mobile */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-stone-700 pt-4">
              <div className="flex flex-col gap-4">
                <a 
                  href="#nouveautes" 
                  className="hover:text-amber-400 transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  NOUVEAUTÉS
                </a>
                <a 
                  href="#produits" 
                  className="hover:text-amber-400 transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  PRODUITS
                </a>
                <a 
                  href="#testimonials" 
                  className="hover:text-amber-400 transition py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  TÉMOIGNAGES
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/img/golfaBanner.jpeg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 to-stone-900/50" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              BIENVENUE<br />
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 leading-tight">
              Commandez vos tissus et vêtements sur mesure
            </h3>
           
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-stone-200">
              Chez Golfa Couture, nous vous offrons des tissus et vêtements de qualité supérieure, sur mesure pour homme.
            </p>
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6"
              onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Découvrir la Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Nouveautés Section */}
      {newProducts.length > 0 && (
        <section id="nouveautes" className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-amber-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">NOUVEAUTÉS</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-2 sm:mb-3 md:mb-4">Derniers Arrivages</h2>
              <p className="text-stone-600 text-sm sm:text-base md:text-lg">Découvrez nos produits fraîchement ajoutés</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {newProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-amber-600"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 sm:h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                      <Badge className="bg-green-600 text-white font-bold text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1">NOUVEAU</Badge>
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
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-stone-900">{product.name}</h3>
                    <p className="text-stone-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-stone-900">{formatPrice(product.price)}</p>
                        {product.oldPrice && (
                          <p className="text-xs sm:text-sm text-stone-400 line-through">{formatPrice(product.oldPrice)}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      className="w-full bg-stone-900 hover:bg-amber-600 transition-colors text-xs sm:text-sm md:text-base py-2 sm:py-2.5"
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
      <section id="produits" className="py-8 sm:py-12 md:py-16 bg-stone-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-2 sm:mb-3 md:mb-4">Tous Nos Produits</h2>
            <p className="text-stone-600 text-sm sm:text-base md:text-lg">Explorez notre collection complète</p>
          </div>

          {/* Filtres et Recherche */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-4">
            {/* Recherche */}
            <div className="w-full">
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm sm:text-base"
              />
            </div>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
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
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 sm:py-12 md:py-16">
              <p className="text-lg sm:text-xl text-stone-600">Aucun produit trouvé</p>
              <Button
                className="mt-4 text-sm sm:text-base"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 sm:h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                      {product.isNew && (
                        <Badge className="bg-green-600 text-white font-bold text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 sm:py-1">NOUVEAU</Badge>
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
                    <Badge variant="outline" className="mb-2 sm:mb-3 text-xs">{product.category.toUpperCase()}</Badge>
                    <h3 className="font-bold text-base sm:text-lg mb-2 text-stone-900">{product.name}</h3>
                    <p className="text-stone-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-stone-900">{formatPrice(product.price)}</p>
                        {product.oldPrice && (
                          <p className="text-xs sm:text-sm text-stone-400 line-through">{formatPrice(product.oldPrice)}</p>
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
          )}
        </div>
      </section>

      {/* Section Témoignages */}
      <section id="testimonials" className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <Badge className="mb-3 md:mb-4 bg-amber-600 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">TÉMOIGNAGES</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-2 sm:mb-3 md:mb-4">Ce Que Disent Nos Clients</h2>
            <p className="text-stone-600 text-sm sm:text-base md:text-lg">Des milliers de clients satisfaits nous font confiance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-base sm:text-lg">{testimonial.name}</h3>
                      <p className="text-xs sm:text-sm text-stone-600">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-2 sm:mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-stone-700 mb-2 sm:mb-3 italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <p className="text-xs text-stone-500">{testimonial.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
