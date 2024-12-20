import {makeFakeDetailOffer, makeFakeOffer, makeFakeReview} from '../../utils/mocks.ts';
import {Namespace} from '../../const.ts';
import {getDetailOffer, getNearOffers, getReviews} from './selectors.ts';

describe('DetailOffer selectors', () => {
  const mockOfferDetail = makeFakeDetailOffer();
  const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];
  const mockReviews = [makeFakeReview(), makeFakeReview()];

  const state = {
    [Namespace.DetailOffer]: {
      detailOffer: mockOfferDetail,
      nearOffers: mockNearbyOffers,
      reviews: mockReviews,
    }
  };

  it('should return detail offer from state', () => {
    const { detailOffer } = state[Namespace.DetailOffer];
    const result = getDetailOffer(state);
    expect(result).toBe(detailOffer);
  });

  it('should return near offers from state', () => {
    const { nearOffers } = state[Namespace.DetailOffer];
    const result = getNearOffers(state);
    expect(result).toBe(nearOffers);
  });

  it('should return reviews from state', () => {
    const { reviews } = state[Namespace.DetailOffer];
    const result = getReviews(state);
    expect(result).toBe(reviews);
  });
});
