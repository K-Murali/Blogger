import React from 'react'

const Modalbox = ({title,description,tag,onchange,handleedit,id}) => {
  return (
    <>
         <div className="    glass rounded  h-fit w-4/6  ">
                    <form method="dialog ">
                      <div className=" m-4  items-center   flex flex-col   ">
                      <h3 className="font-bold text-2xl">Edit here</h3>
                        {/* making items center */}
                        <div className="mb-2.5  w-5/6 container  flex flex-col items-center justify-center " action="">
                          <label className="form-control   w-full"> <span className="label-text flex flex-col ">  <h1 className="  text-lg m-2 ">Title</h1></span></label>
                          <input minLength={3} required defaultValue={title} name='title' onChange={onchange}  type="text"  className="input  input-bordered input-success w-full" />

                          <label className="form-control   w-full"> <span className="label-text flex flex-col ">  <h1 className="  text-lg m-2 ">Description</h1></span></label>
                          <textarea minLength={5}  defaultValue={description} required rows='8' name='description' onChange={onchange}  type="text" placeholder="Type here" className="input  input-bordered  input-success w-full h-fit" ></textarea>
                          
                          <label className="form-control   w-full"> <span className="label-text flex flex-col ">  <h1 className="  text-lg m-2 ">Tag</h1></span></label>
                          <input name='tag' defaultValue={tag}  onChange={onchange}  type="text" placeholder="Type here" className="input mb-5  input-bordered input-success w-full" />
                      <button name='edit' value={id} type="button" onClick={handleedit} className=" bg-info rounded p-1 h-fit text-white">Submit</button>
                        </div>

                      </div>
                    </form>
                </div>
    </>
  )
}

export default Modalbox
