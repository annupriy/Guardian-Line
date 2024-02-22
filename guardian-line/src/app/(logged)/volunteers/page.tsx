import React from "react";
import UnregisteredVolunteers from "@/app/Components/UnregisteredVolunteers";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { isRegistered } from "@/server/db/isRegsitered";
import RegisteredVolunteers from "@/app/Components/RegisteredVolunteers";
const page = async () => {
  const authSession = await getServerAuthSession();
  if (!authSession) {
    redirect("/login");
  }
  if (authSession.user) {
    const isVolunteer = await isRegistered(authSession.user.name);
    if (!isVolunteer) {
      return <UnregisteredVolunteers user={authSession.user} />;
    } else {
      return <RegisteredVolunteers/>;
    }
  }
};

export default page;
