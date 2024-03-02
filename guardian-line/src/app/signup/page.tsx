"use client"
import React from 'react'
import Image from 'next/image'
import logo from './logo4.jpg'
import {  useRef, useEffect, useState, ChangeEvent } from 'react';
import { createHash, verify } from 'crypto';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { Player } from "@lottiefiles/react-lottie-player";


// import * as IPFS from 'ipfs-core'

const Page = () => {
  const [aadharNumber, setAadharNumber] = useState<string>('');
  const [inputCount, setInputCount] = useState(0);
  const [otpValue, setOtpValue] = useState('');
  const [getOtp, setGetOtp] = useState('');
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputCount2, setInputCount2] = useState(0);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [username, setUsername] = useState("");
  const [timer, setTimer] = useState(120);
  const [intervalId, setIntervalId] = useState(null);
  const [hashedAadharNumber, setHashedAadharNumber] = useState<string>('');
  const [playerStarted, setPlayerStarted] = useState(false);
  // const [inputs, setInputs] = useState({
  //   password: "",
  //   confirmPassword: "",  
  // });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAadharNumber(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent entering more than 12 characters
    if (aadharNumber.length >= 12 && event.key !== 'Backspace') {
      event.preventDefault();
    }
  };

  const HandleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtpValue(event.target.value);
  };

  const router = useRouter();

  // let otp=""
  const handleTabClick = async () => {

    // console.log("hi")
    console.log(aadharNumber)
    const hashedAadharNumber = createHash('sha256').update(aadharNumber).digest('hex');
    setHashedAadharNumber(hashedAadharNumber);

    console.log(hashedAadharNumber)
    const fetchData = async () => {
      // console.log("hooo")
      try {
        const res = await fetch(
          `http://localhost:3000/api/getUIDAI?hashedAadharNumber=${hashedAadharNumber}`
        );
        const data = await res.json();
        if (res.status === 401) {
          toast.error("Invalid Aadhar Number");
          setErrorMessage("Invalid Aadhar Number");
        }
        // console.log(data);


        if (data != "InValid Aadhar Number") {
          const verify = async () => {
            try {
              const res = await fetch(
                `http://localhost:3000/api/otpVerify?data=${data.phoneNum}`
              );
              if (res.status >= 200 && res.status < 300) {
                const otp = await res.json();
                setGetOtp(otp.otp);

              }
            } catch (error: any) {
              console.log(error.message);
            };
          }; verify();
        }

        if (res.status == 401) {
          toast.error("Invalid Aadhar Number");
          setErrorMessage("Invalid Aadhar Number");
        }
        else if (res.status == 200) {
          setInputCount(1);
        }
      } catch (error: any) {
        console.log(error.message);
      };
    }; fetchData();




  };

  const handleSubmit = async () => {
    console.log("hi2")
    if (confirmPassword !== password) {
      toast.error("Passwords do not match");
    }
    if (inputCount2 === 1 && confirmPassword === password) {
      // if (confirmPassword === password) {
      console.log("hi");
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ userName: username, password: password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log("a");
      if (!res) {
        toast.dismiss();
        toast.error("Error");
      } else if (res.status === 200) {
        toast.dismiss();
        console.log("b");
        router.push(`/login?username=${username}`);
        state: { username: username }
        // reload the page
      } else {
        if (res.status === 401) {
          toast.error("Error . Please try again.");
        } else {
          toast.error("Could not");
        }
      }
    }
  };


  //   const generateString = async () => {

  //   const num= new Date().getTime();
  //     return "User" + num;
  // };




  const onSubmit = async () => {
    console.log(typeof getOtp);
    console.log(typeof otpValue);
    if (getOtp == otpValue && timer > 0) {
      console.log("otp verified");
      // const response = await fetch('/api/addAadhar', {
      //   method: 'POST',
      //   body: JSON.stringify({ hashedAadharNumber: hashedAadharNumber }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })

      // if (response.status === 401) {
      //   toast.error("Aadhar Number already exists");
      //   setErrorMessage("Aadhar Number already exists");
      // }
      // else if (response.status === 200) {
      //   setUsername('User' + new Date().getTime());
      setInputCount2(1);
      setUsername('User' + new Date().getTime());
      // }
     

    }
    else {
      toast.error("Invalid OTP");
      setErrorMessage("Invalid OTP");
      console.log("Invalid Aadhar");
    }
      setInputCount(0);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(intervalId); // Stop the timer when it reaches 0
          return prevTimer;
        }
        return prevTimer - 1; // Decrement the timer
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;


  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Check if passwords match and update error state accordingly
    if (value !== password) {
      setPasswordError(true); // Set error state to true
      setErrorMessage("Passwords do not match");
    } else {
      setPasswordError(false); // Reset error state
      setErrorMessage("");  // Reset error if passwords match
    }
  };

   setTimeout(() => {
    setPlayerStarted(true);
  }, 2000);


  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
   
    if (input) {
      input.addEventListener("input", (event) => {
        const filteredValue = (event.target as HTMLInputElement).value.replace(/\D/g, "").slice(0, 12);
        input.value = formatNumber(filteredValue);
      });
    }
  }, []);

  const formatNumber = (number: string) => {
    return number.split("").reduce((formattedNumber, digit, index) => {
      if (index !== 0 && !(index % 4)) formattedNumber += " ";
      return formattedNumber + digit;
    }, "");
  };


  return (
    <div className="md:px-0 bg-white">
      <Toaster />

      <section className="flex justify-center items-center h-screen w-screen bg-white">

        <div className='flex-col flex md:flex-row justify-center items-center md:translate-x-[-9rem] bg-white'>
          <Image src={logo} alt="logo for it" className=" w-[35vw] h-[20vh] md:w-[20rem] md:h-[20rem] md:relative z-10 left-[3rem] " />

          <div className="rounded-lg shadow-xl p-2 relative z-20 bg-white">
            <div className=" ">
              <div className='ml-15 mr-15  '>
                <h1 className='text-3xl text-center  text-teal-900 font-normal '>Guardian Line</h1>
                <h2 className="text-center  mt-1 text-2xl font-bold">Create your account</h2>
                <p className='text-center text-sm text-gray-500'>It's quick and easy</p>
              </div>
              <hr className='mt-4 border border-gray-300' />
              <form className="flex flex-col gap-4 mt-6 items-center justify-center" onSubmit={(e) => e.preventDefault()}>

                <div className="flex p-2 bg-white">
                  <div className='relative '>
                    <input type="text" placeholder="Enter Your Aadhar Number" id="aadhar" ref={inputRef}
                      className="bg-white border border-gray-400 py-1 px-12 w-full rounded-lg text-center"
                      onChange={handleInputChange}
                    />





                    <div className="tooltip flex" data-tip="Click Here for Authentication" onClick={handleTabClick}>
                      {inputCount2 !== 1 ? (
                        <img
                          src="/arrow2.svg"
                          alt=""
                          className="w-5 absolute right-2 bottom-2 bg-white"
                        />
                      ) : (
                        playerStarted && (
                          <Player
                            autoplay
                            keepLastFrame
                            src="/Animation-verify.json"
                            className="h-10 w-10 absolute right-2"
                            style={{ marginLeft: "4px", marginTop: "-2.3rem" }}
                          />
                        )
                      )}
                    </div>

                  </div>
                </div>


                {inputCount === 1 ? (
                  <div className='flex flex-col gap-3'>
                    <input
                      type="text"
                      placeholder="Enter the otp"
                      className='w-full border border-black bg-white'
                      value={otpValue}

                      onChange={HandleOtpChange}
                    />
                    <button
                      type="submit"
                      className='border border-black w-full'
                      onClick={(e) => {
                        onSubmit();
                        console.log(otpValue); // Logging otpValue when submit button is clicked
                        e.preventDefault();
                      }}
                    >
                      Submit
                    </button>

                    {timer > 0 ? (
                      <div className='text-sm text-slate-400 text-center'>
                        Resend OTP in <span className='text-green-700'>{minutes}:{seconds < 10 ? '0' : ''}{seconds}</span>
                      </div>
                    ) : (
                      <a href="#" className="text-sm text-center text-green-700">
                        Resend OTP
                      </a>
                    )}

                  </div>
                ) : null}




                <div className=" flex flex-col gap-3 bg-white">
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Username"
                    disabled={inputCount2 !== 1}
                    value={inputCount2 === 1 ? username : ''}
                    className={`bg-yellow-100 py-1 px-12 border border-gray-400 rounded-lg text-center w-full ${userNameError ? "border-red-500" : "border-gray-400"
                      } rounded-lg text-center w-full ${inputCount2 !== 1 ? 'disabled' : ''}`}
                  />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    disabled={inputCount2 !== 1}
                    className={`bg-yellow-100 py-1 px-12 border border-gray-400 rounded-lg text-center w-full ${passwordError ? "border-red-500" : "border-gray-400"
                      } rounded-lg text-center w-full`}
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    id="ConfirmPassword"
                    name="password"
                    type="password"
                    placeholder="Confirm Password"
                    disabled={inputCount2 !== 1}
                    className={`bg-yellow-100 py-1 px-12 border border-gray-400 rounded-lg text-center w-full ${passwordError ? "border-red-500" : "border-gray-400"
                      } rounded-lg text-center w-full`}
                    value={confirmPassword || ""}
                    onChange={(e) => handleConfirmPasswordChange(e)}
                  />
                </div>

                <div className='py-2 px-4 w-full bg-white'>
                  <button className="w-full  py-1 rounded-lg text-center text-black bg-slate-300 border border-black border-3 text-md hover:bg-teal-300 hover:scale-100 duration-300 font-semibold" onClick={handleSubmit}>
                    Sign Up
                  </button>
                </div>

                <div className='px-4 w-full bg-white'>
                  <div className="w-full mt-2 text-xs flex justify-between bg-slate-700 p-1 px-4 rounded-lg">
                    <p className=' text-md text-white flex items-center'>Already have an account?</p>
                    <button className=" py-2 w-1/3 bg-white border rounded-xl hover:scale-100 duration-300"
                      onClick={() => router.push("/login")}>Login</button>
                  </div>
                </div>

              </form>


            </div>
            {/* <div className='w-1/2 '>
            <Image src={logo} alt="logo for it" className="md:block hidden h-[120%] w-[120% ]" />

          </div> */}



          </div>
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