import axios from "axios";
import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { NavBar } from './Components/NavBar';
import { Home } from './Components/Home';
import { BlogPost } from './Components/BlogPost';
import { Account } from "./Components/Account";
import { Create } from "./Components/Create";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://blogs-gjhf.onrender.com/api/users'); // Replace '/api/users' with your actual API endpoint
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
        <Route exact path="/Home" element={<Home />} />
        {data.users && data.users.map(user => (
          user.blogPosts.map(posts => (
            <Route
              key={`${posts.id}`}
              path={`/blog/${posts._id}`}
              element={<BlogPost title={posts.title} content={posts.content} postId={posts._id} firstName={user.firstName} lastName={user.lastName} />}
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
