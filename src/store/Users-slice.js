import { createSlice } from "@reduxjs/toolkit";



const UserSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        balance: 0,
        movements:[],
        transactions: [],
        time:[],
        isSubMenuOpen:false,
        resetPass:false,
    },
    reducers: {
        setUsers(state,action){
            state.users = action.payload;

        },
        setMovements(state,action){
            state.movements = action.payload;
        },
        setTransactions(state,action){
            state.transactions = action.payload
        },
        setTime(state,action){
            state.time = [...state.time,action.payload]
        },
        submenu(state){
            state.isSubMenuOpen = true;
        },
        submenuOut(state){
            state.isSubMenuOpen = false;
        },
        openResetPassword(state){
            state.resetPass = true;
        },
        closeResetPassword(state){
            state.resetPass = false;
        }
    }
})
export const UserSliceActions = UserSlice.actions;
export default UserSlice;