import { useSelector } from "react-redux";
import { selectAllUsers } from "./UsersSlice";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li
      key={user.id}
      className="hover:underline leading-9 transition duration-300 ease-in-out tracking-wider hover:text-blue-400 transform hover:translate-x-5"
    >
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));
  return (
    <section className="bg-gray-700 min-h-svh flex flex-col">
      <div className="ml-10 mt-5">
        <h2 className="text-5xl font-bold text-white mb-3">Users</h2>

        <ul className="text-lg font-semibold text-white">{renderedUsers}</ul>
      </div>
    </section>
  );
};

export default UserList;
