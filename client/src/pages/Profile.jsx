import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import PostCard from "../components/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MyPosts from "../components/MyPosts";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/posts/getPosts');
  //       setPosts(response.data);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  // useEffect(() => {
  //   // Retrieve token from local storage
  //   const token = localStorage.getItem("token");

  //   // Decode the token to extract user ID
  //   const decoded = jwtDecode(token);
  //   const userId = decoded.userId; // Assuming the token contains userId field

  //   // Fetch user data using the user ID
  //   fetch(`http://localhost:3000/users/getUser/${userId}`)
  //     .then((response) => response.json())
  //     .then((data) => setUser(data))
  //     .catch((error) => console.error("Error fetching user:", error));
  // }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");

        // Decode the token to extract user ID
        const decoded = jwtDecode(token);
        const userId = decoded.userId; // Assuming the token contains userId field

        // Fetch user data using the user ID
        const response = await axios.get(
          `http://localhost:3000/users/getUser/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");

        // Decode the token to extract user ID
        const decoded = jwtDecode(token);
        const userId = decoded.userId; // Assuming the token contains userId field

        // Fetch posts associated with the user ID
        const response = await axios.get(
          `http://localhost:3000/posts/getPostsById/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token.replace(/['"]+/g, "")}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
      fetchUserPosts();
    }
  }, [isAuthenticated]);

  return (
    <div>
      {user ? (
        <main className="profile-page">
          <section className="relative block" style={{ height: "500px" }}>
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src="../src/assets/profile-picture.png"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                          style={{ maxWidth: "150px" }}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="rounded-lg text-white bg-primary-color p-2 w-20 text-center uppercase font-bold hover:shadow-md shadow text-xs outline-none focus:outline-none sm:mr-2 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          <a href="#footer">Settings</a>
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            12
                          </span>
                          <span className="text-sm text-gray-500">
                            Companies
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            32
                          </span>
                          <span className="text-sm text-gray-500">
                            Projects
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                            3
                          </span>
                          <span className="text-sm text-gray-500">
                            Collaborations
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
                      {user.username}
                    </h3>
                    {/* <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold ">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    {user.email}
                  </div> */}
                    <div className="mb-2 text-gray-700 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                      Full Stack Developer
                    </div>
                    <div className="mb-2 text-gray-700">
                      <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                      B.Tech (CSE)
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          A developer with expertise in multiple stacks with use
                          of latest technologies. Worked with multiple clients
                          on different ideas to implement and create successful
                          products for real world problems and to simplify them.
                        </p>
                        <a
                          href="#pablo"
                          className="font-normal text-pink-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Show more
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-gray-300">
                    <div className="">
                      {posts.length === 0 ? (
                        <p className="text-lg text-gray-700">
                          No posts available
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 mx-5">
                          {posts.map((post) => (
                            <MyPosts key={post._id} post={post} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
