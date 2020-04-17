module.exports = {
    getEntries: (req, res) => {
        const {searchVal} = req.query
        const {user_id} = req.session.user
        const db = req.app.get('db')
        // console.log(req.query)
        // console.log(req.session.user)
      if(searchVal){
          db.entries.get_search(+user_id, searchVal)
          .then(entries => res.status(200).send(entries))
      } else {
        db.entries.get_entries(+user_id)
        .then(entries => {
            res.status(200).send(entries)
        }).catch(err => console.log(err))
    }
    },
    createEntry: (req, res) => {
        const {id} = req.params
        const {title, content, date} = req.body
        const db = req.app.get('db')
        // console.log(date)
        // console.log(+id)
        db.entries.create_entry(title, content, date, +id)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    },
    getEntry: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.entries.get_entry(+id)
        .then(entry => res.status(200).send(entry))
        .catch(err => console.log(err))

    },
    editEntry: (req, res) => {
        const {id} = req.params
        const {newDate, newTitle, newContent} = req.body
        const db = req.app.get('db')

        db.entries.edit_entry(newDate, newTitle, newContent, +id)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    },
    deleteEntry: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')

        db.entries.delete(+id)
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    }
}