  import { createSlice } from '@reduxjs/toolkit';

  // Load stored posts from local storage or initialize with an empty array
  const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

  const userSlice = createSlice({
    name: 'user',
    initialState: {
      email: '',
      username: '', // Add username to initial state
      password: '',
      confirmPassword: '',
      isAuthenticated: false, // State for authentication
      //posts: storedPosts.map(post => ({ ...post, likes: post.likes || 0 }))

      posts: storedPosts.map(post => ({
        ...post,
        likedBy: post.likedBy || [], // Ensure likedBy is always an array
        likes: post.likes || 0,
        comments: post.comments || [], // Add comments array for each post 
        hidden: post.hidden || false
      }))
    },
    reducers: {
      // User authentication actions
      setUser: (state, action) => {
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.confirmPassword = action.payload.confirmPassword;
      },
      setAuthenticatedUser: (state, action) => {
        state.email = action.payload.email;
        state.username = action.payload.email.split('@')[0].toUpperCase(); // Extract and capitalize username
        state.isAuthenticated = true; // Set authenticated status
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

      // Posts-related actions
      addPost: (state, action) => {
        const newPost = {
          text: action.payload.text,
          username: action.payload.username,
          date: new Date().toISOString(),
          likes: 0,  // Initialize likes for each post
          likedBy: [],
          comments: [], // Initialize comments array
        };
        state.posts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(state.posts));
      },
      
      toggleLike: (state, action) => {
        const { postIndex, username } = action.payload; // Get the post index and username from the action
        const post = state.posts[postIndex];
      
        if (post.likedBy.includes(username)) {
          // If the user has already liked the post, unlike it
          post.likedBy = post.likedBy.filter(user => user !== username); // Remove user from likedBy
          post.likes -= 1; // Decrement likes
        } else {
          // If the user has not liked the post, like it
          post.likedBy.push(username); // Add user to likedBy
          post.likes += 1; // Increment likes
        }
      
        localStorage.setItem('posts', JSON.stringify(state.posts)); // Update local storage
      },
      addComment: (state, action) => {
        const { postIndex, username, commentText } = action.payload;
        const post = state.posts[postIndex];
        const newComment = {
          username: username,
          text: commentText, // Corrected property name for clarity
          date: new Date().toISOString(), // Optional date property
          replies: [], // Initialize replies array for each comment
        };
        post.comments.push(newComment); // Add the new comment to the post
        localStorage.setItem('posts', JSON.stringify(state.posts)); // Save to local storage
      },
      addReply: (state, action) => {
        const { postIndex, commentIndex, username, replyText } = action.payload;
        const post = state.posts[postIndex];
        const comment = post.comments[commentIndex];
        const newReply = {
          username: username,
          text: replyText, // Corrected property name for clarity
          date: new Date().toISOString(), // Optional date property
        };
        comment.replies.push(newReply); // Add the reply to the specific comment
        localStorage.setItem('posts', JSON.stringify(state.posts)); // Save to local storage
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
    addReply, deletePost , editPost, toggleHidePost} = userSlice.actions;
  export default userSlice.reducer;






















