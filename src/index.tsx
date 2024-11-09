import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app.tsx';
import {offers} from './mocks/offers.ts';
import {detailOffers} from './mocks/detail-offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} detailOffers={detailOffers}/>
  </React.StrictMode>
);
