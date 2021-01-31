import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
  } from '@material-ui/core'
import Togglable from '../services/Togglable'
import AddBlog from '../services/addBlog'
import { initializeBlogs } from '../reducers/blogReducer'

const BlogList = ({ blogs }) => {
    const dispatch = useDispatch()
    console.log('bloglist blogs',blogs)
    return(
    <div>
        <h2>blogs</h2>
        <TableContainer component={Paper}>
            <Table>
            <TableBody>
            
                {blogs.map(blog =>
                <TableRow key = {blog.id}>
                    <TableCell>
                    <Link  to={`/blogs/${blog.id}`} onClick={() => dispatch(initializeBlogs())}>{blog.title}</Link>
                    </TableCell>
                </TableRow>
                )}
            
            </TableBody>
            </Table>
        </TableContainer>
        <h2>Create new</h2>
        <Togglable buttonLabel='new blog'>
            <AddBlog />
        </Togglable>
    </div>
  )
}

export default BlogList