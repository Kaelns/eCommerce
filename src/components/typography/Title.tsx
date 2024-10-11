import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';
import type { PropsWithChildren } from '@/shared/types';

export function Title({ children, variant = 'h5', ...props }: PropsWithChildren<TypographyProps>): React.ReactNode {
  return (
    <Typography variant={variant} fontWeight="bold" {...props}>
      {children}
    </Typography>
  );
}
