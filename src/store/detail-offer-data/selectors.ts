import {State} from '../../types/state.ts';
import {DetailOffer} from '../../types/detail-offer.ts';
import {Namespace} from '../../const.ts';
import {Offer} from '../../types/offer.ts';
import {Review} from '../../types/review.ts';

export const getDetailOffer = (state: State): DetailOffer | null => state[Namespace.DetailOffer].detailOffer;
export const getNearOffers = (state: State): Offer[] => state[Namespace.DetailOffer].nearOffers;
export const getReviews = (state: State): Review[] => state[Namespace.DetailOffer].reviews;
