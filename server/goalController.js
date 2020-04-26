module.exports = {
    getGoals: (req, res) => {
        const db = req.app.get('db')
        const {searchVal} = req.query
        const {user_id} = req.session.user
        const boolean = false
    if(searchVal){
        db.goals.get_goals_search(user_id, searchVal, boolean)
        .then(goal => res.status(200).send(goal))
        .catch(err => console.log(err))
    } else {
        db.goals.get_goals(user_id, boolean)
        .then(goal => res.status(200).send(goal))
        .catch(err => console.log(err))
    }
    },
    getGoal: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.goals.get_goal(id)
        .then(goal => res.status(200).send(goal))
        .catch(err => console.log(err))
    },
    createGoal: (req, res) => {
        const db = req.app.get('db')
        const {title, content} = req.body
        const {user_id} = req.session.user

        db.goals.create_goal(title, content, user_id)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    },
    deleteGoal: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.goals.delete_goal(id)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    },
    edit: (req, res) => {
        const db = req.app.get('db')
        const {check, id} = req.query
        // console.log(check)
        // let newCheck = check ? false : true
        // console.log(newCheck)
        db.goals.edit(check, id)
        .then(()=> res.status(200).send('edit complete'))
        .catch(err => console.log(err))
    },
    completed: (req, res) => {
        const db = req.app.get('db')
        const boolean = true
        const {user_id} = req.session.user
        // console.log(user_id)

        db.goals.get_complete(user_id, boolean)
        .then(goals => res.status(200).send(goals))
        .catch(err => console.log(err))
    },
    getUserGoals: (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        // console.log(req.params)
        db.goals.get_user_goals(user_id)
        .then(goal => {
            res.status(200).send(goal)
        })
        .catch(err => console.log(err))
    }
}