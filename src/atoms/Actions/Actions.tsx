import React from "react";
import { FiEdit2, FiCopy } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  setOpenDeleteUserModal,
  setOpenModal,
  setOpenToast,
  setSeleteApiVariableId,
  setToastMessage,
} from "../../Redux/slices/dashboardStateSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { copyTextToClipboard } from "../../utils/copyFunction";
import { setUserIdToBeEdited } from "../../Redux/slices/userSlice";

interface ActionsProps {
  textToBeCopied: string;
  id: string;
}
const Actions = (props: ActionsProps) => {
  const dispatch = useAppDispatch();

  const activeTab = useAppSelector(
    ({ dashboardState }) => dashboardState.activeTab
  );

  const copyTextHandler = () => {
    copyTextToClipboard(props.textToBeCopied);
    dispatch(setOpenToast(true));
    dispatch(setToastMessage("User id copied"));
  };
  return (
    <div className="flex flex-row justify-around ">
      <div className="tab_Actions_Icons" onClick={copyTextHandler}>
        <FiCopy className="text-xl " />
      </div>
      {activeTab !== 1 && (
        <>
          <div
            className="tab_Actions_Icons "
            onClick={() => {
              dispatch(setUserIdToBeEdited(props?.id));
              dispatch(setOpenModal(true));
            }}
          >
            <FiEdit2 className="text-xl" />
          </div>
          <div
            className="tab_Actions_Icons"
            onClick={() => {
              dispatch(setSeleteApiVariableId(props.id));
              dispatch(setOpenDeleteUserModal(true));
            }}
          >
            <AiOutlineDelete className="text-xl" />
          </div>
        </>
      )}
    </div>
  );
};

export default Actions;
