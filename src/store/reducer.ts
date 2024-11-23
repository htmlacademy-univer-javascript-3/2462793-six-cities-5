import {AuthorizationStatus, Paris} from '../const.ts';
import {createReducer} from '@reduxjs/toolkit';
import {
  changeActiveCity,
  setAuthorizationStatus,
  setDetailOffer,
  setNearOffers,
  setOffers,
  setReviews
} from './action.ts';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {DetailOffer} from '../types/detail-offer.ts';
import {Review} from '../types/review.ts';
import {Nullable} from 'vitest';

type InitialState = {
  activeCity: City;
  offers: Offer[];
  detailOffer: Nullable<DetailOffer>;
  nearOffers: Offer[];
  reviews: Review[];
  authorizationStatus: AuthorizationStatus;
}

const initialState : InitialState = {
  activeCity: Paris,
  offers: [],
  detailOffer: null,
  nearOffers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDetailOffer, (state, action) => {
      state.detailOffer = action.payload;
    })
    .addCase(setNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
