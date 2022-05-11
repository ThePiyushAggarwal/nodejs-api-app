const express = require('express')
const app = express()
const axios = require('axios')
const PORT = 5000
const FETCH_FROM_URL = 'https://jsonplaceholder.typicode.com'

// TASK 1
app.get('/todos', async (_, response) => {
  const data = await axios
    .get(FETCH_FROM_URL + '/todos')
    .then((res) => res.data)
    .catch((error) => console.log(error))

  // delete the userId keys
  const final = data.map((user) => {
    delete user.userId
    return user
  })

  response.send(final)
})

// TASK 2
app.get('/user/:id', async (request, response) => {
  const userId = request.params.id

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

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
