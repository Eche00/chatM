import React, { useState } from "react";
import {
  EmailOutlined,
  KeyOutlined,
  QuestionAnswerTwoTone,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { look, instagram, facebook, google } from "../assets";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

function Signin() {
  // State to handle loading spinner
  const [loading, setLoading] = useState(false); 
   // Hook to programmatically navigate
  const navigate = useNavigate();

  // Function to handle form submission for signing in
  const handleSignin = async (e) => {
    // Prevent the default form submit behavior
    e.preventDefault(); 
    // Set loading state to true while processing
    setLoading(true); 

    // Create FormData object from form submission
    const formData = new FormData(e.target);
    // Extract email and password from FormData
    const { email, password } = Object.fromEntries(formData); 

    try {
      // Attempt to sign in with email and password using Firebase
      const res = await signInWithEmailAndPassword(auth, email, password);

      // Notify user of successful sign in
      toast.success("Sign in successful");

      // Navigate user to the home page upon successful sign in
      navigate("/home");
    } catch (error) {
      // Notify user of any errors encountered during sign in
      toast.error(error.message);
    } finally {
      // Reset loading state
      setLoading(false); 
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#081b29]">
      {/* Main container for the sign-in page */}
      <div className="max-w-[100%] mx-auto">
        {/* Page title with icon */}
        <h1 className="text-4xl font-serif text-center flex items-center justify-center p-2 text-gray-300 my-5">
          <QuestionAnswerTwoTone fontSize="100px" />
          chat<span className="font-bold">Me</span>
        </h1>

        <section className="flex w-full justify-between p-5 sm:flex-row flex-col sm:border-solid border-none">
          {/* Left side with image */}
          <motion.section
            initial={{ rotate: 0 }}
            whileInView={{
              rotate: 1 % 2 === 0 ? [-1, 5.3, 0] : [1, -5.4, 0],
            }}
            transition={{ repeat: Infinity, duration: 3, delay: 2 }}
          >
           <img
              className="h-[600px] hidden sm:inline-block"
              src={look}
              alt="ChatMe UI"
            />
          </motion.section>

          {/* Right side with sign-in form */}
          <form
            onSubmit={handleSignin}
            className="flex flex-col items-center justify-center">
            <h2 className="text-gray-300 text-3xl font-serif">Sign In</h2>

            <div className="flex flex-col sm:w-[500px] w-[300px] gap-5 justify-center items-center mt-5">
              
              {/* Email input field */}
              <div className="text-[#000] px-2 flex justify-center items-center bg-white rounded-md w-[100%]">
                <EmailOutlined />
                <input
                  className="h-10 p-2 text-sm w-[100%] text-[#000] outline-none"
                  type="email"
                  placeholder="Email: johndoe@email.com"
                  name="email"
                  required
                />
              </div>

              {/* Password input field */}
              <div className="text-[#000] px-2 flex justify-center items-center bg-white rounded-md w-[100%]">
                <KeyOutlined />
                <input
                  className="h-10 p-2 text-sm w-[100%] text-[#000] outline-none"
                  type="password"
                  placeholder="Password: ********"
                  name="password"
                  required
                />
              </div>

              {/* Sign-in button */}
              <button
                className="w-full p-3 px-12 rounded-md bg-blue-800 text-white text-sm font-bold hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-blue-600 flex items-center justify-center"
                disabled={loading}>
                {loading ? (
                  <>
                    <Spinner className="w-[20px] h-[20px]" size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Link to sign-up page */}
              <p className="text-[16px] text-gray-400">
                Don't have an account?{" "}
                <span className="hover:text-blue-500 cursor-pointer text-gray-300">
                  <Link to={"/"} className="no-underline">
                    Sign Up
                  </Link>
                </span>
              </p>

            
            </div>
          </form>
        </section>

        {/* Footer section with welcome message and social media links */}
        <section className="flex flex-col justify-center items-center text-sm my-2">
          <p className="text-gray-400">Welcome to chatMe 👋</p>
          
          <div className="flex justify-center items-center gap-1 w-[100%] my-10">

            {/* instagram authentication: empty */}
            <a href="">
              <img className="h-20 bg-transparent" src={instagram} alt="Instagram" />
            </a>
            {/* facebook authentication: empty */}
            <a href="">
              <img className="h-20" src={facebook} alt="Facebook" />
            </a>

              {/* Google sign-in icon: empty */}
              <img
                className="h-10"
                src={google}
                alt="Google Sign In"
              />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signin;
