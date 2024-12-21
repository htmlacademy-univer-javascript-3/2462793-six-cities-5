import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {State} from '../../types/state.ts';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import MemoizedHeader from './header.tsx';
import userEvent from '@testing-library/user-event';
import {logout} from '../../store/api-actions.ts';
import {MemoryRouter} from 'react-router-dom';
import {internet} from 'faker';

describe('Component: Header', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore<State>(middlewares);
  const initialStateUnauth = {
    USER: {
      authorizationStatus: AuthorizationStatus.Unauthorized,
      userEmail: null,
    },
    OFFERS: {
      favoritesCount: 0,
    },
  };

  const testUserEmail = internet.email();
  const initialStateAuth = {
    USER: {
      authorizationStatus: AuthorizationStatus.Authorized,
      userEmail: testUserEmail,
    },
    OFFERS: {
      favoritesCount: 2,
    },
  };

  it('renders login link for unauthorized user', () => {
    const store = mockStore(initialStateUnauth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedHeader />
        </MemoryRouter>
      </Provider>
    );

    const loginLink = screen.getByText('Sign in');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', AppRoute.Login);
  });

  it('renders user email, avatar, and favorites count for authorized user', () => {
    const store = mockStore(initialStateAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedHeader />
        </MemoryRouter>
      </Provider>
    );

    const userEmail = screen.getByText(testUserEmail);
    expect(userEmail).toBeInTheDocument();

    const favoritesCount = screen.getByText('2');
    expect(favoritesCount).toBeInTheDocument();

    const signOutLink = screen.getByText('Sign out');
    expect(signOutLink).toBeInTheDocument();
  });

  it('dispatches logout action when sign out is clicked', async () => {
    const store = mockStore(initialStateAuth);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedHeader />
        </MemoryRouter>
      </Provider>
    );

    const signOutLink = screen.getByText('Sign out');
    await user.click(signOutLink);

    const actions = store.getActions();
    expect(actions[0].type).toBe(logout.pending.type);
  });

  it('links to favorites page when favorites count is clicked', () => {
    const store = mockStore(initialStateAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedHeader />
        </MemoryRouter>
      </Provider>
    );

    const favoritesLink = screen.getByText(testUserEmail).closest('a');
    expect(favoritesLink).toHaveAttribute('href', AppRoute.Favorites);
  });
});
