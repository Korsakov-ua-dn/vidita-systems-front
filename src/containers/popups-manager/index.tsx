import React, { useEffect } from "react";
import { POPUPS } from "../../const";
import AlertPopup from "../../components/alert-popup";
import { useLocation } from "react-router-dom";
import { CommonPopupType, popupsActions } from "../../store/popups-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const popups = {
  [POPUPS.AlertPopup]: AlertPopup,
};

const PopupsManager = () => {
  const dispatch = useAppDispatch();
  const pathname = useLocation().pathname;

  const select = useAppSelector((state) => ({
    mountedPopups: state.popups.mountedPopups,
  }));
  
  useEffect(() => { dispatch(popupsActions.closeAll())}, [pathname, dispatch])

  return (
    <>
      {select.mountedPopups.map((mountedPopup: CommonPopupType) => {
        const Component = popups[mountedPopup.name];
        return <Component key={mountedPopup.name} {...mountedPopup} />;
      })}
    </>
  );
};

export default React.memo(PopupsManager);

// types
export type PopupsNameType = keyof typeof popups;
