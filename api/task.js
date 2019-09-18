const moment = require('moment');

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date : moment().endOf('day').toDate();

        app.db('tasks')
            .where({ user_id: req.user.id })
            .where('estimate_at', '<=', date)
            .orderBy('estimate_at')
            .then(tasks => res.status(200).json(tasks))
            .catch(err => res.status(500).json(err));
    };

    const save = (req, res) => {
        if (!req.body.description.trim()) {
            return res.status(400).send('Description is requerid.')
        };

        req.body.userId = req.user.id;

        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err));
    };

    const remove = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send();
                } else {
                    const msg = `Task not found with id ${req.params.id}.`;
                    res.status(400).send(msg);
                };
            })
            .catch(err => res.status(400).json(err));
    };

    return {
        getTasks,
        save,
        remove
    }
};
