import React from "react";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";
const Sidebar = () => {
  return (
    <>
    
      <ul className="menu menu-md h-dvh rounded-box mx-4 w-1/5">
        <li className="py-6 text-xl">
           logo
        </li>
        <li className="py-4 focus:outline-none focus:ring text-cyan-800">
        <Link href="/volunteers" className="text-lg">Reported Crimes</Link>
        </li>
        <li className="py-4 focus:outline-none focus:ring text-cyan-800">
        <Link href="/volunteers" className="text-lg">Volunteers page</Link>
        </li>
        <li className="py-4 focus:outline-none focus:ring text-cyan-800">
        <Link href="/volunteers" className="text-lg">About Us</Link>
        </li>
        <li className="py-4 focus:outline-none focus:ring text-cyan-800">
        <Link href="/volunteers" className="text-lg">User Guide</Link>
        </li>
        <li className="py-4 focus:outline-none focus:ring text-cyan-800">
        <Link href="/volunteers" className="text-lg">Contact Us</Link>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
