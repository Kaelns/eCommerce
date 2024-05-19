import { Navbar } from '@/layout/Navbar/Navbar';
import { Navbars } from '@/layout/Navbar/Navbar.enum';

export function MainPage(): JSX.Element {
  return <Navbar navbarType={Navbars.MAIN} />;
}
