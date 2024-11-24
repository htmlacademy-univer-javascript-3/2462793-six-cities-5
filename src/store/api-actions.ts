import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {Offer} from '../types/offer.ts';
import {apiRoute, AuthorizationStatus} from '../const.ts';
import {setOffers, setDetailOffer, setNearOffers, setReviews, setAuthorizationStatus} from './action.ts';
import {DetailOffer} from '../types/detail-offer.ts';
import {Review, ReviewInfo} from '../types/review.ts';
import {saveToken} from '../servises/token.ts';
import {AuthInfo, LoginInfo} from '../types/user.ts';
import {store} from './index.ts';

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

export const sendReview = createAsyncThunk<void, ReviewInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews', async (reviewInfo, {extra: api}) => {
    const response = await api.post(`${apiRoute.reviews}/${reviewInfo.offerId}`, {
      comment: reviewInfo.comment,
      rating: Number(reviewInfo.rating)
    });
    if (response.status === 201) {
      store.dispatch(fetchReviews(reviewInfo.offerId));
    }
  }
);

export const login = createAsyncThunk<void, LoginInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/login', async (loginInfo, { dispatch, extra: api }) => {
    const response = await api.post<AuthInfo>(apiRoute.login, loginInfo);
    if (response.status === 200 || response.status === 201) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
      saveToken(response.data.token);
    } else {
      throw response;
    }
  });

export const checkAuthorization = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/checkAuthorization', async (_arg, { dispatch, extra: api }) => {
    await api.get(apiRoute.login);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
  });

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout', async (_arg, { dispatch, extra: api }) => {
    await api.delete(apiRoute.logout);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
  });
