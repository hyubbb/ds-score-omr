"use client";
import { Alert } from "./Alert/Alert";
import Loading from "./Loading/Loading";
import { Modal } from "./Modal/Modal";
import RecoilLoadingSpinner from "./Spinner/RecoilLoadingSpinner";

export const PopupComponent = () => {
  return (
    <div>
      <Modal />
      <Alert />
      <RecoilLoadingSpinner />
    </div>
  );
};
