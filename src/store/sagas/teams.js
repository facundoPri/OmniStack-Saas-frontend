import { call, put } from 'redux-saga/effects';
import api from '~/services/api';

import TeamsAction from '../ducks/teams';

export function* getTeams() {
  const response = yield call(api.get, 'teams');

  yield put(TeamsAction.getTeamsSuccess(response.data));
}
