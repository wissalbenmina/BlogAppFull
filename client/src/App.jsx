import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContent from './pages/MainContent';
import LoginForm from './pages/LoginForm';
import SignUpForm from './pages/SignUpForm';
import PostDetails from './pages/PostDetails'
import Profile from './pages/Profile';
import AddPostForm from './pages/AddPostForm';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mt-[70px]">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path='/posts/:id' element={<PostDetails/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/add-post' element={<AddPostForm/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
