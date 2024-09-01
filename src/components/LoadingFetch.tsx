import { Box } from '@mui/material';
import { Stack, StackProps } from '@mui/system';
import { PropsWithChildren, SxStyles } from '@/shared/types';
import { ErrorComponent } from '@/components/ErrorComponent';
import { convertSxToArr } from '@/utils/convertSxToArr';
import { sxMixins } from '@/features/MuiTheme/mixins';
import imageError from '@/assets/error2.png';

const sxStyles: SxStyles = {
  container: {
    position: 'relative'
  },
  skeleton: {
    position: 'absolute',
    bgcolor: 'common.background',
    inset: 0,
    zIndex: 1000,
    ...sxMixins.animation()
  },
  childrenWrapper: {
    width: 1,
    ...sxMixins.animation()
  }
};

interface ILoadingFetchProps extends StackProps {
  error: string;
  isLoading: boolean;
  Skeleton: (props: StackProps) => React.ReactNode;
}

export function LoadingFetch({
  children,
  error,
  isLoading,
  Skeleton,
  sx = {},
  ...props
}: PropsWithChildren<ILoadingFetchProps>): React.ReactNode {
  return error ? (
    <ErrorComponent message={error} src={imageError} alt="error" />
  ) : (
    <Box sx={sxStyles.container} {...props}>
      <Skeleton sx={[sxStyles.skeleton, !isLoading && sxMixins.invisible]} />
      <Stack sx={[sxStyles.childrenWrapper, isLoading && sxMixins.invisible, ...convertSxToArr(sx)]}>{children}</Stack>
    </Box>
  );
}
