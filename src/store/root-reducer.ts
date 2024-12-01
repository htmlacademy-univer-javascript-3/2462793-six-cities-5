import {combineReducers} from '@reduxjs/toolkit';
import {Namespace} from '../const.ts';
import {appData} from './app-data/app-data.ts';
import {detailOfferData} from './detail-offer-data/detail-offer-data.ts';
import {offersData} from './offers-data/offers-data.ts';
import {userData} from './user-data/user-data.ts';

export const rootReducer = combineReducers({
  [Namespace.App]: appData.reducer,
  [Namespace.DetailOffer]: detailOfferData.reducer,
  [Namespace.Offers]: offersData.reducer,
  [Namespace.User]: userData.reducer
});
