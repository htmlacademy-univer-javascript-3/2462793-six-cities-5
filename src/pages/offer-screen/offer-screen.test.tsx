import {HelmetProvider} from 'react-helmet-async';
import {makeFakeDetailOffer, makeFakeOffer, makeFakeReview, makeFakeStore} from '../../utils/mocks.ts';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {OfferScreen} from './offer-screen.tsx';
import {Review} from '../../types/review.ts';

vi.mock('../../components/review-list/review-list.tsx', () => ({
  default: ({ reviews }: { reviews: Review[] }) => (
    <div data-testid="review-list">
      {reviews.map((review) => (
        <div key={review.id}>{review.comment}</div>
      ))}
    </div>
  )
}));

describe('OfferScreen Component', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const mockOffer = makeFakeOffer();
  const mockOfferDetail = makeFakeDetailOffer();
  const mockReviews = [makeFakeReview(), makeFakeReview()];
  const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];

  const initialState = makeFakeStore({
    DETAIL_OFFER: {
      detailOffer: mockOfferDetail,
      nearOffers: mockNearbyOffers,
      reviews: mockReviews,
    },
    OFFERS: {
      offers: [mockOffer],
      favoritesOffers: [],
      favoritesCount: 0,
    },
    USER: {
      authorizationStatus: AuthorizationStatus.Unauthorized,
      userEmail: null,
    },
  });

  const renderComponent = (
    initialEntries = [`/offer/${mockOffer.id}`],
    state = initialState
  ) => {
    const store = mockStore(state);

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <HelmetProvider>
            <Routes>
              <Route path={AppRoute.Offer} element={<OfferScreen />} />
            </Routes>
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders offer details correctly', () => {
    renderComponent();

    expect(screen.getByText(mockOfferDetail.title)).toBeTruthy();
    expect(screen.getByText(`€${mockOfferDetail.price}`)).toBeTruthy();
    expect(screen.getByText(`${mockOfferDetail.bedrooms} Bedrooms`)).toBeTruthy();
    expect(screen.getByText(`Max ${mockOfferDetail.maxAdults} adults`)).toBeTruthy();
  });

  it('displays review list', () => {
    renderComponent();

    expect(screen.getByTestId('review-list')).toBeTruthy();
  });
});
