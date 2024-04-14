import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditPost = () => {
    const {id} = useParams();
    const [post, setPost] = useState();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/posts/getPostById/${id}`)
                setPost(response.data)
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        }
        fetchPostData();
    }, [id]);
    
  return (
    <div>
      <section className="p-6 bg-gray-100 text-gray-900">
        <form
          onSubmit={handleSubmit}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-9 m-11 rounded-md shadow-sm bg-gray-50 ">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Post Information</p>
              <p className="text-xs">Fill up the form</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Username"
                  name="title"
                  onChange={handleChange}
                  className="w-full p-1 rounded-md focus:ring focus:ring-opacity-75 text-gray-800 focus:ring-violet-600 border-gray-300"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="content"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows="4"
                  onChange={handleChange}
                  className="w-full p-1 rounded-md focus:ring focus:ring-opacity-75 text-gray-800 focus:ring-violet-600 border-gray-300"
                ></textarea>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="col-span-full">
                <button
                  type="submit"
                  className="w-full text-[18px] mt-6 rounded-lg bg-primary-color p-2"
                >
                  Add Post
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  )
}

export default EditPost
