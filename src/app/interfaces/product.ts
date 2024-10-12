import { Variant } from "./variant";

export interface Product {
  _id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  description: string;
  image: string[];
  variants: Variant[];
}