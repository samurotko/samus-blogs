describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:5000/api/testing/reset')
        const user = {
        name: 'sam',
        username: 'samu',
        password: 'salasana'
        }
    cy.request('POST', 'http://localhost:5000/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('login')
      cy.contains('username')
      cy.contains('password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('samu')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
        
            cy.contains('sam logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('samu')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.get('.notification').contains('wrong username or password')
        })
      })

      describe.only('When logged in', function() {
        beforeEach(function() {
        cy.login({ username: 'samu', password: 'salasana' })
        cy.createBlog({
            title: 'test1',
            author: 'test1',
            url: 'test1',
            likes: 8
        })
        cy.createBlog({
            title: 'test2',
            author: 'test2',
            url: 'test2',
            likes: 5
        })
        cy.createBlog({
            title: 'test3',
            author: 'test3',
            url: 'test3',
            likes: 12
        })
        }) 
    
        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('samun blogi')
            cy.get('#author').type('samu')
            cy.get('#url').type('https://samun.blogi.com')
            cy.contains('create').click()
            cy.contains('samun blogi')
        })

        it('A blog can be liked', function() {
            
            cy.get('#view').click()
            cy.get('#like').click()
            cy.contains('likes 13')
        })

         it('Blogs are in numerical order based on likes', function() {
        
        cy.get('#blog')
        .then(blogs => {
            
            console.log('blogs',blogs[0],blogs[0].length)
            const likes = blogs.map( b => b.likes)
            console.log('likes',likes)
            likes.every(function (x, i) {
                return i === 0 || x >= likes[i - 1]
            })
        })
            
        })

        it('A blog can be deleted', function() {
            cy.get('#view').click()
            cy.get('#remove').click()
        
            cy.get('html').should('not.contain', 'testi1')
        })
    })
})
