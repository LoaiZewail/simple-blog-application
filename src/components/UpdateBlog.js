import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlog } from '../redux/blogsSlice';

const UpdateBlog = (props) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState(props.blog.title);
    const [body, setBody] = useState(props.blog.body);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    //update blog logic
    const handleSaveClick = () => {
        const updatedBlog = {
            ...props.blog,
            title,
            body,
        };
        dispatch(updateBlog(updatedBlog));
        alert("Updated successfully !")
        props.setIsEdit(false)
    };

    return (
        <div className='border-2 border-white w-full p-6 mt-2 mb-2'>
            <input
                className='focus:outline-none text-black p-1 w-full mb-2'
                type="text"
                value={title}
                onChange={handleTitleChange}
            />
            <textarea
                className='focus:outline-none text-black p-1 w-full mb-2'
                value={body}
                onChange={handleBodyChange}
            />
            <button
                className='border border-white p-1 hover:bg-white hover:text-black mr-2'
                onClick={() => props.setIsEdit(false)}
            >
                Cancel
            </button>
            <button
                className='border border-white p-1 hover:bg-white hover:text-black'
                onClick={handleSaveClick}
            >
                Save
            </button>
        </div>
    );
};


export default UpdateBlog;
