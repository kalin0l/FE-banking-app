import { useDispatch, useSelector } from "react-redux";
import { UserSliceActions } from "../store/Users-slice";
import { useState, useEffect } from "react";

const Details = () => {
  const dispatch = useDispatch();
  const sortHandler = (array) => {
    console.log(array);
    let newArr = [];
    for (let i = array.length - 1; i >= 0; i--) {
      newArr.push(array[i]);
    }
    dispatch(UserSliceActions.setTransactions(newArr));
  };
  const transactions = useSelector((state) => state.users.transactions);
  const [sum, setSum] = useState(0);
  const [totalWithdraws, setTotalWithdraws] = useState(0);

  useEffect(() => {
    const calculateDeposits = () => {
      let total = 0;
      for (let i = 0; i < transactions.length; i++) {
        total += transactions[i].deposits;
      }
      setSum(total);
    };
    calculateDeposits();
  }, [dispatch, transactions]);

  useEffect(() => {
    const calculateWithdraws = () => {
      let total = 0;
      for (let i = 0; i < transactions.length; i++) {
        total += transactions[i].withdraws;
      }
      setTotalWithdraws(total);
    };
    calculateWithdraws();
  }, [dispatch, transactions]);

  return (
    <section className="details">
      <div className="income">
        <span>In:</span>
        <span className="in">{sum.toFixed(2)}$</span>
      </div>
      <div className="out">
        <span>Out:</span>
        <span className="taken">{totalWithdraws.toFixed(2)}$</span>
      </div>
      <button type="button" onClick={() => sortHandler(transactions)}>
        ↑ Reverse
      </button>
    </section>
  );
};

export default Details;
