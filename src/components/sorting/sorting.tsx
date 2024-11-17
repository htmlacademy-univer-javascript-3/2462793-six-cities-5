import {JSX, useState} from 'react';
import {sortOptions} from '../../const.ts';
import {SortOption} from '../../types/sort-option.ts';

type SortingProps = {
  onSortChange: (option: SortOption) => void;
};

export function Sorting({onSortChange} : SortingProps) : JSX.Element {
  const [activeSortOption, setActiveSortOption] = useState<SortOption>('Popular');
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);

  const handleOptionClick = (option: SortOption) => {
    setActiveSortOption(option);
    onSortChange(option);
    setIsOptionsVisible(false);
  };

  const handleListOptionClick = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleListOptionClick}>
        {activeSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOptionsVisible ? 'places__options--opened' : ''}`}>
        {sortOptions.map((option) => (
          <li
            key={option}
            className={`places__option ${option === activeSortOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}
