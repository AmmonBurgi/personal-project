module.exports = {
    getEntries: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
      
        db.entries.get_entries(+id)
        .then(entries => {
            res.status(200).send(entries)
        }).catch(err => console.log(err))
    }
}