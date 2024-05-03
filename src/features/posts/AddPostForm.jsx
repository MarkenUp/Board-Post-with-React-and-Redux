import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "./postSlice";
import { selectAllUsers } from "../users/UsersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));

      setTitle("");
      setContent("");
      setUserId("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option
      key={user.id}
      value={user.id}
      className="text-gray-700 font-semibold"
    >
      {user.name}
    </option>
  ));

  return (
    <section className="flex justify-start flex-col items-center bg-gray-600">
      <h2 className="text-3xl font-bold mb-4 mt-5 text-white">Add New Post</h2>
      <form className="flex flex-col w-9/12 mt-4">
        <label htmlFor="postTitle" className="text-lg font-semibold text-white">
          Post Title:{" "}
        </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          className="p-2 rounded mt-1 border-white mb-5 text-gray-700 font-semibold"
        />
        <label
          htmlFor="postAuthor"
          className="text-lg font-semibold text-white"
        >
          Author:{" "}
        </label>
        <select
          name="postAuthor"
          id="postAuthor"
          value={userId}
          onChange={onAuthorChange}
          className="p-1 rounded mb-5 text-gray-700 font-semibold"
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label
          htmlFor="postContent"
          className="text-lg font-semibold text-white mb-1"
        >
          Content:{" "}
        </label>
        <textarea
          name="postContent"
          id="postContent"
          rows="10"
          value={content}
          onChange={onContentChange}
          className="text-gray-700 font-semibold px-2 py-1"
        />
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
            className={`mt-5 px-4 py-2 rounded font-semibold text-white ${
              canSave ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400"
            }`}
          >
            Save Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
