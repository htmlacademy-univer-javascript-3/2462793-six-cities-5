import {JSX} from 'react';
import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import './not-found-screen.css';

export function NotFoundScreen() : JSX.Element {
  return (
    <body className="page-400">
      <Helmet>
        <title>6 sities: Page Not Found</title>
      </Helmet>
      <div className="page-404">
        <h1 className="text-404">404</h1>
        <h2 className="text-not-found">Page Not Found</h2>
        <Link to={AppRoute.Main} className="back-button">Go back to Home</Link>
      </div>
    </body>
  );
}
