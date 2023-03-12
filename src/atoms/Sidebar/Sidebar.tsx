import React from "react";
import logo from "../../assets/ineuron_logo.png";
import { useAppSelector } from "../../Redux/store";

interface sidebartabs {
  name: string;
  active: boolean;
}
const Sidebar = () => {
  const activeTab = useAppSelector(
    ({ dashboardState }) => dashboardState.activeTab
  );

  const sidebarTabs: sidebartabs[] = [
    {
      name: "Active users",
      active: activeTab === 0 ? true : false,
    },
    {
      name: "Deleted users",
      active: activeTab === 1 ? true : false,
    },
    {
      name: "user logs",
      active: activeTab === 2 ? true : false,
    },
  ];

  return (
    <div className=" text-[#000] border-r border-slate-500 h-screen">
      <div className=" mx-4 h-full">
        <div className="flex flex-col  h-full">
          <div className="sidebar_logo my-6 pb-4 border-b border-[pink]-900 ">
            <img src={logo} alt="" className="object-contain h-full w-full" />
          </div>
          <div className="mt-7">
            {sidebarTabs.map((i: sidebartabs, index: number) => (
              <div
                key={index}
                className="py-3 px-2 mb-4 rounded-xl bg-[#EEF2F7] flex items-center justify-start"
              >
                <span
                  className={`mr-4  w-4 h-4 rounded-[50%] ${
                    i.active ? "bg-[#F7931A]" : "bg-[#A693FD]"
                  }`}
                />
                <div>{i?.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
