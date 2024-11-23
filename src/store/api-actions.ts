import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {Offer} from '../types/offer.ts';
import {apiRoute} from '../const.ts';
import {setOffers, setDetailOffer, setNearOffers, setReviews} from './action.ts';
import {DetailOffer} from '../types/detail-offer.ts';
import {Review} from '../types/review.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(apiRoute.offers);
    dispatch(setOffers(data));
  }
);

export const fetchDetailOffer = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchDetailOffer',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<DetailOffer>(`${apiRoute.offers}/${offerId}`);
    dispatch(setDetailOffer(data));
  }
);

export const fetchNearOffers = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${apiRoute.offers}/${offerId}/nearby`);
    dispatch(setNearOffers(data));
  }
);

export const fetchReviews = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(`${apiRoute.reviews}/${offerId}`);
    dispatch(setReviews(data));
  }
);
