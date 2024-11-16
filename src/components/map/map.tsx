import { JSX, useEffect, useRef } from 'react';
import { Marker, layerGroup } from 'leaflet';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import { defaultCustomIcon, currentCustomIcon } from '../../const';
import { useMap } from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer?: Offer;
};

export function Map({ city, offers, selectedOffer }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker([offer.location.latitude, offer.location.longitude]);

        marker.setIcon(
          selectedOffer && offer.id === selectedOffer.id
            ? currentCustomIcon
            : defaultCustomIcon
        )
          .addTo(markerLayer);
      });

      return () => {
        markerLayer.clearLayers();
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <div className="cities__map map" style={{ height: '500px' }} ref={mapRef}></div>;
}
