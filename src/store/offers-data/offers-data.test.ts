import {OffersData} from '../../types/state.ts';
import {offersData, setFavoritesCount, setFavoritesOffers, setOffers, updateOffers} from './offers-data.ts';
import {makeFakeOffer} from '../../utils/mocks.ts';

describe('OffersData Slice', () => {
  const initialState: OffersData = {
    offers: [],
    favoritesOffers: [],
    favoritesCount: 0,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offersData.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offersData.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should load offers with "setOffers" action', () => {
    const mockOffers = [ makeFakeOffer()];
    const expectedState = { ...initialState, offers: mockOffers };

    const result = offersData.reducer(initialState, setOffers(mockOffers));

    expect(result).toEqual(expectedState);
  });

  it('should update offer with "updateOffers" action', () => {
    const initialOffers = [makeFakeOffer(), makeFakeOffer()];
    const initialStateWithOffers = { ...initialState, offers: initialOffers };
    const updatedOffer = { ...initialOffers[1], title: 'Updated Offer' };
    const expectedState = {
      ...initialStateWithOffers,
      offers: [initialOffers[0], updatedOffer],
    };

    const result = offersData.reducer(initialStateWithOffers, updateOffers(updatedOffer));

    expect(result).toEqual(expectedState);
  });

  it('should set favorites count with "setFavoritesCount" action', () => {
    const expectedState = { ...initialState, favoritesCount: 3 };

    const result = offersData.reducer(initialState, setFavoritesCount(3));

    expect(result).toEqual(expectedState);
  });

  it('should load favorites with "setFavoritesOffers" action', () => {
    const mockFavorites = [makeFakeOffer(), makeFakeOffer()];
    const expectedState = { ...initialState, favoritesOffers: mockFavorites };

    const result = offersData.reducer(initialState, setFavoritesOffers(mockFavorites));

    expect(result).toEqual(expectedState);
  });
});
