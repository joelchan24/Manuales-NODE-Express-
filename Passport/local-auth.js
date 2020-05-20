const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Recibe un usuario y un callbackdone y se ejecuta cuando se ejecuta el metodo done
//Serializa los datos   
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Recibe lo que manda el metodo serializeUser
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


passport.use('local-signup', new LocalStrategy({
    //Objecto de configuracion, lista de lo que vamos a recibir
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({'email': email})
  console.log(user)
if(user) {
    return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    //await - es para indicar que cuando termine de guardar el usuario continue con la siguiente linea
     console.log(newUser)
     await newUser.save();
    //Devolver la resuesta
     done(null, newUser);
  }
}));


passport.use('local-signin', new LocalStrategy({
   //Objecto de configuracion, lista de lo que vamos a recibir
   usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, req.flash('signinMessage', 'No User Found'));
  }
  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
  }
  return done(null, user);
}));