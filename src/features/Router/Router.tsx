import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { AboutUsPage } from '@/pages/AboutUsPage/AboutUsPage';
import { BasketPage } from '@/pages/BasketPage/BasketPage';
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage';
import { DetailedProductPage } from '@/pages/DetailedProductPage/DetailedProductPage';
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage';
import { Header } from '@/layout/Header/Header';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { MainPage } from '@/pages/MainPage/MainPage';
import { MainContainer } from '@/layout/MainContainer/MainContainer';
import { ROUTES } from '@/data/enum/routes.enum';
import { RegistrationPage } from '@/pages/RegistrationPage/RegistrationPage';
import { UserPage } from '@/pages/UserPage/UserPage';

export function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<MainContainer />}>
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
          <Route path={ROUTES.ABOUT_US} element={<AboutUsPage />} />
          <Route path={ROUTES.DETAILED_PRODUCT} element={<DetailedProductPage />}>
            <Route path=":product" />
          </Route>
          <Route path={ROUTES.USER} element={<UserPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.BASKET} element={<BasketPage />} />
          <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
          <Route path="*" element={<Navigate replace to={ROUTES.ERROR} />} />
          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
