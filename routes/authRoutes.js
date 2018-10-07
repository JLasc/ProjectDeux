const db = require('../models');

const routes = (app, passport) => {
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google',
            {
                failureRedirect: '/404',
                successRedirect: '/'
            }));

    // Simple route middleware to ensure user is authenticated.
    function ensureAuthenticated (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/404');
    }
}
module.exports = routes;