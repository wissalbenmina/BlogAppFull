import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#fefefe] py-4 text-center ">
      <p className="text-gray-600">© {new Date().getFullYear()} BlogApp. All rights reserved.</p>
      <p className="text-gray-600 mt-2">Thank you for visiting our blog!</p>
    </footer>
  )
}

export default Footer
