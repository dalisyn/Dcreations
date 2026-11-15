export interface Product {
  id: string;
  name: string;
  category: 'coffee' | 'dining' | 'bistro' | 'cube' | 'organic' | 'mirrors' | 'bespoke';
  categoryLabel: string;
  price: number;
  depositPrice: number; // 50% deposit option
  originalPrice?: number;
  description: string;
  leadTime: string; // e.g. "2-3 weeks"
  productionBatch: string; // e.g. "November Build Queue"
  customizationOptions: {
    groutColors: { id: string; name: string; hex: string }[];
    frameFinishes: { id: string; name: string; description: string }[];
  };
  details: {
    materials: string;
    dimensions: string;
    origin: string;
    burnTimeOrCare: string;
    batchNumber: string;
    inStock: boolean; // accepts pre-orders
    slotsRemaining: number; // limited pre-order workshop slots per batch
  };
  image: string;
  additionalImages?: string[];
  colorFamily?: 'green' | 'blue' | 'terracotta' | 'yellow' | 'burgundy' | 'neutral';
  colorSwatches?: { name: string; hex: string }[];
  colorVariations?: {
    id: string;
    nameFr: string;
    nameAr: string;
    hex: string;
    secondaryHex?: string;
    previewImage?: string;
    noteFr?: string;
    noteAr?: string;
  }[];
  rating: number;
  reviewCount: number;
  tags: string[];
  featured?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  avatar?: string;
  location?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  tags?: string[];
}

export interface BlogComment {
  id: string;
  author: string;
  date: string;
  comment: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  quote?: {
    text: string;
    attribution: string;
  };
  category: 'Company News' | 'Behind the Craft' | 'Seasonal Notes' | 'Studio Journal';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  comments: BlogComment[];
}

export interface PreOrderCustomization {
  tileColor?: string;
  groutColor: string;
  frameFinish: string;
  customNotes?: string;
  paymentType: 'full' | 'deposit'; // Pay full or 50% pre-order deposit
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization: PreOrderCustomization;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'cod' | 'apple_pay';
  cardDetails?: {
    cardNumber: string;
    expiry: string;
    cvc: string;
  };
  orderNotes?: string;
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  estimatedCompletionDate: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  amountDueNow: number;
  balanceDueOnDispatch: number;
  details: CheckoutDetails;
  isPreOrder: boolean;
}
