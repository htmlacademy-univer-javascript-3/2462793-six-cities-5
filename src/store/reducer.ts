import {Paris} from '../const.ts';
import {createReducer} from '@reduxjs/toolkit';
import {changeActiveCity, setOffers} from './action.ts';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';

type InitialState = {
  activeCity: City;
  offers: Offer[];
}

const initialState : InitialState = {
  activeCity: Paris,
  offers: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
