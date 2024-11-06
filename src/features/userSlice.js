  import { createSlice } from '@reduxjs/toolkit';

  const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

  const userSlice = createSlice({
    name: 'user',
    initialState: {
      email: '',
      username: '', 
      password: '',
      confirmPassword: '',
      isAuthenticated: false, 

      posts: storedPosts.map(post => ({
        ...post,
        likedBy: post.likedBy || [],
        likes: post.likes || 0,
        comments: post.comments.map(comment => ({
          ...comment,
          likedBy: comment.likedBy || [],
          likes: comment.likes || 0,
          replies: comment.replies || [],
          showReplies: comment.showReplies || false
        })) || [],
        hidden: post.hidden || false
      }))
    },
    reducers: {

      initializePosts: (state) => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        state.posts = storedPosts.map(post => ({
          ...post,
          likedBy: post.likedBy || [], 
          likes: post.likes || 0,
          comments: post.comments || [], 
          hidden: post.hidden || false
        }));
      },
      
      setUser: (state, action) => {
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.confirmPassword = action.payload.confirmPassword;
      },
      setAuthenticatedUser: (state, action) => {
        state.email = action.payload.email;
        state.username = action.payload.email.split('@')[0].toUpperCase(); 
        state.isAuthenticated = true; 
        localStorage.setItem('user', JSON.stringify({ email: action.payload.email }));
      },
      initializeUser: (state) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          state.email = user.email;
          state.username = user.email.split('@')[0].toUpperCase();
          state.isAuthenticated = true;
        }
      },
      logoutUser: (state) => {
        state.email = '';
        state.username = '';
        state.isAuthenticated = false;
        localStorage.removeItem('user');
      },

      
      addPost: (state, action) => {
        const newPost = {
          text: action.payload.text,
          username: action.payload.username,
          date: new Date().toISOString(),
          likes: 0,  
          likedBy: [],
          comments: [], 
        };
        state.posts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(state.posts));
      },
      
      toggleLike: (state, action) => {
        const { postIndex, username } = action.payload; 
        const post = state.posts[postIndex];
      
        if (post.likedBy.includes(username)) {
          
          post.likedBy = post.likedBy.filter(user => user !== username); 
          post.likes -= 1; 
        } else {
          
          post.likedBy.push(username); 
          post.likes += 1; 
        }
      
        localStorage.setItem('posts', JSON.stringify(state.posts)); 
      },
      addComment: (state, action) => {
        const { postIndex, username, commentText } = action.payload;
        const post = state.posts[postIndex];
        const newComment = {
          username: username,
          text: commentText, 
          date: new Date().toISOString(), 
          replies: [], 
          showReplies: false,
          likedBy: [], 
          likes: 0, 
        };
        post.comments.push(newComment); 
        localStorage.setItem('posts', JSON.stringify(state.posts)); 
      },
      addReply: (state, action) => {
        const { postIndex, commentIndex, username, replyText } = action.payload;
        const post = state.posts[postIndex];
        const comment = post.comments[commentIndex];
        const newReply = {
          username: username,
          text: replyText, 
          date: new Date().toISOString(), 
        };
        comment.replies.push(newReply); 
        localStorage.setItem('posts', JSON.stringify(state.posts)); 
      },
      toggleRepliesVisibility: (state, action) => {
        const { postIndex, commentIndex } = action.payload;
        const post = state.posts[postIndex];
        const comment = post.comments[commentIndex];
        comment.showReplies = !comment.showReplies; 
        localStorage.setItem('posts', JSON.stringify(state.posts)); 
      },
      toggleCommentLike: (state, action) => {
        const { postIndex, commentIndex, username } = action.payload; // Get the post index, comment index, and username
        const comment = state.posts[postIndex].comments[commentIndex]; // Access the specific comment
        
        if (!comment.likedBy) {
          comment.likedBy = [];
        }
        
        if (comment.likedBy.includes(username)) {
          // If the user has already liked the comment, unlike it
          comment.likedBy = comment.likedBy.filter(user => user !== username); // Remove the user from likedBy
          comment.likes -= 1; // Decrement likes
        } else {
          // If the user has not liked the comment, like it
          comment.likedBy.push(username); // Add user to likedBy
          comment.likes += 1; // Increment likes
        }
      
        localStorage.setItem('posts', JSON.stringify(state.posts)); // Update local storage
      },
      deletePost: (state, action) => {
        const { postIndex } = action.payload; // Get the index of the post to delete
        state.posts.splice(postIndex, 1); // Remove the post from the state
        localStorage.setItem('posts', JSON.stringify(state.posts)); // Update local storage
      },
      editPost: (state, action) => {
        const { postIndex, updatedText } = action.payload;
        state.posts[postIndex].text = updatedText;
        localStorage.setItem('posts', JSON.stringify(state.posts)); // Save updated posts to local storage
      },
      toggleHidePost: (state, action) => {
        const { postIndex, username } = action.payload;
        const post = state.posts[postIndex];
  
        // Only allow the user who created the post to hide/unhide it
        if (post.username === username) {
          post.hidden = !post.hidden; // Toggle hidden status
          localStorage.setItem('posts', JSON.stringify(state.posts)); // Update local storage
        }
      },
    },
  });

  export const { setUser, setAuthenticatedUser, logoutUser, addPost, initializeUser, toggleLike, addComment,
    addReply, deletePost , editPost, toggleHidePost, initializePosts, toggleRepliesVisibility, toggleCommentLike} = userSlice.actions;
  export default userSlice.reducer;






















