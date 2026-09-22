// src/data/amazonAds.js

export const AMAZON_ADS = [
  {
    title: "realme 16 Pro 5G",
    productName: "realme 16 Pro 5G Smartphone 12GB+256GB Gold | 7000mAh Battery, 80W SuperVOOC, 6.78-Inch Screen, 144Hz AMOLED Display, Rear 200MP+Front 50MP Camera, MediaTek 7300-Max, IP69",
    productImage: "https://m.media-amazon.com/images/I/41RUplrY0UL.jpg",
    affiliateUrl: "https://amzn.to/47bi1Dr",
    price: "Check on Amazon"
  },
  {
    title: "realme GT 7T",
    productName: "realme GT 7T (IceSense Blue,12GB+256GB)| MediaTek D8400 MAX | Strongest Battery Combo 7000mAh + 120W | AI 4K 60FPS Travel Camera | 360° Cooling IceSense Design with Graphene | 6000 nits Display",
    productImage: "https://m.media-amazon.com/images/I/41hecXWNt3L.jpg",
    affiliateUrl: "https://amzn.to/3VIUCXs",
    price: "Check on Amazon"
  },
  {
    title: "ASUS Vivobook 16 (2026)",
    productName: "ASUS Vivobook 16 (2026),Intel Core Ultra 5 225H,Intel iGPU,16GB RAM,512GB SSD,FHD+,16'(40 cm),Windows 11 Home,M365 Basic(1 Year),Office 2024,Quiet Blue,1.88 kg,X1607CA-MB349WS,Thin & Light Laptop",
    productImage: "https://m.media-amazon.com/images/I/415C4MJEHmL.jpg",
    affiliateUrl: "https://amzn.to/4rsqcVh",
    price: "Check on Amazon"
  },
  {
    title: "OnePlus 13 Case",
    productName: "Nillkin Shockproof Case for OnePlus 13 One Plus 13 (1+13) (6.82' Inch) Super Frosted Shield Pro Hard Back Soft Border (PC + TPU) Shock Absorb Black Color",
    productImage: "https://m.media-amazon.com/images/I/31vqGV0BCtL.jpg",
    affiliateUrl: "https://amzn.to/46yK8MN",
    price: "Check on Amazon"
  },
  {
    title: "Samsung Galaxy S26 Ultra 5G",
    productName: "Samsung Galaxy S26 Ultra 5G (Cobalt Violet, 12GB RAM, 256GB Storage) with Built-in Privacy Display, AI Phone, Photo Assist, Creative Studio, 200MP Camera, 5000mAh Battery and Snapdragon 8 Elite Gen 5",
    productImage: "https://m.media-amazon.com/images/I/41lljoZVf0L.jpg",
    affiliateUrl: "https://amzn.to/4ykZC2U",
    price: "Check on Amazon"
  },
];

// Helper function to pick a random ad
export const getRandomAmazonAd = () => {
  const randomIndex = Math.floor(Math.random() * AMAZON_ADS.length);
  return AMAZON_ADS[randomIndex];
};