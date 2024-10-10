import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, addReply } from '../features/userSlice';
import { toggleRepliesVisibility } from '../features/userSlice';
import { toggleCommentLike } from '../features/userSlice';

const Comments = ({ postIndex }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.user.posts);
  const username = useSelector((state) => state.user.username);
  const post = posts[postIndex];
  const loggedInUser = useSelector((state) => state.user.username);

  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [activeCommentIndex, setActiveCommentIndex] = useState(null);
  const [showComments, setShowComments] = useState(true); // New state for toggling comments visibility
//   const [showReplies, setShowReplies] = useState(true);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      dispatch(addComment({ postIndex, username, commentText }));
      setCommentText('');
    }
  };

  const handleToggleReplies = (postIndex, commentIndex) => {
    dispatch(toggleRepliesVisibility({ postIndex, commentIndex }));
  };

  const handleAddReply = (commentIndex, e) => {
    e.preventDefault();
    if (replyText.trim()) {
      dispatch(addReply({ postIndex, commentIndex, username, replyText }));
      setReplyText('');
      setActiveCommentIndex(null);
    }
  };

  // const handleKeyDownAddReply = (commentIndex, e) => {
  //   e.preventDefault();
  //   if (e.key === 'Enter') {
  //     if (replyText.trim()) {
  //       dispatch(addReply({ postIndex, commentIndex, username, replyText }));
  //       setReplyText('');
  //       setActiveCommentIndex(null);
  //     }
  //   }
    
  // };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

//   const toggleReplies = () => {
//     setShowReplies((prev) => !prev);
//   };

  return (
    
    <div className="_timeline_comment_main" style={{margin: '5px'}}>
        <div className="_feed_inner_comment_box" style={{margin: '10px'}}> 
        <form className="_feed_inner_comment_box_form" onSubmit={handleAddComment}>
          <div className="_feed_inner_comment_box_content">
            <div className="_feed_inner_comment_box_content_image">
              <img src="assets/images/comment_img.png" alt="" className="_comment_img" />
            </div>
            <div className="_feed_inner_comment_box_content_txt">
              <textarea
                className="form-control _comment_textarea"
                placeholder="Write a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </div>
          </div>
          <div className="_feed_inner_comment_box_icon" >
            <button className="_feed_inner_comment_box_icon_btn" type="submit"
            
            style={{
                color: 'white',
                backgroundColor : '#009768' ,           
                border: '2px solid white',             
                borderRadius: '15px',        
                cursor: 'pointer',           
                fontSize: '15px',            
                fontWeight: '700',
                padding : '5px'
            }}
            
            >
              Add
            </button>
          </div>
        </form>
      </div>
      {post.comments.length ? <div className="_previous_comment">
        <button 
          type="button" 
          onClick={toggleComments} // Toggle comments on button click
          style={{
            color: '#433e3e',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '700',
            backgroundColor : "#ffffff"
          }}
        >
          {showComments ? 'Hide all comments ↩' : 'View all comments ↪'}
        </button>
      </div> : null}

      {showComments &&  post.comments.map((comment, commentIndex) => {
        
        const tcomment = post.comments[commentIndex]; // Get the specific comment
        const isLiked = tcomment.likedBy.includes(loggedInUser);   

        return(<div key={commentIndex} className="_comment_main">
          <div className="_comment_image">
            <a href="profile.html" className="_comment_image_link">
              <img src="assets/images/txt_img.png" alt="" className="_comment_img1" />
            </a>
          </div>
          <div className="_comment_area">
            <div className="_comment_details">
              <div className="_comment_details_top">
                <div className="_comment_name">
                  <a href="profile.html">
                    <h4 className="_comment_name_title">{comment.username}</h4>
                  </a>
                </div>
              </div>
              <div className="_comment_status">
                <p className="_comment_status_text"><span
                
                style={{
        
                    fontSize: '18px',
                    paddingTop : '5px',
                    paddingBottom : '5px',  
                    //color : "#433e3e"  
               
                  }}
                >{comment.text}</span></p>

                

              </div>




                
                {/* Like button for the comment */}
                <div><button
                    onClick={() =>
                      dispatch(toggleCommentLike({ postIndex, commentIndex, username }))
                    }
                 

                style={{
                  
                  color: 'blue',             
                  border: 'none',             
                  cursor: 'pointer',         
                  fontSize: '13px',         
                  marginBottom : '20px',
                  marginTop : '10px',
                  marginRight : '20px',
                  fontWeight: '700'
                }} >
                    <>
                      
                      <div style={{
                  marginBottom : '10px',
                  color: 'black',
                  cursor: 'none'
                }}>{comment.likes <= 1 ? `${comment.likes} Like` : `${comment.likes} Likes`}</div>
                      {isLiked ? '👎' : '👍'}
                    </>
                </button></div>


              {activeCommentIndex !== commentIndex && (
                <button onClick={() => setActiveCommentIndex(commentIndex)  } className="_comment_reply_button"
                
                style={{
                  
                    color: 'blue',             
                    border: 'none',             
                    cursor: 'pointer',         
                    fontSize: '13px',         
                    marginBottom : '20px',
                    fontWeight: '700'
                  }}
                
                >Add a reply</button>
              )}

              {activeCommentIndex === commentIndex && (
                <div className="_reply_area">
                  <textarea
                    className="form-control _comment_textarea"
                    placeholder="Write a reply"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button onClick={(e) => handleAddReply(commentIndex, e)} className="_feed_inner_comment_box_icon_btn" 
                  
                  style={{

                  color: '#fa0000',              
                  border: 'none',              
                  cursor: 'pointer',           
                  fontSize: '15px',            
                  marginBottom : '20px',
                  fontWeight: '700'

                  }}
                  
                  
                  >Add 🖊</button>
                </div>
              )}

              {/* Displaying Replies */}
              {comment.replies.length > 0 && (
                // 
                <div className="_comment_replies"
                  style=
                      {{ 
                        //borderRadius : '5px',
                        //backgroundColor : '#efefef',
                        //padding : '10px',
                        marginLeft : '20px',
                        marginTop : '10px'
                      }}
                  >
                    
                    <button onClick={() => handleToggleReplies(postIndex, commentIndex)}
                    style={{
                      color: '#433e3e',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: '700',
                      backgroundColor : "#f6f6f6"
                  }}>
                      {comment.showReplies ? 'Hide all replies ↩' : 'View all replies ↪'}
                    </button>
           

                    {comment.showReplies && (
                    <div>
                    
                    {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="_comment_reply" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <div className="_comment_image" style={{ marginRight: '10px' }}>
                        <a href="profile.html" className="_comment_image_link">
                            <img src="assets/images/react_img3.png" alt="" className="_comment_img1" />
                        </a>
                        </div>
                        <div>
                        <div className="_comment_name">
                        <h4 className="_comment_name_title" style={{ marginTop: '20px' }}>{reply.username}</h4>
                        </div>
                        <p className="_comment_status_text" style={{ fontSize: '18px', marginBottom: '20px' }}>
                        {reply.text}
                        </p>
                        </div>
                    </div>

                    ))}

                  </div>)}


                </div>
              )}
            </div>
          </div>
        </div>)
})}

      
    </div>
  );
};

export default Comments;
