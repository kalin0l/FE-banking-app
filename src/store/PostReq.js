import { FormActions } from "./Form-slice";
import { UserSliceActions } from "./Users-slice";

export const registerUsers = (name, email, password, confirmPassword) => {
  return async (dispatch) => {
    try {
      dispatch(FormActions.setLoading());
      const res = await fetch("https://react-bank-app-mern.herokuapp.com/api/users/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      dispatch(FormActions.setLoading());
      dispatch(FormActions.register(data.token));
      dispatch(FormActions.setUser(data.user));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(FormActions.setError(err.message || "Something went wrong!"));

      dispatch(FormActions.setLoading());
    }
  };
};

export const loginUsers = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(FormActions.setLoading());
      const res = await fetch("https://react-bank-app-mern.herokuapp.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        throw new Error(data.message);
      }

      dispatch(FormActions.setLoading());
      dispatch(FormActions.login(data.token));
      dispatch(FormActions.setUser(data.user));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(FormActions.setLoading());
      dispatch(FormActions.setError(err.message || "Something went wrong!"));
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(FormActions.setLoading());
      const res = await fetch("https://react-bank-app-mern.herokuapp.com/api/users/");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      dispatch(UserSliceActions.setUsers(data.users));
      dispatch(FormActions.setLoading());
      return data;
    } catch (err) {
      console.log(err);
      dispatch(FormActions.setLoading());
    }
  };
};

export const getAllMovements = (id) => {
  return async (dispatch) => {
    try {
      dispatch(FormActions.setLoading());
      const res = await fetch(`https://react-bank-app-mern.herokuapp.com/api/users/${id}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      dispatch(FormActions.setLoading());
      dispatch(UserSliceActions.setTransactions(data.movements));
    } catch (err) {
      console.log(err);
      dispatch(FormActions.setLoading());
    }
  };
};

export const createMov = (mov = 0, time, withdraws = 0, id) => {
  return async (dispatch) => {
    try {
      dispatch(FormActions.setLoading());
      const res = await fetch("https://react-bank-app-mern.herokuapp.com/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deposits: mov,
          time,
          withdraws,
          creator: id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      dispatch(FormActions.setLoading());
      dispatch(UserSliceActions.setMovements(data.movement));
      return data;
    } catch (err) {
      dispatch(FormActions.setLoading());
      dispatch(
        FormActions.setError(err.message || "could not get the movements")
      );
    }
  };
};
export const forgotPass = (email) => {
  return async (dispatch) => {
    try {
      dispatch(FormActions.setLoading());
      const res = await fetch(
        "https://react-bank-app-mern.herokuapp.com/api/users/forgotPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message);
      }
      dispatch(FormActions.setLoading());
      dispatch(FormActions.resetPass(data.token));
    } catch (err) {
      dispatch(FormActions.setLoading());
      dispatch(
        FormActions.setError(err.message || "could not send the password")
      );
    }
  };
};
export const resetPassword = (token, pass, confirmPass) => {
  return async (dispatch) => {
    try {
      dispatch(FormActions.setLoading());
      const res = await fetch(
        `https://react-bank-app-mern.herokuapp.com/api/users/resetPassword/${token}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            password: pass,
            confirmPassword: confirmPass,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message);
      }
      dispatch(FormActions.setLoading());
      dispatch(FormActions.login(data.token));
      dispatch(FormActions.setUser(data.user));
    } catch (err) {
      dispatch(FormActions.setLoading());
      dispatch(
        FormActions.setError(err.message || "could not rest the password")
      );
    }
  };
};
export const updatePass = (token, currentPassword, password, newPassword) => {
  return async (dispatch) => {
    console.log(token);
    try {
      const res = await fetch(`https://react-bank-app-mern.herokuapp.com/api/users/`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json",Authorization: 'Bearer ' + token  },
        body: JSON.stringify({ passwordCurrent:currentPassword, password, confirmPassword:newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      dispatch(FormActions.setUser(data.user));
    } catch (err) {
      console.log(err);
    }
  };
};
