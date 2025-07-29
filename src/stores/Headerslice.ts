import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";


interface DateFilterState {
  dateFilter:any;
  filterValue:any
}

const initialState: DateFilterState = {
    dateFilter:'today',
    filterValue:[]
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setFilterdate: (state, action:PayloadAction<{ filtertype:any }>) => {
      state.filterValue = action.payload.filtertype;
    },
    setDatetype: (state, action:PayloadAction<{ date:any }>) => {
      state.dateFilter = action.payload.date;
    }
  },
});

export const { setFilterdate,setDatetype  } = headerSlice.actions;
export const headerReducer: Reducer<typeof initialState> = headerSlice.reducer;