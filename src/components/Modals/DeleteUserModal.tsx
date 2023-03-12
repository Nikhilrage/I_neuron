import React from "react";
import { dashboardCalls } from "../../api/fetchHelper";
import { constants } from "../../constants";
import {
  setLoading,
  setOpenDeleteUserModal,
  setOpenToast,
  setToastMessage,
} from "../../Redux/slices/dashboardStateSlice";
import { setAllUsers } from "../../Redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/store";

const DeleteUserModal = () => {
  const dispatch = useAppDispatch();

  const deleteApiVariableId = useAppSelector(
    ({ dashboardState }) => dashboardState.deleteApiVariableId
  );
  const activeUsers = useAppSelector(({ users }) => users.activeUsers);

  const deleteUser = async () => {
    try {
      dispatch(setOpenDeleteUserModal(false));
      dispatch(setLoading(true));
      const res = await dashboardCalls.deleteUser(deleteApiVariableId);
      if (res?.message === constants.userDeleted) {
        //storingDeletedUsers in local storage
        storingDeletedUsers();
        const removingUserFromActiveUsers = activeUsers.filter((i: any) => {
          return i._id !== deleteApiVariableId;
        });
        dispatch(setAllUsers(removingUserFromActiveUsers));
        dispatch(setToastMessage("User Deleted successfully"));
        dispatch(setOpenToast(true));
      } else {
        dispatch(setToastMessage(res?.message));
        dispatch(setOpenToast(true));
      }
    } catch (err) {
      dispatch(setToastMessage("Something went wrong in deleting the user"));
      dispatch(setOpenToast(true));
      console.log("err in deleting user", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const storingDeletedUsers = () => {
    const deletedUser = activeUsers.find((user: any) => {
      return user._id === deleteApiVariableId;
    });
    let allDeletedUsers = [];
    const getPreviousDeletedUsers: any = localStorage.getItem("deletedUsers");
    if (getPreviousDeletedUsers) {
      const tempData = JSON.parse(getPreviousDeletedUsers);
      allDeletedUsers = [...tempData, deletedUser];
    } else {
      allDeletedUsers = [deletedUser];
    }
    localStorage.setItem("deletedUsers", JSON.stringify(allDeletedUsers));
  };

  return (
    <div className="absolute top-0 left-0 z-[999] flex flex-row justify-center items-center bg-[rgba(0,0,0,0.6] h-screen w-screen">
      <div className="bg-[#fff] w-3/12 h-40 p-6 rounded-2xl">
        <center>
          <p>Are you sure you want to delete the user.</p>

          <div className="pt-9 flex flex-row items-center justify-between">
            <button
              className="float-left py-2 mr-4 px-3 bg-[#0669F8] text-[#fff] rounded-md"
              onClick={() => dispatch(setOpenDeleteUserModal(false))}
            >
              Cancel
            </button>
            <button
              className=" float-right py-2 px-3 bg-[#0669F8] text-[#fff] rounded-md"
              onClick={() => deleteUser()}
            >
              Confirm
            </button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default DeleteUserModal;
