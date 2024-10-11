import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Badge, Button, IconButton, Popover, badgeClasses } from '@mui/material';
import { useState } from 'react';
import type { SxProps } from '@mui/system';
import { Stack } from '@mui/system';
import { Navbar } from '@/layout/Navbar/Navbar';
import { Navbars } from '@/layout/Navbar/Navbar.constants';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { logoutUserApi } from '@/services/model/user/logoutUserApi';
import { authSliceSelectors } from '@/store/slices/auth.slice';

const BADGE_LOGIN_TEXT = 'Login';

const sxBadge: SxProps = {
  [`& .${badgeClasses.badge}`]: {
    height: '1.7rem',
    minWidth: '1.7rem',
    fontSize: '1.1rem'
  }
};

export function UserPopover(): React.ReactNode {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(authSliceSelectors.selectIsLoggedAuth);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const isOpenPopover = Boolean(anchorEl);
  const showBadgeIfNonAuthorized = isLogged ? 0 : BADGE_LOGIN_TEXT;

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const logOut = async (): Promise<void> => {
    dispatch(logoutUserApi());
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={showBadgeIfNonAuthorized} color="primary" sx={sxBadge}>
          <AccountCircleOutlinedIcon />
        </Badge>
      </IconButton>
      <Popover
        open={isOpenPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Stack gap={1} padding={2}>
          <Navbar navbarType={Navbars.USER_POPOVER} />
          {isLogged && (
            <Button variant="contained" size="small" onClick={logOut}>
              Log out
            </Button>
          )}
        </Stack>
      </Popover>
    </>
  );
}
