require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./authController'),
      entryCtrl = require('./entryController'),
      goalCtrl = require('./goalController'),
      app = express(),
      port = SERVER_PORT

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookies: {maxAge: 1000 * 60 * 60 * 24 * 7}
}))

//Auth Endpoints
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/logout', authCtrl.logout)

//Entries Endpoints
app.post('/api/createEntry/:id', entryCtrl.createEntry)
app.put('/api/editEntry/:id', entryCtrl.editEntry)
app.get('/api/getEntries', entryCtrl.getEntries)
app.get('/api/getEntry/:id', entryCtrl.getEntry)
app.delete('/api/deleteEntry/:id', entryCtrl.deleteEntry)

//Goals Endpoints
app.get('/api/getGoals', goalCtrl.getGoals)
app.get('/api/getGoal/:id', goalCtrl.getGoal)
app.put('/api/editGoal', goalCtrl.edit)
app.get('/api/complete', goalCtrl.completed)
app.post('/api/createGoal', goalCtrl.createGoal)
app.delete('/api/deleteGoal/:id', goalCtrl.deleteGoal)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(port, () => console.log(`Server listening on port ${port}`))
})

