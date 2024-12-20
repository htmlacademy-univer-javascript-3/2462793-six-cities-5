import {MemoryRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {MainEmptyScreen} from './main-empty-screen.tsx';
import {withStore} from '../../utils/mocks-components.tsx';
import {makeFakeStore} from '../../utils/mocks.ts';
import {AuthorizationStatus, LoadingStatus, PARIS} from '../../const.ts';
import {internet} from 'faker';
import {render, screen} from '@testing-library/react';

describe('Component: MainEmptyScreen', () => {
  const component =
    <MemoryRouter>
      <HelmetProvider>
        <MainEmptyScreen />
      </HelmetProvider>
    </MemoryRouter>
  it('should render "No places to stay available" when there are no offers', () => {
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
        APP: {
          city: PARIS,
          loadingStatus: LoadingStatus.Succeed
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/i)).toBeInTheDocument();
  });
})
