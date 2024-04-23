import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "./components/AppLayout";
import { PostForm } from "./components/PostForm";
import { PostCard } from "./components/PostCard";
import { LOAD_POSTS_REQUEST } from "./reducer/post";
import { LOAD_USER_REQUEST } from "./reducer/user";
import wrapper from "../pages/store/configureStore";
import { END } from "redux-saga";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } =
    useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_USER_REQUEST,
  //   });
  // }, []);
  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_POSTS_REQUEST,
  //   });
  // }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log(context);
    context.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    // REQUEST가 SUCCESS가 될 때까지 기다리게 해준다.
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
