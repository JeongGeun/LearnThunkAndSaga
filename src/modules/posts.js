import * as postsAPI from "../api/posts";
import {
  createPromiseSaga,
  createPromiseSagaById,
  reducerUtils,
  handleAsyncActions,
  handleAsyncActionsById,
} from "../lib/asyncUtils";
import { takeEvery } from "redux-saga/effects";

const GET_POSTS = "post/GET_POSTS";
const GET_POSTS_SUCCESS = "post/GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "post/GET_POSTS_ERROR";

const GET_POST = "post/GET_POST";
const GET_POST_SUCCESS = "post/GET_POST_SUCCESS";
const GET_POST_ERROR = "post/GET_POST_ERROR";

// 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

export const goToHome =
  () =>
  (dispatch, getState, { history }) => {
    history.push("/");
  };

const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, "posts", true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById(GET_POST, "post", true)(state, action);
    default:
      return state;
  }
}
