import {store} from '../store';
import {City} from './city.ts';
import {DetailOffer} from './detail-offer.ts';
import {Offer} from './offer.ts';
import {Review} from './review.ts';
import {AuthorizationStatus} from '../const.ts';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppData = {
  city: City;
};

export type DetailOfferData = {
  detailOffer: DetailOffer | null | 'NOT_FOUND';
  nearOffers: Offer[];
  reviews: Review[];
};

export type OffersData = {
  offers: Offer[];
  favoritesOffers: Offer[];
  favoritesCount: number;
};

export type UserData = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
}
