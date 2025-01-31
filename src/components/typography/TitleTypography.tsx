import type { TypographyProps } from '@mui/material';
import type { PropsWithChildren } from '@/shared/types/types';

import { Typography } from '@mui/material';

export function TitleTypography({ children, variant = 'h5', ...props }: PropsWithChildren<TypographyProps>): React.ReactNode {
  return (
    <Typography variant={variant} fontWeight="bold" {...props}>
      {children}
    </Typography>
  );
}
