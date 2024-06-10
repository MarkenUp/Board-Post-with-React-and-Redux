import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postSlice";
import { useNavigate, useParams } from "react-router-dom";

import { selectAllUsers } from "../users/UsersSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const userOptions = users.map((user) => (
    <option
      key={user.id}
      value={user.id}
      className="text-gray-600 font-semibold text-lg"
    >
      {user.name}
    </option>
  ));

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-svh bg-gray-600">
      <form className="flex flex-col justify-center items-right border py-3 px-7 bg-white border-gray-700 rounded-xl shadow-xl w-9/12">
        <div className="flex justify-center items-center mt-4">
          <h2 className="font-bold text-3xl mb-10">Edit Post</h2>
        </div>
        <label htmlFor="postTitle" className="text-lg font-semibold mb-2">
          Post Title:
        </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          className="border p-2 rounded border-gray-400 font-semibold text-gray-600 hover:border-black hover:shadow-xl hover:text-black"
        />
        <label htmlFor="postAuthor" className="text-lg font-semibold my-2">
          Author:
        </label>
        <select
          id="postAuthor"
          value={userId}
          onChange={onAuthorChange}
          className="border p-2 rounded border-gray-400 font-semibold text-gray-600 hover:border-black hover:shadow-xl hover:text-black"
        >
          {userOptions}
        </select>
        <label htmlFor="postContent" className="text-lg font-semibold my-2">
          Content:
        </label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChange}
          rows="10"
          className="border p-2 rounded border-gray-400 font-semibold text-gray-600 hover:border-black hover:shadow-xl hover:text-black"
        />
        <div className="flex justify-center items-center gap-5 my-5">
          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
            className="bg-blue-400 p-2 font-semibold text-white rounded border border-blue-400 hover:bg-blue-600 hover:border-blue-600"
          >
            Save Post
          </button>
          <button
            type="button"
            onClick={onDeletePostClicked}
            className="bg-red-400 p-2 font-semibold text-white rounded border border-red-400 hover:bg-red-600 hover:border-red-600"
          >
            Delete Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPostForm;
