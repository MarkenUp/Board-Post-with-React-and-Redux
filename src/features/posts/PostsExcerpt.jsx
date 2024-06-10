import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

const PostsExcerpt = ({ post }) => {
  return (
    <article className="border w-9/12 p-5 flex flex-col justify-start items-start h-1/4 rounded mb-2">
      <h2 className="text-4xl font-bold mb-2 text-white">{post.title}</h2>
      <p className="text-xl text-white">{post.body.substring(0, 75)}</p>
      <p className="text-white mt-2">
        <Link
          to={`post/${post.id}`}
          className="hover:underline hover:font-semibold"
        >
          View Post
        </Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
