import { IFilterState, IAction } from '@/pages/CatalogPage/hooks/filterReducer/filterReducer.interface';

export interface IRangeSliderProps {
  filterReducerHook: [IFilterState, React.Dispatch<IAction>];
}
