import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../redux/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Account = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createAccountUsername, setCreateAccountUsername] = useState('');
  const [createAccountEmail, setCreateAccountEmail] = useState('');
  const [createAccountPassword, setCreateAccountPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleCreateAccount = () => {
    const newUser = {
      username: createAccountUsername,
      firstName,
      lastName,
      email: createAccountEmail,
      password: createAccountPassword,
      blogPosts: [],
    };

    axios
      .post('https://blogs-gjhf.onrender.com/api/users/register', newUser)
      .then((response) => {
        console.log('Register response:', response.data);
        dispatch(loginUser({ id: response.data.id }));
        setCreateAccountUsername('');
        setCreateAccountEmail('');
        setCreateAccountPassword('');
        setFirstName('');
        setLastName('');
        navigate(previousPath);
      })
      .catch((error) => {
        console.error('Error creating account:', error);
      });
  };

  const handleLogin = () => {
    const loginData = {
      username: loginUsername,
      password: loginPassword,
    };

    axios
      .post('https://blogs-gjhf.onrender.com/api/users/login', loginData)
      .then((response) => {
        console.log('Login response:', response.data);
        dispatch(loginUser({ id: response.data.id }));
        setLoginUsername('');
        setLoginPassword('');
        if (previousPath === '/account') {
          navigate('/');
        } else {
          navigate(-1);
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };

  useEffect(() => {
    setPreviousPath(location.state?.from);
  }, [location.state]);

  return (
    <div className='Blog'>
      {/* Create Account form fields */}

      <div className='centerForm'>
        <h2 style={{fontSize:'20px',marginBottom:'20px' }}>Createt an account</h2>
        <div className='fields'>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className='inputField'/>
        </div>
        
        <div className='fields'>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}  className='inputField' />
        </div>
  
        <div className='fields'>
          <label>Username</label>
          <input type="text" value={createAccountUsername} onChange={(e) => setCreateAccountUsername(e.target.value)}  className='inputField'/>
        </div>
  
        <div className='fields'>
          <label>Email</label>
          <input type="email" value={createAccountEmail} onChange={(e) => setCreateAccountEmail(e.target.value)}  className='inputField'/>
        </div>
  
        <div className='fields'>
          <label>Password</label>
          <input type="password" value={createAccountPassword} onChange={(e) => setCreateAccountPassword(e.target.value)}  className='inputField'/>
        </div>
  
        <button onClick={handleCreateAccount} style={{width:'50%',paddingTop:'2px',paddingBottom:'2px'}}>Create Account</button>
      </div>

      {/* Login form fields */}
      
      <div className='centerForm'>
        <h2 style={{fontSize:'20px',marginBottom:'20px' }}>Login</h2>
        <div className='fields'>
          <label>Username</label>
          <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className='inputField'/>
        </div>

        <div className='fields'>
          <label>Password</label>
          <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className='inputField' />
        </div>
      <button onClick={handleLogin} style={{width:'50%',paddingTop:'2px',paddingBottom:'2px'}}>Login</button>
      </div>
      <p>User ID: {userId}</p>
    </div>
  );
};
