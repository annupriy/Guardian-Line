import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="h-full flex-col" style={{ backgroundColor: '#f0f0f0'}}>
        <Navbar />
        <div className="flex h-[100vh]">
          <div
            className="w-1/6 h-full"
          >
            <Sidebar />
          </div>
          <div className="w-5/6 h-full">{children}</div>
        </div>
      </div>
    </section>
  );
}
