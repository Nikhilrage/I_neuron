import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  const showModal = useAppSelector(
    ({ dashboardState }) => dashboardState.openModal
  );
  const openDeleteUserModal = useAppSelector(
    ({ dashboardState }) => dashboardState.openDeleteUserModal
  );
  const openToast = useAppSelector(
    ({ dashboardState }) => dashboardState.openToast
  );
  const loading = useAppSelector(
    ({ dashboardState }) => dashboardState.loading
  );

  useEffect(() => {
    if (openToast) {
      setTimeout(() => {
        dispatch(setOpenToast(false));
        dispatch(setToastMessage(""));
      }, 5000);
    }
  }, [openToast]);

  return (
    <>
      <div className="flex h-full" style={{ height: "100vh" }}>
        <div
          className="sidebar_main bg-[#090B1A]"
          style={{ height: "100%", flexBasis: "20%" }}
        >
          <Sidebar />
        </div>
        <div className="main_content" style={{ flexBasis: "80%" }}>
          <center
            className="h-[70px] pt-5 bg-[#090B1A] text-[#8690A0]"
            style={{ fontSize: 24, fontWeight: 500 }}
          >
            Admin Dashboard
          </center>
          <div
            className="bg-[#F7F9FB] w-full"
            style={{
              borderTopLeftRadius: "20px",
              //width: "100%",
            }}
          >
            <Dashboard />
          </div>
        </div>
      </div>
      {showModal && <AddUserModal />}
      {openDeleteUserModal && <DeleteUserModal />}
      {openToast && <SnackBar />}
      {loading && <Loader />}
    </>
  );
}

export default App;
