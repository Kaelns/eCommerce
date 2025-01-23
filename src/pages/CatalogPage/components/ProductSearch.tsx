import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import type { InputBaseProps, SxProps } from '@mui/material';
import { Box, IconButton, InputAdornment, InputBase, Stack } from '@mui/material';
import { useContext } from 'react';
import type { Theme } from '@mui/system';
import { FilterReducerContext } from '@/context/FilterReducerContext/FilterReducerContext';
import type { InputReactEvent, SxStyles } from '@/shared/types/types';
import { FilterState } from '@/pages/CatalogPage/hooks/filterReducer/filterReducer.enum';
import { convertSxToArr } from '@/utils/convert/convertSxToArr';
import { sxMixins } from '@/shared/data/mui-mixins';

const sxStyles: SxStyles = {
  search: {
    position: 'relative',
    ml: 0,
    boxShadow: 1,
    borderRadius: 1,
    ...sxMixins.animation(),
    ...sxMixins.mediaHover({
      bgcolor: 'var(--color-primary-transparent)'
    })
  },
  iconWrapper: {
    p: 0.5,
    height: 1,
    position: 'absolute',
    pointerEvents: 'none'
  },
  input: {
    width: 1,
    p: 1,
    pl: 5
  }
};

interface ISearchProps extends InputBaseProps {
  setIsSearchInFocus: React.Dispatch<React.SetStateAction<boolean>>;
  sxContainer?: SxProps<Theme>;
}

export function ProductSearch({ setIsSearchInFocus, sx = {}, sxContainer = {}, ...props }: ISearchProps): React.ReactNode {
  const { filterState, dispatchFilterState } = useContext(FilterReducerContext);

  const handleOnFocus = (): void => {
    setIsSearchInFocus(true);
  };

  const handleBlur = (): void => {
    setIsSearchInFocus(false);
  };

  const handleSearch = (e: InputReactEvent): void => {
    dispatchFilterState({ type: FilterState.SEARCH, payload: e.target.value });
  };

  const handleClearSearch = (): void => {
    dispatchFilterState({ type: FilterState.SEARCH, payload: '' });
  };

  return (
    <Box sx={[sxStyles.search, ...convertSxToArr(sxContainer)]}>
      <Stack alignItems="center" justifyContent="center" sx={sxStyles.iconWrapper}>
        <SearchIcon fontSize="small" />
      </Stack>

      <InputBase
        value={filterState.search}
        placeholder="Search…"
        onBlur={handleBlur}
        onFocus={handleOnFocus}
        onChange={handleSearch}
        endAdornment={
          <InputAdornment position="end" component={IconButton} disabled={!filterState.search} onClick={handleClearSearch}>
            <CloseIcon fontSize="small" />
          </InputAdornment>
        }
        sx={[sxStyles.input, ...convertSxToArr(sx)]}
        {...props}
      />
    </Box>
  );
}
