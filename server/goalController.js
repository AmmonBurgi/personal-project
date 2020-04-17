module.exports = {
    getGoals: (req, res) => {
        const db = req.app.get('db')
        const {searchVal} = req.query
        const {user_id} = req.session.user
    if(searchVal){
        db.goals.get_goals_search(user_id, searchVal)
        .then(goal => res.status(200).send(goal))
        .catch(err => console.log(err))
    } else {
        db.goals.get_goals(user_id)
        .then(goal => res.status(200).send(goal))
        .catch(err => console.log(err))
    }
    },
    createGoal: (req, res) => {
        const db = req.app.get('db')
        const {title, content} = req.body
        const {user_id} = req.session.user

        db.goals.create_goal(title, content, user_id)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    }
}