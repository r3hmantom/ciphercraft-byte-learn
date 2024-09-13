import React from "react";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-[300px_1fr] h-screen bg-white"><Sidebar />{children}</div>;
};


export default DashboardLayout  