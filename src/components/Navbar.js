import React from "react";
import img1 from "./images/899048.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { noteContext } from "../context/notes/NoteState";
import { IMAGE_URL } from "../utils/api";
export default function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
  );

  const { auth, setauth, setuserid, setnotes, name } = useContext(noteContext);

  useEffect(() => {}, [auth, name]);

  const handlelogout = (e) => {
    e.preventDefault();
    setauth("");
    localStorage.setItem("token", "");
    setuserid("");
    setnotes([]);
    navigate("/signup");
  };

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <>
      {/* {theme === "light" ? "dark" : "light"} */}
      {/* {theme === "light" ? "dark" : "light"} */}
      <div data-theme="dark">
        <div data-theme="dark">
          <div className="navbar bg-base-100 h-fit ">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/addnotes" className="text-lg">
                      Add Something
                    </Link>
                  </li>
                  <li>
                    <Link to="/Blogger" className="text-lg">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/mynotes" className="text-lg">
                      My Posts
                    </Link>
                  </li>
                  {/* <li><Link to='/about' className='text-lg'>About</Link></li> */}
                  {/* <li tabIndex={0}>
                    <details>
                      <summary><Link to='/addnotes' className='text-lg'>Checkout</Link> </summary>
                      <ul className="p-2 my-1">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                        <li><a>Submenu 3</a></li>
                        <li><a>Submenu 4</a></li>
                      </ul>
                    </details>
                  </li> */}

                  {/* <li><Link  to='/contact'  className='text-lg'>Contact us</Link></li> */}
                </ul>
              </div>
              <Link to="Blogger" className="btn btn-ghost normal-case text-xl">
                Naatours
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal p-0">
                <li>
                  <Link to="/addnotes" className="text-lg">
                    Add Something
                  </Link>
                </li>
                <li>
                  <Link to="/Blogger" className="text-lg">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/mynotes" className="text-lg">
                    My Posts
                  </Link>
                </li>
                {/* <li><Link to='/about' className='text-lg'>About me</Link></li> */}
                {/* <li tabIndex={0}>
                    <details>
                      <summary><Link to='/addnotes' className='text-lg'>Checkout</Link> </summary>
                      <ul className="p-2 my-1">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                        <li><a>Submenu 3</a></li>
                        <li><a>Submenu 4</a></li>
                      </ul>
                    </details>
                  </li> */}
                {/* <li><Link  to='/contact'  className='text-lg'>Contact us</Link></li> */}
              </ul>
            </div>

            <div className="navbar-end">
              {/* <button className="btn btn-square btn-ghost mx-3">
                <label className="swap swap-rotate w-8 h-8">
                  <input
                    type="checkbox"
                    onChange={handleToggle}
                    checked={theme === "dark" ? true : false}
                  />
                  <svg
                    className="swap-on fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                
                  <svg
                    className="swap-off fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </button> */}
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full  ">
                  <img
                    src={`${IMAGE_URL}/${
                      localStorage.getItem("photo")
                        ? localStorage.getItem("photo")
                        : "v1719489972/ktr7kxohfxoxht7wqyap.jpg"
                    }`}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100  rounded-box w-52"
              >
                {auth.length !== 0 && (
                  <li>
                    {" "}
                    <Link to="/myprofile" className="justify-between">
                      {localStorage.getItem("name")}
                      <span className="badge">New</span>
                    </Link>{" "}
                  </li>
                )}
                {auth.length === 0 && (
                  <li>
                    <Link to="/signup">Log in</Link>
                  </li>
                )}
                {auth.length !== 0 && (
                  <li>
                    <Link onClick={handlelogout}>Logout</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
