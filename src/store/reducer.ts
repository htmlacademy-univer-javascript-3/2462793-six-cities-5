import {Paris} from '../const.ts';
import {createReducer} from '@reduxjs/toolkit';
import {offers} from '../mocks/offers.ts';
import {changeActiveCity, setOffers} from './action.ts';

const initialState = {
  activeCity: Paris,
  offers: offers,

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
