import "./App.css";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UserList from "./features/users/UserList";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./features/users/UserPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<PostsList />} />

          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>

          <Route path="user">
            <Route index element={<UserList />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>

          {/* Catch all = replace with 404 not found component */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
