import type { Prices } from '@/shared/types/types';
import type { Price } from '@commercetools/platform-sdk';

import { FRACTION_DIGITS } from '@/services/ecommerce-api/data/constants';

import { calculatePriceDecimals } from '@/utils/numbers/calculatePriceDecimals';

export function getProductPrices(priceObj: null | Price | undefined): Prices {
  if (!priceObj) {
    return {
      price: 0,
      discount: 0,
      discountedPrice: 0
    };
  }

  const { value, discounted: discountedObj } = priceObj;

  const { centAmount } = value;
  const { centAmount: centAmountDis } = discountedObj ? discountedObj.value : { centAmount: 0 };

  const price = calculatePriceDecimals(centAmount, FRACTION_DIGITS);
  const discount = centAmountDis ? Math.round(100 - (centAmountDis / centAmount) * 100) : 0;
  const discountedPrice = centAmountDis ? calculatePriceDecimals(centAmountDis, FRACTION_DIGITS) : 0;

  return {
    price,
    discount,
    discountedPrice
  };
}
