export interface CartItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  variants?: {
    size: string;
    color: string;
  };
  hasInsurance?: boolean;  // Thêm thuộc tính mới với dấu ? để làm optional
  insurancePrice?: number; // Thêm thuộc tính mới với dấu ? để làm optional
}
