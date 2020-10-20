# express-async-await

Use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) in your routes without
polluting / [wrapping](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016) them.

## Usage

Pass the app to the library and we'll monkey-patch it
for you:

``` js
const aa = require('express-async-await')
const app = aa(express())

app.get('/ok', async function(req, res, next) {
  res.json({hello: 'world'})
})

app.get('/no', async function(req, res) {
  res.notSomethingICanRun({hello: 'world'})
})

app.use((err, req, res, next) => {
  console.error(err)

  res.status(500).send("Ouch!")
})
```

Now `app.$method(route, fn)` support async functions out of the box!

(have a look at the [example app](https://github.com/odino/express-async-await/blob/master/example.js))

## Installation

```
npm i express-async-await

npm add express-async-await
```
