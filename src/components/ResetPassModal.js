import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { UserSliceActions } from "../store/Users-slice";
import { updatePass } from "../store/PostReq";
import useForm from "../hooks/useForm";
import { useState } from "react";

const ResetPasswordModal = () => {
  const password = useSelector((state) => state.form.password);
  const token = useSelector((state) => state.form.token);

  

  const {
    input: currentPassword,
    inputHandler: curPassHandler,
    hasError: curPassError,
    touchHandler: currPassTouchHandler,
    isValid: currentPasswordIsValid,
  } = useForm((value) => value.trim() === password);
  const {
    input: newPass,
    inputHandler: newPassHandler,
    hasError: newPassError,
    touchHandler: newPassTouchHandler,
    isValid: newPassIsValid,
  } = useForm((value) => value.length > 5);
  const {
    input: confirmNewPass,
    inputHandler: confirmNewPassHandler,
    hasError: confirmNewPassError,
    touchHandler: confirmNewPassTouchHandler,
    isValid: confirmNewPassdIsValid,
  } = useForm((value) => value.trim() === newPass);

  let formIsValid = false;
  if (currentPasswordIsValid && newPassIsValid && confirmNewPassdIsValid) {
    formIsValid = true;
  }
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();

  

  return (
    <section className="reset-password-container">
      <div>
        <button
          type="button"
          onClick={() => dispatch(UserSliceActions.closeResetPassword())}
        >
          X
        </button>
      </div>
      {formIsValid && (
        <article className="msg">
          <h1>Press submit to change your password!</h1>
        </article>
      )}
      <form onSubmit={submitHandler}>
        <label>
          <span>Old Password</span>
          <input
            type="password"
            onBlur={currPassTouchHandler}
            value={currentPassword}
            onChange={curPassHandler}
          />
        </label>
        {curPassError && <p className="error">Wrong pass</p>}
        <label>
          <span>New Password</span>
         <input
            type="password"
            value={newPass}
            disabled={curPassError}
            onBlur={newPassTouchHandler}
            onChange={newPassHandler}
          />
        </label>
        {newPassError && <p className="error">Wrong pass</p>}
        <label>
          <span>Confirm your new password</span>
          <input
            type="password"
            value={confirmNewPass}
            onBlur={confirmNewPassTouchHandler}
            onChange={confirmNewPassHandler}
          />
        </label>
        {confirmNewPassError && <p className="error">Wrong pass</p>}
        <section className="form-btn-container">
          <button
            type="submit"
            onClick={() =>
              dispatch(
                updatePass(token, currentPassword, newPass, confirmNewPass)
              )
            }
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => dispatch(UserSliceActions.closeResetPassword())}
          >
            Cancel
          </button>
        </section>
      </form>
    </section>
  );
};

export default ResetPasswordModal;
