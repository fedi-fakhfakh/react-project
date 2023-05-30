import React, { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import axios from 'axios';
import { loginUser } from './redux/slices/userSlice';

export const Account = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.id);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    // Simulating API call to update JSON file
    axios
      .get('./users.json')
      .then(response => {
        const users = response.data.users;
        const newUserId = users.length + 1;
        const newUser = {
          id: newUserId,
          username,
          firstName,
          lastName,
          email,
          password,
          blogPosts: [],
        };

        users.push(newUser);

        axios
          .put('./users.json', { users })
          .then(() => {
            dispatch(loginUser({ id: newUserId }));
            setUsername('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setEmail('');
          })
          .catch(error => {
            console.error('Error updating JSON file:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching users data:', error);
      });
  };
  const handleLogin = () => {
    // Simulating API call to fetch JSON file
    axios
      .get('./users.json')
      .then(response => {
        const users = response.data.users;
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
          dispatch(loginUser({ id: user.id }));
        } else {
          console.log('Invalid username or password');
        }

        setUsername('');
        setPassword('');
      })
      .catch(error => {
        console.error('Error fetching users data:', error);
      });
  };

  // Rest of the code

  return (
    <div>
      {/* Create Account form fields */}
      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleCreateAccount}>Create Account</button>
      
      {/* Login form fields */}

      <h2>Login</h2>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>

      <p>User ID: {userId}</p>    {/* Rest of the code */}
    </div>
  );
};

