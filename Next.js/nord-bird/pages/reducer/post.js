export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://loremflickr.com/640/360",
        },
        {
          src: "https://picsum.photos/200",
        },
        {
          src: "https://picsum.photos/200/300",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "테스트 콘텐트 1",
        },
        {
          User: {
            nickname: "hero",
          },
          content: "테스트 콘텐트 2",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_ERROR = "ADD_POST_ERROR";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_ERROR = "ADD_COMMENT_ERROR";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };

    case ADD_POST_ERROR:
      return {
        ...state,
        addCommentDone: true,
        addCommentError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };

    case ADD_COMMENT_ERROR:
      return {
        ...state,
        addCommentDone: true,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
