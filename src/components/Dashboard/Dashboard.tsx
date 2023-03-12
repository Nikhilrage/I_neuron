import React, { useEffect } from "react";
import { dashboardCalls } from "../../api/fetchHelper";
import UserTable from "../UserTable/UserTable";
import Cards from "./Cards";
import { useDispatch } from "react-redux";
import { constants } from "../../constants";
import { setAllUsers } from "../../Redux/slices/userSlice";
import {
  setLoading,
  setOpenToast,
  setToastMessage,
} from "../../Redux/slices/dashboardStateSlice";

interface getusersResDatainterface {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  age: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
interface getusersInterface {
  message: string;
  data: getusersResDatainterface[];
}

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, []);

  //Getting All Users from DB
  const getUsers = async () => {
    try {
      dispatch(setLoading(true));
      const res: getusersInterface = await dashboardCalls.getAllUsers();
      if (res.message === constants.getAllusersSuccess) {
        dispatch(setAllUsers(res?.data));
      } else {
        dispatch(setToastMessage("Something went wrong in fetching users"));
        dispatch(setOpenToast(true));
      }
    } catch (err) {
      dispatch(setToastMessage("Something went wrong in fetching users"));
      dispatch(setOpenToast(true));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="p-5 flex flex-col ">
        <Cards />
        <span className="my-4 mb-9 border-b border-slate-400" />
        <UserTable />
      </div>
    </>
  );
};

export default Dashboard;
