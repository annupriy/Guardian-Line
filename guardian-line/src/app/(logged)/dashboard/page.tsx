import React from "react";
import Dashboard from "@/app/Components/Dashboard";
import { getServerAuthSession } from "@/server/auth";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

type UserInfoProps = {
  user: User;
};

const DashboardPage = async ({ user }: UserInfoProps) => {
  const authSession = await getServerAuthSession();
  if (!authSession) {
    redirect('/login')
  }
  return <Dashboard user={authSession.user} />;
};

export default DashboardPage;
