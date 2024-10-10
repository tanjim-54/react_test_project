




import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticatedUser } from '../features/userSlice';

import { useNavigate } from 'react-router-dom';






import logo from '../assets/images/logo.svg'; // Assuming you have proper paths
import googleLogo from '../assets/images/google.svg';
import loginImage from '../assets/images/login.png';
import shape1 from '../assets/images/shape1.svg'; // Import your images
import darkShape from '../assets/images/dark_shape.svg';
import shape2 from '../assets/images/shape2.svg';
import darkShape1 from '../assets/images/dark_shape1.svg';
import shape3 from '../assets/images/shape3.svg';
import darkShape2 from '../assets/images/dark_shape2.svg';
// import registrationImage from '../assets/images/registration.png';
// import registrationImageDark from '../assets/images/registration1.png';
// import logoImage from '../assets/images/logo.svg';
// import googleImage from '../assets/images/google.svg';






const LoginPage = () => {
   
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve stored users from local storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check for matching user
    const matchedUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );
  
    // If match found, set the authenticated user in Redux
    if (matchedUser) {
      // alert('Login successful!');
      dispatch(setAuthenticatedUser({ email }));
     
      
      navigate('/');
    } else {
      alert('Invalid email or password');
    }

    
  };

  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <img src={shape1} alt="" className="_shape_img" />
        <img src={darkShape} alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src={shape2} alt="" className="_shape_img" />
        <img src={darkShape1} alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_shape_three">
        <img src={shape3} alt="" className="_shape_img" />
        <img src={darkShape2} alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <img src={loginImage} alt="Login" className="_left_img" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <img src={logo} alt="Logo" className="_left_logo" />
                </div>
                <p className="_social_login_content_para _mar_b8">Welcome back</p>
                <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>
                <button type="button" className="_social_login_content_btn _mar_b40">
                  <img src={googleLogo} alt="Google Sign-In" className="_google_img" /> 
                  <span>Or sign-in with Google</span>
                </button>
                <div className="_social_login_content_bottom_txt _mar_b40">
                  <span>Or</span>
                </div>
                <form className="_social_login_form" onSubmit={handleLogin}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">Email</label>
                        <input 
                          type="email" 
                          className="form-control _social_login_input" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label className="_social_login_label _mar_b8">Password</label>
                        <input 
                          type="password" 
                          className="form-control _social_login_input" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="form-check _social_login_form_check">
                        <input 
                          className="form-check-input _social_login_form_check_input" 
                          type="checkbox" 
                          checked="true"
                          //onChange={(e) => setRememberMe(e.target.checked)} 
                        />
                        <label className="form-check-label _social_login_form_check_label">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                      <div className="_social_login_form_left">
                        <p className="_social_login_form_left_para">Forgot password?</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_login_form_btn _mar_t40 _mar_b60">
                        <button type="submit" className="_social_login_form_btn_link _btn1">
                          Login now
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_login_bottom_txt">
                      <p className="_social_login_bottom_txt_para">
                        Don't have an account? <a href="/RegistrationPage">Create New Account</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
