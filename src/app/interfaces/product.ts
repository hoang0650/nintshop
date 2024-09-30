import { Review } from "./review";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    variants: [{
      size: String,
      color: String,
      stock: Number
  }],
    image?: string;
    reviews: Review[];  // Kết nối với review
  }