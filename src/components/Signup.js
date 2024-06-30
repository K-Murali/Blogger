import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { noteContext } from "../context/notes/NoteState";
import { BASE_URL } from "../utils/api";

const Signup = () => {
  const [loginflag, setloginflag] = useState(false);
  const [msg, setmsg] = useState(true);
  const [loader, setloader] = useState(false);
  const [details, setdetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setauth, setname, setuserid } = useContext(noteContext);

  useEffect(() => {}, [loginflag]);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();

      const { username, email, password } = details;

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password }),
      };
      let base_url = `${BASE_URL}/api/auth/createuser`;
      if (!loginflag) {
        options.body = JSON.stringify({ email, password });
        base_url = `${BASE_URL}/api/auth/login`;
      }
      setloader(true);
      const res = await fetch(base_url, options);
      const json = await res.json();

      setloader(false);
      if (json.success) {
        console.log(json);
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("name", json.name);
        localStorage.setItem("email", json.data.user.email);
        localStorage.setItem("userid", json.data.user.id);
        if(json.photo)localStorage.setItem("photo", json.photo);
        // localStorage.setItem("saved", json.data.user.saved);

        setname(json.name);
        setauth(json.authtoken);
        setuserid(json.data.user.id);

        setloginflag(true);
        navigate("/Blogger");
      } else {
        setmsg(json.error);
      }
    } catch (err) {
      console.log("this is error message" + err.message);
      setmsg(err);
    }
  };
  const onchange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div
        className="bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80)",
        }}
      >
        <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center relative">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <h1 className="mb-3 font-bold text-5xl">Hi ? Welcome Back... </h1>
              <p className="pr-3">
                {!loginflag
                  ? "You can login here..."
                  : "You can register here..."}
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center  z-10">
            <div className="p-10 bg-white mx-auto rounded-2xl w-100 ">
              <div className="mb-3">
                <h3 className="font-semibold text-2xl text-gray-800">
                  {loginflag ? "Sign up" : "login"}{" "}
                </h3>
                <p className="text-gray-500">
                  {loginflag
                    ? "Please Create  your account"
                    : "Please Login here"}
                </p>
              </div>
              <form onSubmit={handlesubmit} className="space-y-5">
                {!loginflag ? (
                  ""
                ) : (
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700 tracking-wide"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      required={true}
                      onChange={onchange}
                      name="username"
                      className=" w-full bg-transparent text-base px-4 py-2 border bg-none  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                      type="text"
                      placeholder="enter username"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-700 tracking-wide"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    required={true}
                    onChange={onchange}
                    name="email"
                    className="  bg-transparent w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="email"
                    placeholder="mail@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    required
                    className="mb-5 text-sm font-medium text-gray-700 tracking-wide"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <input
                    onChange={onchange}
                    required={true}
                    name="password"
                    className="w-full content-center text-base px-4 py-2 border bg-transparent  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="password"
                    placeholder="Enter your password"
                  />

                  {<div className="text-sm text-error">{msg} </div>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      required={true}
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Checkout
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    {loader ? (
                      <div className="loading loading-dots loading-sm"></div>
                    ) : !loginflag ? (
                      "Login"
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </div>
              </form>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2021-2022{" "}
                  <a
                    href="https://codepen.io/uidesignhub"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Ajimon"
                    className="text-green hover:text-green-500"
                  >
                    AJI
                  </a>
                </span>
              </div>

              {!loginflag ? (
                <div className="pt-5 text-center  text-blue-700 text-sm">
                  <Link
                    onClick={() => {
                      setloginflag(true);
                    }}
                    className="text-right"
                    to="/signup"
                  >
                    Sign up here
                  </Link>
                </div>
              ) : (
                <div className="pt-5 text-center  text-blue-700 text-sm">
                  <Link
                    onClick={() => {
                      setloginflag(false);
                    }}
                    className="text-right"
                    to="/signup"
                  >
                    Login here
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
