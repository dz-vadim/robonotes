// import axios from "axios";
// import {IUser} from "../../models/IUser";
// import {createAsyncThunk} from "@reduxjs/toolkit";
//
// export const fetchUsers = createAsyncThunk(
//     'user/fetchAll',
//     async (_ , thunkAPI) => {
//         try {
//             const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
//             return response.data;
//         } catch (e) {
//             const errorMassage = (e instanceof Error)? e.message : "Unexpected error occurred";
//             return thunkAPI.rejectWithValue(errorMassage);
//         }
//     }
// )
export const fetchUsers = ''