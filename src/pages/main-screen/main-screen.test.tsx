import {MemoryRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {MainScreen} from './main-screen.tsx';
import {makeFakeOffer, makeFakeStore} from '../../utils/mocks.ts';
import {withStore} from '../../utils/mocks-components.tsx';
import {AuthorizationStatus, LoadingStatus} from '../../const.ts';
import {internet} from 'faker';
import {render, screen} from '@testing-library/react';

describe('Component: MainScreen', () => {
  const component = (
    <MemoryRouter>
      <HelmetProvider>
        <MainScreen />
      </HelmetProvider>
    </MemoryRouter>
  );
  it('should render offers when there are offers available', () => {
    const offer = makeFakeOffer();

    const { withStoreComponent } = withStore(
      component,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Authorized,
          userEmail: internet.email(),
        },
        OFFERS: {
          offers: [offer],
          favoritesOffers: [],
          favoritesCount: 0,
        },
        APP: {
          city: offer.city,
          loadingStatus: LoadingStatus.Succeed
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(new RegExp(`places to stay in ${offer.city.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });
});
