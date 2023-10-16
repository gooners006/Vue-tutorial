import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Product = {
  value: any;
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export const useProductStore = defineStore('productData', () => {
  const initialProducts: Product[] = [];
  // ---STATE---
  const productData = ref(initialProducts);

  // ---ACTION---
  const setProductData = (data: Product[]) => {
    productData.value = data;
  };
  const clearProductData = () => {
    productData.value = initialProducts;
  };

  return {
    productData,
    setProductData,
    clearProductData,
  };
});
