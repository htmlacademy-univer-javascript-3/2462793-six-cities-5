import {withStore} from '../../utils/mocks-components.tsx';
import {makeFakeStore} from '../../utils/mocks.ts';
import {AuthorizationStatus, LoadingStatus, PARIS} from '../../const.ts';
import {MemoryRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {LoginScreen} from './login-screen.tsx';
import {fireEvent, render, screen} from '@testing-library/react';
import {internet} from 'faker';

describe('Component: LoginScreen', () => {
  const component = (
    <MemoryRouter>
      <HelmetProvider>
        <LoginScreen />
      </HelmetProvider>
    </MemoryRouter>
  );
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      component,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Unauthorized,
          userEmail: null,
        },
        APP: {
          city: PARIS,
          loadingStatus: LoadingStatus.Succeed
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });


  it('should handle form submission', () => {
    const { withStoreComponent, mockStore } = withStore(
      component,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Unauthorized,
          userEmail: null,
        },
        APP: {
          city: PARIS,
          loadingStatus: LoadingStatus.Succeed
        },
      })
    );

    render(withStoreComponent);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: internet.email() } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe('auth/login/pending');
  });
});
