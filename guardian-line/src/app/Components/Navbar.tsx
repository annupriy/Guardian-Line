"use client";
// import React from "react";
// import { UserCircleIcon } from "@heroicons/react/24/solid";
// import Link from "next/link";
// import { signOut } from "next-auth/react";
// import toast,{Toaster} from "react-hot-toast";

// const Navbar = () => {
//   const handleLogout = async () => {
//     await toast.promise(signOut(), {
//       loading: "Logging out...",
//       success: "Logged out",
//       error: "Error logging out",
//     }),
//       {
//         style: {
//           maxWidth: "200px",
//         },
//       };
//   };
//   return (
//     <>
//       <div className="navbar  bg-emerald-600 w-full flex-end justify-between items-center h-[15%] top-0 right-0 border-b-2 border-slate-300">
//         <Toaster />
//         <img
//           src={"./Guardian Line-logos_transparent.png"}
//           alt=""
//           width={170}
//           height={170}
//         />
//         <div className="flex-1 flex justify-center">
//           <a
//             href="/"
//             className="text-white font-bold text-3xl mx-4 hover:cursor-pointer focus:drop-shadow-sm"
//           >
//             Guardian Line
//           </a>
//         </div>
//         <div className="flex-none gap-2">
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar mr-8"
//             >
//               <UserCircleIcon className="w-10 rounded-full overflow-hidden border-1 border-cyan-900">
//                 <img
//                   alt="Tailwind CSS Navbar component"
//                   src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
//                 />
//               </UserCircleIcon>
//             </div>
//             <ul
//               tabIndex={0}
//               className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
//             >
//               <li>
//                 <Link href="../my_profile" className="justify-between">
//                   My Profile
//                   {/* <span className="badge">New</span> */}
//                 </Link>
//               </li>
//               <li>
//                 <button onClick={handleLogout}>Logout</button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import React, { useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
// import styles from "./navbar.module.css";

const Navbar = () => {
  useEffect(() => {
    const handleLogout = async () => {
      await toast.promise(signOut(), {
        loading: "Logging out...",
        success: "Logged out",
        error: "Error logging out",
      }),
      {
        style: {
          maxWidth: "200px",
        },
      };
    };

    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", handleLogout);
    }

    // const myProfileButton = document.getElementById("myProfileButton");
    // if (myProfileButton) {
    //   myProfileButton.addEventListener("click", handleMyProfile);
    // }

     // Cleanup function to remove the event listeners
     return () => {
      if (logoutButton) {
        logoutButton.removeEventListener("click", handleLogout);
      }
      // if (myProfileButton) {
      //   myProfileButton.removeEventListener("click", handleMyProfile);
      // }
    };
  }, []);

  return (
    <>
    
      <div className="navbar  bg-emerald-600 w-full flex-end justify-between items-center h-[15%] top-0 right-0 border-b-2 border-slate-300 fixed z-10">
        <Toaster />
        <img
          src={"./Guardian Line-logos_transparent.png"}
          alt=""
          width={170}
          height={170}
        />
        <div className="flex-1 flex justify-center">
          <a
            href="/"
            className="text-white font-bold text-3xl mx-4 hover:cursor-pointer focus:drop-shadow-sm"
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
                <Link href="../my_profile" className="justify-between">
                  My Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <button id="logoutButton">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

