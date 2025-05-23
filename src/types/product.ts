// app/types/product.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  image?: string;
  images?: string[];
  description?: string;
  category: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
  oldPrice?: number;
};
