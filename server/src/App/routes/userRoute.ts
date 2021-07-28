const expressRoutes = require('express');
const route = expressRoutes.Router();
const verifyToken1 = require('../../middlewares/verifyToken');
const user = require('../controllers/userController');
const uploadImage = require('../../middlewares/uploader');

route.patch('/updateUser/:id', verifyToken1, uploadImage.single('image'), user.updateUser);
route.get('/getUser/:id', verifyToken1, user.getUser);
route.delete('/deleteUser/:id', verifyToken1, user.deleteUser);
route.get('/getUsers', user.getAllUsers);

module.exports = route;
