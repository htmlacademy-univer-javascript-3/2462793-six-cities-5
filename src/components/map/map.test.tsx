import {Offer} from '../../types/offer.ts';
import {makeFakeOffer} from '../../utils/mocks.ts';
import {render, screen} from '@testing-library/react';
import {PARIS} from '../../const.ts';
import {Map} from './map.tsx';

vi.mock('../../hooks/useMap', () => ({
  __esModule: true,
  default: vi.fn(),
}));


describe('Component: Map', () => {
  let mockOffers: Offer[];
  let mockActiveOffer: Offer;

  beforeEach(() => {
    mockOffers = [makeFakeOffer(), makeFakeOffer()];
    mockActiveOffer = mockOffers[0];
  });

  it('should render map correctly', () => {
    render(
      <Map
        city={PARIS}
        offers={mockOffers}
        selectedOffer= {mockActiveOffer}
      />
    );

    const mapContainer = screen.getByTestId('map');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveClass('cities__map map')
  });

  it('should highlight active marker when activeOffer is provided', () => {
    render(
      <Map
        city={PARIS}
        offers={mockOffers}
        selectedOffer= {mockActiveOffer}
      />
    );
    const activeMarkerIconUrl = 'img/pin-active.svg';
    expect(mockActiveOffer.id).toBe(mockOffers[0].id);
    expect(activeMarkerIconUrl).toBe('img/pin-active.svg');
  });
});
