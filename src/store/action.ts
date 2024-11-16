import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';

export const changeActiveCity = createAction<City>('offers/changeActiveCity');

export const setOffers = createAction<Offer[]>('offers/setOffers');
