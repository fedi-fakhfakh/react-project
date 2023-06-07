import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const BlogPost = ({ title, content, postId,firstName,lastName}) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.id);
  const navigate = useNavigate();

  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://blogs-gjhf.onrender.com/api/blogPosts/comments`, {
          params: {
            postId: postId
          }
        });
        console.log('Fetched Comments:', response.data);
        const fetchedComments = response.data.comments;
  
        // Check if the fetched comments are different from the current comments state
        if (!areCommentsEqual(comments, fetchedComments)) {
          setComments(fetchedComments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments();
  }, [postId, comments]);

  
  // Function to compare if two arrays of comments are equal
  const areCommentsEqual = (comments1, comments2) => {
    if (comments1.length !== comments2.length) {
      return false;
    }
  
    for (let i = 0; i < comments1.length; i++) {
      if (comments1[i].username !== comments2[i].username || comments1[i].content !== comments2[i].content) {
        return false;
      }
    }
  
    return true;
  };
  


  

const handleCreateComment = () => {
  if (userId) {
    const commentData = {
      postId,
      userId,
      content: commentContent
    };

    axios.post('https://blogs-gjhf.onrender.com/api/createComment', commentData)
      .then(response => {
        console.log('Comment created successfully:', response.data);
        setCommentContent('');

        // Extract the comment from the response data
        const newComment = {
          username: response.data.username, // Make sure response.data contains the 'username' property
          content: response.data.content
        };

        // Update the comments state by adding the new comment to the existing array
        setComments(prevComments => [...prevComments, newComment]);
      })
      .catch(error => {
        console.error('Error creating comment:', error);
      });
  } else {
    navigate('/account');
  }
};

  

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className='Blog'>
        <div className='BlogContent'>
          <div style={{display:'flex',flexDirection:'row',width:'50%',justifyContent:'space-between'}}>
  
            <div style={{display:'flex',gap:'10px',fontWeight:'normal',color: 'black',fontSize: '10'}}>
              <p>{firstName}</p>
              <p>{lastName}</p>
            </div>
  
            <h2 className='BlogName'>{title}</h2>
  
          </div>
          <p className='BlogParagraph'>{content}</p>
        </div>
        <section style={{position:'relative',marginBottom:'40px'}}>
          <h3>Create Comment</h3>
          <div style={{width:'100%',height:'0px',border:'1px solid rgb(190, 190, 190)'}}></div>
          <textarea value={commentContent} onChange={e => setCommentContent(e.target.value)} style={{height:'32px',width:'100%',resize:'none',overflow:'scroll',border:'1px solid rgb(160, 160, 160)',marginBottom:'10px',marginTop:'10px'}}></textarea>
          <button onClick={handleCreateComment} style={{position:'absolute',right:'0px',color:'white',backgroundColor:'rgb(160, 160, 160)',padding:'10px'}}>Create Comment</button>
        </section>
        <section>
          <h3>Comments</h3>
          <div style={{width:'100%',height:'0px',border:'1px solid rgb(190, 190, 190)',marginBottom:'10px'}}></div>
          {comments.map((comment, index) => (
            <div key={index} style={{width:'100%',border:'1px solid rgb(160, 160, 160)',paddingTop:'10px',marginBottom:'5px'}}>
              <p style={{marginBottom:'5px'}}>Username: {comment.username}</p>
              <p style={{marginBottom:'10px'}}>Content: {comment.content}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};