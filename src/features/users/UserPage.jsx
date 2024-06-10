import { useSelector } from "react-redux";
import { selectUserById } from "./UsersSlice";
import { selectAllPosts } from "../posts/postSlice";
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter((post) => post.userId === Number(userId));
  });

  const postTitles = postsForUser.map((post) => (
    <li
      key={post.id}
      className="border-2 mb-2 p-2 rounded text-white font-semibold text-lg"
      style={{
        borderColor: "rgb(255, 255, 255)",
        animation: "borderColorAnimation 5s infinite",
      }}
    >
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section className="bg-gray-700 min-h-svh flex flex-col justify-center items-center">
      <div
        className="border-4 p-4 rounded-xl"
        style={{
          borderColor: "rgb(255, 255, 255)",
          animation: "borderColorAnimation 5s infinite",
        }}
      >
        <h2 className="text-white text-3xl font-bold mb-3">{user?.name}</h2>
        <ol>{postTitles}</ol>
      </div>
    </section>
  );
};

export default UserPage;
