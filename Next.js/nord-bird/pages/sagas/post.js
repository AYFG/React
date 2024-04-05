import { takeLatest } from "redux-saga/effects";
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
} from "../reducer/post";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_ERROR,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}
function* addComment(action) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_ERROR,
      data: err.response.data,
    });
  }
}

function* watchCommentPost() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
