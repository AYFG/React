export const initialState = {
  user: {
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, //로그아웃 시도중
    logOutDone: false,
    logOutError: false,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpERROR: null,
    me: null,
    signUpData: {},
    loginData: {},
  },
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_ERROR = "LOG_IN_ERROR";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_ERROR = "LOG_OUT_ERROR";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_ERROR = "FOLLOW_ERROR";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_ERROR = "UNFOLLOW_ERROR";

const dummyUser = (data) => ({
  ...data,
  nickname: "제로초",
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data),
      };
    case LOG_IN_ERROR:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDong: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_ERROR:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupDong: false,
        signupError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupDone: true,
        me: null,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        signupLoading: false,
        signupError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
