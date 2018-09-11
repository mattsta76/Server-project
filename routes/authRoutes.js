const passport = require('passport');

module.exports = app =>{


// 1st route handler get users profile and email
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// 2nd route handler sends back to our page
app.get('/auth/google/callback',
passport.authenticate('google'),
(req, res) => {
  res.redirect('/surveys');
}
);

//logout users
app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/')
});

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});
};
