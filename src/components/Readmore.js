import React, { useState, useEffect, useContext } from "react";
import { noteContext } from "../context/notes/NoteState";
import "./noteitem.css"; // Import CSS file for styling
import img from "./images/899048.png";
import { useNavigate } from "react-router-dom";

import { MdCloseFullscreen } from "react-icons/md";
import { FaArrowAltCircleRight, FaRegSmileWink } from "react-icons/fa";
import {
  AiOutlineLike,
  AiOutlineDelete,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaRegComment, FaRegBookmark, FaRegEdit } from "react-icons/fa";

const Readmore = () => {
  const navigate = useNavigate();
  const { currnote, getbyid, getlike, addcomment } = useContext(noteContext);
  const [likes, setlikes] = useState("");
  const [newcom, setnewcom] = useState("");
  const [comarray, setcomarray] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handle_comment_submit = async (e) => {
    e.preventDefault();

    const res = await addcomment({
      tour: localStorage.getItem("id"),
      users: localStorage.getItem("userid"),
      comment: newcom,
    });
    setcomarray(comarray.concat(res.data.reviews));
  };

  const handleLike = async () => {
    const res = await getlike(localStorage.getItem("id"), likes);
    console.log(res);
    setlikes(res.likes);
  };
  useEffect(() => {
    const caller = async () => {
      const res = await getbyid(localStorage.getItem("id"));
      setlikes(res.likes.length);
      setcomarray(res.comments);
    };
    caller();
  }, []);
  // useEffect(() => {}, [likes]);

  return (
    currnote && (
      <div className="flex justify-center align-middle mt-5  items-center w-full">
        <div className="    lg:flex-row flex  flex-col sm:w-full md:full lg:w-3/4 justify-center   p-3 border  rounded-lg bg-white shadow-lg">
          <div className="sm:w-full md:full lg:w-5/6">
            <div
              onClick={() => {
                navigate("/myprofile");
              }}
              className="   cursor-pointer flex items-center mb-4"
            >
              <img
                className="profile-pic sm:w-full md:full lg:w-12 lg:h-12 rounded-full mr-4"
                src={img}
                alt="Profile"
              />
              <span className="username font-bold">{currnote.user.name}</span>
            </div>
            <img
              className="border-2 h-auto sm:w-full md:full lg:w-11/12  mb-4"
              src={`http://localhost:8000/Images/${currnote.photo}`}
              alt="Post"
            />
            <div className="flex justify-between sm:w-full md:full lg:w-11/12  mb-4">
              <div className="flex   gap-4 text-lg">
                <button onClick={handleLike} className="flex items-center">
                  <AiOutlineLike className="w-6 h-6 " />
                  <span className="text-md"> {likes} likes</span>
                </button>
                <button className="flex items-center">
                  <FaRegComment className="w-5 h-6 mr-1" />
                  <span className="text-md">
                    {currnote.comments.length}&nbsp;comments
                  </span>
                </button>
              </div>
              <div className="">
                <span className=" font-normal   text-sm   text-gray-500">
                  {new Date(currnote.date).getDate()}
                  &nbsp;{months[new Date(currnote.date).getMonth()]}
                </span>
              </div>
            </div>
            <div className="post-caption sm:w-full md:full lg:w-11/12 mb-4">
              <div className="text-xl mb-2 font-semibold">{currnote.title}</div>
              <div className="hashtags">{currnote.description}</div>
            </div>
          </div>
          <div className="flex-col sm:w-full md:full lg:w-1/2  justify-start">
            <div
              onClick={() => {
                navigate("/myprofile");
              }}
              className="   cursor-pointer flex items-center mb-4"
            >
              <img
                className="profile-pic w-12 h-12 rounded-full mr-4"
                src={img}
                alt="Profile"
              />
              <span className="username font-bold">{currnote.user.name}</span>
            </div>

            <div className=" flex justify-start text-blue-700 w-3/4 ">
              #{currnote.tag.split(",")}
            </div>
            <div
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="flex-col  h-48  overflow-y-scroll  "
            >
              <div className="comment mb-2">
                <span className="username font-bold">love_boy_diip_550k</span>
                <span> Radhe radhe🙌❤️</span>
              </div>
              {comarray &&
                comarray.map((e) => {
                  return (
                    <div className="comment mb-2 flex justify-between pr-1 username ">
                      <div>
                        <span className="username font-bold">
                          {e.users.name}
                        </span>
                        <span className=" font-normal"> {e.comment}</span>
                      </div>
                      <div>
                        <span className=" font-normal   text-sm   text-gray-500">
                          {new Date(e.createdtAt).getDate()}
                          &nbsp;{months[new Date(e.createdtAt).getMonth()]}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex justify-around ">
              <input
                onChange={(e) => {
                  setnewcom(e.target.value);
                }}
                className="add-comment w-full p-2 border rounded-lg mt-4"
                type="text"
                placeholder="Add a comment..."
              />
              <button className=" mt-4">
                <FaArrowAltCircleRight
                  className="w-6 h-5"
                  onClick={handle_comment_submit}
                />
              </button>
            </div>
            <div className=" mt-10 ml-5 ">
              <ul className=" list-disc gap-3">
                <li>Average rating : 4.6</li>
                <li>Average Cost : 25k</li>
                <li>Average Room Cost : 3k/day </li>
                <li>Locations : tamilnadu, chennai, kerala</li>
              </ul>
            </div>
            <div className="flex   lg:bottom-10 lg:ml-10  sm:justify-center sm: mt-10 sm:mb-10 justify-around sm:relative md:relative  lg:fixed gap-5">
              <div>
                <button className="  btn-sm text-sm  bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-full">
                  Book my Trip
                </button>
              </div>
              <div>
                <button className="  bg-blue-500 btn-sm text-sm hover:bg-blue-700 text-white font-bold  rounded-full">
                  Book Tour Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Readmore;
