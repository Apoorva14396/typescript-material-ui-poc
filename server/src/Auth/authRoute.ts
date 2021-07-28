const express1 = require('express');
const uploadImage1 = require('../middlewares/uploader');
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const registerController = require('./controllers/registerController');
const departmentAnalyticsController = require('./controllers/departmentAnalyticsController');
const userRegisteredAnalyticsController = require('./controllers/userRegisteredAnalyticsController');

const router = express1.Router();

router.post('/login', loginController);
router.post('/register', uploadImage1.single('image'), registerController);
router.post('/logout', logoutController);
router.get('/departmentAnalytics', departmentAnalyticsController);
router.get('/registeredAnalytics', userRegisteredAnalyticsController);

module.exports = router;
