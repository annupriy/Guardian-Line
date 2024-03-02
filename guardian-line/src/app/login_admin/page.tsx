"use client";
import React from 'react'
import { useRouter } from "next/navigation";


const Page = () => {

  const router = useRouter();
  return (
    <div className='w-[30rem]  flex justify-center items-center '>
      <div className=" rounded-lg shadow-xl h-[28rem] p-2 relative  bg-orange-200 ">
        <div className="ml-15 mr-15 mt-6 bg-red-400">
          <h2 className="text-center  mt-1 text-2xl ">
            Login As Admin
          </h2>
        </div>
        <form
          //   onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4 items-center justify-center"
        >

          <div className="p-2 flex flex-col gap-3 ">
            <label htmlFor="userName" className="text-md"> </label>
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder="Username"
              value={""}

              className={`py-2 px-12 border  rounded-lg text-center w-full`}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className={`py-2 border  rounded-lg text-center w-full`}
              value={""}

            />
          </div>

          <div className=" px-4 w-full">
            <button
              type="submit"
              className="w-full  py-2 rounded-lg text-center text-black  border border-black border-3 text-md hover:bg-teal-300 hover:scale-100 duration-300 font-semibold"
              onClick={() => router.push("/Admin")}>


              Login
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Page
