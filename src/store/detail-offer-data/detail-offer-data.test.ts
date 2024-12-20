import {DetailOfferData} from '../../types/state.ts';
import {detailOfferData, sendReview, setDetailOffer, setNearOffers, setReviews} from './detail-offer-data.ts';
import {makeFakeDetailOffer, makeFakeOffer, makeFakeReview} from '../../utils/mocks.ts';

describe('DetailOfferData slice', () => {
  const initialState: DetailOfferData = {
    detailOffer: null,
    nearOffers: [],
    reviews: []
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = detailOfferData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = detailOfferData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should load detail offer with "setDetailOffer" action', () => {
    const mockDetailOffer = makeFakeDetailOffer();

    const expectedState = {
      ...initialState,
      detailOffer: mockDetailOffer
    };

    const result = detailOfferData.reducer(
      initialState,
      setDetailOffer(mockDetailOffer)
    );

    expect(result).toEqual(expectedState);
  });

  it('should load near offers with "setNearOffers" action', () => {
    const mockNearOffers = [makeFakeOffer()];

    const expectedState = {
      ...initialState,
      nearOffers: mockNearOffers
    };

    const result = detailOfferData.reducer(
      initialState,
      setNearOffers(mockNearOffers)
    );

    expect(result).toEqual(expectedState);
  });

  it('should load reviews with "setReviews" action', () => {
    const mockReviews = [makeFakeReview()];

    const expectedState = {
      ...initialState,
      reviews: mockReviews
    };

    const result = detailOfferData.reducer(
      initialState,
      setReviews(mockReviews)
    );

    expect(result).toEqual(expectedState);
  });

  it('should send a new review with "sendReview" action', () => {
    const initialStateWithReviews = {
      ...initialState,
      reviews: [makeFakeReview()],
    };
    const newReview = makeFakeReview();
    const expectedState = {
      ...initialState,
      reviews: [...initialStateWithReviews.reviews, newReview],
    };

    const result = detailOfferData.reducer(
      initialStateWithReviews,
      sendReview(newReview)
    );

    expect(result).toEqual(expectedState);
  });
});
