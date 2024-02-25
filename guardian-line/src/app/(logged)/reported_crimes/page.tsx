// import React from 'react'
// import ReportsFiled from './reportsFiled'; 
// // import Unregistered from './Unregistered'
// // import Registered from './Registered'
// const page = () => {
//   return (
//     <>
//       < ReportsFiled/ >
//       {/* < Registered/ > */}
//       </>
//   )
// }

// export default page

"use client"

import React, { useEffect, useState } from 'react';
import ReportsFiled from './reportsFiled';
// import { getServerAuthSession } from "@/server/auth";
import {SessionProvider, useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [reportsPresent, setReportsPresent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        // redirect("/login");
        return; // Redirect or handle unauthenticated state
      }

      try {
        const response = await fetch(`/api/findReports?userName=${session.user.name}`);
        if (response.ok) {
          const { reportsPresent } = await response.json();
          setReportsPresent(reportsPresent);
        } else {
          console.error('Error fetching reports:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {reportsPresent ? (
        <ReportsFiled />
      ) : (
        <div>No reports filed yet! Stay safe.</div>
      )}
    </>
  );
};

const WrappedPage = () => (
  <SessionProvider>
    <Page />
  </SessionProvider>
);


export default WrappedPage;

