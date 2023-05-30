import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

export const Create = () => {
  const userId = useSelector(state => state.user.id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    // Simulating API call to update JSON file
    axios
      .get('./users.json')
      .then(response => {
        const users = response.data.users;
        const user = users.find(user => user.id === userId);
        if (user) {
          const newPostId = user.blogPosts.length + 1;
          const newPost = {
            id: newPostId,
            title,
            content
          };

          user.blogPosts.push(newPost);

          axios
            .put('./users.json', { users })
            .then(() => {
              setTitle('');
              setContent('');
            })
            .catch(error => {
              console.error('Error updating JSON file:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching users data:', error);
      });
  };

  return (
    <div>
      <h2>Create New Blog Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};
