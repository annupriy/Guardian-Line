import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const authSession = await getServerAuthSession();
  return (
    <main className="flex items-center justify-center h-screen">
      {authSession?.user && redirect("/dashboard")}
      {!authSession?.user && redirect("/login")}
    </main>
  );
}
