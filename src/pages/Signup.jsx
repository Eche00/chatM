import React, { useEffect, useRef, useState } from "react";
import {
  // Material UI icons
  ArrowBackIos,
  EmailOutlined,
  KeyOutlined,
  QuestionAnswerTwoTone,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { look, instagram, facebook, google, profile } from "../assets";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../lib/uploads";
import { Spinner } from "flowbite-react";

function SignUp() {
  // State for loading indicator
  const [loading, setLoading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();
  // State for avatar upload
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  // Reference to the file input for avatar upload
  const profileRef = useRef(null);

  // Handling avatar upload
  const handleAvatarUpload = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // Handling form submission for user registration
  const handleRegistration = async (e) => {
    e.preventDefault();
    // Show loading spinner
    setLoading(true);

    // Getting form data
    const formData = new FormData(e.target);
    const { username, email, password, bio } = Object.fromEntries(formData);

    try {
      // Creating user with email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Uploading avatar image to Firebase Storage
      const imgUrl = await upload(avatar.file);

      // Storing user credentials in Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        bio,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      // Initializing user chats in Firestore
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      // Show success message
      toast.success(username + " Account created");
      // Redirect to sign-in page after successful registration
      navigate("/signin");
    } catch (error) {
      // Show error message
      toast.error(error.message);
    } finally {
      // Hide loading spinner
      setLoading(false);
    }
  };

  // Show warning if no avatar image is selected
  useEffect(() => {
    if (!avatar?.url) {
      toast.warning("Please select profile image before sign up");
    }
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-[#081b29]">
      {/* Container for the entire sign-up page */}

      <div className="max-w-[100%] mx-auto">
        <h1 className="text-4xl font-serif text-center flex items-center justify-center p-2 text-gray-300 my-5">
          <QuestionAnswerTwoTone fontSize="100px" />
          chat<span className="font-bold">Me</span>
        </h1>


        {/* Main section containing the form and image */}
        <section className="flex w-full justify-between p-5 sm:flex-row flex-col sm:border-solid border-none">

          {/* Left side image section with animation */}
          <motion.section
            initial={{ rotate: 0 }}
            whileInView={{
              rotate: 1 % 2 === 0 ? [-1, 5.3, 0] : [1, -5.4, 0],
            }}
            transition={{ repeat: Infinity, duration: 3, delay: 2 }}
            className="">
            <img
              className="h-[600px] hidden sm:inline-block"
              src={look}
              alt="ChatMe UI"
            />
          </motion.section>

          {/* Right side form section */}
          <form
            onSubmit={handleRegistration}
            className="flex flex-col items-center justify-center">
            <h2 className="text-gray-300 text-3xl font-serif py-10">Sign Up</h2>

            {/* Profile image selection */}
            <div className="flex items-center justify-between w-full py-2">
              <input
                type="file"
                name="avatar"
                hidden
                ref={profileRef}
                onChange={handleAvatarUpload}
              />
              {/* display image based on if selected */}
              <img
                className="w-[70px] h-[70px] object-cover rounded-[50%] cursor-pointer border-2 border-gray-700"
                onClick={() => profileRef.current.click()}
                src={avatar?.url || profile}
                alt=""
              />
              <h2 className="bg-gray-600 h-full px-2 rounded-md flex items-center">
                {avatar.url ? (
                  // text if image url is selected and valid
                  <span className="text-xs font-bold flex items-center gap-[20px] text-white">
                    <ArrowBackIos fontSize="small" /> Image selected
                  </span>
                ) : (
                  // text if image url is not selected
                  <span className="text-xs font-bold flex items-center gap-[20px] text-white">
                    <ArrowBackIos fontSize="small" /> Please select image before
                    signing up
                  </span>
                )}
              </h2>
            </div>

            {/* Form fields for username, email, password, and bio */}
            <div className="flex flex-col sm:w-[500px] w-[300px] gap-5 justify-center items-center mt-5">

              {/* Username field */}
              <div className="text-[#000] px-2 flex justify-center items-center bg-white rounded-md w-[100%]">
                <AccountCircleIcon className="text-[#000]" />
                <input
                  className="h-10 p-2 text-sm w-[100%] text-[#000] outline-none"
                  type="text"
                  placeholder="Username: johndoe123"
                  name="username"
                  required
                />
              </div>

              {/* Email field */}
              <div className="text-[#000] px-2 flex justify-center items-center bg-white rounded-md w-[100%]">
                <EmailOutlined />
                <input
                  className="bg-transparent h-10 p-2 text-sm w-[100%] text-gray-300 outline-none"
                  type="email"
                  placeholder="Email: johndoes@email.com"
                  name="email"
                  required
                />
              </div>

              {/* Password field */}
              <div className="text-[#000] px-2 flex justify-center items-center bg-white rounded-md w-[100%]">
                <KeyOutlined />
                <input
                  className="bg-transparent h-10 p-2 text-sm w-[100%] text-gray-300 outline-none"
                  type="password"
                  placeholder="Password: ********"
                  name="password"
                  required
                />
              </div>

              {/* Bio field */}
              <div className="text-[#000] px-2 flex justify-center items-center bg-white rounded-md w-[100%]">
                <input
                  className="bg-transparent h-10 p-2 text-sm w-[100%] text-gray-300 outline-none"
                  name="bio"
                  placeholder="About your business..."
                  required
                />
              </div>

              {/* Sign up button */}
              <button
                className="w-full p-3 px-12 rounded-md bg-blue-800 text-white text-sm font-bold hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-blue-600 flex items-center justify-center"
                disabled={loading}>
                {loading ? (
                  <>
                    <Spinner className="w-[20px] h-[20px]" size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>


            {/* Link to sign-in page */}
<p className="text-[16px] text-gray-400">
  Have an account?{" "}
  <span className="hover:text-blue-500 cursor-pointer text-gray-300">
    <Link 
      to={"/signin"} 
      className="no-underline"
    >
      Sign In
    </Link>
  </span>
</p>


            </div>
          </form>
        </section>

        {/* Footer section */}
        <section className="flex flex-col justify-center items-center text-sm my-2">
          <p className="text-gray-400">Welcome to chatMe 👋</p>
          <div className="flex justify-center items-center gap-1 w-[100%] my-10">
            <a href="">
              <img className="h-20 bg-transparent" src={instagram} alt="" />
            </a>
            <a href="">
              <img className="h-20" src={facebook} alt="" />
            </a>

            {/* Google sign-up */}
            <img
              className="h-10"
              src={google}
              alt=""
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignUp;
