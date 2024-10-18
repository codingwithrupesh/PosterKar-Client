import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'

export const fetchCategories = createAsyncThunk('api/categories',async()=>{
    try {
        const respons = await axiosClient.get('/categories?populate=Image');
        return respons?.data?.data; // this respons will return  in action.payload after fullfilled this funcion
    } catch (error) {
        console.log("category Slice error", error);
        return Promise.reject(error);
    }
})


const categorySlice = createSlice({
    name: 'categorySlice',
    initialState:{
        categories:[]
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled,(state, action)=>{
       state.categories = action.payload;
        });

    },
})

export default categorySlice.reducer 