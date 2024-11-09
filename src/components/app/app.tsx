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
import {Offer} from '../../types/offer.ts';
import {DetailOffer} from '../../types/detail-offer.ts';
import {Review} from '../../types/review.ts';

type AppProps = {
  offers: Offer[];
  detailOffers: DetailOffer[];
  reviews: Review[];
}

export function App({offers, detailOffers, reviews}: AppProps): React.JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen offers={offers}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginScreen />}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen offers={detailOffers} reviews={reviews}/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoriteScreen offers={offers} />
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
