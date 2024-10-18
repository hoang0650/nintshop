import { Variant } from "./variant";

export interface Product {
  _id: string;
  name: string;
  type: string;
  price: number;
  discountPrice?: Number,
  quantity: number;
  description: string;
  tiktokAffiliateLink?: string;
  sold?: number;
  image: string[];
  variants: Variant[];
  
}