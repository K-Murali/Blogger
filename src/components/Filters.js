import React, { useEffect, useContext, useState } from "react";
import { noteContext } from "../context/notes/NoteState";

const Filters = () => {
  //   const [query, setQuery] = useState({
  //     date: {
  //       gte: "",
  //       lte: "",
  //     },
  //     price: {
  //       lte: "10000",
  //     },
  //     sort: "date",
  //     location: "India",
  //     tag: "",
  //   });

  const handlefilters = async (e) => {
    e?.preventDefault();
    setflag(false);
    const startdate = query.date.gte ? `&date[gte]=${query.date.gte}` : "";
    const enddate = query.date.lte ? `&date[lte]=${query.date.lte}` : "";
    const price = `&price[lte]=${query.price.lte}`;
    query.tag = searchval?.length > 0 ? searchval.split(",")[1] : query.tag;
    query.location =
      searchval?.length > 0 ? searchval.split(",")[0] : query.location;
    const tag = query.tag ? `&tag=${query.tag}` : "";
    const location = query.location ? `&location=${query.location}` : "";
    const querystr = `&sort=${query.sort}${startdate}${enddate}${price}${tag}${location}`;
    await getallnotes(querystr);
  };

  const {
    getallnotes,
    query,
    searchval,
    setsearchval,
    setQuery,
    setflag,
    mode,
  } = useContext(noteContext);

  const removeFilter = (filterType) => {
    const updatedQuery = { ...query };
    if (filterType === "date.gte") updatedQuery.date.gte = "";
    if (filterType === "date.lte") updatedQuery.date.lte = "";
    if (filterType === "sort") updatedQuery.sort = "-date";
    if (filterType === "price.lte") updatedQuery.price.lte = "10000";
    if (filterType === "tag") {
      setsearchval(""), (updatedQuery.tag = "");
    }
    if (filterType === "location") {
      setsearchval(""), (updatedQuery.location = "");
    }
    setQuery(updatedQuery);
  };

  return (
    <>
      <div className="flex flex-col  ">
        <div className="flex-row">
          <form className={`flex justify-center mt-10 mb-1`} role="search">
            <input
              id="topic"
              onChange={(e) => {
                setsearchval(e.target.value);
                // setQuery({ ...query, tag: e.target.value });
                // setQuery({ ...query, location: e.target.value });
              }}
              className={`bg-gray-200 me-4 text-gray-300 rounded placeholder-black focus:outline-none cursor-black input-bordered w-4/6 p-2 bg-${
                !mode === "light" ? "black" : "gray"
              } me-2 ms-2 h-13`}
              type="text"
              placeholder="Enter statename,tag.. "
              aria-label="Search"
            />
            <button
              type="button"
              onClick={handlefilters}
              className={`me-2 bg-slate-600 bg-rounded   rounded text-white p-2 w-16 h-10 bg-${
                !mode === "dark" ? "primary" : "info"
              }`}
            >
              search
            </button>

            <div>
              <button
                className={`me-2 bg-slate-600 rounded text-white p-2 w-fit h-10`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("my_modal_3").showModal();
                }}
              >
                filters
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box flex-col justify-center w-11/12 max-w-5xl">
                  <button
                    className="btn btn-sm btn-circle border-none absolute right-2 top-2"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("my_modal_3").close();
                    }}
                  >
                    ✕
                  </button>

                  <h3 className="font-bold text-lg">Filters</h3>
                  <div className="flex justify-around flex-wrap gap-4">
                    {/* Upload Date Section */}
                    <div className="py-4 flex-col justify-center w-1/6">
                      <h4 className="font-bold text-sm text-black">
                        UPLOAD DATE
                      </h4>
                      <div className="mt-5  ">
                        <label
                          htmlFor="start_date"
                          className="block text-blue-500"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="start_date"
                          onChange={(e) =>
                            setQuery({
                              ...query,
                              date: { ...query.date, gte: e.target.value },
                            })
                          }
                          className="w-32 mb-5 mt-2 border-2 text-black"
                        />
                        <label
                          htmlFor="end_date"
                          className="block text-blue-500"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          id="end_date"
                          onChange={(e) =>
                            setQuery({
                              ...query,
                              date: { ...query.date, lte: e.target.value },
                            })
                          }
                          className="w-32 mt-2 border-2 text-black"
                        />
                      </div>
                    </div>

                    {/* Sort By Section */}
                    <div className="py-4 flex-col justify-center w-1/6">
                      <h4 className="font-bold text-sm text-black">SORT BY</h4>
                      <div
                        onClick={() => setQuery({ ...query, sort: "bookings" })}
                        className="text-blue-500 mt-5 underline-none block mb-2 cursor-pointer"
                      >
                        Bookings
                      </div>
                      <div
                        onClick={() => setQuery({ ...query, sort: "date" })}
                        className="text-blue-500 underline-none block mb-2 cursor-pointer"
                      >
                        Date Posted
                      </div>
                      <div
                        onClick={() =>
                          setQuery({ ...query, sort: "-likescount" })
                        }
                        className="text-blue-500 underline-none block mb-2 cursor-pointer"
                      >
                        Most Liked
                      </div>
                      <div
                        onClick={() => setQuery({ ...query, sort: "price" })}
                        className="text-blue-500 underline-none block mb-2 cursor-pointer"
                      >
                        Price
                      </div>

                      <input
                        placeholder="Enter field..."
                        type="text"
                        id="sort"
                        onChange={(e) =>
                          setQuery({ ...query, sort: e.target.value })
                        }
                        className="w-32 mt-2 border-2 text-black"
                      />
                    </div>

                    {/* Price Section */}
                    <div className="py-4 flex-col justify-center w-1/6">
                      <h4 className="font-bold text-sm text-black">PRICE</h4>
                      <div
                        onClick={() =>
                          setQuery({ ...query, price: { lte: 500 } })
                        }
                        className="text-blue-500 mt-5 underline-none block mb-2 cursor-pointer"
                      >
                        Under 500
                      </div>
                      <div
                        onClick={() =>
                          setQuery({ ...query, price: { lte: 1000 } })
                        }
                        className="text-blue-500 underline-none block mb-2 cursor-pointer"
                      >
                        Under 1000
                      </div>
                      <div
                        onClick={() =>
                          setQuery({ ...query, price: { lte: 2000 } })
                        }
                        className="text-blue-500 underline-none block mb-2 cursor-pointer"
                      >
                        Under 2000
                      </div>
                      <div
                        onClick={() =>
                          setQuery({ ...query, price: { lte: 5000 } })
                        }
                        className="text-blue-500 underline-none block mb-2 cursor-pointer"
                      >
                        Under 5000
                      </div>
                      <input
                        type="number"
                        placeholder="Enter price..."
                        onChange={(e) =>
                          setQuery({ ...query, price: { lte: e.target.value } })
                        }
                        className="w-32 mt-2 border-2 text-black"
                      />
                    </div>
                  </div>
                  <div className="py-4  flex justify-center gap-3">
                    <p className="text-sm cursor-pointer  bg-black/[0.2]   hover:bg-black/[0.4] hover:text-white rounded h-fit w-fit items-center px-2 py-1 mb-[1px] flex text-black">
                      From {query.date.gte ? query.date.gte : "2024-01-01 "} to
                      {query.date.lte ? query.date.lte : "2024-06-01"}
                    </p>
                    <p className="text-sm cursor-pointer  bg-black/[0.2]   hover:bg-black/[0.4] hover:text-white rounded h-fit w-fit items-center px-2 py-1 mb-[1px] flex text-black">
                      Sort by {query.sort}
                    </p>
                    <p className="text-sm cursor-pointer  bg-black/[0.2]   hover:bg-black/[0.4] hover:text-white rounded h-fit w-fit items-center px-2 py-1 mb-[1px] flex text-black">
                      Price under {query.price.lte}
                    </p>
                    <button
                      onClick={handlefilters}
                      className="w-fit border-2 text-black-500 rounded hover:bg-gray-200 "
                    >
                      search tours...
                    </button>
                  </div>
                </div>
              </dialog>
            </div>
          </form>
        </div>
        {/* ////////// */}
        <div className="flex  justify-center flex-wrap     gap-3 mt-4">
          {query.date.gte && (
            <p className="text-sm cursor-pointer  bg-black/[0.2]   hover:bg-black/[0.4] hover:text-white rounded h-fit w-fit items-center px-2 py-1 mb-[1px] flex text-black">
              From {query.date.gte}
              <button
                className="ml-2 text-gray-500"
                onClick={() => removeFilter("date.gte")}
              >
                ✕
              </button>
            </p>
          )}
          {query.date.lte && (
            <p className="text-sm cursor-pointer  bg-black/[0.2]   hover:bg-black/[0.4] hover:text-white rounded h-fit w-fit items-center px-2 py-1 mb-[1px] flex text-black">
              To {query.date.lte}
              <button
                className="ml-2 text-gray-500"
                onClick={() => removeFilter("date.lte")}
              >
                ✕
              </button>
            </p>
          )}
          {query.sort != "-date" && (
            <p className="text-sm cursor-pointer  bg-black/[0.2]   hover:bg-black/[0.4] hover:text-white rounded h-fit w-fit items-center px-2 py-1 mb-[1px] flex text-black">
              Sort by {query.sort}
              <button
                className="ml-2  text-gray-500"
                onClick={() => removeFilter("sort")}
              >
                ✕
              </button>
            </p>
          )}
          {query.tag && (
            <p className="text-sm cursor-pointer  bg-black/[0.2]   hover:bg-black/[0.4] hover:text-white rounded h-fit w-fit items-center px-2 py-1 mb-[1px] flex text-black">
              {query.tag}
              <button
                className="ml-2  text-gray-500"
                onClick={() => removeFilter("tag")}
              >
                ✕
              </button>
            </p>
          )}
          {query.location && query.location != "India" && (
            <p className="text-sm cursor-pointer  bg-black/[0.2]   hover:bg-black/[0.4] hover:text-white rounded h-fit w-fit items-center px-2 py-1 mb-[1px] flex text-black">
              {query.location}
              <button
                className="ml-2  text-gray-500"
                onClick={() => removeFilter("location")}
              >
                ✕
              </button>
            </p>
          )}
          {query.price.lte != "10000" && (
            <p className="text-sm cursor-pointer  bg-black/[0.2]   hover:bg-black/[0.4] hover:text-white rounded h-fit w-fit items-center px-2 py-1 mb-[1px] flex text-black">
              {"<"} {query.price.lte}
              <button
                className="ml-2  text-gray-500"
                onClick={() => removeFilter("price.lte")}
              >
                ✕
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Filters;
