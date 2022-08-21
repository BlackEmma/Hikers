import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Modal, Card, Text } from '@geist-ui/core';
import css from './Login.module.css';
import {
  selectorAuthLogin,
  selectorAuthLoginError,
  authLogin,
  booleanAuthLogin,
  errorAuthLogin
} from '../auth';

export default function Login() {
  const dispatch = useDispatch();

  const auth = useSelector(selectorAuthLogin);
  const authError = useSelector(selectorAuthLoginError);

  const handlerModal = (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    dispatch(authLogin({ email: email.value, password: password.value }));
  };

  return (
    <Modal visible={auth} onClose={() => dispatch(booleanAuthLogin())}>
      <form id={css.form} onSubmit={handlerModal}>
        <div className={css.href}>Нет учетной записи? Регистрация</div>
        <div className={authError ? css.authError : css.auth}>Авторизация</div>
        {authError && (
          <Card width="100%" type={`${'error'}`} className={css.error}>
            <Text>{authError}</Text>
          </Card>
      )}
        <input type="email" name="email" placeholder="Введите почту" onChange={() => dispatch(errorAuthLogin())} required />
        <input type="password" name="password" placeholder="Введите пароль" onChange={() => dispatch(errorAuthLogin())} required />
        {/* <Modal.Action>Войти</Modal.Action> */}
        <button className={css.button} passive="true" type="submit">Войти</button>
      </form>
    </Modal>
  );
}
