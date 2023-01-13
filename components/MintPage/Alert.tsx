import React from "react";

const Alert = () => {
  const [showAlert, setShowAlert] = React.useState(true);
  return (
    <>
      {showAlert ? (
        <div
          className="text-slate-800 mt-28 text-sm px-6 py-4 border-0 relative rounded-xl bg-violet-100"
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell text-violet-600" />
          </span>
          <span className="inline-block align-middle mr-8">
            <b className="capitalize">Hoya!</b> Glad to have you here, start now with 5 free credits or just 0.2$/image generation, minting costs are on us!
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span className="text-violet-600">×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Alert;