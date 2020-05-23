import { call, put } from 'redux-saga/effects';
import api from '~/services/api';

import ProjectsAction from '../ducks/projects';

export function* getProjects() {
  const response = yield call(api.get, 'projects');

  yield put(ProjectsAction.getProjectsSuccess(response.data));
}
