import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavbar } from '@/layout/Navbar/hooks/useNavbar';
import { Navbars } from '@/layout/Navbar/data/Navbar.enum';

import styles from './Navbar.module.scss';

interface IProps {
  navbarType: Navbars;
}

export function Navbar({ navbarType }: IProps): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { navRoutes, orientation, additionalStyles } = useNavbar(navbarType);
  const [activeLink, setActiveLink] = useState<number | false>(false);

  const navRoutesKeys = Object.keys(navRoutes);
  const styleLeftOnVerticalTabs = { sx: { left: 0 } };

  useEffect(() => {
    if (!(pathname in navRoutes)) {
      setActiveLink(false);
    }
    if (pathname in navRoutes) {
      setActiveLink(navRoutesKeys.indexOf(pathname));
    }
  }, [navRoutes, navRoutesKeys, pathname]);

  return (
    <Box component="nav">
      <Tabs value={activeLink} orientation={orientation} TabIndicatorProps={styleLeftOnVerticalTabs}>
        {navRoutesKeys.map((route) => (
          <Tab
            key={route}
            className={`${styles.buttons} ${additionalStyles}`}
            label={navRoutes[route as keyof typeof navRoutes]}
            onClick={() => navigate(route)}
          />
        ))}
      </Tabs>
    </Box>
  );
}
