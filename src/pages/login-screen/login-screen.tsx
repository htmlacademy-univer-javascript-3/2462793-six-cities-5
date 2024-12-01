import {FormEvent, JSX, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {LoginInfo} from '../../types/user.ts';
import {login} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks';
import MemoizedHeader from '../../components/header/header.tsx';

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
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
