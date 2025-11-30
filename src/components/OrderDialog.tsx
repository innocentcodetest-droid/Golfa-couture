'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/products';
import type { Product } from '@/lib/products';

interface OrderDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDialog({ product, open, onOpenChange }: OrderDialogProps) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: ''
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent, method: 'whatsapp' | 'email') => {
    e.preventDefault();

    const message = `
Nouvelle Commande - GOLFA COUTURE

Produit reference: ${product.name}
Prix: ${formatPrice(product.price)}
Catégorie: ${product.category}

Informations du client:
Nom: ${formData.nom}
Prénom: ${formData.prenom}
Téléphone: ${formData.telephone}

Description: ${product.description}
    `.trim();

    if (method === 'whatsapp') {
      // Remplacez ce numéro par le vôtre
      const phoneNumber = '22376376746'; // Format international sans + ni espaces
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    } else {
      // Remplacez cette adresse par la vôtre
      const email = 'dktseydou@gmail.com';
      const subject = encodeURIComponent(`Commande: ${product.name}`);
      const body = encodeURIComponent(message);
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    }

    // Réinitialiser le formulaire et fermer le dialogue
    setFormData({ nom: '', prenom: '', telephone: '' });
    setCurrentImageIndex(0);
    onOpenChange(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:w-full sm:max-w-[600px] max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Commander ce produit</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Remplissez vos informations pour passer commande
          </DialogDescription>
        </DialogHeader>

        {/* Galerie d'images */}
        <div className="my-4 sm:my-6 border-l-4 border-amber-600 pl-3 sm:pl-4 bg-stone-50 p-3 sm:p-4 rounded">
          <div className="relative">
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
            />

            {/* Boutons de navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-stone-900/80 hover:bg-stone-900 text-white rounded-full p-1.5 sm:p-2 transition-all"
                  aria-label="Image précédente"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-stone-900/80 hover:bg-stone-900 text-white rounded-full p-1.5 sm:p-2 transition-all"
                  aria-label="Image suivante"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Indicateurs de pagination */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-amber-600 w-6'
                          : 'bg-white/60 hover:bg-white'
                      }`}
                      aria-label={`Aller à l'image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Miniatures */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-md overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? 'border-amber-600 scale-105'
                      : 'border-stone-300 hover:border-amber-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniature ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-3 sm:mt-4">
            <h3 className="font-bold text-base sm:text-lg">{product.name}</h3>
            <p className="text-xl sm:text-2xl font-bold text-amber-600 mt-1 sm:mt-2">{formatPrice(product.price)}</p>
          </div>
        </div>

        <form className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nom" className="text-xs sm:text-sm font-medium">
              Nom <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nom"
              required
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder="Votre nom"
              className="border-stone-300 focus:border-amber-600 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prenom" className="text-xs sm:text-sm font-medium">
              Prénom <span className="text-red-500">*</span>
            </Label>
            <Input
              id="prenom"
              required
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              placeholder="Votre prénom"
              className="border-stone-300 focus:border-amber-600 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telephone" className="text-xs sm:text-sm font-medium">
              Numéro de téléphone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="telephone"
              required
              type="tel"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              placeholder="+221 77 456 78 90"
              className="border-stone-300 focus:border-amber-600 text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, 'whatsapp')}
              disabled={!formData.nom || !formData.prenom || !formData.telephone}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm sm:text-base py-2 sm:py-2.5"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </Button>

            <Button
              type="button"
              onClick={(e) => handleSubmit(e, 'email')}
              disabled={!formData.nom || !formData.prenom || !formData.telephone}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm sm:text-base py-2 sm:py-2.5"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </Button>
          </div>

          <p className="text-xs text-stone-500 text-center mt-3 sm:mt-4">
            En cliquant sur l'un des boutons, vos informations seront envoyées via le canal choisi
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
