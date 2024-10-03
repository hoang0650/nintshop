import { Review } from "./review";

export interface Product {
    _id: string;
    id: number;
    name: string;
    description: string;
    price: number;
    quantity:number;
    variants: [{
      name: String,
      size: String,
      color: String,
      stock: Number
  }],
    image?: string[];
    reviews: Review[];  // Kết nối với review
  }