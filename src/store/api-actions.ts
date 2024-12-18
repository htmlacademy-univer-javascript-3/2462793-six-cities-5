import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {Offer} from '../types/offer.ts';
import {ApiRoute, AuthorizationStatus, LoadingStatus} from '../const.ts';
import {DetailOffer} from '../types/detail-offer.ts';
import {Review, ReviewInfo} from '../types/review.ts';
import {dropToken, getToken, saveToken} from '../servises/token.ts';
import {AuthInfo, LoginInfo} from '../types/user.ts';
import {store} from './index.ts';
import {FavoriteInfo} from '../types/favorite-info.ts';
import {setFavoritesCount, setFavoritesOffers, setOffers, updateOffers} from './offers-data/offers-data.ts';
import {setDetailOffer, setNearOffers, setReviews} from './detail-offer-data/detail-offer-data.ts';
import {saveUserEmail, setAuthorizationStatus} from './user-data/user-data.ts';
import {setLoadingStatus} from './app-data/app-data.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(LoadingStatus.Loading));
    try {
      const { data } = await api.get<Offer[]>(ApiRoute.offers);
      dispatch(setOffers(data)); // обновляем данные
      dispatch(setLoadingStatus(LoadingStatus.Succeed));
    } catch (error) {
      dispatch(setLoadingStatus(LoadingStatus.Failed));
      throw error;
    }
  }
);

export const fetchFavoritesOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoritesOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoute.favorite);
    dispatch(setFavoritesOffers(data));
    dispatch(setFavoritesCount(data.length));
  }
);

export const changeFavoriteStatus = createAsyncThunk<void, FavoriteInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (favoriteInfo, {dispatch, extra: api}) => {
    const {data} = await api.post<Offer>(`${ApiRoute.favorite}/${favoriteInfo.offerId}/${+favoriteInfo.status}`);
    dispatch(updateOffers(data));
    dispatch(fetchFavoritesOffers());
  }
);


export const fetchDetailOffer = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchDetailOffer',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(LoadingStatus.Loading));
    try {
      const {data} = await api.get<DetailOffer>(`${ApiRoute.offers}/${offerId}`);
      dispatch(setDetailOffer(data));
      dispatch(setLoadingStatus(LoadingStatus.Succeed));
    } catch (error) {
      dispatch(setLoadingStatus(LoadingStatus.Failed));
      throw error;
    }
  }
);

export const fetchNearOffers = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${ApiRoute.offers}/${offerId}/nearby`);
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
    const {data} = await api.get<Review[]>(`${ApiRoute.reviews}/${offerId}`);
    dispatch(setReviews(data));
  }
);

export const sendReview = createAsyncThunk<void, ReviewInfo, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews', async (reviewInfo, {extra: api}) => {
    const response = await api.post<ReviewInfo>(`${ApiRoute.reviews}/${reviewInfo.offerId}`, {
      comment: reviewInfo.comment,
      rating: reviewInfo.rating
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
    const response = await api.post<AuthInfo>(ApiRoute.login, loginInfo);
    if (response.status === 200 || response.status === 201) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
      saveToken(response.data.token);
      dispatch(saveUserEmail(loginInfo.email));
      dispatch(fetchFavoritesOffers());
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
    const token = getToken();
    if (token) {
      try{
        await api.get(ApiRoute.login);
        dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
        dispatch(fetchFavoritesOffers);
      } catch {
        dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
      }
    } else {
      dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
    }
  });

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout', async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoute.logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
  });
