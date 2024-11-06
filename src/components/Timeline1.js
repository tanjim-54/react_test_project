import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, deletePost, editPost, toggleHidePost, toggleRepliesVisibility } from '../features/userSlice';
import Comments from './Comments';

const Timeline1 = () => {

  const posts = useSelector((state) => state.user.posts);
  const loggedInUser = useSelector((state) => state.user.username);

  const dispatch = useDispatch();

  const handleLike = (index, username) => {
    dispatch(toggleLike({ postIndex: index, username }));
  };

 

  const [isDropShow2, setIsDropShow2] = useState(false);

	const toggleDropdown = () => {
	  setIsDropShow2((prev) => !prev);
	 console.log(isDropShow2 ? "hidden" : "shown");
	};

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost({ postIndex: index })); 
    }
    setIsDropShow2((prev) => !prev);
  };

  const [editIndex, setEditIndex] = useState(null); 
  const [newText, setNewText] = useState(''); 

  const handleEditClick = (index, currentText) => {
    setEditIndex(index); 
    setNewText(currentText); 
    setIsDropShow2((prev) => !prev);
  };

  const handleSaveClick = (index) => {
    dispatch(editPost({ postIndex: index, updatedText: newText })); 
    setEditIndex(null); // Reset edit mode
  };

  const handleHide = (postIndex, username) => {
    setIsDropShow2((prev) => !prev);
    dispatch(toggleHidePost({ postIndex, username }));
  };

  return (

    <div>
      {posts.length > 0 ? (


        posts.map((post, index) => {
          const isLiked = post.likedBy.includes(loggedInUser);
        
        
          if(post.hidden===false || post.username === loggedInUser){
         
          return(
          
          
     
          <div key={index}>
          <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
              <div className="_feed_inner_timeline_post_top">
                <div className="_feed_inner_timeline_post_box">
                  <div className="_feed_inner_timeline_post_box_image">
                    <img src="assets/images/post_img.png" alt="" className="_post_img"/>
                  </div>
                  <div className="_feed_inner_timeline_post_box_txt">
                    <h4 className="_feed_inner_timeline_post_box_title">{post.username}</h4>
                    <p className="_feed_inner_timeline_post_box_para">{new Date(post.date).toLocaleString()}, 
                      <a href="#0"> <span style={{ color: post.hidden ? 'red' : '#1890ff' }}>
                      {post.hidden ? 'Private' : 'Public'}
                    </span> </a>
                    </p>
                  </div>
                </div>
                <div className="_feed_inner_timeline_post_box_dropdown">
                  <div className="_feed_timeline_post_dropdown">
                    <button href="#0" id="_timeline_show_drop_btn" className="_feed_timeline_post_dropdown_link" onClick={toggleDropdown}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                        <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                        <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                        <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                      </svg>
                    </button>
                  </div>
                
                  {isDropShow2? <div
        								//id="_notify_drop"
        								//className={`dropdown ${isDropShow2 ? 'show' : ''}`}
                         >

                  <div id="_timeline_drop" className="_feed_timeline_dropdown _timeline_dropdown show" >
                    {/* style={{ transform: 'translateY(-40px)'}}> */}
                    <ul className="_feed_timeline_dropdown_list">
                      <li className="_feed_timeline_dropdown_item">
                        <a href="#0" className="_feed_timeline_dropdown_link">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                              <path stroke="#1890FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"/>
                            </svg>															  
                          </span>
                          	
                          <button 
                            //onClick={() => handleDelete(index)} 
                            //disabled={post.username !== loggedInUser} 
                     
                            style={{ 
                              opacity:  1,
                              cursor:  'pointer',
                              background: 'none',
                              border: 'none',
                              padding: '0',  // You can adjust padding if needed
                              margin: '0',
                              outline: 'none', // Remove focus outline
                              
                            }}
                          >
                            Save Post
                          </button>
                        </a>
                      </li>
                      <li className="_feed_timeline_dropdown_item">
                        <a href="#0" className="_feed_timeline_dropdown_link">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
                              <path fill="#377DFF" fill-rule="evenodd" d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z" clip-rule="evenodd"/>
                            </svg>										
                          </span>
                          <button 
                            //onClick={() => handleDelete(index)} 
                            //disabled={post.username !== loggedInUser} 
                     
                            style={{ 
                              opacity:  1,
                              cursor:  'pointer',
                              background: 'none',
                              border: 'none',
                              padding: '0',  // You can adjust padding if needed
                              margin: '0',
                              outline: 'none', // Remove focus outline
                              
                            }}
                          >
                            Turn On Notification
                          </button>
                        </a>
                      </li>
                      <li className="_feed_timeline_dropdown_item">
                        <a href="#0" className="_feed_timeline_dropdown_link">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                              <path stroke="#1890FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5"/>
                            </svg>										
                          </span>
                          <button 
                            
                            disabled={post.username !== loggedInUser} 
                            onClick={()=>handleHide(index, loggedInUser)}
                            
                     
                            style={{ 
                              opacity: post.username !== loggedInUser ? 0.5 : 1,
                              cursor: post.username !== loggedInUser ? 'not-allowed' : 'pointer',
                              background: 'none',
                              border: 'none',
                              padding: '0',  // You can adjust padding if needed
                              margin: '0',
                              outline: 'none', // Remove focus outline
                              
                            }}
                          >
                          {post.hidden ? 'Unhide' : 'Hide'}
                          </button>
                        </a>
                      </li>
                      <li className="_feed_timeline_dropdown_item">
                        <a href="#0" className="_feed_timeline_dropdown_link">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                              <path stroke="#1890FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75"/>
                              <path stroke="#1890FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z"/>
                            </svg>									
                          </span>
                          <button 
                            onClick={() => handleEditClick(index, post.text)}
                            disabled={post.username !== loggedInUser} 
                     
                            style={{ 
                              opacity: post.username !== loggedInUser ? 0.5 : 1,
                              cursor: post.username !== loggedInUser ? 'not-allowed' : 'pointer',
                              background: 'none',
                              border: 'none',
                              padding: '0',  // You can adjust padding if needed
                              margin: '0',
                              outline: 'none', // Remove focus outline
                              
                            }}
                          >
                            Edit Post
                          </button>	
                        </a>
                      </li>
                      <li className="_feed_timeline_dropdown_item">
                        <a href="#0" className="_feed_timeline_dropdown_link">
                          <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                              <path stroke="#1890FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"/>
                            </svg>										
                          </span>
                          <button 
                            onClick={() => handleDelete(index)} 
                            disabled={post.username !== loggedInUser} 
                     
                            style={{ 
                              opacity: post.username !== loggedInUser ? 0.5 : 1,
                              cursor: post.username !== loggedInUser ? 'not-allowed' : 'pointer',
                              background: 'none',
                              border: 'none',
                              padding: '0',  // You can adjust padding if needed
                              margin: '0',
                              outline: 'none', // Remove focus outline
                              
                            }}
                          >
                            Delete Post	
                          </button>
                        </a>
                      </li>
                    </ul>
                  </div>

                  </div>:null}


                </div>
              </div>
              
              



                      {/* Check if the current post is in edit mode */}
                      {editIndex === index ? (
                      <>
                      <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        style={{ 
                          width: '90%',
                          padding: '10px',
                          marginBottom: '10px',
                          border: '2px solid #ccc',
                          //borderRadius: '4px',
                          outline: 'none',
                          //transition: 'border-color 0.1s',

                          //width: '100%',
                          minHeight: '60px',
                          //padding: '10px',
                          borderRadius: '10px',
                          //border: '1px solid #dcdcdc',
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                          fontSize: '14px',
                          fontFamily: 'Arial, sans-serif',
                          //outline: 'none',
                          resize: 'none', // Disable resizing
                          backgroundColor: '#f9f9f9',
                          transition: 'border-color 0.3s ease',
                         }}
                        
                         onFocus={(e) => (e.target.style.borderColor = '#007bff')}
                          onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                      />
                      <button onClick={() => handleSaveClick(index)}
                        
                        style={{ 
                        
                          color: 'white',
                          backgroundColor : '#1890ff' ,           
                          border: '2px solid white',             
                          borderRadius: '15px',        
                          cursor: 'pointer',           
                          fontSize: '15px',            
                          fontWeight: '700',
                          padding : '5px'
                        }}
                        
                        >
                        Save
                      </button>
                      </>
                  ) : (
                    <h4 className="_feed_inner_timeline_post_title">{post.text}</h4>
                  )}



              <div className="_feed_inner_timeline_image">
                <img src="assets/images/timeline_img.png" alt="" className="_time_img"/>
              </div>
            </div>
            <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
              <div className="_feed_inner_timeline_total_reacts_image">
                {post.likedBy.length>=1 && <img src="assets/images/react_img1.png" alt="Image" className="_react_img1"/>}
                {post.likedBy.length>=2 && <img src="assets/images/react_img2.png" alt="Image" className="_react_img"/>}
                {post.likedBy.length>=3 && <img src="assets/images/react_img3.png" alt="Image" className="_react_img _rect_img_mbl_none"/>}
                {/* {post.likedBy.length>=4 && <img src="assets/images/react_img4.png" alt="Image" className="_react_img _rect_img_mbl_none"/>} */}
                {/* {post.likedBy.length>=5 && <img src="assets/images/react_img5.png" alt="Image" className="_react_img _rect_img_mbl_none"/>} */}
                {post.likedBy.length>=4 && <p className="_feed_inner_timeline_total_reacts_para">{post.likes-3}</p>}
              </div>
              <div className="_feed_inner_timeline_total_reacts_txt">
                <p className="_feed_inner_timeline_total_reacts_para1">
                <a href="#0">
                <span>
                  {post.comments 
                    ? post.comments.reduce(
                        (acc, comment) => acc + 1 + (comment.replies ? comment.replies.length : 0), 0
                      ) 
                    : 0}
                </span> 
                {post.comments && post.comments.reduce(
                  (acc, comment) => acc + 1 + (comment.replies ? comment.replies.length : 0), 0
                ) <= 1 
                  ? " Comment" 
                  : " Comments"}
              </a>
                </p>
                <p className="_feed_inner_timeline_total_reacts_para2"><span>0</span> Share</p>
              </div>
            </div>
            <div className="_feed_inner_timeline_reaction">
              <button className="_feed_inner_timeline_reaction_emoji _feed_reaction " onClick={()=>handleLike(index, loggedInUser)}>
              {/* _feed_reaction_active (this class was there) */}
                <span className="_feed_inner_timeline_reaction_link"> <span>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                                                <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"/>
                                                <path fill="#664500" d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"/>
                                                <path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"/>
                                                <path fill="#664500" d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"/>
                                              </svg> */}
                                              {/* {console.log(post.username)} */}
                                              {/* {console.log(isLiked)} */}
                                              {isLiked ? '👎 Unlike' : '👍 Like'}
                                            </span>
                </span>
              </button>
              <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
                <span className="_feed_inner_timeline_reaction_link"> <span>
                                            {/* <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                                                <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"/>
                                                <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563"/>
                                            </svg>                                                       */}
                                          💬 Comment
                                        </span>
               </span>
              </button>
              <button className="_feed_inner_timeline_reaction_share _feed_reaction">
                <span className="_feed_inner_timeline_reaction_link"> <span>
                                            {/* <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                                                <path stroke="#000" stroke-linejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"/>
                                              </svg>                                                  */}
                                           {/* ↪ */}
                                           🔗 Share
                                        </span>
              </span>
              </button>
            </div>

            {/* Comments start*/}

            {console.log(index)}

            <Comments postIndex={index}/>

            {/* Comments end*/}


          </div>
        </div>
        )
        } 

        return null;
        
      


      }
    )


      ) : (
        <p style={{ fontWeight: 'bold', fontSize: '20px' }}>No posts yet</p>
      )}
    </div>

    
  )
}

export default Timeline1





 

















































 