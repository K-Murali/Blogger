// import React, { useState, useEffect, useContext } from "react";
// import { noteContext } from "../context/notes/NoteState";

// const Postdetail = () => {
//   const { currnote, getbyid } = useContext(noteContext);

//   useEffect(() => {
//     getbyid(localStorage.getItem("id"));
//     console.log(currnote);
//   }, []);

//   return (
//     currnote && (
//       <div className=" m-6 flex items-center justify-center min-h-screen">
//         <div className="w-4/5 shadow-sm rounded-lg border">
//           <div className="card flex justify-center bg-base-100 shadow-xl">
//             <div className="card-body flex-row">
//               <div className="flex-col w-1/2 mb-4 justify-center">
//                 <h1 className="text-3xl   text-red-700   font-semibold ">
//                   A day at {currnote.title}
//                 </h1>
//                 <img
//                   className="border mt-8 mb-8   rounded"
//                   alt=""
//                   src={`http://localhost:8000/Images/${currnote.photo}`}
//                 />
//                 <div className="overflow-hidden text-lg">{currnote.para}</div>
//               </div>
//               <div className="flex ">
//                 <div className="w-10 rounded-full  ">
//                   <img
//                     alt=""
//                     src={`http://localhost:8000/Images/${currnote.photo}`}
//                   />
//                 </div>
//                 <h2>{currnote.user.name}</h2>
//                 <p>{currnote.likes}</p>
//                 <div>
//                 {/* You can map through actual comments data here */}
//                 {currnote.comments &&
//                   currnote.comments.map((e) => {
//                     return (
//                       <div className="flex justify-between items-center">
//                         <div className="ml-2">
//                           <h1 className="text-sm font-bold">{e.users.name}</h1>
//                           <p className="text-sm">{e.comment}</p>
//                         </div>
//                       </div>
//                     );
//                   })}
//               </div>
//               </div>

//               <div className="card-actions flex justify-center"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default Postdetail;
