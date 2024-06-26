import { IMAGE_URL } from "../utils/api";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { noteContext } from "../context/notes/NoteState";
import Modalbox from "./Modalbox";

import { MdCloseFullscreen } from "react-icons/md";
import { FaArrowAltCircleRight, FaRegSmileWink } from "react-icons/fa";
import {
  AiOutlineLike,
  AiOutlineDelete,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaBookmark } from "react-icons/fa6";
import { FaRegComment, FaRegBookmark, FaRegEdit } from "react-icons/fa"; // Importing FontAwesome icons
import "./noteitem.css";

const Noteitem = (props) => {
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
  const navigate = useNavigate();
  const { deletenote, editnote, getlike, getcomment, addcomment, savetour } =
    useContext(noteContext);
  const [newcom, setnewcom] = useState("");
  const [newnote, setnewnote] = useState({
    title: "",
    description: "",
    tag: "",
    photo: "",
  });

  const [photo, setphoto] = useState(null);
  const [saved, setsaved] = useState();
  const [likes, setLikes] = useState(props.likes ? props.likes : 0);
  const [showComments, setShowComments] = useState(false); // State to toggle comments
  const [comarray, setcomarray] = useState(props.comments);
  // const [saved, setsaved] = useState();

  const handleLike = async () => {
    const res = await getlike(props.id);
    console.log(res);
    setLikes(res.likes);
  };

  const handlecomments = () => {
    setShowComments(!showComments); // Toggle comments section
  };
  const handle_comment_submit = async (e) => {
    e.preventDefault();

    const res = await addcomment({
      tour: props.id,
      users: props.userid,
      comment: newcom,
    });
    setcomarray(comarray.concat(res.data.reviews));
  };
  useEffect(() => {
    const com = async () => {
      const response = await savetour({
        userid: props.userid,
        tourid: props.id,
        flag: true,
      });

      setsaved(response.flag);

      const res = await getcomment(props.id);
      if (res) setcomarray(res.comments);
    };
    com();
  }, [likes, showComments]);

  const handlesave = async () => {
    const res = await savetour({ userid: props.userid, tourid: props.id });
    setsaved(res.flag);
  };

  const handledelete = () => {
    const b = window.confirm("Are you sure you want to delete?");
    if (!b) {
      return false;
    }
    deletenote(props.id);
  };

  const handle_readmore = () => {
    localStorage.setItem("id", props.id);
    navigate("/readmore");
  };

  const handleclick = () => {
    document.getElementById(`my_modal_${props.id}`).showModal();
  };

  const handleedit = async (e) => {
    e.preventDefault();

    const cloudinary = new FormData();
    cloudinary.append("file", photo);
    cloudinary.append("upload_preset", "natours");
    cloudinary.append("cloud_name", "drfvhp1jh");

    // const formData = new FormData();

    // formData.append("title", newnote.title);
    // formData.append("tag", newnote.tag);
    // formData.append("description", newnote.description);
    // if (photo) {
    //   formData.append("photo", photo);
    //   console.log(photo);
    // }
    const options = {
      method: "POST",
      body: cloudinary,
    };
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/drfvhp1jh/image/upload`,
      options
    );
    const ans = await res.json();

    newnote.photo = ans.url.split("upload/")[1];

    editnote(
      props.id,
      newnote.title,
      newnote.description,
      newnote.tag,
      newnote
    );
  };
  const onchange = (e) => {
    setnewnote({ ...newnote, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-96 shadow-sm rounded-lg border m-5 relative">
      <div className="note-card card overflow-hidden bg-base-100 shadow-xl">
        <div className="card-body p-4 gap-3">
          <div className="overflow-hidden">
            <img
              className="h-52  w-96 border rounded"
              alt=""
              src={`${IMAGE_URL}/${props.photo}`}
            />
          </div>
          <div className="h-48 overflow-hidden">
            <h1 className="text-xl font-semibold text-center">{props.title}</h1>
            <p className="mt-2 font-serif">
              {props.description.slice(0, 200)} . . . .
            </p>
          </div>
          <div className="flex-col ">
            <div className="flex justify-between ">
              {/* Like and Comment buttons */}
              <div className=" text-center justify-center text-lg ">
                <div className="flex ">
                  <div className="flex justify-center  items-center">
                    <span className=" ml-2">{likes}</span>
                    <button
                      disabled={
                        localStorage.getItem("token")?.length === 0
                          ? true
                          : false
                      }
                      onClick={handleLike}
                      className="rounded w-fit h-auto p-1 from-zinc-50"
                    >
                      <div className="flex items-center gap-1">
                        <AiOutlineLike className="w-7 h-7" />
                      </div>
                    </button>
                  </div>
                  <div className="flex  items-center">
                    <span className="ml-2 ">
                      {props.comments ? props.comments.length : ""}{" "}
                    </span>
                    <button
                      onClick={handlecomments}
                      className=" rounded w-fit h-auto p-1  from-zinc-50"
                    >
                      <div className=" flex items-center gap-1 flex-row">
                        <FaRegComment className="w-6 h-6"></FaRegComment>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="">
                  <button
                    onClick={handle_readmore}
                    className=" mb-5 ml-3 rounded w-fit h-6  underline  text-center  from-zinc-50"
                  >
                    readmore...
                  </button>
                </div>
              </div>
              {/* Save and Edit/Delete buttons */}
              <div className="">
                <div className=" flex-col ">
                  <button
                    disabled={
                      localStorage.getItem("token")?.length == 0 ? true : false
                    }
                    onClick={handledelete}
                    className={`ml-2 rounded w-fit h-auto p-1 mt-2 mb-5 from-zinc-50 ${
                      !props.del_edit_flag ? "hidden" : ""
                    }`}
                  >
                    <AiOutlineDelete className="w-6 h-6"></AiOutlineDelete>
                  </button>
                  <button
                    onClick={handleclick}
                    className={`ml-2 rounded w-fit h-auto p-1 mb-5 from-zinc-50 ${
                      !props.del_edit_flag ? "hidden" : ""
                    }`}
                  >
                    <FaRegEdit className="w-6 h-6"></FaRegEdit>
                  </button>

                  <button
                    disabled={
                      localStorage.getItem("token")?.length == 0 ? true : false
                    }
                    onClick={handlesave}
                    className={`ml-2 rounded w-fit h-auto  mb-5 from-zinc-50 ${
                      props.del_edit_flag ? "hidden" : ""
                    }`}
                  >
                    {!saved ? (
                      <FaRegBookmark className="mt-2 w-6 h-6" />
                    ) : (
                      <FaBookmark className="mt-2 w-6 h-6" />
                    )}

                    <div className=" mt-3 font-normal text-end   text-sm   text-gray-500">
                      {new Date(props.date).getDate()}
                      &nbsp;{months[new Date(props.date).getMonth()]}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div
              className={`absolute  bottom-0 left-0 right-0 ${
                showComments ? " bg-gray-200" : "bg-white"
              } z-20 p-4 mt-4 rounded-lg transition-all duration-300 ${
                showComments ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {/* Close button */}
              <button
                onClick={handlecomments}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <MdCloseFullscreen className="w-6 h-6"></MdCloseFullscreen>
              </button>
              {/* Actual comments content */}
              <div className="mt-6 flex justify-evenly">
                {/* Placeholder for comments */}

                <input
                  name="title"
                  type="text"
                  onChange={(e) => {
                    setnewcom(e.target.value);
                  }}
                  placeholder="Add a comment"
                  // onChange={onchange}
                  className=" mb-4 border-b-2 p-2 rounded w-full  focus:outline-none bg-gray-200   border-gray-400"
                />
                <button
                  disabled={
                    localStorage.getItem("token")?.length == 0 ? true : false
                  }
                >
                  <FaArrowAltCircleRight onClick={handle_comment_submit} />
                </button>
              </div>
              <div
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                className=" scrollbar-hide overflow-y-scroll h-32  "
              >
                {/* You can map through actual comments data here */}
                {comarray &&
                  comarray.map((e) => {
                    return (
                      <div className="flex justify-between items-center">
                        <div className="ml-2">
                          <h1 className="text-sm font-bold">{e.users.name}</h1>
                          <p className="text-sm">{e.comment}</p>
                        </div>
                        <div className="">
                          <span className=" font-normal   text-sm   text-gray-500">
                            {new Date(e.createdtAt).getDate()}
                            &nbsp;{months[new Date(e.createdtAt).getMonth()]}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <dialog id={`my_modal_${props.id}`} className="modal">
              <Modalbox
                title={props.title}
                description={props.description}
                tag={props.tag}
                key={props.id}
                id={props.id}
                setphoto={setphoto}
                handleedit={handleedit}
                onchange={onchange}
              />
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
