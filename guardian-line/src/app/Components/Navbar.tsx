import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-fuchsia-100 w-full flex-end justify-between items-center h-[20%] top-0 right-0">
          <img
            src={"./Guardian Line-logos_transparent.png"}
            alt=""
            width={170}
            height={170}
          />
        <div className="flex-1 flex justify-center">
          <a
            href="/"
            className="text-cyan-900 font-bold text-3xl mx-4 hover:cursor-pointer focus:drop-shadow-sm"
          >
            Guardian Line
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-8"
            >
              <UserCircleIcon className="w-10 rounded-full overflow-hidden border-1 border-cyan-900">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                />
              </UserCircleIcon>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  My Profile
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
