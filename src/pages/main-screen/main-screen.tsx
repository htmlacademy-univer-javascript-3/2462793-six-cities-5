import {JSX, useCallback, useMemo, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {Map} from '../../components/map/map.tsx';
import MemoizedCitiesList from '../../components/cities-list/cities-list.tsx';
import {useAppSelector} from '../../hooks';
import MemoizedSorting from '../../components/sorting/sorting.tsx';
import {SortOption} from '../../types/sort-option.ts';
import MemoizedHeader from '../../components/header/header.tsx';
import {getActiveCity, getLoadingStatus} from '../../store/app-data/selectors.ts';
import {getOffers} from '../../store/offers-data/selectors.ts';
import {LoadingStatus} from '../../const.ts';
import {MainEmptyScreen} from '../main-empty-screen/main-empty-screen.tsx';
import {Loading} from '../../components/loading/loading.tsx';


export function MainScreen(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers).filter(
    (offer) => offer.city.name === activeCity.name,
  );
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const selectedOffer = offers.find((offer) => offer.id === activeOfferId);
  const placesFoundCaption = offers.length === 0
    ? 'No places to stay available'
    : `${offers.length} places to stay in ${activeCity.name}`;
  const [sortingOption, setSortingOption] = useState<SortOption>('Popular');
  const sortedOffers = useMemo(() => [...offers].sort((a, b) => {
    switch (sortingOption) {
      case 'Price: low to high':
        return a.price - b.price;
      case 'Price: high to low':
        return b.price - a.price;
      case 'Top rated first':
        return b.rating - a.rating;
      default:
        return 0;
    }
  }), [offers, sortingOption]);
  const handleSortChange = useCallback((option: SortOption) => {
    setSortingOption(option);
  }, []);
  const loadingStatus = useAppSelector(getLoadingStatus);

  if (loadingStatus !== LoadingStatus.Loading && offers.length === 0){
    return <MainEmptyScreen />;
  }

  if (loadingStatus === LoadingStatus.Loading) {
    return <Loading />;
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <MemoizedHeader />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <MemoizedCitiesList activeCity={activeCity.name}/>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesFoundCaption}</b>
              <MemoizedSorting onSortChange={handleSortChange}/>
              <OffersList offers={sortedOffers} onChange={setActiveOfferId}/>
            </section>
            <div className="cities__right-section">
              <Map
                city={activeCity}
                offers={offers}
                selectedOffer={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
