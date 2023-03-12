import React, { useEffect, useState } from "react";
import { dashboardCalls } from "../../api/fetchHelper";
import { constants } from "../../constants";
import {
  setLoading,
  setOpenModal,
  setOpenToast,
  setToastMessage,
  setOpenDeleteUserModal,
} from "../../Redux/slices/dashboardStateSlice";
import { setAllUsers, setUserIdToBeEdited } from "../../Redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/store";

interface activeUsersInterface {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  age: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
const AddUserModal = () => {
  const dispatch = useAppDispatch();

  const activeUsers = useAppSelector(({ users }) => users.activeUsers);

  const userIdToBeEdited = useAppSelector(
    ({ users }) => users.userIdToBeEdited
  );

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [age, setAge] = useState<number | string>();
  const [firstNameinputErrorMsg, setFirstNameInputErrorMsg] =
    useState<string>("");
  const [lastNameinputErrorMsg, setLastNameInputErrorMsg] =
    useState<string>("");
  const [numberErrorMsg, setNumberErrorMsg] = useState<string>("");
  const [ageErrorMsg, setAgeErrorMsg] = useState<string>("");

  useEffect(() => {
    // useful for showing errors in form
    firstName.length > 0 && firstName.length < 2
      ? setFirstNameInputErrorMsg("First name must be at least 2 characters")
      : setFirstNameInputErrorMsg("");
    lastName.length > 0 && lastName.length < 2
      ? setLastNameInputErrorMsg("Last name must be at least 2 characters")
      : setLastNameInputErrorMsg("");
    phoneNumber.length > 0 && phoneNumber.length !== 10
      ? setNumberErrorMsg("Number should be 10 digits")
      : setNumberErrorMsg("");
  }, [firstName, lastName, phoneNumber, age]);

  useEffect(() => {
    // for setting form values when user is editing the data
    if (userIdToBeEdited.length > 0 && activeUsers) {
      const getUserDetailsTobeEdited: any = activeUsers.find(
        (user: activeUsersInterface) => {
          return user._id === userIdToBeEdited;
        }
      );
      setFirstName(getUserDetailsTobeEdited?.firstName);
      setLastName(getUserDetailsTobeEdited?.lastName);
      setPhoneNumber(getUserDetailsTobeEdited?.phoneNumber);
      setAge(getUserDetailsTobeEdited?.age);
    }
  }, [userIdToBeEdited, activeUsers]);

  const createUser = async () => {
    try {
      dispatch(setOpenModal(false));
      dispatch(setLoading(true));
      const payload = { firstName, lastName, phoneNumber, age };
      const res = await dashboardCalls.createUser(payload);
      if (res.message === constants.UserCreated) {
        const activeUsersCopy = activeUsers;
        dispatch(setAllUsers([...activeUsersCopy, res.data]));
        dispatch(setToastMessage("User created successfully"));
        dispatch(setOpenToast(true));
      } else {
        dispatch(setToastMessage("Something went wrong in creating user"));
        dispatch(setOpenToast(true));
      }
    } catch (err) {
      dispatch(setToastMessage("Something went wrong in creating user"));
      dispatch(setOpenToast(true));
      console.log("err in creating user: ", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const editUser = async () => {
    try {
      dispatch(setLoading(true));
      // this is use for closing the modal and clearing the userId which is in redux
      clearReduxValue();
      const payload = { firstName, lastName, phoneNumber, age };
      const res = await dashboardCalls.editUser(payload, userIdToBeEdited);
      if (res.message === constants.userEditedSuccessfuly) {
        // When user is edited making API call and updating the active users data in redux
        const activeUsersCopy = activeUsers;
        const updatedUserData = activeUsersCopy.map(
          (user: any, index: number) => {
            return user._id === res.data._id ? (index = res.data) : user;
          }
        );
        dispatch(setAllUsers(updatedUserData));
        //opening toast message as user updating is successful
        dispatch(setOpenToast(true));
        dispatch(setToastMessage("User edited Successfully"));
      } else {
        dispatch(setOpenToast(true));
        dispatch(
          setToastMessage("Something went wrong in editing the user details")
        );
      }
    } catch (err) {
      console.log("err in editing user: ", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearReduxValue = () => {
    dispatch(setOpenModal(false));
    dispatch(setUserIdToBeEdited(""));
  };

  const btnDisabledHandler = () => {
    if (
      (age && (age < 18 || age === 0)) ||
      firstName.length < 2 ||
      lastName.length < 2 ||
      phoneNumber.length !== 10 ||
      !age
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="absolute top-0 z-[999] w-full h-full bg-[rgba(0,0,0,0.8)] flex justify-center">
      <div className="bg-[#fff] rounded-lg pt-2 pb-6 mt-9 w-80 h-fit">
        <center className="py-3 border-b border-slate-300 divide-x-4">
          <h2 className="text-lg font-medium text-[#8690a0]">{`${
            userIdToBeEdited?.length > 0 ? "Edit" : "Add"
          } User`}</h2>
        </center>
        <div>
          <form
            action=""
            onSubmit={(e) => e.preventDefault()}
            className="px-3 pt-3"
          >
            <div className="input">
              <label>
                First Name <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                required
                minLength={4}
                maxLength={15}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <span>
                <p className="text-[red] text-[9px]">
                  {firstNameinputErrorMsg}
                </p>
              </span>
            </div>
            <div className="input">
              <label>
                Last Name <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                minLength={4}
                maxLength={15}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <span>
                <p className="text-[red] text-[9px]">{lastNameinputErrorMsg}</p>
              </span>
            </div>
            <div className="input">
              <label>
                Phone Number <span className="text-[red]">*</span>
              </label>
              <input
                type="tel"
                placeholder="Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                min={10}
                maxLength={10}
              />
              <span>
                <p className="text-[red] text-[9px]">{numberErrorMsg}</p>
              </span>
            </div>
            <div className="input ">
              <label>
                Age <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                placeholder="Your Age"
                name="age"
                value={age && age}
                onChange={(e) => {
                  if (
                    e.target.value.charAt(0) === "0" ||
                    isNaN(Number(e.target.value)) ||
                    (Number(e.target.value) < 18 && Number(e.target.value) > 70)
                  ) {
                    setAgeErrorMsg(
                      "Please enter a valid age. Age should be between 18 to 70"
                    );
                    setAge("");
                  } else {
                    setAgeErrorMsg("");

                    setAge(Number(e.target.value));
                  }
                }}
                maxLength={2}
              />
              <span>
                <p className="text-[red] text-[9px]">{ageErrorMsg}</p>
              </span>
            </div>
            <hr className="mt-5" />
            <div className="pt-3 flex flex-row justify-between items-center">
              <button
                className="py-2 w-32 bg-[#0669F8] text-[#fff] rounded-md"
                onClick={() => {
                  userIdToBeEdited.length > 0
                    ? clearReduxValue()
                    : dispatch(setOpenModal(false));
                }}
              >
                Cancel
              </button>
              <button
                disabled={btnDisabledHandler()}
                className={`py-2 w-32 bg-[#0669F8] text-[#fff] rounded-md ${
                  btnDisabledHandler() && "opacity-30"
                }`}
                onClick={userIdToBeEdited.length > 0 ? editUser : createUser}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
