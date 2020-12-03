import {createSlice} from "@reduxjs/toolkit";

const adminsSlice = createSlice({
    name: "admins",
    initialState: {
        admins: []
    },
    reducers: {
        setAdmins: (state, action) => {
            state.admins = action.payload;
        }
    }
});

let {setAdmins} = adminsSlice.actions;

let selectAdmins = (state) => state.adminsReducer.admins;

export {
    adminsSlice,
    setAdmins,
    selectAdmins
}