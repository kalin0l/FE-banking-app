import React from "react";
import { useSelector } from "react-redux";
import DepositItem from "./DepositItem";
import "./DepositList.css";

const DepositList = () => {
  const loading = useSelector((state) => state.form.loading);

  if (loading) {
    return <div className="loading"></div>;
  }

  return <DepositItem />;
};

export default DepositList;
