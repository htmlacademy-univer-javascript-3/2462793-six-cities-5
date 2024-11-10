import {JSX, useEffect, useRef} from 'react';
import {Marker, layerGroup} from 'leaflet';
import {City} from '../../types/city.ts';
import {Offer} from '../../types/offer.ts';
import {defaultCustomIcon, currentCustomIcon} from '../../const.ts';
import {useMap} from '../../hooks/use-map.tsx';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | undefined;
}

export function Map({city, offers, selectedOffer} : MapProps) : JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <div className="cities__map map" style={{height: '500px'}} ref={mapRef}></div>;
}
