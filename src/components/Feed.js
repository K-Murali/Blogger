import { useContext, useEffect } from "react";
import { noteContext } from "../context/notes/NoteState";
import { Link } from "react-router-dom";
import Noteitem from "./Noteitem";
import Alert from "./Alert";

const Feed = () => {
  const { notes, auth, alert, setalert, flag, getnote } =
    useContext(noteContext);

  useEffect(() => {
    if (auth) getnote();
  }, [flag, auth]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setalert(false);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [alert, setalert]);

  return (
    <>
      {alert && <Alert message="This is deleted" />}
      <div className="flex flex-wrap items-center justify-center min-h-screen">
        {!auth ? (
          <div className="font-thin text-4xl text-zinc-600">
            <button className="btn btn-active btn-ghost">
              <Link className="text-2xl" to="/signup">
                <div>Please login . . .</div>
              </Link>
            </button>
          </div>
        ) : flag === false ? (
          <div>........</div>
        ) : (
          <div className="flex flex-wrap flex-col items-center">
            {Array.isArray(notes) && notes.length !== 0 ? (
              <h1 className="text-center text-3xl mt-8">Blogs</h1>
            ) : (
              ""
            )}
            <div className="flex  flex-wrap justify-center m-10">
              {!Array.isArray(notes) || notes.length === 0 ? (
                <div className="font-thin mt-5 text-4xl text-zinc-600">
                  No Posts to Display
                </div>
              ) : (
                notes.map((ele) => {
                  const {
                    title,
                    likes,
                    description,
                    tag,
                    _id,
                    photo,
                    comments,
                    date,
                  } = ele;
                  return (
                    <Noteitem
                      id={_id}
                      title={title}
                      key={_id}
                      photo={photo}
                      comments={comments}
                      description={description}
                      tag={tag}
                      likes={likes?.length}
                      userid={localStorage.getItem("userid")}
                      del_edit_flag={true}
                      date={date}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Feed;
