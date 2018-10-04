module.exports = function (app, passport) {
    console.log("routes");
    app.get('/auth/google',passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        (req, res) => {}
    );
};