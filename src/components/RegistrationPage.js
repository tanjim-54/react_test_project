// src/components/register.js


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';



import '../assets/css/bootstrap.min.css';
import '../assets/css/common.css';
import '../assets/css/main.css';
import '../assets/css/responsive.css';
import shape1 from '../assets/images/shape1.svg'; // Import your images
import darkShape from '../assets/images/dark_shape.svg';
import shape2 from '../assets/images/shape2.svg';
import darkShape1 from '../assets/images/dark_shape1.svg';
import shape3 from '../assets/images/shape3.svg';
import darkShape2 from '../assets/images/dark_shape2.svg';
import registrationImage from '../assets/images/registration.png';
import registrationImageDark from '../assets/images/registration1.png';
import logoImage from '../assets/images/logo.svg';
import googleImage from '../assets/images/google.svg';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {


  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkUserExists(email)) {
      alert("User already exists! Please use a different email.");
      return; // Stop registration if user exists
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Enter valid email!');
    } else if (password === confirmPassword) {
      // Retrieve existing users from local storage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      
      // Add new user to the array
      existingUsers.push({ email, password, confirmPassword });
      
      // Store the updated users array back in local storage
      localStorage.setItem('users', JSON.stringify(existingUsers));

      dispatch(setUser({ email, password, confirmPassword }));
      navigate('/LoginPage');
      // Redirect or do further actions
    } else {
      alert('Passwords do not match!');
    }
};


const checkUserExists = (newUserEmail) => {
  // Retrieve existing users from local storage
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Check if the user already exists
  const userExists = existingUsers.some(user => user.email === newUserEmail);

  return userExists; // Returns true if the user exists, otherwise false
};


  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
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
      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  <img src={registrationImage} alt="" />
                </div>
                <div className="_social_registration_right_image_dark">
                  <img src={registrationImageDark} alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_registration_content">
                <div className="_social_registration_right_logo _mar_b28">
                  <img src={logoImage} alt="" className="_right_logo" />
                </div>
                <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
                <button type="button" className="_social_registration_content_btn _mar_b40">
                  <img src={googleImage} alt="" className="_google_img" />
                  <span>Register with Google</span>
                </button>
                <div className="_social_registration_content_bottom_txt _mar_b40">
                  <span>Or</span>
                </div>
                <form className="_social_registration_form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Email</label>
                        <input type="email" className="form-control _social_registration_input" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                        {console.log(email)}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Password</label>
                        <input type="password" className="form-control _social_registration_input" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                        {console.log(password)}
                        
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_registration_form_input _mar_b14">
                        <label className="_social_registration_label _mar_b8">Repeat Password</label>
                        <input type="password" className="form-control _social_registration_input" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {console.log(confirmPassword)}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
                      <div className="form-check _social_registration_form_check">
                        <input className="form-check-input _social_registration_form_check_input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                        <label className="form-check-label _social_registration_form_check_label" htmlFor="flexRadioDefault2">I agree to terms & conditions</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                      <div className="_social_registration_form_btn _mar_t40 _mar_b60">
                        <button type="button" className="_social_registration_form_btn_link _btn1" onClick={handleSubmit}>Register</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="_social_registration_bottom_txt">
                      <p className="_social_registration_bottom_txt_para">Do you already have an account? <a href="/">Login Now</a></p>
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

export default RegistrationPage;
