'use client';
import React, { useEffect } from "react";
import Image from "next/image";
import logo from "./logo4.jpg";


const Page = () => {
  useEffect(() => {
    getUserName();
  }, []);

  async function getUserName() {
    return "annu";
  }
  return (
    <div className="container md:px-0">
      <section className=" m-5 flex justify-start h-screen">
        <Image
          src={logo}
          alt="logo for it"
          className="w-[30%] h-[60%] relative z-10 left-[3%] ml-10 "
        />

        <div className="rounded-lg shadow-xl w-[30%] h-[50%] p-2 relative z-20 top-[15%]">
          <div className=" ">
            <div className="ml-15 mr-15 mt-6">
              <h2 className="text-center  mt-1 text-2xl ">
                Login to your account
              </h2>
              {/* <p className='text-center text-sm text-gray-500'>It's quick and easy</p> */}
            </div>
            {/* <hr className='mt-2 border border-gray-300' /> */}
            <form
              action="#"
              className="flex flex-col gap-4 mt-4 items-center justify-center"
            >
              <div className="p-2 flex flex-col gap-3 ">
                <input
                  type="text"
                  placeholder="Username"
                  className="py-2 px-12 border border-gray-400 rounded-lg text-center w-full"
                />
                <input
                  type="Password"
                  placeholder="Password"
                  className="py-2 border border-gray-400 rounded-lg text-center w-full"
                />
              </div>

              <div className=" px-4 w-full">
                <button className="w-full  py-2 rounded-lg text-center text-black  border border-black border-3 text-md hover:bg-teal-300 hover:scale-100 duration-300 font-semibold" onClick={getUserName}>
                  Login
                </button>
              </div>

              <div className="px-4 w-full">
                <div className="w-full mt-2 text-xs flex justify-between bg-slate-700 py-2 rounded-lg px-4">
                  <p className=" text-md text-white flex items-center">
                    Forgotten account?
                  </p>
                  <button className=" p-2 px-4 bg-white border rounded-lg hover:scale-100 duration-300">
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* <div className='w-1/2 '>
            <Image src={logo} alt="logo for it" className="md:block hidden h-[120%] w-[120% ]" />

          </div> */}
        </div>
      </section>
    </div>
  );
};
// orange: #ff710d
// kesari #FF7722
// white #ffffff
// yellow #ffb800
export default Page;
