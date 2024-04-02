import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const MainContent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts/getPosts'); // Assuming your backend API endpoint for fetching posts
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle errors gracefully, e.g., display an error message to the user
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
          <p className="m-6 text-lg leading-8 text-gray-600">
            BlogApp is a platform where you can explore a variety of topics, ranging from technology and 
            science to arts and culture. Our dedicated team of writers strives to bring you engaging and 
            informative content to keep you informed and entertained.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-9 lg:max-w-7xl lg:px-9">
        <div className='flex justify-between items-center'>
          <h1 className="text-3xl font-bold mb-9">Posts</h1>
          {/* <button className="rounded-lg text-white bg-primary-color p-2 w-30 mt-3">Add Post</button> */}
          {/* <button className="rounded-lg text-white bg-primary-color p-2 w-30 mt-3" onClick={addPost}>Add Post <FontAwesomeIcon icon={faPlus} /></button> */}
        </div>

        {posts.length === 0 ? (
          <p className="text-lg text-gray-700">No posts available</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 mx-5">
            {posts.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))}
          </div>
          // <section className='container mx-auto flex flex-wrap md:gap-x-5 gap-y-5 px-5 py-10'>
          //   {posts.map((post) => (
          //     <PostCard key={post.id} post={post} className='w-full'/>
          //   ))}
          // </section>
        )}
        
      </div>
    </div>
  );
}

export default MainContent;
