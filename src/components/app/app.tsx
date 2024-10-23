import React from 'react';
import {MainScreen} from '../../pages/main-screen/main-screen.tsx';
import {MainScreenProps} from '../../props/main-screen-props.ts';

export function App({placeCount}: MainScreenProps): React.JSX.Element {
  return (
    <MainScreen placeCount={placeCount}/>
  );
}
