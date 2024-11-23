import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainScreen} from '../../pages/main-screen/main-screen.tsx';
import {LoginScreen} from '../../pages/login-screen/login-screen.tsx';
import {OfferScreen} from '../../pages/offer-screen/offer-screen.tsx';
import {NotFoundScreen} from '../../pages/not-found-screen/not-found-screen.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {PrivateRoute} from '../private-route/private-route.tsx';
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
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoriteScreen />
              </PrivateRoute>
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
