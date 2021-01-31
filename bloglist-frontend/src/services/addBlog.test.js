import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlog from './addBlog'

test('addBlog', () => {
  const setBlogs = jest.fn()
  const setNotification = jest.fn()

  const component = render(
    <AddBlog 
        blogs={[]} setBlogs={setBlogs}
        setNotification={setNotification}/> 
  )

  component.debug()

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { 
    target: { value: 'samun blogi' } 
  })
  fireEvent.change(author, { 
    target: { value: 'samu' } 
  })
  fireEvent.change(url, { 
    target: { value: 'samun.blogi.fi' } 
  })
  fireEvent.submit(form)

  expect(setBlogs.mock.calls).toHaveLength(1)
  console.log(setBlogs.mock.calls)
  console.log('content',setBlogs.mock.calls[0][0].content)
  //expect(setBlogs.mock.calls[0][0].content).toBe('testing of forms could be easier' )
})