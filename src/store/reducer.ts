import {Paris} from '../const.ts';
import {createReducer} from '@reduxjs/toolkit';
import {changeActiveCity, setDetailOffer, setNearOffers, setOffers, setReviews} from './action.ts';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {DetailOffer} from '../types/detail-offer.ts';
import {Review} from '../types/review.ts';

type InitialState = {
  activeCity: City;
  offers: Offer[];
  detailOffer: DetailOffer | null;
  nearOffers: Offer[];
  reviews: Review[];
}

const initialState : InitialState = {
  activeCity: Paris,
  offers: [],
  detailOffer: null,
  nearOffers: [],
  reviews: [],
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
    });
});
