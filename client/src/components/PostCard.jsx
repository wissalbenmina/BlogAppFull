import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const PostCard = ({ post, className }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/getUser/${post.userId}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [post.userId]);

  return (
    <div className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] bg-white mb-8 ${className}`}>
      <img className="w-full object-cover object-center h-auto" src={post.image} alt={post.imageAlt} />
      <div className="px-5">
        <div className="relative flex rounded-full mt-6 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">            
          <img
            className="h-8 w-8 rounded-full"
            src="../src/assets/profile-picture.png"
            alt=""
          />
          <p className='flex items-center font-roboto text-10 ml-6'>{username}</p>
        </div>
        <h2 className="font-roboto font-bold text-xl text-dark-soft mt-6">{post.title}</h2>
        <p className="text-dark-light mt-3 text-sm text-base line-clamp-3">{post.content}</p>
        <div className="flex items-center mt-4 mb-3">
          <Link to={`/posts/${post._id}`} 
                className="text-sm text-gray-500 hover:text-primary-color">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
