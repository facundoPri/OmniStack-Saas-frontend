import React, { useEffect } from 'react';
import api from '~/services/api';

// import { Container } from './styles';

function Main() {
  useEffect(() => {
    api.get('/teste');
  });

  return <h1>Hello</h1>;
}

export default Main;
