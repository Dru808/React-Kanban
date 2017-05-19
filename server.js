/*jshint esversion: 6*/

//required modules
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

//passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//session
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

//password hashing
const saltRounds = 10;
const bcrypt = require('bcrypt');

// sequelize
const db = require('./models');
const { cards } = require('./models');
// db.sequelize.sync();

const kanbanBoardRouter = require('./routes/kanbanBoard.js');

const PORT = process.env.PORT || 1991;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.use(session({
  store: new RedisStore(),
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy (
    (username, password, done) => {
    console.log('runs before serializing');
    User.findOne({
      where: {
        username: username
      }
    })
    .then ( user => {
      console.log('step-3; user: ', user);
      if (user === null) {
        console.log('user failed');
        return done(null, false, {message: 'bad username'});
      }
      else {
        bcrypt.compare(password, user.password)
        .then(res => {
          if (res) { return done(null, user); }
          else {
            return done(null, false, {message: 'bad password'});
          }
        });
      }
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializing');
// ^ ---------- given from authentication strategy
  // building the object to serialize to save
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');
  // ^ ---------- given from serializeUser
  User.findOne({
    where: {
      id: user.id
    }
  }).then(user => {
    return done(null, user); // <------- inserts into the request object
  });
});

app.use('/public', express.static('./public'));

// default route
app.get('/', (req, res) => {
  console.log(req);//put in index to show all photos later
  res.send("hello");
  //res.redirect('/gallery');;
});

//  step-1 login section - pulls up login form
app.get('/login', (req, res) => {
  console.log('step-1');
  res.render('users/login');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//step-1a - if no user then pull this form to create user
app.get('/user/new', (req, res) => {
  console.log('creating user');
  res.render('users/newUser');
});

//step-2 - passes login info to passport for verification
app.post('/login', passport.authenticate('local', {
  successRedirect: '/card',
  failureRedirect: '/login'
}));

// step-2a new user section - this executes when pressed submit on login form
app.post('/user/new', (req, res) => {
  console.log('step-2');
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      User.create({
        username: req.body.username,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        password: hash
      })
      .then((user) => {
        res.redirect('/login');
      });
    });
  });
});

app.use('/api/cards', kanbanBoardRouter);

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: './public'});
});
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});