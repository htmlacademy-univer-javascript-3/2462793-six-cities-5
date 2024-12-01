import {State} from '../../types/state.ts';
import {Offer} from '../../types/offer.ts';
import {Namespace} from '../../const.ts';

export const getOffers = (state: State): Offer[] => state[Namespace.Offers].offers;

export const getFavoritesOffers = (state: State): Offer[] => state[Namespace.Offers].favoritesOffers;

export const getFavoritesCount = (state: State): number => state[Namespace.Offers].favoritesCount;
