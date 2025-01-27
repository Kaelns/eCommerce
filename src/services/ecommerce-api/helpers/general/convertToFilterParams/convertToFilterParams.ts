import type { IFilterState } from '@/pages/CatalogPage/hooks/filterReducer/types';
import { LIMIT_ON_PAGE } from '@/services/ecommerce-api/data/constants';
import { convertSort, convertSearch, convertPrice, convertColors } from '@/services/ecommerce-api/helpers/general/convertToFilterParams/helpers';
import type { QueryProductsArgs } from '@/shared/types/types';

//  FIXME Delete if not used. Maybe it will be replaced by zod

export function convertToFilterParams(filterState: Partial<IFilterState>): QueryProductsArgs {
  const sort = convertSort(filterState.sort);
  const search = convertSearch(filterState.search);

  const price = convertPrice(filterState.price);
  const colors = convertColors(filterState.color);
  // const category = convertCategories(filterState.categoryKey);

  const offset = ((filterState.page ?? 1) - 1) * LIMIT_ON_PAGE;
  const sortObj = sort ? { sort } : {};
  const filtersQuery = [colors, /* category, */ price].filter(Boolean);

  const queryArgs = {
    'filter.query': filtersQuery,
    ...search,
    ...sortObj,
    offset
  };

  return queryArgs;
}
