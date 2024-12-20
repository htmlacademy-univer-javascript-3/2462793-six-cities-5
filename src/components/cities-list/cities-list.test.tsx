import {BRUSSELS, CITIES, PARIS} from '../../const.ts';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state.ts';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import MemoizedCitiesList from './cities-list.tsx';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore<State>();

describe('Component: CitiesList', () => {
  const initialState = {
    APP: {
      city: PARIS,
    },
  };

  const store = mockStore(initialState);

  it('should render all cities correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedCitiesList activeCity={PARIS.name} />
        </MemoryRouter>
      </Provider>
    );

    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('should have active state for the currently selected city', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedCitiesList activeCity={PARIS.name} />
        </MemoryRouter>
      </Provider>
    );

    const parisLink = screen.getByText('Paris');
    expect(parisLink.closest('div')).toHaveClass('tabs__item--active');
  });

  it('should dispatch active city change on city click', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedCitiesList activeCity={PARIS.name} />
        </MemoryRouter>
      </Provider>
    );

    const brusselsLink = screen.getByText('Brussels');
    await user.click(brusselsLink);

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('APP/changeActiveCity');
    expect(actions[0].payload).toBe(BRUSSELS);
  });

  it('should have correct number of city items', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MemoizedCitiesList activeCity={PARIS.name} />
        </MemoryRouter>
      </Provider>
    );

    const cityItems = screen.getAllByRole('listitem');
    expect(cityItems).toHaveLength(CITIES.length);
  });
});
