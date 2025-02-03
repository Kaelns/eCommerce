import type { SxStyles } from '@/shared/types/types';

import { Button } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/system';
import FilterListIcon from '@mui/icons-material/FilterList';

import { selectIsOpenFilterDrawer, setIsOpenFilterDrawerAction } from '@/pages/CatalogPage/catalogPage.slice';

import { ElemWithTypography } from '@/components/typography/ElemWithTypography';

import { sxMixins } from '@/shared/data/mui-mixins';
import { useAppDispatch, useAppSelector } from '@/shared/redux/redux';

const sxStyles: SxStyles = {
  filters: {
    flex: { zero: 0.2, tablet: 1 },
    color: 'text.primary',
    boxShadow: 1,
    textTransform: 'none'
  },

  textContainer: {
    gap: '0 !important'
  }
};
export function OpenCatalogSideDrawerBtn() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isOpenFilterDrawer = useAppSelector(selectIsOpenFilterDrawer);
  const isMatchesTablet = useMediaQuery(theme.breakpoints.down('tablet'));
  const isMatchesLaptopBig = useMediaQuery(theme.breakpoints.up('laptopBig'));

  const handleOpenSideDrawer = () => {
    dispatch(setIsOpenFilterDrawerAction(true));
  };

  return (
    !isMatchesLaptopBig && (
      <Button onClick={handleOpenSideDrawer} sx={sxStyles.filters}>
        {isMatchesTablet ? (
          <FilterListIcon fontSize="small" />
        ) : (
          <ElemWithTypography
            elem={<FilterListIcon fontSize="small" />}
            sx={[isOpenFilterDrawer && sxMixins.hidden]}
            sxContainer={[isOpenFilterDrawer && sxStyles.textContainer]}
          >
            Filters
          </ElemWithTypography>
        )}
      </Button>
    )
  );
}
