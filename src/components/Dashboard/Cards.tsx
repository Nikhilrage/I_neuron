import React from "react";
import { GrAdd } from "react-icons/gr";
//Redux imports
import { setOpenModal } from "../../Redux/slices/dashboardStateSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/store";

interface cardDataInterface {
  cardTitle: string;
  count: number;
}

const Cards = () => {
  const dispatch = useAppDispatch();
  const getDeletedUsers: any = localStorage.getItem("deletedUsers");
  const activeUsers = useAppSelector(({ users }) => users.activeUsers);

  const cardData: cardDataInterface[] = [
    { cardTitle: "Active Users", count: activeUsers ? activeUsers.length : 0 },
    {
      cardTitle: "Archived Users",
      count:
        JSON.parse(getDeletedUsers).length > 0
          ? JSON.parse(getDeletedUsers).length
          : 0,
    },
  ];

  return (
    <div className="flex flex-row justify-between w-full">
      <div className=" flex flex-row">
        {cardData.map((i: cardDataInterface, idx: number) => (
          <div
            className="mr-3 p-3 flex flex-col bg-[#eef2f7] text-[#8690A0] hover:text-[#0669f8] w-40 border border-gray-300 rounded-2xl shadow-lg"
            key={idx}
          >
            <div className="text-center">{i?.cardTitle}</div>
            <div className={`text-center text-2xl font-bold`}>{i?.count}</div>
          </div>
        ))}
      </div>
      <div
        className="bg-[#eef2f7] text-[#8690A0] hover:text-[#0669f8] w-48 border border-gray-300 rounded-2xl shadow-lg flex-2 cursor-pointer"
        onClick={() => dispatch(setOpenModal(true))}
      >
        <center className="mt-3">
          <div className="pb-2">Create User</div>
          <span>
            {" "}
            <GrAdd className="font-extrabold text-2xl" />
          </span>
        </center>
      </div>
    </div>
  );
};

export default Cards;
