import { useContext, useEffect } from "react";
import { noteContext } from "../context/notes/NoteState";
import { useNavigate } from "react-router-dom";
import Noteitem from "./Noteitem";
import Alert from "./Alert";

const Social = () => {
  const { allnotes, mode, alert, setalert, flag, getallnotes } =
    useContext(noteContext);

  setTimeout(() => {
    setalert(false);
  }, 9000);

  useEffect(() => {
    getallnotes();
  }, [flag]);
  useEffect(() => {
    getallnotes();
  }, []);

  return allnotes && flag === false ? (
    "loading"
  ) : (
    <>
      {alert && <Alert message="This is deleted" />}
      <div className="flex-col justify-center items-center">
        <div className="flex-row">
          <form className={`flex justify-center  my-10 `} role="search">
            <input
              id="topic"
              className={`bg-gray-200 me-4 text-black rounded  placeholder-black   focus:outline-none cursor-black  input-bordered w-4/6 p-2 bg-${
                !mode === "light" ? "black" : "gray"
              } me-2 ms-2 h-13`}
              type="text"
              placeholder="Search here...."
              aria-label="Search"
            />
            <button
              type="button"
              // onClick={handelsearch}
              className={` me-2  bg-slate-600 bg- rounded text-white p-2 w-16 h-10 bg-${
                !mode === "dark" ? "primary" : "info"
              }`}
            >
              search
            </button>
            <button
              type="button"
              // onClick={handelsearch}
              className={` me-2  bg-slate-600   rounded text-white p-2 w-16 h-10 bg-${
                !mode === "dark" ? "primary" : "info"
              }`}
            >
              Filters
            </button>
          </form>
        </div>
        <div className="  flex-col items-center">
          {allnotes && allnotes.length !== 0 ? (
            <h1 className="  text-center text-3xl mt-8 "></h1>
          ) : (
            ""
          )}
          <div className="  flex flex-wrap justify-center  ">
            {allnotes && allnotes.length === 0 ? (
              <div className=" font-thin mt-5  text-4xl justify-left  text-zinc-600">
                No Posts to Display
              </div>
            ) : (
              flag &&
              allnotes &&
              allnotes.map((ele, i = 0) => {
                const {
                  title,
                  likes,
                  description,
                  tag,
                  _id,
                  date,
                  photo,
                  comments,
                } = ele;
                return (
                  allnotes && (
                    <Noteitem
                      id={_id}
                      title={title}
                      key={i++}
                      photo={photo}
                      comments={comments}
                      description={description}
                      tag={tag}
                      likes={likes?.length}
                      userid={localStorage.getItem("userid")}
                      del_edit_flag={false}
                      date={date}
                    />
                  )
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Social;
