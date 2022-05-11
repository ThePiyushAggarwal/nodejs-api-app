const express = require('express')
const app = express()
const axios = require('axios')
const morgan = require('morgan')
const PORT = 5000
const FETCH_FROM_URL = 'https://jsonplaceholder.typicode.com'

// Logging the requests
app.use(morgan('tiny'))

// TASK 1
app.get('/todos', async (_, response) => {
  const data = await axios
    .get(FETCH_FROM_URL + '/todos')
    .then((res) => res.data)
    .catch((error) => console.log(error))

  // Delete the userId keys
  const final = data.map((user) => {
    delete user.userId
    return user
  })

  response.send(final)
})

// TASK 2
app.get('/user/:id', async (request, response) => {
  const userId = parseInt(request.params.id)

  if (!userId || userId > 10 || userId < 0) {
    response.json({ message: 'Please enter a number between 1 and 10' })
    return
  }

  // Getting user data
  const userData = await axios
    .get(FETCH_FROM_URL + '/users/' + userId)
    .then((res) => res.data)
    .catch((error) => console.log(error))

  const { id, name, email, phone } = userData

  // Getting user todos
  const todos = await axios
    .get(FETCH_FROM_URL + '/todos')
    .then((res) => res.data)
    .then((data) => {
      // Getting the right todo and deleting userId from that
      const filteredData = data
        .filter((todo) => todo.userId === id)
        .map((todo) => {
          delete todo.userId
          return todo
        })

      return filteredData
    })
    .catch((error) => console.log(error))

  const finalUserData = { id, name, email, phone, todos }

  response.send(finalUserData)
})

// Extra responses for handling paths
app.get('/', (_, response) =>
  response.send({ message: 'Welcome to NodeJS app' })
)

app.get('/user', (_, response) =>
  response.json({ message: 'Please make request to /user/<number>' })
)

app.get('*', (_, response) =>
  response.json({ message: 'OOPS! Path does not exist' })
)

//
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
