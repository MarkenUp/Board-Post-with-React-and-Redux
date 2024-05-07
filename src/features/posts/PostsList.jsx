import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postSlice";
import PostsExcerpt from "./PostsExcerpt";

import { useEffect } from "react";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = (
      <p className="text-white font-semibold text-xl">
        <svg
          className="h-5 w-5 mr-3 animate-spin inline-block text-white"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.707 15H2c0 3.309 2.691 6 6 6v-2.764l-2-1.945zM13 20.764V18c3.309 0 6-2.691 6-6h-2.707a7.963 7.963 0 01-2 3.291zM20 11a8.001 8.001 0 01-4 6.928V15h-2v5.764A8.001 8.001 0 0112 11h8z"
          ></path>
        </svg>
        Loading...
      </p>
    );
  } else if (postsStatus === "succeeded") {
    const uniquePostIds = new Set();
    const uniquePosts = [];

    /* const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} /> */

    for (const post of posts) {
      if (!uniquePostIds.has(post.id)) {
        uniquePostIds.add(post.id);
        uniquePosts.push(post);
      }
    }

    // Sort posts by date in descending order
    uniquePosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    content = uniquePosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }
  return (
    <section className="flex justify-start flex-col items-center min-h-lvh bg-gray-600">
      <h2 className="text-4xl  mt-10 font-bold mb-7 text-white">Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
