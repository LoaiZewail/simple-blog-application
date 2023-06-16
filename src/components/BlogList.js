import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/blogsSlice';
import BlogCard from './BlogCard';
import AddBlog from './AddBlog';
import styled from 'styled-components';

//example on styled components
const StyledButton = styled.button`
background-color: white;
color: black;
border: 1px solid white;
padding: 5px;
margin-bottom:10px;

&:hover {
  border: 1px solid white;
  background-color: black;
  color: white;
}
`;

const BlogList = () => {

    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.data);
    const status = useSelector((state) => state.blogs.status);
    const error = useSelector((state) => state.blogs.error);

    const [limit, setLimit] = useState(10);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [add, setIsAdd] = useState(false);

    //fetch blogs list
    useEffect(() => {
        if (limit <= 100) {
            dispatch(fetchBlogs({ _limit: limit }));
        }
    }, [dispatch, limit]);

    //scroll logic to fetch 10 blogs on scroll and max 100
    useEffect(() => {
        window?.addEventListener('scroll', handleScroll);
        return () => {
            window?.removeEventListener('scroll', handleScroll);
        };
    }, [limit, isLoadingMore]);

    const handleScroll = () => {
        let userScrollHeight = window.innerHeight + window.scrollY;
        let windowBottomHeight = document.documentElement.scrollHeight;
        if (userScrollHeight >= windowBottomHeight - 10 && limit < 100 && !isLoadingMore) {
            setIsLoadingMore(true);
            setLimit(limit + 10);
        }
    };

    useEffect(() => {
        setIsLoadingMore(false);
    }, [blogs]);

    //search and filter logic
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBlogs = blogs.filter((blog) => {
        const { title = '', author = '' } = blog;
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            title.toLowerCase().includes(searchTermLowerCase) ||
            author.toLowerCase().includes(searchTermLowerCase)
        );
    });

    if (status === 'loading' && limit <= 10) {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='m-8'>
            <h2 className='text-2xl text-center font-semibold my-5'>Simple blog application</h2>

            <StyledButton><div onClick={() => setIsAdd(true)}>Add blog</div></StyledButton>
            {add && <AddBlog setIsAdd={(e) => setIsAdd(e)} />}

            <div className='block w-full'>
                <h1>Search :</h1>
                <input
                    className='focus:outline-none text-black p-1 w-full mb-2'
                    type="text"
                    placeholder="Search by title or body ..."
                    onChange={handleSearch}
                />
            </div>

            {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
            ))}

            {filteredBlogs.length === 0 && <div>No results found !</div>}
            {isLoadingMore && <div>Loading more posts...</div>}
        </div>
    );
};

export default BlogList;