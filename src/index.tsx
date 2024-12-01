import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app.tsx';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthorization, fetchFavoritesOffers, fetchOffers} from './store/api-actions.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthorization());
store.dispatch(fetchOffers());
store.dispatch(fetchFavoritesOffers());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
