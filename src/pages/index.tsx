import React from "react";
import { Routes, Route } from "react-router-dom";
import PopupsManager from "../containers/popups-manager";
import Main from "./main";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
      </Routes>

      <PopupsManager />
    </>
  );
};

export default React.memo(App);
