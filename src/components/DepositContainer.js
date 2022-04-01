import { useDispatch, useSelector } from "react-redux";
import { createMov } from "../store/PostReq";
import { UserSliceActions } from "../store/Users-slice";
import { useState } from "react";

const DepositContainer = ({timeOfMov}) => {
  

  const [movement, setMovement] = useState(0);

  const user = useSelector((state) => state.form.user);

  const dispatch = useDispatch();

  const depositHandler = (e) => {
    e.preventDefault();
    dispatch(UserSliceActions.setTime(timeOfMov));
    dispatch(createMov(movement, timeOfMov, 0, user._id));
  };

  return (
    <div className="deposit-container">
      <h4>Deposit</h4>
      <form onSubmit={depositHandler}>
        <input
          className="deposit-input"
          value={movement}
          onChange={(e) => setMovement(e.target.value)}
          type="number"
        />
        <button type="submit" onClick={depositHandler}>
          →
        </button>
        <span>Amount</span>
      </form>
    </div>
  );
};

export default DepositContainer;
