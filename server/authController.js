const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        const {email, username, password} = req.body
        // console.log(req.body)
        const db = req.app.get('db')

        let user = await db.check_user(email)

        if(user[0]){
          return res.status(400).send('email already in use')
        }

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        let newUser = await db.register_user(email, username, hash)

        req.session.user = newUser[0]
        res.status(200).send(req.session.user)
    },
    login: async(req, res) => {
        // console.log(req.body)
        const {email, password} = req.body
        const db = req.app.get('db')

        let user = await db.check_user(email)
        if(!user[0]){
            return res.status(400).send('Email does not exist')
        }

        let authenticated = bcrypt.compareSync(password, user[0].password)
        if(!authenticated){
            return res.status(400).send('Wrong password')
        }

        delete user[0].password
        req.session.user = user[0]
        // console.log(req.session.user)
        res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}