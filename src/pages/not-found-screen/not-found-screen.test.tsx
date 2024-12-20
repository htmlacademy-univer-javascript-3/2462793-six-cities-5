import {MemoryRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {render, screen} from '@testing-library/react';
import {NotFoundScreen} from './not-found-screen.tsx';

describe('Component: NotFoundScreen', () => {
  it('should render offers when there are offers available', () => {
    const component =
      <MemoryRouter>
        <HelmetProvider>
          <NotFoundScreen />
        </HelmetProvider>
      </MemoryRouter>
    render(component);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Go back to Home')).toBeInTheDocument();
  });
});
