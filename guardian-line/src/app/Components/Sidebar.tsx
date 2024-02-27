// import React from "react";
// import Link from "next/link";

// const Sidebar = () => {
//   return (
//     <>
//       <ul className="menu menu-md h-full mx-2 flex-nowrap justify-evenly bg-stone-600	">
//         <li className="pt-2 focus:outline-none focus:ring text-cyan-800">
//         <Link href="/reported_crimes" className="text-lg text-white">Reported Crimes</Link>
//         </li>
//         <li className="focus:outline-none focus:ring text-cyan-800">
//         <Link href="/volunteers" className="text-lg text-white">Volunteers page</Link>
//         </li>
//         <li className="focus:outline-none focus:ring text-cyan-800">
//         <Link href="/aboutUs" className="text-lg text-white">About Us</Link>
//         </li>
//         <li className="focus:outline-none focus:ring text-cyan-800">
//         <Link href="/user_guide" className="text-lg text-white">User Guide</Link>
//         </li>
//         <li className="focus:outline-none focus:ring text-cyan-800">
//         <Link href="/contactUs" className="text-lg text-white">Contact Us</Link>
//         </li>
//       </ul>
//     </>
//   );
// };



// import React from "react";
// import Link from "next/link";

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <ul className="menu grid grid-cols-1 grid-rows-auto gap-2 h-full">
//         <li className="menu-item active">
//           <Link href="/reported_crimes" className="menu-link">
//             <span className="icon">{/* Your icon component here */}</span>
//             Reported Crimes
//           </Link>
//         </li>
//         <li className="menu-item">
//           <Link href="/volunteers" className="menu-link">
//             <span className="icon">{/* Your icon component here */}</span>
//             Volunteers
//           </Link>
//         </li>
//         <li className="menu-item">
//           <Link href="/aboutUs" className="menu-link">
//             <span className="icon">{/* Your icon component here */}</span>
//             About Us
//           </Link>
//         </li>
//         <li className="menu-item">
//           <Link href="/user_guide" className="menu-link">
//             <span className="icon">{/* Your icon component here */}</span>
//             User Guide
//           </Link>
//         </li>
//         <li className="menu-item">
//           <Link href="/contactUs" className="menu-link">
//             <span className="icon">{/* Your icon component here */}</span>
//             Contact Us
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import Link from "next/link";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <ul className={`${styles.sidebar} menu menu-md h-full mx-2 flex-nowrap  bg-stone-600`}>
      <li className={styles["menu-item"]}>
        <Link href="/reported_crimes" className={styles["menu-link"]}>
          <span className={styles.icon}>{/* Your icon component here */}</span>
          Reported Crimes
        </Link>
      </li>
      <li className={styles["menu-item"]}>
        <Link href="/volunteers" className={styles["menu-link"]}>
          <span className={styles.icon}>{/* Your icon component here */}</span>
          Volunteers
        </Link>
      </li>
      <li className={styles["menu-item"]}>
        <Link href="/aboutUs" className={styles["menu-link"]}>
          <span className={styles.icon}>{/* Your icon component here */}</span>
          About Us
        </Link>
      </li>
      <li className={styles["menu-item"]}>
        <Link href="/user_guide" className={styles["menu-link"]}>
          <span className={styles.icon}>{/* Your icon component here */}</span>
          User Guide
        </Link>
      </li>
      <li className={styles["menu-item"]}>
        <Link href="/contactUs" className={styles["menu-link"]}>
          <span className={styles.icon}>{/* Your icon component here */}</span>
          Contact Us
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
