const router = require('express').Router();
//var router = express.Router();
const passport = require('passport');


/* GET home page. */
//req: request
//res: response
//next: next
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Karma Shop' });
});
router.get('/mision', function(req, res, next) {
  res.render('mision', { title: 'Karma Shop - Misión' });
});
router.get('/vision', function(req, res, next) {
  res.render('vision', { title: 'Karma Shop - Visión' });
});
router.get('/contacto', function(req, res, next) {
  res.render('contacto', { title: 'Karma Shop - Contacto' });
});
router.get('/portfolio', function(req, res, next) {
  res.render('portfolio', { title: 'Karma Shop - Tienda' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Karma Shop - Ingresar' });
});
//Para enviar los datos del usuario
router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/create',
  failureRedirect: '/login',
  //Para pasarle internamente la variable req del router.get
  passReqToCallback: true
}));

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Karma Shop - Ingresar' });
});
//Para enviar los datos del usuario
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/create',
  failureRedirect: '/signup',
  //Para pasarle internamente la variable req del router.get
  passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
router.get('/create', isAuthenticated, (req, res, next) => {
  res.render('create', { title: 'Karma Shop - Nuevo' });
});
router.get('/edit',isAuthenticated, (req, res, next) => {
  res.render('edit', { title: 'Karma Shop - Editar' });
});
router.get('/delete',isAuthenticated,(req, res, next) => {
  res.render('delete', { title: 'Karma Shop - Borrar' });
});
router.get('/details',isAuthenticated, (req, res, next) => {
  res.render('details', { title: 'Karma Shop - Detalles' });
});

//método para autentificar que el usuario este logueado y no pueda acceder al panel administrativo
function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login')
}

module.exports = router;
