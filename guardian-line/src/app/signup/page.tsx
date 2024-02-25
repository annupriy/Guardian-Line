"use client"
import React from 'react'
import Image from 'next/image'
import logo from './logo4.jpg'
import { useEffect, useState } from 'react';
import { createHash } from 'crypto';
import * as IPFS from 'ipfs-core'

const Page = () => {
  const [aadharNumber, setAadharNumber] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAadharNumber(event.target.value);
  };

  const handleTabClick = async () => {
    const hashedAadharNumber = createHash('sha256').update(aadharNumber).digest('hex');
    console.log(hashedAadharNumber)

  //   const verify = await fetch('/api/getUIDAI',{
  //      method: 'POST',
  //      body: JSON.stringify({ hashedAadharNumber: hashedAadharNumber }),
  //      headers: {
  //        'Content-Type': 'application/json'
  //      }
  //     })

  //   if(verify.status === 200){
  //       const responseData = await verify.json();
  //       const phoneNumber = responseData.phoneNumber;
  //       console.log('Phone Number:', phoneNumber);
  //    }else if (verify.status === 405) {
  //       console.log('Aadhar number not found');
  //   }else {
  //     console.error('Failed to fetch data:', verify.statusText);
  //  }

 


    const response = await fetch('/api/addAadhar', {
      method: 'POST',
      body: JSON.stringify({ hashedAadharNumber: hashedAadharNumber }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

  };




  return (
    <div className="container md:px-0 bg-white">

      <section className=" m-5 flex justify-start h-screen ">
        <Image src={logo} alt="logo for it" className="w-[30%] h-[60%] relative z-10 left-[3%] ml-10 " />

        <div className="rounded-lg shadow-xl w-[30%] h-[68%] p-2 relative z-20 top-[10%]">
          <div className=" ">
            <div className='ml-15 mr-15 mt-6 '>
              <h2 className="text-center  mt-1 text-2xl font-bold">Create your account</h2>
              <p className='text-center text-sm text-gray-500'>It's quick and easy</p>
            </div>
            <hr className='mt-4 border border-gray-300' />
            <form action="#" className="flex flex-col gap-4 mt-6 items-center justify-center">

              <div className="flex p-2">
                <div className='relative '>
                  <input type="text" placeholder="Enter Your Aadhar Number" id="aadhar"
                    className="bg-white border border-gray-400 py-1 px-12 w-full rounded-lg text-center"
                    onChange={handleInputChange}
                  />

                  <div className="tooltip flex" data-tip="Click Here for Authentication"
                    onClick={handleTabClick}>
                    <img src="/arrow2.svg" alt="" className='w-5 absolute right-2 bottom-2' />
                  </div>
                </div>
              </div>

              <div className=" flex flex-col gap-3 ">
                <input type="text" placeholder="Username" className="bg-white py-1 px-12 border border-gray-400 rounded-lg text-center w-full" />
                <input type="Password" placeholder="Password" className="bg-white py-1 border border-gray-400 rounded-lg text-center w-full" />
                <input type="Password" placeholder="Confirm Password" className="bg-white py-1 border border-gray-400 rounded-lg text-center w-full" />
              </div>

              <div className='py-2 px-4 w-full'>
                <button className="w-full  py-1 rounded-lg text-center text-black bg-slate-300 border border-black border-3 text-md hover:bg-teal-300 hover:scale-100 duration-300 font-semibold">
                  Sign Up
                </button>
              </div>

              <div className='px-4 w-full'>
                <div className="w-full mt-2 text-xs flex justify-between bg-slate-700 p-1 px-4 rounded-lg">
                  <p className=' text-md text-white flex items-center'>Already have an account?</p>
                  <button className=" py-2 w-1/3 bg-white border rounded-xl hover:scale-100 duration-300">Login</button>
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

  )
}
// orange: #ff710d
// kesari #FF7722
// white #ffffff
// yellow #ffb800
export default Page;