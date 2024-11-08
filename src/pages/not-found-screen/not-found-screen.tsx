import {JSX} from 'react';
import {Helmet} from 'react-helmet-async';

export function NotFoundScreen() : JSX.Element {
  return (
    <body>
      <Helmet>
        <title>6 sities: Page Not Found</title>
      </Helmet>
      <div className="page-404">
        <h1>404 Not Found</h1>
        <p>Извините, страница не найдена.</p>
        <a href="/">На главную</a>
      </div>
    </body>
  );
}
