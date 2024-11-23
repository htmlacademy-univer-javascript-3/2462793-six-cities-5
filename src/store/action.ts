import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {DetailOffer} from '../types/detail-offer.ts';
import {Review} from '../types/review.ts';

export const changeActiveCity = createAction<City>('offers/changeActiveCity');

export const setOffers = createAction<Offer[]>('offers/setOffers');

export const setDetailOffer = createAction<DetailOffer | null>('offers/setDetailOffer');

export const setNearOffers = createAction<Offer[]>('offers/setNearOffers');

export const setReviews = createAction<Review[]>('offers/setReviews');
