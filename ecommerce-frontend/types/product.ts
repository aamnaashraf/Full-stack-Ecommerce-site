export interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}
