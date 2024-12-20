import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from '../../store';
import {MemoryRouter} from 'react-router-dom';
import {makeFakeOffer} from '../../utils/mocks.ts';
import {OffersList} from './offers-list.tsx';
import userEvent from '@testing-library/user-event';

describe('Component: OffersList', () => {
  const renderWithProvider = (elem: React.ReactElement) =>
    render(
      <Provider store={store}>
        <MemoryRouter>{elem}</MemoryRouter>
      </Provider>
    );

  it('should render offers correctly', () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

    renderWithProvider(<OffersList offers={mockOffers} onChange={() => {}} />);

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should call onOfferHover when an offer is hovered', async () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const handleOfferHover = vi.fn();
    const user = userEvent.setup();

    renderWithProvider(<OffersList offers={mockOffers} onChange={handleOfferHover} />);

    const firstOffer = screen.getByText(mockOffers[0].title);
    await user.hover(firstOffer);

    expect(handleOfferHover).toHaveBeenCalledWith(mockOffers[0].id);

    await user.unhover(firstOffer);

    expect(handleOfferHover).toHaveBeenCalledWith(null);
  });
});
