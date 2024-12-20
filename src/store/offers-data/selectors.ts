import {State} from '../../types/state.ts';
import {Offer} from '../../types/offer.ts';
import {Namespace} from '../../const.ts';

export const getOffers = (state: Pick<State, Namespace.Offers>): Offer[] => state[Namespace.Offers].offers;

export const getFavoritesOffers = (state: Pick<State, Namespace.Offers>): Offer[] => state[Namespace.Offers].favoritesOffers;

export const getFavoritesCount = (state: Pick<State, Namespace.Offers>): number => state[Namespace.Offers].favoritesCount;
