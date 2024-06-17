import { useState, useContext, useEffect } from 'react';
import { Severity } from '@/components/AlertText/AlertText.interface';
import { AlertTextContext } from '@/context/AlertTextContext/AlertTextContext';
import { manageCartCatch } from '@/services/helpers/cartHelpers/manageCart/manageCartCatch';
import { ManageCart } from '@/services/helpers/cartHelpers/manageCart/manageCart.interface';
import { IUseAddToBasket } from '@/components/buttons/AddToBasketBtn/AddToBasketBtn.interface';

export function useAddToBasketBtn(lineItemId: string): IUseAddToBasket {
  const [isInCart, setIsInCart] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { handleOpenAlert } = useContext(AlertTextContext);

  useEffect(() => {
    if (lineItemId) {
      setIsInCart(true);
    }
  }, [lineItemId]);

  const addToBasket =
    (id: string) =>
    async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
      event.preventDefault();
      event.stopPropagation();

      if (!isDisabled) {
        setIsDisabled(true);
        const error = isInCart
          ? await manageCartCatch(ManageCart.REMOVE, lineItemId)
          : await manageCartCatch(ManageCart.ADD, id);
        if (error) {
          handleOpenAlert(error, Severity.ERROR);
        } else {
          setIsInCart((prev) => !prev);
        }
        setIsDisabled(false);
      }
    };

  return { isInCart, isDisabled, addToBasket };
}
