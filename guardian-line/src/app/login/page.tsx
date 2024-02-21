"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import logo from "./logo4.jpg";
import { signIn } from "next-auth/react";

type LoginInput = {
  username: string;
  password: string;
};

type PageProps = {
  searchParams: { error?: string };
};

const Page = ({ searchParams }: PageProps) => {
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [inputs, setInputs] = useState<LoginInput>({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("hii");
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (inputs.password !== "") {
      await signIn("credentials", {
        username: inputs.username,
        password: inputs.password,
        callbackUrl: "/",
      });
    }
  };
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
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-4 items-center justify-center"
            >
              <div className="p-2 flex flex-col gap-3 ">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={inputs.username || ""}
                  onChange={handleChange}
                  className={`py-2 px-12 border ${
                    usernameError ? "border-red-500" : "border-gray-400"
                  } rounded-lg text-center w-full`}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={`py-2 border ${
                    passwordError ? "border-red-500" : "border-gray-400"
                  } rounded-lg text-center w-full`}
                  value={inputs.password || ""}
                  onChange={handleChange}
                />
              </div>

              <div className=" px-4 w-full">
                <button
                  type="submit"
                  className="w-full  py-2 rounded-lg text-center text-black  border border-black border-3 text-md hover:bg-teal-300 hover:scale-100 duration-300 font-semibold"

                  // onClick={() => {
                  //   getUserName();
                  //   matchCredentials();
                  // }}
                >
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
              {searchParams.error && (
                <p className="text-red-600 text-center capitalize">
                  Login failed.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
