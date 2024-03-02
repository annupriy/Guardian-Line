import React from "react";
import ReportedCrimes from "@/app/Components/ReportedCrimes";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const authSession = await getServerAuthSession();
  if (!authSession) {
    redirect("/login");
  }
  if (authSession.user) {
    return <ReportedCrimes user={authSession.user} />;
  }
};

export default Page;
