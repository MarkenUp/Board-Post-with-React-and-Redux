import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsExcerpt = ({ post }) => {
  return (
    <article className="border w-9/12 p-5 flex flex-col justify-start items-start mb-3 h-1/4 rounded">
      <h3 className="text-4xl font-bold mb-2 text-white">{post.title}</h3>
      <p className="text-2xl text-white">{post.body.substring(0, 100)}</p>
      <p className="text-white mt-2">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
