import {JSX} from 'react';
import {Offer} from '../../types/offer.ts';
import {useState} from 'react';
import {PlaceCard} from '../place-card/place-card.tsx';

type OffersListProps = {
  offers: Offer[];
}

export function OffersList({offers} : OffersListProps) : JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);
  const handleMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };
  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={handleMouseLeave}
        />))}
    </div>
  );
}
