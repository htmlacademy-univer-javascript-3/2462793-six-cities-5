import {FavoriteScreen} from './favorite-screen.tsx';
import {withStore} from '../../utils/mocks-components.tsx';
import {makeFakeOffer, makeFakeStore} from '../../utils/mocks.ts';
import {AuthorizationStatus} from '../../const.ts';
import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {MemoryRouter} from 'react-router-dom';
import {internet} from 'faker';

describe('Component: FavoriteScreen', () => {
  const component =
    <MemoryRouter>
      <HelmetProvider>
        <FavoriteScreen />
      </HelmetProvider>
    </MemoryRouter>
  it('should render "Nothing yet saved" when there are no favorite offers', () => {
    const { withStoreComponent } = withStore(
      component,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Authorized,
          userEmail: internet.email(),
        },
        OFFERS: {
          offers: [],
          favoritesOffers: [],
          favoritesCount: 0,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render favorite offers when there are favorite offers', () => {
    const favoriteOffer = makeFakeOffer();

    const { withStoreComponent } = withStore(
      component,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Authorized,
          userEmail: internet.email(),
        },
        OFFERS: {
          offers: [],
          favoritesOffers: [favoriteOffer],
          favoritesCount: 0,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(favoriteOffer.title)).toBeInTheDocument();
  });
});
