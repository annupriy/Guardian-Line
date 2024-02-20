// page.tsx

import React from 'react'
import ReportsFiled from './reportsFiled'; 
// import Unregistered from './Unregistered'
// import Registered from './Registered'
const page = () => {
  return (
    <>
      < ReportsFiled/ >
      {/* < Registered/ > */}
      </>
  )
}

export default page

// import React, { useState } from 'react';
// import ReportsFiled from './reportsFiled'; // Import the ReportsFiled component

// const Page = () => {
//   const [showReports, setShowReports] = useState(false);

//   const handleReportsClick = () => {
//     setShowReports(true);
//   };

//   return (
//     <div>
//       <div className="sidebar">
//         {/* Sidebar content */}
//         <button onClick={handleReportsClick}>Reported Crimes</button>
//       </div>
//       <div className="main-content">
//         {/* Main content area */}
//         {showReports && <ReportsFiled />} {/* Render ReportsFiled component if showReports is true */}
//       </div>
//     </div>
//   );
// };

// export default Page;
