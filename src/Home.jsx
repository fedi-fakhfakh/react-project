import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "./BlogCard";

export const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('./users.json');
        const jsonData = response.data;
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.users.map(user =>
        user.blogPosts.map(post => (
          <Link key={post.id} to={`/blogs/${user.username}/${post.id}`}>
            <BlogCard
              firstName={user.firstname}
              lastName={user.lastname}
              title={post.title}
            />
          </Link>
        ))
      )}
    </>
  );
};
