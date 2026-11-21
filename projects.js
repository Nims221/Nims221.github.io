/*
 * Données des projets. Pour ajouter un projet, copier un bloc et le compléter.
 * - cat : "ecommerce" | "app" | "web"   (utilisé par les filtres)
 * - short : UNE phrase courte
 * - features : 3 ou 4 points clés maximum
 * - stack : technologies réellement utilisées ([] si non renseigné → "services" est affiché)
 * - images : captures desktop dans assets/img/ (la 1re s'affiche sur l'ordinateur)
 * - phone : capture mobile optionnelle (affichée sur le téléphone)
 */
window.PROJECTS = [
  {
    id: "jaguar", name: "JAGUAR", cat: "ecommerce",
    kicker: "E-commerce · Mode",
    url: "https://jaguar-dakar.com/",
    short: "Boutique de mode féminine à Dakar, avec back-office complet.",
    features: ["Catalogue & variantes", "Stock", "Commande WhatsApp", "Back-office"],
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL"],
    images: ["assets/img/jaguar-1.webp", "assets/img/jaguar-2.webp"],
    phone: "assets/img/jaguar-phone.webp"
  },
  {
    id: "optimus", name: "OPTIMUS", cat: "web",
    kicker: "Conseil · Site + back-office",
    url: "https://optimus-performance.pro/",
    short: "Cabinet de conseil en performance, géré depuis un back-office sur mesure.",
    features: ["7 expertises", "Espace apporteur d'affaires", "Back-office"],
    services: ["UI/UX", "Site web", "Back-office"], stack: [],
    images: ["assets/img/optimus-1.webp", "assets/img/optimus-2.webp"],
    phone: "assets/img/optimus-phone.webp"
  },
  {
    id: "newera", name: "NEW ERA", cat: "ecommerce",
    kicker: "E-commerce · Joaillerie",
    url: "https://newera-jewelry.onrender.com/",
    short: "Maison de bijoux en vitrine éditoriale, pensée d'abord pour le mobile.",
    features: ["Collections", "Fiches produits", "Achat mobile-first"],
    services: ["Direction artistique", "UI/UX", "E-commerce"], stack: [],
    images: ["assets/img/newera-1.webp", "assets/img/newera-2.webp"],
    phone: "assets/img/newera-phone.webp"
  },
  {
    id: "hamza", name: "Hamza Voyages", cat: "web",
    kicker: "Voyage · Site + administration",
    url: "",
    short: "Agence de pèlerinage : du rêve du Hajj à l'inscription en ligne.",
    features: ["Compte à rebours Hajj", "Guide du pèlerin", "Inscription en 3 étapes"],
    services: ["UI/UX", "Site web", "Administration"], stack: [],
    images: ["assets/img/hamza-1.webp", "assets/img/hamza-2.webp"],
    phone: "assets/img/hamza-phone.webp"
  },
  {
    id: "academy", name: "ARTIX Academy", cat: "app",
    kicker: "EdTech · Plateforme",
    url: "", status: "Pilote",
    short: "Formation par compétences : parcours, labs pratiques et attestations.",
    features: ["Parcours & progression", "Labs pratiques", "Évaluations", "Attestations"],
    stack: ["PHP", "MySQL", "JavaScript", "Cloudflare"],
    images: ["assets/img/academy-1.webp"]
  },
  {
    id: "cuir", name: "CUIR CONFECTION", cat: "app",
    kicker: "ERP · Outil métier",
    url: "",
    short: "ERP d'atelier : production, stock, ventes et comptabilité.",
    features: ["Dashboard KPI", "Production", "Stock", "Ventes"],
    stack: ["PHP", "MySQL", "JavaScript"],
    images: ["assets/img/cuir-1.webp"]
  },
  {
    id: "hope", name: "HOPE", cat: "web",
    kicker: "Beauty · Shop · Academy",
    url: "",
    short: "Réservation beauté, boutique et formations sur une seule plateforme.",
    features: ["Réservation", "Boutique", "Academy", "Validation WhatsApp"],
    stack: ["Node.js", "MySQL", "REST API", "Docker"],
    images: ["assets/img/hope-1.webp"]
  },
  {
    id: "boa", name: "BOA Food", cat: "web",
    kicker: "Food-tech · Site de lancement",
    url: "",
    short: "Cuisine africaine livrée : présentation de l'app et liste d'attente.",
    features: ["Présentation de l'app", "Liste d'attente", "Mobile-first"],
    services: ["Identité", "UI/UX", "Site de lancement"], stack: [],
    images: ["assets/img/boa-1.webp", "assets/img/boa-2.webp"],
    phone: "assets/img/boa-phone.webp"
  },
  {
    id: "at", name: "AT", cat: "ecommerce",
    kicker: "E-commerce · Mode & parfums",
    url: "",
    short: "Mode, parfums et accessoires avec commande adaptée au marché local.",
    features: ["Vêtements", "Parfums", "Accessoires", "Commande locale"],
    stack: [],
    images: ["assets/img/at-1.webp"]
  }
];
