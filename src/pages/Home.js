import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DepositList from "../components/DepositList";
import "./Home.css";
import { getAllMovements, getUsers } from "../store/PostReq";
import { UserSliceActions } from "../store/Users-slice";
import ResetPasswordModal from "../components/ResetPassModal";
import Balance from "../components/Balance";
import DepositContainer from "../components/DepositContainer";
import TransferContainer from "../components/TransferContainer";
import Details from "../components/Details";
import AllUsers from "../components/AllUsers";

const Home = () => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const hour = now.getHours();
  const min = now.getMinutes();
  const timeOfMov = `${day}/${month}/${year} ${hour}:${min}`;

  const user = useSelector((state) => state.form.user);
  const movements = useSelector((state) => state.users.movements);
  const openResetPassword = useSelector((state) => state.users.resetPass);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user._id) {
      dispatch(getAllMovements(user._id));
    }

    dispatch(getUsers());
  }, [dispatch, user, movements]);

  return (
    <React.Fragment>
      {openResetPassword && <ResetPasswordModal />}
      <section
        className="section"
        onMouseOver={() => dispatch(UserSliceActions.submenuOut())}
      >
        <Balance />
        <DepositContainer timeOfMov={timeOfMov} />
        <TransferContainer timeOfMov={timeOfMov} />

        <section className="transaction-section">
          <DepositList />
        </section>
        <Details />
        <AllUsers />
      </section>
    </React.Fragment>
  );
};
export default Home;
