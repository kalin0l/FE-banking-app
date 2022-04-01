import { useDispatch, useSelector } from "react-redux";
import { createMov } from "../store/PostReq";
import { useState } from "react";


const TransferContainer = ({timeOfMov}) => {
    const dispatch = useDispatch();

    

    const user = useSelector((state) => state.form.user);  

  const [withdraw, setWithdraw] = useState(0);

  const withdrawHandler = (e) => {
    e.preventDefault();

    dispatch(createMov(0, timeOfMov, withdraw, user._id));
  };
   
    return <div className="transfer-container">
    <h4>Withdraw</h4>
    <form onSubmit={withdrawHandler}>
      <input
        className="transfer-input"
        type="number"
        value={withdraw}
        onChange={(e) => setWithdraw(e.target.value)}
      />
      <button type="submit" onClick={withdrawHandler}>
        →
      </button>
      <div className="transfer">
        <span>Amount</span>
      </div>
    </form>
  </div>
}

export default TransferContainer;