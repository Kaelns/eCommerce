import type { ICategories } from '@/services/ecommerce/interface';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const INIT_CATEGORIES: ICategories = {
  categories: [],
  categoriesObj: {},
  categoriesTree: []
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: INIT_CATEGORIES,
  selectors: {
    selectCategories: (state) => state.categories,
    selectCategoriesObj: (state) => state.categoriesObj,
    selectCategoriesTree: (state) => state.categoriesTree
  },
  reducers: {
    setCategories(state, action: PayloadAction<{ receivedCategories: ICategories }>) {
      state.categories = action.payload.receivedCategories.categories;
      state.categoriesObj = action.payload.receivedCategories.categoriesObj;
      state.categoriesTree = action.payload.receivedCategories.categoriesTree;
    }
  }
});
