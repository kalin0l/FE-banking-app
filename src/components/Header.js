import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormActions } from "../store/Form-slice";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { UserSliceActions } from "../store/Users-slice";

const Header = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const isSubMenuOpen = useSelector(state => state.users.isSubMenuOpen);
  const user = useSelector((state) => state.form.user);


  const displayMyAccount = () => {
     dispatch(UserSliceActions.submenu());
  }

  const logout = () => {
    dispatch(FormActions.logout());

    history("api/users/");
  };

  return (
    <React.Fragment>
      <header>
        <h1> Banking - App </h1>
        {!user ? (
          <div>
            <Link to="api/users/login" className="header-btn">
              Login
            </Link>
            <Link to="api/users/registration" className="header-btn">
              Sign up!
            </Link>
          </div>
        ) : (
          <div className="login-container">
            
            {user ? <h2> Hello and welcome!{user.name} </h2> : null}
            <button className="btn-icons" onMouseOver={displayMyAccount}>
              <BsFillPersonFill />
              <FiLogOut className="logout-icon" />
            </button>
          </div>
        )}
      </header>
      {user && <div className={`${
            isSubMenuOpen ? "drop-down-container show" : "drop-down-container"
          }`} >
        <div className="drop-down-btns" >
          <button onClick={() => dispatch(UserSliceActions.openResetPassword())}>Change Password </button>
          <button onClick={logout}>Logout </button>
        </div>
      </div>}
    </React.Fragment>
  );
};
export default Header;
