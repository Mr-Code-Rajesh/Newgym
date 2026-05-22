export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
  benefits: string[];
  specs: Record<string, string>;
  isHot?: boolean;
  discount?: number; // percentage
}

export const products: Product[] = [
  {
    id: 1,
    slug: "whey-protein",
    title: "Apex Hydrolyzed Whey Protein",
    price: 2499,
    category: "Supplements",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=800&auto=format&fit=crop",
    description: "Premium ultra-filtered hydrolyzed whey protein designed for rapid protein synthesis, immediate amino acid absorption, and accelerated muscle tissue repair.",
    rating: 4.9,
    reviewsCount: 142,
    benefits: [
      "25g Hydrolyzed Whey Protein per serving",
      "5.5g BCAA load to trigger muscle recovery",
      "Zero added sugars, gluten-free, low carb",
      "Enzyme-enhanced blend for seamless digestion"
    ],
    specs: {
      "Serving Size": "30g",
      "Servings Per Container": "33",
      "Flavor": "Double Rich Chocolate",
      "Weight": "1 kg"
    },
    isHot: true,
    discount: 10
  },
  {
    id: 2,
    slug: "mass-gainer",
    title: "Apex Hypertrophy Mass Gainer",
    price: 2999,
    category: "Supplements",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=800&auto=format&fit=crop",
    description: "High-density calorie booster loaded with complex carbohydrates and premium proteins to assist hardgainers in breaking plateaus and building serious physical mass.",
    rating: 4.7,
    reviewsCount: 98,
    benefits: [
      "1250 calories and 50g protein per load",
      "250g energy-sustaining carbohydrates",
      "Creatine and glutamine enhanced muscle support",
      "Enriched with 25 essential vitamins & minerals"
    ],
    specs: {
      "Serving Size": "334g",
      "Servings Per Container": "8",
      "Flavor": "Vanilla Ice Cream",
      "Weight": "2.7 kg"
    }
  },
  {
    id: 3,
    slug: "pre-workout",
    title: "Apex Nitro Pre-Workout v3",
    price: 1899,
    category: "Supplements",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=800&auto=format&fit=crop",
    description: "Explosive energy and laser focus matrix. Provides massive cellular pump, enhanced vascularity, and high-performance neural triggers for maximum heavy lifting capacity.",
    rating: 4.8,
    reviewsCount: 174,
    benefits: [
      "3.2g Beta-Alanine for lactic acid buffering",
      "6g L-Citrulline Malate for extreme vascular pumps",
      "350mg Caffeine anhydrous for high energy levels",
      "Nootropics added for laser cognitive focus"
    ],
    specs: {
      "Serving Size": "10.5g",
      "Servings Per Container": "30",
      "Flavor": "Sour Blue Raspberry",
      "Weight": "315g"
    },
    isHot: true
  },
  {
    id: 4,
    slug: "creatine-monohydrate",
    title: "Apex Micronized Creatine",
    price: 1299,
    category: "Supplements",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    description: "Pure, pharmaceutical-grade micronized creatine monohydrate. Increases ATP regeneration, muscular power outputs, cellular hydration, and absolute strength thresholds.",
    rating: 4.9,
    reviewsCount: 231,
    benefits: [
      "100% Pure Micronized Creatine Monohydrate",
      "No fillers, additives, or artificial flavors",
      "Rapid mixability and optimal digestion",
      "Supports power outputs and explosive speed"
    ],
    specs: {
      "Serving Size": "3g",
      "Servings Per Container": "83",
      "Flavor": "Unflavored",
      "Weight": "250g"
    },
    discount: 15
  },
  {
    id: 5,
    slug: "gym-gloves",
    title: "Apex Carbon Grip Gym Gloves",
    price: 899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
    description: "Heavy-duty gym training gloves featuring a carbon fiber grip palm overlay, built-in wrist support wraps, and high ventilation mesh backing for maximum comfort.",
    rating: 4.6,
    reviewsCount: 88,
    benefits: [
      "Double reinforced carbon fiber grip panels",
      "Integrated 18-inch adjustable wrist wrap",
      "Ultra-breathable micro-mesh fabric",
      "Pull tabs for easy glove removal after training"
    ],
    specs: {
      "Material": "Carbon Fiber & Neoprene",
      "Sizes Available": "S, M, L, XL",
      "Color": "Stealth Black",
      "Weight": "150g"
    }
  },
  {
    id: 6,
    slug: "resistance-bands",
    title: "Apex Heavy-Duty Tension Bands",
    price: 1199,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=800&auto=format&fit=crop",
    description: "Elite 5-tier natural latex resistance tube band system, equipped with steel climbing clips, cushioned safety handles, and door anchors for total body home conditioning.",
    rating: 4.7,
    reviewsCount: 112,
    benefits: [
      "5 stackable bands ranging from 10lbs to 50lbs",
      "100% natural snap-resistant Malaysian latex",
      "Steel carabiners for safety and versatility",
      "Includes neoprene handles, door anchor, and travel bag"
    ],
    specs: {
      "Set Contents": "5 Bands, 2 Handles, 2 Ankle Straps, 1 Door Anchor",
      "Max Resistance": "150 lbs (Stacked)",
      "Material": "Natural Latex & Steel Clamps",
      "Case": "Nylon Carry Bag"
    }
  },
  {
    id: 7,
    slug: "shaker-bottle",
    title: "Apex Leakproof Shaker Pro",
    price: 699,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1593095946761-d7790e53a232?q=80&w=800&auto=format&fit=crop",
    description: "High-capacity BPA-free shaker bottle featuring an internal surgical-grade mixing spring, a dual-lock leakproof cap, and integrated stackable capsule and powder compartments.",
    rating: 4.8,
    reviewsCount: 156,
    benefits: [
      "3-in-1 design with capsule organizer and powder cup",
      "BPA and Phthalate-free Eastman Tritan polymer",
      "Locking cap loop with measurement metrics side grid",
      "Surgical steel blender spring included"
    ],
    specs: {
      "Capacity": "700ml (Main Compartment)",
      "Material": "Eastman Tritan BPA-Free Plastic",
      "Leakproof": "Yes",
      "Color": "Transparent Red / Black Cap"
    }
  },
  {
    id: 8,
    slug: "dumbbell-set",
    title: "Apex Cast Iron Hex Dumbbell Set",
    price: 3499,
    category: "Gear",
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=800&auto=format&fit=crop",
    description: "Premium heavy-duty cast iron hex dumbbell set featuring high-friction knurled ergonomic chrome handles, rubberized quiet casing, and anti-roll hexagon base structures.",
    rating: 4.9,
    reviewsCount: 76,
    benefits: [
      "Anti-roll hex design protects gym floors",
      "Ergonomic contoured chrome steel handle grips",
      "Thick premium rubber casing reduces noise",
      "Rust-proof zinc coating for absolute longevity"
    ],
    specs: {
      "Total Weight": "20 kg (10kg x 2 Dumbbells)",
      "Material": "Cast Iron & Vulcanized Rubber",
      "Grip Style": "Medium Knurl Chrome",
      "Shape": "Hexagonal"
    },
    isHot: true,
    discount: 5
  },
  {
    id: 9,
    slug: "gym-bag",
    title: "Apex Tactical Duffle Gym Bag",
    price: 1999,
    category: "Gear",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    description: "Stealth military-grade duffle gym bag, optimized with water-resistant fabric, a separate ventilated shoes section, dry/wet separation partitions, and modular tactical webbing.",
    rating: 4.7,
    reviewsCount: 119,
    benefits: [
      "High-grade waterproof ballistic nylon",
      "Dedicated ventilated sneaker tunnel",
      "Dry/Wet split pocket for used workout apparel",
      "Multiple interior organizer pouches and key hook"
    ],
    specs: {
      "Capacity": "40 Liters",
      "Material": "1000D Ballistic Nylon",
      "Dimensions": "20 x 11 x 10 inches",
      "Waterproof": "IPX4 Water-Resistant"
    }
  },
  {
    id: 10,
    slug: "lifting-belt",
    title: "Apex Pro Leather Lifting Belt",
    price: 1599,
    category: "Gear",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=800&auto=format&fit=crop",
    description: "4-inch wide premium core dual-prong cowhide leather weightlifting powerlifting belt. Engineered to sustain absolute intra-abdominal pressure during squats and deadlifts.",
    rating: 4.9,
    reviewsCount: 145,
    benefits: [
      "4-inch width for maximum back and abdominal support",
      "10mm thickness premium cowhide leather core",
      "Dual-prong heavy-duty steel buckle closure",
      "Contoured lumbar backing with soft suede interior lining"
    ],
    specs: {
      "Thickness": "10mm",
      "Width": "4 inches",
      "Material": "Premium Suede Leather & Steel Buckle",
      "Size Range": "Waist sizes 30 - 40 inches"
    },
    isHot: true,
    discount: 10
  }
];
