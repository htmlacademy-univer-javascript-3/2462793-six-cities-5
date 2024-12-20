import {createAPI} from '../serviсes/api.ts';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {State} from '../types/state.ts';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from 'redux';
import {ApiRoute, AuthorizationStatus} from '../const.ts';
import {extractActionsTypes, makeFakeDetailOffer, makeFakeOffer, makeFakeReview} from '../utils/mocks.ts';
import {AppThunkDispatch} from '../utils/mocks.ts';
import {
  changeFavoriteStatus,
  checkAuthorization,
  fetchDetailOffer,
  fetchFavoritesOffers, fetchNearOffers,
  fetchOffers, fetchReviews,
  login,
  logout,
  sendReview
} from './api-actions.ts';
import * as tokenStorage from '../serviсes/token.ts';

describe('Async actions', () => {
  const api = createAPI();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      OFFERS: { offers: [], favoritesOffers: [], favoritesCount: 0 },
      DETAIL_OFFER: { detailOffer: null, nearOffers: [], reviews: [] },
      USER: { authorizationStatus: AuthorizationStatus.Unknown, userEmail: null}
    });
  });

  describe('fetchOffers', () => {
    it('should dispatch fetchOffers with successful response', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(ApiRoute.offers).reply(200, mockOffers);

      await store.dispatch(fetchOffers());
      const actions = store.getActions();
      expect(actions[0].type).toBe(fetchOffers.pending.type);
      expect(actions[1].type).toBe(fetchOffers.fulfilled.type);
    });
  });

  describe('fetchFavoritesOffers', () => {
    it('should fetch favorites offers successfully', async () => {
      const mockFavorites = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(ApiRoute.favorite).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(fetchFavoritesOffers.fulfilled.type);
    });
  });

  describe('fetchDetailOffers', () => {
    it('should fetch detail offer', async () => {
      const mockOfferId = 'test-offer-id';
      const mockOfferDetail = makeFakeDetailOffer();

      mockAxiosAdapter.onGet(`${ApiRoute.offers}/${mockOfferId}`).reply(200, mockOfferDetail);

      await store.dispatch(fetchDetailOffer(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(fetchDetailOffer.fulfilled.type);
    });

    it('should fetch near offers', async () => {
      const mockOfferId = 'test-offer-id';
      const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];

      mockAxiosAdapter.onGet(`${ApiRoute.offers}/${mockOfferId}/nearby`).reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearOffers(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(fetchNearOffers.fulfilled.type);
    });

    it('should fetch detail offer', async () => {
      const mockOfferId = 'test-offer-id';
      const mockReviews = [makeFakeReview(), makeFakeReview()];

      mockAxiosAdapter.onGet(`${ApiRoute.reviews}/${mockOfferId}`).reply(200, mockReviews);

      await store.dispatch(fetchReviews(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(fetchReviews.fulfilled.type);
    });
  });

  describe('sendReview', () => {
    it('should send a comment and dispatch sendReview', async () => {
      const mockOfferId = 'test-offer-id';
      const mockComment = {
        comment: 'Comment',
        rating: 4
      };
      const mockReview = makeFakeReview();

      mockAxiosAdapter.onPost(`${ApiRoute.reviews}/${mockOfferId}`).reply(200, mockReview);

      await store.dispatch(sendReview({ comment: mockComment.comment, rating: mockComment.rating, offerId: mockOfferId }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(sendReview.fulfilled.type);
    });
  });

  describe('login', () => {
    it('should successfully login and save token', async () => {
      const mockAuthData = { email: 'test@example.com', password: 'password' };
      const mockUserData = {
        token: 'test-token',
        email: 'test@example.com',
        avatarUrl: 'http://test.com/avatar.jpg'
      };

      mockAxiosAdapter.onPost(ApiRoute.login).reply(200, mockUserData);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(login(mockAuthData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(login.fulfilled.type);
      expect(mockSaveToken).toHaveBeenCalledWith(mockUserData.token);
    });
  });

  describe('logout', () => {
    it('should successfully logout', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logout());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(logout.fulfilled.type);
      expect(mockDropToken).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkAuth', () => {
    it('should check auth successfully when token exists', async () => {

      vi.spyOn(tokenStorage, 'getToken').mockReturnValue('test-token');
      mockAxiosAdapter.onGet(ApiRoute.login).reply(200);

      await store.dispatch(checkAuthorization());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(checkAuthorization.fulfilled.type);
    });
  });

  describe('changeFavouriteStatusAction', () => {
    it('should handle error when changing favorite status', async () => {
      const mockFavouriteAction = {
        offerId: 'test-offer-id',
        status: true
      };

      mockAxiosAdapter
        .onPost(`${ApiRoute.favorite}/test-offer-id/${+true}`)
        .reply(400);

      await store.dispatch(changeFavoriteStatus(mockFavouriteAction));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toContain(changeFavoriteStatus.rejected.type);
    });
  });
});
