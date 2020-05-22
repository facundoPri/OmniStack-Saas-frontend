import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import store from './store';
import Routes from '~/routes';

import GlobalStyles from './styles/global';

const App = () => (
  <Provider store={store}>
    <>
      <Routes />
      <ReduxToastr />
      <GlobalStyles />
    </>
  </Provider>
);

export default App;
