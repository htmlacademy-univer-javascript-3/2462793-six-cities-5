import {JSX, memo, useCallback} from 'react';
import {CITIES} from '../../const.ts';
import {City} from '../../types/city.ts';
import {useAppDispatch} from '../../hooks';
import {changeActiveCity} from '../../store/app-data/app-data.ts';

type CitiesListProps = {
  activeCity: string;
}
function CitiesList({activeCity} : CitiesListProps) : JSX.Element {
  const dispatch = useAppDispatch();
  const changeActiveCityHandle = useCallback(
    (city: City) => {
      dispatch(changeActiveCity(city));
    },
    [dispatch]
  );

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city : City) => (
          <li key={city.name} className="locations__item">
            {city.name === activeCity ? (
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>{city.name}</span>
              </a>
            ) : (
              <a
                className="locations__item-link tabs__item"
                onClick={() => changeActiveCityHandle(city)}
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

const MemoizedCitiesList = memo(CitiesList);

export default MemoizedCitiesList;
