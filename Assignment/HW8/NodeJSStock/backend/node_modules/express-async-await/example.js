let expressaa = require('./index.js')
let express = require('express')
let app = expressaa(express())

console.log(app.get('env'))
app.set('env', 'some')
console.log(app.get('env'))

app.get('/ok', async function(req, res, next) {
  res.json({hello: 'world'})
})

app.get('/no', async function(req, res) {
  res.notSomethingICanRun({hello: 'world'})
})

app.get('/no2', async function(req, res) {
  throw new Error('123')
})

app.get('/no3', function(req, res, next) {
  next(new Error('errora'))
})

app.get('/no4', function(req, res) {
  throw new Error('123')
})

app.get('/ok-middleware', function(req, res, next) {
  next();
}, async function(req, res, next) {
  res.json({hello: 'world'})
})

app.get('/no-middleware', function(req, res, next) {
  next();
}, async function(req, res, next) {
  throw new Error('123');
})

app.use((err, req, res, next) => {
  console.error(err)

  res.status(500).send("Ouch!")
})

app.listen(8080)
