export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mamadou Diallo",
    role: "Chef d'entreprise",
    content: "Excellente qualité de tissus ! J'ai acheté du bazin riche pour mon mariage et le résultat était parfait. Service client très professionnel.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "Il y a 2 semaines"
  },
  {
    id: 2,
    name: "Fatou Sow",
    role: "Styliste",
    content: "Je recommande vivement GOLFA COUTURE ! Les tissus sont de très haute qualité et les prix sont compétitifs. Mon fournisseur préféré.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    date: "Il y a 1 mois"
  },
  {
    id: 3,
    name: "Ibrahima Sarr",
    role: "Architecte",
    content: "Le costume que j'ai commandé est parfait ! Coupe impeccable, tissu de qualité. Je suis très satisfait de mon achat.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    date: "Il y a 3 semaines"
  },
  {
    id: 4,
    name: "Aminata Ba",
    role: "Couturière",
    content: "Très bon rapport qualité-prix. Les nouveaux arrivages sont toujours de qualité et la livraison est rapide. Merci GOLFA COUTURE !",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    date: "Il y a 1 semaine"
  },
  {
    id: 5,
    name: "Ousmane Ndiaye",
    role: "Commerçant",
    content: "Depuis que je commande chez GOLFA COUTURE, mes clients sont ravis. Qualité constante et excellent service.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    date: "Il y a 2 mois"
  },
  {
    id: 6,
    name: "Aïssatou Diop",
    role: "Cliente régulière",
    content: "J'adore la variété de tissus proposés. On trouve toujours ce qu'on cherche. Prix abordables et qualité au rendez-vous !",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    date: "Il y a 3 jours"
  }
];
