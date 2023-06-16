import React, { useState } from 'react';
import { deleteBlog } from '../redux/blogsSlice';
import { useDispatch } from 'react-redux';
import UpdateBlog from './UpdateBlog';

const BlogCard = ({ blog }) => {

    const dispatch = useDispatch();
    const [expandedBlogIds, setExpandedBlogIds] = useState([]);
    const [edit, setIsEdit] = useState(false);

    //delete single blog logic
    const handleDelete = (id) => {
        dispatch(deleteBlog(id));
    };

    //see more logic
    const isExpanded = (blogId) => expandedBlogIds.includes(blogId);
    const handleExpand = (blogId) => {
        setExpandedBlogIds((prevExpandedBlogIds) => [...prevExpandedBlogIds, blogId]);
    };

    const handleCollapse = (blogId) => {
        setExpandedBlogIds((prevExpandedBlogIds) =>
            prevExpandedBlogIds.filter((id) => id !== blogId)
        );
    };

    return (
        <div
            className='w-full p-4 my-3 border-solid border-2 border-white'
            key={blog.id}
        >
            <h1>{blog.id}</h1>
            <h3><i>{blog.title}</i></h3>
            {isExpanded(blog.id) ? (
                <div>
                    <p>{blog.body}</p>
                    <button
                        className="text-white-500 hover:underline"
                        onClick={() => handleCollapse(blog.id)}
                    >
                        Read Less
                    </button>
                </div>
            ) : (
                <div>
                    <p>{blog.body.substring(0, 100)}...</p>
                    <button
                        className="text-white-500 hover:underline"
                        onClick={() => handleExpand(blog.id)}
                    >
                        Read More
                    </button>
                </div>
            )}
            <button
                className='bg-white text-black border border-white p-1 hover:border-white hover:bg-black hover:text-white mr-2 mt-2 mb-2'
                onClick={() => setIsEdit(true)}
            >
                Edit
            </button>
            <button
                className='text-white bg-red-700 p-1 mr-2 mt-2  mb-2 border-white border'
                onClick={() => handleDelete(blog.id)}
            >
                Delete
            </button>
            {edit && <UpdateBlog blog={blog} setIsEdit={(e) => setIsEdit(e)} />}
        </div>
    );
};

export default BlogCard;
