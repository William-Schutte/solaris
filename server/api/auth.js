const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../data/db/models/User');

router.post('/login', (req, res, next) => {
    let errors = [];

    if (!req.body.username) {
        errors.push('Username is a required field');
    }

    if (!req.body.password) {
        errors.push('Password is a required field');
    }

    if (errors.length) {
        return res.status(400).json({ errors: errors });
    }

    // Try to find the user by username
    User.findOne({
        username: req.body.username
    })
        .exec((err, user) => {
            if (err) {
                return next(err);
            } else if (!user) {
                return res.status(401).json({
                    errors: [
                        'The username or password is incorrect.'
                    ]
                });
            }

            // Compare the passwords and if they match then the user is authenticated.
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    // Store the user id in the session.
                    req.session.userId = user._id;

                    return res.sendStatus(200);
                } else {
                    return res.status(401).json({
                        errors: [
                            'The username or password is incorrect.'
                        ]
                    });
                }
            });
        });
});

module.exports = router;
