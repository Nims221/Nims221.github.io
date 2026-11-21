/*
 * Données des projets. Pour ajouter un projet, copier un bloc et le compléter.
 * - cat : "ecommerce" | "app" | "web"   (utilisé par les filtres)
 * - images : chemins dans assets/img/ (la 1re sert de vignette)
 * - phone : capture mobile optionnelle (affichée en mockup)
 * - stack : technologies réellement utilisées (laisser [] si non renseigné)
 * - services : ce qui a été livré
 * - featured : true = grande carte
 */
window.PROJECTS = [
  {
    id: "jaguar",
    name: "JAGUAR",
    cat: "ecommerce",
    kicker: "E-commerce · Mode & prêt-à-porter",
    featured: true,
    url: "https://jaguar-dakar.com/",
    status: "En ligne",
    short: "Boutique de mode féminine à Dakar, transformée en expérience e-commerce premium avec un vrai back-office.",
    problem: "Le commerce avait besoin d'un canal de vente digital élégant, responsive et assez simple à administrer au quotidien.",
    built: "Storefront complet : collections, fiches produits, variantes taille/couleur, panier, parcours de commande avec WhatsApp et back-office de gestion.",
    features: ["Catalogue & collections", "Variantes & stock", "Panier & commande", "Back-office", "Médias produits", "Mobile-first"],
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL", "Cloudinary"],
    images: ["assets/img/jaguar-1.webp", "assets/img/jaguar-2.webp"],
    phone: "assets/img/jaguar-phone.webp"
  },
  {
    id: "academy",
    name: "ARTIX Academy",
    cat: "app",
    kicker: "EdTech · Plateforme de formation",
    featured: true,
    url: "",
    status: "Pilote en ligne",
    short: "Plateforme de formation par compétences : parcours verrouillés, labs pratiques, évaluations et attestations.",
    problem: "Créer une formation structurée et mesurable, assez automatisée pour suivre la progression sans validation manuelle permanente.",
    built: "Dashboard apprenant, parcours à prérequis, labs pratiques, suivi des compétences, évaluations, attestations et espace d'administration.",
    features: ["Parcours & progression", "Labs pratiques", "Compétences", "Évaluations", "Attestations", "Admin & sécurité"],
    stack: ["PHP", "MySQL", "JavaScript", "REST API", "Cloudflare"],
    images: ["assets/img/academy-1.webp"]
  },
  {
    id: "optimus",
    name: "OPTIMUS",
    cat: "web",
    kicker: "Conseil & performance · Site + back-office",
    url: "https://optimus-performance.pro/",
    status: "En ligne",
    short: "Site d'un cabinet de conseil à Dakar : sept expertises, méthode en quatre étapes et espace apporteur d'affaires.",
    problem: "Présenter clairement une offre de conseil large et permettre à l'équipe de gérer ses contenus elle-même.",
    built: "Site vitrine, espace apporteur d'affaires (terrains, véhicules, mise en relation) et back-office sur mesure.",
    features: ["7 expertises", "Méthode en 4 étapes", "Espace apporteur d'affaires", "Back-office sur mesure"],
    services: ["Direction artistique", "UI/UX", "Site web & back-office"],
    stack: [],
    images: ["assets/img/optimus-1.webp", "assets/img/optimus-2.webp"],
    phone: "assets/img/optimus-phone.webp"
  },
  {
    id: "newera",
    name: "NEW ERA",
    cat: "ecommerce",
    kicker: "E-commerce · Joaillerie",
    url: "https://newera-jewelry.onrender.com/",
    status: "En ligne",
    short: "Maison de bijoux pensée comme une vitrine éditoriale, avec un parcours d'achat fluide d'abord sur mobile.",
    problem: "Donner à une marque de bijoux une boutique qui ressemble à un magazine, sans sacrifier la conversion sur mobile.",
    built: "Collections mises en scène, fiches produits détaillées et tunnel d'achat mobile-first.",
    features: ["Collections éditoriales", "Fiches produits", "Parcours mobile"],
    services: ["Direction artistique", "UI/UX", "E-commerce"],
    stack: [],
    images: ["assets/img/newera-1.webp", "assets/img/newera-2.webp"],
    phone: "assets/img/newera-phone.webp"
  },
  {
    id: "hamza",
    name: "Hamza Voyages",
    cat: "web",
    kicker: "Voyage & pèlerinage · Site + administration",
    url: "",
    status: "",
    short: "Le voyage des pèlerins du Sénégal raconté comme un chemin, avec inscription en ligne en trois étapes.",
    problem: "Rassurer et guider des pèlerins, souvent sur mobile, jusqu'à l'inscription.",
    built: "Compte à rebours lunaire jusqu'au Hajj 2027, carte d'embarquement, ziyara à Fès, guide des douas en arabe, inscription en 3 étapes et administration.",
    features: ["Compte à rebours Hajj", "Guide du pèlerin", "Inscription en 3 étapes", "Administration"],
    services: ["Direction artistique", "UI/UX", "Site web & administration"],
    stack: [],
    images: ["assets/img/hamza-1.webp", "assets/img/hamza-2.webp"],
    phone: "assets/img/hamza-phone.webp"
  },
  {
    id: "cuir",
    name: "CUIR CONFECTION",
    cat: "app",
    kicker: "ERP · Outil métier",
    url: "",
    status: "Application métier",
    short: "Un ERP pour piloter un atelier de cuir : catalogue, production, stocks, clients, ventes et comptabilité.",
    problem: "Les informations opérationnelles étaient dispersées alors que l'activité avait besoin d'une vision structurée.",
    built: "ERP web avec dashboard KPI et modules catalogue, modèles, produits, stock, production, ventes, clients et comptabilité.",
    features: ["Dashboard KPI", "Collections & modèles", "Production", "Mouvements de stock", "Clients & ventes", "Comptabilité"],
    stack: ["PHP", "MySQL", "SQL", "JavaScript", "HTML/CSS"],
    images: ["assets/img/cuir-1.webp"]
  },
  {
    id: "hope",
    name: "HOPE",
    cat: "web",
    kicker: "Beauty · Shop · Academy",
    url: "",
    status: "",
    short: "Une seule plateforme pour trois activités : prestations beauté avec réservation, boutique et academy.",
    problem: "Offrir un parcours cohérent pour réserver, acheter ou se former, sans multiplier les sites.",
    built: "Services beauté, réservation, boutique, catalogue, academy, administration des contenus et validation client par WhatsApp.",
    features: ["Réservation", "Boutique", "Academy", "Catalogue & stock", "Admin médias", "Validation WhatsApp"],
    stack: ["Node.js", "MySQL", "REST API", "Docker"],
    images: ["assets/img/hope-1.webp"]
  },
  {
    id: "boa",
    name: "BOA Food",
    cat: "web",
    kicker: "Food-tech & livraison · Site de lancement",
    url: "",
    status: "",
    short: "Clients, restaurants et livreurs réunis autour de la cuisine africaine. Site de lancement et liste d'attente.",
    problem: "Présenter une application pas encore lancée et commencer à constituer une communauté.",
    built: "Identité, présentation de l'app (découvrir, commander, suivre sa livraison en temps réel) et liste d'attente.",
    features: ["Présentation de l'app", "Liste d'attente", "Parcours mobile"],
    services: ["Identité", "UI/UX", "Site de lancement"],
    stack: [],
    images: ["assets/img/boa-1.webp", "assets/img/boa-2.webp"],
    phone: "assets/img/boa-phone.webp"
  },
  {
    id: "at",
    name: "AT",
    cat: "ecommerce",
    kicker: "E-commerce · Mode, parfums & accessoires",
    url: "",
    status: "",
    short: "Boutique de mode, parfums et accessoires avec un parcours de commande adapté au marché local.",
    problem: "Vendre en ligne trois univers produits avec un parcours de commande simple pour une clientèle locale.",
    built: "Boutique multi-catégories, mise en avant des collections et parcours de commande local.",
    features: ["Vêtements", "Parfums", "Accessoires", "Commande locale"],
    stack: [],
    images: ["assets/img/at-1.webp"]
  }
];
