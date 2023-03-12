import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-0 z-[999] flex items-center justify-center h-screen w-screen bg-[rgba(0,0,0,0.8)]">
      <div className="inline-block h-8 w-8 animate-spin border-2 border-slate-300 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_7.5s_linear_infinite] bg-[#fff] p-6" />
    </div>
  );
};

export default Loader;
