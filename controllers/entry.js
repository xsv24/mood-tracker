const Entry = require('../models/entry');

exports.createEntry = function(req, res, next) {
    const { mood, emotions, comments } = req.body;

    const _Entry = new Entry({
        mood,
        emotions,
        comments,
        user: req.user._id
    });

    _Entry.save()
        .then(entry => res.status(201).json(entry))
        .catch(err => next(err));
};

exports.updateEntry = function(req, res, next) {
    const EntryId = req.params.id;

    const query = ['mood', 'emotions', 'comments'].reduce((set, key) => {
        if(req.body[key]) {
            set[key] = req.body[key]; 
        }
        return set;
    }, { });

    if(!Object.keys(query).length) {
        return res.status(422).json({ error: 'Requires properties' });
    }

    Entry.findByIdAndUpdate({ _id: EntryId }, { $set: query })
        .then(() => res.status(201).json({ success: true }))
        .catch(err => next(err));
};

exports.Entries = function(req, res, next) {
    Entry.find({ user: req.user.id })
        .populate('user')
        .populate('mood')
        .populate('emotions')
        .exec((err, entries) => {
           if(err) {
               return next(err);
           }
           return res.status(201).json(entries || []);
        });
};