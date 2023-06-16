import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createBlog } from '../redux/blogsSlice';
import { useDispatch } from 'react-redux';

const schema = Yup.object().shape({
    title: Yup.string().required('Title is required !'),
    body: Yup.string().required('Body is required !'),
});

const AddBlog = (props) => {

    //used basic implementation for react hook form and yup as asked in the interview (not in the pdf)
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    //create blog logic
    const onSubmit = (data) => {
        dispatch(createBlog(data));
        alert("Added successfully ! (you can check network tab as you might not be able to see it due to fetching and scroll logic)")
        reset();
        props.setIsAdd(false)
    };

    return (
        <div className='border-2 border-white w-full p-6 mt-2 mb-2'>
            <h2>Create Blog</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title:</label>
                    <input
                        className='focus:outline-none text-black p-1 w-full mb-2'
                        type="text" {...register('title')}
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        className='focus:outline-none text-black p-1 w-full mb-2'
                        {...register('body')}
                    />
                    {errors.body && <p>{errors.body.message}</p>}
                </div>
                <button
                    className='border border-white p-1 hover:bg-white hover:text-black mr-2 mt-2'
                    onClick={() => props.setIsAdd(false)}
                >
                    Cancel
                </button>
                <button
                    className='border border-white p-1 hover:bg-white hover:text-black mt-2'
                    type="submit"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default AddBlog;