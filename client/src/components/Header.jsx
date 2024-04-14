import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const navigationLinks = [
  { text: "Home", url: "/" },
  { text: "About", url: "#" },
  { text: "Contact Us", url: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear token from local storage and set authenticated to false
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <div className="bg-[#fefefe] h-[70px] w-full mx-auto px-4 flex justify-between items-center fixed shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10">
      <Link to="/" className="text-3xl font-bold primary-color ml-4">
        BlogApp
      </Link>
      <nav className="flex items-center space-x-4">
        {navigationLinks.map((link, index) => (
          <Link
            key={index}
            to={link.url}
            className="text-gray-600 hover:text-primary-color transition duration-300"
          >
            {link.text}
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="../src/assets/profile-picture.png"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                        onClick={handleLogout}
                      >
                        Sign out
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="rounded-lg text-white bg-primary-color p-2 w-20 text-center"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-lg text-white bg-primary-color p-2 w-20 text-center"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
