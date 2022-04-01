import React from "react";
import useForm from "../hooks/useForm";
import {  Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/PostReq";

const ResetPassword = () => {
    
    
    const dispatch = useDispatch();
    const token = useSelector(state => state.form.token)
  const {
    input: password,
    inputHandler: passHandler,
    hasError: passError,
    touchHandler: passTouchHandler,
    isValid: passIsValid,
  } = useForm((value) => value.length > 6);
  const {
    input: confirmPass,
    inputHandler: confirmPassHandler,
    hasError: confirmPassError,
    touchHandler: confirmPassTouchHandler,
    isValid: confirmPassIsValid,
  } = useForm((value) => value.trim() === password);

  const submitHandler = (e) => {
      e.preventDefault();
  }

  return <form onSubmit={submitHandler}>
      <label>
          <span>Enter your new password</span>
          <input type='password' value={password} onBlur={passTouchHandler} onChange={passHandler}/>
      </label>
      <label>
          <span>Confirm your new password</span>
          <input type='password' value={confirmPass} onBlur={confirmPassTouchHandler} onChange={confirmPassHandler}/>
      </label>
      <Link to='/api/users/' className="btn" onClick={() => dispatch(resetPassword(token,password,confirmPass))}>Reset</Link>
  </form>
};
export default ResetPassword;
