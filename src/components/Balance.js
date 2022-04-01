import {  useSelector } from "react-redux";

const Balance = () => {
    const DateNow = Date.now();
    const todaysDate = new Date(DateNow)
      .toString()
      .split("GMT+0200 (Eastern European Standard Time)");
  
  const transactions = useSelector((state) => state.users.transactions);

    return  <div className="balance-container">
    <div className="date-container">
      <h3>Current balance</h3>
      <p>{todaysDate}</p>
    </div>
    <div className="money-container">
      <span className="money-container">
        {(transactions
          ? transactions.reduce((acc, cur) => acc + cur.deposits, 0) -
            transactions.reduce((acc, cur) => acc + cur.withdraws, 0)
          : 0
        ).toFixed(2)}
        $
      </span>
    </div>
  </div>
}
export default Balance;