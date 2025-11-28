# Guide d'Utilisation - GOLFA COUTURE

## 📱 Comment fonctionne le système de commande

### Étape 1: Le client visite le site
- Il voit les nouveaux articles avec le badge **NOUVEAU** vert
- Les réductions sont affichées en rouge (ex: **-31%**)
- Les dates de publication sont visibles (ex: "25 novembre")

### Étape 2: Le client clique sur "Commander"
Une fenêtre s'ouvre avec:
- L'image et le prix du produit
- Un formulaire avec 3 champs:
  * Nom (obligatoire)
  * Prénom (obligatoire)
  * Numéro de téléphone (obligatoire)
- Deux boutons: **WhatsApp** (vert) et **Email** (orange)

### Étape 3: Le client choisit WhatsApp ou Email
**Option WhatsApp:**
- S'ouvre dans l'application WhatsApp
- Le message est pré-rempli avec toutes les infos
- Le client n'a qu'à appuyer sur "Envoyer"

**Option Email:**
- S'ouvre dans l'application email du client
- Le sujet et le message sont pré-remplis
- Le client n'a qu'à appuyer sur "Envoyer"

## 🔧 Configuration Personnalisée

### 1. Modifier votre numéro WhatsApp
```typescript
// Fichier: src/components/OrderDialog.tsx (ligne 24)
const phoneNumber = '221774567890'; // <- Remplacez par votre numéro
```
⚠️ Format: Code pays + numéro sans espaces ni symbole +
Exemples:
- Sénégal: `221776543210`
- France: `33612345678`
- Côte d'Ivoire: `2250123456789`

### 2. Modifier votre adresse email
```typescript
// Fichier: src/components/OrderDialog.tsx (ligne 32)
const email = 'contact@golfacouture.com'; // <- Votre email
```

### 3. Ajouter de nouveaux produits
```typescript
// Fichier: src/lib/products.ts
{
  id: 10, // Numéro unique
  name: "Nom du produit",
  category: 'tissu', // ou 'chemise', 'pantalon', 'costume', 'accessoire'
  price: 50000, // Prix actuel en FCFA
  oldPrice: 75000, // Prix barré (optionnel, pour montrer la réduction)
  image: "https://...", // URL de l'image
  isNew: true, // true = badge NOUVEAU, false = pas de badge
  publishedDate: "2025-11-28", // Format: YYYY-MM-DD
  description: "Description du produit"
}
```

### 4. Modifier les couleurs du site
Les couleurs principales sont:
- **Noir**: `stone-900` (navigation, boutons)
- **Orange/Ambre**: `amber-600` (CTA, hover)
- **Vert**: `green-600` (badge NOUVEAU)
- **Rouge**: `red-600` (badge réduction)

Pour changer: Cherchez ces classes dans `src/app/page.tsx`

### 5. Changer l'image du hero
```typescript
// Fichier: src/app/page.tsx (ligne 40)
backgroundImage: "url('VOTRE_NOUVELLE_IMAGE_URL')"
```

## 📊 Exemple de message reçu via WhatsApp/Email

```
Nouvelle Commande - GOLFA COUTURE

Produit: Costume 3 Pièces Classique
Prix: 125 000 FCFA
Catégorie: costume

Client:
Nom: Diallo
Prénom: Mamadou
Téléphone: +221 77 456 78 90

Description: Costume élégant en laine, coupe moderne
```

## 🎨 Personnalisation Avancée

### Ajouter une section "À Propos"
1. Ouvrir `src/app/page.tsx`
2. Ajouter avant le footer:
```typescript
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-8">À Propos de GOLFA COUTURE</h2>
    <p className="text-center text-lg text-stone-600 max-w-3xl mx-auto">
      Votre texte ici...
    </p>
  </div>
</section>
```

### Ajouter vos réseaux sociaux dans le footer
```typescript
// Dans le footer (src/app/page.tsx)
<div className="flex gap-4 justify-center mt-4">
  <a href="https://facebook.com/..." className="hover:text-amber-400">Facebook</a>
  <a href="https://instagram.com/..." className="hover:text-amber-400">Instagram</a>
</div>
```

## 🚀 Déploiement

Votre site est prêt à être déployé !
Le fichier `netlify.toml` est déjà configuré pour un déploiement facile.

## 📞 Support

Si vous avez besoin d'aide, n'hésitez pas à demander des modifications ou clarifications !
