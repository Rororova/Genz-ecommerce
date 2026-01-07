export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  features: string[];
  material: string;
  dimensions: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Moderna Lounge Chair",
    price: 899,
    description: "A perfect blend of mid-century modern design and contemporary comfort. Features premium upholstery and solid wood legs.",
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    features: [
      "Premium velvet upholstery",
      "Solid oak wood legs",
      "High-density foam cushioning",
      "Weight capacity: 300 lbs",
      "Easy assembly required"
    ],
    material: "Velvet & Oak Wood",
    dimensions: "32\" W x 34\" D x 30\" H"
  },
  {
    id: 2,
    name: "Executive Office Chair",
    price: 1299,
    description: "Ergonomically designed for all-day comfort. Features adjustable lumbar support and breathable mesh back.",
    image: "https://images-cdn.ubuy.co.in/63601dfdf8ff2b7e943c0e45-managerial-and-executive-office.jpg",
    features: [
      "Adjustable lumbar support",
      "Breathable mesh back",
      "Pneumatic height adjustment",
      "360-degree swivel",
      "5-year warranty"
    ],
    material: "Mesh & Aluminum",
    dimensions: "26\" W x 26\" D x 42\" H"
  },
  {
    id: 3,
    name: "Scandinavian Dining Chair",
    price: 349,
    description: "Clean lines and minimalist design define this Scandinavian-inspired dining chair. Perfect for modern dining spaces.",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    features: [
      "Solid beech wood construction",
      "Contoured seat for comfort",
      "Scratch-resistant finish",
      "Stackable design",
      "Set of 2 available"
    ],
    material: "Beech Wood",
    dimensions: "18\" W x 20\" D x 32\" H"
  },
  {
    id: 4,
    name: "Luxury Recliner",
    price: 1899,
    description: "Ultimate relaxation with premium leather and motorized reclining mechanism. Built-in USB charging ports.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.furnituredealer.net%2Fimg%2Fproducts%2Fcatnapper%2Fcolor%2Fsiesta%2520176%2520by%2520catnapper_1760-7%2520porcini-b3.jpg&f=1&nofb=1&ipt=5c72c85cfc5f971028878ae5d9ee46e208204cc353db20abb811e5d24e3218a5",
    features: [
      "Top-grain leather",
      "Motorized reclining",
      "Built-in USB ports",
      "Memory foam padding",
      "10-year frame warranty"
    ],
    material: "Leather & Steel",
    dimensions: "38\" W x 40\" D x 42\" H"
  },
  {
    id: 5,
    name: "OG Cuck Chair",
    price: 649,
    description: "For the lovers of classic, our most popular product, the OG chair",
    image: "https://substackcdn.com/image/fetch/$s_!zz-M!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1b316008-6215-4fc8-a365-dcbcd8b8d39f_640x652.jpeg",
    features: [
      "Unique curved design",
      "Plush cushioning",
      "Stain-resistant fabric",
      "Solid hardwood frame",
      "Color options available"
    ],
    material: "Fabric & Hardwood",
    dimensions: "30\" W x 32\" D x 35\" H"
  },
  {
    id: 6,
    name: "Industrial Bar Stool",
    price: 279,
    description: "Industrial chic meets modern functionality. Adjustable height and footrest for maximum comfort at any counter.",
    image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg",
    features: [
      "Adjustable height mechanism",
      "360-degree swivel",
      "Powder-coated steel frame",
      "Non-marking rubber base",
      "Easy to clean surface"
    ],
    material: "Steel & Wood",
    dimensions: "16\" W x 16\" D x 42\" H"
  },
  {
    id: 7,
    name: "Velvet Wingback Chair",
    price: 749,
    description: "Classic elegance with a modern twist. The iconic wingback design provides exceptional neck and shoulder support.",
    image: "https://cdn20.pamono.com/p/s/2/0/2059378_l8p0mxmfqz/vintage-red-velvet-wingback-chair-1920s.jpg",
    features: [
      "Luxurious velvet upholstery",
      "Wooden frame construction",
      "Wing design for support",
      "Rolled arms",
      "Traditional style"
    ],
    material: "Velvet & Hardwood",
    dimensions: "34\" W x 32\" D x 38\" H"
  },
  {
    id: 8,
    name: "Gaming Chair Pro",
    price: 549,
    description: "Designed for extended gaming sessions with maximum comfort and style. Features racing-inspired design.",
    image: "https://myimgs.org/storage/images/12556/Screenshot 2025-11-30 183251.png",
    features: [
      "High-density foam cushioning",
      "Adjustable armrests",
      "Tilt and recline mechanism",
      "Base 360-degree swivel",
      "Ergonomic lumbar support"
    ],
    material: "PU Leather & Steel",
    dimensions: "27\" W x 27\" D x 43\" H"
  },
  {
    id: 9,
    name: "Minimalist Garden Chair",
    price: 299,
    description: "Weather-resistant outdoor seating with clean, modern aesthetics. Perfect for patios and terraces.",
    image: "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fminimalist-store.com%2Fwp-content%2Fuploads%2Fcloud-chair-emerald-green-velvet-with-black-conical-metal-legs-100800250-01-main.png&f=1&nofb=1&ipt=e2f5f611bbf4bb5e2c983ffa6db1a59aecb2c152ff18724ab821031a18ab2ae8",
    features: [
      "Weather-resistant material",
      "Lightweight aluminum frame",
      "UV-resistant finish",
      "Easy to clean",
      "Stackable design"
    ],
    material: "Aluminum & Fabric",
    dimensions: "24\" W x 28\" D x 34\" H"
  },
  {
    id: 10,
    name: "Vintage Leather Armchair",
    price: 1199,
    description: "Authentic vintage design with premium leather upholstery. A timeless centerpiece for any sophisticated interior.",
    image: "https://dovetaileddoublestitched.com.au/cdn/shop/files/Apollo-Vintage-Leather-Wingback-Armchair-2_cb56c58d_800x.jpg?v=1739500290",
    features: [
      "Genuine leather upholstery",
      "Aged patina finish",
      "Solid wood frame",
      "Deep seated comfort",
      "Brass nail head trim"
    ],
    material: "Leather & Oak Wood",
    dimensions: "36\" W x 36\" D x 32\" H"
  },
  {
    id: 11,
    name: "Ergonomic Task Chair",
    price: 479,
    description: "Professional-grade task chair with advanced ergonomic features for long working hours.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.digitaltrends.com%2Fwp-content%2Fuploads%2F2024%2F01%2FHforesty-ergonomic-mesh-office-chair-e1704766398869.jpg&f=1&nofb=1&ipt=4ec5377846f33730f994b1c8df7edf3433f60946bce088401909be5877e56bfd",
    features: [
      "Full lumbar support",
      "Adjustable height and tilt",
      "Breathable fabric",
      "Padded armrests",
      "5-year warranty"
    ],
    material: "Fabric & Steel",
    dimensions: "25\" W x 25\" D x 40\" H"
  },
  {
    id: 12,
    name: "Luxury Ottoman Pair",
    price: 599,
    description: "Sophisticated ottomans that complement any seating arrangement. Includes set of two.",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmobileimages.lowes.com%2Fproductimages%2Faaeb182d-cd1a-4c31-aa5d-e7a5bfc02b00%2F64288572.jpg&f=1&nofb=1&ipt=11a7f7ac6485d67e795262c0e3bef4c0f733a6c0df83124a21c8cf4510000f5b",
    features: [
      "Premium fabric upholstery",
      "Hidden storage compartment",
      "Solid wood frame",
      "Supportive cushioning",
      "Set of 2 included"
    ],
    material: "Fabric & Hardwood",
    dimensions: "24\" W x 24\" D x 18\" H"
  }
];
