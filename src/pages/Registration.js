import React from "react";
import "./Registration.css";
import { useDispatch, useSelector } from "react-redux";
import { FormActions } from "../store/Form-slice";
import { useNavigate } from "react-router-dom";
import { registerUsers } from "../store/PostReq";
import useForm from "../hooks/useForm";

const Registration = () => {
  const history = useNavigate();

  // const [name,setName] = useState('')
  // const [mail,setEmail] = useState('')
  // const [pass,setPassword] = useState('')
  // const [confirmPass,setConfirmPassword] = useState('')

  const {
    input: name,
    hasError: nameHasError,
    isValid: nameIsValid,
    inputHandler: nameHandler,
    touchHandler: nameIsTouchedHandler,
  } = useForm((value) => value.trim() !== "");
  const {
    input: mail,
    hasError: mailHasError,
    isValid: mailIsValid,
    inputHandler: mailHandler,
    touchHandler: mailIsTouchedHandler,
  } = useForm((value) => value.trim().includes("@"));
  const {
    input: pass,
    hasError: passHasError,
    isValid: passIsValid,
    inputHandler: passHandler,
    touchHandler: passIsTouchedHandler,
  } = useForm((value) => value.trim() !== "" && value.length >= 6);
  const {
    input: confirmPass,
    hasError: confirmPassHasError,
    isValid: confirmPassIsValid,
    inputHandler: confirmPassHandler,
    touchHandler: confirmPassIsTouchedHandler,
  } = useForm((value) => value.trim() === pass);

  const dispatch = useDispatch();
  const username = useSelector((state) => state.form.username);
  const email = useSelector((state) => state.form.email);
  const password = useSelector((state) => state.form.password);
  const confirmPassword = useSelector((state) => state.form.confirmPassword);
  const error = useSelector((state) => state.form.error);
  const loading = useSelector((state) => state.form.loading);

  const setInputData = () => {
    dispatch(FormActions.setUsername(name));
    dispatch(FormActions.setEmail(mail));
    dispatch(FormActions.setPassword(pass));
    dispatch(FormActions.setConfirmPassword(confirmPass));
  };
  const submitHandler = (e) => {
    e.preventDefault();

    let formIsValid;
    if (nameIsValid && mailIsValid && passIsValid && confirmPassIsValid) {
      formIsValid = true;
    }
    if (formIsValid) {
      dispatch(registerUsers(username, email, password, confirmPassword));
      history('/api/users');

    }
  };
  return (
    <form onSubmit={submitHandler}>
      <label>
        <span>Username</span>
        <input
          type="text"
          value={name}
          onBlur={nameIsTouchedHandler}
          onChange={nameHandler}
          className={`${nameHasError ?  "invalid" : ""}`}
        />
        {nameHasError && <p className="error">Username is not valid</p>}
      </label>
      <label>
        <span>Email</span>
        <input
          type="email"
          value={mail}
          onBlur={mailIsTouchedHandler}
          onChange={mailHandler}
          className={`${mailHasError ? "invalid" : ""}`}
        />
        {mailHasError && <p className="error">Email is not valid</p>}
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={pass}
          onBlur={passIsTouchedHandler}
          onChange={passHandler}
          className={`${passHasError ?  "invalid" : ""}`}
        />
        {passHasError && <p className="error">Password is not valid</p>}
      </label>
      <label>
        <span>Confirm password</span>
        <input
          type="password"
          value={confirmPass}
          onBlur={confirmPassIsTouchedHandler}
          onChange={confirmPassHandler}
          className={`${confirmPassHasError ?  "invalid" : ""}`}
        />
        {confirmPassHasError && (
          <p className="error">Passwords are not the same</p>
        )}
      </label>
      {error && <p className="error">Registration failed</p>}
      {loading && <button className="btn">Loading...</button>}
        {!loading && <button onClick={setInputData} className="btn">
          Sign up
        </button>}
    </form>
  );
};

export default Registration;
