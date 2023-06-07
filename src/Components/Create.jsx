import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const Create = () => {
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!userId) {
      navigate('/account', { state: { from: location.pathname } }); // Redirect to login route or any other route
    }
  }, [userId, navigate, location]);

  const handleCreatePost = () => {
    axios
      .post('https://blogs-gjhf.onrender.com/api/createPost', {
        userId,
        title,
        content,
      })
      .then(() => {
        setTitle('');
        setContent('');
        navigate('/'); // Navigate back to the home page after creating the post
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <div className='Blog'>
      <div className='centerForm'>
        <h2 style={{fontSize:'20px',marginBottom:'20px' }}>Create new Blog Post</h2>
        <div className='fields'>
          <label>Title</label>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className='inputField'/>
        </div>
        <div className='fields'>
          <label>Content</label>
          <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} style={{height:'32px',width:'100%',resize:'none',overflow:'scroll',border:'1px solid black',marginBottom:'10px',marginTop:'10px',borderRadius:'4px'}}></textarea>
        </div>
        <button onClick={handleCreatePost} style={{width:'50%',paddingTop:'2px',paddingBottom:'2px'}}>Create Post</button>
      </div>
    </div>
  );
};
