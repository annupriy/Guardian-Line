import React from "react";
import Dashboard from "@/app/Components/Dashboard";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const authSession = await getServerAuthSession();
  if (!authSession) {
    redirect('/login')
  }
  if(authSession.user){
    return <Dashboard user={authSession.user} />;
  }
};

export default DashboardPage;
