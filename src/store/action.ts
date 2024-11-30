import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {DetailOffer} from '../types/detail-offer.ts';
import {Review} from '../types/review.ts';
import {AuthorizationStatus} from '../const.ts';
import {Nullable} from 'vitest';

export const changeActiveCity = createAction<City>('offers/changeActiveCity');

export const setOffers = createAction<Offer[]>('offers/setOffers');

export const setDetailOffer = createAction<Nullable<DetailOffer>>('offers/setDetailOffer');

export const setNearOffers = createAction<Offer[]>('offers/setNearOffers');

export const setReviews = createAction<Review[]>('offers/setReviews');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('auth/setAuthorizationStatus');
