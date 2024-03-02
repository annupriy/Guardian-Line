"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import logo from "./logo4.jpg";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type LoginInput = {
  userName: string;
  password: string;
};

type PageProps = {
  searchParams: { error?: string };
};

const Page = ({ searchParams }: PageProps) => {
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputs, setInputs] = useState<LoginInput>({
    userName: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputs)
    setErrorMessage(null);
    const res = await toast.promise(
      signIn("credentials", {
        userName: inputs.userName,
        password: inputs.password,
        callbackUrl: "/",
        redirect: false,
      }),
      {
        loading: "Logging in...",
        success: "Logged in",
        error: "Error",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );
    if (!res) {
      toast.dismiss();
      toast.error("Error");
      setErrorMessage("Error");
    } else if (!res.error) {
      router.push("/");
    } else {
      toast.dismiss();
      if (res.status == 401) {
        toast.error("Invalid username or password");
        setErrorMessage("Invalid username or password");
      } else {
        toast.error("Could not login.");
        setErrorMessage("Could not login.");
      }
    }
  };

  useEffect(() => {
    setInputs((prevInputs) => ({ ...prevInputs, userName: "" }));
      const name = new URLSearchParams(searchParams).get("username");
      if (name!==undefined && name!==null && name!=="") {
        setInputs((prevInputs) => ({ ...prevInputs, userName: name }));

      }
    
  }, []);

  return (
    <div className="container md:px-0 bg-white">
      <section className="flex justify-center items-center h-screen w-screen  bg-white">

        <div className='flex-col flex md:flex-row justify-center items-center md:translate-x-[-9rem] bg-white pt-2 '>

          <Image
            src={logo}
            alt="logo for it"
            className="w-[35vw] h-[20vh] md:w-[20rem] md:h-[20rem] md:relative z-10 left-[3rem] top-[-3rem] "
          />
          <Toaster />
          <div className="rounded-lg shadow-xl h-[28rem] p-2 relative z-20  bg-white ">
            <div className="bg-white ">
              <h1 className='text-3xl text-center  text-teal-900 font-normal '>Guardian Line</h1>
              <div className="ml-15 mr-15 bg-white">
                <h2 className="text-center  mt-1 text-2xl  font-semibold">
                  Login to your account
                </h2>
                <hr className="mt-2" />
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 items-center justify-center  bg-white"
              >
                <div className="p-2 flex flex-col gap-3 bg-white">
                  <label htmlFor="userName" className="text-md"> </label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="Username"
                    value={inputs.userName || ""}
                    onChange={handleChange}
                    className={`py-2 px-12 bg-yellow-100 border ${userNameError ? "border-red-500" : "border-gray-400"
                      } rounded-lg text-center w-full`}
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={`py-2 px-12 border bg-yellow-100 ${passwordError ? "border-red-500" : "border-gray-400"
                      } rounded-lg text-center w-full`}
                    value={inputs.password || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className=" px-2 w-full bg-white">
                  <button
                    type="submit"
                    className="w-full py-2 px-12 rounded-lg text-center text-black  border border-black border-3 text-md hover:bg-teal-300 hover:scale-100 duration-300 font-semibold">
                    Login
                  </button>
                </div>

                <div className="px-2 w-full bg-white">
                  <div className="w-full mt-2 text-xs flex justify-between bg-slate-700 py-1 px-3 rounded-lg ">
                    <p className=" text-md text-white flex items-center">
                      Already have an account?
                    </p>
                    <button className=" py-2 px-4 bg-white border rounded-lg hover:scale-100 duration-300"
                      onClick={(e) => { e.stopPropagation(); e.preventDefault(); router.push("/signup") }}>
                      Sign up
                    </button>
                  </div>
                </div>
                {searchParams.error && (
                  <p className="text-red-600 text-center capitalize">
                    Login failed.
                  </p>
                )}
                <div className="w-full px-2 bg-white">
                  <button className=" w-full py-2  bg-slate-700 text-white border-black rounded-lg hover:bg-teal-700 font-semibold hover:scale-100 duration-300" onClick={(e) => { e.stopPropagation(); e.preventDefault(); router.push("/login_admin") }}>Login as Admin</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
