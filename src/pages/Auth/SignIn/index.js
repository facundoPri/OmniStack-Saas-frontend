import React, { useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import AuthActions from '~/store/ducks/auth';

import Button from '~/styles/components/Button';
import { Container, SignForm } from '../styles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      dispatch(AuthActions.signInRequest(email, password));
    },
    [dispatch, email, password]
  );

  return (
    <Container>
      <SignForm onSubmit={handleSubmit}>
        <h1>Boas vindas</h1>

        <span>E-MAIL</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <span>SENHA</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button size="big" type="submit">
          Entrar
        </Button>
      </SignForm>
    </Container>
  );
}
