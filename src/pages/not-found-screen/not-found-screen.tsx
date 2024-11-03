import {JSX} from 'react';

export function NotFoundScreen() : JSX.Element {
  return (
    <body>
      <div className="page-404">
        <h1>404 Not Found</h1>
        <p>Извините, страница не найдена.</p>
        <a href="/">На главную</a>
      </div>
    </body>
  );
}
