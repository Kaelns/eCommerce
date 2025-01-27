import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material';
import type { PropsWithChildren, SxPropsObj } from '@/shared/types/types';
import { ButtonVariant } from '@/shared/data/enums';
import { convertSxToArr } from '@/utils/arrays/convertSxToArr';

const sxBtn: SxPropsObj = { textTransform: 'none' };

export function CasualBtn({ children, variant = ButtonVariant.TEXT, sx = {}, ...props }: PropsWithChildren<ButtonProps>): React.ReactNode {
  return (
    <Button variant={variant} sx={[sxBtn, ...convertSxToArr(sx)]} {...props}>
      {children}
    </Button>
  );
}
