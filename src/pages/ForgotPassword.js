import React from "react";
import useForm from "../hooks/useForm";
import { Link} from "react-router-dom";
import { forgotPass } from "../store/PostReq";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
    const dispatch = useDispatch();
  const {
    input: email,
    inputHandler: emailHandler,
    hasError: emailError,
    touchHandler: emailisTouchedHandler,
  } = useForm((value) => value.includes("@"));

  
  const submitHandler = (e) => {
      e.preventDefault();
      
  }

  return (
    <form onSubmit={submitHandler}>
      <label>
        <span>Enter your email here</span>
        <input type="email" value={email} onChange={emailHandler} onBlur={emailisTouchedHandler}/>
      </label>
      {emailError && <p className="error">Invalid email</p>}
      <Link to='/api/users/resetPassword/:token' className="btn" onClick={() => dispatch(forgotPass(email))}>
        Continue
      </Link>
    </form>
  );
};
export default ForgotPassword;
