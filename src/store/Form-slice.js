import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "form",
  initialState: {
    isLogin: false,
    isReg: false,
    error: "",
    loading: false,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    token: null,
    user: null,
  },
  reducers: {
    setUsername(state, action) {
      console.log(action.payload);
      state.username = action.payload;
    },
    setEmail(state, action) {
      console.log(action.payload);
      state.email = action.payload;
    },
    setPassword(state, action) {
      console.log(action.payload);
      state.password = action.payload;
    },
    setConfirmPassword(state, action) {
      console.log(action.payload);
      state.confirmPassword = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
    register(state, action) {
      state.token = action.payload;

      if (state.token) {
        state.isReg = true;
      }
    },
    login(state, action) {
      state.token = action.payload;
      console.log(state.token);
      if (state.token) {
        state.isLogin = true;
      }
      
    },
    setUser(state, action) {
      state.user = action.payload;
      console.log(state.user);
    },
    logout(state){
      state.user = null;
      state.token = null;
      console.log(state.user,state.token);
    },
    resetPass(state,action){
      state.token = action.payload
    }
  },
});

export const FormActions = FormSlice.actions;
export default FormSlice;
