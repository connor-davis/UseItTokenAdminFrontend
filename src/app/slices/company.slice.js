import {createSlice} from "@reduxjs/toolkit";

const companiesSlice = createSlice({
    name: "companies",
    initialState: {
        companies: []
    },
    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload;
        }
    }
});

let {setCompanies} = companiesSlice.actions;

let selectCompanies = (state) => state.companiesReducer.companies;

export {
    companiesSlice,
    setCompanies,
    selectCompanies,
}