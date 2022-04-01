import { useSelector } from "react-redux";
import "./DepositList.css";


const DepositItem = () => {

    const transactions = useSelector((state) => state.users.transactions);

    return <div>
    {transactions &&
       transactions.map(mov => {
        return  <div key={mov._id} className={`${mov.deposits > 0 ? "mov-container" : "withdraw"}`}>
            {mov.time && <span>{mov.time}</span>}
            {mov.deposits > 0 && <span>Deposit {mov.deposits}$</span>}
            {mov.withdraws > 0 && <span >Withdraw {mov.withdraws}$</span>}
          </div>
        
      })}
  </div>
}
export default DepositItem;