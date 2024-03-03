"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="container">
      <div className="flex-col h-screen w-screen flex justify-center items-center bg-gray-100 pt-2 ">
        <div className="rounded-lg shadow-xl h-[30rem] w-[20rem] p-2 relative z-20  bg-white ">
          <div className="bg-white ">
            <h1 className="text-3xl text-center mt-3 text-teal-900 font-normal ">
              Guardian Line
            </h1>
            <div className="ml-15 mr-15 mt-6 bg-white">
              <h2 className="text-center  mt-1 text-2xl  font-semibold">
                Login as Admin
              </h2>
              <hr className="mt-2" />
            </div>
          </div>
          <form
            className="flex flex-col gap-3 mt-16 items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission behavior
              router.push("/admin"); // Navigate to the admin page
            }}
          >
            <div className="px-2 flex flex-col gap-3 w-full max-w-xs">
              <select className="select select-success w-full">
                <option disabled selected>
                  Select your city
                </option>
                <option>Hyderabad</option>
                <option>Lucknow</option>
              </select>
            </div>
            <div className="px-2 flex flex-col gap-3 w-full max-w-xs ">
              <input
                type="password"
                id="password"
                name="password"
                className="input input-bordered w-full input-success"
                placeholder="Password"
              />
            </div>
            <div className=" translate-y-24 px-16 w-full">
              <button
                type="submit"
                className="w-full p-2 rounded-lg text-center text-black  border border-black border-3 text-md hover:bg-green-600 hover:scale-100 duration-300 font-semibold"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
