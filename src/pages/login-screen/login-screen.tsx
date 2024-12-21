import {FormEvent, JSX, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {LoginInfo} from '../../types/user.ts';
import {login} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks';
import MemoizedHeader from '../../components/header/header.tsx';
import {AppRoute, CITIES} from '../../const.ts';
import {Link} from 'react-router-dom';
import {changeActiveCity} from '../../store/app-data/app-data.ts';

export function LoginScreen() : JSX.Element {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
    password: ''
  });
  const dispatch = useAppDispatch();
  const submitHandle = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(login(loginInfo));
  };
  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).*$/;
    return passwordRegex.test(password);
  }

  const isValid = () =>
    loginInfo.email &&
    validateEmail(loginInfo.email) &&
    loginInfo.password &&
    validatePassword(loginInfo.password)

  const city = CITIES[Math.floor(Math.random() * CITIES.length)];

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <MemoizedHeader />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(event) =>
                    setLoginInfo({
                      ...loginInfo,
                      email: event.target.value
                    })}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(event) =>
                    setLoginInfo({
                      ...loginInfo,
                      password: event.target.value
                    })}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                onClick={submitHandle}
                disabled={!isValid()}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to={AppRoute.Main}
                className="locations__item-link"
                onClick={() => dispatch(changeActiveCity(city))}
              >
                <span>{city.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
