import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";


interface DateFilterState {
  dateFilter:any;
  filterValue:any;
  viewType:any
}

const initialState: DateFilterState = {
    dateFilter:'today',
    filterValue:[],
    viewType:"corporate"
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setDatetype: (state, action:PayloadAction<{ filtertype:any }>) => {
      state.dateFilter = action.payload.filtertype;
    },
    setFilterdate: (state, action:PayloadAction<{ date:any }>) => {
      state.filterValue = action.payload.date;
    },
    setViewType: (state, action:PayloadAction<{ viewtype:any }>) => {
      state.viewType = action.payload.viewtype;
    }
  },
});

export const { setFilterdate,setDatetype,setViewType} = headerSlice.actions;
export const headerReducer: Reducer<typeof initialState> = headerSlice.reducer;

// import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// interface DateFilterState {
//   dateFilter: any;
//   filterValue: any;
// }

// const initialState: DateFilterState = {
//   dateFilter: 'today',
//   filterValue: []
// };

// const headerSlice = createSlice({
//   name: "header",
//   initialState,
//   reducers: {
//     setDatetype: (state, action: PayloadAction<{ filtertype: any }>) => {
//       state.dateFilter = action.payload.filtertype;
//     },
//     setFilterdate: (state, action: PayloadAction<{ date: any }>) => {
//       state.filterValue = action.payload.date;
//     }
//   },
// });

// // Persist config
// const persistConfig = {
//   key: 'header', // key for the localStorage
//   storage,
//   // You can also add whitelist/blacklist if you want to persist only specific parts of the state
//   // whitelist: ['dateFilter', 'filterValue']
// };

// // Create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, headerSlice.reducer);

// export const { setFilterdate, setDatetype } = headerSlice.actions;
// export const headerReducer: Reducer<typeof initialState> = persistedReducer;