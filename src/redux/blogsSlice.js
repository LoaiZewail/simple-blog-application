import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//NOTE : I didn't find blogs so I used posts endpoint and did all the required CRUD

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (params) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', { params });
    return response.data;
});

export const createBlog = createAsyncThunk('blogs/createBlog', async (blog) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', blog);
    return response.data;
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async (blog) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${blog.id}`, blog);
    return response.data;
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return id;
});

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                const index = state.data.findIndex((blog) => blog.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.data = state.data.filter((blog) => blog.id !== action.payload);
            });
    },
});

export default blogsSlice.reducer;
