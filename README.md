### This app uses jsonplacerholder.typicode.com API

### How to install?

To install all the packages. Run this in root folder after cloning

```
npm install
```

## Running Server

```
npm run server
```

### API requests

You can make requests on:

`GET http://localhost:5000/todos`
`GET http://localhost:5000/user/<number>`

### React app integrated

Go to browser after running the server and open `http://localhost:5000`

### Bug fix pending

Sometimes, when I make on `/user/<number>`, I get the response without the `todos` array. Maybe it is because of the slow network problem I was having that day.
