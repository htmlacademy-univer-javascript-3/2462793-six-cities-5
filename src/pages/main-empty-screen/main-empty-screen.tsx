import {JSX} from 'react';
import MemoizedHeader from '../../components/header/header.tsx';
import {Helmet} from 'react-helmet-async';
import MemoizedCitiesList from '../../components/cities-list/cities-list.tsx';
import {useAppSelector} from '../../hooks';
import {getActiveCity} from '../../store/app-data/selectors.ts';

export function MainEmptyScreen() : JSX.Element {
  const activeCity = useAppSelector(getActiveCity);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <MemoizedHeader />
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <MemoizedCitiesList activeCity={activeCity.name} />
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {activeCity.name}</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
