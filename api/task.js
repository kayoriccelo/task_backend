const moment = require('moment');

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date : moment().endOf('day').toDate();

        app.db('tasks')
            .where({ userId: req.user.id })
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
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
                    const msg = `Task with id ${req.params.id} not found.`;
                    res.status(400).send(msg);
                };
            })
            .catch(err => res.status(400).json(err));
    };

    const updateTaksDoneAt = (req, res, doneAt) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err));
    };

    const toggleTask = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task with id ${req.params.id} not found.`;
                    return res.status(400).send(msg);
                };

                const doneAt = task.doneAt ? task.doneAt : new Date();

                updateTaksDoneAt(req, res, doneAt);
            })
            .catch(err => res.status(400).json(err));
    };

    return {
        getTasks,
        toggleTask,
        save,
        remove
    };
};
