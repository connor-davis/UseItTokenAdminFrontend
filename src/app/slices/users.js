import {createSlice} from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        }
    }
});

const {setUsers} = usersSlice.actions;

const selectUsers = (state) => state.usersReducer.users;

export {
    usersSlice,
    setUsers,
    selectUsers
}

export default usersSlice.reducer;