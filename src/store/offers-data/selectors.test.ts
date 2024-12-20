import {makeFakeOffer} from '../../utils/mocks.ts';
import {Namespace} from '../../const.ts';
import {getFavoritesCount, getFavoritesOffers, getOffers} from './selectors.ts';

describe('OffersData selectors', () => {
  const mockOffers = [makeFakeOffer(), makeFakeOffer()];
  const mockFavorites = [makeFakeOffer()];

  const state = {
    [Namespace.Offers]: {
      offers: mockOffers,
      favoritesOffers: mockFavorites,
      favoritesCount: 2,
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[Namespace.Offers];
    const result = getOffers(state);
    expect(result).toBe(offers);
  });

  it('should return favorites from state', () => {
    const { favoritesOffers } = state[Namespace.Offers];
    const result = getFavoritesOffers(state);
    expect(result).toBe(favoritesOffers);
  });

  it('should return favorites count from state', () => {
    const { favoritesCount } = state[Namespace.Offers];
    const result = getFavoritesCount(state);
    expect(result).toBe(favoritesCount);
  });
});
