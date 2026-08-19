import { tesloApi } from '@/api/tesloApi';
import { getProductImageAction } from './get-product-image.action';
import type { Product } from '../interfaces/product.Interface';

export const getProductById = async (productId: string): Promise<Product> => {
  // Implement the logic to get a product by its ID
  if (productId === 'create') {
    return {
      id: '',
      title: '',
      description: '',
      images: [],
      price: 0,
      sizes: [],
      slug: '',
      stock: 0,
      tags: [],
      gender: '' as any,
      user: {} as any,
    };
  }

  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`);
    return {
      ...data,
      images: data.images.map(getProductImageAction),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch product by ID');
  }
};
