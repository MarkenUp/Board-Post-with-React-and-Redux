import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <nav class="flex items-center justify-between flex-wrap min-w-full bg-teal-500 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-semibold text-xl tracking-tight mr-7">
            Redux Blog
          </span>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <Link
              to="/"
              class="block mt-4 font-semibold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-6"
            >
              Home
            </Link>
            <Link
              to="post"
              class="block mt-4 font-semibold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Post
            </Link>
            <Link
              to="user"
              class="block mt-4 font-semibold lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Users
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
