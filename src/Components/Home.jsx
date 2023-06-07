import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogCard } from './BlogCard';

export const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://blogs-gjhf.onrender.com/api/users');
        const jsonData = response.data;
        setData(jsonData.users);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
      console.log(data)
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='PostsContainer'>
      {data && data.map(user => (
  user.blogPosts.map(post => (
    <Link key={post._id} to={`/blog/${post._id}`} className='linkToPosts'>
      <BlogCard
        firstName={user.firstName}
        lastName={user.lastName}
        title={post.title}
      />
    </Link>
  ))
))}


    </div>
  );
};
