export type Language = 'fr' | 'ar';

export interface Translations {
  announcement: string;
  brandSubtitle: string;
  nav: {
    shop: string;
    reviews: string;
    journal: string;
    about: string;
    cart: string;
    wishlist: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
    ctaShop: string;
    ctaJournal: string;
    badge1Title: string;
    badge1Sub: string;
    badge2Title: string;
    badge2Sub: string;
    badge3Title: string;
    badge3Sub: string;
    workshopTag: string;
  };
  catalog: {
    kicker: string;
    title: string;
    description: string;
    counterText: string;
    explainer1Title: string;
    explainer1Sub: string;
    explainer2Title: string;
    explainer2Sub: string;
    explainer3Title: string;
    explainer3Sub: string;
    searchPlaceholder: string;
    queueNotice: string;
    sortBy: string;
    sortFeatured: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortRating: string;
    preOrderBadge: string;
    madeToOrderTag: string;
    slotsLeft: string;
    quickConfigure: string;
    preOrderButton: string;
    depositLabel: string;
    colorFilterAll: string;
    colorFilterGreen: string;
    colorFilterBlue: string;
    colorFilterWarm: string;
    colorFilterBurgundy: string;
    colorFilterNeutral: string;
    categories: {
      all: string;
      coffee: string;
      dining: string;
      bistro: string;
      cube: string;
      organic: string;
      mirrors: string;
      bespoke: string;
    };
  };
  expertise: {
    kicker: string;
    title: string;
    subtitle: string;
    specsTitle: string;
    pillar1Tag: string;
    pillar1Title: string;
    pillar1Text: string;
    pillar2Tag: string;
    pillar2Title: string;
    pillar2Text: string;
    pillar3Tag: string;
    pillar3Title: string;
    pillar3Text: string;
    pillar4Tag: string;
    pillar4Title: string;
    pillar4Text: string;
    modelsHeading: string;
    modelsCountLabel: string;
    bespokeCta: string;
  };
  pdp: {
    kicker: string;
    leadTime: string;
    timelineTitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    photoUpdateBadge: string;
    slotsRemaining: string;
    preOrderBadge: string;
    depositNotice: string;
    selectGrout: string;
    selectFrame: string;
    selectPlan: string;
    depositPlan: string;
    depositPlanSub: string;
    fullPlan: string;
    fullPlanSub: string;
    balanceNotice: string;
    customNotesLabel: string;
    customNotesPlaceholder: string;
    qtyLabel: string;
    dueTodayLabel: string;
    confirmPreOrderButton: string;
    cancelGuarantee: string;
    tabSpecs: string;
    tabReviews: string;
    materialsLabel: string;
    dimensionsLabel: string;
    cadenceLabel: string;
    careLabel: string;
    originLabel: string;
    packagingLabel: string;
  };
  reviews: {
    kicker: string;
    title: string;
    description: string;
    writeButton: string;
    satisfaction: string;
    outOf5: string;
    basedOn: string;
    recommendation: string;
    distribution: string;
    filterLabel: string;
    allOption: string;
    verifiedBuyer: string;
    helpful: string;
  };
  writeModal: {
    title: string;
    subtitle: string;
    successTitle: string;
    successText: string;
    productLabel: string;
    ratingLabel: string;
    nameLabel: string;
    cityLabel: string;
    titleLabel: string;
    commentLabel: string;
    tagLabel: string;
    verifiedCheckbox: string;
    cancel: string;
    submit: string;
  };
  cart: {
    title: string;
    tablesCount: string;
    leadNotice: string;
    emptyTitle: string;
    emptyText: string;
    browseButton: string;
    groutLabel: string;
    frameLabel: string;
    notesLabel: string;
    depositTag: string;
    balanceOnDispatch: string;
    totalValue: string;
    balanceDue: string;
    dueToday: string;
    checkoutButton: string;
    guarantee: string;
  };
  checkout: {
    header: string;
    subtitle: string;
    successTitle: string;
    successText: string;
    estDispatch: string;
    addressLabel: string;
    specsTitle: string;
    totalValue: string;
    chargedToday: string;
    balanceDue: string;
    printReceipt: string;
    returnStore: string;
    termsTitle: string;
    termsText: string;
    step1Title: string;
    fullName: string;
    email: string;
    step2Title: string;
    address: string;
    city: string;
    stateGov: string;
    postalCode: string;
    step3Title: string;
    shippingStandard: string;
    shippingStandardSub: string;
    shippingWhiteGlove: string;
    shippingWhiteGloveSub: string;
    step4Title: string;
    payCard: string;
    payCod: string;
    codTerms: string;
    summaryTitle: string;
    shippingCost: string;
    submitButton: string;
    refundNote: string;
  };
  about: {
    kicker: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    founderTitle: string;
    founderSub: string;
    p1Title: string;
    p1Text: string;
    p2Title: string;
    p2Text: string;
    p3Title: string;
    p3Text: string;
    artisanCorner: {
      kicker: string;
      locationTag: string;
      imageAlt: string;
      title: string;
      role: string;
      bio1: string;
      bio2: string;
      fact1Label: string;
      fact1Value: string;
      fact2Label: string;
      fact2Value: string;
      fact3Label: string;
    };
  };
  footer: {
    brandDesc: string;
    workshopAddress: string;
    workshopHours: string;
    tablesCol: string;
    aboutCol: string;
    newsletterTitle: string;
    newsletterDesc: string;
    newsletterPlaceholder: string;
    subscribed: string;
    copyright: string;
    tag1: string;
    tag2: string;
    tag3: string;
  };
  blog: {
    kicker: string;
    title: string;
    description: string;
    all: string;
    readNote: string;
    by: string;
    topics: string;
    commentsTitle: string;
    leaveComment: string;
    namePlaceholder: string;
    commentPlaceholder: string;
    postComment: string;
    commentSuccess: string;
    noComments: string;
    close: string;
  };
  wishlist: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    browseCatalog: string;
    remove: string;
    configureAndOrder: string;
    addedToast: string;
    removedToast: string;
    itemCount: string;
    filterLabel: string;
    depositTag: string;
    viewProduct: string;
  };
  compare: {
    buttonAdd: string;
    buttonAdded: string;
    trayTitle: string;
    trayLimitHint: string;
    compareNow: string;
    clearAll: string;
    modalKicker: string;
    modalTitle: string;
    modalSubtitle: string;
    addModelPlaceholder: string;
    removeItem: string;
    specColumn: string;
    priceRow: string;
    depositLabel: string;
    ratingRow: string;
    reviewsUnit: string;
    leadTimeRow: string;
    slotsRow: string;
    slotsUnit: string;
    materialsRow: string;
    dimensionsRow: string;
    careRow: string;
    originRow: string;
    colorsRow: string;
    groutRow: string;
    frameRow: string;
    configureBtn: string;
    bestValueTag: string;
    topRatedTag: string;
    emptyTitle: string;
    emptyDesc: string;
    maxReachedToast: string;
    addedToast: string;
    removedToast: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fr: {
    announcement: 'Artisanat Tunisien Sur Mesure · Précommandes Ouvertes · Livraison Partout en Tunisie',
    brandSubtitle: 'Tables Artisanales en Céramique & Zellige',
    nav: {
      shop: 'Nos Tables',
      reviews: 'Avis Clients',
      journal: 'Journal d’Atelier',
      about: 'Notre Savoir-Faire',
      cart: 'Précommandes',
      wishlist: 'Coups de Cœur',
    },
    hero: {
      kicker: 'D creations Atelier · Tables Céramiques Sur Mesure · Tunisie',
      title: 'Des tables en carreaux émaillés aux styles et couleurs audacieuses.',
      description: 'Cubes et arches monolithiques, tables basses à deux niveaux, consoles safran, grandes tables damier encadrées de chêne massif et guéridons ronds zellige sur fer forgé. Façonnées à la commande avec joint époxy antitache.',
      ctaShop: 'Découvrir les Styles',
      ctaJournal: 'Notre Savoir-Faire',
      badge1Title: 'Acompte 50%',
      badge1Sub: 'Pour réserver votre fabrication',
      badge2Title: '10+ Styles & Coloris',
      badge2Sub: 'Émeraude, Cobalt, Safran, Terracotta…',
      badge3Title: 'Photos de l’Atelier',
      badge3Sub: 'Suivi de fabrication par WhatsApp',
      workshopTag: 'Styles Variés & Couleurs Vives · Tunisie',
    },
    catalog: {
      kicker: 'Fabrication Sur Demande · Styles & Couleurs Variés',
      title: 'Tables en Céramique : Monolithes, Damier Bois, Arches & Guéridons',
      description: 'Explorez nos différentes silhouettes et palettes colorées. Chaque pièce est réalisée spécialement pour vous avec joint époxy résistant aux taches.',
      counterText: 'modèles disponibles sur commande',
      explainer1Title: '1. Silhouettes & Formats Variés',
      explainer1Sub: 'Cubes, arches, consoles, tables à manger chêne ou guéridons fer forgé',
      explainer2Title: '2. Joint Époxy Ultra-Résistant',
      explainer2Sub: 'Insensible aux taches de café, thé à la menthe, huile ou cire',
      explainer3Title: '3. Couleurs & Finitions au Choix',
      explainer3Sub: 'Émeraude, cobalt, safran, terracotta, bordeaux, olive ou blanc crème',
      searchPlaceholder: 'Rechercher arche, damier, safran, émeraude, terracotta, cube...',
      queueNotice: 'File d’attente atelier : réservations ouvertes pour le mois en cours',
      sortBy: 'Trier par :',
      sortFeatured: 'Recommandés Atelier',
      sortPriceAsc: 'Prix : Croissant',
      sortPriceDesc: 'Prix : Décroissant',
      sortRating: 'Mieux Notés',
      preOrderBadge: 'Sur Commande',
      madeToOrderTag: 'Atelier Tunisien',
      slotsLeft: 'places d’atelier restantes',
      quickConfigure: 'Configurer & Commander',
      preOrderButton: 'Précommander cette Table',
      depositLabel: 'ou acompte de',
      colorFilterAll: 'Toutes les Couleurs',
      colorFilterGreen: 'Verts (Olive & Émeraude)',
      colorFilterBlue: 'Bleus (Cobalt & Nuit)',
      colorFilterWarm: 'Terracotta & Safran',
      colorFilterBurgundy: 'Bordeaux & Rose',
      colorFilterNeutral: 'Blanc & Neutres',
      categories: {
        all: 'Toutes les Créations',
        coffee: 'Tables Basses',
        dining: 'Tables à Manger & Consoles',
        bistro: 'Bistrot, Terrasse & Socles',
        cube: 'Cubes, Arches & Chevets',
        organic: 'Sculptées & Micro-Ciment',
        mirrors: 'Miroirs Sculpturaux',
        bespoke: 'Sur Mesure',
      },
    },
    expertise: {
      kicker: 'Expertise Minérale & Micro-Ciment',
      title: 'Une seconde maîtrise d’atelier : les tables organiques sculptées sans joints.',
      subtitle:
        'En plus du carreau céramique, notre atelier de Naassen façonne des tables monolithiques aux courbes libres en micro-ciment, tadelakt et chaux minérale — douces au toucher, sans angle vif et scellées contre toutes les taches.',
      specsTitle: 'Protocole de Sculpture & Finition Minérale',
      pillar1Tag: '01 — ARMATURE',
      pillar1Title: 'Noyau Hydrofuge & Fibre Armée',
      pillar1Text:
        'Gabarit découpé sur mesure en forme de galet, haricot ou croissant avec double armature anti-fissure haute densité.',
      pillar2Tag: '02 — BULLNOSE',
      pillar2Title: 'Arêtes Douces Sans Aucun Joint',
      pillar2Text:
        'Profilage manuel et ponçage sculptural de chaque bord pour un volume continu, fluide et sécurisant dans le salon.',
      pillar3Tag: '03 — 5 COUCHES',
      pillar3Title: 'Micro-Ciment, Chaux & Tadelakt',
      pillar3Text:
        'Application en 5 passes talochées à la main avec pigments minéraux : albâtre mat, travertin sablé, terracotta ou sauge.',
      pillar4Tag: '04 — VERNIS MAT',
      pillar4Title: 'Bouclier Oléofuge & Hydrofuge',
      pillar4Text:
        'Double vitrification polyuréthane veloutée préservant l’aspect pierre brute tout en bloquant café, huile et cire.',
      modelsHeading: 'Modèles Sculpturaux Disponibles sur Commande',
      modelsCountLabel: 'éditions organiques',
      bespokeCta: 'Commander une forme organique sur plan',
    },
    pdp: {
      kicker: 'Mobilier Céramique Architectural',
      leadTime: 'Délai de fabrication : 10 à 21 jours',
      timelineTitle: 'Les 4 étapes de fabrication de votre table',
      step1: '1. Âme Structurelle : Découpe hydrofuge haute densité avec niche ou découpe U-Cut.',
      step2: '2. Calepinage & Onglet 45° : Pose millimétrée des carreaux carrés sans baguette.',
      step3: '3. Jointoiement Époxy : Application et séchage de 7 jours pour une étanchéité totale.',
      step4: '4. Patins / Roulettes & Livraison : Finition du socle et caisse bois à domicile.',
      photoUpdateBadge: 'Photos de suivi envoyées pendant la pose',
      slotsRemaining: 'créneaux de fabrication disponibles ce mois-ci',
      preOrderBadge: 'Sur Commande Exclusive',
      depositNotice: 'Fabriqué à la demande. Possibilité de payer un acompte de 50% à la réservation.',
      selectGrout: '1. Choisissez la teinte du joint époxy antitache',
      selectFrame: '2. Choisissez l’option de piètement invisible (Patins ou Roulettes)',
      selectPlan: '3. Choisissez le mode de paiement',
      depositPlan: 'Acompte 50% Maintenant',
      depositPlanSub: 'Payez la moitié aujourd’hui',
      fullPlan: 'Paiement Intégral',
      fullPlanSub: 'Réglez la totalité de la commande',
      balanceNotice: 'Le solde restant sera réglé à la livraison',
      customNotesLabel: 'Notes spéciales (Couleur de carreaux, dimensions, niche ou étage)',
      customNotesPlaceholder: 'Ex: Vert sauge, hauteur 45 cm ou ajout de niche traversante...',
      qtyLabel: 'Quantité :',
      dueTodayLabel: 'Montant à régler :',
      confirmPreOrderButton: 'Réserver ma Table en Atelier',
      cancelGuarantee: 'Livraison sécurisée avec caisse de protection dans toute la Tunisie',
      tabSpecs: 'Fiche Technique & Matériaux',
      tabReviews: 'Avis Clients & Témoignages',
      materialsLabel: 'Carreaux & Âme',
      dimensionsLabel: 'Dimensions & Poids',
      cadenceLabel: 'Cadence de Production',
      careLabel: 'Entretien & Nettoyage',
      originLabel: 'Origine de Fabrication',
      packagingLabel: 'Protection & Transport',
    },
    reviews: {
      kicker: 'Témoignages Réels',
      title: 'Avis de Nos Clients en Tunisie',
      description: 'Découvrez les retours de nos clients qui ont embelli leurs salons, vérandas et terrasses avec les tables D creations.',
      writeButton: 'Donner mon Avis',
      satisfaction: 'Satisfaction Globale',
      outOf5: 'sur 5.0',
      basedOn: 'Basé sur les avis vérifiés de nos clients partout en Tunisie.',
      recommendation: '99% de nos clients recommandent nos tables en faïence',
      distribution: 'Répartition des Notes (Cliquer pour filtrer)',
      filterLabel: 'Filtrer par Modèle :',
      allOption: 'Toutes les Tables',
      verifiedBuyer: 'Acheteur Vérifié',
      helpful: 'Utile',
    },
    writeModal: {
      title: 'Partager Votre Expérience',
      subtitle: 'Donnez votre avis sur votre table artisanale D creations',
      successTitle: 'Merci pour votre retour !',
      successText: 'Votre témoignage a été publié et encourage l’artisanat local tunisien.',
      productLabel: 'Modèle de Table',
      ratingLabel: 'Note de Qualité',
      nameLabel: 'Votre Nom',
      cityLabel: 'Ville / Gouvernorat (ex: Tunis, La Marsa, Sousse, Nabeul)',
      titleLabel: 'Titre du Témoignage',
      commentLabel: 'Votre Commentaire',
      tagLabel: 'Point Fort',
      verifiedCheckbox: 'J’ai commandé ou reçu une table de chez D creations',
      cancel: 'Annuler',
      submit: 'Publier mon Avis',
    },
    cart: {
      title: 'Votre File de Commande',
      tablesCount: 'tables réservées',
      leadNotice: 'Fabrication artisanale lancée dès validation · Suivi direct par WhatsApp',
      emptyTitle: 'Votre panier de commande est vide',
      emptyText: 'Découvrez nos tables basses à niche, cubes sculpturaux, colonnes et modèles U-Cut sur mesure.',
      browseButton: 'Voir le Catalogue',
      groutLabel: 'Joint :',
      frameLabel: 'Finition / Base :',
      notesLabel: 'Notes :',
      depositTag: 'Acompte 50%',
      balanceOnDispatch: 'solde à la livraison',
      totalValue: 'Valeur Totale de la Table',
      balanceDue: 'Solde Restant à la Livraison',
      dueToday: 'Montant à Régler Aujourd’hui',
      checkoutButton: 'Passer la Précommande',
      guarantee: 'Fabrication soignée et livraison sur rendez-vous dans toute la Tunisie',
    },
    checkout: {
      header: 'Validation de la Commande',
      subtitle: 'Atelier D creations · Tunisie',
      successTitle: 'Votre table est en cours de programmation !',
      successText: 'Merci beaucoup ! Votre créneau en atelier a été réservé. Notre équipe vous contactera par téléphone ou WhatsApp pour confirmer les détails.',
      estDispatch: 'Délai Estimé de Livraison',
      addressLabel: 'Adresse de Livraison en Tunisie',
      specsTitle: 'Spécifications Choisies',
      totalValue: 'Valeur Totale',
      chargedToday: 'Montant à Régler Aujourd’hui',
      balanceDue: 'Solde à Payer à la Réception',
      printReceipt: 'Imprimer le Reçu',
      returnStore: 'Retour à la Boutique',
      termsTitle: 'Fabrication Artisanale Sur Mesure',
      termsText: 'Votre table sera fabriquée artisanalement. Délai moyen de 2 semaines. Des photos d’avancement vous seront envoyées.',
      step1Title: '1. Vos Coordonnées',
      fullName: 'Nom et Prénom',
      email: 'Adresse Email (pour le récapitulatif)',
      step2Title: '2. Adresse de Livraison en Tunisie',
      address: 'Rue, Résidence ou Repère',
      city: 'Ville / Délégation (ex: La Marsa, Hammamet, Ennasr)',
      stateGov: 'Gouvernorat (Tunis, Ariana, Ben Arous, Nabeul, Sousse...)',
      postalCode: 'Code Postal ou Numéro de Téléphone',
      step3Title: '3. Mode de Livraison',
      shippingStandard: 'Livraison Sécurisée Tunisie',
      shippingStandardSub: 'Caisse bois capitonnée avec transporteur spécialisé mobilier',
      shippingWhiteGlove: 'Livraison VIP avec Installation',
      shippingWhiteGloveSub: 'Mise en place dans votre pièce ou sur votre terrasse',
      step4Title: '4. Modalité de Paiement',
      payCard: 'Paiement Immédiat (Virement / D17 / Carte)',
      payCod: 'Paiement à la Livraison (Espèces)',
      codTerms: 'Vous réglerez en espèces directement au transporteur lors de la livraison et vérification de la table.',
      summaryTitle: 'Récapitulatif de Commande',
      shippingCost: 'Frais de Livraison Sécurisée',
      submitButton: 'Confirmer la Commande',
      refundNote: 'Service client direct par WhatsApp et téléphone disponible 7j/7',
    },
    about: {
      kicker: 'L’Histoire de D creations',
      title: 'La richesse du carreau céramique tunisien, réinventée dans chaque silhouette.',
      subtitle: 'Des monolithes graphiques coupés à 45° aux grandes tables de famille en chêne massif et guéridons de terrasse en zellige.',
      p1: 'Chez D creations, nous explorons toutes les formes et couleurs de la céramique émaillée : tables basses à deux niveaux émeraude & ocre, arches bordeaux-rose, consoles safran, damiers cobalt et cubes minimalistes.',
      p2: 'Selon le style choisi, nos pièces sont biseautées à 45° sans baguette apparente, serties dans un cadre en bois massif assemblé à tenons-mortaises ou posées sur fer forgé traité marin.',
      p3: 'Toutes nos créations sont scellées au joint époxy haute résistance : zéro tache de café, thé, huile ou bougie, aussi bien au salon qu’en terrasse.',
      founderTitle: 'Atelier D creations',
      founderSub: 'Design Céramique Multi-Styles',
      p1Title: '1. Zéro Tache Grâce à l’Époxy',
      p1Text: 'Nos 5 teintes de joints époxy techniques résistent durablement aux taches du quotidien et se nettoient en un geste.',
      p2Title: '2. Onglet 45°, Bois Massif & Fer Forgé',
      p2Text: 'Trois savoir-faire maîtrisés en atelier pour adapter la structure à votre intérieur comme à votre jardin.',
      p3Title: '3. Palette Libre & Sur Mesure',
      p3Text: 'Vert émeraude, bleu cobalt, jaune safran, terracotta, bordeaux, sauge ou crème : composez votre table idéale.',
      artisanCorner: {
        kicker: 'Le Coin de l’Artisan · Savoir-Faire Sur Mesure',
        locationTag: 'Naassen · Ben Arous 1135 · Fabrication à la main',
        imageAlt: 'Portrait de Mohamed Ali Saidi, fondateur et artisan créateur de D | Creations',
        title: 'Mohamed Ali Saidi & les Maîtres Carreleurs',
        role: 'Fondateur · Atelier D | Creations',
        bio1: 'Né d’une passion pour la céramique tunisienne et le mobilier d’architecture, notre atelier de Naassen refuse toute fabrication en série. Chaque table naît d’une commande unique : sélection des émaux, découpe millimétrée des carreaux et du zellige à la pince et au disque diamant, et calepinage dessiné spécialement pour vos dimensions.',
        bio2: 'Qu’il s’agisse d’un plateau de zellige géométrique serti sur bois massif, d’un cube monolithique biseauté à 45° ou d’une sculpture organique en micro-ciment, chaque pièce porte l’empreinte manuelle de l’artisan qui l’a assemblée et jointoyée à l’époxy.',
        fact1Label: 'Cadence Atelier',
        fact1Value: '100% à la demande · Zéro stock industriel',
        fact2Label: 'Spécialité',
        fact2Value: 'Zellige, Faïence 45° & Micro-Ciment',
        fact3Label: 'Ligne Directe Atelier',
      },
    },
    footer: {
      brandDesc: 'Atelier tunisien spécialisé dans la fabrication sur mesure de tables monolithes, cubes et colonnes architecturales en carreaux de céramique émaillée.',
      workshopAddress: 'Atelier : Route Khelidia, Chebedda, Naassen 1135, Ben Arous, Tunisie',
      workshopHours: 'Visites d’atelier et retraits sur rendez-vous ou par WhatsApp',
      tablesCol: 'Nos Modèles',
      aboutCol: 'D creations',
      newsletterTitle: 'Actualités & Nouveaux Modèles',
      newsletterDesc: 'Recevez nos nouveautés, nouvelles couleurs de faïence et créneaux d’atelier disponibles.',
      newsletterPlaceholder: 'Entrez votre adresse email...',
      subscribed: 'Merci ! Vous êtes inscrit(e) aux nouvelles de l’atelier.',
      copyright: 'Tous droits réservés. Tables en faïence artisanale de Tunisie.',
      tag1: 'Livraison 24 Gouvernorats',
      tag2: 'Joint Époxy Antitache',
      tag3: 'Fer Forgé & Bois Massif',
    },
    blog: {
      kicker: 'Journal d’Atelier',
      title: 'Coulisses de l’Atelier & Actualités',
      description: 'Découvrez nos techniques de céramique de Nabeul, conseils d’entretien du joint époxy et créations récentes.',
      all: 'Tous',
      readNote: 'Lire l’article',
      by: 'Par',
      topics: 'Sujets :',
      commentsTitle: 'Commentaires & Réactions',
      leaveComment: 'Laisser un mot pour nos artisans',
      namePlaceholder: 'Votre prénom & nom',
      commentPlaceholder: 'Partagez vos impressions ou questions sur cette création...',
      postComment: 'Publier le commentaire',
      commentSuccess: 'Merci ! Votre message a bien été publié sur le journal d’atelier.',
      noComments: 'Aucun commentaire pour le moment. Soyez le premier à réagir !',
      close: 'Fermer',
    },
    wishlist: {
      title: 'Vos Coups de Cœur',
      subtitle: 'Les créations artisanales que vous avez sélectionnées',
      emptyTitle: 'Aucun coup de cœur pour le moment',
      emptyDesc: 'Explorez notre collection et cliquez sur le cœur pour mémoriser vos tables préférées.',
      browseCatalog: 'Découvrir nos créations',
      remove: 'Retirer de la sélection',
      configureAndOrder: 'Personnaliser & Réserver',
      addedToast: 'Table ajoutée à vos coups de cœur !',
      removedToast: 'Table retirée de vos coups de cœur',
      itemCount: 'table(s) enregistrée(s)',
      filterLabel: 'Coups de Cœur',
      depositTag: 'Acompte 50%',
      viewProduct: 'Détails du modèle',
    },
    compare: {
      buttonAdd: 'Comparer',
      buttonAdded: 'Sélectionné',
      trayTitle: 'Comparateur',
      trayLimitHint: 'Sélectionnez 2 à 4 créations',
      compareNow: 'Comparer',
      clearAll: 'Effacer',
      modalKicker: 'Dossier Comparatif · Atelier D | Creations',
      modalTitle: 'Comparaison Côte à Côte',
      modalSubtitle: 'Analysez les matériaux, dimensions, teintes et options de fabrication sur mesure.',
      addModelPlaceholder: '+ Ajouter un modèle à comparer...',
      removeItem: 'Retirer',
      specColumn: 'Spécification',
      priceRow: 'Tarif & Acompte',
      depositLabel: 'Acompte 50% :',
      ratingRow: 'Appréciation Clients',
      reviewsUnit: 'avis',
      leadTimeRow: 'Délai & Série Atelier',
      slotsRow: 'Créneaux Ouverts',
      slotsUnit: 'places restantes',
      materialsRow: 'Matériaux & Âme',
      dimensionsRow: 'Dimensions & Gabarit',
      careRow: 'Entretien & Résistance',
      originRow: 'Fabrication',
      colorsRow: 'Coloris & Finitions (Cliquer pour aperçu)',
      groutRow: 'Teintes de Joint / Patine',
      frameRow: 'Options de Structure / Base',
      configureBtn: 'Configurer & Commander',
      bestValueTag: 'Tarif le plus doux',
      topRatedTag: 'Mieux noté',
      emptyTitle: 'Aucune création sélectionnée',
      emptyDesc: 'Sélectionnez jusqu’à 4 tables ou miroirs depuis le catalogue pour comparer leurs caractéristiques.',
      maxReachedToast: 'Vous pouvez comparer jusqu’à 4 modèles simultanément.',
      addedToast: 'ajouté au comparateur',
      removedToast: 'retiré du comparateur',
    },
  },
  ar: {
    announcement: 'صناعة تونسية تقليدية على الطلب · الحجوزات مفتوحة · التوصيل لكامل تراب الجمهورية التونسية',
    brandSubtitle: 'طاولات خَزَف وزليج بتصاميم وألوان متنوعة',
    nav: {
      shop: 'الطاولات',
      reviews: 'آراء الحرفاء',
      journal: 'دفتر الورشة',
      about: 'صنعتنا وتاريخنا',
      cart: 'الطلبات',
      wishlist: 'المفضلة',
    },
    hero: {
      kicker: 'ورشة D creations · طاولات خزف بألوان وتصاميم متعددة · تونس',
      title: 'طاولات خَزَف يدويّة بأساليب معمارية وتقليدية، تُصنع بألوانكم المفضلة.',
      description: 'مكعبات وأقواس، طاولات قهوة بمستويين، كونسول بلون الزعفران، طاولات طعام من خشب البلوط ومربعات الكوبالت، وطاولات شرفة دائرية من الزليج والحديد المطروق. كلّها معالجة بعازل إيبوكسي مانع للبقع.',
      ctaShop: 'اكتشف التشكيلة الكاملة',
      ctaJournal: 'صنعتنا اليدوية',
      badge1Title: 'عربون 50%',
      badge1Sub: 'لحجز دورك في الورشة',
      badge2Title: '+10 تصاميم وألوان',
      badge2Sub: 'زمردي، كوبالت، زعفران، تيراكوتا…',
      badge3Title: 'صور متابعة من الورشة',
      badge3Sub: 'نرسل لكم صور إنجاز طاولتكم',
      workshopTag: 'تصاميم متنوعة وألوان زاهية · تونس',
    },
    catalog: {
      kicker: 'صناعة حسب الطلب · أشكال وألوان متنوعة',
      title: 'طاولات الخزف: تصاميم حديثة، خشب صلب، أقواس وموزاييك',
      description: 'تصفحوا مختلف الأنماط الهندسية والألوان الغنية. كل طاولة تُصنع خصيصاً لكم بمادة إيبوكسي مقاومة للبقع.',
      counterText: 'طراز متوفر للحجز في الورشة',
      explainer1Title: '1. تنوّع في الأنماط والأحجام',
      explainer1Sub: 'مكعبات، أقواس، طاولات بمستويين، طاولات طعام بلوط وطاولات شرفة',
      explainer2Title: '2. مادة إيبوكسي مانعة للبقع',
      explainer2Sub: 'مقاومة تامة لبقع القهوة، الشاي، زيت الزيتون والشمع',
      explainer3Title: '3. حرية اختيار الألوان والقياس',
      explainer3Sub: 'زمردي، كوبالت، زعفران، تيراكوتا، عنابي، زيتوني أو أبيض كريمي',
      searchPlaceholder: 'ابحث عن قوس، طاولة طعام، زعفران، زمردي، تيراكوتا...',
      queueNotice: 'قائمة الانتظار مفتوحة للحجز لهذا الشهر',
      sortBy: 'ترتيب حسب :',
      sortFeatured: 'الموصى به من الورشة',
      sortPriceAsc: 'السعر: من الأقل إلى الأعلى',
      sortPriceDesc: 'السعر: من الأعلى إلى الأقل',
      sortRating: 'الأعلى تقييماً',
      preOrderBadge: 'على الطلب',
      madeToOrderTag: 'صناعة تونسية يدوية',
      slotsLeft: 'أماكن متبقية هذا الشهر',
      quickConfigure: 'تخصيص وطلب',
      preOrderButton: 'حجز هذه الطاولة',
      depositLabel: 'أو عربون بقيمة',
      colorFilterAll: 'كل الألوان',
      colorFilterGreen: 'الأخضر (زيتوني وزمردي)',
      colorFilterBlue: 'الأزرق (كوبالت وليلي)',
      colorFilterWarm: 'تيراكوتا وزعفران',
      colorFilterBurgundy: 'عنابي ووردي',
      colorFilterNeutral: 'أبيض وألوان محايدة',
      categories: {
        all: 'كل التصاميم',
        coffee: 'طاولات الصالون',
        dining: 'طاولات الطعام والكونسول',
        bistro: 'طاولات الشرفة والأعمدة',
        cube: 'مكعبات وأقواس وطاولات سرير',
        organic: 'منحوتة وميكرو سمنت',
        mirrors: 'مرايا عضوية منحوتة',
        bespoke: 'على المقاس (Sur Mesure)',
      },
    },
    expertise: {
      kicker: 'خبرة الميكرو سمنت والنحت العضوي',
      title: 'تخصّص ثانٍ لورشتنا : الطاولات العضوية المنحوتة بلا فواصل.',
      subtitle:
        'إلى جانب الخزف والزليج، تتقن ورشتنا في نعسان (بن عروس) نحت طاولات بانسيابية عضوية من الميكرو سمنت والجير المعدني والتادلاكت — حواف دائرية ناعمة وعزل تام ضد البقع.',
      specsTitle: 'مراحل النحت والتشطيب المعدني',
      pillar1Tag: '01 — الهيكل',
      pillar1Title: 'قالب مقاوم للرطوبة وألياف مقوّاة',
      pillar1Text:
        'تشكيل يدوي على المقاس بأشكال انسيابية (حصاة، هلال أو غيمة) مع تسليح مزدوج مانع للتشقق.',
      pillar2Tag: '02 — الحواف',
      pillar2Title: 'حواف دائرية ناعمة دون فواصل',
      pillar2Text:
        'صقل ونحت يدوي لكل الحواف للحصول على قطعة متصلة وانسيابية تضفي هدوءاً وأماناً على الصالون.',
      pillar3Tag: '03 — 5 طبقات',
      pillar3Title: 'ميكرو سمنت، جير وتادلاكت',
      pillar3Text:
        'تطبيق يدوي لخمس طبقات بأصباغ معدنية طبيعية: أبيض مرمر، ترافرتين رملي، تيراكوتا أو أخضر مريمي.',
      pillar4Tag: '04 — الحماية',
      pillar4Title: 'طلاء مطفي مانع للبقع والرطوبة',
      pillar4Text:
        'حماية مزدوجة تحافظ على ملمس الحجر الطبيعي وتمنع تسرب القهوة والزيت والشمع.',
      modelsHeading: 'الطرازات المنحوتة المتوفرة للحجز',
      modelsCountLabel: 'تصاميم عضوية',
      bespokeCta: 'اطلب شكلاً عضوياً بمقاسك الخاص',
    },
    pdp: {
      kicker: 'أثاث خَزَف معماري معاصر',
      leadTime: 'مدة الصنع: 10 إلى 21 يوماً',
      timelineTitle: 'مراحل صنع طاولتكم في الورشة',
      step1: '1. الهيكل المقاوم للرطوبة: تقطيع خشب عالي الكثافة مع فتحة كتب أو شكل U-Cut.',
      step2: '2. رصف وقص 45°: تركيب مربعات الخزف يدوياً دون فواصل معدنية.',
      step3: '3. عازل الإيبوكسي: تطبيق وتجفيف لمدة 7 أيام لحماية تامة من البقع.',
      step4: '4. تشطيب القاعدة والتوصيل: تركيب وسائد الحماية أو العجلات المخفية والشحن.',
      photoUpdateBadge: 'صور حصرية لمراحل الصنع عبر واتساب',
      slotsRemaining: 'أماكن حجز متوفرة في ورشتنا لهذا الشهر',
      preOrderBadge: 'تصنيع حسب الطلب',
      depositNotice: 'تُصنع الطاولة بناءً على طلبكم. يمكنكم دفع عربون 50% عند الحجز.',
      selectGrout: '1. اختر لون فاصل الإيبوكسي العازل (مقاوم للبقع)',
      selectFrame: '2. اختر تشطيب الحواف والقاعدة السفلية',
      selectPlan: '3. اختر طريقة الدفع',
      depositPlan: 'عربون 50% الآن',
      depositPlanSub: 'ادفع النصف لتأكيد الحجز',
      fullPlan: 'دفع كامل المبلغ',
      fullPlanSub: 'دفع قيمة الطاولة كاملة',
      balanceNotice: 'المبلغ المتبقي يُدفع عند الاستلام والمعاينة',
      customNotesLabel: 'ملاحظات خاصة (تعديل اللون، الأبعاد أو تفاصيل الفتحة)',
      customNotesPlaceholder: 'مثال: لون أخضر مريمية، ارتفاع 45 سم أو إضافة فتحة جانبية...',
      qtyLabel: 'الكمية :',
      dueTodayLabel: 'المبلغ المطلوب :',
      confirmPreOrderButton: 'تأكيد الحجز وبدء التصنيع',
      cancelGuarantee: 'توصيل محمي بصندوق خشبي مدعم لكافة ولايات تونس',
      tabSpecs: 'المواصفات الفنية والمواد',
      tabReviews: 'آراء وتجارب الحرفاء',
      materialsLabel: 'نوع الخزف والهيكل',
      dimensionsLabel: 'الأبعاد والوزن',
      cadenceLabel: 'مدة التصنيع',
      careLabel: 'طريقة العناية والتنظيف',
      originLabel: 'مكان الصنع',
      packagingLabel: 'التغليف والشحن',
    },
    reviews: {
      kicker: 'تجارب حقيقية',
      title: 'آراء حرفائنا في تونس',
      description: 'شهادات وتجارب من منازل في تونس العاصمة، الساحل، الوطن القبلي والجنوب زينوا فضاءاتهم بطاولات D creations.',
      writeButton: 'أضف رأيك وتجربتك',
      satisfaction: 'نسبة الرضا العامة',
      outOf5: 'من 5.0',
      basedOn: 'بناءً على تقييمات موثقة من حرفائنا في كامل أنحاء تونس.',
      recommendation: '99% من حرفائنا ينصحون باقتناء طاولاتنا',
      distribution: 'توزيع التقييمات (اضغط للتصفية)',
      filterLabel: 'تصفية حسب الطراز :',
      allOption: 'كل الطاولات',
      verifiedBuyer: 'حريف مؤكد',
      helpful: 'مفيد',
    },
    writeModal: {
      title: 'شاركنا رأيك في طاولتك',
      subtitle: 'عبّر عن تجربتك مع أثاث الخزف اليدوي من D creations',
      successTitle: 'شكراً جزيلاً على تقييمكم !',
      successText: 'تم نشر رأيكم وهو يدعم الحرفيين والصناعة التونسية المحلية.',
      productLabel: 'طراز الطاولة',
      ratingLabel: 'تقييم الجودة',
      nameLabel: 'اسمكم الكريم',
      cityLabel: 'المدينة / الولاية (تونس، المرسى، سوسة، نابل، صفاقس...)',
      titleLabel: 'عنوان الرأي',
      commentLabel: 'تعليقكم وتجربتكم',
      tagLabel: 'أبرز ميزة أعجبتكم',
      verifiedCheckbox: 'لقد طلبت واستلمت طاولة من D creations',
      cancel: 'إلغاء',
      submit: 'نشر التقييم',
    },
    cart: {
      title: 'قائمة طاولاتك المحجوزة',
      tablesCount: 'طاولات محجوزة',
      leadNotice: 'ينطلق التصنيع فور تأكيد الحجز · متابعة مباشرة عبر الواتساب',
      emptyTitle: 'سلة الحجز فارغة حالياً',
      emptyText: 'اكتشف تشكيلة طاولات الصالون بفتحة الكتب، المكعبات البسيطة، والأعمدة الخزفية المصنوعة على الطلب.',
      browseButton: 'تصفح الطاولات',
      groutLabel: 'الفواصل :',
      frameLabel: 'التشطيب والقاعدة :',
      notesLabel: 'ملاحظات :',
      depositTag: 'عربون 50%',
      balanceOnDispatch: 'الباقي عند الاستلام',
      totalValue: 'القيمة الإجمالية للطاولة',
      balanceDue: 'المبلغ المتبقي عند الاستلام',
      dueToday: 'المبلغ المطلوب للدفع الآن',
      checkoutButton: 'إتمام حجز الطاولة',
      guarantee: 'صناعة يدوية متقنة وتوصيل مضمون على موعد مسبق في كل تونس',
    },
    checkout: {
      header: 'تأكيد حجز الطاولة والطلب',
      subtitle: 'ورشة D creations · تونس',
      successTitle: 'تم تسجيل طلبكم وحجز دوركم في الورشة بنجاح !',
      successText: 'شكراً جزيلاً لاختياركم D creations! سيتصل بكم فريقنا هاتفياً أو عبر الواتساب لتأكيد موعد بدء التصنيع وموافاتكم بالصور.',
      estDispatch: 'الموعد التقديري لجاهزية الطاولة والتسليم',
      addressLabel: 'عنوان التوصيل في تونس',
      specsTitle: 'المواصفات المطلوبة',
      totalValue: 'المجموع الإجمالي',
      chargedToday: 'المبلغ المستحق الآن',
      balanceDue: 'المبلغ المتبقي عند التسليم',
      printReceipt: 'طباعة وصل الحجز',
      returnStore: 'العودة للمتجر',
      termsTitle: 'شروط التصنيع حسب الطلب',
      termsText: 'طاولتكم ستُصنع يدوياً بمواصفاتكم. مدة التصنيع التقريبية أسبوعان.',
      step1Title: '1. المعلومات الشخصية',
      fullName: 'الاسم واللقب',
      email: 'البريد الإلكتروني (لتلقي الوصل)',
      step2Title: '2. عنوان التوصيل داخل الجمهورية التونسية',
      address: 'الشارع، الإقامة أو نقطة دالة',
      city: 'المدينة / المعتمدية (المرسى، النصر، المنزه، الحمامات...)',
      stateGov: 'الولاية (تونس، أريانة، بن عروس، نابل، سوسة، صفاقس...)',
      postalCode: 'الرمز البريدي أو رقم الهاتف',
      step3Title: '3. طريقة التوصيل والشحن',
      shippingStandard: 'توصيل محمي وآمن في تونس',
      shippingStandardSub: 'صندوق خشبي مصفح لحماية الخزف مع ناقل متخصص للأثاث',
      shippingWhiteGlove: 'توصيل مع التركيب المنزلي VIP',
      shippingWhiteGloveSub: 'نقل وتركيب الطاولة في الغرفة أو الشرفة مع إزالة الصندوق',
      step4Title: '4. طريقة الدفع',
      payCard: 'تحويل بنكي / D17 / بطاقة بنكية',
      payCod: 'الدفع نقداً عند الاستلام والمعاينة',
      codTerms: 'ستدفع المبلغ نقداً لسائق التوصيل فور استلام الطاولة والتأكد من سلامتها وجودتها.',
      summaryTitle: 'ملخص الحجز والطلب',
      shippingCost: 'معلوم الشحن والتوصيل المحمي',
      submitButton: 'تأكيد حجز الطاولة',
      refundNote: 'فريق خدمة الحرفاء متاح طوال أيام الأسبوع عبر الهاتف والواتساب',
    },
    about: {
      kicker: 'قصة ورشة D creations',
      title: 'ثراء الخزف التونسي الأصيل بتصاميم وألوان تناسب كل فضاء.',
      subtitle: 'من المكعبات والأقواس المعاصرة المقصوصة بزاوية 45° إلى طاولات الطعام من خشب البلوط وطاولات الزليج للشرفات.',
      p1: 'في ورشة D creations، نبتكر أشكالاً وألواناً متجددة: طاولات بمستويين بلون الزمرد والأوكر، أقواس بلون العنابي والوردي، كونسول بلون الزعفران، وطاولات كوبالت وأبيض.',
      p2: 'حسب اختياركم، ننفذ الطاولات بحواف 45° نظيفة، أو بإطار خشب صلب متين، أو على قواعد حديد مطروق معالجة ضد رطوبة البحر.',
      p3: 'كل إبداعاتنا مغلفة بفواصل إيبوكسي تقنية مانعة للبقع تجعل التنظيف سهلاً والجمال يدوم لسنوات في الصالون والحديقة.',
      founderTitle: 'ورشة D creations',
      founderSub: 'تصميم خَزَف متعدّد الأنماط',
      p1Title: '1. وداعاً للبقع مع مادة الإيبوكسي',
      p1Text: 'الفواصل لا تسودّ ولا تتشقق، تقاوم القهوة والزيت والشمع وتنظف بمسحة خفيفة.',
      p2Title: '2. قص 45°، خشب صلب وحديد مطروق',
      p2Text: 'ثلاث تقنيات حرفية متقنة في ورشتنا لتناسب كل غرف المنزل والفضاءات الخارجية.',
      p3Title: '3. حرية الألوان والتفصيل حسب الطلب',
      p3Text: 'زمردي، كوبالت، زعفران، تيراكوتا، عنابي، مريمي أو كريمي: صمموا طاولتكم كما تحلمون.',
      artisanCorner: {
        kicker: 'ركن الحرفي · صناعة يدوية حسب الطلب',
        locationTag: 'نعسان · بن عروس 1135 · عمل يدوي أصيل',
        imageAlt: 'صورة محمد علي السعيدي، مؤسس ومصمم ورشة D | Creations',
        title: 'محمد علي السعيدي وحرفيّو الورشة',
        role: 'مؤسس ورشة D | Creations',
        bio1: 'انطلقت ورشتنا في نعسان من شغف بالخزف التونسي الأصيل والأثاث المعماري المعاصر، بعيداً عن التصنيع الآلي المتكرر. كل طاولة لدينا تبدأ بطلب خاص: اختيار ألوان المينا، تقطيع قطع الزليج والخزف بدقة متناهية، وتوزيع الهندسة بما يتلاءم تماماً مع أبعاد فضائكم.',
        bio2: 'سواء كانت طاولة زليج تقليدية في إطار خشب صلب، أو مكعباً معمارياً بقص 45°، أو طاولة عضوية منحوتة بالميكرو سمنت، تحمل كل قطعة بصمة يد الحرفي الذي رصفها وعزلها بمادة الإيبوكسي لتدوم سنوات طويلة.',
        fact1Label: 'نظام الورشة',
        fact1Value: 'صناعة على الطلب 100% · دون مخزون جاهز',
        fact2Label: 'التخصص',
        fact2Value: 'الزليج، الخزف بقص 45° والميكرو سمنت',
        fact3Label: 'الخط المباشر للورشة',
      },
    },
    footer: {
      brandDesc: 'ورشة تونسية متخصصة في صناعة وتفصيل الطاولات المكعبة والمعمارية المكسوة بمربعات الخزف اللامع على الطلب.',
      workshopAddress: 'الورشة : طريق الخليدية، شبدّة، نعسان 1135، بن عروس، تونس',
      workshopHours: 'استقبال الحرفاء وزيارة الورشة بموعد مسبق أو عبر الواتساب',
      tablesCol: 'طرازات الطاولات',
      aboutCol: 'D creations',
      newsletterTitle: 'أخبار الورشة والتشكيلات الجديدة',
      newsletterDesc: 'اشترك ليصلك جديد الورشة ونماذج الخزف الجديدة ومواعيد فتح الحجوزات.',
      newsletterPlaceholder: 'أدخل بريدك الإلكتروني...',
      subscribed: 'شكراً لك! تم تسجيل بريدك الإلكتروني.',
      copyright: 'جميع الحقوق محفوظة. طاولات خَزَف تونسية يدوية.',
      tag1: 'توصيل لكافة الـ 24 ولاية',
      tag2: 'عازل إيبوكسي مقاوم للبقع',
      tag3: 'حديد مطروق وخشب ممتاز',
    },
    blog: {
      kicker: 'مدونة الورشة',
      title: 'أخبار الورشة وأسرار الصنعة التونسية',
      description: 'اكتشف تقنيات الخزف في نابل، طرق العناية بأسطح الزليج وأحدث إبداعات ورشتنا.',
      all: 'الكل',
      readNote: 'قراءة المقال',
      by: 'بقلم',
      topics: 'المواضيع:',
      commentsTitle: 'التعليقات والآراء',
      leaveComment: 'اترك رسالة لحرفيينا',
      namePlaceholder: 'الاسم الكريم',
      commentPlaceholder: 'شاركونا رأيكم أو استفساركم حول هذا المقال...',
      postComment: 'نشر التعليق',
      commentSuccess: 'شكراً لكم! تم نشر تعليقكم في مدونة الورشة.',
      noComments: 'لا توجد تعليقات بعد. كن أول من يشاركنا رأيه!',
      close: 'إغلاق',
    },
    wishlist: {
      title: 'قائمة المفضلة',
      subtitle: 'طاولات الخزف التي نالت إعجابكم وحفظتموها',
      emptyTitle: 'قائمة المفضلة فارغة حالياً',
      emptyDesc: 'تصفح تشكيلة الطاولات وانقر على رمز القلب لحفظ الموديلات التي تعجبك.',
      browseCatalog: 'استكشاف التشكيلة',
      remove: 'حذف من المفضلة',
      configureAndOrder: 'تخصيص وحجز الطاولة',
      addedToast: 'تمت إضافة الطاولة إلى قائمة المفضلة !',
      removedToast: 'تم حذف الطاولة من قائمة المفضلة',
      itemCount: 'طاولة مسجلة',
      filterLabel: 'المفضلة',
      depositTag: 'عربون 50%',
      viewProduct: 'تفاصيل الطراز',
    },
    compare: {
      buttonAdd: 'مقارنة',
      buttonAdded: 'محدّد',
      trayTitle: 'مقارنة النماذج',
      trayLimitHint: 'اختر من 2 إلى 4 تصاميم',
      compareNow: 'مقارنة الآن',
      clearAll: 'مسح الكل',
      modalKicker: 'ملف المقارنة · ورشة D | Creations',
      modalTitle: 'مقارنة المواصفات جنباً إلى جنب',
      modalSubtitle: 'قارن المواد، الأبعاد، الألوان المتاحة وخيارات التفصيل حسب الطلب.',
      addModelPlaceholder: '+ إضافة طراز للمقارنة...',
      removeItem: 'إزالة',
      specColumn: 'المواصفة',
      priceRow: 'السعر والعربون',
      depositLabel: 'عربون 50% :',
      ratingRow: 'تقييم الحرفاء',
      reviewsUnit: 'تقييم',
      leadTimeRow: 'مدة الصنع والدفعة',
      slotsRow: 'الأماكن المتبقية',
      slotsUnit: 'أماكن متاحة',
      materialsRow: 'المواد والهيكل',
      dimensionsRow: 'الأبعاد والقياس',
      careRow: 'العناية والمقاومة',
      originRow: 'بلد ومكان الصنع',
      colorsRow: 'الألوان المتوفرة (انقر للمعاينة)',
      groutRow: 'خيارات الفواصل / الطلاء',
      frameRow: 'خيارات القاعدة والإطار',
      configureBtn: 'تخصيص وطلب',
      bestValueTag: 'الأقل سعراً',
      topRatedTag: 'الأعلى تقييماً',
      emptyTitle: 'لم يتم تحديد أي تصميم',
      emptyDesc: 'اختر حتى 4 طاولات أو مرايا من المعرض لمقارنة مواصفاتها وخيارات التخصيص.',
      maxReachedToast: 'يمكنك مقارنة 4 طرازات كحد أقصى في نفس الوقت.',
      addedToast: 'تمت الإضافة إلى المقارنة',
      removedToast: 'تمت الإزالة من المقارنة',
    },
  },
};
