import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article
      key={post.id}
      className="border w-9/12 p-5 flex flex-col justify-start items-start mb-3 h-1/4 rounded"
    >
      <h3 className="text-4xl font-bold mb-2 text-white">{post.title}</h3>
      <p className="text-2xl text-white">{post.content.substring(0, 100)}</p>
      <p className="text-white mt-2">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ));
  return (
    <section className="flex justify-start flex-col items-center h-svh bg-gray-600">
      <h2 className="text-4xl  mt-10 font-bold mb-7 text-white">Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
