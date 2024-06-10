import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams, Link } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <article className="flex flex-col justify-center items-center min-h-svh bg-gray-700">
      <div className="border py-6 px-5 w-9/12 leading-normal text-white rounded-lg">
        <h2 className="text-4xl font-bold mb-2">{post.title}</h2>
        <p className="text-2xl mb-3 font-semibold">{post.body}</p>
        <p>
          <Link to={`/post/edit/${post.id}`} className="hover:underline">
            Edit Post
          </Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </div>
    </article>
  );
};

export default SinglePostPage;
