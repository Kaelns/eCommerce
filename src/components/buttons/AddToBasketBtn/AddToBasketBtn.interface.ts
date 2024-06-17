import { ButtonProps } from '@mui/material';

export interface IAddToBasketProps extends ButtonProps {
  isIconBtn?: boolean;
  productId: string;
  lineItemId: string;
  basketIconStyles?: string;
  progressIconStyles?: string;
}

export interface IUseAddToBasket {
  isInCart: boolean;
  isDisabled: boolean;
  addToBasket: (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}
