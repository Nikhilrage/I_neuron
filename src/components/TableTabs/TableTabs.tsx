import React, { useState, FC } from "react";
import { BiUserX, BiUser, BiBlanket } from "react-icons/bi";
// Redux imports
import { setActiveTab } from "../../Redux/slices/dashboardStateSlice";
import { useAppDispatch } from "../../Redux/store";

const TableTabs: React.FC = () => {
  const dispatch = useAppDispatch();

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setSelectedTabIndex(index);
    dispatch(setActiveTab(index));
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex justify-start items-center text-[#8690A0]">
        {tabsData?.map((tab: any, index: number) => (
          <li
            className={`${selectedTabIndex === index ? "selected-tab" : "tab"}`}
            style={{
              marginRight: "-20px",
              zIndex: selectedTabIndex === index ? 10 : 5 - index,
            }}
          >
            <div
              key={index}
              className="h-full flex justify-center items-center cursor-pointer text-xl font-medium"
              onClick={() => handleTabClick(index)}
            >
              <span className="mr-1">{tab.icon}</span>
              <span className="">{tab.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableTabs;

const tabsData = [
  { name: "Active users", icon: <BiUser className="text-lg" /> },
  { name: "Archived users", icon: <BiUserX /> },
  { name: "User logs", icon: <BiBlanket /> },
];
