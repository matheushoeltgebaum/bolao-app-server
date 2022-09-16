const defaultRoutes = require('./default');
const facebookRoutes = require('./facebook');
const googleRoutes = require('./google');
const newRoutes = require('./new');

module.exports = (app, firebaseApp) => {

    // //Default (e-mail and password) authentication
    // defaultRoutes(app);

    // //Facebook authentication
    // facebookRoutes(app);

    // //Google authentication
    // googleRoutes(app);

    newRoutes(app, firebaseApp);
};
