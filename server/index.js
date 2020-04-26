require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./authController'),
      entryCtrl = require('./entryController'),
      goalCtrl = require('./goalController'),
      feedCtrl = require('./feedController'),
      app = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server, { origins: '*:*'}),
      port = SERVER_PORT

app.use(express.json())
// app.use(cors(corsOptions))
io.origins('*:*') // for latest version

const users = {}

io.on('connection', (socket) => {
    socket.on('new-user', name => {
        users[socket.id] = name
        console.log('name', name)
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('chat-message', message => {
        // console.log(message)
        socket.broadcast.emit('message-received', {message: message, name: users[socket.id]})
    })
    // socket.emit('chat-message', message)
})

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
app.get('/api/userGoals/', goalCtrl.getUserGoals)

//NodeMailer
app.post('/api/feedback', feedCtrl.sendFeed)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
    server.listen(port, () => console.log(`Server listening on port ${port}`))
})

