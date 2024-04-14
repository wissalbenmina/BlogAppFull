import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deletePostRequest, deletePostSuccess, deletePostFailure } from '../redux/actions/postActions';

const MyPosts = ({ post, className }) => {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const deleting = useSelector(state => state.post.deleting);
  const error = useSelector(state => state.post.error);
  const deletedPostId = useSelector(state => state.post.deletedPostId);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/getUser/${post.userId}`
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [post.userId]);

  const handleDelete = async () => {
    dispatch(deletePostRequest());
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/posts/deletePost/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
          },
        }
      );
      dispatch(deletePostSuccess(post._id));
      // Assuming the server returns a success message upon deletion
      console.log(response.data.message);
      
    } catch (error) {
      dispatch(deletePostFailure(error.message));
      console.error("Error deleting post:", error);
    }
  };

  if (deleting) {
    return <div>Deleting post...</div>;
  }

  if (error) {
    return <div>Error deleting post: {error}</div>;
  }

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] bg-white mb-8 ${className}`}
    >
      <img
        className="w-full object-cover object-center h-48"
        src={post.image}
        alt={post.imageAlt}
      />
      <div className="px-5 h-60">
        <div className="relative flex rounded-full mt-6 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <img
            className="h-8 w-8 rounded-full"
            src="../src/assets/profile-picture.png"
            alt=""
          />
          <p className="flex items-center font-roboto text-10 ml-6">
            {username}
          </p>
        </div>
        <h2 className="font-roboto font-bold text-xl text-dark-soft mt-6 text-purple-500">
          {post.title}
        </h2>
        <p className="text-dark-light mt-3 text-sm line-clamp-3">
          {post.content}
        </p>
        <div className="flex items-center justify-between mt-4 mb-3">
          <Link
            to={`/edit-post/${post._id}`}
            className="text-sm text-gray-500 hover:text-primary-color"
          >
            Edit
          </Link>
          <button onClick={handleDelete} className="text-sm text-gray-500 hover:text-primary-color">
            Delete
          </button>
        </div>
        <div className="flex items-center mt-4 mb-3">
          <Link
            to={`/posts/${post._id}`}
            className="text-sm text-gray-500 hover:text-primary-color"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
