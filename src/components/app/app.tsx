import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainScreen} from '../../pages/main-screen/main-screen.tsx';
import {LoginScreen} from '../../pages/login-screen/login-screen.tsx';
import {OfferScreen} from '../../pages/offer-screen/offer-screen.tsx';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen.tsx';
import {AppRoute} from '../../const.ts';
import {PrivateRouteAuthorized, PrivateRouteUnauthorized} from '../private-route/private-route.tsx';
import {FavoriteScreen} from '../../pages/favorites-screen/favorite-screen.tsx';
import {HelmetProvider} from 'react-helmet-async';

export function App(): React.JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen/>}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRouteUnauthorized>
                <LoginScreen />
              </PrivateRouteUnauthorized>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRouteAuthorized>
                <FavoriteScreen />
              </PrivateRouteAuthorized>
            }
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
