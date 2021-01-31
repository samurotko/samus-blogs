var lodash = require('lodash')

const dummy = (blogs) => {
    
    return 1
  }

  const totalLikes = (blogs) => {
   

    const likes = blogs.map(blog=>blog.likes)

    return likes.reduce((a,c)=>a+c,0)
  }

  const favoriteBlog = (blogs) => {
    if(blogs.length===0){
      return {}
    }
    const likes = blogs.map(blog=>blog.likes)
    
    return blogs[likes.indexOf(Math.max(...likes))]
  }

  const mostBlogs =(blogs)=>{
    if(blogs.length===0){
      return {}
    }

    
    const counted = lodash.countBy(blogs,blog=>blog.author)
    const pairs =lodash.toPairs(counted)
    const maxed = lodash.maxBy(pairs,pairs.last)
  
    const mostBlogs = {
      author: maxed[0],
      blogs: maxed[1]
    }
    
    return mostBlogs
  }

  const mostLikes = (blogs) => {
    if(blogs.length===0){
      return {}
    }

    const authorLikes=[]

    const authors = lodash.uniqBy(blogs, blog=>blog.author).map(blog=>blog.author)
    

    for(i=0; i<=authors.length; i++){
      
      const sum=lodash.sumBy(lodash.filter(blogs,blog=>blog.author===authors[i]),blog=>blog.likes)
      
      const liked = {
        author: authors[i],
        likes: sum
      }
      
      authorLikes.push(liked)

    }

    return lodash.maxBy(authorLikes,author=>author.likes)


  }
  
  module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
  }