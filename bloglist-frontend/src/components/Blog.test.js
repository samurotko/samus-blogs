import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('blogtest', () => {
    let component

    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 69,
        user: 'samu',
        id: '163764387402'
      }

      const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
        <Blog key={blog.id} blog={blog}
        blogs={blog} setBlogs={mockHandler} /> 
    )
  })


test('renders content', () => {

  const div = component.container.querySelector('.blog')
  expect(div).toHaveStyle('display: none')

})

test('show all', () => {

    const button = component.getByText('view')
    fireEvent.click(button)
  
    const div = component.container.querySelector('.blog')
    
    expect(div).not.toHaveStyle('display: none')
})



})

