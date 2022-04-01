import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUsers } from "../store/PostReq";
import { FormActions } from "../store/Form-slice";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  
  const {
    input: mail,
    inputHandler: emailHandler,
    hasError: emailError,
    touchHandler: emailisTouchedHandler,
    isValid: emailIsValid,
  } = useForm((value) => value.includes("@"));
  const {
    input: pass,
    inputHandler: passHandler,
    hasError: passError,
    touchHandler: passisTouchedHandler,
    isValid: passIsValid,
  } = useForm((value) => value !== "" && value.length >= 6);
  
  // const [mail,setEmail] = useState('')
  // const [pass,setPassword] = useState('')
  
  const email = useSelector((state) => state.form.email);
  const password = useSelector((state) => state.form.password);
  const error = useSelector((state) => state.form.error);
  const loading = useSelector((state) => state.form.loading);

  const setInputData = () => {
    dispatch(FormActions.setEmail(mail));
    dispatch(FormActions.setPassword(pass));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let formIsValid = false;
    if (emailIsValid && passIsValid) {
      formIsValid = true;
    }
    if(formIsValid) {
      dispatch(loginUsers(email, password));
      history("/api/users");

    }

  };
  return (
    <form onSubmit={submitHandler}>
      <label>
        <span>Email</span>
        <input
          className={`${emailError ? "invalid" : ""}`}
          onBlur={emailisTouchedHandler}
          type="email"
          value={mail}
          onChange={emailHandler}
        />
        {emailError && <p className="error">Emails is not valid</p>}
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          onBlur={passisTouchedHandler}
          className={`${passError ?  "invalid" : ""}`}
          value={pass}
          onChange={passHandler}
        />
        <Link to='/api/users/forgotPassword' className="forgot-pw">Forgot your password?</Link>
        {passError && <p className="error">Wrong password!</p>}
      </label>
      {error && <p className="error">{error}</p>}
      {loading && <button className="btn">Loading...</button>}
      
        {!loading && <button onClick={setInputData} className="btn" type="submit">
          Login
        </button>}
      
    </form>
  );
};
export default LoginPage;
