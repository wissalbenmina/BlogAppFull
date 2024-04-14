import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

const MainContent = () => {
  const [posts, setPosts] = useState([]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts/getPosts'); 
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
  
  return (
    <div>
      <div className="mx-auto py-32 sm:py-48 lg:py-56 bg-img">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to BlogApp!
          </h1>
          <p className="m-6 px-6 text-lg leading-8 text-gray-600">
            BlogApp is a platform where you can explore a variety of topics, ranging from technology and 
            science to arts and culture. Our dedicated team of writers strives to bring you engaging and 
            informative content to keep you informed and entertained.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-8 py-6 sm:px-6 sm:py-9 lg:max-w-7xl lg:px-6">
        {isAuthenticated ? (
          <div className='flex justify-between items-center mb-9'>
            <h1 className="text-3xl font-bold">Posts</h1>
            <Link to='/add-post' className="rounded-lg text-white bg-primary-color p-2 w-30">Add Post</Link>
          </div>
        ): (
          <div className='flex justify-between items-center'>
            <h1 className="text-3xl font-bold mb-9 primary-color">Posts</h1>
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-lg text-gray-700">No posts available</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 mx-5">
            {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default MainContent;
