import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null, // Store uploaded image
  });

  const navigate = useNavigate();

  const isLoggedIn = () => {
    // checking if a token exists
    return !!token;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "image" ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("image", formData.image);

    // console.log(formData.image)

    const response = await fetch("http://localhost:3000/posts/createPost", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
      },
      body: formDataToSend,
    });
    // console.log("Response status:", response.statusText);

    if (!response.ok) {
      console.log("Failed to submit form");
    }
    navigate("/");
    // const responseData = await response.json();
    // console.log("Response data:", responseData);
  };

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
  );
};

export default AddPostForm;
