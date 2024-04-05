import axios from "axios";
import { all, takeLatest } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from "../reducer/user";

function loginAPI(data) {
  return axios.post("/api/login", data);
}

function* login(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: err.response.data,
    });
  }
}

function signupAPI() {
  return axios.post("/api/signup");
}

function* signup() {
  try {
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_ERROR,
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGN_OUT_REQUEST, signup);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchSignUp)]);
}
