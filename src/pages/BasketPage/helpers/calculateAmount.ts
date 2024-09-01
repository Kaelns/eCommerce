import { LineItem } from '@commercetools/platform-sdk';
import { IBasketProducts } from '@/shared/types';

export function calculateQuantity(products: IBasketProducts | LineItem[]): number {
  const arrToReduce = Array.isArray(products) ? products : Object.values(products);
  const finalQuantity = arrToReduce.reduce((acc, productData) => acc + productData.quantity, 0);
  return +finalQuantity.toFixed(0);
}
