import { Review } from "./review";

export interface Product {
    _id: string;
    name: string;
    type: string;
    description: string;
    price: number;
    quantity:number;
    variants: [{
      size: String,
      color: String,
      stock: Number
  }],
    image?: string[];
    reviews: Review[];  // Kết nối với review
  }