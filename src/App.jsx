import axios from "axios";
import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { NavBar } from './NavBar';
import { Home } from './Home';
import { BlogPost } from './BlogPost';
import { Account } from "./Account";
import { Create } from "./Create";

function App() {
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
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {data.users && data.users.map(user => (
          user.blogPosts.map(posts => (
            <Route
              key={`${posts.id}`}
              path={`/blogs/${user.username}/${posts.id}`}
              element={<BlogPost title={posts.title} content={posts.content}/>}
            />
          ))
        ))}
        <Route path="/account" element={<Account/>} />
        <Route path="/create" element={<Create/>} />
      </Routes>
    </>
  );
}

export default App;
