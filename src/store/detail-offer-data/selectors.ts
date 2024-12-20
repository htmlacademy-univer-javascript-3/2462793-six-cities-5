import {State} from '../../types/state.ts';
import {DetailOffer} from '../../types/detail-offer.ts';
import {Namespace} from '../../const.ts';
import {Offer} from '../../types/offer.ts';
import {Review} from '../../types/review.ts';

export const getDetailOffer = (state: Pick<State, Namespace.DetailOffer>): DetailOffer | null => state[Namespace.DetailOffer].detailOffer;
export const getNearOffers = (state: Pick<State, Namespace.DetailOffer>): Offer[] => state[Namespace.DetailOffer].nearOffers;
export const getReviews = (state: Pick<State, Namespace.DetailOffer>): Review[] => state[Namespace.DetailOffer].reviews;
