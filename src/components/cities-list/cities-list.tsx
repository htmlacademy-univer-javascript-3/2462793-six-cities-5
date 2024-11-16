import {JSX} from 'react';
import {Cities} from '../../const.ts';
import {City} from '../../types/city.ts';
import {useAppDispatch} from '../../hooks';
import {changeActiveCity} from '../../store/action.ts';

type CitiesListProps = {
  activeCity: string;
}

export function CitiesList({activeCity} : CitiesListProps) : JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Cities.map((city : City) => (
          <li key={city.name} className="locations__item">
            {city.name === activeCity ? (
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>{city.name}</span>
              </a>
            ) : (
              <a
                className="locations__item-link tabs__item"
                onClick={() => dispatch(changeActiveCity(city))}
              >
                <span>{city.name}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
