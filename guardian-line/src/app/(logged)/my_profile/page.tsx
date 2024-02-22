import React from 'react'
import Profile from '@/app/Components/Profile'
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";


const page = async () => {
  const authSession = await getServerAuthSession();
  if (!authSession) {
    redirect('/login')
  }
  if(authSession.user){
    return <Profile username={authSession.user.name} />;
  }
}

export default page