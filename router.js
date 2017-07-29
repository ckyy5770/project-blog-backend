const Autentication = require('./controlers/authentication');


module.exports = function(app){
    app.post('/signup', Autentication.signUp);

};