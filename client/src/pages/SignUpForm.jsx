import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) {
        setError("Registration failed");
      }

      const { token } = await response.json();
      localStorage.setItem('token', token); // Store token in local storage
      navigate('/');

    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  return (
    <div className='text-white h-[100vh] flex items-center justify-center bg-img'>
      <div className='bg-slate-500 border border-violet-500 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative w-[500px]'>
        <h1 className='text-4xl font-bold text-center mb-6'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <div className='relative my-4'>
                <input 
                  type="text"
                  name='username'
                  id='username'
                  onChange={(e) => setUsername(e.target.value)}
                  className='block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:text-white focus:border-violet-500 peer'/>
                <label htmlFor="username" className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Username</label>
            </div>
            <div className='relative my-4'>
                <input 
                  type="email" 
                  name='email'
                  id='email'
                  onChange={(e) => setEmail(e.target.value)}
                  className='block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:text-white focus:border-violet-500 peer'/>
                <label htmlFor="email" className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Email</label>
            </div>
            <div className='relative my-4'>
                <input 
                  type="password" 
                  name='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  className='block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:text-white focus:border-violet-500 peer'/>
                <label htmlFor="password" className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Password</label>
            </div>
            <button type='submit' className='w-full mb-4 text-[18px] mt-6 rounded-lg bg-primary-color p-2'>Sign Up</button>
            
            {error && (
              <p className="mt-2 text-center text-red-500">{error}</p>
            )}
            
        </form>
      </div>
    </div>
  )
}

export default SignUpForm
